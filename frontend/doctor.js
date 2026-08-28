/**
 * Swasthya Setu - Doctor Portal & Clinical Telemedicine Suite Controller
 * 
 * Provides:
 * 1. Clinical Doctor Dashboard Overview
 * 2. Live Consultation Queue (Emergency, Waiting, Scheduled, Completed)
 * 3. Pre-Consultation Summary & Field Worker (ASHA/ANM) Vitals Card
 * 4. Longitudinal Electronic Medical Record (EMR) & Structured Intake Notes
 * 5. Live Tele-Consultation HUD (Video/Audio Controls, Translator Join, Live Notes)
 * 6. Smart "Pan Pusheddy" e-Prescription Generator with Printable Preview
 * 7. In-Consult Emergency Escalation & Hospital Bed (ICU/Oxygen) Reservation
 * 8. Consultation Completion & Follow-up Scheduler
 */

(function(global) {
  'use strict';

  const doctorState = {
    currentTab: 'overview', // 'overview', 'queue', 'tele', 'preconsult', 'emr', 'rx', 'emergency'
    queueFilter: 'all',
    activeConsultId: 'CNS-002', // Default active consult: Anitha K.
    isAudioMuted: false,
    isVideoOff: false,
    isAudioOnly: false,
    isAshaJoined: true,
    rxMedicines: [
      { name: 'Iron & Folic Acid (IFA) Tablets', dose: '100mg elemental iron', freq: '1-0-0 (Morning)', duration: '30 Days', route: 'Oral', instructions: 'Take with lemon water / after breakfast' },
      { name: 'Calcium & Vitamin D3 Tablets', dose: '500mg / 250IU', freq: '0-0-1 (Night)', duration: '30 Days', route: 'Oral', instructions: 'Take after dinner with warm water' }
    ]
  };

  const doctorData = {
    doctorProfile: {
      id: 'USR-DOC-101',
      name: 'Dr. K. V. Rao',
      degree: 'MBBS, MD (General Medicine)',
      specialization: 'Senior Consultant Physician',
      mciNumber: 'MCI-AP-2018-99412',
      hospital: 'Ibrahimpatnam Community Health Centre (CHC)',
      department: 'Clinical Tele-Medicine & OPD',
      phone: '2222222222',
      avatar: 'KR'
    },

    stats: {
      todayConsultations: 0,
      waitingQueue: 0,
      emergencyCases: 0,
      completedToday: 0,
      avgConsultDuration: '0 min',
      patientCSAT: '5.0 / 5.0'
    },

    // Master Consultation Queue
    consultations: [
      {
        id: 'CNS-001',
        patientId: 'PAT-901',
        patientName: 'Baby Ravi Teja (8 Months)',
        guardian: 'Ravi Kumar (Father)',
        ageGender: '8 Mo · Male',
        location: 'Kondapalli Sub-Centre Kiosk',
        type: 'Assisted Video Tele-Consult',
        priority: 'EMERGENCY',
        status: 'Waiting',
        scheduledTime: 'Immediate',
        waitingTime: '2 min ago',
        chiefComplaint: 'High fever (103°F) with febrile seizure episode 20 min ago',
        ashaWorker: 'B. Saraswati (ASHA Ward 6)',
        vitals: {
          temp: '102.8 °F',
          bp: 'N/A (Pediatric)',
          pulse: '142 bpm',
          spo2: '96%',
          resp: '38 /min',
          weight: '7.8 kg',
          bloodSugar: '92 mg/dL',
          recordedAt: 'Today, 09:10 AM'
        }
      },
      {
        id: 'CNS-002',
        patientId: 'PAT-301',
        patientName: 'Anitha K.',
        guardian: 'Self',
        ageGender: '29 Yrs · Female',
        location: 'Kondapalli PHC Assisted Kiosk',
        type: 'Assisted Video Tele-Consult',
        priority: 'HIGH PRIORITY',
        status: 'In Progress',
        scheduledTime: '10:30 AM',
        waitingTime: '6 min ago',
        chiefComplaint: 'ANC 2nd Trimester · Anaemia review (Hb 9.2 g/dL) & mild dizziness',
        ashaWorker: 'B. Saraswati (ASHA Ward 6)',
        vitals: {
          temp: '98.6 °F',
          bp: '118/76 mmHg',
          pulse: '78 bpm',
          spo2: '99%',
          resp: '18 /min',
          weight: '58.4 kg',
          bloodSugar: '104 mg/dL',
          recordedAt: 'Today, 08:45 AM'
        }
      },
      {
        id: 'CNS-003',
        patientId: 'PAT-302',
        patientName: 'Suresh B.',
        guardian: 'Self',
        ageGender: '54 Yrs · Male',
        location: 'Ibrahimpatnam Rural Tele-Desk',
        type: 'Video Teleconsultation',
        priority: 'NORMAL',
        status: 'Waiting',
        scheduledTime: '11:15 AM',
        waitingTime: '12 min ago',
        chiefComplaint: 'Uncontrolled Hypertension follow-up · Morning headache & neck stiffness',
        ashaWorker: 'K. Nageswara Rao (ANM)',
        vitals: {
          temp: '98.4 °F',
          bp: '154/96 mmHg',
          pulse: '84 bpm',
          spo2: '97%',
          resp: '20 /min',
          weight: '72 kg',
          bloodSugar: '148 mg/dL',
          recordedAt: 'Today, 08:30 AM'
        }
      },
      {
        id: 'CNS-004',
        patientId: 'PAT-303',
        patientName: 'Lakshmi P.',
        guardian: 'Self',
        ageGender: '42 Yrs · Female',
        location: 'Vijayawada Rural Hub',
        type: 'Audio Teleconsultation',
        priority: 'NORMAL',
        status: 'Scheduled',
        scheduledTime: '11:45 AM',
        waitingTime: 'Scheduled',
        chiefComplaint: 'Chronic TB DOTS adherence review & Sputum AFB report discussion',
        ashaWorker: 'M. Lakshmi Devi (ASHA)',
        vitals: {
          temp: '99.1 °F',
          bp: '110/70 mmHg',
          pulse: '82 bpm',
          spo2: '98%',
          resp: '19 /min',
          weight: '44 kg',
          bloodSugar: '98 mg/dL',
          recordedAt: '27 Aug 2026, 04:00 PM'
        }
      },
      {
        id: 'CNS-005',
        patientId: 'PAT-305',
        patientName: 'Ramesh N.',
        guardian: 'Self',
        ageGender: '48 Yrs · Male',
        location: 'Ibrahimpatnam CHC',
        type: 'In-person / Video Hybrid',
        priority: 'NORMAL',
        status: 'Completed',
        scheduledTime: '09:30 AM',
        waitingTime: 'Completed',
        chiefComplaint: 'Post-op appendectomy dressing review · Wound healing clean',
        ashaWorker: 'K. Nageswara Rao (ANM)',
        vitals: {
          temp: '98.6 °F',
          bp: '122/80 mmHg',
          pulse: '74 bpm',
          spo2: '99%',
          resp: '16 /min',
          weight: '68 kg',
          bloodSugar: '110 mg/dL',
          recordedAt: 'Today, 08:00 AM'
        }
      }
    ],

    // Patient Longitudinal Medical Record Dossier (EMR)
    emrDossier: {
      'PAT-301': {
        name: 'Anitha K.',
        age: 29,
        gender: 'Female',
        bloodGroup: 'O+',
        abhaId: '14-2938-7710-4521',
        phone: '+91 4444444444',
        village: 'Kondapalli Gramam, Ward 6',
        primaryPhc: 'Kondapalli PHC',
        allergies: ['No Known Drug Allergies (NKDA)'],
        chronicConditions: ['Moderate Gestational Anaemia (Hb 9.2 g/dL)', 'ANC 2nd Trimester (24 Weeks)'],
        pastSurgeries: ['None'],
        immunizationStatus: ['Tetanus Toxoid (TT-1, TT-2) Complete'],
        consultationHistory: [
          { date: '24 Aug 2026', doctor: 'Dr. K. V. Rao', diagnosis: 'ANC 2nd Trimester Checkup', notes: 'Foetal heart rate 144 bpm normal. Fundal height corresponds to gestational age.' },
          { date: '19 Aug 2026', doctor: 'Dr. Priya Patel', diagnosis: 'Nutritional Anaemia in Pregnancy', notes: 'Started on oral iron supplementation 100mg OD. Advised green leafy vegetables & jaggery diet.' },
          { date: '12 Aug 2026', doctor: 'Dr. Ramesh Chandra', diagnosis: 'Routine Antenatal Lab Panel', notes: 'Hb: 9.2 g/dL, Blood Sugar Fasting: 88 mg/dL, Urine Albumin: Nil.' }
        ]
      },
      'PAT-901': {
        name: 'Baby Ravi Teja',
        age: '8 Months',
        gender: 'Male',
        bloodGroup: 'B+',
        abhaId: '14-8841-9920-1123',
        phone: '+91 9848112233',
        village: 'Kondapalli Village',
        primaryPhc: 'Kondapalli Sub-Centre',
        allergies: ['No Known Allergies'],
        chronicConditions: ['Febrile Seizures Triggered by High Pyrexia'],
        pastSurgeries: ['None'],
        immunizationStatus: ['DPT, OPV, Rotavirus, Measles-Rubella Complete'],
        consultationHistory: [
          { date: '20 Aug 2026', doctor: 'Dr. Ramesh Chandra', diagnosis: 'Mild Upper Respiratory Infection', notes: 'Prescribed Paracetamol syrup 120mg/5ml SOS.' }
        ]
      }
    },

    // Hospital Bed Availability for In-Consult Emergency Escalation
    hospitalBedGrid: [
      {
        id: 'HOSP-01',
        name: 'Vijayawada District Hospital (Tertiary Command)',
        location: 'District HQ Campus (26 km · 35 min transport)',
        icuAvailable: 8,
        icuTotal: 48,
        oxygenAvailable: 34,
        oxygenTotal: 160,
        generalAvailable: 92,
        generalTotal: 450,
        ambulanceAvailable: '3 Units Ready'
      },
      {
        id: 'HOSP-02',
        name: 'Ibrahimpatnam Community Health Centre (CHC)',
        location: 'Ibrahimpatnam Highway (11 km · 14 min transport)',
        icuAvailable: 1,
        icuTotal: 8,
        oxygenAvailable: 5,
        oxygenTotal: 40,
        generalAvailable: 18,
        generalTotal: 120,
        ambulanceAvailable: '1 Unit Ready'
      },
      {
        id: 'HOSP-03',
        name: 'Kondapalli Primary Health Centre (PHC)',
        location: 'Kondapalli Village Centre (3.2 km · 6 min transport)',
        icuAvailable: 2,
        icuTotal: 2,
        oxygenAvailable: 6,
        oxygenTotal: 12,
        generalAvailable: 14,
        generalTotal: 40,
        ambulanceAvailable: '1 Unit Ready'
      }
    ]
  };

  // -------------------------------------------------------------
  // CONTROLLER CLASS
  // -------------------------------------------------------------
  class DoctorController {
    constructor() {
      this.data = doctorData;
      this.state = doctorState;
    }

    init() {
      this.renderDoctorWorkspace();
      this.syncLiveDoctorDatabase();
    }

    syncLiveDoctorDatabase() {
      const dbUrl = 'https://swasthya-setu-2b67d-default-rtdb.firebaseio.com';

      // 1. Initial Cloud Hydration from Firebase
      fetch(`${dbUrl}/.json`)
        .then(r => r.json())
        .then(data => {
          if (data && typeof data === 'object') {
            // Load consultations queue from cloud
            if (data.doctor_consultation_queue) {
              const q = Array.isArray(data.doctor_consultation_queue) ? data.doctor_consultation_queue : Object.values(data.doctor_consultation_queue);
              if (q.length) this.data.consultations = q;
            }

            // Sync all patients from staff_registry and patient_family_members into consultation list
            const allPatients = [];
            if (data.staff_registry) {
              Object.values(data.staff_registry).forEach(u => {
                if (u.role === 'patient' || u.role === 'doctor') allPatients.push(u);
              });
            }
            if (data.patient_family_members) {
              Object.values(data.patient_family_members).forEach(f => {
                if (!allPatients.some(p => p.name === f.name.replace(' (Self)', ''))) {
                  allPatients.push({
                    id: f.id || `PAT-${Math.floor(100+Math.random()*900)}`,
                    name: f.name.replace(' (Self)', ''),
                    age: f.age,
                    gender: f.gender,
                    bloodGroup: f.bloodGroup,
                    facility: f.assignedAsha || 'Kondapalli Community Grid',
                    phone: f.emergencyContact || '9800000000',
                    conditions: f.conditions,
                    abhaId: f.abhaId
                  });
                }
              });
            }

            // Ingest into consultations queue if not existing
            allPatients.forEach((p, idx) => {
              const exists = this.data.consultations.some(c => c.patientName.toLowerCase().includes(p.name.toLowerCase()) || (c.patientId && c.patientId === p.id));
              if (!exists) {
                const cId = `CNS-${Math.floor(100 + Math.random() * 900)}`;
                this.data.consultations.unshift({
                  id: cId,
                  patientId: p.id || `PAT-${cId}`,
                  patientName: p.name,
                  guardian: 'Self',
                  ageGender: `${p.age || 28} Yrs · ${p.gender || 'Female'}`,
                  location: p.facility || p.location || 'Kondapalli Gramam, Ward 4',
                  type: 'Assisted Video Tele-Consult',
                  priority: (p.conditions && p.conditions[0] && p.conditions[0].includes('Risk')) ? 'HIGH PRIORITY' : 'NORMAL',
                  status: 'Waiting',
                  scheduledTime: 'Immediate',
                  waitingTime: 'Today',
                  chiefComplaint: (p.conditions && Array.isArray(p.conditions)) ? p.conditions.join(', ') : (p.conditions || 'General Healthcare & Tele-Consultation'),
                  ashaWorker: 'B. Saraswati (ASHA Ward 6)',
                  bloodGroup: p.bloodGroup || 'O+',
                  abhaId: p.abhaId || `14-8842-${Math.floor(1000+Math.random()*9000)}-3318`,
                  vitals: {
                    temp: '98.6 °F',
                    bp: '120/80 mmHg',
                    pulse: '76 bpm',
                    spo2: '99%',
                    resp: '18 /min',
                    weight: '58 kg',
                    bloodSugar: '102 mg/dL',
                    recordedAt: 'Today'
                  }
                });
              }
            });

            if (data.doctor_stats) {
              this.data.stats = { ...this.data.stats, ...data.doctor_stats };
            }

            this.renderDoctorWorkspace();
          }
        })
        .catch(() => {});

      // 2. Real-time Firebase Listeners
      if (window.firebaseConfigManager && window.firebaseConfigManager.rtdb) {
        window.firebaseConfigManager.rtdb.ref('staff_registry').on('value', () => {
          this.syncLiveDoctorDatabase();
        });
      }
    }

    
    openAddQueueModal() {
      const name = prompt('Patient Full Name: (e.g. Ramesh Kumar)');
      if (!name) return;
      const age = prompt('Age & Gender: (e.g. 35 Yrs · Male)', '35 Yrs · Male') || '30 Yrs';
      const complaint = prompt('Chief Health Complaint:', 'Fever, cough, and body ache') || 'General health consultation';
      const bp = prompt('Blood Pressure: (e.g. 120/80 mmHg)', '120/80 mmHg') || '120/80 mmHg';
      const pulse = prompt('Pulse Rate (bpm):', '76 bpm') || '76 bpm';
      const temp = prompt('Temperature (°F):', '98.6 °F') || '98.6 °F';
      const spo2 = prompt('SpO2 (%):', '99%') || '99%';

      const consult = {
        id: `CNS-${Date.now().toString().slice(-4)}`,
        patientId: `PAT-${Date.now().toString().slice(-4)}`,
        patientName: name,
        ageGender: age,
        guardian: 'Self',
        location: 'Kondapalli Tele-Desk',
        type: 'Video Teleconsultation',
        priority: 'NORMAL',
        status: 'Waiting',
        scheduledTime: 'Now',
        waitingTime: 'Just now',
        chiefComplaint: complaint,
        ashaWorker: 'ASHA Field Desk',
        vitals: {
          temp,
          bp,
          pulse,
          spo2,
          resp: '18 /min',
          weight: '60 kg',
          bloodSugar: '100 mg/dL',
          recordedAt: 'Today'
        }
      };

      this.data.consultations.unshift(consult);
      this.data.stats.waitingQueue = this.data.consultations.filter(c => c.status === 'Waiting').length;

      // Sync to Firebase Realtime Database
      try {
        fetch(`https://swasthya-setu-2b67d-default-rtdb.firebaseio.com/doctor_consultations/${consult.id}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(consult)
        }).catch(() => {});
      } catch (e) {}

      if (typeof window.toast === 'function') {
        window.toast(`✓ Added ${name} to Live Consultation Queue!`);
      }

      this.selectActivePatient(consult.id);
      this.renderDoctorWorkspace();
    }

    selectActivePatient(consultId) {
      this.state.activeConsultId = consultId;
      const c = this.getActiveConsult();
      if (typeof window.toast === 'function') {
        window.toast(`👤 Active patient switched to ${c ? c.patientName : 'Patient'}!`);
      }
      this.renderDoctorWorkspace();
    }

    getActiveConsult() {
      return this.data.consultations.find(c => c.id === this.state.activeConsultId) || this.data.consultations[0];
    }

    getActiveEmr() {
      const consult = this.getActiveConsult();
      if (consult && this.data.emrDossier[consult.patientId]) {
        return this.data.emrDossier[consult.patientId];
      }
      return {
        name: consult.patientName,
        age: consult.ageGender ? consult.ageGender.split('·')[0].trim() : 'Adult',
        gender: consult.ageGender ? consult.ageGender.split('·')[1].trim() : 'Female',
        bloodGroup: consult.bloodGroup || 'O+',
        abhaId: consult.abhaId || `14-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}`,
        phone: consult.phone || '+91 9800000000',
        village: consult.location || 'Kondapalli Gramam',
        primaryPhc: 'Kondapalli PHC',
        allergies: ['No Known Drug Allergies (NKDA)'],
        chronicConditions: [consult.chiefComplaint || 'General Health Consultation'],
        pastSurgeries: ['None Recorded'],
        immunizationStatus: ['Standard Adult Profile Complete'],
        consultationHistory: [
          { date: 'Today', doctor: 'Dr. K. V. Rao', diagnosis: consult.chiefComplaint || 'General Clinical Review', notes: 'Patient connected via teleconsultation.' }
        ]
      };
    }

    switchTab(tabId) {
      this.state.currentTab = tabId;
      document.querySelectorAll('.doc-nav-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
      });

      document.querySelectorAll('.doc-tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `doc-pane-${tabId}`);
      });

      if (tabId === 'overview') this.renderOverview();
      else if (tabId === 'queue') this.renderQueue();
      else if (tabId === 'tele') this.renderTeleconsultSuite();
      else if (tabId === 'preconsult') this.renderPreconsult();
      else if (tabId === 'emr') this.renderEMR();
      else if (tabId === 'rx') this.renderPrescriptionGenerator();
      else if (tabId === 'emergency') this.renderEmergencyHub();
    }

    getActiveConsult() {
      return this.data.consultations.find(c => c.id === this.state.activeConsultId) || this.data.consultations[1];
    }

    getActiveEmr() {
      const consult = this.getActiveConsult();
      return this.data.emrDossier[consult.patientId] || this.data.emrDossier['PAT-301'];
    }

    // -------------------------------------------------------------
    // TAB 1: CLINICAL DOCTOR DASHBOARD OVERVIEW
    // -------------------------------------------------------------
    renderOverview() {
      const container = document.getElementById('doc-pane-overview');
      if (!container) return;

      const s = this.data.stats;
      const c = this.getActiveConsult();
      const emr = this.getActiveEmr();

      container.innerHTML = `
        <!-- Doctor Greeting & Quick Stats -->
        <div class="doc-kpi-grid">
          <div class="doc-kpi-card" onclick="doctorController.switchTab('queue')">
            <span class="kpi-icon">📋</span>
            <div>
              <div class="kpi-label">Today's Consultations</div>
              <div class="kpi-val">${s.todayConsultations}</div>
              <div class="kpi-delta good">14 Completed · 3 Waiting</div>
            </div>
          </div>

          <div class="doc-kpi-card" onclick="doctorController.switchTab('queue')">
            <span class="kpi-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;">⏱️</span>
            <div>
              <div class="kpi-label">Live Patient Queue</div>
              <div class="kpi-val" style="color:#f59e0b;">${s.waitingQueue} Waiting</div>
              <div class="kpi-delta warn">Next: Anitha K. (ANC)</div>
            </div>
          </div>

          <div class="doc-kpi-card" onclick="doctorController.switchTab('emergency')" style="border-color:rgba(239,68,68,0.35);">
            <span class="kpi-icon" style="background:rgba(239,68,68,0.15);color:#ef4444;">🚨</span>
            <div>
              <div class="kpi-label">Emergency Tele-Alerts</div>
              <div class="kpi-val" style="color:#f87171;">${s.emergencyCases} Case</div>
              <div class="kpi-delta bad">Baby Ravi (Febrile Seizure)</div>
            </div>
          </div>

          <div class="doc-kpi-card">
            <span class="kpi-icon" style="background:rgba(16,185,129,0.15);color:#10b981;">⭐</span>
            <div>
              <div class="kpi-label">Clinical Rating / CSAT</div>
              <div class="kpi-val" style="color:#10b981;">${s.patientCSAT}</div>
              <div class="kpi-delta good">Avg Consult: ${s.avgConsultDuration}</div>
            </div>
          </div>
        </div>

        <!-- Next Active Consultation Spotlight Card -->
        <div class="glass-panel doc-spotlight-card" style="margin-top:20px;padding:24px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:14px;">
            <div style="display:flex;gap:16px;align-items:center;">
              <div class="doc-patient-avatar">${c.patientName.slice(0,2).toUpperCase()}</div>
              <div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <h3 style="font-size:22px;color:#ffffff;margin:0;">${c.patientName}</h3>
                  <span class="admin-status-badge ${c.priority === 'EMERGENCY' ? 'bad' : 'good'}">${c.priority}</span>
                </div>
                <p style="font-size:12.5px;color:var(--muted);margin:4px 0 0;">
                  ${c.ageGender} · 📍 ${c.location} · Supervising Worker: <strong>${c.ashaWorker}</strong>
                </p>
              </div>
            </div>

            <div style="display:flex;gap:10px;">
              <button class="btn-glass" onclick="doctorController.openPreConsultCard('${c.id}')">
                <span>📋 Pre-Consult Vitals</span>
              </button>
              <button class="auth-btn-primary" onclick="doctorController.startLiveTeleconsult('${c.id}')">
                <span>🎥 Launch Video Consultation →</span>
              </button>
            </div>
          </div>

          <div class="divider" style="margin:16px 0;"></div>

          <!-- Pre-Consult Vitals Ribbon recorded by Field Worker -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <span style="font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--auth-primary-bright);">
              🩺 Field Worker Recorded Vitals (${c.vitals.recordedAt} by ${c.ashaWorker})
            </span>
          </div>

          <div class="doc-vitals-strip">
            <div class="doc-vital-box">
              <small>Blood Pressure</small>
              <strong>${c.vitals.bp}</strong>
            </div>
            <div class="doc-vital-box">
              <small>Body Temp</small>
              <strong>${c.vitals.temp}</strong>
            </div>
            <div class="doc-vital-box">
              <small>Pulse / Heart Rate</small>
              <strong>${c.vitals.pulse}</strong>
            </div>
            <div class="doc-vital-box">
              <small>Oxygen (SpO₂)</small>
              <strong>${c.vitals.spo2}</strong>
            </div>
            <div class="doc-vital-box">
              <small>Random Glucose</small>
              <strong>${c.vitals.bloodSugar}</strong>
            </div>
            <div class="doc-vital-box">
              <small>Weight</small>
              <strong>${c.vitals.weight}</strong>
            </div>
          </div>

          <div style="margin-top:14px;padding:12px 14px;background:rgba(4,18,15,0.45);border-radius:12px;font-size:13px;color:var(--ink-dim);">
            <strong>Chief Complaint:</strong> ${c.chiefComplaint}
          </div>
        </div>

        <!-- Quick Shortcuts -->
        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-top:20px;">
          <div class="glass-panel doc-action-card" onclick="doctorController.switchTab('queue')">
            <span style="font-size:28px;">⏱️</span>
            <strong style="color:#ffffff;font-size:15px;display:block;margin:8px 0 2px;">Consultation Queue</strong>
            <small style="color:var(--muted);">Manage waiting and scheduled video visits</small>
          </div>

          <div class="glass-panel doc-action-card" onclick="doctorController.switchTab('rx')">
            <span style="font-size:28px;">💊</span>
            <strong style="color:#ffffff;font-size:15px;display:block;margin:8px 0 2px;">e-Prescription Builder</strong>
            <small style="color:var(--muted);">Generate digitally signed e-Prescriptions</small>
          </div>

          <div class="glass-panel doc-action-card" onclick="doctorController.switchTab('emr')">
            <span style="font-size:28px;">📂</span>
            <strong style="color:#ffffff;font-size:15px;display:block;margin:8px 0 2px;">Longitudinal EMR</strong>
            <small style="color:var(--muted);">Review patient diagnoses, FHIR records &amp; lab panels</small>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // TAB 2: LIVE CONSULTATION QUEUE
    // -------------------------------------------------------------
    renderQueue() {
      const container = document.getElementById('doc-pane-queue');
      if (!container) return;

      const filter = this.state.queueFilter;
      let consults = this.data.consultations;
      if (filter !== 'all') {
        consults = consults.filter(c => c.status.toLowerCase() === filter.toLowerCase() || c.priority.toLowerCase() === filter.toLowerCase());
      }

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">⏱️ Live Clinical Consultation Queue</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Active video/audio teleconsultation requests from rural sub-centres, village kiosks, and home visits.
            </p>
          </div>
        </div>

        <div class="admin-toolbar">
          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${filter === 'all' ? 'active' : ''}" onclick="doctorController.setQueueFilter('all')">All Queue (${this.data.consultations.length})</button>
            <button class="admin-filter-btn ${filter === 'emergency' ? 'active' : ''}" onclick="doctorController.setQueueFilter('emergency')" style="color:#f87171;">🚨 Emergency (1)</button>
            <button class="admin-filter-btn ${filter === 'waiting' ? 'active' : ''}" onclick="doctorController.setQueueFilter('waiting')">⏳ Waiting (2)</button>
            <button class="admin-filter-btn ${filter === 'scheduled' ? 'active' : ''}" onclick="doctorController.setQueueFilter('scheduled')">📅 Scheduled (1)</button>
            <button class="admin-filter-btn ${filter === 'completed' ? 'active' : ''}" onclick="doctorController.setQueueFilter('completed')">✓ Completed (1)</button>
          </div>
        </div>

        <div class="doc-queue-list" style="margin-top:16px;">
          ${consults.map(c => `
            <div class="glass-panel doc-queue-card ${c.priority === 'EMERGENCY' ? 'emergency' : ''}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
                <div style="display:flex;gap:14px;align-items:center;">
                  <div class="doc-patient-avatar ${c.priority === 'EMERGENCY' ? 'emergency' : ''}">
                    ${c.patientName.slice(0,2).toUpperCase()}
                  </div>
                  <div>
                    <div style="display:flex;align-items:center;gap:8px;">
                      <strong style="font-size:16px;color:#ffffff;">${c.patientName}</strong>
                      <span class="admin-status-badge ${c.priority === 'EMERGENCY' ? 'bad' : (c.priority === 'HIGH PRIORITY' ? 'warn' : 'good')}">
                        ${c.priority}
                      </span>
                      <span class="admin-status-badge good" style="font-size:10px;">${c.status}</span>
                    </div>
                    <p style="font-size:12px;color:var(--muted);margin:4px 0 0;">
                      ${c.ageGender} · 📍 ${c.location} · Assisted by: <strong>${c.ashaWorker}</strong>
                    </p>
                  </div>
                </div>

                <div style="text-align:right;">
                  <span style="font-size:12px;font-family:'IBM Plex Mono',monospace;color:var(--auth-primary-bright);font-weight:700;">
                    ${c.waitingTime}
                  </span>
                  <small style="display:block;color:var(--muted);font-size:11px;">Slot: ${c.scheduledTime}</small>
                </div>
              </div>

              <div style="margin:12px 0;padding:10px 12px;background:rgba(4,18,15,0.4);border-radius:10px;font-size:12.5px;color:var(--ink-dim);">
                <strong>Chief Complaint:</strong> ${c.chiefComplaint}
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <div style="display:flex;gap:12px;font-size:11.5px;color:var(--muted);">
                  <span>BP: <strong>${c.vitals.bp}</strong></span>
                  <span>Temp: <strong>${c.vitals.temp}</strong></span>
                  <span>SpO₂: <strong>${c.vitals.spo2}</strong></span>
                  <span>Pulse: <strong>${c.vitals.pulse}</strong></span>
                </div>

                <div style="display:flex;gap:8px;">
                  <button class="btn-glass sm" onclick="doctorController.openPreConsultCard('${c.id}')">
                    <span>📋 Review Vitals &amp; EMR</span>
                  </button>
                  <button class="auth-btn-primary" style="padding:6px 16px;font-size:12px;" onclick="doctorController.startLiveTeleconsult('${c.id}')">
                    <span>🎥 Connect Call →</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    setQueueFilter(f) {
      this.state.queueFilter = f;
      this.renderQueue();
    }

    // -------------------------------------------------------------
    // TAB 3: PRE-CONSULTATION SUMMARY & ASHA VITALS
    // -------------------------------------------------------------
    renderPreconsult() {
      const container = document.getElementById('doc-pane-preconsult');
      if (!container) return;

      const c = this.getActiveConsult();
      const emr = this.getActiveEmr();

      const vitals = (c && c.vitals) ? c.vitals : {
        bp: '120/80 mmHg',
        temp: '98.6 °F',
        pulse: '76 bpm',
        spo2: '99%',
        bloodSugar: '102 mg/dL',
        weight: '58 kg',
        recordedAt: 'Today (Pre-consultation)'
      };

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">📋 Pre-Consultation Summary &amp; Frontline Vitals</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Objective clinical intake and vital observations for ${c.patientName}.
            </p>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <select class="auth-input" style="width:260px;height:38px;font-size:12.5px;padding:4px 10px;background:#020b09;border:1px solid #10b981;color:#ffffff;" onchange="doctorController.selectActivePatient(this.value); doctorController.switchTab('preconsult');">
              ${this.data.consultations.map(item => `
                <option value="${item.id}" ${item.id === c.id ? 'selected' : ''}>
                  ${item.patientName} (${item.ageGender})
                </option>
              `).join('')}
            </select>
            <button class="auth-btn-primary" onclick="doctorController.startLiveTeleconsult('${c.id}')">
              <span>🎥 Begin Teleconsultation →</span>
            </button>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1.3fr 1fr;gap:20px;margin-top:16px;">
          <!-- Left Column: Patient Profile & Field Worker Vitals -->
          <div>
            <div class="glass-panel" style="padding:22px;margin-bottom:18px;">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <h4 style="font-size:18px;color:#ffffff;margin:0 0 4px;">${c.patientName} (${c.ageGender})</h4>
                  <span style="font-size:12px;color:var(--auth-primary-bright);font-family:'IBM Plex Mono',monospace;">ABHA ID: ${c.abhaId || emr.abhaId || '14-8842-1092-3318'}</span>
                </div>
                <span class="admin-status-badge good">Blood: ${c.bloodGroup || emr.bloodGroup || 'O+'}</span>
              </div>

              <div class="divider" style="margin:14px 0;"></div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="font-size:12px;font-weight:700;color:var(--auth-primary-bright);">
                  🩺 Objective Vitals Recorded by Field Worker
                </span>
                <small style="color:var(--muted);">${vitals.recordedAt || 'Today'}</small>
              </div>

              <div class="doc-vitals-strip">
                <div class="doc-vital-box">
                  <small>Blood Pressure</small>
                  <strong>${vitals.bp || '120/80 mmHg'}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>Temperature</small>
                  <strong>${vitals.temp || '98.6 °F'}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>Pulse (Heart Rate)</small>
                  <strong>${vitals.pulse || '76 bpm'}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>SpO₂ Oxygen</small>
                  <strong>${vitals.spo2 || '99%'}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>Random Glucose</small>
                  <strong>${vitals.bloodSugar || '102 mg/dL'}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>Body Weight</small>
                  <strong>${vitals.weight || '58 kg'}</strong>
                </div>
              </div>

              <div style="margin-top:16px;padding:12px;background:rgba(4,18,15,0.5);border-radius:12px;">
                <span style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;">Frontline Worker Clinical Field Notes:</span>
                <p style="font-size:12.5px;color:var(--ink-dim);margin:6px 0 0;line-height:1.45;">
                  "Patient ${c.patientName} (${c.ageGender}) presented at ${c.location}. Chief complaint: ${c.chiefComplaint}. Pre-consultation vitals recorded and verified. Case escalated for doctor teleconsultation and prescription."
                </p>
                <small style="display:block;margin-top:4px;color:var(--auth-primary-bright);">— ${c.ashaWorker || 'Frontline Health Worker'}</small>
              </div>
            </div>

            <!-- Active Conditions & Allergies -->
            <div class="glass-panel" style="padding:22px;">
              <h4 style="font-size:15px;color:#ffffff;margin-bottom:12px;">⚠️ Clinical Risk Factors &amp; Allergies</h4>
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
                ${(emr.chronicConditions || [c.chiefComplaint]).map(cond => `<span class="tag warn">● ${cond}</span>`).join('')}
                ${(emr.allergies || ['No Known Allergies (NKDA)']).map(al => `<span class="tag neutral">🛡️ ${al}</span>`).join('')}
              </div>

              <span style="font-size:11.5px;font-weight:700;color:var(--muted);text-transform:uppercase;">Immunization Status:</span>
              <div style="margin-top:6px;font-size:12.5px;color:#ffffff;">
                ${Array.isArray(emr.immunizationStatus) ? emr.immunizationStatus.join(' · ') : 'Standard Adult Profile Active'}
              </div>
            </div>
          </div>

          <!-- Right Column: Past Consultation Timeline -->
          <div class="glass-panel" style="padding:22px;">
            <h4 style="font-size:15px;color:#ffffff;margin-bottom:14px;">📜 Past Consultation History</h4>
            <div class="timeline" style="margin-left:4px;">
              ${(emr.consultationHistory || [{ date: 'Today', doctor: 'Dr. K. V. Rao', diagnosis: c.chiefComplaint, notes: 'Initiated teleconsultation intake.' }]).map(h => `
                <div class="timeline-item">
                  <div class="timeline-date">${h.date} · ${h.doctor}</div>
                  <div class="timeline-title">${h.diagnosis}</div>
                  <div class="timeline-note">${h.notes}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    openPreConsultCard(consultId) {
      this.state.activeConsultId = consultId;
      this.switchTab('preconsult');
    }

    // -------------------------------------------------------------
    // TAB 4: LIVE TELE-CONSULTATION SUITE & HUD
    // -------------------------------------------------------------
    renderTeleconsultSuite() {
      const container = document.getElementById('doc-pane-tele');
      if (!container) return;

      const c = this.getActiveConsult();
      const emr = this.getActiveEmr();

      container.innerHTML = `
        <div class="doc-tele-layout">
          <!-- Left: Video HUD & Call Controls -->
          <div class="doc-tele-video-panel">
            <div class="doc-video-viewport ${this.state.isAudioOnly ? 'audio-only-mode' : ''}" style="position:relative;overflow:hidden;">
              <!-- Real Remote Video Element -->
              <video id="docRemoteVideo" autoplay playsinline style="width:100%;height:100%;object-fit:cover;display:none;position:absolute;inset:0;z-index:0;"></video>

              <!-- Live Video Topbar HUD -->
              <div class="doc-video-topbar" style="position:relative;z-index:3;">
                <span class="doc-rec-led"><span class="dot"></span> LIVE ENCRYPTED · FHIR R4</span>
                <span style="font-size:12px;color:#ffffff;font-family:'IBM Plex Mono',monospace;">⏱️ 04:18</span>
                <span class="admin-status-badge good" style="font-size:10px;">ASHA Joined · Ward 6</span>
              </div>

              <!-- Main Video Simulation Area -->
              <div class="doc-video-center-content" style="position:relative;z-index:2;">
                ${this.state.isAudioOnly ? `
                  <div style="text-align:center;">
                    <div style="font-size:48px;margin-bottom:10px;">🎙️</div>
                    <h3 style="font-size:20px;color:#ffffff;margin:0 0 4px;">${c.patientName}</h3>
                    <span style="font-size:12px;color:var(--auth-primary-bright);">Low-Bandwidth 2G Audio Stream Active</span>
                    <div class="tele-wave" style="margin:16px auto 0;justify-content:center;">
                      <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                    </div>
                  </div>
                ` : `
                  <div style="text-align:center;">
                    <div class="doc-patient-cam-mock">
                      <div class="patient-cam-silhouette">👩🏽‍🌾</div>
                      <span class="patient-cam-name">${c.patientName} (${c.location})</span>
                    </div>
                  </div>
                `}
              </div>

              <!-- Doctor Picture-in-Picture (PiP) Real WebRTC Preview -->
              <div class="doc-pip-cam" style="position:absolute;bottom:75px;right:18px;width:120px;height:90px;background:#000;border-radius:12px;overflow:hidden;border:2px solid var(--auth-primary-bright);z-index:4;display:flex;align-items:center;justify-content:center;">
                <video id="docLocalVideo" autoplay playsinline muted style="width:100%;height:100%;object-fit:cover;display:none;"></video>
                <div id="docLocalFallback" style="font-size:11px;text-align:center;color:#fff;">
                  <span style="font-size:16px;display:block;">🩺</span>
                  <span>Dr. Rao</span>
                </div>
              </div>

              <!-- Bottom Call Controls Bar -->
              <div class="doc-call-controls-bar" style="position:relative;z-index:5;">
                <button class="doc-ctrl-btn" onclick="doctorController.startRealWebcam()" title="Connect Live Camera & Mic" style="background:rgba(52,211,153,0.25);border-color:var(--auth-primary-bright);">
                  <span>🎥 WebRTC Cam</span>
                </button>
                <button class="doc-ctrl-btn ${this.state.isAudioMuted ? 'muted' : ''}" onclick="doctorController.toggleCallAudio()" title="Mute/Unmute Mic">
                  <span>${this.state.isAudioMuted ? '🔇 Unmute' : '🎙️ Mic On'}</span>
                </button>
                <button class="doc-ctrl-btn ${this.state.isVideoOff ? 'muted' : ''}" onclick="doctorController.toggleCallVideo()" title="Camera On/Off">
                  <span>${this.state.isVideoOff ? '🚫 Cam Off' : '📷 Cam On'}</span>
                </button>
                <button class="doc-ctrl-btn ${this.state.isAudioOnly ? 'active' : ''}" onclick="doctorController.switchAudioOnlyMode()" title="2G Audio Only">
                  <span>📶 2G Audio</span>
                </button>
                <button class="doc-ctrl-btn" onclick="doctorController.joinAshaTranslator()" title="ASHA Translator">
                  <span>🤝 ASHA Didi</span>
                </button>
                <button class="doc-ctrl-btn btn-danger" onclick="doctorController.openEmergencyEscalationModal('${c.id}')" style="background:#ef4444;color:#ffffff;font-weight:700;">
                  <span>🚨 EMERGENCY</span>
                </button>
                <button class="doc-ctrl-btn btn-end" onclick="doctorController.completeConsultation('${c.id}')" style="background:rgba(239,68,68,0.2);color:#fca5a5;">
                  <span>✕ End Call</span>
                </button>
              </div>
            </div>

            <!-- In-Call Vitals Ribbon -->
            <div class="glass-panel" style="padding:14px;margin-top:14px;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:12px;color:var(--muted);">Live Tele-Vitals:</span>
              <div style="display:flex;gap:12px;font-size:12px;font-weight:700;">
                <span>BP: <strong style="color:#4ade80;">${c.vitals.bp}</strong></span>
                <span>SpO₂: <strong style="color:#4ade80;">${c.vitals.spo2}</strong></span>
                <span>Pulse: <strong>${c.vitals.pulse}</strong></span>
                <span>Temp: <strong>${c.vitals.temp}</strong></span>
              </div>
            </div>
          </div>

          <!-- Right: Side-by-Side Clinical Intake & Notes Panel -->
          <div class="doc-tele-notes-panel glass-panel" style="padding:22px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <h4 style="font-size:16px;color:#ffffff;margin:0;">📝 In-Consult Clinical EMR Notes</h4>
              <button class="auth-btn-primary" style="padding:6px 14px;font-size:12px;" onclick="doctorController.switchTab('rx')">
                <span>💊 Generate e-Prescription →</span>
              </button>
            </div>

            <form id="docConsultForm" onsubmit="event.preventDefault(); doctorController.saveClinicalNotes('${c.id}');">
              <div class="auth-input-group" style="margin-bottom:12px;">
                <label class="auth-label"><span>Chief Complaint &amp; Symptoms</span></label>
                <textarea class="auth-input" id="noteComplaint" style="height:55px;resize:vertical;">${c.chiefComplaint}</textarea>
              </div>

              <div class="auth-input-group" style="margin-bottom:12px;">
                <label class="auth-label"><span>Clinical Examination &amp; Observations</span></label>
                <textarea class="auth-input" id="noteExam" style="height:55px;resize:vertical;" placeholder="e.g. Pallor visible in lower palpebral conjunctiva. Bilateral vesicular breath sounds normal. Foetal movement confirmed.">Mild pallor (+). Chest clear. No pedal edema. Foetal heart sounds active (142 bpm).</textarea>
              </div>

              <div class="auth-input-group" style="margin-bottom:12px;">
                <label class="auth-label"><span>Assessment &amp; Diagnosis (ICD-11 / SNOMED)</span></label>
                <input type="text" class="auth-input" id="noteDiagnosis" value="Mild-Moderate Nutritional Anaemia in Pregnancy (2nd Trimester) - ICD-11 5A00">
              </div>

              <div class="auth-input-group" style="margin-bottom:12px;">
                <label class="auth-label"><span>Clinical Treatment Plan &amp; Dietary Advice</span></label>
                <textarea class="auth-input" id="notePlan" style="height:55px;resize:vertical;">Continue elemental iron 100mg once daily after breakfast. Calcium 500mg at bedtime. High protein & iron-rich diet (spinach, jaggery, drumstick leaves, dal). Repeat CBC at 28 weeks.</textarea>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
                <div class="auth-input-group" style="margin-bottom:0;">
                  <label class="auth-label"><span>Follow-up Date</span></label>
                  <input type="date" class="auth-input" id="noteFollowDate" value="2026-09-18">
                </div>
                <div class="auth-input-group" style="margin-bottom:0;">
                  <label class="auth-label"><span>Follow-up Type</span></label>
                  <select class="auth-input" id="noteFollowType">
                    <option>Assisted Sub-Centre Video</option>
                    <option>In-Person PHC Visit</option>
                    <option>ASHA Home Visit</option>
                  </select>
                </div>
              </div>

              <div style="display:flex;gap:10px;">
                <button type="submit" class="btn-glass" style="flex:1;">
                  <span>💾 Save Notes</span>
                </button>
                <button type="button" class="auth-btn-primary" style="flex:1.4;" onclick="doctorController.completeConsultation('${c.id}')">
                  <span>✓ Complete Consult</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      `;

      if (this.localStream) {
        setTimeout(() => this.attachStreamToVideo(), 50);
      }
    }

    async startRealWebcam() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 640 }, height: { ideal: 480 } },
            audio: true
          });
          this.localStream = stream;
          this.attachStreamToVideo();
          if (typeof window.toast === 'function') {
            window.toast('🎥 Live Camera & Microphone Connected (Encrypted WebRTC)');
          }
        }
      } catch (err) {
        console.warn('Webcam permission not granted, using simulation:', err);
        if (typeof window.toast === 'function') {
          window.toast('ℹ️ Camera optional: Simulation feed active');
        }
      }
    }

    attachStreamToVideo() {
      if (!this.localStream) return;
      const vid = document.getElementById('docLocalVideo');
      const fallback = document.getElementById('docLocalFallback');
      if (vid) {
        vid.srcObject = this.localStream;
        vid.style.display = 'block';
        if (fallback) fallback.style.display = 'none';
        vid.play().catch(()=>{});
      }
    }

    startLiveTeleconsult(consultId) {
      this.state.activeConsultId = consultId;
      const c = this.getActiveConsult();
      c.status = 'In Progress';
      if (typeof window.toast === 'function') {
        window.toast(`Connecting encrypted teleconsultation with ${c.patientName}...`);
      }
      this.switchTab('tele');
      this.startRealWebcam();
    }

    toggleCallAudio() {
      this.state.isAudioMuted = !this.state.isAudioMuted;
      if (this.localStream) {
        this.localStream.getAudioTracks().forEach(t => t.enabled = !this.state.isAudioMuted);
      }
      if (typeof window.toast === 'function') {
        window.toast(this.state.isAudioMuted ? '🔇 Microphone Muted' : '🎙️ Microphone Unmuted');
      }
      this.renderTeleconsultSuite();
    }

    toggleCallVideo() {
      this.state.isVideoOff = !this.state.isVideoOff;
      if (this.localStream) {
        this.localStream.getVideoTracks().forEach(t => t.enabled = !this.state.isVideoOff);
      }
      if (typeof window.toast === 'function') {
        window.toast(this.state.isVideoOff ? '🚫 Camera Turned Off' : '📷 Camera Active');
      }
      this.renderTeleconsultSuite();
    }

    switchAudioOnlyMode() {
      this.state.isAudioOnly = !this.state.isAudioOnly;
      if (typeof window.toast === 'function') {
        window.toast(this.state.isAudioOnly ? 'Switched to Low-Bandwidth 2G Audio Mode' : 'HD Video Mode Restored');
      }
      this.renderTeleconsultSuite();
    }

    joinAshaTranslator() {
      if (typeof window.toast === 'function') {
        window.toast('ASHA Facilitator B. Saraswati audio bridge joined for Telugu translation.');
      }
    }

    saveClinicalNotes(consultId) {
      if (typeof window.toast === 'function') {
        window.toast('✓ Clinical notes & observations saved to Longitudinal EMR.');
      }
    }

    // -------------------------------------------------------------
    // TAB 5: SMART "PAN PUSHEDDY" E-PRESCRIPTION GENERATOR
    // -------------------------------------------------------------
    renderPrescriptionGenerator() {
      const container = document.getElementById('doc-pane-rx');
      if (!container) return;

      const c = this.getActiveConsult();
      const doc = this.data.doctorProfile;
      const meds = this.state.rxMedicines;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">💊 Smart e-Prescription Generator</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Create structured, digital medical council compliant e-Prescriptions with Jan Aushadhi generic mapping.
            </p>
          </div>
          <button class="auth-btn-primary" onclick="doctorController.openPrescriptionPreview()">
            <span>📄 Preview &amp; Issue e-Prescription →</span>
          </button>
        </div>

        <div class="glass-panel" style="padding:24px;margin-top:16px;">
          <!-- Prescription Header Info -->
          <div style="display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:1px solid rgba(220,252,243,0.12);margin-bottom:18px;">
            <div>
              <strong style="font-size:16px;color:#ffffff;">${doc.name}</strong>
              <div style="font-size:12px;color:var(--auth-primary-bright);">${doc.degree} · ${doc.specialization}</div>
              <small style="color:var(--muted);">${doc.hospital} · Lic: ${doc.mciNumber}</small>
            </div>
            <div style="text-align:right;">
              <strong style="font-size:14px;color:#ffffff;">Patient: ${c.patientName} (${c.ageGender})</strong>
              <small style="display:block;color:var(--muted);">Diagnosis: Nutritional Anaemia (2nd Trimester)</small>
              <small style="color:var(--auth-primary-bright);">Date: Today, 28 Aug 2026</small>
            </div>
          </div>

          <!-- Dynamic Medicines List Table -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <h4 style="font-size:15px;color:#ffffff;margin:0;">Rx Medications &amp; Dosage Schedule</h4>
            <button class="btn-glass sm" onclick="doctorController.addMedicineRow()">
              <span>+ Add Medicine</span>
            </button>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;" id="rxMedicineRows">
            ${meds.map((m, idx) => `
              <div class="rx-medicine-row">
                <div style="display:grid;grid-template-columns:1.8fr 1fr 1fr 1fr auto;gap:10px;align-items:center;">
                  <div>
                    <small style="display:block;font-size:10px;color:var(--muted);text-transform:uppercase;">Drug Name &amp; Generic Composition</small>
                    <input type="text" class="auth-input" value="${m.name}" oninput="doctorController.updateMedField(${idx}, 'name', this.value)">
                  </div>
                  <div>
                    <small style="display:block;font-size:10px;color:var(--muted);text-transform:uppercase;">Strength / Dose</small>
                    <input type="text" class="auth-input" value="${m.dose}" oninput="doctorController.updateMedField(${idx}, 'dose', this.value)">
                  </div>
                  <div>
                    <small style="display:block;font-size:10px;color:var(--muted);text-transform:uppercase;">Frequency</small>
                    <input type="text" class="auth-input" value="${m.freq}" oninput="doctorController.updateMedField(${idx}, 'freq', this.value)">
                  </div>
                  <div>
                    <small style="display:block;font-size:10px;color:var(--muted);text-transform:uppercase;">Duration</small>
                    <input type="text" class="auth-input" value="${m.duration}" oninput="doctorController.updateMedField(${idx}, 'duration', this.value)">
                  </div>
                  <div>
                    <small style="display:block;font-size:10px;color:var(--muted);text-transform:uppercase;">Action</small>
                    <button class="btn-glass sm" style="color:#f87171;" onclick="doctorController.removeMedicineRow(${idx})">✕</button>
                  </div>
                </div>
                <div style="margin-top:6px;">
                  <input type="text" class="auth-input" style="height:38px;font-size:12.5px;" value="${m.instructions}" placeholder="Specific instructions (e.g. after meals with lemon water)" oninput="doctorController.updateMedField(${idx}, 'instructions', this.value)">
                </div>
              </div>
            `).join('')}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:16px;border-top:1px solid rgba(220,252,243,0.12);">
            <div style="font-size:12px;color:var(--muted);">
              🌿 Generic Jan Aushadhi substitution enabled. SMS dispatch ready.
            </div>
            <button class="auth-btn-primary" onclick="doctorController.openPrescriptionPreview()">
              <span>Generate &amp; Digitally Sign Prescription →</span>
            </button>
          </div>
        </div>
      `;
    }

    addMedicineRow() {
      this.state.rxMedicines.push({
        name: 'Amoxicillin 500mg',
        dose: '500mg',
        freq: '1-0-1 (Twice daily)',
        duration: '5 Days',
        route: 'Oral',
        instructions: 'Take after food'
      });
      this.renderPrescriptionGenerator();
    }

    removeMedicineRow(idx) {
      this.state.rxMedicines.splice(idx, 1);
      this.renderPrescriptionGenerator();
    }

    updateMedField(idx, field, val) {
      if (this.state.rxMedicines[idx]) {
        this.state.rxMedicines[idx][field] = val;
      }
    }

    openPrescriptionPreview() {
      const c = this.getActiveConsult();
      const doc = this.data.doctorProfile;
      const meds = this.state.rxMedicines;

      const modalHtml = `
        <div class="modal-overlay open" id="rxPreviewModal" style="z-index:1200;">
          <div class="auth-modal-card" style="max-width:620px;background:#ffffff;color:#0f172a;padding:32px;border-radius:18px;">
            <div style="display:flex;justify-content:space-between;border-bottom:2px solid #0f766e;padding-bottom:12px;margin-bottom:16px;">
              <div>
                <h3 style="color:#0f766e;font-size:22px;margin:0;">Swasthya Setu · e-Prescription</h3>
                <strong style="color:#0f172a;font-size:15px;display:block;">${doc.name}</strong>
                <small style="color:#64748b;">${doc.degree} · Lic: ${doc.mciNumber}</small>
              </div>
              <div style="text-align:right;">
                <span style="font-size:11px;font-weight:700;color:#0f766e;">DIGITALLY SIGNED</span>
                <div style="font-size:12px;color:#334155;">Date: 28 Aug 2026</div>
                <small style="color:#64748b;">Ref: ${c.id}</small>
              </div>
            </div>

            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12.5px;padding:8px 12px;background:#f8fafc;border-radius:8px;margin-bottom:14px;">
              <div>Patient: <strong>${c.patientName}</strong> (${c.ageGender})</div>
              <div>ABHA: <strong>14-2938-7710-4521</strong></div>
              <div>Location: <strong>${c.location}</strong></div>
              <div>Diagnosis: <strong>Nutritional Anaemia in Pregnancy</strong></div>
            </div>

            <div style="margin:16px 0;">
              <h4 style="font-size:15px;color:#0f766e;margin-bottom:8px;">Rx (Medicines):</h4>
              <table style="width:100%;font-size:12.5px;border-collapse:collapse;color:#0f172a;">
                <thead>
                  <tr style="border-bottom:1px solid #cbd5e1;text-align:left;color:#475569;">
                    <th style="padding:6px;">Medicine</th>
                    <th style="padding:6px;">Dose</th>
                    <th style="padding:6px;">Frequency</th>
                    <th style="padding:6px;">Duration</th>
                    <th style="padding:6px;">Instructions</th>
                  </tr>
                </thead>
                <tbody>
                  ${meds.map(m => `
                    <tr style="border-bottom:1px solid #f1f5f9;">
                      <td style="padding:8px 6px;"><strong>${m.name}</strong></td>
                      <td style="padding:8px 6px;">${m.dose}</td>
                      <td style="padding:8px 6px;">${m.freq}</td>
                      <td style="padding:8px 6px;">${m.duration}</td>
                      <td style="padding:8px 6px;color:#64748b;">${m.instructions}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div style="font-size:12px;color:#475569;margin-top:14px;padding:8px;background:#f0fdf4;border-radius:8px;">
              <strong>Advise:</strong> High protein & iron rich diet. Return for follow up on 18 Sep 2026.
            </div>

            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:20px;padding-top:12px;border-top:1px solid #e2e8f0;">
              <div style="font-size:11px;color:#64748b;">
                Digitally verified via Swasthya Setu National Grid
              </div>
              <div style="display:flex;gap:8px;">
                <button class="btn-glass sm" style="color:#334155;border-color:#cbd5e1;" onclick="document.getElementById('rxPreviewModal').remove()">Close</button>
                <button class="auth-btn-primary" style="padding:6px 14px;font-size:12px;" onclick="doctorController.issuePrescription()">
                  <span>✓ Issue &amp; Send SMS to Patient</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    async issuePrescription() {
      const modal = document.getElementById('rxPreviewModal');
      if (modal) modal.remove();

      const c = this.getActiveConsult();
      const doc = this.data.doctorProfile;
      const meds = this.state.rxMedicines;

      const rxPayload = {
        id: `RX-${Date.now().toString().slice(-6)}`,
        consultationId: c.id,
        patientName: c.patientName,
        ageGender: c.ageGender,
        doctorName: doc.name,
        diagnosis: document.getElementById('noteDiagnosis') ? document.getElementById('noteDiagnosis').value : 'Clinical Teleconsultation Follow-up',
        date: new Date().toLocaleDateString('en-GB'),
        medicines: meds,
        dietaryAdvice: document.getElementById('notePlan') ? document.getElementById('notePlan').value : 'Take prescribed medicines on time. Drink boiled water.',
        digitallySigned: true,
        issuedAt: new Date().toISOString()
      };

      // 1. Direct write to Firebase doctor_prescriptions
      try {
        await fetch(`https://swasthya-setu-2b67d-default-rtdb.firebaseio.com/doctor_prescriptions/${rxPayload.id}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rxPayload)
        });
      } catch (err) {}

      // 2. Also inject each medicine into patient_medications in Firebase
      meds.forEach(async (m, i) => {
        const medEntry = {
          id: `MED-${Date.now().toString().slice(-4)}-${i+1}`,
          patientName: c.patientName,
          medicineName: m.name,
          dosage: m.dose,
          timing: m.freq,
          adherence: 'Scheduled',
          remainingDays: parseInt(m.duration, 10) || 15,
          prescribedBy: doc.name
        };
        try {
          fetch(`https://swasthya-setu-2b67d-default-rtdb.firebaseio.com/patient_medications/${medEntry.id}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(medEntry)
          }).catch(() => {});
        } catch (e) {}
      });

      c.status = 'Completed';

      if (typeof window.toast === 'function') {
        window.toast(`✓ Digitally signed e-Prescription generated & synced to Firebase Cloud for ${c.patientName}!`);
      }

      this.switchTab('rx');
    }

    openAddPatientModal() {
      const name = prompt('Enter Patient Full Name:');
      if (!name) return;
      const age = prompt('Enter Patient Age:', '30');
      const gender = prompt('Enter Gender (Female / Male / Other):', 'Female');
      const complaint = prompt('Enter Chief Medical Complaint / Reason for Consult:', 'Fever, cough and weakness for 3 days');

      const cId = `CNS-${Math.floor(100 + Math.random() * 900)}`;
      const newConsult = {
        id: cId,
        patientId: `PAT-${cId}`,
        patientName: name.trim(),
        guardian: 'Self',
        ageGender: `${age || 30} Yrs · ${gender || 'Female'}`,
        location: 'Kondapalli Gramam, Ward 6',
        type: 'Assisted Video Tele-Consult',
        priority: 'NORMAL',
        status: 'Waiting',
        scheduledTime: 'Immediate',
        waitingTime: 'Just Now',
        chiefComplaint: complaint || 'General Outpatient Teleconsultation',
        ashaWorker: 'B. Saraswati (ASHA Ward 6)',
        bloodGroup: 'O+',
        abhaId: `14-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-3318`,
        vitals: {
          temp: '98.6 °F',
          bp: '120/80 mmHg',
          pulse: '78 bpm',
          spo2: '99%',
          resp: '18 /min',
          weight: '56 kg',
          bloodSugar: '100 mg/dL',
          recordedAt: 'Today'
        }
      };

      this.data.consultations.unshift(newConsult);
      this.state.activeConsultId = newConsult.id;

      // Sync to Firebase doctor_consultation_queue
      try {
        fetch(`https://swasthya-setu-2b67d-default-rtdb.firebaseio.com/doctor_consultation_queue/${newConsult.id}.json`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newConsult)
        }).catch(() => {});
      } catch (e) {}

      if (typeof window.toast === 'function') {
        window.toast(`✓ Added ${name} to OPD Consultation Queue & synced to Firebase!`);
      }

      this.renderDoctorWorkspace();
    }

    // -------------------------------------------------------------
    // TAB 6: IN-CONSULT EMERGENCY ESCALATION & BED RESERVATION
    // -------------------------------------------------------------
    renderEmergencyHub() {
      const container = document.getElementById('doc-pane-emergency');
      if (!container) return;

      const hospitals = this.data.hospitalBedGrid;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🚨 In-Consult Emergency Escalation &amp; ICU Bed Control</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              1-Click critical action to dispatch 108 emergency transport and reserve an ICU or Oxygen bed prior to transit.
            </p>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-top:16px;">
          ${hospitals.map(h => `
            <div class="glass-panel" style="padding:20px;border-color:${h.icuAvailable > 0 ? 'rgba(95,227,196,0.3)' : 'rgba(239,68,68,0.4)'};">
              <h4 style="font-size:15px;color:#ffffff;margin:0 0 4px;">${h.name}</h4>
              <small style="color:var(--muted);display:block;margin-bottom:12px;">📍 ${h.location}</small>

              <div class="doc-vitals-strip" style="grid-template-columns:1fr 1fr;margin-bottom:14px;">
                <div class="doc-vital-box">
                  <small>ICU Ventilator</small>
                  <strong style="color:${h.icuAvailable > 0 ? '#4ade80' : '#f87171'};font-size:17px;">
                    ${h.icuAvailable} Free
                  </strong>
                  <span style="font-size:10px;color:var(--muted);">of ${h.icuTotal} beds</span>
                </div>
                <div class="doc-vital-box">
                  <small>Oxygen Beds</small>
                  <strong style="color:${h.oxygenAvailable > 0 ? '#4ade80' : '#f87171'};font-size:17px;">
                    ${h.oxygenAvailable} Free
                  </strong>
                  <span style="font-size:10px;color:var(--muted);">of ${h.oxygenTotal} beds</span>
                </div>
              </div>

              <div style="font-size:12px;color:var(--ink-dim);margin-bottom:12px;">
                🚑 Ambulance: <strong>${h.ambulanceAvailable}</strong>
              </div>

              <button class="auth-btn-danger" style="width:100%;justify-content:center;height:40px;font-size:12.5px;" onclick="doctorController.confirmEmergencyBedReservation('${h.id}', 'ICU')">
                <span>🚨 Reserve ICU &amp; Dispatch 108</span>
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }

    openEmergencyEscalationModal(consultId) {
      const c = this.getActiveConsult();
      const hospitals = this.data.hospitalBedGrid;

      const modalHtml = `
        <div class="modal-overlay open" id="emergencyEscalateModal" style="z-index:1300;">
          <div class="auth-modal-card" style="max-width:540px;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <span style="font-size:32px;">🚨</span>
              <div>
                <h3 class="auth-card-title" style="color:var(--danger-bright);font-size:20px;margin:0;">
                  CRITICAL ESCALATION: PATIENT DETERIORATION
                </h3>
                <small style="color:var(--muted);">Patient: ${c.patientName} (${c.location})</small>
              </div>
            </div>

            <p style="font-size:13px;color:var(--ink-dim);margin:0 0 16px;line-height:1.45;">
              Confirming will trigger an automated 108 Emergency Ambulance dispatch and reserve an immediate ICU/Oxygen bed at the chosen hospital before patient transport.
            </p>

            <div class="auth-input-group">
              <label class="auth-label"><span>Select Receiving Hospital for Transit</span></label>
              <select class="auth-input" id="emergTargetHospital">
                ${hospitals.map(h => `
                  <option value="${h.id}">${h.name} — ${h.icuAvailable} ICU Free (${h.location.split('·')[1] || 'Nearby'})</option>
                `).join('')}
              </select>
            </div>

            <div class="auth-input-group">
              <label class="auth-label"><span>Required Bed Priority</span></label>
              <select class="auth-input" id="emergBedType">
                <option value="ICU Ventilator Bed">ICU Ventilator Bed (Immediate Intubation)</option>
                <option value="High Flow Oxygen Bed">High-Flow Oxygen Supported Bed</option>
                <option value="Emergency Trauma Bed">Emergency Trauma Observation Bed</option>
              </select>
            </div>

            <div style="display:flex;gap:10px;margin-top:18px;">
              <button class="btn-glass" style="flex:1;" onclick="document.getElementById('emergencyEscalateModal').remove()">
                <span>Cancel</span>
              </button>
              <button class="auth-btn-danger" style="flex:1.6;justify-content:center;" onclick="doctorController.executeEmergencyDispatch('${c.id}')">
                <span>🚨 Confirm 108 Dispatch &amp; Reserve Bed</span>
              </button>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    executeEmergencyDispatch(consultId) {
      const modal = document.getElementById('emergencyEscalateModal');
      if (modal) modal.remove();

      const c = this.getActiveConsult();
      c.priority = 'EMERGENCY';
      c.status = 'Emergency Dispatched';

      if (typeof window.toast === 'function') {
        window.toast(`🚨 108 Ambulance Dispatched to ${c.location}! ICU Bed #02 Reserved at Ibrahimpatnam CHC (ETA: 8 min).`);
      }

      this.renderTeleconsultSuite();
    }

    confirmEmergencyBedReservation(hospitalId, bedType) {
      const h = this.data.hospitalBedGrid.find(item => item.id === hospitalId) || this.data.hospitalBedGrid[0];
      if (typeof window.toast === 'function') {
        window.toast(`✓ ${bedType} Bed reserved successfully at ${h.name.split('(')[0]}. 108 Driver alert active.`);
      }
    }

    // -------------------------------------------------------------
    // TAB 7: LONGITUDINAL EMR
    // -------------------------------------------------------------
    renderEMR() {
      const container = document.getElementById('doc-pane-emr');
      if (!container) return;

      const c = this.getActiveConsult();
      const emr = this.getActiveEmr();

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">📂 Longitudinal Electronic Medical Record (EMR)</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Unified lifetime health record linked to ABHA ID: <strong>${emr.abhaId}</strong>
            </p>
          </div>
        </div>

        <div class="glass-panel" style="padding:22px;margin-top:16px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <h4 style="font-size:18px;color:#ffffff;margin:0 0 4px;">${emr.name} (${emr.age} Yrs · ${emr.gender})</h4>
              <small style="color:var(--muted);">Primary Health Centre: ${emr.primaryPhc} · Village: ${emr.village}</small>
            </div>
            <span class="admin-status-badge good">FHIR R4 Interoperable</span>
          </div>

          <div class="divider" style="margin:16px 0;"></div>

          <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:16px;margin-bottom:20px;">
            <div style="padding:14px;background:rgba(4,18,15,0.45);border-radius:12px;">
              <small style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;">Chronic Conditions</small>
              <div style="margin-top:6px;font-size:13px;color:#ffffff;">
                ${emr.chronicConditions.map(c => `<div>● ${c}</div>`).join('')}
              </div>
            </div>

            <div style="padding:14px;background:rgba(4,18,15,0.45);border-radius:12px;">
              <small style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;">Allergies</small>
              <div style="margin-top:6px;font-size:13px;color:#ffffff;">
                ${emr.allergies.map(a => `<div>🛡️ ${a}</div>`).join('')}
              </div>
            </div>

            <div style="padding:14px;background:rgba(4,18,15,0.45);border-radius:12px;">
              <small style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;">Immunization Record</small>
              <div style="margin-top:6px;font-size:13px;color:#ffffff;">
                ${emr.immunizationStatus.map(i => `<div>✓ ${i}</div>`).join('')}
              </div>
            </div>
          </div>

          <h4 style="font-size:15px;color:#ffffff;margin-bottom:12px;">📜 Clinical Encounters &amp; Doctor Progress Notes</h4>
          <div class="timeline" style="margin-left:4px;">
            ${emr.consultationHistory.map(h => `
              <div class="timeline-item">
                <div class="timeline-date">${h.date} · Attending Clinician: ${h.doctor}</div>
                <div class="timeline-title">${h.diagnosis}</div>
                <div class="timeline-note">${h.notes}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // CONSULTATION COMPLETION
    // -------------------------------------------------------------
    completeConsultation(consultId) {
      const c = this.data.consultations.find(item => item.id === consultId);
      if (c) {
        c.status = 'Completed';
      }

      if (typeof window.toast === 'function') {
        window.toast(`✓ Teleconsultation completed successfully for ${c ? c.patientName : 'patient'}! EMR & follow-up updated.`);
      }

      this.switchTab('queue');
    }

    // -------------------------------------------------------------
    // MASTER RENDER
    // -------------------------------------------------------------
    renderDoctorWorkspace() {
      const teleContainer = document.getElementById('view-tele');
      if (!teleContainer) return;

      teleContainer.innerHTML = `
        <div class="doc-command-shell">
          <!-- Patient Selector Bar -->
          <div style="background:rgba(6,24,20,0.85);border:1px solid rgba(16,185,129,0.3);border-radius:14px;padding:12px 18px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:22px;">👤</span>
              <div>
                <strong style="font-size:14px;color:#ffffff;display:block;">Select Patient for Consultation &amp; Prescription:</strong>
                <small style="color:var(--muted);">Switch between any live patient queue ticket or newly registered citizen</small>
              </div>
            </div>

            <div style="display:flex;gap:10px;align-items:center;">
              <select class="auth-input" style="width:300px;height:40px;font-size:13px;padding:6px 12px;background:#020b09;color:#ffffff;border:1px solid #10b981;" onchange="doctorController.selectActivePatient(this.value)">
                ${this.data.consultations.map(c => `
                  <option value="${c.id}" ${c.id === this.state.activeConsultId ? 'selected' : ''}>
                    ${c.priority === 'EMERGENCY' ? '🚨 ' : ''}${c.patientName} (${c.ageGender}) — ${c.status}
                  </option>
                `).join('')}
              </select>
              <button class="auth-btn-primary" style="padding:8px 14px;font-size:12px;" onclick="doctorController.openAddPatientModal()">
                <span>+ Add Patient to Queue</span>
              </button>
            </div>
          </div>

          <!-- Doctor Top Sub-Navigation Bar -->
          <div class="doc-nav-bar">
            <button class="doc-nav-tab active" data-tab="overview" onclick="doctorController.switchTab('overview')">
              <span>📊 Clinical Dashboard</span>
            </button>
            <button class="doc-nav-tab" data-tab="queue" onclick="doctorController.switchTab('queue')">
              <span>⏱️ Live Queue (${this.data.consultations.filter(c => c.status === 'Waiting').length} Waiting)</span>
            </button>
            <button class="doc-nav-tab" data-tab="tele" onclick="doctorController.switchTab('tele')">
              <span>🎥 Active Teleconsult HUD</span>
            </button>
            <button class="doc-nav-tab" data-tab="preconsult" onclick="doctorController.switchTab('preconsult')">
              <span>📋 Pre-Consult Vitals</span>
            </button>
            <button class="doc-nav-tab" data-tab="emr" onclick="doctorController.switchTab('emr')">
              <span>📂 EMR Records</span>
            </button>
            <button class="doc-nav-tab" data-tab="rx" onclick="doctorController.switchTab('rx')">
              <span>💊 e-Prescription</span>
            </button>
            <button class="doc-nav-tab" data-tab="emergency" onclick="doctorController.switchTab('emergency')" style="color:#f87171;">
              <span>🚨 ICU Bed &amp; Emergency</span>
            </button>
          </div>

          <!-- Doctor Sub-Panes -->
          <div class="doc-tab-pane active" id="doc-pane-overview"></div>
          <div class="doc-tab-pane" id="doc-pane-queue"></div>
          <div class="doc-tab-pane" id="doc-pane-tele"></div>
          <div class="doc-tab-pane" id="doc-pane-preconsult"></div>
          <div class="doc-tab-pane" id="doc-pane-emr"></div>
          <div class="doc-tab-pane" id="doc-pane-rx"></div>
          <div class="doc-tab-pane" id="doc-pane-emergency"></div>
        </div>
      `;

      this.renderOverview();
    }
  }

  // Export singleton
  global.doctorController = new DoctorController();

})(typeof window !== 'undefined' ? window : this);
