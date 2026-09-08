/**
 * =========================================================
 * SWASTHYA SETU — SMS SERVICE ABSTRACTION LAYER
 * =========================================================
 */

'use strict';

const SandboxSMSProvider = require('./sandbox-provider');
const TwilioSMSProvider = require('./twilio-provider');

class SMSService {
  /**
   * @param {object} config - App configuration
   */
  constructor(config) {
    this.config = config;
    this.providerType = (config && config.sms && config.sms.provider) || 'sandbox';
    this.provider = this._initProvider();
  }

  _initProvider() {
    if (this.providerType === 'twilio') {
      try {
        return new TwilioSMSProvider(this.config.sms.twilio);
      } catch (err) {
        console.error('[SMSService] Failed to initialize Twilio. Falling back to Sandbox:', err.message);
        return new SandboxSMSProvider();
      }
    }

    // Default to Sandbox provider
    return new SandboxSMSProvider();
  }

  /**
   * Dispatches an OTP verification message
   * @param {string} mobile - 10-digit mobile
   * @param {string} otp - Plaintext OTP
   */
  async sendOTP(mobile, otp) {
    const text = `Your Swasthya Setu (स्वास्थ्य सेतु) verification code is ${otp}. Valid for 5 minutes. Do not share this OTP with anyone.`;
    return this.provider.send(mobile, text);
  }

  /**
   * Dispatches a transactional notification SMS
   * @param {string} mobile - 10-digit mobile
   * @param {string} text - Message text
   */
  async sendMessage(mobile, text) {
    return this.provider.send(mobile, text);
  }
}

module.exports = SMSService;
