/**
 * =========================================================
 * SWASTHYA SETU — ENTERPRISE API BACKEND APPLICATION
 * Production Identity, ABDM, Aadhaar Sandbox & Patient Architecture
 * =========================================================
 */

'use strict';

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createClient } = require('@supabase/supabase-js');

const config = require('./config');
const { validateEnvironment } = require('./config/environments');
const { generalRateLimit, authRateLimit } = require('./middleware/rate-limit');

// Services
const AuditService = require('./services/audit-service');
const SMSService = require('./integrations/sms');
const OTPService = require('./services/otp-service');
const ABDMService = require('./integrations/abdm');
const AadhaarService = require('./integrations/uidai');
const PatientService = require('./services/patient-service');

// Route factories
const createAuthRouter = require('./routes/auth');
const createIdentityRouter = require('./routes/identity');
const createPatientsRouter = require('./routes/patients');
const createAdminRouter = require('./routes/admin');
const createEmergencyRouter = require('./routes/emergency');

// Validate runtime environment
const envValidation = validateEnvironment(config);
if (!envValidation.valid) {
  console.warn('\n======================================================');
  console.warn('[CONFIG WARNING] Environment configuration notices:');
  envValidation.errors.forEach(err => console.warn(`  - ${err}`));
  console.warn('======================================================\n');
  // In serverless environments (Vercel/AWS), never process.exit(1) to avoid 500 crashes
  if (config.env === 'production' && !process.env.VERCEL && !process.env.NOW_REGION) {
    process.exit(1);
  }
}

if (envValidation.warnings.length > 0) {
  console.log('\n[CONFIG NOTICES]');
  envValidation.warnings.forEach(w => console.log(`  ${w}`));
}

// Initialize Supabase Service Role client
const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Initialize Service Container
const auditService = new AuditService(supabase);
const smsService = new SMSService(config);
const otpService = new OTPService(supabase, smsService, config.env);
const abdmService = new ABDMService(config);
const aadhaarService = new AadhaarService(config);
const patientService = new PatientService(supabase, auditService);

const services = {
  supabase,
  config,
  auditService,
  smsService,
  otpService,
  abdmService,
  aadhaarService,
  patientService
};

const app = express();

// Security & Parsing Middleware
app.use(helmet({
  contentSecurityPolicy: false // Allows frontend glassmorphism assets and inline scripts in local bundle
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'apikey', 'Prefer']
}));
app.use(express.json());
app.use(generalRateLimit);

// API Health Check
app.get(['/', '/api/health'], (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Swasthya Setu Enterprise Identity Engine',
    version: '3.1.0',
    mode: config.env,
    integrations: {
      sms: config.sms.provider,
      abdm: config.abdm.environment,
      uidai: config.uidai.environment
    },
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', authRateLimit, createAuthRouter(services));
app.use('/api/identity', createIdentityRouter(services));
app.use('/api/patients', createPatientsRouter(services));
app.use('/api/admin', createAdminRouter(services));
app.use('/api/emergency', createEmergencyRouter(services));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.originalUrl
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[UNHANDLED ERROR]', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    code: 'SERVER_EXCEPTION'
  });
});

// Start Server if executed directly
if (require.main === module) {
  const server = app.listen(config.server.port, () => {
    console.log('\n======================================================');
    console.log(`[SWASTHYA SETU IDENTITY BACKEND] Running on port ${config.server.port}`);
    console.log(`Environment: [${config.env.toUpperCase()}]`);
    console.log(`SMS Gateway: [${config.sms.provider.toUpperCase()}]`);
    console.log(`ABDM / ABHA: [${config.abdm.environment.toUpperCase()}]`);
    console.log(`UIDAI / Aadhaar: [${config.uidai.environment.toUpperCase()}]`);
    console.log(`Health Check: http://localhost:${config.server.port}/api/health`);
    console.log('======================================================\n');
  });
}

module.exports = { app, services };
