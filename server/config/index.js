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
    provider: process.env.OTP_PROVIDER || process.env.SMS_PROVIDER || 'sandbox', // 'msg91' | 'sandbox' | 'mock' | 'twilio'
    msg91: {
      authKey: process.env.MSG91_AUTH_KEY || '',
      templateId: process.env.MSG91_OTP_TEMPLATE_ID || '',
      dltTemplateId: process.env.MSG91_DLT_TEMPLATE_ID || '',
      senderId: process.env.MSG91_SENDER_ID || '',
      baseUrl: process.env.MSG91_BASE_URL || 'https://control.msg91.com'
    },
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID || process.env.SMS_TWILIO_ACCOUNT_SID || '',
      authToken: process.env.TWILIO_AUTH_TOKEN || process.env.SMS_TWILIO_AUTH_TOKEN || '',
      fromNumber: process.env.TWILIO_PHONE_NUMBER || process.env.SMS_TWILIO_FROM_NUMBER || '',
      verifyServiceSid: process.env.TWILIO_VERIFY_SERVICE_SID || ''
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
