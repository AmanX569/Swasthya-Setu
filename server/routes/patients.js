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
   * PATCH & PUT /api/patients/me/address
   * Saves or updates permanent structured address
   */
  const handleUpdateAddress = async (req, res) => {
    try {
      const patientId = req.user.patient_id || req.user.id;
      const addressData = req.body;

      if (!addressData || typeof addressData !== 'object') {
        return res.status(400).json({ success: false, error: 'Address payload is required.' });
      }

      const pincode = String(addressData.pincode || '').trim();
      const state = String(addressData.state || '').trim();
      const district = String(addressData.district || '').trim();
      const line1 = String(addressData.address_line_1 || addressData.address_line1 || addressData.addressLine1 || '').trim();

      if (!line1) {
        return res.status(400).json({ success: false, error: 'Address Line 1 is required.' });
      }
      if (!state || !district) {
        return res.status(400).json({ success: false, error: 'State and District are required.' });
      }

      const pinCheck = validatePincode(pincode);
      if (!pinCheck.valid) {
        return res.status(400).json({ success: false, error: pinCheck.error });
      }

      const saved = await patientService.saveAddress(patientId, addressData, 'PATIENT_PROVIDED');
      const updatedProfile = await patientService.getFullPatientProfile(patientId);

      res.json({
        success: true,
        message: 'Permanent address saved successfully.',
        address: saved,
        patient: updatedProfile,
        permanent_address_completed: true
      });
    } catch (err) {
      console.error('[PATCH /patients/me/address] Error:', err.message);
      res.status(500).json({ success: false, error: 'Unable to save your address. Please try again.' });
    }
  };

  router.patch('/me/address', handleUpdateAddress);
  router.put('/me/address', handleUpdateAddress);

  return router;
}

module.exports = createPatientsRouter;
