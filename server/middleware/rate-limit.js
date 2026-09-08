/**
 * =========================================================
 * SWASTHYA SETU — RATE LIMITING MIDDLEWARE
 * =========================================================
 */

'use strict';

const rateLimit = require('express-rate-limit');

// General API Rate Limit: 100 requests per 15 minutes per IP
const generalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this network. Please try again later.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Authentication rate limit: 20 login/register attempts per 15 minutes
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again in 15 minutes.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  }
});

// Strict OTP dispatch rate limit: 5 requests per 15 minutes
const otpRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many OTP requests. Please wait before requesting another code.',
    code: 'OTP_RATE_LIMIT_EXCEEDED'
  }
});

module.exports = {
  generalRateLimit,
  authRateLimit,
  otpRateLimit
};
