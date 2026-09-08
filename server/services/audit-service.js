/**
 * =========================================================
 * SWASTHYA SETU — IDENTITY AUDIT SERVICE
 * Immutable security and compliance audit trail
 * =========================================================
 *
 * Compliance Rule:
 * NEVER store passwords, PINs, OTP codes, biometrics, or raw Aadhaar numbers.
 */

'use strict';

class AuditService {
  /**
   * @param {object} supabase - Supabase client (service role)
   */
  constructor(supabase) {
    this.supabase = supabase;
  }

  /**
   * Records an immutable identity lifecycle event
   * @param {object} event
   * @param {string} event.action - e.g. 'LOGIN', 'REGISTER', 'MOBILE_VERIFIED', 'ABHA_LINKED', 'AADHAAR_VERIFIED'
   * @param {string} [event.patientId] - Patient ID
   * @param {string} [event.identityType] - 'MOBILE' | 'ABHA' | 'AADHAAR'
   * @param {string} [event.status] - 'SUCCESS' | 'FAILURE' | 'PENDING'
   * @param {string} [event.requestId] - Request or transaction reference
   * @param {string} [event.adminId] - Performing admin ID if applicable
   * @param {string} [event.ipAddress] - Request IP
   * @param {object} [event.details] - Sanitized non-confidential metadata
   */
  async log(event) {
    const record = {
      action: event.action,
      patient_id: event.patientId || null,
      identity_type: event.identityType || null,
      status: event.status || 'SUCCESS',
      request_id: event.requestId || null,
      admin_id: event.adminId || null,
      ip_address: event.ipAddress || null,
      details: event.details || {},
      created_at: new Date().toISOString()
    };

    console.log(`[AUDIT LOG] ${record.action} | Status: ${record.status} | Patient: ${record.patient_id || 'N/A'}`);

    if (!this.supabase) return;

    try {
      const { error } = await this.supabase
        .from('identity_audit_log')
        .insert(record);

      if (error) {
        console.error('[AuditService] Supabase insert error:', error.message);
      }
    } catch (err) {
      console.error('[AuditService] Failed to write audit record:', err.message);
    }
  }
}

module.exports = AuditService;
