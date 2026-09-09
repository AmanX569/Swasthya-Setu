/**
 * =========================================================
 * SWASTHYA SETU — CENTRALIZED ADDRESS VALIDATION & UTILITIES
 * Single Source of Truth for Address Completeness & Normalization
 * =========================================================
 */

'use strict';

/**
 * Trim safely or return empty string
 */
function cleanStr(val) {
  if (val === null || val === undefined) return '';
  return String(val).trim();
}

/**
 * Validates Indian 6-digit postal PIN code
 */
function isValidPincode(pin) {
  const clean = cleanStr(pin);
  return /^[1-9][0-9]{5}$/.test(clean);
}

/**
 * Normalizes any address object into a standard structure
 * Handles all naming variations across frontend, database, and ABDM
 *
 * @param {object} raw
 * @returns {object} Normalized address
 */
function normalizeAddress(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const line1 = cleanStr(raw.address_line_1 || raw.address_line1 || raw.addressLine1 || raw.street);
  const line2 = cleanStr(raw.address_line_2 || raw.address_line2 || raw.addressLine2 || raw.locality);
  const landmark = cleanStr(raw.landmark);
  const country = cleanStr(raw.country) || 'India';
  const state = cleanStr(raw.state);
  const district = cleanStr(raw.district);
  const mandal = cleanStr(raw.mandal || raw.mandal_taluk_tehsil || raw.subdistrict || raw.tehsil || raw.taluk);
  const villageCity = cleanStr(raw.village_city || raw.village_town_city || raw.villageCity || raw.village || raw.city || raw.town);
  const pincode = cleanStr(raw.pincode || raw.postal_code || raw.pin);

  return {
    // Primary DB fields (snake_case)
    address_line_1: line1,
    address_line_2: line2,
    landmark,
    country,
    state,
    district,
    mandal,
    village_city: villageCity,
    pincode,

    // Backward-compatible mirror fields
    address_line1: line1,
    address_line2: line2,
    mandal_taluk_tehsil: mandal,
    village_town_city: villageCity,
    address_type: raw.address_type || 'PERMANENT',
    is_verified: true
  };
}

/**
 * Centralized evaluator: Determines whether a patient has a complete permanent address.
 *
 * REQUIRED FIELDS:
 * - Address Line 1
 * - Country
 * - State
 * - District
 * - Village / Town / City
 * - Valid 6-digit Indian Pincode
 *
 * OPTIONAL FIELDS:
 * - Address Line 2
 * - Mandal / Taluk / Tehsil
 * - Landmark
 *
 * @param {object} target - Patient object or Address object
 * @returns {boolean}
 */
function isPermanentAddressComplete(target) {
  if (!target || typeof target !== 'object') {
    return false;
  }

  // If target is patient, extract address sub-object
  let addr = target;
  if (target.permanent_address || target.address || target.permanentAddress || target.patientAddress) {
    addr = target.permanent_address || target.address || target.permanentAddress || target.patientAddress;
  }

  if (target.permanent_address_completed === true && (addr || target.village)) {
    if (!addr || typeof addr !== 'object') return true;
  }

  if (!addr || typeof addr !== 'object') {
    return false;
  }

  const normalized = normalizeAddress(addr);
  if (!normalized) {
    return false;
  }

  // Strict required fields check (non-empty trimmed strings)
  if (!normalized.address_line_1) return false;
  if (!normalized.country) return false;
  if (!normalized.state) return false;
  if (!normalized.district) return false;
  if (!normalized.village_city) return false;
  if (!isValidPincode(normalized.pincode)) return false;

  return true;
}

module.exports = {
  cleanStr,
  isValidPincode,
  normalizeAddress,
  isPermanentAddressComplete
};
