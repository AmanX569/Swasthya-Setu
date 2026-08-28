/**
 * Swasthya Setu - Field Worker (ASHA / Frontline Staff) Portal Controller
 * 
 * Provides:
 * 1. Frontline ASHA Dashboard KPIs (Registered Patients, Today Visits, High-Risk ANC, Immunizations, Offline Sync)
 * 2. High-Risk Pregnancy (ANC) Monitoring Matrix
 * 3. Child Immunization Registry & Due Scheduler
 * 4. Daily Home Visit Schedule & Geographic Route Planner
 * 5. Frontline Vital Capture & Doctor Teleconsult Escalation
 * 6. Offline-First Sync Queue Simulator
 */

(function(global) {
  'use strict';

  const workerState = {
    currentTab: 'overview', // 'overview', 'anc', 'immunization', 'visits', 'vitals', 'sync'
    offlineCount: 12,
    isSyncing: false
  };

  const workerData = {
    workerProfile: {
      id: 'USR-WRK-101',
      name: 'B. Saraswati (ASHA Didi)',
      role: 'Accredited Social Health Activist (ASHA)',
      badgeNumber: 'ASHA-AP-KOND-042',
      assignedWard: 'Ward 6 & Sub-Centre Area',
      village: 'Kondapalli Gramam',
      supervisingPhc: 'Kondapalli PHC (Dr. K. V. Rao)',
      phone: '3333333333',
      avatar: 'BS'
    },

    stats: {
      totalRegisteredPatients: 385,
      todayHomeVisits: 8,
      pendingFollowups: 4,
      highRiskPregnancies: 6,
      childrenDueImmunization: 9,
      doctorReviewRequired: 3,
      medicinesDistributed: 48,
      offlineRecordsWaiting: 12
    },

    // High-Risk Pregnancy (ANC) Register
    ancRegistry: [
      {
        id: 'ANC-01',
        patientName: 'Anitha K.',
        age: 29,
        gestationalWeeks: '24 Weeks (2nd Trimester)',
        fundalHeight: '24 cm',
        bp: '118/76 mmHg',
        hb: '9.2 g/dL',
        riskLevel: 'Moderate Anaemia',
        riskBadge: 'warn',
        ifaAdherence: 'Regular (1 Tab OD)',
        ttVaccine: 'TT-1 & TT-2 Complete',
        nextVisitDate: '30 Aug 2026',
        supervisingDoctor: 'Dr. K. V. Rao'
      },
      {
        id: 'ANC-02',
        patientName: 'Lakshmi Devi M.',
        age: 22,
        gestationalWeeks: '34 Weeks (3rd Trimester)',
        fundalHeight: '34 cm',
        bp: '148/94 mmHg',
        hb: '8.4 g/dL',
        riskLevel: 'High Risk (PIH + Severe Anaemia)',
        riskBadge: 'bad',
        ifaAdherence: 'Irregular',
        ttVaccine: 'TT Complete',
        nextVisitDate: 'Tomorrow (Urgent)',
        supervisingDoctor: 'Dr. Priya Patel'
      },
      {
        id: 'ANC-03',
        patientName: 'Sunita Bai',
        age: 26,
        gestationalWeeks: '16 Weeks (2nd Trimester)',
        fundalHeight: '16 cm',
        bp: '110/72 mmHg',
        hb: '11.4 g/dL',
        riskLevel: 'Normal ANC',
        riskBadge: 'good',
        ifaAdherence: 'Regular',
        ttVaccine: 'TT-1 Done',
        nextVisitDate: '05 Sep 2026',
        supervisingDoctor: 'Dr. Ramesh Chandra'
      }
    ],

    // Child Immunization Registry
    immunizationRegistry: [
      {
        id: 'IMM-01',
        childName: 'Baby Ravi Teja',
        parentName: 'Anitha K.',
        age: '8 Months',
        dueVaccine: 'Measles-Rubella (MR-1) & Vit-A',
        dueDate: 'Due This Week (29 Aug)',
        status: 'Due Soon',
        badge: 'warn'
      },
      {
        id: 'IMM-02',
        childName: 'Baby Aarav',
        parentName: 'Pooja Sharma',
        age: '10 Weeks',
        dueVaccine: 'Pentavalent-2, OPV-2, Rotavirus-2',
        dueDate: 'Overdue by 4 Days',
        status: 'Overdue',
        badge: 'bad'
      },
      {
        id: 'IMM-03',
        childName: 'Baby Priya',
        parentName: 'Rani Kumari',
        age: '14 Weeks',
        dueVaccine: 'Pentavalent-3, fIPV-2, PCV-2',
        dueDate: '02 Sep 2026',
        status: 'Scheduled',
        badge: 'good'
      }
    ],

    // Today's Daily Home Visit Plan
    homeVisits: [
      { id: 'HV-01', houseNo: 'Door #12/4', patient: 'Anitha K.', purpose: 'ANC 2nd Trimester Hb & Nutrition Check', status: 'Completed', vitalsDone: true },
      { id: 'HV-02', houseNo: 'Door #14/2', patient: 'Baby Ravi Teja', purpose: 'MR-1 Vaccination Follow-up & Weight', status: 'Completed', vitalsDone: true },
      { id: 'HV-03', houseNo: 'Door #18/1', patient: 'Saraswati Devi', purpose: 'NCD Hypertension BP Check & Metformin Refill', status: 'In Progress', vitalsDone: false },
      { id: 'HV-04', houseNo: 'Door #22/5', patient: 'Lakshmi Devi M.', purpose: 'High-Risk BP & Swelling Inspection', status: 'Pending', vitalsDone: false },
      { id: 'HV-05', houseNo: 'Door #28/3', patient: 'Ramesh N.', purpose: 'Post-op dressing wound check', status: 'Pending', vitalsDone: false }
    ]
  };

  // -------------------------------------------------------------
  // CONTROLLER CLASS
  // -------------------------------------------------------------
  class WorkerController {
    constructor() {
      this.data = workerData;
      this.state = workerState;
    }

    init() {
      this.renderOverview();
      this.syncLiveWorkerDatabase();
    }

    syncLiveWorkerDatabase() {
      const dbUrl = 'https://swasthya-setu-2b67d-default-rtdb.firebaseio.com';
      fetch(`${dbUrl}/.json`)
        .then(r => r.json())
        .then(data => {
          if (data && typeof data === 'object') {
            if (data.worker_anc_registry) {
              const anc = Array.isArray(data.worker_anc_registry) ? data.worker_anc_registry : Object.values(data.worker_anc_registry);
              if (anc.length) this.data.ancRegistry = anc;
            }
            if (data.worker_immunization_registry) {
              const imm = Array.isArray(data.worker_immunization_registry) ? data.worker_immunization_registry : Object.values(data.worker_immunization_registry);
              if (imm.length) this.data.immunizationRegistry = imm;
            }
            if (data.worker_home_visits) {
              const vis = Array.isArray(data.worker_home_visits) ? data.worker_home_visits : Object.values(data.worker_home_visits);
              if (vis.length) this.data.homeVisits = vis;
            }
            if (data.worker_stats) {
              this.data.stats = { ...this.data.stats, ...data.worker_stats };
              if (this.state.currentTab === 'overview') this.renderOverview();
            }
          }
        })
        .catch(() => {});

      if (window.firebaseConfigManager && window.firebaseConfigManager.rtdb) {
        window.firebaseConfigManager.rtdb.ref('worker_anc_registry').on('value', snap => {
          const val = snap.val();
          if (val) {
            this.data.ancRegistry = Array.isArray(val) ? val : Object.values(val);
            if (this.state.currentTab === 'anc') this.renderAncRegistry();
          }
        });
      }
    }

    // -------------------------------------------------------------
    // TAB 1: WORKER DASHBOARD OVERVIEW
    // -------------------------------------------------------------
    renderOverview() {
      const container = document.getElementById('worker-pane-overview');
      if (!container) return;

      const s = this.data.stats;
      const w = this.data.workerProfile;

      container.innerHTML = `
        <!-- ASHA Profile Header Banner -->
        <div class="glass-panel" style="padding:22px;margin-bottom:20px;background:linear-gradient(135deg, rgba(245,158,11,0.15), rgba(6,24,20,0.85));border-color:rgba(245,158,11,0.35);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="worker-avatar">${w.avatar}</div>
              <div>
                <h3 style="font-size:20px;color:#ffffff;margin:0 0 2px;">${w.name}</h3>
                <div style="font-size:12.5px;color:#fde68a;">${w.role} · ${w.assignedWard}</div>
                <small style="color:var(--muted);">${w.village} · Supervising: ${w.supervisingPhc}</small>
              </div>
            </div>
            <div style="display:flex;gap:10px;">
              <button class="btn-glass sm" onclick="workerController.switchTab('sync')">
                <span>📶 Offline Records (${this.state.offlineCount})</span>
              </button>
              <button class="auth-btn-primary" style="padding:8px 18px;font-size:12px;" onclick="workerController.switchTab('vitals')">
                <span>+ Record Patient Vitals →</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 8 Core Frontline KPIs Grid -->
        <div class="worker-kpi-grid">
          <div class="doc-kpi-card" onclick="workerController.switchTab('visits')">
            <span class="kpi-icon" style="background:rgba(16,185,129,0.15);color:#10b981;">👥</span>
            <div>
              <div class="kpi-label">Registered Patients</div>
              <div class="kpi-val">${s.totalRegisteredPatients}</div>
              <div class="kpi-delta good">Ward 6 Coverage: 98%</div>
            </div>
          </div>

          <div class="doc-kpi-card" onclick="workerController.switchTab('visits')">
            <span class="kpi-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;">🏠</span>
            <div>
              <div class="kpi-label">Today's Home Visits</div>
              <div class="kpi-val" style="color:#fde68a;">${s.todayHomeVisits} Visits</div>
              <div class="kpi-delta good">2 Done · 3 Pending</div>
            </div>
          </div>

          <div class="doc-kpi-card" onclick="workerController.switchTab('anc')" style="border-color:rgba(239,68,68,0.35);">
            <span class="kpi-icon" style="background:rgba(239,68,68,0.15);color:#ef4444;">🤰</span>
            <div>
              <div class="kpi-label">High-Risk Pregnancies</div>
              <div class="kpi-val" style="color:#f87171;">${s.highRiskPregnancies} Cases</div>
              <div class="kpi-delta bad">1 Urgent BP Alert</div>
            </div>
          </div>

          <div class="doc-kpi-card" onclick="workerController.switchTab('immunization')">
            <span class="kpi-icon" style="background:rgba(6,182,212,0.15);color:#06b6d4;">👶</span>
            <div>
              <div class="kpi-label">Due Immunizations</div>
              <div class="kpi-val" style="color:#67e8f9;">${s.childrenDueImmunization} Due</div>
              <div class="kpi-delta warn">1 Overdue MR-1</div>
            </div>
          </div>
        </div>

        <!-- Today's Priority Action Queue -->
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:18px;margin-top:20px;">
          <div class="glass-panel" style="padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <h4 style="font-size:16px;color:#ffffff;margin:0;">🏠 Today's Household Visit Schedule</h4>
              <button class="btn-glass sm" onclick="workerController.switchTab('visits')">View Route Map</button>
            </div>

            <div style="display:flex;flex-direction:column;gap:10px;">
              ${this.data.homeVisits.slice(0, 3).map(v => `
                <div class="glass-panel" style="padding:12px 14px;display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <strong style="font-size:13.5px;color:#ffffff;">${v.houseNo} · ${v.patient}</strong>
                    <small style="display:block;color:var(--muted);">${v.purpose}</small>
                  </div>
                  <span class="admin-status-badge ${v.status === 'Completed' ? 'good' : (v.status === 'In Progress' ? 'warn' : 'neutral')}">
                    ${v.status}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Doctor Teleconsult Assistance -->
          <div class="glass-panel" style="padding:20px;">
            <h4 style="font-size:16px;color:#ffffff;margin-bottom:8px;">🩺 Teleconsultation Facilitator</h4>
            <p style="font-size:12.5px;color:var(--ink-dim);margin:0 0 14px;line-height:1.45;">
              You are assigned as the local Telugu/Hindi language interpreter for Dr. K. V. Rao's tele-OPD queue.
            </p>
            <div style="padding:12px;background:rgba(4,18,15,0.5);border-radius:12px;margin-bottom:14px;">
              <strong style="color:var(--auth-primary-bright);font-size:12px;display:block;">Next Video Consultation:</strong>
              <div style="font-size:13px;color:#ffffff;margin-top:2px;">Anitha K. (ANC Review)</div>
              <small style="color:var(--muted);">Kondapalli Kiosk · Today 10:30 AM</small>
            </div>
            <button class="auth-btn-primary" style="width:100%;justify-content:center;" onclick="if(typeof switchView==='function') switchView('tele')">
              <span>🎥 Join Doctor Tele-Desk Bridge →</span>
            </button>
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // TAB 2: HIGH-RISK PREGNANCY (ANC) TRACKER
    // -------------------------------------------------------------
    renderANC() {
      const container = document.getElementById('worker-pane-anc');
      if (!container) return;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🤰 High-Risk Antenatal Care (ANC) Matrix</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Tracking pregnant mothers across Ward 6 for early detection of anaemia, hypertension, and high-risk delivery factors.
            </p>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
          ${this.data.ancRegistry.map(m => `
            <div class="glass-panel card-3d" style="padding:20px;border-left:4px solid ${m.riskBadge === 'bad' ? '#ef4444' : (m.riskBadge === 'warn' ? '#f59e0b' : '#10b981')};">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <strong style="font-size:16px;color:#ffffff;">${m.patientName} (${m.age} Yrs)</strong>
                    <span class="admin-status-badge ${m.riskBadge}">${m.riskLevel}</span>
                  </div>
                  <small style="color:var(--muted);">${m.gestationalWeeks} · Fundal: ${m.fundalHeight}</small>
                </div>
                <div style="text-align:right;">
                  <span style="font-size:12px;color:var(--auth-primary-bright);font-weight:700;">Next Visit: ${m.nextVisitDate}</span>
                  <small style="display:block;color:var(--muted);">Doctor: ${m.supervisingDoctor}</small>
                </div>
              </div>

              <div class="doc-vitals-strip" style="grid-template-columns:repeat(4, 1fr);margin:14px 0 10px;">
                <div class="doc-vital-box">
                  <small>Blood Pressure</small>
                  <strong>${m.bp}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>Hemoglobin (Hb)</small>
                  <strong style="color:${parseFloat(m.hb) < 10 ? '#f87171' : '#4ade80'};">${m.hb}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>IFA Tablet Adherence</small>
                  <strong>${m.ifaAdherence}</strong>
                </div>
                <div class="doc-vital-box">
                  <small>Tetanus Toxoid</small>
                  <strong>${m.ttVaccine}</strong>
                </div>
              </div>

              <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:10px;">
                <button class="btn-glass sm" onclick="workerController.switchTab('vitals')">✏️ Record New Vitals</button>
                <button class="auth-btn-primary" style="padding:6px 14px;font-size:12px;" onclick="if(typeof toast==='function') toast('Escalated ${m.patientName} to Dr. K. V. Rao tele-consultation queue.')">
                  <span>🚨 Escalate to Tele-Desk</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // -------------------------------------------------------------
    // TAB 3: CHILD IMMUNIZATION REGISTRY
    // -------------------------------------------------------------
    renderImmunization() {
      const container = document.getElementById('worker-pane-immunization');
      if (!container) return;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">👶 Child Immunization Registry &amp; Due Scheduler</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Universal Immunization Programme (UIP) tracking for infants and toddlers in Ward 6.
            </p>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
          ${this.data.immunizationRegistry.map(c => `
            <div class="glass-panel" style="padding:18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
              <div style="display:flex;gap:14px;align-items:center;">
                <div class="worker-avatar" style="background:rgba(6,182,212,0.2);color:#67e8f9;">👶</div>
                <div>
                  <strong style="font-size:15px;color:#ffffff;">${c.childName} (${c.age})</strong>
                  <div style="font-size:12px;color:var(--muted);">Mother/Guardian: ${c.parentName}</div>
                  <small style="color:var(--auth-primary-bright);font-weight:700;">Due Vaccine: ${c.dueVaccine}</small>
                </div>
              </div>

              <div style="display:flex;align-items:center;gap:12px;">
                <span class="admin-status-badge ${c.badge}">${c.status} (${c.dueDate})</span>
                <button class="auth-btn-primary" style="padding:6px 14px;font-size:12px;" onclick="if(typeof toast==='function') toast('✓ Marked ${c.dueVaccine} as administered for ${c.childName}. UIP record updated.')">
                  <span>✓ Mark Administered</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // -------------------------------------------------------------
    // TAB 4: DAILY HOME VISIT PLANNER
    // -------------------------------------------------------------
    renderHomeVisits() {
      const container = document.getElementById('worker-pane-visits');
      if (!container) return;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🗺️ Daily Home Visit Schedule &amp; Street Route</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Sequential geographic visit plan across Kondapalli Ward 6 households.
            </p>
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:12px;margin-top:16px;">
          ${this.data.homeVisits.map(v => `
            <div class="glass-panel" style="padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
              <div>
                <div style="display:flex;align-items:center;gap:8px;">
                  <strong style="font-size:15px;color:#ffffff;">${v.houseNo} · ${v.patient}</strong>
                  <span class="admin-status-badge ${v.status === 'Completed' ? 'good' : (v.status === 'In Progress' ? 'warn' : 'neutral')}">
                    ${v.status}
                  </span>
                </div>
                <small style="color:var(--muted);">${v.purpose}</small>
              </div>

              <div style="display:flex;gap:8px;">
                <button class="btn-glass sm" onclick="workerController.switchTab('vitals')">🩺 Capture Vitals</button>
                <button class="auth-btn-primary" style="padding:6px 12px;font-size:12px;" onclick="v.status='Completed'; workerController.renderHomeVisits(); if(typeof toast==='function') toast('✓ Home visit marked as completed.')">
                  <span>✓ Complete Visit</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // -------------------------------------------------------------
    // TAB 5: FRONTLINE VITAL CAPTURE
    // -------------------------------------------------------------
    renderVitalsEntry() {
      const container = document.getElementById('worker-pane-vitals');
      if (!container) return;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🩺 Frontline Vital Entry &amp; Doctor Desk Sync</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Record objective physiological parameters using your portable sub-centre tele-kit and push directly to Dr. Rao's Clinical Desk.
            </p>
          </div>
        </div>

        <div class="glass-panel" style="padding:24px;margin-top:16px;max-width:720px;">
          <form onsubmit="event.preventDefault(); workerController.submitVitals();">
            <div class="auth-input-group">
              <label class="auth-label"><span>Select Patient</span></label>
              <select class="auth-input" id="vitalPatient">
                <option value="PAT-301">Anitha K. (29F · Ward 6 · Kondapalli)</option>
                <option value="PAT-901">Baby Ravi Teja (8Mo · Ward 6)</option>
                <option value="PAT-302">Suresh B. (54M · Hypertension)</option>
                <option value="PAT-305">Saraswati Devi (58F · Diabetes)</option>
              </select>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:14px;">
              <div class="auth-input-group" style="margin:0;">
                <label class="auth-label"><span>Blood Pressure (mmHg)</span></label>
                <input type="text" class="auth-input" id="vitalBp" value="118/76">
              </div>
              <div class="auth-input-group" style="margin:0;">
                <label class="auth-label"><span>Pulse Rate (bpm)</span></label>
                <input type="number" class="auth-input" id="vitalPulse" value="78">
              </div>
              <div class="auth-input-group" style="margin:0;">
                <label class="auth-label"><span>Body Temp (°F)</span></label>
                <input type="text" class="auth-input" id="vitalTemp" value="98.6">
              </div>
            </div>

            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:12px;margin-bottom:14px;">
              <div class="auth-input-group" style="margin:0;">
                <label class="auth-label"><span>SpO₂ Oxygen (%)</span></label>
                <input type="number" class="auth-input" id="vitalSpo2" value="99">
              </div>
              <div class="auth-input-group" style="margin:0;">
                <label class="auth-label"><span>Random Glucose (mg/dL)</span></label>
                <input type="number" class="auth-input" id="vitalGlucose" value="104">
              </div>
              <div class="auth-input-group" style="margin:0;">
                <label class="auth-label"><span>Weight (kg)</span></label>
                <input type="text" class="auth-input" id="vitalWeight" value="58.4">
              </div>
            </div>

            <div class="auth-input-group">
              <label class="auth-label"><span>Frontline Clinical Field Notes</span></label>
              <textarea class="auth-input" id="vitalNotes" style="height:60px;resize:vertical;">Patient reports mild dizziness in the morning. Taking IFA tablets regularly. Foetal movement confirmed active.</textarea>
            </div>

            <div style="display:flex;gap:10px;margin-top:18px;">
              <button type="submit" class="auth-btn-primary" style="flex:1.4;justify-content:center;">
                <span>💾 Save &amp; Push to Doctor Tele-Desk →</span>
              </button>
            </div>
          </form>
        </div>
      `;
    }

    submitVitals() {
      if (typeof window.toast === 'function') {
        window.toast('✓ Vitals saved & transmitted directly to Dr. Rao\'s Doctor Clinical Desk (Pre-Consult Vitals updated).');
      }
      this.switchTab('overview');
    }

    // -------------------------------------------------------------
    // TAB 6: OFFLINE-FIRST SYNC QUEUE
    // -------------------------------------------------------------
    renderSyncQueue() {
      const container = document.getElementById('worker-pane-sync');
      if (!container) return;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">📶 Offline-First Local Sync Queue</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Encrypted offline records stored locally on your device during low-connectivity home visits.
            </p>
          </div>
          <button class="auth-btn-primary" onclick="workerController.syncAllRecords()">
            <span>${this.state.isSyncing ? '⏳ Syncing...' : '🔄 Sync All Records Now'}</span>
          </button>
        </div>

        <div class="glass-panel" style="padding:22px;margin-top:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <div>
              <strong style="font-size:15px;color:#ffffff;">Pending Offline Sync: ${this.state.offlineCount} Records</strong>
              <small style="display:block;color:var(--muted);">All records encrypted with AES-256 in device storage</small>
            </div>
            <span class="admin-status-badge ${this.state.offlineCount > 0 ? 'warn' : 'good'}">
              ${this.state.offlineCount > 0 ? 'Pending Network Sync' : 'All Records Synced'}
            </span>
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;">
            <div class="glass-panel" style="padding:10px 14px;font-size:12.5px;display:flex;justify-content:space-between;">
              <span>ANC Visit Form · Anitha K. (Hb 9.2)</span>
              <small style="color:#fde68a;">Buffered 2h ago</small>
            </div>
            <div class="glass-panel" style="padding:10px 14px;font-size:12.5px;display:flex;justify-content:space-between;">
              <span>Child Immunization · Baby Ravi (Weight 7.8kg)</span>
              <small style="color:#fde68a;">Buffered 1h ago</small>
            </div>
            <div class="glass-panel" style="padding:10px 14px;font-size:12.5px;display:flex;justify-content:space-between;">
              <span>NCD Screening Survey · Saraswati Devi (BP 142/90)</span>
              <small style="color:#fde68a;">Buffered 35m ago</small>
            </div>
          </div>
        </div>
      `;
    }

    syncAllRecords() {
      this.state.isSyncing = true;
      this.renderSyncQueue();

      setTimeout(() => {
        this.state.isSyncing = false;
        this.state.offlineCount = 0;
        this.data.stats.offlineRecordsWaiting = 0;
        if (typeof window.toast === 'function') {
          window.toast('✓ All 12 offline records successfully synchronized to the Bharat Health Grid cloud.');
        }
        this.renderSyncQueue();
      }, 900);
    }

    // -------------------------------------------------------------
    // MASTER WORKER RENDER
    // -------------------------------------------------------------
    renderWorkerWorkspace() {
      const container = document.getElementById('view-worker');
      if (!container) return;

      container.innerHTML = `
        <div class="worker-command-shell">
          <!-- Worker Sub-Navigation Bar -->
          <div class="worker-nav-bar">
            <button class="worker-nav-tab active" data-tab="overview" onclick="workerController.switchTab('overview')">
              <span>📊 ASHA Overview</span>
            </button>
            <button class="worker-nav-tab" data-tab="anc" onclick="workerController.switchTab('anc')">
              <span>🤰 High-Risk ANC (6)</span>
            </button>
            <button class="worker-nav-tab" data-tab="immunization" onclick="workerController.switchTab('immunization')">
              <span>👶 Child Immunization (9)</span>
            </button>
            <button class="worker-nav-tab" data-tab="visits" onclick="workerController.switchTab('visits')">
              <span>🏠 Daily Home Visits</span>
            </button>
            <button class="worker-nav-tab" data-tab="vitals" onclick="workerController.switchTab('vitals')">
              <span>🩺 Capture Vitals</span>
            </button>
            <button class="worker-nav-tab" data-tab="sync" onclick="workerController.switchTab('sync')">
              <span>📶 Offline Sync (${this.state.offlineCount})</span>
            </button>
          </div>

          <!-- Worker Panes -->
          <div class="worker-tab-pane active" id="worker-pane-overview"></div>
          <div class="worker-tab-pane" id="worker-pane-anc"></div>
          <div class="worker-tab-pane" id="worker-pane-immunization"></div>
          <div class="worker-tab-pane" id="worker-pane-visits"></div>
          <div class="worker-tab-pane" id="worker-pane-vitals"></div>
          <div class="worker-tab-pane" id="worker-pane-sync"></div>
        </div>
      `;

      this.renderOverview();
    }
  }

  // Export singleton
  global.workerController = new WorkerController();

})(typeof window !== 'undefined' ? window : this);
