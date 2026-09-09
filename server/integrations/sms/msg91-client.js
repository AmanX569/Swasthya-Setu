/**
 * =========================================================
 * SWASTHYA SETU — MSG91 V5 OTP API CLIENT
 * Official V5 SendOTP, Verify, and Retry Implementation
 * =========================================================
 *
 * Official MSG91 API Documentation: https://docs.msg91.com/otp
 * Base URL: https://control.msg91.com (or https://api.msg91.com)
 *
 * Security Guarantees:
 * - MSG91_AUTH_KEY is strictly server-side and passed via HTTP headers
 * - Timeouts are guarded with AbortController (8000ms)
 * - Provider errors are mapped to safe, patient-friendly messages
 * - Secrets, Auth Keys, and full raw responses are NEVER logged or leaked
 */

'use strict';

const DEFAULT_BASE_URL = 'https://control.msg91.com';
const DEFAULT_TIMEOUT_MS = 8000;

class Msg91Client {
  /**
   * @param {object} options
   * @param {string} options.authKey - MSG91 Auth Key
   * @param {string} [options.templateId] - MSG91 OTP Template ID (configured with DLT)
   * @param {string} [options.baseUrl] - API Base URL
   * @param {number} [options.timeoutMs] - HTTP Request Timeout in ms
   */
  constructor(options = {}) {
    if (!options.authKey) {
      throw new Error('Msg91Client initialization failed: authKey is required.');
    }

    this.authKey = options.authKey;
    this.templateId = options.templateId || '';
    this.baseUrl = (options.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, '');
    this.timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;
  }

  /**
   * Safe fetch with AbortController timeout guard
   * @private
   */
  async _fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      return response;
    } catch (err) {
      if (err.name === 'AbortError') {
        throw new Error('MSG91 gateway timeout after ' + this.timeoutMs + 'ms. Please try again.');
      }
      throw err;
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * Send real SMS OTP to an Indian mobile number via MSG91 V5 API
   *
   * Endpoint: POST https://control.msg91.com/api/v5/otp
   * Headers: authkey, Content-Type
   *
   * @param {object} params
   * @param {string} params.mobile - 12-digit mobile with country code (e.g. 919876543210)
   * @param {string} [params.templateId] - Template ID (defaults to configured template)
   * @param {number} [params.otpExpiry] - OTP Expiry in minutes (default 5)
   * @param {number} [params.otpLength] - OTP Length (default 6)
   * @returns {Promise<{success: boolean, message: string, providerRequestId?: string}>}
   */
  async sendOtp(params) {
    const { mobile, otpExpiry = 5, otpLength = 6 } = params;
    const templateId = params.templateId || this.templateId;

    if (!templateId) {
      throw new Error('MSG91 OTP Template ID is not configured. Please set MSG91_OTP_TEMPLATE_ID.');
    }

    const queryParams = new URLSearchParams({
      template_id: templateId,
      mobile: String(mobile),
      otp_expiry: String(otpExpiry),
      otp_length: String(otpLength)
    });

    const url = `${this.baseUrl}/api/v5/otp?${queryParams.toString()}`;

    const res = await this._fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'authkey': this.authKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error('Received invalid response from SMS gateway.');
    }

    if (res.ok && (data.type === 'success' || data.message === 'OTP sent successfully')) {
      return {
        success: true,
        message: 'OTP sent successfully via MSG91.',
        providerRequestId: data.request_id || data.requestId || null
      };
    }

    // Map provider errors safely
    const errMsg = data.message || 'SMS gateway rejected OTP dispatch.';
    console.error(`[MSG91 Gateway Error] Status: ${res.status}, Type: ${data.type}`);

    if (errMsg.toLowerCase().includes('limit') || errMsg.toLowerCase().includes('frequent')) {
      throw new Error('Too many OTP attempts. Please wait before requesting another code.');
    }
    if (errMsg.toLowerCase().includes('mobile') || errMsg.toLowerCase().includes('invalid')) {
      throw new Error('Invalid mobile number format.');
    }
    if (errMsg.toLowerCase().includes('template') || errMsg.toLowerCase().includes('dlt')) {
      throw new Error('SMS template error. Please verify DLT approval in MSG91 dashboard.');
    }

    throw new Error('Unable to send verification code at this time. Please try again later.');
  }

  /**
   * Verify an OTP entered by the citizen via MSG91 V5 API
   *
   * Endpoint: GET https://control.msg91.com/api/v5/otp/verify
   * Headers: authkey, accept
   *
   * @param {object} params
   * @param {string} params.mobile - 12-digit mobile with country code (e.g. 919876543210)
   * @param {string} params.otp - 4 or 6 digit OTP string
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async verifyOtp(params) {
    const { mobile, otp } = params;

    const queryParams = new URLSearchParams({
      mobile: String(mobile),
      otp: String(otp).trim()
    });

    const url = `${this.baseUrl}/api/v5/otp/verify?${queryParams.toString()}`;

    const res = await this._fetchWithTimeout(url, {
      method: 'GET',
      headers: {
        'authkey': this.authKey,
        'accept': 'application/json'
      }
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error('Invalid verification response from SMS gateway.');
    }

    if (res.ok && data.type === 'success') {
      return {
        success: true,
        message: 'OTP verified successfully.'
      };
    }

    // Check specific error types
    const rawMsg = (data.message || '').toLowerCase();
    if (rawMsg.includes('not match') || rawMsg.includes('invalid')) {
      return {
        success: false,
        error: 'Incorrect OTP. Please check and try again.'
      };
    }
    if (rawMsg.includes('expired') || rawMsg.includes('not found')) {
      return {
        success: false,
        error: 'This OTP has expired. Please request a new verification code.'
      };
    }

    return {
      success: false,
      error: data.message || 'OTP verification failed. Please try again.'
    };
  }

  /**
   * Retry/Resend OTP via MSG91 V5 API
   *
   * Endpoint: POST https://control.msg91.com/api/v5/otp/retry
   * Headers: authkey
   *
   * @param {object} params
   * @param {string} params.mobile - 12-digit mobile with country code (e.g. 919876543210)
   * @param {string} [params.retryType='text'] - 'text' (SMS) or 'voice' (Call)
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async retryOtp(params) {
    const { mobile, retryType = 'text' } = params;

    const queryParams = new URLSearchParams({
      mobile: String(mobile),
      retrytype: retryType
    });

    const url = `${this.baseUrl}/api/v5/otp/retry?${queryParams.toString()}`;

    const res = await this._fetchWithTimeout(url, {
      method: 'POST',
      headers: {
        'authkey': this.authKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      throw new Error('Invalid retry response from SMS gateway.');
    }

    if (res.ok && (data.type === 'success' || (data.message && data.message.includes('success')))) {
      return {
        success: true,
        message: 'OTP resent successfully.'
      };
    }

    const rawMsg = (data.message || '').toLowerCase();
    if (rawMsg.includes('frequent') || rawMsg.includes('wait')) {
      throw new Error('Please wait 60 seconds before requesting another code.');
    }

    throw new Error(data.message || 'Failed to resend verification code.');
  }
}

module.exports = Msg91Client;
