/**
 * =========================================================
 * SWASTHYA SETU — PATIENT PROFILE ROUTES
 * =========================================================
 */

'use strict';

const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { validatePincode } = require('../middleware/validate');

function createPatientsRouter(services) {
  const router = express.Router();
  const { patientService } = services;

  router.use(authenticateToken);

  /**
   * GET /api/patients/me
   * Fetches the complete profile, address, and verified identities of the logged-in patient
   */
  router.get('/me', async (req, res) => {
    try {
      const patientId = req.user.patient_id || req.user.id;
      const profile = await patientService.getFullPatientProfile(patientId);

      if (!profile) {
        return res.status(404).json({ success: false, error: 'Patient profile not found' });
      }

      res.json({
        success: true,
        patient: profile
      });
    } catch (err) {
      console.error('[GET /patients/me] Error:', err.message);
      res.status(500).json({ success: false, error: 'Failed to retrieve patient profile' });
    }
  });

  /**
   * PATCH /api/patients/me/address
   * Saves or updates permanent structured address
   */
  router.patch('/me/address', async (req, res) => {
    try {
      const patientId = req.user.patient_id || req.user.id;
      const addressData = req.body;

      if (!addressData || !addressData.pincode || !addressData.state || !addressData.district) {
        return res.status(400).json({ success: false, error: 'Pincode, State, and District are required' });
      }

      const pinCheck = validatePincode(addressData.pincode);
      if (!pinCheck.valid) {
        return res.status(400).json({ success: false, error: pinCheck.error });
      }

      const saved = await patientService.saveAddress(patientId, addressData, 'PATIENT_PROVIDED');

      res.json({
        success: true,
        message: 'Permanent address updated successfully',
        address: saved
      });
    } catch (err) {
      console.error('[PATCH /patients/me/address] Error:', err.message);
      res.status(500).json({ success: false, error: 'Failed to update address' });
    }
  });

  return router;
}

module.exports = createPatientsRouter;
