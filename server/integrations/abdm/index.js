/**
 * =========================================================
 * SWASTHYA SETU — ABDM SERVICE ABSTRACTION
 * =========================================================
 */

'use strict';

const ABDMSandboxClient = require('./sandbox-client');
const ABDMProductionClient = require('./production-client');

class ABDMService {
  constructor(config) {
    this.config = config;
    this.env = (config && config.abdm && config.abdm.environment) || 'sandbox';
    this.client = this._initClient();
  }

  _initClient() {
    if (this.env === 'production') {
      try {
        return new ABDMProductionClient(this.config.abdm);
      } catch (err) {
        console.error('[ABDMService] Production init failed. Falling back to sandbox:', err.message);
        return new ABDMSandboxClient();
      }
    }
    return new ABDMSandboxClient();
  }

  async initiateABHAAuthentication(abhaIdentifier) {
    return this.client.initiateAuthentication(abhaIdentifier);
  }

  async verifyABHAAuthentication(txnId, otp) {
    return this.client.verifyAuthentication(txnId, otp);
  }

  async requestConsent(patientId, hiTypes) {
    return this.client.requestConsent(patientId, hiTypes);
  }

  async getConsentStatus(consentId) {
    return this.client.getConsentStatus(consentId);
  }
}

module.exports = ABDMService;
