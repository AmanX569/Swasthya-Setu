/**
 * =========================================================
 * SWASTHYA SETU — ENVIRONMENT STARTUP VALIDATOR
 * =========================================================
 */

'use strict';

/**
 * Validates configuration against target environment requirements.
 * Ensures that production cannot start without proper authorized credentials,
 * and sandbox runs safely without silently connecting to real government gateways.
 *
 * @param {object} config - Application configuration object
 * @returns {{ valid: boolean, errors: string[], warnings: string[] }}
 */
function validateEnvironment(config) {
  const errors = [];
  const warnings = [];

  const isProd = config.env === 'production';
  const isSandbox = config.env === 'sandbox';

  // JWT Secret checks
  if (isProd) {
    if (!config.jwt.secret || config.jwt.secret.includes('development-secret') || config.jwt.secret.length < 32) {
      errors.push('CRITICAL: JWT_SECRET must be set to a secure random string of at least 32 characters in production.');
    }
  } else {
    if (!config.jwt.secret || config.jwt.secret.includes('development-secret')) {
      warnings.push('NOTICE: Using default JWT secret for non-production environment.');
    }
  }

  // Database checks
  if (!config.supabase.url || !config.supabase.serviceRoleKey) {
    if (isProd) {
      errors.push('CRITICAL: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in production.');
    } else {
      warnings.push('WARNING: SUPABASE_SERVICE_ROLE_KEY not configured. Falling back to anon key.');
    }
  }

  // SMS Gateway validation
  if (isProd) {
    if (config.sms.provider === 'sandbox') {
      errors.push('CRITICAL: SMS_PROVIDER cannot be "sandbox" in production. Configure a licensed provider (e.g., twilio/msg91).');
    } else if (config.sms.provider === 'twilio') {
      if (!config.sms.twilio.accountSid || !config.sms.twilio.authToken || !config.sms.twilio.fromNumber) {
        errors.push('CRITICAL: Twilio configuration (SMS_TWILIO_ACCOUNT_SID, SMS_TWILIO_AUTH_TOKEN, SMS_TWILIO_FROM_NUMBER) incomplete.');
      }
    }
  } else {
    if (config.sms.provider === 'sandbox') {
      warnings.push('INFO: SMS_PROVIDER is set to "sandbox". Verification codes will be printed to server console.');
    }
  }

  // ABDM / ABHA validation
  if (config.abdm.environment === 'production') {
    if (!config.abdm.clientId || !config.abdm.clientSecret) {
      errors.push('CRITICAL: ABDM_CLIENT_ID and ABDM_CLIENT_SECRET are required when ABDM_ENVIRONMENT=production.');
    }
  } else {
    warnings.push('INFO: ABDM integration running in SANDBOX mode (using simulated ABDM Gateway & test ABHAs).');
  }

  // UIDAI / Aadhaar validation
  if (config.uidai.environment === 'production') {
    if (!config.uidai.auaCode) {
      errors.push('CRITICAL: UIDAI_AUA_CODE is required when UIDAI_ENVIRONMENT=production. Only authorized AUAs may connect.');
    }
  } else {
    warnings.push('INFO: UIDAI integration running in SANDBOX mode (using synthetic test Aadhaar tokens).');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

module.exports = { validateEnvironment };
