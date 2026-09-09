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

  // SMS & OTP Gateway validation
  const provider = config.sms.provider;
  if (isProd) {
    if (provider === 'sandbox' || provider === 'mock') {
      errors.push('CRITICAL: OTP_PROVIDER / SMS_PROVIDER cannot be "sandbox" or "mock" in production. Configure a licensed provider (msg91/twilio).');
    } else if (provider === 'msg91') {
      if (!config.sms.msg91.authKey) {
        errors.push('CRITICAL: MSG91_AUTH_KEY is required in production when OTP_PROVIDER=msg91.');
      }
      if (!config.sms.msg91.templateId) {
        errors.push('CRITICAL: MSG91_OTP_TEMPLATE_ID is required in production when OTP_PROVIDER=msg91.');
      }
    } else if (provider === 'twilio') {
      const tw = config.sms.twilio;
      if (!tw.accountSid || !tw.authToken || (!tw.fromNumber && !tw.verifyServiceSid)) {
        errors.push('CRITICAL: Twilio configuration (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER or TWILIO_VERIFY_SERVICE_SID) incomplete.');
      }
    }
  } else {
    if (provider === 'twilio') {
      const tw = config.sms.twilio;
      if (!tw.accountSid || !tw.authToken || (!tw.fromNumber && !tw.verifyServiceSid)) {
        errors.push('CRITICAL: Twilio provider selected (OTP_PROVIDER=twilio) but TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, or TWILIO_PHONE_NUMBER is missing. Configure keys or set OTP_PROVIDER=sandbox.');
      }
    } else if (provider === 'msg91') {
      if (!config.sms.msg91.authKey || !config.sms.msg91.templateId) {
        errors.push('CRITICAL: MSG91 provider selected (OTP_PROVIDER=msg91) but MSG91_AUTH_KEY or MSG91_OTP_TEMPLATE_ID is missing. Configure keys or set OTP_PROVIDER=sandbox for local testing.');
      }
    } else if (provider === 'sandbox' || provider === 'mock') {
      warnings.push('INFO: OTP_PROVIDER is set to "sandbox/mock". Verification codes will be printed to server console.');
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
