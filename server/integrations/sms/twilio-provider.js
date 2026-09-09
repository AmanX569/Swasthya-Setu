/**
 * =========================================================
 * SWASTHYA SETU — TWILIO SMS & OTP PROVIDER (PRODUCTION ADAPTER)
 * =========================================================
 *
 * Provides real carrier SMS dispatch and OTP verification via Twilio REST API:
 * 1. Standard Twilio Messages API (default when TWILIO_PHONE_NUMBER is configured):
 *    - Dispatches carrier SMS worldwide and across India (+91...)
 *    - Uses crypto-secure 6-digit OTP generation with SHA-256 salted in-memory hash store
 *    - Direct SMS dispatch for Emergency 108 SOS alerts and patient notifications
 * 2. Twilio Verify API (active when TWILIO_VERIFY_SERVICE_SID is configured):
 *    - Calls Twilio Verify v2 REST endpoints for fully managed SMS verification
 *
 * Architecture & Compliance:
 * - Zero external npm dependencies: uses Node.js 18+ built-in `fetch` with HTTP Basic Auth.
 * - Works identically in local Node.js and Vercel serverless environments.
 * - Never logs plaintext OTP codes or credentials.
 */

'use strict';

const crypto = require('crypto');
const { normalizeIndianMobile } = require('../../utils/phone');

class TwilioSMSProvider {
  /**
   * @param {object} twilioConfig - { accountSid, authToken, fromNumber, verifyServiceSid, baseUrl }
   */
  constructor(twilioConfig = {}) {
    this.accountSid = (twilioConfig.accountSid || '').trim();
    this.authToken = (twilioConfig.authToken || '').trim();
    this.fromNumber = (twilioConfig.fromNumber || '').trim();
    this.verifyServiceSid = (twilioConfig.verifyServiceSid || '').trim();
    this.baseUrl = twilioConfig.baseUrl || 'https://api.twilio.com';
    this.name = 'Twilio SMS Gateway';

    if (!this.accountSid || !this.authToken) {
      throw new Error(
        'TwilioSMSProvider initialization failed: TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required.'
      );
    }

    if (!this.fromNumber && !this.verifyServiceSid) {
      throw new Error(
        'TwilioSMSProvider initialization failed: Either TWILIO_PHONE_NUMBER or TWILIO_VERIFY_SERVICE_SID must be provided.'
      );
    }

    // In-memory challenge store for Messages API OTP verification
    // Key: E.164 mobile, Value: { hash, expiresAt, attempts, maxAttempts }
    this.otpStore = new Map();
  }

  /**
   * Normalizes mobile number to E.164 format (+919876543210)
   * @param {string} mobile
   * @returns {string} E.164 formatted phone number
   */
  toE164(mobile) {
    const raw = String(mobile || '').trim();
    if (raw.startsWith('+')) {
      return raw;
    }
    const norm = normalizeIndianMobile(raw);
    if (norm.valid) {
      return norm.e164;
    }
    // Generic fallback: strip non-digits and prefix '+'
    const clean = raw.replace(/\D/g, '');
    return `+${clean}`;
  }

  /**
   * Generates HTTP Basic Auth header for Twilio REST API
   * @private
   */
  _getAuthHeader() {
    return 'Basic ' + Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');
  }

  /**
   * Executes HTTP request to Twilio REST API using native fetch
   * @private
   */
  async _request(url, bodyParams = {}) {
    const auth = this._getAuthHeader();
    const encodedBody = new URLSearchParams(bodyParams).toString();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'SwasthyaSetu-TwilioProvider/1.0'
      },
      body: encodedBody
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Twilio HTTP ${response.status}: ${response.statusText}`;
      const err = new Error(errorMsg);
      err.status = response.status;
      err.code = data.code;
      throw err;
    }

    return data;
  }

  /**
   * Purges expired challenges from in-memory OTP store
   * @private
   */
  _cleanExpired() {
    const now = Date.now();
    for (const [key, record] of this.otpStore.entries()) {
      if (now > record.expiresAt) {
        this.otpStore.delete(key);
      }
    }
  }

  /**
   * Hashes an OTP code with phone salt using SHA-256
   * @private
   */
  _hashOtp(mobile, otp) {
    const salt = this.authToken ? this.authToken.slice(-8) : 'swasthya-setu-salt';
    return crypto.createHash('sha256').update(`${mobile}:${otp}:${salt}`).digest('hex');
  }

  /**
   * Dispatches transactional or emergency SMS via Twilio Messages API
   * @param {string} mobile - Recipient mobile
   * @param {string} message - Text message content
   * @returns {Promise<{success: boolean, messageId: string, provider: string, to: string, status?: string}>}
   */
  async send(mobile, message) {
    if (!this.fromNumber) {
      throw new Error(
        'Twilio SMS dispatch requires TWILIO_PHONE_NUMBER to be configured. Alternatively use Twilio Verify API for OTPs.'
      );
    }

    const to = this.toE164(mobile);
    const url = `${this.baseUrl}/2010-04-01/Accounts/${this.accountSid}/Messages.json`;

    try {
      const res = await this._request(url, {
        To: to,
        From: this.fromNumber,
        Body: message
      });

      return {
        success: true,
        messageId: res.sid,
        provider: 'twilio',
        to,
        status: res.status
      };
    } catch (err) {
      console.error('[TwilioSMSProvider] Delivery failed:', err.message);
      throw new Error(`Twilio SMS dispatch failed: ${err.message}`);
    }
  }

  /**
   * Dispatches OTP via Twilio
   * - If verifyServiceSid is configured: uses Twilio Verify v2 API
   * - Otherwise: generates secure 6-digit OTP and sends SMS via Twilio Messages API
   *
   * @param {string} mobile
   * @param {object} [options]
   * @returns {Promise<{success: boolean, message: string, providerRequestId?: string, provider: string, otpExpiryMinutes?: number}>}
   */
  async sendOtp(mobile, options = {}) {
    const to = this.toE164(mobile);

    // Path A: Twilio Verify API
    if (this.verifyServiceSid) {
      const url = `https://verify.twilio.com/v2/Services/${this.verifyServiceSid}/Verifications`;
      try {
        const res = await this._request(url, {
          To: to,
          Channel: 'sms'
        });

        return {
          success: true,
          message: 'Verification code sent via SMS.',
          providerRequestId: res.sid,
          provider: 'twilio-verify',
          status: res.status
        };
      } catch (err) {
        console.error('[TwilioSMSProvider] Verify API dispatch failed:', err.message);
        throw new Error(`Twilio Verify dispatch failed: ${err.message}`);
      }
    }

    // Path B: Twilio Messages API + Secure Challenge State
    this._cleanExpired();

    const otp = options.otp || String(crypto.randomInt(100000, 1000000));
    const expiryMinutes = options.otpExpiry || 5;
    const expiresAt = Date.now() + expiryMinutes * 60 * 1000;
    const hash = this._hashOtp(to, otp);

    this.otpStore.set(to, {
      hash,
      expiresAt,
      attempts: 0,
      maxAttempts: 5
    });

    const bodyText = options.customMessage ||
      `Your Swasthya Setu (स्वास्थ्य सेतु) verification code is ${otp}. Valid for ${expiryMinutes} minutes. Do not share this OTP with anyone.`;

    const sendRes = await this.send(to, bodyText);

    return {
      success: true,
      message: 'Verification code sent via SMS.',
      providerRequestId: sendRes.messageId,
      provider: 'twilio',
      otpExpiryMinutes: expiryMinutes
    };
  }

  /**
   * Verifies submitted OTP
   * - If verifyServiceSid is configured: checks Twilio Verify v2 API
   * - Otherwise: compares SHA-256 hash with constant-time equality check
   *
   * @param {string} mobile
   * @param {string} otp
   * @returns {Promise<{success: boolean, message?: string, error?: string, provider: string, remainingAttempts?: number}>}
   */
  async verifyOtp(mobile, otp) {
    const to = this.toE164(mobile);
    const cleanOtp = String(otp || '').trim();

    if (!cleanOtp) {
      return { success: false, error: 'Please enter a valid verification code.', provider: 'twilio' };
    }

    // Path A: Twilio Verify API
    if (this.verifyServiceSid) {
      const url = `https://verify.twilio.com/v2/Services/${this.verifyServiceSid}/VerificationCheck`;
      try {
        const res = await this._request(url, {
          To: to,
          Code: cleanOtp
        });

        if (res.status === 'approved') {
          return {
            success: true,
            message: 'OTP verified successfully.',
            provider: 'twilio-verify'
          };
        }

        return {
          success: false,
          error: 'Incorrect OTP. Please check the code and try again.',
          provider: 'twilio-verify'
        };
      } catch (err) {
        console.error('[TwilioSMSProvider] Twilio Verify check error:', err.message);
        return {
          success: false,
          error: err.message || 'Twilio verification failed.',
          provider: 'twilio-verify'
        };
      }
    }

    // Path B: Messages API + local hash verification
    const record = this.otpStore.get(to);

    if (!record) {
      return {
        success: false,
        error: 'OTP has expired or session not found. Please request a new code.',
        provider: 'twilio'
      };
    }

    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(to);
      return {
        success: false,
        error: 'This OTP has expired. Please request a new verification code.',
        provider: 'twilio'
      };
    }

    if (record.attempts >= record.maxAttempts) {
      this.otpStore.delete(to);
      return {
        success: false,
        error: 'Maximum verification attempts exceeded. Please request a new OTP.',
        provider: 'twilio'
      };
    }

    record.attempts += 1;

    const candidateHash = this._hashOtp(to, cleanOtp);
    const expectedBuf = Buffer.from(record.hash);
    const candidateBuf = Buffer.from(candidateHash);

    if (expectedBuf.length === candidateBuf.length && crypto.timingSafeEqual(expectedBuf, candidateBuf)) {
      this.otpStore.delete(to);
      return {
        success: true,
        message: 'OTP verified successfully.',
        provider: 'twilio'
      };
    }

    const remaining = Math.max(0, record.maxAttempts - record.attempts);
    return {
      success: false,
      error: `Incorrect OTP. ${remaining} attempt(s) remaining.`,
      remainingAttempts: remaining,
      provider: 'twilio'
    };
  }

  /**
   * Retries / resends OTP via Twilio
   * @param {string} mobile
   * @param {object} [options]
   */
  async retryOtp(mobile, options = {}) {
    return this.sendOtp(mobile, options);
  }
}

module.exports = TwilioSMSProvider;
