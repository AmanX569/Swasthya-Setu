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
          callerName: doctorUser.name || 'Medical Officer',
          recipientRole: 'patient',
          recipientName: q ? q.patientName : 'Citizen Patient',
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

      el.innerHTML = history.map(c => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;box-shadow:var(--shadow-panel);">
          <div>
            <strong style="color:var(--ink);font-size:14px;display:block;">${c.callerName || c.patientName}</strong>
            <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">Token: ${c.token} · 📅 ${c.date} (${c.time}) · Diagnosis: ${c.diagnosis || 'General Checkup'}</small>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge" style="background:rgba(34,197,94,0.15);color:#16a34a;font-weight:700;font-size:11px;">⏱️ ${c.duration}</span>
            <span class="badge" style="background:rgba(2,132,199,0.15);color:#0284c7;font-weight:700;font-size:11px;">✓ ${c.status}</span>
          </div>
        </div>
      `).join('');
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

            // Localize Dropdown Select Options for Medicines dynamically from Store
      const allMeds = (this.store ? this.store.getState().medicines : []) || [];
      const med1Select = document.getElementById('rxMed1');
      if (med1Select) {
        if (allMeds.length) {
          med1Select.innerHTML = allMeds.map(m => `
            <option value="${m.name}" data-gen="${m.genericPrice}" data-brand="${m.brandPrice}">${m.name} (₹${m.genericPrice} vs ₹${m.brandPrice || (m.genericPrice * 4)})</option>
          `).join('');
        } else {
          med1Select.innerHTML = `
            <option value="Paracetamol 650mg">${this.t('opt_para', 'Paracetamol 650mg Tab (₹8 vs ₹34 Dolo)')}</option>
            <option value="Amoxicillin 500mg">${this.t('opt_amox', 'Amoxicillin 500mg Cap (₹28 vs ₹110)')}</option>
            <option value="Metformin 500mg">${this.t('opt_met', 'Metformin 500mg Tab (₹12 vs ₹58)')}</option>
            <option value="Amlodipine 5mg">${this.t('opt_amlo', 'Amlodipine 5mg Tab (₹6 vs ₹38)')}</option>
            <option value="ORS Powder Sachets">${this.t('opt_ors', 'ORS Sachet Powder (₹5 vs ₹24)')}</option>
          `;
        }
      }

      const med2Select = document.getElementById('rxMed2');
      if (med2Select) {
        if (allMeds.length) {
          med2Select.innerHTML = `<option value="">-- None (Single Medicine) --</option>` + allMeds.map(m => `
            <option value="${m.name}" data-gen="${m.genericPrice}" data-brand="${m.brandPrice}">${m.name} (₹${m.genericPrice} vs ₹${m.brandPrice || (m.genericPrice * 4)})</option>
          `).join('');
        } else {
          med2Select.innerHTML = `
            <option value="Cetirizine 10mg">${this.t('opt_cetz', 'Cetirizine 10mg Tab (₹4 vs ₹22)')}</option>
            <option value="Vitamin C + Zinc">${this.t('opt_vitc', 'Vitamin C + Zinc Tab (₹15 vs ₹75)')}</option>
            <option value="Iron & Folic Acid">${this.t('opt_ifa', 'Iron & Folic Acid Tab (₹4 vs ₹32)')}</option>
          `;
        }
      }

      // Apply any data-i18n inside modal
      if (global.i18n) global.i18n.applyTranslations(global.i18n.currentLang);

      const modal = document.getElementById('doctorConsultModal');
      if (modal) modal.style.display = 'flex';
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
      
      const med1Select = document.getElementById('rxMed1');
      const med2Select = document.getElementById('rxMed2');

      const medicines = [];
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

      if (!diagnosis) {
        alert('Please enter clinical diagnosis');
        return;
      }

      const activeDoctor = (this.store && this.store.getState().session && this.store.getState().session.user) || { name: 'Dr. Aarav Sharma', location: 'District CHC' };

      const newRx = this.store.completeConsult(patient.id, {
        doctorName: activeDoctor.name || 'Dr. Medical Officer',
        patientName: patient.patientName,
        diagnosis,
        advice,
        medicines: medicines.length ? medicines : [{ name: 'Paracetamol 650mg', genericPrice: 8, dosage: '1 Tab TDS' }]
      });

      this.closeConsultModal();
      this.renderQueue();
      this.renderPrescriptionHistory();

      if (global.patientController && typeof global.patientController.renderPrescriptions === 'function') {
        global.patientController.renderPrescriptions();
      }

      if (typeof window.toast === 'function') {
        window.toast('✓ Issued e-Prescription for ' + patient.patientName + ' (Rx ID: ' + newRx.id + ')');
      }
    }
  }

  global.doctorController = new DoctorController();

})(typeof window !== 'undefined' ? window : this);
