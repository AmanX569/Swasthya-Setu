/**
 * =========================================================
 * SWASTHYA SETU — IDENTITY VERIFICATION & INTEGRATION ROUTES
 * Production endpoints for ABHA/ABDM, Aadhaar (Sandbox/AUA), and Mobile Linking
 * =========================================================
 */

'use strict';

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { validateAbhaId, validateAadhaarNumber } = require('../middleware/validate');

function createIdentityRouter(services) {
  const router = express.Router();
  const { patientService, otpService, abdmService, aadhaarService, auditService } = services;

  // Protect all identity routes with JWT authentication
  router.use(authenticateToken);

  /**
   * POST /api/identity/verify-mobile
   * Initiates mobile verification OTP for the currently logged-in patient
   */
  router.post('/verify-mobile', async (req, res) => {
    try {
      const patientId = req.user.patient_id || req.user.id;
      const patient = await patientService.resolvePatientByIdentifier(patientId);

      if (!patient || !patient.mobile) {
        return res.status(404).json({ success: false, error: 'Patient mobile record not found' });
      }

      const result = await otpService.generateAndSend(patient.mobile, 'MOBILE_VERIFY', {
        patientId,
        ipAddress: req.ip
      });

      if (!result.success) {
        return res.status(429).json({ success: false, error: result.error });
      }

      res.json({
        success: true,
        message: 'Verification code sent to registered mobile number',
        requestId: result.requestId,
        expiresIn: result.expiresIn
      });
    } catch (err) {
      console.error('[POST /verify-mobile] Error:', err.message);
      res.status(500).json({ success: false, error: 'Failed to initiate mobile verification' });
    }
  });

  /**
   * POST /api/identity/confirm-mobile
   * Confirms mobile OTP and upgrades status to VERIFIED
   */
  router.post('/confirm-mobile', async (req, res) => {
    try {
      const { otp } = req.body;
      const patientId = req.user.patient_id || req.user.id;
      const patient = await patientService.resolvePatientByIdentifier(patientId);

      if (!patient || !patient.mobile) {
        return res.status(404).json({ success: false, error: 'Patient record not found' });
      }

      const verifyRes = await otpService.verify(patient.mobile, 'MOBILE_VERIFY', String(otp).trim());
      if (!verifyRes.success) {
        return res.status(400).json({ success: false, error: verifyRes.error });
      }

      // Link identity as VERIFIED
      await patientService.linkIdentity(patientId, 'MOBILE', patient.mobile, 'VERIFIED', {
        source: 'MOBILE_VERIFICATION'
      });

      res.json({
        success: true,
        message: 'Mobile number successfully verified and linked to your health identity',
        verified: true
      });
    } catch (err) {
      console.error('[POST /confirm-mobile] Error:', err.message);
      res.status(500).json({ success: false, error: 'Failed to confirm mobile verification' });
    }
  });

  /**
   * POST /api/identity/initiate-abha
   * Initiates ABHA authentication session via ABDM Gateway
   */
  router.post('/initiate-abha', async (req, res) => {
    try {
      const { abhaIdentifier } = req.body;
      const patientId = req.user.patient_id || req.user.id;

      if (!abhaIdentifier) {
        return res.status(400).json({ success: false, error: 'ABHA Number or ABHA Address is required' });
      }

      const result = await abdmService.initiateABHAAuthentication(abhaIdentifier.trim());

      await auditService.log({
        action: 'ABHA_AUTH_INITIATED',
        patientId,
        identityType: 'ABHA',
        status: 'PENDING',
        requestId: result.txnId,
        ipAddress: req.ip
      });

      res.json(result);
    } catch (err) {
      console.error('[POST /initiate-abha] Error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /**
   * POST /api/identity/verify-abha
   * Verifies ABDM OTP and permanently links verified ABHA to patient
   */
  router.post('/verify-abha', async (req, res) => {
    try {
      const { txnId, otp } = req.body;
      const patientId = req.user.patient_id || req.user.id;

      if (!txnId || !otp) {
        return res.status(400).json({ success: false, error: 'Transaction ID (txnId) and OTP are required' });
      }

      const authRes = await abdmService.verifyABHAAuthentication(txnId, String(otp).trim());
      if (!authRes.success) {
        return res.status(400).json({ success: false, error: authRes.error });
      }

      const abhaNumber = authRes.patient.healthIdNumber;

      // Link to internal patient profile
      await patientService.linkIdentity(patientId, 'ABHA', abhaNumber, 'VERIFIED', {
        source: 'ABDM',
        healthId: authRes.patient.healthId,
        token: authRes.token
      });

      res.json({
        success: true,
        message: 'ABHA successfully authenticated and linked with Swasthya Setu',
        abhaId: abhaNumber,
        patientData: authRes.patient
      });
    } catch (err) {
      console.error('[POST /verify-abha] Error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /**
   * POST /api/identity/initiate-aadhaar
   * Initiates Aadhaar OTP verification with user consent
   */
  router.post('/initiate-aadhaar', async (req, res) => {
    try {
      const { aadhaarNumber, consentGranted } = req.body;
      const patientId = req.user.patient_id || req.user.id;

      if (!consentGranted) {
        return res.status(400).json({
          success: false,
          error: 'Explicit informed consent is legally required before initiating Aadhaar authentication'
        });
      }

      const check = validateAadhaarNumber(aadhaarNumber);
      if (!check.valid) {
        return res.status(400).json({ success: false, error: check.error });
      }

      const consentToken = `CONSENT-${patientId}-${Date.now()}`;
      const result = await aadhaarService.initiateAuthentication(check.sanitized, consentToken);

      await auditService.log({
        action: 'AADHAAR_AUTH_INITIATED',
        patientId,
        identityType: 'AADHAAR',
        status: 'PENDING',
        requestId: result.txnId,
        ipAddress: req.ip
      });

      res.json(result);
    } catch (err) {
      console.error('[POST /initiate-aadhaar] Error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  /**
   * POST /api/identity/verify-aadhaar
   * Verifies Aadhaar OTP and links masked token (never raw Aadhaar)
   */
  router.post('/verify-aadhaar', async (req, res) => {
    try {
      const { txnId, otp } = req.body;
      const patientId = req.user.patient_id || req.user.id;

      if (!txnId || !otp) {
        return res.status(400).json({ success: false, error: 'Transaction ID and OTP are required' });
      }

      const verifyRes = await aadhaarService.verifyAuthentication(txnId, String(otp).trim());
      if (!verifyRes.success) {
        return res.status(400).json({ success: false, error: verifyRes.error });
      }

      const maskedAadhaar = verifyRes.eKycData.maskedAadhaar;

      // Link masked identity token
      await patientService.linkIdentity(patientId, 'AADHAAR', maskedAadhaar, 'VERIFIED', {
        source: 'AUTHORIZED_EKYC',
        verifiedAt: new Date().toISOString()
      });

      // Update structured address if verified
      if (verifyRes.eKycData.address) {
        await patientService.saveAddress(patientId, verifyRes.eKycData.address, 'AADHAAR');
      }

      res.json({
        success: true,
        message: 'Aadhaar identity verified. Masked token linked securely.',
        maskedAadhaar,
        eKycData: {
          name: verifyRes.eKycData.name,
          gender: verifyRes.eKycData.gender,
          maskedAadhaar: verifyRes.eKycData.maskedAadhaar
        }
      });
    } catch (err) {
      console.error('[POST /verify-aadhaar] Error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  return router;
}

module.exports = createIdentityRouter;
