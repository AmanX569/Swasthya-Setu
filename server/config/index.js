/**
 * =========================================================
 * SWASTHYA SETU — CONFIGURATION LOADER
 * =========================================================
 */

'use strict';

const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const config = {
  env: process.env.NODE_ENV || 'development', // 'development' | 'sandbox' | 'production'
  server: {
    port: parseInt(process.env.PORT, 10) || 5000,
    apiPrefix: '/api'
  },
  supabase: {
    url: process.env.SUPABASE_URL || 'https://bqtinztvktsosuypuifi.supabase.co',
    anonKey: process.env.SUPABASE_ANON_KEY || 'sb_publishable_TLWSYjSbIrgVfbt86PjgOQ_TaOyTtz4',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'swasthya-setu-development-secret-key-32chars',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  },
  sms: {
    provider: process.env.SMS_PROVIDER || 'sandbox', // 'sandbox' | 'twilio' | 'msg91'
    twilio: {
      accountSid: process.env.SMS_TWILIO_ACCOUNT_SID || '',
      authToken: process.env.SMS_TWILIO_AUTH_TOKEN || '',
      fromNumber: process.env.SMS_TWILIO_FROM_NUMBER || ''
    }
  },
  abdm: {
    environment: process.env.ABDM_ENVIRONMENT || 'sandbox', // 'sandbox' | 'production'
    clientId: process.env.ABDM_CLIENT_ID || '',
    clientSecret: process.env.ABDM_CLIENT_SECRET || '',
    baseUrl: process.env.ABDM_BASE_URL || 'https://dev.abdm.gov.in/gateway/v0.5'
  },
  uidai: {
    environment: process.env.UIDAI_ENVIRONMENT || 'sandbox', // 'sandbox' | 'production'
    auaCode: process.env.UIDAI_AUA_CODE || '',
    subAuaCode: process.env.UIDAI_SUB_AUA_CODE || ''
  }
};

module.exports = config;
