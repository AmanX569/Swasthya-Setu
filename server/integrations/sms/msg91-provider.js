/**
 * =========================================================
 * SWASTHYA SETU — MSG91 OTP PROVIDER
 * Implements OtpProvider abstraction using official MSG91 V5 API
 * =========================================================
 */

'use strict';

const Msg91Client = require('./msg91-client');
const { normalizeIndianMobile } = require('../../utils/phone');

class Msg91OtpProvider {
  /**
   * @param {object} config - MSG91 configuration
   */
  constructor(config = {}) {
    if (!config.authKey) {
      throw new Error(
        'Msg91OtpProvider requires MSG91_AUTH_KEY. Please configure MSG91_AUTH_KEY in server environment.'
      );
    }
    if (!config.templateId) {
      throw new Error(
        'Msg91OtpProvider requires MSG91_OTP_TEMPLATE_ID. Complete DLT registration and configure template ID in MSG91 dashboard.'
      );
    }

    this.name = 'MSG91 Real SMS Gateway';
    this.client = new Msg91Client({
      authKey: config.authKey,
      templateId: config.templateId,
      baseUrl: config.baseUrl || 'https://control.msg91.com'
    });
  }

  /**
   * Dispatches real SMS OTP to Indian mobile
   * @param {string} mobile - Any format Indian mobile
   * @param {object} [options]
   * @returns {Promise<{success: boolean, message: string, providerRequestId?: string}>}
   */
  async sendOtp(mobile, options = {}) {
    const norm = normalizeIndianMobile(mobile);
    if (!norm.valid) {
      throw new Error(norm.error);
    }

    return this.client.sendOtp({
      mobile: norm.msg91,
      templateId: options.templateId,
      otpExpiry: options.otpExpiry || 5,
      otpLength: options.otpLength || 6
    });
  }

  /**
   * Verifies OTP against MSG91 V5 gateway
   * @param {string} mobile - Any format Indian mobile
   * @param {string} otp - 4 or 6 digit OTP
   * @returns {Promise<{success: boolean, message?: string, error?: string}>}
   */
  async verifyOtp(mobile, otp) {
    const norm = normalizeIndianMobile(mobile);
    if (!norm.valid) {
      return { success: false, error: norm.error };
    }

    return this.client.verifyOtp({
      mobile: norm.msg91,
      otp
    });
  }

  /**
   * Retries/resends OTP via MSG91
   * @param {string} mobile
   * @param {object} [options]
   * @returns {Promise<{success: boolean, message: string}>}
   */
  async retryOtp(mobile, options = {}) {
    const norm = normalizeIndianMobile(mobile);
    if (!norm.valid) {
      throw new Error(norm.error);
    }

    return this.client.retryOtp({
      mobile: norm.msg91,
      retryType: options.retryType || 'text'
    });
  }
}

module.exports = Msg91OtpProvider;
