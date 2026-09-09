/**
 * =========================================================
 * SWASTHYA SETU — VERCEL SERVERLESS API ENTRY POINT
 * Routes /api/* directly to Express backend application
 * =========================================================
 */

'use strict';

const { app } = require('../server/app');

module.exports = app;
