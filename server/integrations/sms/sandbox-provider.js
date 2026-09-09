/**
 * =========================================================
 * SWASTHYA SETU — SANDBOX SMS / OTP PROVIDER
 * Safe offline / developer SMS gateway simulator
 * =========================================================
 */

'use strict';

const { normalizeIndianMobile } = require('../../utils/phone');

class SandboxSMSProvider {
  constructor() {
    this.name = 'Sandbox (Console Emulator)';
    this.testOtp = '123456';
  }

  /**
   * Dispatches simulated SMS to console without external network calls
   * @param {string} mobile - 10-digit mobile
   * @param {string} message - Message text containing OTP
   */
  async send(mobile, message) {
    const timestamp = new Date().toISOString();
    const messageId = `SM-SANDBOX-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log('\n======================================================');
    console.log(`[SANDBOX SMS GATEWAY] Dispatch Event: ${timestamp}`);
    console.log(`To: +91-${mobile}`);
    console.log(`Message ID: ${messageId}`);
    console.log(`Content: "${message}"`);
    console.log('[SANDBOX ONLY] No real carrier SMS dispatched. Test code printed above.');
    console.log('======================================================\n');

    return {
      success: true,
      messageId,
      provider: 'sandbox',
      to: `+91${mobile}`,
      timestamp
    };
  }

  /**
   * Dispatches mock OTP
   */
  async sendOtp(mobile, options = {}) {
    const norm = normalizeIndianMobile(mobile);
    const mockOtp = this.testOtp;
    const msg = `Your Swasthya Setu verification code is ${mockOtp}. Valid for 5 minutes.`;
    await this.send(norm.valid ? norm.national : mobile, msg);

    return {
      success: true,
      message: 'OTP sent successfully (Sandbox mode).',
      providerRequestId: `MOCK-REQ-${Date.now()}`,
      _sandbox: true
    };
  }

  /**
   * Verifies mock OTP
   */
  async verifyOtp(mobile, otp) {
    const cleanOtp = String(otp || '').trim();
    if (cleanOtp === this.testOtp || cleanOtp === '1234') {
      return {
        success: true,
        message: 'OTP verified successfully (Sandbox mode).',
        _sandbox: true
      };
    }

    return {
      success: false,
      error: 'Incorrect OTP. (In Sandbox mode, use test code: 123456)',
      _sandbox: true
    };
  }

  /**
   * Retries mock OTP
   */
  async retryOtp(mobile, options = {}) {
    return this.sendOtp(mobile, options);
  }
}

module.exports = SandboxSMSProvider;
