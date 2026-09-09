/**
 * =========================================================
 * SWASTHYA SETU — ADDRESS COMPLETENESS & DEDUPLICATION TESTS
 * =========================================================
 */

'use strict';

const assert = require('assert');
const { isPermanentAddressComplete, normalizeAddress } = require('../utils/address');
const PatientService = require('../services/patient-service');

console.log('\n======================================================');
console.log('🧪 RUNNING SWASTHYA SETU ADDRESS INTEGRATION TEST SUITE');
console.log('======================================================\n');

function runTest(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

async function runTestAsync(name, fn) {
  try {
    await fn();
    console.log(`  ✓ ${name}`);
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
    process.exit(1);
  }
}

(async () => {
  console.log('--- 1. Address Completeness & Normalization ---');

  runTest('Rejects null, undefined, or empty address', () => {
    assert.strictEqual(isPermanentAddressComplete(null), false);
    assert.strictEqual(isPermanentAddressComplete(undefined), false);
    assert.strictEqual(isPermanentAddressComplete({}), false);
  });

  runTest('Rejects addresses with whitespace-only required fields', () => {
    const invalidAddr = {
      address_line_1: '   ',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'NTR District',
      village_city: 'Vijayawada',
      pincode: '520001'
    };
    assert.strictEqual(isPermanentAddressComplete(invalidAddr), false);
  });

  runTest('Rejects addresses with invalid pincode', () => {
    const badPin = {
      address_line_1: 'Flat 101, Green Heights',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'NTR District',
      village_city: 'Vijayawada',
      pincode: '012345' // Leading zero invalid in India
    };
    assert.strictEqual(isPermanentAddressComplete(badPin), false);

    const badPinLength = {
      ...badPin,
      pincode: '52000' // Only 5 digits
    };
    assert.strictEqual(isPermanentAddressComplete(badPinLength), false);
  });

  runTest('Accepts complete address with snake_case and frontend camelCase field names', () => {
    const validSnake = {
      address_line_1: 'House 4-12, Main Bazar',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'NTR District',
      mandal: 'Ibrahimpatnam',
      village_city: 'Kondapalli',
      pincode: '521228'
    };
    assert.strictEqual(isPermanentAddressComplete(validSnake), true);

    const validFrontendAlt = {
      address_line1: 'House 4-12, Main Bazar',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'NTR District',
      mandal_taluk_tehsil: 'Ibrahimpatnam',
      village_town_city: 'Kondapalli',
      pincode: '521228'
    };
    assert.strictEqual(isPermanentAddressComplete(validFrontendAlt), true);

    const wrappedInPatient = {
      patient_id: 'PT-0001',
      name: 'Ramesh',
      permanent_address: validFrontendAlt
    };
    assert.strictEqual(isPermanentAddressComplete(wrappedInPatient), true);
  });

  console.log('\n--- 2. PatientService Address Save & Deduplication ---');

  await runTestAsync('PatientService saves and normalizes permanent address', async () => {
    const mockAudit = { log: async () => {} };
    // In-memory mock supabase
    const storedAddresses = [];
    const storedPatients = [{ patient_id: 'PT-TEST-001', permanent_address_completed: false }];

    const mockSupabase = {
      from: (table) => {
        if (table === 'patient_addresses_v2') {
          return {
            select: () => ({
              eq: (col, val) => ({
                order: () => ({
                  limit: () => ({
                    data: storedAddresses.filter(a => a[col] === val)
                  })
                })
              })
            }),
            insert: async (record) => {
              storedAddresses.push(record);
              return { error: null };
            },
            update: (updateData) => ({
              eq: async (col, val) => {
                const target = storedAddresses.find(a => a[col] === val);
                if (target) Object.assign(target, updateData);
                return { error: null };
              }
            })
          };
        }
        if (table === 'patients') {
          return {
            update: (updateData) => ({
              eq: async (col, val) => {
                const target = storedPatients.find(p => p[col] === val);
                if (target) Object.assign(target, updateData);
                return { error: null };
              }
            }),
            select: () => ({
              eq: () => ({
                maybeSingle: async () => ({ data: storedPatients[0] })
              })
            })
          };
        }
        return {
          update: () => ({ or: async () => ({}) })
        };
      }
    };

    const patientService = new PatientService(mockSupabase, mockAudit);

    const addr1 = {
      address_line1: 'House 123, Ward 4',
      country: 'India',
      state: 'Andhra Pradesh',
      district: 'Krishna',
      mandal_taluk_tehsil: 'Gannavaram',
      village_town_city: 'Mustabada',
      pincode: '521107'
    };

    const saved1 = await patientService.saveAddress('PT-TEST-001', addr1, 'PATIENT_PROVIDED');
    assert.strictEqual(saved1.permanent_address_completed, true);
    assert.strictEqual(storedAddresses.length, 1);
    assert.strictEqual(storedPatients[0].permanent_address_completed, true);

    // Save again: MUST UPDATE, NOT CREATE DUPLICATE
    const addr2 = {
      ...addr1,
      address_line1: 'Flat 402, Sai Residency'
    };

    const saved2 = await patientService.saveAddress('PT-TEST-001', addr2, 'PATIENT_PROVIDED');
    assert.strictEqual(saved2.permanent_address_completed, true);
    assert.strictEqual(storedAddresses.length, 1, 'Address record count must remain 1 (no duplicate rows created)!');
    assert.strictEqual(storedAddresses[0].address_line_1, 'Flat 402, Sai Residency');
  });

  console.log('\n======================================================');
  console.log('🏁 ALL ADDRESS VALIDATION & PERSISTENCE TESTS PASSED!');
  console.log('======================================================\n');
})();
