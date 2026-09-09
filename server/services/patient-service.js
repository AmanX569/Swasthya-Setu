/**
 * =========================================================
 * SWASTHYA SETU — PATIENT IDENTITY SERVICE
 * Production Patient Identity Management, Deduplication & Linking
 * =========================================================
 */

'use strict';

const bcrypt = require('bcryptjs');
const { normalizeAddress, isPermanentAddressComplete } = require('../utils/address');

const BCRYPT_ROUNDS = 10;

class PatientService {
  /**
   * @param {object} supabase - Supabase service role client
   * @param {object} auditService - AuditService instance
   */
  constructor(supabase, auditService) {
    this.supabase = supabase;
    this.auditService = auditService;
    this._localAddresses = new Map();
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

    let patient = null;

    // 1. Direct Patient ID match
    if (clean.startsWith('PT-')) {
      const { data } = await this.supabase.from('patients').select('*').eq('patient_id', clean).maybeSingle();
      if (data) patient = data;
    }

    // 2. 10-digit mobile match
    if (!patient && /^[6-9]\d{9}$/.test(clean)) {
      patient = await this.findByMobile(clean);
    }

    // 3. ABHA ID or External Identity match
    if (!patient) {
      const identity = await this.findIdentity('ABHA', clean);
      if (identity && identity.patient_id) {
        const { data } = await this.supabase.from('patients').select('*').eq('patient_id', identity.patient_id).maybeSingle();
        if (data) patient = data;
      }
    }

    // 4. Legacy profiles table fallback
    if (!patient && this.supabase) {
      try {
        const { data: legacy } = await this.supabase
          .from('profiles')
          .select('*')
          .or(`phone.eq.${clean},abha_id.eq.${clean}`)
          .maybeSingle();

        if (legacy) {
          patient = {
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
      } catch (e) {}
    }

    if (!patient) return null;

    // Retrieve address to establish backend single source of truth for address completeness
    let address = null;
    if (this.supabase && patient.patient_id) {
      try {
        const { data: addrRows } = await this.supabase
          .from('patient_addresses_v2')
          .select('*')
          .eq('patient_id', patient.patient_id)
          .order('created_at', { ascending: false })
          .limit(1);
        if (addrRows && addrRows.length > 0) {
          address = normalizeAddress(addrRows[0]);
        }
      } catch (e) {}
    }

    if (!address && this._localAddresses && patient.patient_id) {
      address = this._localAddresses.get(patient.patient_id) || null;
    }

    const hasCompleteAddress = isPermanentAddressComplete(address || patient);
    patient.permanent_address_completed = hasCompleteAddress;
    patient.permanent_address = address;
    patient.address = address;

    return patient;
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
   * Saves or updates structured permanent address.
   * PREVENTS DUPLICATE RECORDS by updating the existing permanent address record if present.
   */
  async saveAddress(patientId, address, source = 'PATIENT_PROVIDED') {
    const normalized = normalizeAddress(address);
    if (!normalized) {
      throw new Error('Invalid address data provided.');
    }

    const now = new Date().toISOString();
    const isComplete = isPermanentAddressComplete(normalized);

    // Resolve canonical patient ID (e.g. if patientId was mobile number or legacy profile)
    let canonicalPatientId = patientId;
    if (this.supabase) {
      try {
        const resolved = await this.resolvePatientByIdentifier(patientId);
        if (resolved && resolved.patient_id) {
          canonicalPatientId = resolved.patient_id;
        }
      } catch (e) {}
    }

    let existingAddressId = null;
    if (this.supabase) {
      try {
        const { data: existing } = await this.supabase
          .from('patient_addresses_v2')
          .select('id, created_at')
          .eq('patient_id', canonicalPatientId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (existing && existing.length > 0) {
          existingAddressId = existing[0].id;
        }
      } catch (e) {
        console.warn('[PatientService] Address query notice:', e.message);
      }
    }

    const dbRecord = {
      patient_id: canonicalPatientId,
      address_type: normalized.address_type || 'PERMANENT',
      address_line_1: normalized.address_line_1,
      address_line_2: normalized.address_line_2,
      landmark: normalized.landmark,
      country: normalized.country || 'India',
      state: normalized.state,
      district: normalized.district,
      mandal: normalized.mandal,
      village_city: normalized.village_city,
      pincode: normalized.pincode,
      source,
      updated_at: now
    };

    if (existingAddressId) {
      // 1. UPDATE existing record: Never duplicate address rows!
      dbRecord.id = existingAddressId;
      if (this.supabase) {
        try {
          await this.supabase
            .from('patient_addresses_v2')
            .update(dbRecord)
            .eq('id', existingAddressId);
        } catch (e) {
          console.warn('[PatientService] Address update notice:', e.message);
        }
      }
    } else {
      // 2. INSERT initial record
      dbRecord.id = `ADDR-${Date.now()}`;
      dbRecord.created_at = now;
      if (this.supabase) {
        try {
          await this.supabase
            .from('patient_addresses_v2')
            .insert(dbRecord);
        } catch (e) {
          console.warn('[PatientService] Address insert notice:', e.message);
        }
      }
    }

    // Cache locally for resilient mode
    if (this._localAddresses) {
      this._localAddresses.set(canonicalPatientId, { ...dbRecord, ...normalized, permanent_address_completed: isComplete });
      if (canonicalPatientId !== patientId) {
        this._localAddresses.set(patientId, { ...dbRecord, ...normalized, permanent_address_completed: isComplete });
      }
    }

    // 3. Update patient completed flag and village in database
    if (this.supabase) {
      const villageString = normalized.village_city + (normalized.mandal ? (', ' + normalized.mandal) : '');
      try {
        await this.supabase
          .from('patients')
          .update({
            permanent_address_completed: isComplete,
            village: villageString,
            updated_at: now
          })
          .eq('patient_id', canonicalPatientId);
      } catch (e) {
        console.warn('[PatientService] Patient table update notice:', e.message);
      }

      if (canonicalPatientId !== patientId) {
        try {
          await this.supabase
            .from('patients')
            .update({
              permanent_address_completed: isComplete,
              village: villageString,
              updated_at: now
            })
            .eq('mobile', patientId);
        } catch (e) {}
      }

      // Also update legacy profiles table if present
      try {
        await this.supabase
          .from('profiles')
          .update({
            permanent_address_completed: isComplete,
            village: villageString,
            updated_at: now
          })
          .eq('patient_id', canonicalPatientId);
      } catch (e) {}
    }

    // 4. Audit log
    if (this.auditService && typeof this.auditService.log === 'function') {
      try {
        await this.auditService.log({
          action: existingAddressId ? 'ADDRESS_UPDATED' : 'ADDRESS_CREATED',
          patientId,
          status: 'SUCCESS',
          details: { source, isComplete, pincode: normalized.pincode }
        });
      } catch (e) {}
    }

    return {
      ...dbRecord,
      ...normalized,
      permanent_address_completed: isComplete
    };
  }

  /**
   * Retrieves sanitized patient profile with linked identities and address
   */
  async getFullPatientProfile(patientId) {
    let patient = null;

    if (this.supabase) {
      try {
        const { data } = await this.supabase
          .from('patients')
          .select('patient_id, name, age, gender, mobile, mobile_verified, blood_group, abha_id, village, profile_status, profile_source, permanent_address_completed, created_at')
          .eq('patient_id', patientId)
          .maybeSingle();
        patient = data;
      } catch (e) {}
    }

    if (!patient) {
      // Check legacy profiles or fallback
      patient = await this.resolvePatientByIdentifier(patientId);
    }

    if (!patient) return null;

    let identities = [];
    if (this.supabase) {
      try {
        const { data: idRows } = await this.supabase
          .from('patient_identities')
          .select('identity_type, external_reference, verification_status, verified_at, source')
          .eq('patient_id', patientId);
        identities = idRows || [];
      } catch (e) {}
    }

    let address = null;
    if (this.supabase) {
      try {
        const { data: addresses } = await this.supabase
          .from('patient_addresses_v2')
          .select('*')
          .eq('patient_id', patientId)
          .order('created_at', { ascending: false })
          .limit(1);

        if (addresses && addresses.length > 0) {
          address = normalizeAddress(addresses[0]);
        }
      } catch (e) {}
    }

    if (!address && this._localAddresses) {
      address = this._localAddresses.get(patientId) || null;
    }

    const isComplete = isPermanentAddressComplete(address || patient);

    return {
      ...patient,
      permanent_address_completed: isComplete,
      identities,
      address,
      permanent_address: address
    };
  }
}

module.exports = PatientService;
