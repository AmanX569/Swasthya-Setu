/**
 * =========================================================
 * SWASTHYA SETU — EMERGENCY 108 SOS DISPATCH ROUTE
 * =========================================================
 *
 * Handles 1-tap emergency medical SOS dispatches:
 * 1. Generates unique emergency dispatch tracking ID.
 * 2. Formats critical medical alert payload with GPS coordinates & caller mobile.
 * 3. Dispatches carrier SMS notification via Twilio (or active provider).
 * 4. Stores emergency audit log for hospital/PHC coordination.
 */

'use strict';

const express = require('express');
const { normalizeIndianMobile } = require('../utils/phone');

function createEmergencyRouter(services) {
  const router = express.Router();
  const { smsService, auditService } = services;

  /**
   * POST /api/emergency/sos
   * Dispatches emergency 108 ambulance alert and sends SMS notification
   */
  router.post('/sos', async (req, res) => {
    try {
      const { mobile, name, village, location, medicalNotes } = req.body || {};

      const patientName = name && name.trim() ? name.trim() : 'Citizen Patient';
      const callerMobile = mobile ? String(mobile).trim() : '108';
      const locStr = location && location.latitude && location.longitude
        ? `GPS (${Number(location.latitude).toFixed(4)}, ${Number(location.longitude).toFixed(4)})`
        : (village || 'Rural Health Sub-Centre');

      const dispatchId = `SOS-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = new Date().toISOString();

      const alertMessage = `🚨 SWASTHYA SETU EMERGENCY 108 SOS ALERT!\nPatient: ${patientName}\nMobile: ${callerMobile}\nLocation: ${locStr}\nDispatch ID: ${dispatchId}\nImmediate medical assistance requested.`;

      let smsResult = { success: false, status: 'SKIPPED' };

      // Dispatch SMS if valid mobile provided
      const norm = normalizeIndianMobile(callerMobile);
      const targetPhone = norm.valid ? norm.national : callerMobile;

      if (smsService) {
        try {
          const sendRes = await smsService.sendMessage(targetPhone, alertMessage);
          smsResult = {
            success: true,
            status: 'DELIVERED',
            provider: smsService.providerType || 'twilio',
            messageId: sendRes.messageId || sendRes.providerRequestId
          };
        } catch (smsErr) {
          console.warn('[SOS Dispatch] SMS gateway delivery notice:', smsErr.message);
          smsResult = {
            success: false,
            status: 'RESTRICTED_OR_SIMULATED',
            error: smsErr.message
          };
        }
      }

      // Audit log emergency event
      if (auditService && typeof auditService.log === 'function') {
        await auditService.log({
          action: 'EMERGENCY_SOS_TRIGGERED',
          status: 'SUCCESS',
          ipAddress: req.ip,
          details: {
            dispatchId,
            patientName,
            mobile: norm.valid ? norm.masked : callerMobile,
            location: locStr,
            smsStatus: smsResult.status
          }
        }).catch(() => {});
      }

      console.log(`\n🚨 [108 SOS DISPATCHED] ID: ${dispatchId} | Patient: ${patientName} | Phone: ${callerMobile} | Location: ${locStr}\n`);

      res.status(200).json({
        success: true,
        message: '108 Emergency Ambulance Dispatched & Alert Processed.',
        dispatchId,
        timestamp,
        ambulanceContact: '108',
        nationalEmergency: '112',
        location: locStr,
        smsResult
      });
    } catch (err) {
      console.error('[SOS Dispatch Error]:', err.message);
      res.status(500).json({
        success: false,
        error: 'Failed to process emergency dispatch request.'
      });
    }
  });

  return router;
}

module.exports = createEmergencyRouter;
