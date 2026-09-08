/**
 * =========================================================
 * SWASTHYA SETU — OTP SERVICE
 * Server-side OTP generation, hashing, verification, expiry
 * =========================================================
 *
 * Security guarantees:
 * - OTPs are generated with crypto.randomInt (CSPRNG)
 * - OTPs are stored as bcrypt hashes — NEVER in plaintext
 * - OTPs are NEVER returned in API responses
 * - OTPs are NEVER logged in production mode
 * - OTPs expire after 5 minutes
 * - Max 3 verification attempts per OTP
 * - Rate limited: max 5 OTP requests per mobile per hour
 */

'use strict';

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const BCRYPT_ROUNDS = 10;
const OTP_LENGTH = 6;
const OTP_EXPIRY_SECONDS = 300; // 5 minutes
const MAX_ATTEMPTS = 3;
const RATE_LIMIT_WINDOW_SECONDS = 3600; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;

class OTPService {
  /**
   * @param {object} supabase - Supabase client (service role)
   * @param {object} smsService - SMSService instance
   * @param {string} environment - 'development' | 'sandbox' | 'production'
   */
  constructor(supabase, smsService, environment = 'development') {
    this.supabase = supabase;
    this.smsService = smsService;
    this.environment = environment;
  }

  /**
   * Generate a cryptographically secure 6-digit OTP
   * @returns {string} 6-digit OTP string
   */
  _generateOTP() {
    const min = Math.pow(10, OTP_LENGTH - 1);  // 100000
    const max = Math.pow(10, OTP_LENGTH) - 1;   // 999999
    const otp = crypto.randomInt(min, max + 1);
    return otp.toString();
  }

  /**
   * Check rate limiting for OTP requests
   * @param {string} mobile - 10-digit mobile number
   * @returns {Promise<{allowed: boolean, remaining: number, retryAfterSeconds: number}>}
   */
  async _checkRateLimit(mobile) {
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_SECONDS * 1000).toISOString();

    const { data, error } = await this.supabase
      .from('otp_requests')
      .select('id, created_at')
      .eq('mobile', mobile)
      .gte('created_at', windowStart)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[OTP] Rate limit check error:', error.message);
      // Fail open in development, fail closed in production
      if (this.environment === 'production') {
        return { allowed: false, remaining: 0, retryAfterSeconds: 60 };
      }
      return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS, retryAfterSeconds: 0 };
    }

    const count = (data || []).length;
    const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - count);

    if (count >= RATE_LIMIT_MAX_REQUESTS) {
      // Calculate retry time based on oldest request in window
      const oldestInWindow = data[data.length - 1];
      const oldestTime = new Date(oldestInWindow.created_at).getTime();
      const retryAfterMs = (oldestTime + RATE_LIMIT_WINDOW_SECONDS * 1000) - Date.now();
      const retryAfterSeconds = Math.max(0, Math.ceil(retryAfterMs / 1000));

      return { allowed: false, remaining: 0, retryAfterSeconds };
    }

    return { allowed: true, remaining, retryAfterSeconds: 0 };
  }

  /**
   * Generate an OTP, hash it, store it, and send via SMS
   *
   * @param {string} mobile - 10-digit mobile number
   * @param {string} purpose - 'REGISTRATION' | 'FORGOT_PASSWORD' | 'MOBILE_VERIFY' | 'LOGIN_VERIFY'
   * @param {object} [options] - Additional options
   * @param {string} [options.patientId] - Patient ID to associate
   * @param {string} [options.ipAddress] - Request IP address
   * @returns {Promise<{success: boolean, requestId: string, expiresIn: number, error?: string}>}
   */
  async generateAndSend(mobile, purpose, options = {}) {
    // 1. Validate inputs
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      return { success: false, error: 'Invalid mobile number format' };
    }

    const validPurposes = ['REGISTRATION', 'FORGOT_PASSWORD', 'MOBILE_VERIFY', 'LOGIN_VERIFY'];
    if (!validPurposes.includes(purpose)) {
      return { success: false, error: 'Invalid OTP purpose' };
    }

    // 2. Check rate limit
    const rateCheck = await this._checkRateLimit(mobile);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Too many OTP requests. Try again in ${rateCheck.retryAfterSeconds} seconds.`,
        retryAfterSeconds: rateCheck.retryAfterSeconds
      };
    }

    // 3. Invalidate any previous unused OTP for this mobile + purpose
    await this.supabase
      .from('otp_requests')
      .update({ used: true, used_at: new Date().toISOString() })
      .eq('mobile', mobile)
      .eq('purpose', purpose)
      .eq('used', false);

    // 4. Generate OTP
    const otp = this._generateOTP();

    // 5. Hash OTP with bcrypt
    const otpHash = await bcrypt.hash(otp, BCRYPT_ROUNDS);

    // 6. Calculate expiry
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_SECONDS * 1000).toISOString();

    // 7. Store hashed OTP in database
    const requestId = uuidv4();
    const { error: insertError } = await this.supabase
      .from('otp_requests')
      .insert({
        id: requestId,
        mobile,
        otp_hash: otpHash,
        purpose,
        attempts: 0,
        max_attempts: MAX_ATTEMPTS,
        expires_at: expiresAt,
        used: false,
        patient_id: options.patientId || null,
        request_ip: options.ipAddress || null
      });

    if (insertError) {
      console.error('[OTP] Failed to store OTP request:', insertError.message);
      return { success: false, error: 'Failed to create OTP request' };
    }

    // 8. Send OTP via SMS service
    try {
      await this.smsService.sendOTP(mobile, otp);
    } catch (smsError) {
      console.error('[OTP] SMS delivery failed:', smsError.message);
      // Mark the request as failed but don't expose the error details
      // In sandbox mode, the OTP was already logged to console by the sandbox provider
      if (this.environment === 'production') {
        return { success: false, error: 'Failed to send verification code. Please try again.' };
      }
      // In development/sandbox, continue even if SMS fails (logged to console)
    }

    // 9. Return success — NEVER return the OTP in the response
    return {
      success: true,
      requestId,
      expiresIn: OTP_EXPIRY_SECONDS,
      remaining: rateCheck.remaining - 1
    };
  }

  /**
   * Verify an OTP code against the stored hash
   *
   * @param {string} mobile - 10-digit mobile number
   * @param {string} purpose - OTP purpose
   * @param {string} otpCode - The 6-digit OTP entered by the user
   * @returns {Promise<{success: boolean, error?: string, errorCode?: string}>}
   */
  async verify(mobile, purpose, otpCode) {
    // 1. Validate inputs
    if (!mobile || !purpose || !otpCode) {
      return { success: false, error: 'Missing required fields', errorCode: 'INVALID_INPUT' };
    }

    if (!/^\d{6}$/.test(otpCode)) {
      return { success: false, error: 'OTP must be a 6-digit number', errorCode: 'INVALID_FORMAT' };
    }

    // 2. Find the latest non-expired, non-used OTP for this mobile + purpose
    const now = new Date().toISOString();
    const { data: otpRecords, error: fetchError } = await this.supabase
      .from('otp_requests')
      .select('*')
      .eq('mobile', mobile)
      .eq('purpose', purpose)
      .eq('used', false)
      .gte('expires_at', now)
      .order('created_at', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('[OTP] Verification lookup error:', fetchError.message);
      return { success: false, error: 'Verification failed. Please try again.', errorCode: 'SYSTEM_ERROR' };
    }

    if (!otpRecords || otpRecords.length === 0) {
      return { success: false, error: 'No valid verification code found. Request a new one.', errorCode: 'NOT_FOUND' };
    }

    const otpRecord = otpRecords[0];

    // 3. Check attempt count
    if (otpRecord.attempts >= otpRecord.max_attempts) {
      // Mark as used (exhausted)
      await this.supabase
        .from('otp_requests')
        .update({ used: true, used_at: now })
        .eq('id', otpRecord.id);

      return {
        success: false,
        error: 'Maximum verification attempts exceeded. Request a new code.',
        errorCode: 'MAX_ATTEMPTS'
      };
    }

    // 4. Compare OTP hash
    const isMatch = await bcrypt.compare(otpCode, otpRecord.otp_hash);

    if (!isMatch) {
      // Increment attempts
      await this.supabase
        .from('otp_requests')
        .update({ attempts: otpRecord.attempts + 1 })
        .eq('id', otpRecord.id);

      const remainingAttempts = otpRecord.max_attempts - otpRecord.attempts - 1;
      return {
        success: false,
        error: `Invalid verification code. ${remainingAttempts} attempt(s) remaining.`,
        errorCode: 'INVALID_OTP',
        remainingAttempts
      };
    }

    // 5. Mark as used
    await this.supabase
      .from('otp_requests')
      .update({ used: true, used_at: now })
      .eq('id', otpRecord.id);

    return { success: true };
  }
}

module.exports = OTPService;
