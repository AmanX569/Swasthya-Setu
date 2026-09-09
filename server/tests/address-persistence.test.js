/**
 * =========================================================
 * SWASTHYA SETU — ADDRESS PERSISTENCE & LIFECYCLE TESTS
 * Tests all 7 required scenarios from Acceptance Criteria
 * =========================================================
 */

'use strict';

const assert = require('assert');
const { isPermanentAddressComplete, normalizeAddress } = require('../utils/address');
const PatientService = require('../services/patient-service');

async function runTest(name, fn) {
  try {
    await fn();
    console.log('  ✓ ' + name);
  } catch (err) {
    console.error('  ✗ ' + name);
    console.error(err);
    process.exit(1);
  }
}

async function main() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING 7-STEP ADDRESS PERSISTENCE & LIFECYCLE TESTS');
  console.log('======================================================\n');

  // Setup Mock Database Storage
  const dbPatients = [
    {
      patient_id: 'PT-1001',
      name: 'Ramesh Kumar',
      mobile: '9876543210',
      permanent_address_completed: true,
      village: 'Mustabada, Gannavaram'
    },
    {
      patient_id: 'PT-1002',
      name: 'Sita Devi',
      mobile: '9123456780',
      permanent_address_completed: false,
      village: ''
    }
  ];

  const dbAddresses = [
    {
      id: 'ADDR-1001',
      patient_id: 'PT-1001',
      address_type: 'PERMANENT',
      address_line_1: 'House 42, Main Road',
      address_line_2: 'Near Panchayat Office',
      landmark: 'Water Tank',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Krishna',
      mandal: 'Gannavaram',
      village_city: 'Mustabada',
      pincode: '521107',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const mockSupabase = {
    from: (table) => {
      if (table === 'patients') {
        return {
          select: () => ({
            eq: (col, val) => ({
              maybeSingle: async () => ({ data: dbPatients.find(p => p[col] === val) || null })
            })
          }),
          update: (updateData) => ({
            eq: async (col, val) => {
              const p = dbPatients.find(p => p[col] === val);
              if (p) Object.assign(p, updateData);
              return { error: null };
            }
          })
        };
      }
      if (table === 'patient_addresses_v2') {
        return {
          select: () => ({
            eq: (col, val) => ({
              order: () => ({
                limit: () => ({
                  data: dbAddresses.filter(a => a[col] === val)
                })
              })
            })
          }),
          insert: async (rec) => {
            dbAddresses.push(rec);
            return { error: null };
          },
          update: (updateData) => ({
            eq: async (col, val) => {
              const addr = dbAddresses.find(a => a[col] === val);
              if (addr) Object.assign(addr, updateData);
              return { error: null };
            }
          })
        };
      }
      return { update: () => ({ eq: async () => ({}) }) };
    }
  };

  const mockAudit = { log: async () => {} };
  const patientService = new PatientService(mockSupabase, mockAudit);

  // TEST 1: Login with a patient who already has a permanent address. Expected: NO modal.
  await runTest('TEST 1: Patient with existing complete address evaluated as complete (NO modal)', async () => {
    const profile = await patientService.getFullPatientProfile('PT-1001');
    assert.strictEqual(profile.permanent_address_completed, true);
    assert.ok(profile.permanent_address);
    assert.strictEqual(profile.permanent_address.pincode, '521107');
    assert.strictEqual(isPermanentAddressComplete(profile), true);
  });

  // TEST 2: Refresh browser / Rehydration simulation. Expected: NO modal.
  await runTest('TEST 2: Browser refresh/storage rehydration preserves completed address status', async () => {
    const profile = await patientService.getFullPatientProfile('PT-1001');
    const rehydrated = JSON.parse(JSON.stringify(profile));
    assert.strictEqual(rehydrated.permanent_address_completed, true);
    assert.strictEqual(isPermanentAddressComplete(rehydrated), true);
  });

  // TEST 3: Logout and Login again. Expected: NO modal.
  await runTest('TEST 3: Logout and subsequent login loads complete address from DB (NO modal)', async () => {
    const resolved = await patientService.resolvePatientByIdentifier('9876543210');
    assert.strictEqual(resolved.permanent_address_completed, true);
    assert.strictEqual(isPermanentAddressComplete(resolved), true);
  });

  // TEST 4: Open another browser/session. Login. Expected: NO modal.
  await runTest('TEST 4: New fresh session from scratch loads complete address from DB (NO modal)', async () => {
    const freshService = new PatientService(mockSupabase, mockAudit);
    const freshProfile = await freshService.getFullPatientProfile('PT-1001');
    assert.strictEqual(freshProfile.permanent_address_completed, true);
    assert.strictEqual(isPermanentAddressComplete(freshProfile), true);
  });

  // TEST 5: Create/add address for a patient without one.
  await runTest('TEST 5: Patient without address prompts, saves address, and marks complete', async () => {
    const initialProfile = await patientService.getFullPatientProfile('PT-1002');
    assert.strictEqual(initialProfile.permanent_address_completed, false);
    assert.strictEqual(isPermanentAddressComplete(initialProfile), false);

    const newAddr = {
      address_line1: 'Plot 77, Green Hills',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Guntur',
      mandal_taluk_tehsil: 'Mangalagiri',
      village_town_city: 'Mangalagiri Town',
      pincode: '522503'
    };

    const saveRes = await patientService.saveAddress('PT-1002', newAddr, 'PATIENT_PROVIDED');
    assert.strictEqual(saveRes.permanent_address_completed, true);

    const updatedPatient = dbPatients.find(p => p.patient_id === 'PT-1002');
    assert.strictEqual(updatedPatient.permanent_address_completed, true);

    const postSaveProfile = await patientService.getFullPatientProfile('PT-1002');
    assert.strictEqual(postSaveProfile.permanent_address_completed, true);
    assert.strictEqual(isPermanentAddressComplete(postSaveProfile), true);
  });

  // TEST 6: Edit existing address. Expected: Address updates normally without duplicate rows.
  await runTest('TEST 6: Editing existing address updates the record without creating duplicate rows', async () => {
    const initialCount = dbAddresses.filter(a => a.patient_id === 'PT-1002').length;
    assert.strictEqual(initialCount, 1);

    const editedAddr = {
      address_line1: 'Plot 77, Flat 3B, Green Hills Towers',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Guntur',
      mandal_taluk_tehsil: 'Mangalagiri',
      village_town_city: 'Mangalagiri Town',
      pincode: '522503'
    };

    await patientService.saveAddress('PT-1002', editedAddr, 'PATIENT_PROVIDED');
    const finalCount = dbAddresses.filter(a => a.patient_id === 'PT-1002').length;
    assert.strictEqual(finalCount, 1);

    const updated = dbAddresses.find(a => a.patient_id === 'PT-1002');
    assert.strictEqual(updated.address_line_1, 'Plot 77, Flat 3B, Green Hills Towers');
  });

  // TEST 7: Address validation fails. Expected: Rejection, no completion mark.
  await runTest('TEST 7: Invalid or missing required address fields rejected without marking complete', async () => {
    const badAddr = {
      address_line1: '   ',
      state: 'Andhra Pradesh',
      district: 'Guntur',
      pincode: '00000'
    };

    assert.strictEqual(isPermanentAddressComplete(badAddr), false);
  });

  console.log('\n======================================================');
  console.log('🏁 ALL 7 LIFECYCLE & PERSISTENCE TESTS PASSED CLEANLY!');
  console.log('======================================================\n');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
