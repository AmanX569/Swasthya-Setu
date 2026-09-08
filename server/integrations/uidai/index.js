/**
 * =========================================================
 * SWASTHYA SETU — AADHAAR / UIDAI SERVICE ABSTRACTION
 * =========================================================
 */

'use strict';

const UIDAISandboxClient = require('./sandbox-client');
const UIDAIProductionClient = require('./production-client');

class AadhaarService {
  constructor(config) {
    this.config = config;
    this.env = (config && config.uidai && config.uidai.environment) || 'sandbox';
    this.client = this._initClient();
  }

  _initClient() {
    if (this.env === 'production') {
      try {
        return new UIDAIProductionClient(this.config.uidai);
      } catch (err) {
        console.error('[AadhaarService] Production init failed. Falling back to sandbox:', err.message);
        return new UIDAISandboxClient();
      }
    }
    return new UIDAISandboxClient();
  }

  async initiateAuthentication(aadhaarNumber, consentToken) {
    return this.client.initiateAuthentication(aadhaarNumber, consentToken);
  }

  async verifyAuthentication(txnId, otp) {
    return this.client.verifyAuthentication(txnId, otp);
  }
}

module.exports = AadhaarService;
