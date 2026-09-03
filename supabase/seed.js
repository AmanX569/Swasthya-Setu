/**
 * Swasthya Setu - Idempotent Node.js Supabase Seed Script
 * Run with: node supabase/seed.js
 */
const https = require('https');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://bqtinztvktsosuypuifi.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_TLWSYjSbIrgVfbt86PjgOQ_TaOyTtz4';

async function postTable(table, rows) {
  const url = new URL(`${SUPABASE_URL}/rest/v1/${table}`);
  const data = JSON.stringify(rows);
  
  return new Promise((resolve, reject) => {
    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`[${table}] Status: ${res.statusCode}`);
        resolve({ status: res.statusCode, body });
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runSeed() {
  console.log('🌱 Seeding Swasthya Setu Supabase Database at:', SUPABASE_URL);

  // 1. Blood Bank
  await postTable('blood_bank', [
    { blood_group: 'A+', units_available: 14 },
    { blood_group: 'A-', units_available: 4 },
    { blood_group: 'B+', units_available: 22 },
    { blood_group: 'B-', units_available: 6 },
    { blood_group: 'O+', units_available: 31 },
    { blood_group: 'O-', units_available: 8 },
    { blood_group: 'AB+', units_available: 11 },
    { blood_group: 'AB-', units_available: 3 }
  ]);

  // 2. Hospitals
  await postTable('hospitals', [
    { name: 'Kondapalli Primary Health Centre (PHC)', type: 'PHC', distance: '1.2 km', total_beds: 20, gen_beds_avail: 8, icu_beds_avail: 2, oxygen_beds_avail: 6, doctor_on_duty: 'Dr. Priya Sharma', phone: '0866-281001' },
    { name: 'Ibrahimpatnam Community Health Centre (CHC)', type: 'CHC', distance: '6.5 km', total_beds: 60, gen_beds_avail: 18, icu_beds_avail: 5, oxygen_beds_avail: 14, doctor_on_duty: 'Dr. Rajesh Verma', phone: '0866-282002' },
    { name: 'Government General Hospital (GGH), Vijayawada', type: 'District Hospital', distance: '16.0 km', total_beds: 500, gen_beds_avail: 74, icu_beds_avail: 12, oxygen_beds_avail: 45, doctor_on_duty: 'Emergency Trauma Team', phone: '0866-257000' }
  ]);

  // 3. Medicines
  await postTable('medicines', [
    { name: 'Paracetamol 650mg', category: 'Fever & Pain Relief', stock: 450, unit: 'Tablets', generic_price: 8.00, brand_price: 34.00, status: 'In Stock' },
    { name: 'Amoxicillin 500mg', category: 'Antibiotic Infection', stock: 220, unit: 'Capsules', generic_price: 28.00, brand_price: 110.00, status: 'In Stock' },
    { name: 'Metformin 500mg', category: 'Diabetes / Blood Sugar', stock: 380, unit: 'Tablets', generic_price: 12.00, brand_price: 58.00, status: 'In Stock' },
    { name: 'Amlodipine 5mg', category: 'Hypertension / BP', stock: 190, unit: 'Tablets', generic_price: 6.00, brand_price: 38.00, status: 'In Stock' },
    { name: 'ORS Powder Sachets', category: 'Dehydration / Diarrhea', stock: 500, unit: 'Packets', generic_price: 5.00, brand_price: 24.00, status: 'In Stock' },
    { name: 'Iron & Folic Acid (IFA)', category: 'Maternal Nutrition', stock: 650, unit: 'Tablets', generic_price: 4.00, brand_price: 32.00, status: 'In Stock' },
    { name: 'Azithromycin 500mg', category: 'Broad Spectrum Antibiotic', stock: 175, unit: 'Tablets', generic_price: 42.00, brand_price: 145.00, status: 'In Stock' }
  ]);

  // 4. OPD Queue
  await postTable('consult_queue', [
    { token: 'T-01', patient_name: 'Ramesh Kumar', age: 38, gender: 'M', complaint: 'High Fever & Body Ache for 3 Days', bp: '120/80', spo2: '98%', temp: '101.4°F', pulse: '88 bpm', triage: 'Yellow', queue_time: '10:15 AM', status: 'Waiting' },
    { token: 'T-02', patient_name: 'Sunita Devi', age: 34, gender: 'F', complaint: '2nd Trimester Routine Check & Mild Dizziness', bp: '110/70', spo2: '99%', temp: '98.6°F', pulse: '76 bpm', triage: 'Green', queue_time: '10:30 AM', status: 'Waiting' },
    { token: 'T-03', patient_name: 'Gopal Raju', age: 52, gender: 'M', complaint: 'Chest Tightness & Breathlessness on Exertion', bp: '150/95', spo2: '94%', temp: '99.1°F', pulse: '104 bpm', triage: 'Red', queue_time: '10:45 AM', status: 'Waiting' },
    { token: 'T-04', patient_name: 'Fatima Bi', age: 46, gender: 'F', complaint: 'Diabetic Foot Ulcer & Spiking Blood Sugar', bp: '140/90', spo2: '97%', temp: '99.8°F', pulse: '92 bpm', triage: 'Red', queue_time: '11:00 AM', status: 'Waiting' },
    { token: 'T-05', patient_name: 'Aarav Patel', age: 7, gender: 'M', complaint: 'Persistent Allergic Cough & Runny Nose', bp: '105/68', spo2: '99%', temp: '98.8°F', pulse: '82 bpm', triage: 'Green', queue_time: '11:15 AM', status: 'Waiting' }
  ]);

  console.log('🎉 Seed completed successfully!');
}

runSeed().catch(console.error);
