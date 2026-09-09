/**
 * =========================================================
 * SWASTHYA SETU — SMS & OTP SERVICE ABSTRACTION LAYER
 * =========================================================
 *
 * Supports:
 * - 'msg91': Real transactional SMS OTP via MSG91 V5 SendOTP API
 * - 'sandbox' / 'mock': Local developer console simulator
 * - 'twilio': Twilio SMS adapter
 *
 * Compliance:
 * - If OTP_PROVIDER=msg91 and configuration is missing, FAILS LOUDLY.
 * - Never silently falls back from MSG91 to mock in production mode.
 */

'use strict';

const SandboxSMSProvider = require('./sandbox-provider');
const TwilioSMSProvider = require('./twilio-provider');
const Msg91OtpProvider = require('./msg91-provider');

class SMSService {
  /**
   * @param {object} config - App configuration
   */
  constructor(config = {}) {
    this.config = config;
    this.env = config.env || 'development';
    this.providerType = (config.sms && config.sms.provider) || 'sandbox';
    this.provider = this._initProvider();
  }

  _initProvider() {
    const isProd = this.env === 'production';

    if (this.providerType === 'msg91') {
      const msg91Config = (this.config.sms && this.config.sms.msg91) || {};
      if (!msg91Config.authKey || !msg91Config.templateId) {
        const missing = [];
        if (!msg91Config.authKey) missing.push('MSG91_AUTH_KEY');
        if (!msg91Config.templateId) missing.push('MSG91_OTP_TEMPLATE_ID');

        const errMsg = `[SMSService] Critical Configuration Error: MSG91 provider requires ${missing.join(' and ')}.`;
        console.error(errMsg);

        if (isProd || this.providerType === 'msg91') {
          throw new Error(errMsg + ' Set these environment variables before starting.');
        }
        console.warn('[SMSService] Falling back to Sandbox emulator for local dev.');
        return new SandboxSMSProvider();
      }

      return new Msg91OtpProvider(msg91Config);
    }

    if (this.providerType === 'twilio') {
      try {
        return new TwilioSMSProvider(this.config.sms.twilio);
      } catch (err) {
        console.error('[SMSService] Failed to initialize Twilio:', err.message);
        if (isProd) throw err;
        return new SandboxSMSProvider();
      }
    }

    // Explicit sandbox / mock provider
    return new SandboxSMSProvider();
  }

  /**
   * Send OTP via active provider (MSG91 or Sandbox)
   * @param {string} mobile
   * @param {object} [options]
   */
  async sendOtp(mobile, options = {}) {
    if (typeof this.provider.sendOtp === 'function') {
      return this.provider.sendOtp(mobile, options);
    }

    // Fallback for generic SMS sender
    const otp = options.otp || '123456';
    const text = `Your Swasthya Setu (स्वास्थ्य सेतु) verification code is ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`;
    return this.provider.send(mobile, text);
  }

  /**
   * Verify OTP via active provider (MSG91 or Sandbox)
   * @param {string} mobile
   * @param {string} otp
   */
  async verifyOtp(mobile, otp) {
    if (typeof this.provider.verifyOtp === 'function') {
      return this.provider.verifyOtp(mobile, otp);
    }

    // Fallback comparison
    return { success: false, error: 'OTP verification not supported by current provider.' };
  }

  /**
   * Resend/retry OTP via active provider
   * @param {string} mobile
   * @param {object} [options]
   */
  async retryOtp(mobile, options = {}) {
    if (typeof this.provider.retryOtp === 'function') {
      return this.provider.retryOtp(mobile, options);
    }
    return this.sendOtp(mobile, options);
  }

  /**
   * Dispatches arbitrary transactional text message
   */
  async sendMessage(mobile, text) {
    if (typeof this.provider.send === 'function') {
      return this.provider.send(mobile, text);
    }
    return { success: true };
  }
}

module.exports = SMSService;
