/**
 * =========================================================
 * SWASTHYA SETU — TWILIO SMS PROVIDER (PRODUCTION ADAPTER)
 * =========================================================
 */

'use strict';

class TwilioSMSProvider {
  /**
   * @param {object} twilioConfig - { accountSid, authToken, fromNumber }
   */
  constructor(twilioConfig) {
    if (!twilioConfig || !twilioConfig.accountSid || !twilioConfig.authToken || !twilioConfig.fromNumber) {
      throw new Error('TwilioSMSProvider initialization failed: accountSid, authToken, and fromNumber are required.');
    }

    this.accountSid = twilioConfig.accountSid;
    this.authToken = twilioConfig.authToken;
    this.fromNumber = twilioConfig.fromNumber;
    this.name = 'Twilio SMS Gateway';

    // Optional lazy-load of official Twilio SDK if present
    try {
      const twilio = require('twilio');
      this.client = twilio(this.accountSid, this.authToken);
    } catch (e) {
      console.warn('[TwilioSMSProvider] Official twilio npm package not installed. Install via "npm install twilio" to activate live SMS.');
      this.client = null;
    }
  }

  /**
   * Sends transactional SMS via Twilio
   * @param {string} mobile - 10-digit mobile
   * @param {string} message - Message body
   */
  async send(mobile, message) {
    const formattedTo = mobile.startsWith('+') ? mobile : `+91${mobile}`;

    if (!this.client) {
      throw new Error('Twilio client is not initialized. Check server twilio package installation.');
    }

    try {
      const res = await this.client.messages.create({
        body: message,
        from: this.fromNumber,
        to: formattedTo
      });

      return {
        success: true,
        messageId: res.sid,
        provider: 'twilio',
        to: formattedTo
      };
    } catch (err) {
      console.error('[TwilioSMSProvider] Delivery failed:', err.message);
      throw new Error(`Twilio SMS dispatch failed: ${err.message}`);
    }
  }
}

module.exports = TwilioSMSProvider;
