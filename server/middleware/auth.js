/**
 * =========================================================
 * SWASTHYA SETU — JWT AUTHENTICATION MIDDLEWARE
 * =========================================================
 */

'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Generates a signed JWT for an authenticated patient or staff member
 * @param {object} payload - { id, patient_id, role, mobile, name }
 * @returns {string} Signed JWT token
 */
function generateToken(payload) {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
}

/**
 * Express middleware to verify incoming Bearer tokens
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Authentication token required',
      code: 'AUTH_TOKEN_MISSING'
    });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
    return res.status(401).json({
      success: false,
      error: 'Invalid authorization format. Expected "Bearer <token>"',
      code: 'AUTH_FORMAT_INVALID'
    });
  }

  const token = parts[1];

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      const isExpired = err.name === 'TokenExpiredError';
      return res.status(401).json({
        success: false,
        error: isExpired ? 'Session expired. Please log in again.' : 'Invalid token',
        code: isExpired ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID'
      });
    }

    req.user = user;
    next();
  });
}

/**
 * Middleware to ensure only authorized roles can access specific endpoints
 * @param  {...string} roles
 */
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Access denied for your role',
        code: 'FORBIDDEN'
      });
    }
    next();
  };
}

module.exports = {
  generateToken,
  authenticateToken,
  requireRole
};
