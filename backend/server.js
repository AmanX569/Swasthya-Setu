const express = require('express');
const cors = require('cors');
const path = require('path');
const { readDb, writeDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files if accessed via http://localhost:5000
app.use(express.static(path.join(__dirname, '../frontend')));

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

/* =========================================================
   API ENDPOINTS
========================================================= */

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Setu Rural Care Network API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 2. Home Overview & Activity
app.get('/api/home', (req, res) => {
  const db = readDb();
  res.json({
    pathwayTiers: db.pathwayTiers,
    activity: db.activity,
    stats: {
      avgWait: '18 min',
      openReferrals: db.referrals.filter(r => r.status[0] !== 'good').length,
      followupsDue: db.followups.filter(f => f.status[0] !== 'good').length,
      medicinesStockHealth: '92%'
    }
  });
});

// 3. Appointments & Queue
app.get('/api/appointments', (req, res) => {
  const db = readDb();
  res.json(db.appointments);
});

app.post('/api/appointments', (req, res) => {
  const { patientName, patientId, facility, date, type } = req.body;
  if (!patientName || !facility || !date) {
    return res.status(400).json({ error: 'patientName, facility, and date are required' });
  }

  const db = readDb();
  const newAppointment = {
    id: `apt-${Date.now()}`,
    date: date.includes(',') ? date : `${date}, 10:00 AM`,
    patientName: patientName || 'Anitha K.',
    patientId: patientId || 'patient_001',
    facility,
    type: type || 'In-person',
    status: ['info', 'Upcoming'],
    createdAt: new Date().toISOString()
  };

  db.appointments.unshift(newAppointment);

  // Add activity log
  db.activity.unshift({
    id: `act-${Date.now()}`,
    date: 'Today',
    event: `Booked appointment (${newAppointment.type})`,
    facility: newAppointment.facility,
    status: ['info', 'Booked']
  });

  writeDb(db);
  res.status(201).json(newAppointment);
});

app.get('/api/queue', (req, res) => {
  const db = readDb();
  res.json(db.queue);
});

// 4. Longitudinal Patient Records (ABHA-Linked) & Patients List
app.get('/api/records', (req, res) => {
  const db = readDb();
  res.json(db.patientRecord);
});

// Alias for /api/patients
app.get('/api/patients', (req, res) => {
  const db = readDb();
  res.json([
    db.patientRecord,
    {
      id: 'patient_002',
      name: 'Ravi Teja',
      age: '8 mo',
      gender: 'M',
      village: 'Kondapalli',
      abhaId: '14-8841-3329-1092',
      riskFlags: [{ label: 'Child Immunization Due', severity: 'warn' }]
    },
    {
      id: 'patient_003',
      name: 'Suresh B.',
      age: 54,
      gender: 'M',
      village: 'Kondapalli',
      abhaId: '14-1192-4402-9981',
      riskFlags: [{ label: 'Uncontrolled HTN', severity: 'bad' }]
    },
    {
      id: 'patient_004',
      name: 'Lakshmi P.',
      age: 41,
      gender: 'F',
      village: 'Kondapalli',
      abhaId: '14-7740-9921-6510',
      riskFlags: [{ label: 'TB DOTS Adherence', severity: 'warn' }]
    }
  ]);
});

app.get('/api/patients/:id', (req, res) => {
  const db = readDb();
  if (req.params.id === 'patient_001' || req.params.id === '1') {
    return res.json(db.patientRecord);
  }
  res.json(db.patientRecord);
});

app.post('/api/records/timeline', (req, res) => {
  const { title, note, date } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'title is required' });
  }

  const db = readDb();
  const entry = {
    id: `t-${Date.now()}`,
    date: date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    title,
    note: note || ''
  };

  db.patientRecord.timeline.unshift(entry);
  writeDb(db);
  res.status(201).json(entry);
});

// 5. Referrals Tracking
app.get('/api/referrals', (req, res) => {
  const db = readDb();
  res.json(db.referrals);
});

app.post('/api/referrals', (req, res) => {
  const { patient, route, reason, urgency } = req.body;
  if (!patient || !route || !reason) {
    return res.status(400).json({ error: 'patient, route, and reason are required' });
  }

  const db = readDb();
  const newReferral = {
    id: `ref-${Date.now()}`,
    patient,
    route,
    reason,
    urgency: urgency || ['warn', 'Priority'],
    status: ['warn', 'In-transit — Day 1'],
    createdAt: new Date().toISOString()
  };

  db.referrals.unshift(newReferral);
  writeDb(db);
  res.status(201).json(newReferral);
});

app.patch('/api/referrals/:id', (req, res) => {
  const { id } = req.params;
  const { status, urgency } = req.body;

  const db = readDb();
  const referral = db.referrals.find(r => r.id === id);
  if (!referral) {
    return res.status(404).json({ error: 'Referral not found' });
  }

  if (status) referral.status = status;
  if (urgency) referral.urgency = urgency;

  writeDb(db);
  res.json(referral);
});

// 6. Diagnostics
app.get('/api/diagnostics', (req, res) => {
  const db = readDb();
  res.json({
    diagnostics: db.diagnostics,
    availability: db.diagAvailability
  });
});

app.post('/api/diagnostics', (req, res) => {
  const { patient, test, facility } = req.body;
  if (!patient || !test || !facility) {
    return res.status(400).json({ error: 'patient, test, and facility are required' });
  }

  const db = readDb();
  const newOrder = {
    id: `diag-${Date.now()}`,
    patient,
    test,
    facility,
    ordered: 'Today',
    status: ['info', 'Sample pending']
  };

  db.diagnostics.unshift(newOrder);
  writeDb(db);
  res.status(201).json(newOrder);
});

// 7. Medicine & Supply Inventory
app.get('/api/medicines', (req, res) => {
  const { q } = req.query;
  const db = readDb();
  let results = db.medicines;

  if (q) {
    const query = q.toLowerCase();
    results = results.filter(m => m.name.toLowerCase().includes(query) || m.facility.toLowerCase().includes(query));
  }

  res.json(results);
});

app.patch('/api/medicines/:id/stock', (req, res) => {
  const { id } = req.params;
  const { stock, status } = req.body;

  const db = readDb();
  const med = db.medicines.find(m => m.id === id);
  if (!med) {
    return res.status(404).json({ error: 'Medicine not found' });
  }

  if (stock) med.stock = stock;
  if (status) med.status = status;

  writeDb(db);
  res.json(med);
});

// 8. High-Risk Patient Follow-Up
app.get('/api/followup', (req, res) => {
  const db = readDb();
  res.json(db.followups);
});

app.post('/api/followup', (req, res) => {
  const { patient, program, due, asha } = req.body;
  if (!patient || !program || !due) {
    return res.status(400).json({ error: 'patient, program, and due date are required' });
  }

  const db = readDb();
  const newFollowup = {
    id: `fu-${Date.now()}`,
    patient,
    program,
    due,
    asha: asha || 'B. Saraswati (ASHA)',
    status: ['info', 'Scheduled']
  };

  db.followups.unshift(newFollowup);
  writeDb(db);
  res.status(201).json(newFollowup);
});

app.post('/api/followup/:id/remind', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const fu = db.followups.find(f => f.id === id);
  if (!fu) {
    return res.status(404).json({ error: 'Follow-up record not found' });
  }

  res.json({
    success: true,
    message: `SMS reminder dispatched to worker ${fu.asha} for patient ${fu.patient}`,
    timestamp: new Date().toISOString()
  });
});

// 9. Digital Triage & AI Red-Flag Check
app.post('/api/triage', (req, res) => {
  const { answers, patientId } = req.body;
  const db = readDb();

  const redFlagSigns = ['Severe breathlessness', 'Unconsciousness / fainting', 'Heavy bleeding', 'गंभीर सांस फूलना', 'बेहोशी', 'अत्यधिक रक्तस्राव', 'తీవ్రమైన శ్వాసలోపం', 'అపస్మారకం', 'భారీ రక్తస్రావం'];
  const hasRedFlag = Array.isArray(answers) && answers.some(a => redFlagSigns.includes(a));

  const submission = {
    id: `triage-${Date.now()}`,
    patientId: patientId || 'patient_001',
    answers: answers || [],
    hasRedFlag,
    recommendation: hasRedFlag
      ? 'EMERGENCY_ESCALATION: Transport to nearest PHC immediately'
      : 'ROUTINE: Schedule PHC visit within 24 hours',
    createdAt: new Date().toISOString()
  };

  db.triageSubmissions.unshift(submission);
  writeDb(db);

  res.json(submission);
});

// 10. Emergency SOS 108 Alert & Dispatch
app.post('/api/emergency/sos', (req, res) => {
  const { symptom, location, patientName } = req.body;
  const db = readDb();

  const dispatch = {
    id: `sos-${Date.now()}`,
    patientName: patientName || 'Anitha K.',
    symptom: symptom || 'Severe acute distress',
    location: location || 'Kondapalli village, Ward 4',
    facility: 'Kondapalli PHC',
    ambulance: '108-AP-09-5412',
    driver: 'Ravi Kumar',
    etaMinutes: 12,
    status: 'DISPATCHED',
    timestamp: new Date().toISOString()
  };

  db.emergencyDispatches.unshift(dispatch);

  // Add high-priority activity
  db.activity.unshift({
    id: `act-${Date.now()}`,
    date: 'Just now',
    event: `🚨 Emergency 108 dispatched: ${dispatch.symptom}`,
    facility: dispatch.facility,
    status: ['bad', 'Dispatched']
  });

  writeDb(db);
  res.status(201).json(dispatch);
});

// 11. Facility Dashboard & Quality Monitoring
app.get('/api/dashboard', (req, res) => {
  const db = readDb();
  res.json({
    footfall: db.footfall,
    facilities: db.facilities,
    qualityFlags: [
      ['bad', 'Insulin stock critical at Ibrahimpatnam CHC — 12 vials remain'],
      ['warn', 'Referral SLA breached: Suresh B. waiting 52 hrs (target 24 hrs)'],
      ['warn', 'CHC connectivity intermittent — 3 sync retries today'],
      ['good', 'Patient satisfaction up 0.3 pts this month']
    ]
  });
});

// 11. Authentication & Multi-Role RBAC Endpoints
const MOCK_OTP = '123456';
const DEMO_ACCOUNTS = [
  {
    userId: 'USR-ADMIN-001',
    name: 'Rajesh Sharma',
    phone: '1111111111',
    roles: ['admin'],
    activeRole: 'admin',
    designation: 'Chief Medical Officer / District Admin',
    facility: 'Kondapalli Community Health Grid'
  },
  {
    userId: 'USR-DOC-002',
    name: 'Dr. K. V. Rao',
    phone: '2222222222',
    roles: ['doctor'],
    activeRole: 'doctor',
    designation: 'Senior Consultant (General Medicine)',
    facility: 'Ibrahimpatnam CHC'
  },
  {
    userId: 'USR-WORKER-003',
    name: 'B. Saraswati',
    phone: '3333333333',
    roles: ['worker'],
    activeRole: 'worker',
    designation: 'Lead ASHA Facilitator (Ward 6)',
    facility: 'Kondapalli Sub-Centre'
  },
  {
    userId: 'USR-PATIENT-004',
    name: 'Anitha K.',
    phone: '4444444444',
    roles: ['patient'],
    activeRole: 'patient',
    designation: 'Kondapalli Resident (ABHA Linked)',
    facility: 'Kondapalli PHC'
  },
  {
    userId: 'USR-MULTI-005',
    name: 'Vikram Mehta',
    phone: '5555555555',
    roles: ['admin', 'patient'],
    activeRole: 'admin',
    designation: 'Facility Administrator & Community Member',
    facility: 'Kondapalli District Network'
  },
  {
    userId: 'USR-MULTI-006',
    name: 'Dr. Priya Patel',
    phone: '6666666666',
    roles: ['doctor', 'patient'],
    activeRole: 'doctor',
    designation: 'Specialist Physician & Registered Citizen',
    facility: 'Vijayawada Medical Centre'
  }
];

app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  if (cleanPhone.length !== 10) {
    return res.status(400).json({ error: 'Please provide a valid 10-digit mobile number' });
  }

  const existing = DEMO_ACCOUNTS.find(a => a.phone === cleanPhone);
  res.json({
    success: true,
    phone: cleanPhone,
    message: `OTP sent successfully. Demo OTP: ${MOCK_OTP}`,
    accountExists: Boolean(existing),
    roles: existing ? existing.roles : []
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  const cleanPhone = String(phone || '').replace(/\D/g, '');
  const cleanOtp = String(otp || '').trim();

  if (cleanOtp !== MOCK_OTP) {
    return res.status(400).json({ error: `Invalid OTP. Please enter ${MOCK_OTP} for demo.` });
  }

  const account = DEMO_ACCOUNTS.find(a => a.phone === cleanPhone);
  if (account) {
    res.json({
      success: true,
      account,
      token: `mock-jwt-token-${account.userId}`
    });
  } else {
    res.json({
      success: true,
      account: null,
      message: 'Account not found. Please register.'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, phone, selectedRole, extraInfo } = req.body;
  const cleanPhone = String(phone || '').replace(/\D/g, '');

  if (!name || name.length < 2 || cleanPhone.length !== 10 || !selectedRole) {
    return res.status(400).json({ error: 'Invalid registration payload' });
  }

  if (selectedRole === 'admin') {
    return res.status(403).json({ error: 'Public administrator registration is not allowed.' });
  }

  const newAccount = {
    userId: `USR-${selectedRole.toUpperCase()}-${Date.now().toString().slice(-4)}`,
    name: name.trim(),
    phone: cleanPhone,
    roles: [selectedRole],
    activeRole: selectedRole,
    designation: extraInfo?.designation || selectedRole.toUpperCase(),
    facility: extraInfo?.facility || 'Kondapalli Community Grid',
    registeredAt: new Date().toISOString()
  };

  DEMO_ACCOUNTS.push(newAccount);
  res.status(201).json({
    success: true,
    account: newAccount,
    token: `mock-jwt-token-${newAccount.userId}`
  });
});

// 404 Catch-all Handler
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.originalUrl });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Process-level safety
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Keep event loop active
setInterval(() => {}, 60000);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  Setu Backend Server running on http://localhost:${PORT}`);
  console.log(`  API Base URL: http://localhost:${PORT}/api`);
  console.log(`=================================================`);
});


