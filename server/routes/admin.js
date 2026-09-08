/**
 * =========================================================
 * SWASTHYA SETU — ADMIN PATIENT VERIFICATION AUDIT ROUTES
 * =========================================================
 */

'use strict';

const express = require('express');
const { authenticateToken, requireRole } = require('../middleware/auth');

function createAdminRouter(services) {
  const router = express.Router();
  const { supabase } = services;

  router.use(authenticateToken);
  router.use(requireRole('admin'));

  /**
   * GET /api/admin/patients
   * Lists patients with verification status breakdown
   */
  router.get('/patients', async (req, res) => {
    try {
      const { data: patients, error: pErr } = await supabase
        .from('patients')
        .select('patient_id, name, mobile, mobile_verified, abha_id, permanent_address_completed, profile_status, profile_source, created_at')
        .order('created_at', { ascending: false })
        .limit(100);

      if (pErr) {
        throw pErr;
      }

      // Fetch identities
      const patientIds = (patients || []).map(p => p.patient_id);
      const { data: identities } = await supabase
        .from('patient_identities')
        .select('patient_id, identity_type, external_reference, verification_status')
        .in('patient_id', patientIds);

      const identityMap = {};
      (identities || []).forEach(item => {
        if (!identityMap[item.patient_id]) identityMap[item.patient_id] = {};
        identityMap[item.patient_id][item.identity_type] = {
          status: item.verification_status,
          ref: item.identity_type === 'AADHAAR' ? 'XXXX-XXXX-' + item.external_reference.slice(-4) : item.external_reference
        };
      });

      const enriched = (patients || []).map(p => ({
        ...p,
        identities: identityMap[p.patient_id] || {},
        verificationSummary: {
          mobile: p.mobile_verified ? 'VERIFIED' : 'UNVERIFIED',
          abha: (identityMap[p.patient_id] && identityMap[p.patient_id].ABHA) ? identityMap[p.patient_id].ABHA.status : (p.abha_id ? 'PROVISIONED' : 'UNLINKED'),
          aadhaar: (identityMap[p.patient_id] && identityMap[p.patient_id].AADHAAR) ? identityMap[p.patient_id].AADHAAR.status : 'UNVERIFIED',
          address: p.permanent_address_completed ? 'COMPLETED' : 'INCOMPLETE'
        }
      }));

      res.json({
        success: true,
        count: enriched.length,
        patients: enriched
      });
    } catch (err) {
      console.error('[GET /admin/patients] Error:', err.message);
      res.status(500).json({ success: false, error: 'Failed to fetch patients list' });
    }
  });

  /**
   * GET /api/admin/audit-logs
   * Fetches latest identity security audit logs
   */
  router.get('/audit-logs', async (req, res) => {
    try {
      const { data: logs, error } = await supabase
        .from('identity_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      res.json({
        success: true,
        count: (logs || []).length,
        logs: logs || []
      });
    } catch (err) {
      console.error('[GET /admin/audit-logs] Error:', err.message);
      res.status(500).json({ success: false, error: 'Failed to fetch audit trail' });
    }
  });

  return router;
}

module.exports = createAdminRouter;
