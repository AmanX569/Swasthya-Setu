/**
 * =========================================================
 * SWASTHYA SETU — UIDAI PRODUCTION CLIENT
 * Blocked / Guarded Client for Authorized UIDAI AUA/KUA
 * =========================================================
 */

'use strict';

class UIDAIProductionClient {
  constructor(config) {
    if (!config || !config.auaCode) {
      throw new Error(
        'UIDAI production authentication requires authorized AUA registration, ' +
        'ASA partnership, and valid UIDAI digital certificates. ' +
        'Complete UIDAI onboarding before enabling production mode.'
      );
    }
    this.auaCode = config.auaCode;
    this.subAuaCode = config.subAuaCode;
  }

  async initiateAuthentication(aadhaarNumber, consentToken) {
    throw new Error('UIDAI live production authentication is legally prohibited without an active AUA/ASA operational license.');
  }

  async verifyAuthentication(txnId, otp) {
    throw new Error('UIDAI live e-KYC verification is legally prohibited without an active AUA/ASA operational license.');
  }
}

module.exports = UIDAIProductionClient;
