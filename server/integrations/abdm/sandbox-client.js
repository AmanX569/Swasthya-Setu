/**
 * =========================================================
 * SWASTHYA SETU — ABDM / ABHA SANDBOX CLIENT
 * Official ABDM Sandbox simulator conforming to NHA API standards
 * =========================================================
 */

'use strict';

class ABDMSandboxClient {
  constructor() {
    this.name = 'National Health Authority ABDM Sandbox Simulator';
    // Test directory of recognized ABDM sandbox personas
    this.testIdentities = {
      '14-8921-4402-9912': {
        abhaId: '14-8921-4402-9912',
        abhaAddress: 'ramesh.kumar@abdm',
        name: 'Ramesh Kumar',
        gender: 'M',
        dob: '1986-04-12',
        mobile: '9876543210',
        district: 'NTR',
        state: 'Andhra Pradesh',
        pincode: '521228'
      },
      '14-3819-5510-7734': {
        abhaId: '14-3819-5510-7734',
        abhaAddress: 'sunita.devi@abdm',
        name: 'Sunita Devi',
        gender: 'F',
        dob: '1990-08-25',
        mobile: '9876543211',
        district: 'NTR',
        state: 'Andhra Pradesh',
        pincode: '521228'
      }
    };
  }

  /**
   * Initiates ABHA authentication session
   * @param {string} abhaIdentifier - 14-digit ABHA Number or ABHA Address (e.g. name@abdm)
   */
  async initiateAuthentication(abhaIdentifier) {
    // Artificial 250ms network delay simulation
    await new Promise(r => setTimeout(r, 250));

    const txnId = `ABDM-TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log(`[ABDM SANDBOX] Initiated auth for identifier: ${abhaIdentifier}. TxnId: ${txnId}`);

    return {
      success: true,
      txnId,
      authModes: ['MOBILE_OTP', 'AADHAAR_OTP'],
      message: 'ABDM OTP dispatched to linked mobile number.',
      _sandbox: true
    };
  }

  /**
   * Verifies OTP against ABDM Gateway
   * @param {string} txnId
   * @param {string} otp - '123456' for sandbox test pass
   */
  async verifyAuthentication(txnId, otp) {
    await new Promise(r => setTimeout(r, 300));

    if (otp !== '123456') {
      return {
        success: false,
        error: 'Invalid ABDM OTP code. (In sandbox mode, use "123456")',
        code: 'ABDM_INVALID_OTP',
        _sandbox: true
      };
    }

    // Return official test profile
    const profile = this.testIdentities['14-8921-4402-9912'];

    return {
      success: true,
      verified: true,
      txnId,
      token: `abdm_token_${Date.now()}`,
      patient: {
        healthId: profile.abhaAddress,
        healthIdNumber: profile.abhaId,
        name: profile.name,
        gender: profile.gender,
        yearOfBirth: profile.dob.split('-')[0],
        dateOfBirth: profile.dob,
        mobile: profile.mobile,
        address: {
          district: profile.district,
          state: profile.state,
          pincode: profile.pincode
        }
      },
      _sandbox: true
    };
  }

  /**
   * Requests patient consent for ABDM data link
   */
  async requestConsent(patientId, hiTypes = ['DiagnosticReport', 'Prescription']) {
    const consentId = `ABDM-CONSENT-${Date.now()}`;
    return {
      success: true,
      consentId,
      status: 'REQUESTED',
      hiTypes,
      _sandbox: true
    };
  }

  /**
   * Queries consent status
   */
  async getConsentStatus(consentId) {
    return {
      success: true,
      consentId,
      status: 'GRANTED',
      grantedAt: new Date().toISOString(),
      _sandbox: true
    };
  }
}

module.exports = ABDMSandboxClient;
