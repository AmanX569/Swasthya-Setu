/**
 * Test suite for Auth & Validation logic
 */

'use strict';

const assert = require('assert');
const { validateMobile, validateAbhaId, validatePassword, validatePincode, validateAadhaarNumber } = require('../middleware/validate');
const { generateToken } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function runTests() {
  console.log('--- Running Validation & Auth Unit Tests ---');

  // 1. Mobile validation
  assert.strictEqual(validateMobile('9876543210').valid, true);
  assert.strictEqual(validateMobile('6123456789').valid, true);
  assert.strictEqual(validateMobile('1234567890').valid, false);
  assert.strictEqual(validateMobile('98765').valid, false);
  console.log('✓ Mobile number validator passed');

  // 2. ABHA validation
  assert.strictEqual(validateAbhaId('14-8921-4402-9912').valid, true);
  assert.strictEqual(validateAbhaId('14892144029912').valid, true);
  assert.strictEqual(validateAbhaId('12-8921-4402-9912').valid, false);
  console.log('✓ ABHA ID validator passed');

  // 3. Password validation
  assert.strictEqual(validatePassword('1234').valid, true);
  assert.strictEqual(validatePassword('12').valid, false);
  console.log('✓ Password validator passed');

  // 4. Pincode validation
  assert.strictEqual(validatePincode('521228').valid, true);
  assert.strictEqual(validatePincode('021228').valid, false);
  assert.strictEqual(validatePincode('52122').valid, false);
  console.log('✓ Pincode validator passed');

  // 5. Aadhaar validation
  assert.strictEqual(validateAadhaarNumber('999999990019').valid, true);
  assert.strictEqual(validateAadhaarNumber('99999999').valid, false);
  console.log('✓ Aadhaar number validator passed');

  // 6. JWT Token generation & verification
  const payload = { id: 'PT-001001', role: 'patient', mobile: '9876543210' };
  const token = generateToken(payload);
  assert(token, 'Token should be generated');

  const decoded = jwt.verify(token, config.jwt.secret);
  assert.strictEqual(decoded.id, 'PT-001001');
  assert.strictEqual(decoded.role, 'patient');
  console.log('✓ JWT Token generation & verification passed');

  console.log('All Validation & Auth tests passed successfully!\n');
}

runTests().catch(err => {
  console.error('Validation test failed:', err);
  process.exit(1);
});
