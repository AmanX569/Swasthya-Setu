/**
 * =========================================================
 * SWASTHYA SETU — UIDAI / AADHAAR SANDBOX CLIENT
 * Safe developer simulator using UIDAI synthetic test range
 * =========================================================
 *
 * NOTE: In strict accordance with the Aadhaar Act & Regulations:
 * - RAW AADHAAR NUMBERS ARE NEVER STORED
 * - BIOMETRIC AND PID DATA ARE NEVER STORED
 * - ONLY MASKED REFERENCES (XXXX-XXXX-XXXX) AND CONSENT TOKENS ARE STORED
 */

'use strict';

class UIDAISandboxClient {
  constructor() {
    this.name = 'UIDAI Sandbox Test Simulator';
    // Synthetic UIDAI testing personas (using designated sandbox Aadhaar numbers)
    this.testAadhaars = {
      '999999990019': {
        name: 'Ramesh Kumar',
        dob: '1986-04-12',
        gender: 'M',
        maskedAadhaar: 'XXXX-XXXX-0019',
        address: {
          careOf: 'S/O Late Krishna Murthy',
          house: 'Door No. 4-12',
          street: 'Gandhi Road',
          landmark: 'Panchayat Library',
          locality: 'Ward 4',
          village: 'Kondapalli',
          district: 'NTR',
          state: 'Andhra Pradesh',
          pincode: '521228'
        }
      }
    };
  }

  /**
   * Initiates Aadhaar OTP verification against UIDAI Sandbox
   * @param {string} aadhaarNumber - 12-digit synthetic test number
   * @param {string} consentToken - Cryptographic proof of informed user consent
   */
  async initiateAuthentication(aadhaarNumber, consentToken) {
    if (!consentToken) {
      throw new Error('UIDAI authentication requires informed citizen consent token.');
    }

    await new Promise(r => setTimeout(r, 300));
    const txnId = `UIDAI-TXN-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const last4 = String(aadhaarNumber).slice(-4);
    console.log(`[UIDAI SANDBOX] OTP sent for test Aadhaar ending in ...${last4}. TxnId: ${txnId}`);

    return {
      success: true,
      txnId,
      maskedMobile: '+91 ******3210',
      message: 'Aadhaar OTP dispatched to linked mobile number.',
      _sandbox: true
    };
  }

  /**
   * Verifies Aadhaar OTP and returns authorized demographic e-KYC
   * @param {string} txnId
   * @param {string} otp - '123456' in sandbox
   */
  async verifyAuthentication(txnId, otp) {
    await new Promise(r => setTimeout(r, 400));

    if (otp !== '123456') {
      return {
        success: false,
        error: 'Invalid Aadhaar OTP code. (In sandbox mode, enter "123456")',
        code: 'UIDAI_INVALID_OTP',
        _sandbox: true
      };
    }

    const testProfile = this.testAadhaars['999999990019'];

    return {
      success: true,
      verified: true,
      txnId,
      eKycData: {
        name: testProfile.name,
        dob: testProfile.dob,
        gender: testProfile.gender,
        maskedAadhaar: testProfile.maskedAadhaar,
        address: testProfile.address
      },
      _sandbox: true
    };
  }
}

module.exports = UIDAISandboxClient;
