/**
 * =========================================================
 * SWASTHYA SETU — ABDM PRODUCTION CLIENT
 * Direct integration with NHA National Gateway
 * =========================================================
 *
 * NOTE: Production endpoints and authentication flow must follow
 * the latest ABDM developer documentation at https://sandbox.abdm.gov.in/docs/
 *
 * Requirements for Production Execution:
 * 1. Registered ABDM Health Information Provider (HIP) / Health Information User (HIU)
 * 2. Approved ABDM Client ID & Secret
 * 3. Whitelisted IP addresses and SSL certificates
 */

'use strict';

class ABDMProductionClient {
  constructor(config) {
    if (!config || !config.clientId || !config.clientSecret) {
      throw new Error(
        'ABDM production client requires ABDM_CLIENT_ID and ABDM_CLIENT_SECRET. ' +
        'Complete ABDM HIP onboarding at https://abdm.gov.in before enabling production mode.'
      );
    }

    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.baseUrl = config.baseUrl || 'https://dev.abdm.gov.in/gateway/v0.5';
  }

  async initiateAuthentication(abhaIdentifier) {
    throw new Error('ABDM production gateway session initiation requires active NHA Gateway credentials and certificate exchange.');
  }

  async verifyAuthentication(txnId, otp) {
    throw new Error('ABDM production authentication verification is blocked pending official sandbox-to-production migration certification.');
  }

  async requestConsent(patientId, hiTypes) {
    throw new Error('ABDM production consent management requires active HIP/HIU registration.');
  }

  async getConsentStatus(consentId) {
    throw new Error('ABDM production consent lookup requires active HIP/HIU registration.');
  }
}

module.exports = ABDMProductionClient;
