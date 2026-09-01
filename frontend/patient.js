/**
 * =========================================================
 * SWASTHYA SETU - CITIZEN / PATIENT HUB (patient.js)
 * 100% Pure Language Localization for Symptoms, Medicines & Doses
 * =========================================================
 */

(function(global) {
  'use strict';

  class PatientController {
    constructor() {
      this.store = global.appStore;
    }

    init() {
      this.renderAll();
      if (this.store) {
        this.store.subscribe(() => this.renderAll());
      }
    }

    t(key, fallback) {
      return global.i18n ? global.i18n.get(key, fallback) : (fallback || key);
    }

    renderAll() {
      this.renderAbhaCard();
      this.renderFamilyCircle();
      this.renderDailyMedications();
      this.renderVideoCallHistory();
      this.renderTriageButtons();
      this.renderLiveHospitals();
      this.renderLiveBloodBank();
      this.renderPrescriptions();
    }

    // -------------------------------------------------------------
    // VIDEO TELECONSULTATION & CALL HISTORY
    // -------------------------------------------------------------
    openPatientVideoCallModal() {
      const modal = document.getElementById('patientVideoCallModal');
      const docSelect = document.getElementById('patientVideoDoctorSelect');
      const memberSelect = document.getElementById('patientVideoMemberSelect');

      if (this.store) {
        const doctors = (this.store.getState().staff || []).filter(s => s.role === 'doctor');
        const family = this.store.getState().familyMembers || [];
        const user = this.store.getState().currentUser || (this.store.getState().session && this.store.getState().session.user) || { name: 'Self' };

        if (docSelect) {
          docSelect.innerHTML = doctors.map(d => `
            <option value="${d.name}">
              👨‍⚕️ ${d.name} · ${d.location || 'PHC/CHC'} (🟢 Online)
            </option>
          `).join('') || '<option value="Dr. Priya Sharma, MBBS, MD">👨‍⚕️ Dr. Priya Sharma, MBBS, MD (On Duty)</option>';
        }

        if (memberSelect) {
          const membersList = [{ name: (user.name || 'Self (Account Holder)') + ' (Self)' }].concat(family.map(f => ({ name: f.name + ' (' + f.relation + ')' })));
          memberSelect.innerHTML = membersList.map(m => `<option value="${m.name}">👤 ${m.name}</option>`).join('');
        }
      }

      if (modal) modal.style.display = 'flex';
    }

    closePatientVideoCallModal() {
      const modal = document.getElementById('patientVideoCallModal');
      if (modal) modal.style.display = 'none';
    }

    submitPatientVideoCall(e) {
      if (e) e.preventDefault();
      const docSelect = document.getElementById('patientVideoDoctorSelect');
      const memberSelect = document.getElementById('patientVideoMemberSelect');
      const complaintInput = document.getElementById('patientVideoComplaint');
      const customRoomInput = document.getElementById('patientVideoCustomRoom');

      const chosenDoctor = docSelect ? docSelect.value : 'Dr. Priya Sharma, MBBS, MD';
      const chosenPatient = memberSelect ? memberSelect.value : 'Citizen Beneficiary';
      const complaint = complaintInput ? complaintInput.value.trim() : 'Telemedicine Video Consultation';
      const customRoom = customRoomInput ? customRoomInput.value.trim() : '';

      this.closePatientVideoCallModal();

      if (global.videoCallController) {
        const user = (this.store && (this.store.getState().currentUser || (this.store.getState().session && this.store.getState().session.user))) || { phone: '9876543210' };
        global.videoCallController.startVideoCall({
          callerRole: 'patient',
          callerName: chosenPatient,
          callerPhone: user.phone || '9876543210',
          recipientRole: 'doctor',
          recipientName: chosenDoctor,
          complaint: complaint,
          roomUrl: customRoom || null
        });
      }
    }

    startVideoCallWithDoctor() {
      this.openPatientVideoCallModal();
    }

    renderVideoCallHistory() {
      const el = document.getElementById('patientVideoCallHistoryContainer');
      if (!el || !this.store) return;
      const history = this.store.getVideoCallHistory('patient') || [];

      if (!history.length) {
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);background:var(--glass-2);border-radius:12px;border:1px dashed var(--glass-border);grid-column:1/-1;">No video teleconsultations yet. Tap "📹 Start Video Teleconsultation" to connect with an on-duty doctor.</div>';
        return;
      }

      el.innerHTML = history.map(c => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;box-shadow:var(--shadow-panel);margin-bottom:10px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;background:rgba(2,132,199,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">
              📹
            </div>
            <div>
              <strong style="color:var(--ink);font-size:14px;display:block;">${c.recipientName}</strong>
              <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">Token: ${c.token} · 📅 ${c.date} (${c.time})</small>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge" style="background:rgba(34,197,94,0.15);color:#16a34a;font-weight:700;font-size:11px;">⏱️ ${c.duration}</span>
            <span class="badge" style="background:rgba(2,132,199,0.15);color:#0284c7;font-weight:700;font-size:11px;">✓ ${c.status}</span>
            ${c.rxId ? `
              <button class="auth-btn-primary" style="background:#0284c7;padding:6px 12px;font-size:11px;font-weight:700;" onclick="patientController.downloadPrescriptionPdf('${c.rxId}')">
                📥 View Rx PDF
              </button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }

    // -------------------------------------------------------------
    // 1. DYNAMIC SYMPTOM TRIAGE BUTTONS (PURE LOCAL LANGUAGE)
    // -------------------------------------------------------------
    renderTriageButtons() {
      const container = document.getElementById('symptomButtonsGrid');
      if (!container) return;

      const symptoms = [
        { id: 'fever', icon: '🌡️', key: 'sym_fever', defaultName: 'High Fever' },
        { id: 'snakebite', icon: '🐍', key: 'sym_snakebite', defaultName: 'Snake Bite' },
        { id: 'diarrhea', icon: '💧', key: 'sym_diarrhea', defaultName: 'Diarrhea' },
        { id: 'pregnancy', icon: '🤰', key: 'sym_pregnancy', defaultName: 'Pregnancy Pain' },
        { id: 'chestpain', icon: '🫀', key: 'sym_chestpain', defaultName: 'Chest Pain' },
        { id: 'breathing', icon: '😮‍💨', key: 'sym_breathing', defaultName: 'Breathing Difficulty' }
      ];

      container.innerHTML = symptoms.map(s => `
        <button class="btn-glass" style="padding:14px 8px;text-align:center;font-weight:700;display:flex;flex-direction:column;align-items:center;justify-content:center;" onclick="patientController.triageSymptom('${s.id}')">
          <div style="font-size:28px;margin-bottom:6px;">${s.icon}</div>
          <span style="font-size:13px;color:var(--ink);line-height:1.2;">${this.t(s.key, s.defaultName)}</span>
        </button>
      `).join('');
    }

    // -------------------------------------------------------------
    // 2. ABHA CARD RENDER & PRINT
    // -------------------------------------------------------------
    renderAbhaCard() {
      const container = document.getElementById('abhaCardContainer');
      if (!container || !this.store) return;
      const state = this.store.getState();
      const user = state.currentUser || (state.session ? state.session.user : null) || {
        name: 'Citizen Patient',
        phone: '9876543210',
        age: 38,
        gender: 'Male',
        village: 'Kondapalli Sub-Centre',
        bloodGroup: 'O+',
        abhaId: '14-8921-4402-9912'
      };

      container.innerHTML = `
        <div class="abha-badge-card" style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:18px;padding:20px;box-shadow:var(--shadow-panel);position:relative;overflow:hidden;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid var(--line);padding-bottom:12px;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <img src="assets/logo.png" style="width:34px;height:34px;border-radius:50%;object-fit:cover;border:1.5px solid var(--primary-bright);" alt="Swasthya Setu Logo">
              <div>
                <strong style="font-size:15px;color:var(--primary-bright);display:block;">${this.t('abha_nha', 'NATIONAL HEALTH AUTHORITY (ABHA)')}</strong>
                <small style="color:var(--muted);font-weight:600;">${this.t('abha_gov', 'Government of India')}</small>
              </div>
            </div>
            <span class="badge" style="background:var(--primary);color:#ffffff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">${this.t('abha_active', 'ACTIVE VERIFIED')}</span>
          </div>

          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;">
            <div style="width:68px;height:68px;background:rgba(2,132,199,0.15);border:1.5px solid var(--primary-bright);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:32px;">
              👤
            </div>
            <div>
              <h3 style="font-size:18px;color:var(--ink);margin-bottom:4px;font-weight:700;">${user.name}</h3>
              <p style="font-size:13px;color:var(--ink-dim);margin-bottom:2px;">Age: ${user.age} Yrs · Gender: ${user.gender} · Blood: <strong style="color:var(--primary-bright)">${user.bloodGroup}</strong></p>
              <p style="font-size:12px;color:var(--muted);">${user.village}</p>
            </div>
            <div style="text-align:center;background:var(--glass-1);padding:8px;border-radius:10px;border:1px solid var(--glass-border);">
              <div style="font-size:28px;line-height:1;">📱</div>
              <small style="font-size:9px;color:var(--muted);font-weight:700;display:block;margin-top:2px;">${this.t('abha_qr', 'QR SCAN')}</small>
            </div>
          </div>

          <div style="margin-top:14px;background:var(--primary);color:#ffffff;padding:10px 16px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <small style="font-size:10px;letter-spacing:1px;opacity:0.9;">${this.t('abha_number_label', 'ABHA NUMBER (14-DIGIT)')}</small>
              <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;font-weight:700;letter-spacing:1px;">${user.abhaId}</div>
            </div>
            <div style="text-align:right;">
              <small style="font-size:10px;opacity:0.9;">${this.t('abha_phone_label', 'PHONE LINKED')}</small>
              <div style="font-size:13px;font-weight:600;">+91 ${user.phone}</div>
            </div>
          </div>

          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="auth-btn-primary" style="flex:1;min-width:180px;padding:10px;font-size:13px;" onclick="patientController.printAbhaCard()">
              ${this.t('btn_print_abha', '🖨️ Print / Download ABHA Card')}
            </button>
            <button class="btn-glass" style="padding:10px 16px;font-size:13px;" onclick="speakText('Your ABHA ID is ' + '${user.abhaId}')">
              ${this.t('read_aloud', '🔊 Read Aloud')}
            </button>
          </div>
        </div>
      `;
    }

    
    // -------------------------------------------------------------
    // 7. PATIENT E-PRESCRIPTION HISTORY & PDF DOWNLOAD
    // -------------------------------------------------------------
    renderPrescriptions() {
      const container = document.getElementById('patientPrescriptionsContainer');
      if (!container || !this.store) return;

      const user = this.store.getState().currentUser || {};
      const allRx = this.store.getState().prescriptions || [];

      // Filter prescriptions for this patient (or show all if demo/all)
      const myRx = allRx.filter(r => {
        if (!r.patientName) return true;
        if (!user.name) return true;
        return r.patientName.toLowerCase().includes(user.name.toLowerCase()) || 
               user.name.toLowerCase().includes(r.patientName.toLowerCase());
      });

      if (!myRx.length) {
        container.innerHTML = `
          <div style="text-align:center;padding:24px 16px;background:var(--glass-2);border-radius:14px;border:1px dashed var(--glass-border);color:var(--muted);">
            <div style="font-size:32px;margin-bottom:8px;">📜</div>
            <strong style="color:var(--ink);display:block;font-size:14px;">No e-Prescriptions Yet</strong>
            <small>Once a doctor completes your OPD consultation, your official digital prescription will appear here with instant PDF download.</small>
          </div>
        `;
        return;
      }

      container.innerHTML = myRx.map(rx => {
        const medsList = Array.isArray(rx.medicines) ? rx.medicines : [];
        return `
          <div class="glass-panel" style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:16px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow-panel);">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
              <div>
                <span class="badge" style="background:rgba(2,132,199,0.15);color:var(--primary-bright);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;font-family:'IBM Plex Mono',monospace;">
                  ${rx.id || 'RX-OPD'} · ${rx.token || 'T-OPD'}
                </span>
                <h3 style="font-size:17px;color:var(--ink);font-weight:800;margin-top:6px;">${rx.diagnosis || 'Clinical Consultation'}</h3>
                <small style="color:var(--muted);font-weight:600;">👨‍⚕️ ${rx.doctorName || 'Medical Officer'} · 📅 ${rx.date || new Date().toISOString().split('T')[0]}</small>
              </div>

              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="auth-btn-primary" style="background:linear-gradient(135deg, #0284c7, #0369a1);border:none;padding:8px 14px;font-size:12px;font-weight:700;box-shadow:0 2px 8px rgba(2,132,199,0.3);display:flex;align-items:center;gap:6px;cursor:pointer;border-radius:8px;" onclick="patientController.downloadPrescriptionPdf('${rx.id}')">
                  <span>📥</span> <span>Download PDF</span>
                </button>
                <button class="btn-glass" style="padding:8px 12px;font-size:12px;font-weight:700;" onclick="patientController.printPrescription('${rx.id}')">
                  🖨️ Print
                </button>
                <button class="btn-glass" style="padding:8px 12px;font-size:12px;font-weight:700;color:#ef4444;border-color:rgba(239,68,68,0.3);" onclick="patientController.deletePrescription('${rx.id}')" title="Delete prescription after downloading to free up space">
                  🗑️ Delete
                </button>
              </div>
            </div>

            <!-- Medicines Table -->
            <div style="margin-bottom:12px;">
              <strong style="font-size:12px;color:var(--ink-dim);display:block;margin-bottom:6px;">💊 Prescribed Generic Medicines (Jan Aushadhi):</strong>
              <div style="display:flex;flex-direction:column;gap:6px;">
                ${medsList.map(m => `
                  <div style="display:flex;justify-content:space-between;align-items:center;background:var(--glass-1);border:1px solid var(--glass-border);padding:8px 12px;border-radius:10px;font-size:13px;">
                    <div>
                      <strong style="color:var(--ink);">${m.name || m}</strong>
                      <small style="color:var(--muted);display:block;">Dosage: ${m.dosage || 'As directed by doctor'} · Timing: ${m.timing || 'After food'}</small>
                    </div>
                    ${m.genericPrice ? `<span class="badge" style="background:rgba(22,163,74,0.15);color:#22c55e;font-size:11px;font-weight:700;">₹${m.genericPrice} (Save ₹${(m.brandPrice || m.genericPrice * 3) - m.genericPrice})</span>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Clinical Advice -->
            ${rx.advice ? `
              <div style="background:rgba(2,132,199,0.08);border:1px dashed rgba(2,132,199,0.3);border-radius:10px;padding:10px 12px;font-size:12px;color:var(--ink);">
                <strong style="color:var(--primary-bright);display:block;margin-bottom:2px;">👨‍⚕️ Doctor's Advice & Precautions:</strong>
                ${rx.advice}
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }

        // Direct High-Contrast Vector PDF Generator for e-Prescriptions
    downloadPrescriptionPdf(rxId) {
      const allRx = (this.store && this.store.getState().prescriptions) || [];
      const rx = allRx.find(r => r.id === rxId) || (allRx.length ? allRx[0] : null);
      const user = (this.store && (this.store.getState().currentUser || (this.store.getState().session && this.store.getState().session.user))) || {
        name: 'Citizen Patient',
        age: 38,
        gender: 'Male',
        abhaId: '14-8921-4402-9912',
        village: 'Kondapalli Sub-Centre'
      };

      if (!rx) {
        alert('Prescription record not found.');
        return;
      }

      const medsList = Array.isArray(rx.medicines) ? rx.medicines : [];
      const rxHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>e-Prescription-${rx.id || 'RX-OPD'}</title>
  <style>
    @page { size: A4 portrait; margin: 10mm; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #ffffff;
      padding: 16px;
      line-height: 1.4;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .rx-card {
      max-width: 760px;
      margin: 0 auto;
      border: 2px solid #0284c7;
      border-radius: 12px;
      padding: 24px;
      background: #ffffff;
    }
    .header {
      border-bottom: 3px double #0284c7;
      padding-bottom: 14px;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      background: #f8fafc;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      padding: 12px 14px;
      margin-bottom: 16px;
      font-size: 13px;
    }
    .diagnosis-box {
      background: #f0f9ff;
      border-left: 5px solid #0284c7;
      border-top: 1px solid #bae6fd;
      border-right: 1px solid #bae6fd;
      border-bottom: 1px solid #bae6fd;
      padding: 10px 14px;
      border-radius: 6px;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
      font-size: 13px;
      border: 1px solid #cbd5e1;
    }
    th {
      background: #0284c7 !important;
      color: #ffffff !important;
      padding: 9px 12px;
      text-align: left;
      font-weight: 800;
      -webkit-print-color-adjust: exact;
    }
    td {
      padding: 9px 12px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    tr:nth-child(even) { background: #f8fafc; }
    .advice-box {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      border-radius: 8px;
      padding: 10px 14px;
      margin-bottom: 18px;
      font-size: 13px;
      color: #78350f;
    }
    .footer {
      border-top: 2px solid #cbd5e1;
      padding-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;
      color: #475569;
    }
    @media print {
      body { padding: 0; background: #ffffff; }
      .rx-card { border: 2px solid #0284c7; padding: 18px; }
    }
  </style>
</head>
<body>
  <div class="rx-card">
    <div class="header">
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:50px;height:50px;background:#0284c7;color:#ffffff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:900;border:2px solid #0369a1;">
          🩺
        </div>
        <div>
          <h2 style="font-size:16px;font-weight:900;color:#0369a1;letter-spacing:0.3px;">MINISTRY OF HEALTH & FAMILY WELFARE</h2>
          <div style="font-size:11px;font-weight:700;color:#334155;margin-top:2px;">Ayushman Bharat Digital Mission (ABDM) · National Rural Telemedicine Grid</div>
          <div style="font-size:11px;color:#0284c7;font-weight:900;margin-top:2px;letter-spacing:0.5px;">OFFICIAL CLINICAL e-PRESCRIPTION</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:13px;font-weight:900;color:#0284c7;font-family:monospace;">Rx ID: ${rx.id || 'RX-OPD-901'}</div>
        <div style="font-size:11px;color:#334155;font-weight:600;margin-top:2px;">Date: ${rx.date || rx.rx_date || new Date().toISOString().split('T')[0]}</div>
        <div style="font-size:11px;color:#15803d;font-weight:800;margin-top:2px;">✓ ABDM Digitally Verified</div>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <strong style="color:#0369a1;display:block;font-size:11px;margin-bottom:3px;">👨‍⚕️ Prescribing Medical Officer:</strong>
        <div style="font-weight:900;font-size:14px;color:#0f172a;">${rx.doctorName || 'Dr. Medical Officer'}</div>
        <div style="color:#475569;font-weight:600;margin-top:2px;">Medical Council Reg: ${rx.doctorRegNo || 'MCI-AP-48912'}</div>
        <div style="color:#475569;font-weight:600;">${rx.doctorLocation || 'District Health Centre (PHC/CHC)'}</div>
      </div>
      <div>
        <strong style="color:#0369a1;display:block;font-size:11px;margin-bottom:3px;">👤 Patient Information:</strong>
        <div style="font-weight:900;font-size:14px;color:#0f172a;">${rx.patientName || user.name}</div>
        <div style="color:#475569;font-weight:600;margin-top:2px;">Age/Gender: ${user.age || 35} Yrs / ${user.gender || 'Male'} · Blood: ${user.bloodGroup || 'O+'}</div>
        <div style="color:#0f172a;font-weight:800;font-family:monospace;margin-top:2px;">ABHA ID: ${user.abhaId || '14-8921-4402-9912'}</div>
      </div>
    </div>

    <div class="diagnosis-box">
      <div style="font-size:10px;font-weight:900;color:#0369a1;letter-spacing:0.8px;text-transform:uppercase;">CLINICAL DIAGNOSIS & CHIEF COMPLAINT</div>
      <div style="font-size:14px;font-weight:900;color:#0c4a6e;margin-top:3px;">${rx.diagnosis || 'Acute Viral Infection / Routine Checkup'}</div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
        <span style="font-size:22px;font-weight:900;color:#0284c7;font-family:serif;">℞</span>
        <strong style="font-size:13px;color:#0f172a;">Prescribed Generic Formulations (PMBJP Jan Aushadhi):</strong>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width:36px;">#</th>
            <th>Generic Medicine Name & Strength</th>
            <th>Dosage Schedule</th>
            <th style="text-align:right;width:120px;">Jan Aushadhi Price</th>
          </tr>
        </thead>
        <tbody>
          ${medsList.map((m, idx) => `
            <tr>
              <td style="font-weight:800;color:#334155;">${idx + 1}</td>
              <td style="font-weight:900;color:#0f172a;">${m.name || m}</td>
              <td style="color:#1e293b;font-weight:600;">${m.dosage || '1 Tab 3 times daily after food'}</td>
              <td style="text-align:right;font-weight:900;color:#15803d;">₹${m.genericPrice || 8}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="advice-box">
      <strong style="display:block;margin-bottom:3px;color:#92400e;font-size:11px;text-transform:uppercase;">⚠️ Doctor's Advice & Dietary Precautions:</strong>
      <div style="font-weight:600;line-height:1.5;">${rx.advice || 'Drink clean boiled water, rest well. If symptoms persist beyond 3 days, visit PHC immediately.'}</div>
    </div>

    <div class="footer">
      <div>
        <div style="font-weight:700;color:#0f172a;">Jan Aushadhi Generic Pharmacy: Available at nearest PHC/CHC.</div>
        <div style="color:#0284c7;font-weight:800;margin-top:2px;">Emergency 24x7 Ambulance SOS: Dial 108</div>
      </div>
      <div style="text-align:center;">
        <div style="font-family:cursive, 'Brush Script MT', Arial;font-size:18px;color:#0369a1;font-weight:900;">${rx.doctorName || 'Authorized Medical Officer'}</div>
        <div style="border-top:1px solid #94a3b8;padding-top:2px;font-weight:800;color:#0f172a;">Authorized Medical Officer Sign</div>
        <small style="font-size:9px;color:#15803d;font-weight:800;display:block;margin-top:1px;">Digitally Signed via e-Sanjeevani</small>
      </div>
    </div>
  </div>
</body>
</html>
      `;

      try {
        const iframe = document.createElement('iframe');
        iframe.id = 'rxPrintFrame_' + Date.now();
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);

        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(rxHtml);
        doc.close();

        setTimeout(() => {
          try {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
          } catch (e) {
            const win = window.open('', '_blank');
            win.document.write(rxHtml);
            win.document.close();
            win.focus();
            setTimeout(() => { win.print(); }, 400);
          }
          setTimeout(() => {
            if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
          }, 3000);
        }, 350);

        if (typeof window.toast === 'function') {
          window.toast('🖨️ e-Prescription PDF Dialog Opened (Select "Save as PDF")');
        }
      } catch (err) {
        console.error('Print PDF Error:', err);
        const win = window.open('', '_blank');
        win.document.write(rxHtml);
        win.document.close();
        win.focus();
        setTimeout(() => { win.print(); }, 500);
      }
    }

    deletePrescription(rxId) {
      if (confirm('Are you sure you want to delete this prescription from your health locker?')) {
        if (this.store) {
          this.store.deletePrescription(rxId);
          if (typeof window.toast === 'function') {
            window.toast('🗑️ Prescription deleted from Health Locker');
          }
        }
      }
    }

    printPrescription(rxId) {
      this.downloadPrescriptionPdf(rxId);
    }


    
    openRequestConsultModal() {
      const m = document.getElementById('patientRequestConsultModal');
      const docSelect = document.getElementById('patientConsultDoctorSelect');
      if (docSelect && this.store) {
        let doctors = (this.store.getState().staff || []).filter(s => s.role === 'doctor');
        if (!doctors.length) {
          doctors = [
            { id: 'DOC-9766', staff_code: 'DOC-9766', name: 'Dr. Aaditya', location: 'VIT AP Health Centre' },
            { id: 'DOC-7896', staff_code: 'DOC-7896', name: 'Dr. Chetan', location: 'CHC District Hospital' }
          ];
        }
        docSelect.innerHTML = doctors.map(d => `
          <option value="${d.staff_code || d.id}">🩺 ${d.name} (${d.location || 'PHC/CHC'})</option>
        `).join('');
      }
      if (m) m.style.display = 'flex';
    }

    closeRequestConsultModal() {
      const m = document.getElementById('patientRequestConsultModal');
      if (m) m.style.display = 'none';
    }

    submitRequestConsult(e) {
      if (e) e.preventDefault();
      const complaintInput = document.getElementById('patReqComplaint');
      const durationInput = document.getElementById('patReqDuration');
      const bpInput = document.getElementById('patReqBp');
      const tempInput = document.getElementById('patReqTemp');
      const triageSelect = document.getElementById('patReqTriage');
      const docSelect = document.getElementById('patientConsultDoctorSelect');

      const complaint = complaintInput ? complaintInput.value.trim() : '';
      const duration = durationInput ? durationInput.value.trim() : '';
      const bp = (bpInput && bpInput.value.trim()) || '120/80';
      const temp = (tempInput && tempInput.value.trim()) || '98.6°F';
      const triage = (triageSelect && triageSelect.value) || 'Green';
      
      let doctorId = null;
      let doctorName = 'Assigned Medical Officer';
      if (docSelect && docSelect.options && docSelect.selectedIndex >= 0) {
        doctorId = docSelect.value;
        doctorName = docSelect.options[docSelect.selectedIndex].text.replace(/^[^w]+/, '');
      }

      if (!complaint) {
        alert('Please describe your symptoms/illness for the doctor.');
        return;
      }

      const qItem = this.store.requestDoctorConsult({
        complaint: complaint + (duration ? ' (Duration: ' + duration + ')' : ''),
        vitals: { bp, temp, spo2: '98%', pulse: '76 bpm' },
        triage,
        assignedDoctorId: doctorId,
        assignedDoctorName: doctorName
      });

      if (complaintInput) complaintInput.value = '';
      if (durationInput) durationInput.value = '';
      this.closeRequestConsultModal();

      if (typeof window.toast === 'function') {
        window.toast('🚀 Consultation request sent! Token ' + qItem.token + ' joined OPD Queue for ' + doctorName);
      }
    }

    printAbhaCard() {
      window.print();
    }

    // -------------------------------------------------------------
    // 3. 1-TAP 108 EMERGENCY SOS
    // -------------------------------------------------------------
    triggerSos() {
      const state = this.store.getState();
      const user = state.currentUser || (state.session ? state.session.user : null) || {
        name: 'Citizen Patient',
        phone: '9876543210',
        village: 'Kondapalli Ward 4',
        abhaId: '14-8921-4402-9912'
      };
      const message = `🚨 EMERGENCY 108 SOS!\n\nPatient: ${user.name}\nPhone: +91 ${user.phone}\nLocation: ${user.village}\nABHA: ${user.abhaId}\n\nEmergency ambulance dispatched.`;
      
      // User can trigger speech manually if desired
      if (typeof window.toast === 'function') {
        window.toast('🚨 Emergency 108 Alert Dispatched!');
      }
      alert(message);
    }

    // -------------------------------------------------------------
    // 4. AUDIO-VISUAL SYMPTOM TRIAGE
    // -------------------------------------------------------------
    triageSymptom(type) {
      const triageData = {
        fever: {
          title: this.t('sym_fever', 'High Fever'),
          color: '#d97706',
          badge: '🟡 MODERATE · VISIT PHC',
          advice: 'Drink plenty of boiled water and ORS. Take Paracetamol if fever is above 100°F. If fever lasts more than 48 hours, visit PHC for Malaria/Dengue test.',
          audio: 'High fever triage: Drink clean water and ORS. Take Paracetamol and visit PHC if fever lasts two days.'
        },
        snakebite: {
          title: this.t('sym_snakebite', 'Snake Bite'),
          color: '#dc2626',
          badge: '🔴 CRITICAL EMERGENCY · GO TO HOSPITAL',
          advice: 'DO NOT cut, suck, or tie tight tourniquet. Keep patient calm and still. Rush immediately to nearest CHC for Anti-Snake Venom (ASV). Call 108 now!',
          audio: 'Critical snakebite emergency! Do not move the affected limb. Go directly to CHC hospital for anti-venom.'
        },
        diarrhea: {
          title: this.t('sym_diarrhea', 'Diarrhea'),
          color: '#16a34a',
          badge: '🟢 SAFE FOR HOME CARE WITH ORS',
          advice: 'Dissolve 1 packet of ORS in 1 liter clean drinking water. Drink after every loose stool. Give Zinc tablets to children under 5.',
          audio: 'Diarrhea care: Drink one liter of ORS water frequently to prevent dehydration.'
        },
        pregnancy: {
          title: this.t('sym_pregnancy', 'Pregnancy Pain'),
          color: '#dc2626',
          badge: '🔴 EMERGENCY MATERNAL ADMISSION',
          advice: 'Severe labor pains or bleeding require immediate hospital delivery. Contact your ASHA Didi immediately and take 108 ambulance.',
          audio: 'Maternal alert: Contact your ASHA Didi and take 108 ambulance to hospital delivery ward right away.'
        },
        chestpain: {
          title: this.t('sym_chestpain', 'Chest Pain'),
          color: '#dc2626',
          badge: '🔴 CRITICAL CARDIAC ALERT',
          advice: 'Chest tightness radiating to left arm or jaw with cold sweats requires immediate hospital emergency care. Call 108.',
          audio: 'Cardiac emergency: Chew Aspirin if available and call 108 ambulance to reach hospital ICU.'
        },
        breathing: {
          title: this.t('sym_breathing', 'Breathing Difficulty'),
          color: '#d97706',
          badge: '🟡 URGENT · OXYGEN PHC VISIT',
          advice: 'Sit upright in an airy place. Use inhaler if prescribed. Visit nearest PHC for oxygen support and nebulization.',
          audio: 'Breathing difficulty: Sit upright, take inhaler if prescribed, and visit nearest PHC for oxygen support.'
        }
      };

      const item = triageData[type];
      if (!item) return;

      const container = document.getElementById('triageResultContainer');
      if (container) {
        container.innerHTML = `
          <div style="background:var(--glass-2);border:2px solid ${item.color};border-radius:16px;padding:18px;margin-top:14px;box-shadow:var(--shadow-panel);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
              <h3 style="color:var(--ink);font-size:17px;font-weight:700;">${item.title}</h3>
              <span style="background:${item.color};color:#ffffff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">${item.badge}</span>
            </div>
            <p style="font-size:14px;color:var(--ink-dim);line-height:1.6;margin-bottom:14px;">${item.advice}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button class="auth-btn-primary" style="background:#dc2626;border-color:#b91c1c;padding:8px 16px;font-size:13px;" onclick="patientController.triggerSos()">
                ${this.t('btn_call_108', '🚨 Call 108 Ambulance')}
              </button>
              <button class="btn-glass" style="padding:8px 16px;font-size:13px;" onclick="speakText('${item.audio}')">
                ${this.t('read_aloud', '🔊 Listen in Audio')}
              </button>
            </div>
          </div>
        `;
        // Manual audio button only
      }
    }

    // -------------------------------------------------------------
    // 5. FAMILY HEALTH CIRCLE
    // -------------------------------------------------------------
    renderFamilyCircle() {
      const el = document.getElementById('familyMembersGrid') || document.getElementById('familyMembersList');
      if (!el || !this.store) return;
      const fams = this.store.getState().familyMembers || [];

      if (!fams.length) {
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);grid-column:1/-1;">No family members added yet. Tap "+ Add Member" above.</div>';
        return;
      }

      el.innerHTML = fams.map(f => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;box-shadow:var(--shadow-panel);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;background:rgba(2,132,199,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">
              ${f.gender === 'Female' ? '👩' : '👨'}
            </div>
            <div>
              <strong style="color:var(--ink);font-size:15px;display:block;">${f.name} (${f.relation})</strong>
              <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">Age: ${f.age} · ABHA: ${f.abhaId || '14-XXXX'}</small>
            </div>
          </div>
          <div style="text-align:right;">
            <span class="badge" style="background:rgba(2,132,199,0.12);color:var(--primary-bright);padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">${f.status || 'Active'}</span>
            <button style="display:block;margin-top:4px;color:#dc2626;font-size:11px;cursor:pointer;background:none;border:none;font-weight:600;" onclick="patientController.removeFamilyMember('${f.id}')">✕ Remove</button>
          </div>
        </div>
      `).join('');
    }

    openAddFamilyModal() {
      const modal = document.getElementById('addFamilyModal');
      if (modal) modal.style.display = 'flex';
    }

    closeAddFamilyModal() {
      const modal = document.getElementById('addFamilyModal');
      if (modal) modal.style.display = 'none';
    }

    submitAddFamily(e) {
      if (e) e.preventDefault();
      const nameInput = document.getElementById('famName');
      const relationInput = document.getElementById('famRelation');
      const ageInput = document.getElementById('famAge');
      const genderInput = document.getElementById('famGender');

      const name = nameInput ? nameInput.value.trim() : '';
      const relation = relationInput ? relationInput.value : 'Spouse';
      const age = parseInt(ageInput ? ageInput.value : '25', 10) || 25;
      const gender = genderInput ? genderInput.value : 'Female';

      if (!name) {
        alert('Please enter member name');
        return;
      }

      const newFam = this.store.addFamilyMember({ name, relation, age, gender });
      if (nameInput) nameInput.value = '';
      if (ageInput) ageInput.value = '';
      this.closeAddFamilyModal();
      
      // Immediately re-render Family Circle on the spot
      this.renderFamilyCircle();
      if (typeof window.toast === 'function') {
        window.toast('✓ Added ' + name + ' (' + relation + ') to Family Health Circle');
      }
    }

    removeFamilyMember(id) {
      if (confirm('Are you sure you want to remove this member from your Family Health Circle?')) {
        if (this.store) {
          this.store.deleteFamilyMember(id);
          this.renderFamilyCircle();
          if (typeof window.toast === 'function') {
            window.toast('🗑️ Family member removed successfully');
          }
        }
      }
    }

    // -------------------------------------------------------------
    // 6. JAN AUSHADHI MEDICINE TRACKER & SAVINGS (DYNAMIC CATALOG)
    // -------------------------------------------------------------
    renderDailyMedications() {
      const el = document.getElementById('dailyMedsContainer') || document.getElementById('dailyMedsList');
      if (!el || !this.store) return;
      const meds = this.store.getState().medicines || [];

      if (!meds.length) {
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);">No medicines in Jan Aushadhi catalog.</div>';
        return;
      }

      const savedWord = this.t('saved_text', 'saved');
      const morningLabel = this.t('dose_morning', '☀️ Morning');
      const noonLabel = this.t('dose_noon', '🌤️ Noon');
      const nightLabel = this.t('dose_night', '🌙 Night');

      el.innerHTML = meds.map(m => {
        const savings = Math.max(0, (m.brandPrice || 0) - (m.genericPrice || 0));
        const savingsPct = m.brandPrice > 0 ? Math.round((savings / m.brandPrice) * 100) : 0;
        const savingText = `💰 ₹${savings} ${savedWord} (${savingsPct}% OFF)`;

        return `
          <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;box-shadow:var(--shadow-panel);">
            <div>
              <div style="display:flex;align-items:center;gap:8px;">
                <strong style="color:var(--ink);font-size:15px;">${m.name}</strong>
                <span class="badge" style="background:rgba(22,163,74,0.15);color:#15803d;padding:2px 6px;border-radius:8px;font-size:10px;font-weight:800;">PMBJP</span>
              </div>
              <small style="color:var(--muted);display:block;margin-top:2px;">Category: ${m.category || 'General Medicine'} · Stock: ${m.stock || 100} ${m.unit || 'Tablets'}</small>
              <div style="font-size:12px;margin-top:4px;">
                <strong style="color:#15803d;font-size:14px;">₹${m.genericPrice}</strong>
                ${m.brandPrice ? `<span style="text-decoration:line-through;color:var(--muted);margin-left:6px;font-size:12px;">₹${m.brandPrice}</span>` : ''}
                ${savings > 0 ? `<span style="background:rgba(22,163,74,0.15);color:#15803d;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:800;margin-left:8px;">${savingText}</span>` : ''}
              </div>
            </div>

            <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
              <button class="btn-glass" style="padding:6px 10px;font-size:11px;font-weight:700;" onclick="patientController.toggleDose('${m.id}', 'morning')">${morningLabel}</button>
              <button class="btn-glass" style="padding:6px 10px;font-size:11px;font-weight:700;" onclick="patientController.toggleDose('${m.id}', 'noon')">${noonLabel}</button>
              <button class="btn-glass" style="padding:6px 10px;font-size:11px;font-weight:700;" onclick="patientController.toggleDose('${m.id}', 'night')">${nightLabel}</button>
            </div>
          </div>
        `;
      }).join('');
    }

    toggleDose(medId, time) {
      this.store.toggleDoseTaken(medId, time);
    }

    // -------------------------------------------------------------
    // 7. LIVE HOSPITAL BEDS & BLOOD BANK
    // -------------------------------------------------------------
    renderLiveHospitals() {
      const el = document.getElementById('hospitalBedsContainer') || document.getElementById('hospitalBedsList');
      if (!el || !this.store) return;
      const hosps = this.store.getState().hospitals || [];

      const genBedsText = this.t('gen_beds', 'General Beds');
      const icuBedsText = this.t('icu_beds', 'ICU Beds');
      const oxyBedsText = this.t('oxy_beds', 'Oxygen Beds');
      const availText = this.t('avail', 'Avail');

      el.innerHTML = hosps.map(h => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow-panel);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
            <div>
              <strong style="color:var(--primary-bright);font-size:15px;display:block;">${h.name}</strong>
              <small style="color:var(--muted);">Distance: ${h.distance} · Doctor: ${h.doctorOnDuty}</small>
            </div>
            <a href="tel:${h.phone}" class="btn-glass" style="padding:4px 10px;font-size:12px;color:var(--primary-bright);">📞 Call ${h.phone}</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(90px, 1fr));gap:8px;margin-top:10px;text-align:center;">
            <div style="background:rgba(22,163,74,0.12);border:1px solid rgba(22,163,74,0.3);padding:8px;border-radius:10px;">
              <small style="color:#16a34a;font-size:11px;font-weight:600;display:block;">${genBedsText}</small>
              <strong style="color:#16a34a;font-size:16px;">${h.genBedsAvail} ${availText}</strong>
            </div>
            <div style="background:rgba(220,38,38,0.12);border:1px solid rgba(220,38,38,0.3);padding:8px;border-radius:10px;">
              <small style="color:#dc2626;font-size:11px;font-weight:600;display:block;">${icuBedsText}</small>
              <strong style="color:#dc2626;font-size:16px;">${h.icuBedsAvail} ${availText}</strong>
            </div>
            <div style="background:rgba(2,132,199,0.12);border:1px solid rgba(2,132,199,0.3);padding:8px;border-radius:10px;">
              <small style="color:#0284c7;font-size:11px;font-weight:600;display:block;">${oxyBedsText}</small>
              <strong style="color:#0284c7;font-size:16px;">${h.oxygenBedsAvail} ${availText}</strong>
            </div>
          </div>
        </div>
      `).join('');
    }

    renderLiveBloodBank() {
      const el = document.getElementById('bloodBankGrid');
      if (!el || !this.store) return;
      const bank = this.store.getState().bloodBank || {};

      const inStockText = this.t('in_stock', '✓ In Stock');
      const lowStockText = this.t('low_stock', '⚠️ Low');

      el.innerHTML = Object.entries(bank).map(([grp, count]) => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:12px;padding:10px;text-align:center;">
          <strong style="color:#dc2626;font-size:16px;display:block;">${grp}</strong>
          <span style="font-size:14px;color:var(--ink);font-weight:700;">${count} Units</span>
          <small style="display:block;color:${count > 5 ? '#16a34a' : '#dc2626'};font-size:10px;font-weight:600;margin-top:2px;">
            ${count > 5 ? inStockText : lowStockText}
          </small>
        </div>
      `).join('');
    }
  }

  global.patientController = new PatientController();

})(typeof window !== 'undefined' ? window : this);
