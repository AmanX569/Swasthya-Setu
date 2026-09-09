/**
 * =========================================================
 * SWASTHYA SETU — INDIAN PHONE NUMBER NORMALIZATION UTILITY
 * =========================================================
 *
 * Normalizes, formats, and masks Indian mobile numbers consistently:
 * - Accepts: 9876543210, +919876543210, 919876543210, 09876543210
 * - Rejects non-Indian or invalid formats (must start with 6, 7, 8, 9)
 * - Returns:
 *     national: '9876543210'  (10 digits, canonical DB identity)
 *     msg91:    '919876543210' (12 digits with 91 prefix for MSG91 API)
 *     e164:     '+919876543210'
 *     masked:   '******3210'   (Safe for client display)
 */

'use strict';

/**
 * Normalizes and validates an Indian mobile number.
 * @param {string|number} input - Raw input mobile
 * @returns {{
 *   valid: boolean,
 *   error?: string,
 *   national?: string,
 *   msg91?: string,
 *   e164?: string,
 *   masked?: string
 * }}
 */
function normalizeIndianMobile(input) {
  if (!input && input !== 0) {
    return { valid: false, error: 'Mobile number is required.' };
  }

  // Convert to string and strip non-digit characters
  const raw = String(input).trim();
  let digits = raw.replace(/\D/g, '');

  // Strip leading zero if provided (e.g. 09876543210)
  if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  // Handle numbers with 91 prefix (12 digits)
  let tenDigit = '';
  if (digits.length === 12 && digits.startsWith('91')) {
    tenDigit = digits.slice(2);
  } else if (digits.length === 10) {
    tenDigit = digits;
  } else {
    return {
      valid: false,
      error: 'Please enter a valid 10-digit Indian mobile number.'
    };
  }

  // Indian mobile numbers must start with 6, 7, 8, or 9
  if (!/^[6-9]\d{9}$/.test(tenDigit)) {
    return {
      valid: false,
      error: 'Indian mobile numbers must start with 6, 7, 8, or 9.'
    };
  }

  const last4 = tenDigit.slice(-4);
  const masked = `******${last4}`;
  const e164 = `+91${tenDigit}`;
  const msg91 = `91${tenDigit}`;

  return {
    valid: true,
    national: tenDigit,
    msg91,
    e164,
    masked
  };
}

module.exports = {
  normalizeIndianMobile
};
