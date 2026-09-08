/**
 * Test suite for SMS, ABDM, and UIDAI Integrations
 */

'use strict';

const assert = require('assert');
const config = require('../config');
const SMSService = require('../integrations/sms');
const ABDMService = require('../integrations/abdm');
const AadhaarService = require('../integrations/uidai');

async function runTests() {
  console.log('--- Running Integrations Test Suite ---');

  // 1. Test SMS Service
  const sms = new SMSService(config);
  const smsRes = await sms.sendOTP('9876543210', '123456');
  assert.strictEqual(smsRes.success, true, 'SMS sandbox dispatch should succeed');
  assert.strictEqual(smsRes.provider, 'sandbox', 'Provider should be sandbox');
  console.log('✓ SMS Sandbox Provider passed');

  // 2. Test ABDM Service (Sandbox)
  const abdm = new ABDMService(config);
  const abdmInit = await abdm.initiateABHAAuthentication('14-8921-4402-9912');
  assert.strictEqual(abdmInit.success, true);
  assert(abdmInit.txnId, 'Txn ID must be present');

  const abdmFail = await abdm.verifyABHAAuthentication(abdmInit.txnId, '000000');
  assert.strictEqual(abdmFail.success, false, 'Invalid OTP should fail');

  const abdmPass = await abdm.verifyABHAAuthentication(abdmInit.txnId, '123456');
  assert.strictEqual(abdmPass.success, true, 'Valid sandbox OTP should pass');
  assert.strictEqual(abdmPass.patient.healthIdNumber, '14-8921-4402-9912');
  console.log('✓ ABDM Sandbox Client passed');

  // 3. Test UIDAI Service (Sandbox)
  const uidai = new AadhaarService(config);
  const uidaiInit = await uidai.initiateAuthentication('999999990019', 'CONSENT-TEST-TOKEN');
  assert.strictEqual(uidaiInit.success, true);

  const uidaiFail = await uidai.verifyAuthentication(uidaiInit.txnId, '000000');
  assert.strictEqual(uidaiFail.success, false);

  const uidaiPass = await uidai.verifyAuthentication(uidaiInit.txnId, '123456');
  assert.strictEqual(uidaiPass.success, true);
  assert.strictEqual(uidaiPass.eKycData.maskedAadhaar, 'XXXX-XXXX-0019');
  console.log('✓ UIDAI Sandbox Client passed');

  console.log('All Integration tests passed successfully!\n');
}

runTests().catch(err => {
  console.error('Integration test failed:', err);
  process.exit(1);
});
