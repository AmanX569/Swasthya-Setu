/**
 * =========================================================
 * SWASTHYA SETU — PATIENT IDENTITY SERVICE
 * Production Patient Identity Management, Deduplication & Linking
 * =========================================================
 */

'use strict';

const bcrypt = require('bcryptjs');

const BCRYPT_ROUNDS = 10;

class PatientService {
  /**
   * @param {object} supabase - Supabase service role client
   * @param {object} auditService - AuditService instance
   */
  constructor(supabase, auditService) {
    this.supabase = supabase;
    this.auditService = auditService;
  }

  /**
   * Generates a canonical sequential Patient ID: PT-XXXXXX
   */
  async _generatePatientId() {
    try {
      const { data, error } = await this.supabase.rpc('nextval', { seq_name: 'patient_id_seq' });
      if (!error && data) {
        return `PT-${String(data).padStart(6, '0')}`;
      }
    } catch (e) {
      // Fallback if rpc is not exposed
    }

    // Fallback based on timestamp & random salt
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    return `PT-${Date.now().toString().slice(-6)}${randomSuffix.toString().slice(-2)}`;
  }

  /**
   * Finds a patient record by primary mobile number
   * @param {string} mobile - 10-digit mobile
   */
  async findByMobile(mobile) {
    if (!this.supabase) return null;

    const { data, error } = await this.supabase
      .from('patients')
      .select('*')
      .eq('mobile', mobile)
      .maybeSingle();

    if (error) {
      console.error('[PatientService] findByMobile error:', error.message);
      return null;
    }
    return data;
  }

  /**
   * Finds an external identity link by type and reference
   * @param {string} identityType - 'MOBILE' | 'ABHA' | 'AADHAAR'
   * @param {string} externalReference
   */
  async findIdentity(identityType, externalReference) {
    if (!this.supabase) return null;

    const { data, error } = await this.supabase
      .from('patient_identities')
      .select('*')
      .eq('identity_type', identityType)
      .eq('external_reference', externalReference)
      .maybeSingle();

    if (error) {
      console.error('[PatientService] findIdentity error:', error.message);
      return null;
    }
    return data;
  }

  /**
   * Resolves a patient by either Mobile Number, ABHA ID, or Patient ID
   * @param {string} identifier
   */
  async resolvePatientByIdentifier(identifier) {
    if (!identifier) return null;
    const clean = identifier.trim();

    // 1. Direct Patient ID match
    if (clean.startsWith('PT-')) {
      const { data } = await this.supabase.from('patients').select('*').eq('patient_id', clean).maybeSingle();
      if (data) return data;
    }

    // 2. 10-digit mobile match
    if (/^[6-9]\d{9}$/.test(clean)) {
      const patient = await this.findByMobile(clean);
      if (patient) return patient;
    }

    // 3. ABHA ID or External Identity match
    const identity = await this.findIdentity('ABHA', clean);
    if (identity && identity.patient_id) {
      const { data } = await this.supabase.from('patients').select('*').eq('patient_id', identity.patient_id).maybeSingle();
      if (data) return data;
    }

    // 4. Legacy profiles table fallback
    const { data: legacy } = await this.supabase
      .from('profiles')
      .select('*')
      .or(`phone.eq.${clean},abha_id.eq.${clean}`)
      .maybeSingle();

    if (legacy) {
      return {
        patient_id: legacy.patient_id || legacy.id,
        name: legacy.name,
        mobile: legacy.phone,
        mobile_verified: legacy.mobile_verified || false,
        abha_id: legacy.abha_id,
        age: legacy.age,
        gender: legacy.gender,
        blood_group: legacy.blood_group,
        village: legacy.village,
        permanent_address_completed: legacy.permanent_address_completed || false,
        profile_source: legacy.profile_source || 'LEGACY_PROFILES'
      };
    }

    return null;
  }

  /**
   * Registers a brand new patient with deduplication safeguards
   */
  async createPatient(params) {
    const {
      name,
      mobile,
      age,
      gender,
      bloodGroup,
      password,
      address,
      profileSource = 'MANUAL'
    } = params;

    // 1. Deduplication guard: verify mobile does not already exist
    const existing = await this.findByMobile(mobile);
    if (existing) {
      throw new Error(`Mobile number +91-${mobile} is already registered. Please log in or recover your account.`);
    }

    // 2. Generate canonical patient ID
    const patientId = await this._generatePatientId();

    // 3. Hash password securely with bcrypt
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const now = new Date().toISOString();

    const newPatient = {
      patient_id: patientId,
      name,
      age: parseInt(age, 10) || null,
      gender: gender || 'Other',
      mobile,
      mobile_verified: false,
      blood_group: bloodGroup || 'O+',
      password_hash: passwordHash,
      pin_hash: passwordHash,
      profile_status: 'ACTIVE',
      profile_source: profileSource,
      permanent_address_completed: !!(address && address.pincode && address.state),
      created_at: now,
      updated_at: now
    };

    // 4. Insert into `patients`
    const { error: patientErr } = await this.supabase.from('patients').insert(newPatient);
    if (patientErr) {
      console.error('[PatientService] Failed to insert patient:', patientErr.message);
      throw new Error('Failed to create patient account. Database error.');
    }

    // 5. Create initial MOBILE identity record (UNVERIFIED)
    await this.supabase.from('patient_identities').insert({
      patient_id: patientId,
      identity_type: 'MOBILE',
      external_reference: mobile,
      verification_status: 'UNVERIFIED',
      source: profileSource,
      created_at: now,
      updated_at: now
    });

    // 6. Save structured address if supplied
    if (address && address.pincode) {
      await this.saveAddress(patientId, address, 'PATIENT_PROVIDED');
    }

    // 7. Mirror to legacy `profiles` table for backwards compatibility
    await this.supabase.from('profiles').insert({
      id: undefined, // auto-uuid
      patient_id: patientId,
      name,
      phone: mobile,
      age: parseInt(age, 10) || null,
      gender: gender || 'Other',
      blood_group: bloodGroup || 'O+',
      role: 'patient',
      mobile_verified: false,
      profile_source: profileSource,
      permanent_address_completed: newPatient.permanent_address_completed,
      created_at: now
    });

    // 8. Audit logging
    await this.auditService.log({
      action: 'PATIENT_REGISTERED',
      patientId,
      identityType: 'MOBILE',
      status: 'SUCCESS',
      details: { name, mobile, profileSource }
    });

    return {
      patient_id: patientId,
      name: newPatient.name,
      mobile: newPatient.mobile,
      mobile_verified: false,
      permanent_address_completed: newPatient.permanent_address_completed
    };
  }

  /**
   * Links or updates an external identity (ABHA, Aadhaar, Verified Mobile)
   */
  async linkIdentity(patientId, identityType, externalReference, verificationStatus, metadata = {}) {
    const now = new Date().toISOString();

    // Check if this identity is already linked to ANOTHER patient
    const existing = await this.findIdentity(identityType, externalReference);
    if (existing && existing.patient_id !== patientId) {
      throw new Error(`This ${identityType} (${externalReference}) is already linked to another registered account.`);
    }

    // Upsert link
    const payload = {
      patient_id: patientId,
      identity_type: identityType,
      external_reference: externalReference,
      verification_status: verificationStatus,
      verified_at: verificationStatus === 'VERIFIED' ? now : null,
      source: metadata.source || identityType,
      metadata,
      updated_at: now
    };

    if (existing) {
      await this.supabase
        .from('patient_identities')
        .update(payload)
        .eq('id', existing.id);
    } else {
      payload.created_at = now;
      await this.supabase
        .from('patient_identities')
        .insert(payload);
    }

    // Update flags in patient table
    if (identityType === 'MOBILE' && verificationStatus === 'VERIFIED') {
      await this.supabase
        .from('patients')
        .update({ mobile_verified: true, mobile_verified_at: now })
        .eq('patient_id', patientId);

      await this.supabase
        .from('profiles')
        .update({ mobile_verified: true, mobile_verified_at: now })
        .eq('patient_id', patientId);
    }

    if (identityType === 'ABHA' && verificationStatus === 'VERIFIED') {
      await this.supabase
        .from('patients')
        .update({ abha_id: externalReference })
        .eq('patient_id', patientId);

      await this.supabase
        .from('profiles')
        .update({ abha_id: externalReference })
        .eq('patient_id', patientId);
    }

    await this.auditService.log({
      action: `${identityType}_IDENTITY_LINKED`,
      patientId,
      identityType,
      status: verificationStatus,
      details: { externalReference, verificationStatus }
    });

    return payload;
  }

  /**
   * Saves or updates structured address
   */
  async saveAddress(patientId, address, source = 'PATIENT_PROVIDED') {
    const now = new Date().toISOString();
    const record = {
      patient_id: patientId,
      address_type: address.address_type || 'PERMANENT',
      address_line_1: address.address_line_1 || address.addressLine1 || '',
      address_line_2: address.address_line_2 || address.addressLine2 || '',
      landmark: address.landmark || '',
      country: 'India',
      state: address.state || '',
      district: address.district || '',
      mandal: address.mandal || '',
      village_city: address.village_city || address.villageCity || '',
      pincode: address.pincode || '',
      source,
      created_at: now,
      updated_at: now
    };

    await this.supabase.from('patient_addresses_v2').insert(record);

    // Update completed flag
    await this.supabase
      .from('patients')
      .update({ permanent_address_completed: true, updated_at: now })
      .eq('patient_id', patientId);

    return record;
  }

  /**
   * Retrieves sanitized patient profile with linked identities and address
   */
  async getFullPatientProfile(patientId) {
    if (!this.supabase) return null;

    const { data: patient } = await this.supabase
      .from('patients')
      .select('patient_id, name, age, gender, mobile, mobile_verified, blood_group, abha_id, village, profile_status, profile_source, permanent_address_completed, created_at')
      .eq('patient_id', patientId)
      .maybeSingle();

    if (!patient) return null;

    const { data: identities } = await this.supabase
      .from('patient_identities')
      .select('identity_type, external_reference, verification_status, verified_at, source')
      .eq('patient_id', patientId);

    const { data: addresses } = await this.supabase
      .from('patient_addresses_v2')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .limit(1);

    return {
      ...patient,
      identities: identities || [],
      address: (addresses && addresses[0]) || null
    };
  }
}

module.exports = PatientService;
