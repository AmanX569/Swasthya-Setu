/**
 * =========================================================
 * SWASTHYA SETU — INPUT VALIDATION HELPERS & MIDDLEWARE
 * =========================================================
 */

'use strict';

/**
 * Validates Indian 10-digit mobile number (starts with 6-9)
 * @param {string} mobile
 * @returns {{ valid: boolean, error?: string }}
 */
function validateMobile(mobile) {
  if (!mobile || typeof mobile !== 'string') {
    return { valid: false, error: 'Mobile number is required' };
  }
  const clean = mobile.replace(/\D/g, '');
  if (!/^[6-9]\d{9}$/.test(clean)) {
    return { valid: false, error: 'Must be a valid 10-digit Indian mobile number (e.g. 9876543210)' };
  }
  return { valid: true, sanitized: clean };
}

/**
 * Validates 14-digit ABHA Number (14-XXXX-XXXX-XXXX or 14 digits)
 * @param {string} abha
 * @returns {{ valid: boolean, error?: string }}
 */
function validateAbhaId(abha) {
  if (!abha || typeof abha !== 'string') {
    return { valid: false, error: 'ABHA ID / Number is required' };
  }
  const trimmed = abha.trim();
  // Formats: 14-XXXX-XXXX-XXXX or 14XXXXXXXXXX
  if (!/^14(-\d{4}-\d{4}-\d{4}|\d{12})$/.test(trimmed)) {
    return { valid: false, error: 'ABHA ID must be a 14-digit number starting with 14 (e.g. 14-8921-4402-9912)' };
  }
  return { valid: true, sanitized: trimmed };
}

/**
 * Validates password strength (minimum 4 characters for basic healthcare pin/pass)
 * @param {string} password
 * @returns {{ valid: boolean, error?: string }}
 */
function validatePassword(password) {
  if (!password || typeof password !== 'string' || password.length < 4) {
    return { valid: false, error: 'Password or PIN must be at least 4 characters long' };
  }
  return { valid: true };
}

/**
 * Validates 6-digit Indian PIN Code
 * @param {string} pincode
 * @returns {{ valid: boolean, error?: string }}
 */
function validatePincode(pincode) {
  if (!pincode || !/^[1-9][0-9]{5}$/.test(String(pincode).trim())) {
    return { valid: false, error: 'Pincode must be a valid 6-digit Indian Postal Code' };
  }
  return { valid: true, sanitized: String(pincode).trim() };
}

/**
 * Validates 12-digit Aadhaar input format for sandbox tests
 * Note: Raw Aadhaar numbers are never stored in the database!
 * @param {string} aadhaar
 * @returns {{ valid: boolean, error?: string }}
 */
function validateAadhaarNumber(aadhaar) {
  if (!aadhaar) {
    return { valid: false, error: 'Aadhaar number is required' };
  }
  const clean = String(aadhaar).replace(/\D/g, '');
  if (!/^\d{12}$/.test(clean)) {
    return { valid: false, error: 'Aadhaar must be a 12-digit number' };
  }
  return { valid: true, sanitized: clean };
}

module.exports = {
  validateMobile,
  validateAbhaId,
  validatePassword,
  validatePincode,
  validateAadhaarNumber
};
