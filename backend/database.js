const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'data.json');

const initialData = {
  pathwayTiers: [
    { id: 1, tier: 'Sub-Centre', name: 'Kondapalli Sub-Centre', meta: '0.8 km · Day 1', status: 'done' },
    { id: 2, tier: 'PHC', name: 'Kondapalli PHC', meta: '3.2 km · Day 1', status: 'current' },
    { id: 3, tier: 'CHC', name: 'Ibrahimpatnam CHC', meta: '11 km · pending', status: 'upcoming' },
    { id: 4, tier: 'District Hospital', name: 'Vijayawada Dist. Hospital', meta: '26 km · pending', status: 'upcoming' }
  ],
  activity: [
    { id: 'act-1', date: '24 Aug', event: 'ANC check-up completed', facility: 'Kondapalli PHC', status: ['good', 'Completed'] },
    { id: 'act-2', date: '22 Aug', event: 'Iron-Folic Acid dispensed', facility: 'Kondapalli Sub-Centre', status: ['good', 'Completed'] },
    { id: 'act-3', date: '19 Aug', event: 'Referred for anaemia review', facility: 'Kondapalli PHC → Ibrahimpatnam CHC', status: ['warn', 'In-transit'] },
    { id: 'act-4', date: '12 Aug', event: 'Blood test — Hb, blood sugar', facility: 'Kondapalli PHC', status: ['good', 'Report ready'] }
  ],
  appointments: [
    { id: 'apt-1', date: '27 Aug, 10:30 AM', patientName: 'Anitha K.', patientId: 'patient_001', facility: 'Kondapalli PHC', type: 'ANC follow-up', status: ['info', 'Upcoming'] },
    { id: 'apt-2', date: '25 Aug, 4:00 PM', patientName: 'Ravi Teja (son)', patientId: 'patient_002', facility: 'Kondapalli Sub-Centre', type: 'Immunization', status: ['info', 'Upcoming'] },
    { id: 'apt-3', date: '19 Aug, 11:00 AM', patientName: 'Anitha K.', patientId: 'patient_001', facility: 'Kondapalli PHC', type: 'In-person', status: ['good', 'Completed'] },
    { id: 'apt-4', date: '02 Aug, 9:15 AM', patientName: 'Anitha K.', patientId: 'patient_001', facility: 'Kondapalli PHC', type: 'Teleconsultation', status: ['good', 'Completed'] }
  ],
  queue: [
    '#41 Waiting',
    '#42 Waiting',
    '#43 Waiting',
    '#44 In consult',
    '#45 Waiting',
    '#46 Waiting',
    '#47 Waiting',
    '#48 You (Anitha)'
  ],
  referrals: [
    { id: 'ref-1', patient: 'Anitha K.', route: 'Kondapalli PHC → Ibrahimpatnam CHC', reason: 'Anaemia in pregnancy — Hb 9.2', urgency: ['warn', 'Priority'], status: ['warn', 'In-transit — Day 2'] },
    { id: 'ref-2', patient: 'Suresh B.', route: 'Kondapalli Sub-Centre → Kondapalli PHC', reason: 'Uncontrolled hypertension', urgency: ['bad', 'Urgent'], status: ['bad', 'Delayed — 52 hrs'] },
    { id: 'ref-3', patient: 'Lakshmi P.', route: 'Kondapalli PHC → Vijayawada District Hospital', reason: 'Suspected TB — sputum positive', urgency: ['bad', 'Urgent'], status: ['good', 'Accepted, transport arranged'] },
    { id: 'ref-4', patient: 'Ramesh N.', route: 'Ibrahimpatnam CHC → Vijayawada District Hospital', reason: 'Post-op follow-up', urgency: ['neutral', 'Routine'], status: ['good', 'Completed'] }
  ],
  diagnostics: [
    { id: 'diag-1', patient: 'Anitha K.', test: 'Haemoglobin (Hb) + CBC', facility: 'Kondapalli PHC Lab', ordered: '22 Aug', status: ['good', 'Report ready'] },
    { id: 'diag-2', patient: 'Suresh B.', test: 'Renal function panel', facility: 'Ibrahimpatnam CHC Lab', ordered: '24 Aug', status: ['warn', 'Processing'] },
    { id: 'diag-3', patient: 'Lakshmi P.', test: 'Sputum AFB + Chest X-ray', facility: 'Vijayawada District Hospital', ordered: '23 Aug', status: ['info', 'Sample collected'] },
    { id: 'diag-4', patient: 'Ravi Teja', test: 'Routine growth screening', facility: 'Kondapalli Sub-Centre', ordered: '20 Aug', status: ['good', 'Delivered'] }
  ],
  diagAvailability: [
    { id: 'da-1', name: 'Kondapalli Sub-Centre', tests: 'Basic vitals, RDTs, glucose, pregnancy test', turnaround: 'Same day' },
    { id: 'da-2', name: 'Kondapalli PHC', tests: 'CBC, blood sugar, urine, Hb, malaria, dengue', turnaround: 'Same day – next day' },
    { id: 'da-3', name: 'Ibrahimpatnam CHC', tests: 'X-ray, ultrasound, renal/liver panel, ECG', turnaround: '1–2 days' }
  ],
  medicines: [
    { id: 'med-1', name: 'Iron-Folic Acid tablets', facility: 'Kondapalli Sub-Centre', stock: '1,240 strips', reorder: '300 strips', status: ['good', 'Adequate'], genericPrice: 32, brandedPrice: 180 },
    { id: 'med-2', name: 'ORS sachets', facility: 'Kondapalli PHC', stock: '860 units', reorder: '250 units', status: ['good', 'Adequate'], genericPrice: 8, brandedPrice: 35 },
    { id: 'med-3', name: 'Amoxicillin 500mg', facility: 'Kondapalli PHC', stock: '140 strips', reorder: '200 strips', status: ['warn', 'Low — reorder placed'], genericPrice: 28, brandedPrice: 110 },
    { id: 'med-4', name: 'Insulin (Human, 40IU)', facility: 'Ibrahimpatnam CHC', stock: '12 vials', reorder: '40 vials', status: ['bad', 'Critical — expedite'], genericPrice: 145, brandedPrice: 420 },
    { id: 'med-5', name: 'Oxytocin injection', facility: 'Ibrahimpatnam CHC', stock: '58 vials', reorder: '50 vials', status: ['good', 'Adequate'], genericPrice: 18, brandedPrice: 65 },
    { id: 'med-6', name: 'Anti-TB (Category I kit)', facility: 'Vijayawada District Hospital', stock: '204 kits', reorder: '80 kits', status: ['good', 'Adequate'], genericPrice: 0, brandedPrice: 950 },
    { id: 'med-7', name: 'Paracetamol 500mg', facility: 'Kondapalli Sub-Centre', stock: '2,100 strips', reorder: '400 strips', status: ['good', 'Adequate'], genericPrice: 12, brandedPrice: 45 }
  ],
  followups: [
    { id: 'fu-1', patient: 'Anitha K.', program: 'Maternal (ANC) — 2nd trimester', due: '27 Aug 2026', asha: 'B. Saraswati (ASHA)', status: ['bad', 'Overdue by 1 day'] },
    { id: 'fu-2', patient: 'Ravi Teja (8 mo)', program: 'Child Immunization — DPT booster', due: '29 Aug 2026', asha: 'B. Saraswati (ASHA)', status: ['warn', 'Due soon'] },
    { id: 'fu-3', patient: 'Suresh B.', program: 'Chronic — Hypertension review', due: '01 Sep 2026', asha: 'K. Nageswara Rao (ANM)', status: ['good', 'On track'] },
    { id: 'fu-4', patient: 'Lakshmi P.', program: 'Chronic — TB DOTS adherence', due: '26 Aug 2026', asha: 'B. Saraswati (ASHA)', status: ['warn', 'Due soon'] }
  ],
  facilities: [
    { id: 'fac-1', name: 'Kondapalli Sub-Centre', tier: 'Tier 1 · Sub-Centre', wait: '9 min', ref: '—', stock: ['good', 'Healthy'], conn: ['good', 'Online'] },
    { id: 'fac-2', name: 'Kondapalli PHC', tier: 'Tier 2 · PHC', wait: '18 min', ref: '87%', stock: ['warn', 'Watch: 2 low items'], conn: ['good', 'Online'] },
    { id: 'fac-3', name: 'Ibrahimpatnam CHC', tier: 'Tier 3 · CHC', wait: '34 min', ref: '79%', stock: ['bad', 'Critical: Insulin'], conn: ['warn', 'Intermittent (2G)'] },
    { id: 'fac-4', name: 'Vijayawada District Hospital', tier: 'Tier 4 · District', wait: '46 min', ref: '93%', stock: ['good', 'Healthy'], conn: ['good', 'Online'] }
  ],
  footfall: [
    { label: 'Mon', val: 62 },
    { label: 'Tue', val: 71 },
    { label: 'Wed', val: 54 },
    { label: 'Thu', val: 80 },
    { label: 'Fri', val: 75 },
    { label: 'Sat', val: 88 },
    { label: 'Sun', val: 40 }
  ],
  patientRecord: {
    id: 'patient_001',
    name: 'Anitha K.',
    age: 29,
    gender: 'F',
    village: 'Kondapalli',
    abhaId: '14-2938-7710-4521',
    fhirCompliance: 'FHIR R4 · interoperable',
    riskFlags: [
      { label: 'ANC · 2nd trimester', severity: 'warn' },
      { label: 'Anaemia — Hb 9.2', severity: 'bad' }
    ],
    allergies: 'No known drug allergies. Iron supplementation started 14 Jul 2026.',
    timeline: [
      { id: 't-1', date: '24 Aug 2026', title: 'ANC check-up — Kondapalli PHC', note: 'BP 118/76, weight 58kg, foetal heartbeat normal. Iron supplementation continued.' },
      { id: 't-2', date: '22 Aug 2026', title: 'Iron-Folic Acid dispensed — Sub-Centre', note: '30-day course issued by ANM.' },
      { id: 't-3', date: '19 Aug 2026', title: 'Referred to Ibrahimpatnam CHC', note: 'Reason: anaemia in pregnancy (Hb 9.2). Priority referral.' },
      { id: 't-4', date: '12 Aug 2026', title: 'Lab work — Hb, blood sugar, urine routine', note: 'Report ready; reviewed by MO at PHC.' },
      { id: 't-5', date: '02 Aug 2026', title: 'Teleconsultation — Dr. Rao (CHC)', note: 'Assisted by ASHA worker at Sub-Centre kiosk. Advised iron-rich diet.' },
      { id: 't-6', date: '14 Jul 2026', title: 'First ANC registration', note: 'Registered under maternal follow-up programme, ABHA ID linked.' }
    ]
  },
  triageSubmissions: [],
  emergencyDispatches: []
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
      return initialData;
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading DB, falling back to initial data:', err);
    return initialData;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing DB:', err);
    return false;
  }
}

module.exports = {
  readDb,
  writeDb
};
