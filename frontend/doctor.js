/**
 * =========================================================
 * SWASTHYA SETU - DOCTOR CLINICAL DESK (doctor.js)
 * 100% Vernacular e-Prescriptions & Modal Localization
 * =========================================================
 */

(function(global) {
  'use strict';

  class DoctorController {
    constructor() {
      this.store = global.appStore;
      this.selectedPatient = null;
    }

    init() {
      this.renderConsultQueue();
      this.renderPrescriptionHistory();
      this.renderDoctorCallHistory();
      this.renderClinicalAssistant();
      if (this.store) {
        this.store.subscribe(() => {
          this.renderConsultQueue();
          this.renderPrescriptionHistory();
        });
      }
    }

    t(key, fallback) {
      return global.i18n ? global.i18n.get(key, fallback) : (fallback || key);
    }

    tr(text) {
      return global.localizeComplaintText ? global.localizeComplaintText(text) : text;
    }

    renderQueue() { this.renderConsultQueue(); }
    renderAll() {
      this.renderConsultQueue();
      this.renderPrescriptionHistory();
    }

    startVideoConsult(queueId) {
      if (!this.store) return;
      const q = (this.store.getState().consultQueue || []).find(item => item.id === queueId || item.token === queueId);
      const doctorUser = (this.store.getState().session && this.store.getState().session.user) || { name: 'Dr. Priya Sharma, MBBS, MD' };

      if (global.videoCallController) {
        global.videoCallController.startVideoCall({
          callerRole: 'doctor',
          callerName: doctorUser.name || 'Dr. Priya Sharma, MBBS, MD',
          callerPhone: doctorUser.phone || '9848011220',
          recipientRole: 'patient',
          recipientName: q ? q.patientName : 'Citizen Patient',
          recipientPhone: (q && q.phone) ? q.phone : '9876543210',
          patientName: q ? q.patientName : 'Citizen Patient',
          patientAge: q ? q.age : 35,
          patientGender: q ? q.gender : 'M',
          complaint: q ? q.complaint : 'Telemedicine OPD Consultation',
          vitals: q ? q.vitals : { bp: '120/80', spo2: '98%', temp: '98.6°F', pulse: '76 bpm' },
          queueId: q ? q.id : queueId
        });
      }
    }

        renderDoctorCallHistory() {
      const el = document.getElementById('doctorCallHistoryContainer');
      if (!el || !this.store) return;
      const history = this.store.getVideoCallHistory('doctor') || [];

      if (!history.length) {
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);background:var(--glass-2);border-radius:12px;border:1px dashed var(--glass-border);grid-column:1/-1;">No video teleconsultation logs recorded yet.</div>';
        return;
      }

      el.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;width:100%;">
          <span style="font-size:12px;color:var(--muted);font-weight:700;">Total Patient Calls: ${history.length}</span>
          <button onclick="doctorController.clearAllCallHistory()" style="background:rgba(220,38,38,0.12);color:#dc2626;border:1px solid rgba(220,38,38,0.3);padding:4px 10px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;">
            🗑️ Clear History
          </button>
        </div>
      ` + history.map(c => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;box-shadow:var(--shadow-panel);">
          <div>
            <strong style="color:var(--ink);font-size:14px;display:block;">${c.callerName || c.patientName}</strong>
            <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">Token: ${c.token} · 📅 ${c.date} (${c.time}) · Diagnosis: ${c.diagnosis || 'General Checkup'}</small>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge" style="background:rgba(34,197,94,0.15);color:#16a34a;font-weight:700;font-size:11px;">⏱️ ${c.duration}</span>
            <span class="badge" style="background:rgba(2,132,199,0.15);color:#0284c7;font-weight:700;font-size:11px;">✓ ${c.status}</span>
            <button onclick="doctorController.deleteCallRecord('${c.id}')" title="Delete record" style="background:none;border:none;color:#dc2626;cursor:pointer;font-size:16px;padding:4px 8px;border-radius:6px;">
              🗑️
            </button>
          </div>
        </div>
      `).join('');
    }

    deleteCallRecord(id) {
      if (confirm('Delete this consultation record?')) {
        if (this.store) this.store.deleteVideoCall(id);
        this.renderDoctorCallHistory();
      this.renderClinicalAssistant();
        if (global.toast) global.toast('🗑️ Consultation record deleted.');
      }
    }

    clearAllCallHistory() {
      if (confirm('Are you sure you want to clear all consultation history?')) {
        if (this.store) this.store.clearVideoCallHistory('doctor');
        this.renderDoctorCallHistory();
      this.renderClinicalAssistant();
        if (global.toast) global.toast('🗑️ All consultation history cleared.');
      }
    }

    // -------------------------------------------------------------
    // CLINICAL AI DIAGNOSTIC PROTOCOLS & GUIDELINES ASSISTANT
    // -------------------------------------------------------------
    getClinicalProtocols() {
      return [
        {
          disease: 'Acute Viral Bronchitis / URTI',
          icd: 'J20.9',
          symptoms: ['Fever', 'Cough', 'Throat Irritation', 'Myalgia'],
          investigations: ['CBC (if >3 days)', 'SpO2 Monitoring', 'Throat Swab (if exudate)'],
          protocols: ['Hydration (2-3L/day)', 'Steam Inhalation', 'Warm Saline Gargles'],
          genericRx: [
            { name: 'Paracetamol 650mg (Jan Aushadhi)', dosage: '1 Tab TDS', price: '₹8' },
            { name: 'Cetirizine 10mg (Jan Aushadhi)', dosage: '1 Tab Night', price: '₹5' },
            { name: 'Amoxicillin 500mg (Jan Aushadhi)', dosage: '1 Cap TDS (if secondary bacterial)', price: '₹22' }
          ]
        },
        {
          disease: 'Hypertension (Stage 1 / 2)',
          icd: 'I10',
          symptoms: ['Headache', 'Dizziness', 'BP > 140/90 mmHg', 'Tinnitus'],
          investigations: ['Lipid Profile', 'Serum Creatinine', 'ECG 12-Lead', 'Urine Routine'],
          protocols: ['Low Sodium Diet (<2g/day)', '30 mins Daily Brisk Walk', 'Stress Management'],
          genericRx: [
            { name: 'Telmisartan 40mg (Jan Aushadhi)', dosage: '1 Tab Morning (OD)', price: '₹14' },
            { name: 'Amlodipine 5mg (Jan Aushadhi)', dosage: '1 Tab Morning (OD)', price: '₹6' }
          ]
        },
        {
          disease: 'Type 2 Diabetes Mellitus',
          icd: 'E11.9',
          symptoms: ['Polyuria', 'Polydipsia', 'Fatigue', 'Fasting Blood Sugar > 126 mg/dL'],
          investigations: ['HbA1c', 'Fasting & Post-Prandial Blood Sugar', 'Kidney Function Test'],
          protocols: ['Diabetic Meal Plan', 'Foot Care & Inspection', 'Annual Retinal Screening'],
          genericRx: [
            { name: 'Metformin 500mg (Jan Aushadhi)', dosage: '1 Tab BD with food', price: '₹9' },
            { name: 'Glimepiride 1mg (Jan Aushadhi)', dosage: '1 Tab Morning before food', price: '₹7' }
          ]
        },
        {
          disease: 'Acute Gastroenteritis / Diarrhea',
          icd: 'A09',
          symptoms: ['Watery Stools', 'Vomiting', 'Abdominal Cramps', 'Mild Dehydration'],
          investigations: ['Stool Routine', 'Serum Electrolytes (if severe)', 'Blood Pressure Check'],
          protocols: ['WHO ORS Solution (1 Liter per 3 loose stools)', 'Zinc Supplements', 'Light Diet'],
          genericRx: [
            { name: 'Oral Rehydration Salts (WHO ORS)', dosage: 'Sip continuously after each stool', price: '₹4' },
            { name: 'Zinc Sulfate 20mg (Jan Aushadhi)', dosage: '1 Tab OD for 14 days', price: '₹6' },
            { name: 'Ofloxacin + Ornidazole (Jan Aushadhi)', dosage: '1 Tab BD x 3 days', price: '₹18' }
          ]
        }
      ];
    }

    renderClinicalAssistant() {
      const container = document.getElementById('doctorClinicalAssistantContainer');
      if (!container) return;
      const protocols = this.getClinicalProtocols();

      container.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;">
          ${protocols.map((p, idx) => `
            <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:16px;box-shadow:var(--shadow-panel);display:flex;flex-direction:column;justify-content:space-between;">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
                  <strong style="color:var(--ink);font-size:15px;">${p.disease}</strong>
                  <span class="badge" style="background:rgba(2,132,199,0.15);color:#0284c7;font-weight:700;font-size:10px;">ICD: ${p.icd}</span>
                </div>
                <div style="font-size:12px;color:var(--muted);margin-bottom:8px;">
                  <strong>Symptoms:</strong> ${p.symptoms.join(', ')}
                </div>
                <div style="background:rgba(0,0,0,0.15);padding:8px 10px;border-radius:8px;font-size:11px;color:var(--ink-dim);margin-bottom:10px;">
                  <strong style="color:var(--ink);display:block;margin-bottom:2px;">🔬 Recommended Labs:</strong>
                  ${p.investigations.join(' · ')}
                </div>
                <div style="font-size:11px;color:var(--ink-dim);margin-bottom:10px;">
                  <strong style="color:var(--ink);display:block;margin-bottom:2px;">💊 Standard Jan Aushadhi Rx:</strong>
                  ${p.genericRx.map(g => `<div style="display:flex;justify-content:space-between;"><span>• ${g.name} (${g.dosage})</span><strong style="color:#16a34a;">${g.price}</strong></div>`).join('')}
                </div>
              </div>
              <button class="auth-btn-primary" style="width:100%;padding:8px;font-size:12px;background:linear-gradient(135deg, #0284c7, #0369a1);border:none;margin-top:6px;" onclick="doctorController.applyProtocolToPrescription(${idx})">
                + Auto-Fill in e-Prescription
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }

    applyProtocolToPrescription(idx) {
      const p = this.getClinicalProtocols()[idx];
      if (!p) return;
      
      const diagInput = document.getElementById('inCallRxDiagnosis') || document.getElementById('consultDiagnosis');
      const adviceInput = document.getElementById('inCallRxAdvice') || document.getElementById('consultAdvice');
      
      if (diagInput) diagInput.value = p.disease;
      if (adviceInput) adviceInput.value = p.protocols.join('. ') + '.';
      
      if (global.toast) global.toast('✓ Applied ' + p.disease + ' protocol to e-Prescription.');
    }

    // -------------------------------------------------------------
    // DIRECT PATIENT CALL DIALER FOR DOCTOR
    // -------------------------------------------------------------
    openDoctorDirectCallModal() {
      let modal = document.getElementById('doctorDirectCallModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'doctorDirectCallModal';
        modal.className = 'modal-overlay';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(15, 23, 42, 0.85)';
        modal.style.zIndex = '100000';
        modal.style.display = 'none';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '16px';
        document.body.appendChild(modal);
      }

      const patients = (this.store ? this.store.getState().patients : []) || [];
      const optionsHtml = patients.length 
        ? patients.map(p => `<option value="${p.name}" data-phone="${p.phone}">👤 ${p.name} (Phone: ${p.phone} · ${p.village || 'Village'})</option>`).join('')
        : '<option value="Citizen Patient">Citizen Patient (9876543210)</option>';

      modal.innerHTML = `
        <div class="modal-card" style="max-width:500px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:26px;">📞</span>
              <div>
                <h3 style="color:var(--ink);font-size:17px;font-weight:800;">Direct Patient Video Call</h3>
                <small style="color:var(--muted);">Initiate On-Demand Video Teleconsultation</small>
              </div>
            </div>
            <button onclick="document.getElementById('doctorDirectCallModal').style.display='none'" style="background:none;border:none;font-size:20px;color:var(--muted);cursor:pointer;">✕</button>
          </div>
          <form onsubmit="doctorController.submitDirectPatientCall(event)">
            <div style="margin-bottom:12px;">
              <label style="font-size:11px;font-weight:700;color:var(--ink-dim);display:block;margin-bottom:3px;">Select Registered Beneficiary *</label>
              <select id="docDirectCallPatientSelect" class="input-field" style="height:44px;" required>
                ${optionsHtml}
              </select>
            </div>
            <div style="margin-bottom:16px;">
              <label style="font-size:11px;font-weight:700;color:var(--ink-dim);display:block;margin-bottom:3px;">Consultation Reason / Clinical Notes *</label>
              <input type="text" id="docDirectCallReason" class="input-field" placeholder="e.g. Follow-up review of blood sugar / blood pressure" required value="Routine Teleconsultation & Health Checkup">
            </div>
            <div style="display:flex;justify-content:flex-end;gap:8px;">
              <button type="button" class="btn-glass" onclick="document.getElementById('doctorDirectCallModal').style.display='none'">Cancel</button>
              <button type="submit" class="auth-btn-primary" style="background:linear-gradient(135deg, #16a34a, #15803d);border:none;">
                📹 Start Video Call Now
              </button>
            </div>
          </form>
        </div>
      `;
      modal.style.display = 'flex';
    }

    submitDirectPatientCall(e) {
      if (e) e.preventDefault();
      const patSelect = document.getElementById('docDirectCallPatientSelect');
      const reasonInput = document.getElementById('docDirectCallReason');
      
      const patName = patSelect ? patSelect.value : 'Citizen Patient';
      const patPhone = patSelect && patSelect.options[patSelect.selectedIndex] ? patSelect.options[patSelect.selectedIndex].getAttribute('data-phone') : '9876543210';
      const reason = reasonInput ? reasonInput.value.trim() : 'Teleconsultation Follow-up';

      const modal = document.getElementById('doctorDirectCallModal');
      if (modal) modal.style.display = 'none';

      const doctorUser = (this.store && this.store.getState().session && this.store.getState().session.user) || { name: 'Dr. Priya Sharma, MBBS, MD' };

      if (global.videoCallController) {
        global.videoCallController.startVideoCall({
          callerRole: 'doctor',
          callerName: doctorUser.name || 'Dr. Priya Sharma, MBBS, MD',
          callerPhone: doctorUser.phone || '9848011220',
          recipientRole: 'patient',
          recipientName: patName,
          recipientPhone: patPhone || '9876543210',
          patientName: patName,
          complaint: reason
        });
      }
    }


    renderConsultQueue() {
      const el = document.getElementById('doctorQueueTableBody');
      if (!el || !this.store) return;
      const queue = this.store.getState().consultQueue || [];

      if (!queue.length) {
        el.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--muted);">${this.t('no_patients_queue', 'No patients waiting in queue. Tap "+ Add Patient" above.')}</td></tr>`;
        return;
      }

      el.innerHTML = queue.map(q => `
        <tr>
          <td><strong style="color:var(--primary-bright);font-family:'IBM Plex Mono',monospace;font-size:14px;">${q.token}</strong></td>
          <td>
            <strong style="color:var(--ink);display:block;font-size:14px;">${q.patientName}</strong>
            <small style="color:var(--muted);font-size:11px;">${this.t('age_label', 'Age')}: ${q.age} · ${q.gender}</small>
          </td>
          <td style="color:var(--ink);max-width:220px;white-space:normal;font-size:13px;">${this.tr(q.complaint)}</td>
          <td>
            <div style="font-size:12px;color:var(--ink-dim);line-height:1.4;">
              <span>BP: <strong style="color:var(--ink);">${q.vitals.bp || '120/80'}</strong></span> | 
              <span>SpO2: <strong style="color:var(--ink);">${q.vitals.spo2 || '98%'}</strong></span><br>
              <span>Temp: <strong style="color:var(--ink);">${q.vitals.temp || '98.6°F'}</strong></span> | 
              <span>Pulse: <strong style="color:var(--ink);">${q.vitals.pulse || '78'}</strong></span>
            </div>
          </td>
          <td>
            <span class="badge" style="background:${q.triage === 'Red' ? 'rgba(220,38,38,0.2)' : q.triage === 'Yellow' ? 'rgba(217,119,6,0.2)' : 'rgba(22,163,74,0.2)'};color:${q.triage === 'Red' ? '#ef4444' : q.triage === 'Yellow' ? '#f59e0b' : '#22c55e'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;border:1px solid ${q.triage === 'Red' ? '#ef4444' : q.triage === 'Yellow' ? '#f59e0b' : '#22c55e'};">
              ${q.triage}
            </span>
          </td>
          <td style="color:var(--muted);font-size:12px;">${q.time}</td>
          <td>
            <button class="auth-btn-primary" style="padding:6px 12px;font-size:12px;" onclick="doctorController.startConsult('${q.id}')">
              🩺 ${this.t('btn_consult_prescribe', 'Consult & Prescribe')}
            </button>
          </td>
        </tr>
      `).join('');
    }

    startConsult(queueId) {
      const q = this.store.getState().consultQueue.find(item => item.id === queueId);
      if (!q) return;
      this.selectedPatient = q;

      // Localize Modal Title
      const titleEl = document.getElementById('consultPatientHeader') || document.getElementById('consultActivePatientName');
      if (titleEl) {
        titleEl.innerHTML = `${this.t('consulting_label', 'Consulting')}: <strong style="color:var(--primary-bright);">${q.patientName} (${q.token})</strong> — ${q.age} ${this.t('years_short', 'Yrs')}, ${q.gender}`;
      }

      // Localize Vitals & Chief Complaint Box
      const vitalsEl = document.getElementById('consultRecordedComplaint') || document.getElementById('consultActiveVitals');
      if (vitalsEl) {
        vitalsEl.innerHTML = `<strong>${this.t('complaint_label', 'Chief Complaint')}:</strong> ${this.tr(q.complaint)}<br><span style="opacity:0.85;">BP: ${q.vitals.bp}, SpO2: ${q.vitals.spo2}, Temp: ${q.vitals.temp}, Pulse: ${q.vitals.pulse}</span>`;
      }

      // Localize Diagnosis Default Value
      const diagInput = document.getElementById('rxDiagnosis');
      if (diagInput) {
        diagInput.value = this.tr(q.complaint.includes('Fever') ? 'Acute Viral Fever' : q.complaint.includes('Trimester') ? 'ANC Routine Checkup' : 'Clinical Evaluation');
      }

      // Localize Advice Default Value
      const adviceInput = document.getElementById('rxAdvice');
      if (adviceInput) {
        adviceInput.value = this.t('default_advice_fever', 'Drink plenty of clean boiled water. Rest well.');
      }

      // Populate Dynamic Prescribed Medicines
      const allMeds = (this.store ? this.store.getState().medicines : []) || [];
      const container = document.getElementById('rxMedicinesContainer');
      if (container) {
        container.innerHTML = '';
        const defaultMed1 = q.complaint.includes('Fever') ? 'Paracetamol 650mg' :
                            q.complaint.includes('Trimester') ? 'Iron & Folic Acid' :
                            q.complaint.includes('Chest') ? 'Amlodipine 5mg' : 'Paracetamol 650mg';
        this.addMedicineRow({ selectedName: defaultMed1, dosage: '1 Tab Morning & Night after food' });
        
        const defaultMed2 = q.complaint.includes('Fever') ? 'Vitamin C + Zinc' :
                            q.complaint.includes('Trimester') ? 'Vitamin C + Zinc' : '';
        this.addMedicineRow({ selectedName: defaultMed2, dosage: '1 Tab Noon after food' });
      }

      // Backward compatibility for legacy select elements if present
      const med1Select = document.getElementById('rxMed1');
      if (med1Select) med1Select.innerHTML = this.buildMedicineOptionsHtml(allMeds, 'Paracetamol 650mg');
      const med2Select = document.getElementById('rxMed2');
      if (med2Select) med2Select.innerHTML = this.buildMedicineOptionsHtml(allMeds, '');

      // Apply any data-i18n inside modal
      if (global.i18n) global.i18n.applyTranslations(global.i18n.currentLang);

      const modal = document.getElementById('doctorConsultModal');
      if (modal) modal.style.display = 'flex';
    }

    buildMedicineOptionsHtml(allMeds, selectedValue) {
      const list = (allMeds && allMeds.length) ? allMeds : [
        { name: 'Paracetamol 650mg', genericPrice: 8, brandPrice: 34 },
        { name: 'Amoxicillin 500mg', genericPrice: 28, brandPrice: 110 },
        { name: 'Metformin 500mg', genericPrice: 12, brandPrice: 58 },
        { name: 'Amlodipine 5mg', genericPrice: 6, brandPrice: 38 },
        { name: 'ORS Powder Sachets', genericPrice: 5, brandPrice: 24 },
        { name: 'Cetirizine 10mg', genericPrice: 4, brandPrice: 22 },
        { name: 'Azithromycin 500mg', genericPrice: 35, brandPrice: 130 },
        { name: 'Pantoprazole 40mg', genericPrice: 18, brandPrice: 85 },
        { name: 'Vitamin C + Zinc', genericPrice: 15, brandPrice: 75 },
        { name: 'Iron & Folic Acid', genericPrice: 4, brandPrice: 32 },
        { name: 'Ibuprofen 400mg', genericPrice: 7, brandPrice: 30 },
        { name: 'Ciprofloxacin 500mg', genericPrice: 22, brandPrice: 95 }
      ];

      let html = `<option value="">-- Select Generic Medicine --</option>`;
      html += list.map(m => {
        const isSel = selectedValue && selectedValue === m.name ? 'selected' : '';
        const brand = m.brandPrice || (m.genericPrice * 4);
        return `<option value="${m.name}" data-gen="${m.genericPrice}" data-brand="${brand}" ${isSel}>${m.name} (₹${m.genericPrice} vs ₹${brand})</option>`;
      }).join('');
      const isCustomSel = selectedValue === '__custom__' ? 'selected' : '';
      html += `<option value="__custom__" data-gen="15" ${isCustomSel}>✍️ Other / Write Custom Medicine...</option>`;
      return html;
    }

    addMedicineRow(data = {}) {
      const container = document.getElementById('rxMedicinesContainer');
      if (!container) return;

      const rowIndex = container.children.length + 1;
      const row = document.createElement('div');
      row.className = 'rx-medicine-row';
      row.style.cssText = 'background:var(--glass-1);border:1px solid var(--glass-border);border-radius:10px;padding:10px 12px;margin-bottom:2px;';

      const allMeds = (this.store ? this.store.getState().medicines : []) || [];
      const optionsHtml = this.buildMedicineOptionsHtml(allMeds, data.selectedName);

      const defaultDosage = data.dosage || (rowIndex === 1 ? '1 Tab Morning & Night after food' : rowIndex === 2 ? '1 Tab Noon after food' : '1 Tab Once Daily after food');

      row.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span class="rx-med-label" style="font-size:11px;font-weight:700;color:var(--ink-dim);text-transform:uppercase;">Medicine #${rowIndex}</span>
          <button type="button" class="btn-glass rx-remove-med-btn" onclick="doctorController.removeMedicineRow(this)" style="font-size:11px;padding:2px 8px;color:#ef4444;border-color:rgba(239,68,68,0.3);border-radius:6px;cursor:pointer;line-height:1;" title="Remove this medicine">✕ Remove</button>
        </div>
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:8px;">
          <div>
            <label style="font-size:10px;font-weight:700;color:var(--muted);display:block;margin-bottom:2px;">GENERIC DRUG / INVENTORY</label>
            <select class="input-field rx-med-select" onchange="doctorController.onMedicineSelectChange(this)" style="height:38px;font-size:12px;width:100%;">
              ${optionsHtml}
            </select>
          </div>
          <div>
            <label style="font-size:10px;font-weight:700;color:var(--muted);display:block;margin-bottom:2px;">DOSAGE SCHEDULE</label>
            <input type="text" class="input-field rx-med-dosage" placeholder="e.g. 1 Tab BD after food" value="${defaultDosage}" style="height:38px;font-size:12px;width:100%;">
          </div>
        </div>
        <div class="rx-custom-med-wrap" style="display:${data.isCustom ? 'block' : 'none'};margin-top:6px;">
          <label style="font-size:10px;font-weight:700;color:var(--primary-bright);display:block;margin-bottom:2px;">✍️ CUSTOM MEDICINE NAME & STRENGTH *</label>
          <input type="text" class="input-field rx-med-custom-name" placeholder="Type medicine name (e.g. Azithromycin 500mg, Cough Syrup...)" value="${data.customName || ''}" style="height:36px;font-size:12px;width:100%;">
        </div>
      `;

      container.appendChild(row);
      this.updateMedicineRowLabels();
    }

    removeMedicineRow(btn) {
      const row = btn.closest('.rx-medicine-row');
      if (!row) return;
      const container = document.getElementById('rxMedicinesContainer');
      if (!container) return;
      if (container.children.length <= 1) {
        if (typeof window.toast === 'function') window.toast('At least one medicine is required.');
        return;
      }
      row.remove();
      this.updateMedicineRowLabels();
    }

    updateMedicineRowLabels() {
      const container = document.getElementById('rxMedicinesContainer');
      if (!container) return;
      const rows = container.querySelectorAll('.rx-medicine-row');
      rows.forEach((r, idx) => {
        const lbl = r.querySelector('.rx-med-label');
        if (lbl) lbl.textContent = `Medicine #${idx + 1}${idx === 0 ? ' *' : ''}`;
        const removeBtn = r.querySelector('.rx-remove-med-btn');
        if (removeBtn) {
          removeBtn.style.display = rows.length > 1 ? 'inline-block' : 'none';
        }
      });
    }

    onMedicineSelectChange(selectEl) {
      const row = selectEl.closest('.rx-medicine-row');
      if (!row) return;
      const customWrap = row.querySelector('.rx-custom-med-wrap');
      const customInput = row.querySelector('.rx-med-custom-name');
      if (selectEl.value === '__custom__') {
        if (customWrap) customWrap.style.display = 'block';
        if (customInput) customInput.focus();
      } else {
        if (customWrap) customWrap.style.display = 'none';
      }
    }

    closeConsultModal() {
      const modal = document.getElementById('doctorConsultModal');
      if (modal) modal.style.display = 'none';
      this.selectedPatient = null;
    }

    openAddQueueModal() {
      const m = document.getElementById('addQueueModal');
      if (m) m.style.display = 'flex';
    }

    closeAddQueueModal() {
      const m = document.getElementById('addQueueModal');
      if (m) m.style.display = 'none';
    }

    submitAddQueue(e) {
      if (e) e.preventDefault();
      const patientName = document.getElementById('qPatientName').value.trim();
      const age = parseInt(document.getElementById('qPatientAge').value, 10) || 30;
      const gender = document.getElementById('qPatientGender').value;
      const complaint = document.getElementById('qComplaint').value.trim();
      const bp = document.getElementById('qBp').value.trim() || '120/80';
      const temp = document.getElementById('qTemp').value.trim() || '98.6°F';
      const triage = document.getElementById('qTriage').value;

      if (!patientName) {
        alert('Please enter patient name');
        return;
      }

      this.store.addToQueue({
        patientName,
        age,
        gender,
        complaint: complaint || 'General Checkup',
        vitals: { bp, spo2: '98%', temp, pulse: '78 bpm' },
        triage
      });

      this.closeAddQueueModal();
      if (typeof window.toast === 'function') window.toast('✓ Walk-in patient added to queue');
    }

    // -------------------------------------------------------------
    // 100% REGIONAL LANGUAGE PRESCRIPTION HISTORY CARDS
    // -------------------------------------------------------------
        deletePrescription(rxId) {
      if (confirm('Are you sure you want to delete this issued prescription record?')) {
        if (this.store) {
          this.store.deletePrescription(rxId);
          if (typeof window.toast === 'function') {
            window.toast('🗑️ Prescription record deleted');
          }
        }
      }
    }

    renderPrescriptionHistory() {
      const el = document.getElementById('doctorPrescriptionsHistory') || document.getElementById('doctorRxHistoryList');
      if (!el || !this.store) return;
      const rxList = this.store.getState().prescriptions || [];

      if (!rxList.length) {
        el.innerHTML = `<div style="text-align:center;padding:24px 16px;background:var(--glass-2);border-radius:14px;border:1px dashed var(--glass-border);color:var(--muted);grid-column:1/-1;">No recent prescriptions generated yet.</div>`;
        return;
      }

      el.innerHTML = rxList.map(rx => {
        const medsList = Array.isArray(rx.medicines) ? rx.medicines : [];
        return `
          <div class="rx-glass-card" style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:16px;padding:18px;box-shadow:var(--shadow-panel);">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
              <div>
                <strong style="color:var(--primary-bright);font-size:16px;display:block;">${rx.patientName} (${rx.token || 'Rx'})</strong>
                <small style="color:var(--muted);font-size:12px;font-weight:700;">👨‍⚕️ Prescribed by: ${rx.doctorName || 'Medical Officer'}</small>
              </div>
              <div style="display:flex;gap:6px;align-items:center;">
                <span class="badge" style="background:rgba(22,163,74,0.15);color:#16a34a;font-size:11px;font-weight:700;padding:4px 8px;border-radius:12px;">
                  ✓ ${rx.id || 'e-Rx'}
                </span>
                ${(global.patientController && typeof global.patientController.downloadPrescriptionPdf === 'function') ? `
                  <button class="auth-btn-primary" style="padding:6px 10px;font-size:11px;background:#0284c7;border-color:#0369a1;border-radius:6px;cursor:pointer;" onclick="patientController.downloadPrescriptionPdf('${rx.id}')">
                    📥 PDF
                  </button>
                  <button class="btn-glass" style="padding:6px 10px;font-size:11px;color:#ef4444;border-color:rgba(239,68,68,0.3);border-radius:6px;cursor:pointer;" onclick="doctorController.deletePrescription('${rx.id}')">
                    🗑️
                  </button>
                ` : ''}
              </div>
            </div>

            <div style="margin-bottom:10px;">
              <span style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;">Clinical Diagnosis:</span>
              <p style="font-size:14px;color:var(--ink);font-weight:700;margin-top:2px;">🩺 ${rx.diagnosis}</p>
            </div>

            <div style="margin-bottom:10px;">
              <span style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;">Medicines:</span>
              <div style="background:var(--glass-1);border:1px solid var(--glass-border);padding:8px 12px;border-radius:10px;margin-top:4px;font-size:12px;">
                ${medsList.map(m => `
                  <div style="color:var(--ink);padding:2px 0;">• ${m.name || m} (${m.dosage || 'As directed'})</div>
                `).join('')}
              </div>
            </div>

            ${rx.advice ? `
              <div style="font-size:11px;color:var(--ink-dim);background:rgba(2,132,199,0.06);padding:6px 10px;border-radius:6px;">
                <strong>Advice:</strong> ${rx.advice}
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }
    submitPrescription(e) {
      if (e) e.preventDefault();
      const patient = this.selectedPatient || { id: 'Q-01', patientName: 'Citizen Patient', age: 35, gender: 'M' };
      const diagnosis = document.getElementById('rxDiagnosis') ? document.getElementById('rxDiagnosis').value.trim() : 'Clinical Evaluation';
      const advice = document.getElementById('rxAdvice') ? document.getElementById('rxAdvice').value.trim() : 'Take prescribed doses and rest.';
      
      const medicines = [];
      const container = document.getElementById('rxMedicinesContainer');

      if (container) {
        const rows = container.querySelectorAll('.rx-medicine-row');
        rows.forEach(row => {
          const select = row.querySelector('.rx-med-select');
          const dosageInput = row.querySelector('.rx-med-dosage');
          const customInput = row.querySelector('.rx-med-custom-name');

          if (!select) return;
          let medName = select.value;
          let genPrice = 15;

          if (medName === '__custom__') {
            medName = customInput ? customInput.value.trim() : '';
            genPrice = 15;
          } else if (medName) {
            const opt = select.options ? select.options[select.selectedIndex] : null;
            if (opt && opt.getAttribute && opt.getAttribute('data-gen')) {
              genPrice = parseFloat(opt.getAttribute('data-gen')) || 15;
            }
          }

          const dosage = dosageInput ? dosageInput.value.trim() : '1 Tab TDS after food';

          if (medName) {
            medicines.push({
              name: medName,
              genericPrice: genPrice,
              dosage: dosage || '1 Tab as directed'
            });
          }
        });
      }

      // Backward fallback if dynamic container was absent
      if (!medicines.length) {
        const med1Select = document.getElementById('rxMed1');
        const med2Select = document.getElementById('rxMed2');
        if (med1Select && med1Select.value) {
          const opt = med1Select.options ? med1Select.options[med1Select.selectedIndex] : null;
          const genPrice = opt && opt.getAttribute && opt.getAttribute('data-gen') ? parseFloat(opt.getAttribute('data-gen')) : 15;
          medicines.push({
            name: med1Select.value,
            genericPrice: genPrice || 15,
            dosage: '1 Tab Morning & Night after food'
          });
        }
        if (med2Select && med2Select.value) {
          const opt = med2Select.options ? med2Select.options[med2Select.selectedIndex] : null;
          const genPrice = opt && opt.getAttribute && opt.getAttribute('data-gen') ? parseFloat(opt.getAttribute('data-gen')) : 10;
          medicines.push({
            name: med2Select.value,
            genericPrice: genPrice || 10,
            dosage: '1 Tab Noon after food'
          });
        }
      }

      if (!diagnosis) {
        alert('Please enter clinical diagnosis');
        return;
      }

      if (!medicines.length) {
        alert('Please select or write at least one medicine to prescribe.');
        return;
      }

      const activeDoctor = (this.store && this.store.getState().session && this.store.getState().session.user) || { name: 'Dr. Aarav Sharma', location: 'District CHC' };

      const newRx = this.store.completeConsult(patient.id, {
        doctorName: activeDoctor.name || 'Dr. Medical Officer',
        patientName: patient.patientName,
        patientPhone: patient.patientPhone,
        abhaId: patient.abhaId,
        diagnosis,
        advice,
        medicines
      });

      this.closeConsultModal();
      this.renderQueue();
      this.renderPrescriptionHistory();

      if (global.patientController && typeof global.patientController.renderPrescriptions === 'function') {
        global.patientController.renderPrescriptions();
      }

      if (typeof window.toast === 'function') {
        window.toast('✓ Issued e-Prescription with ' + medicines.length + ' medicine(s) for ' + patient.patientName + ' (Rx ID: ' + newRx.id + ')');
      }
    }
  }

  global.doctorController = new DoctorController();

})(typeof window !== 'undefined' ? window : this);
