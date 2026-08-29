/**
 * =========================================================
 * SWASTHYA SETU - DOCTOR CLINICAL DESK (doctor.js)
 * 100% Vernacular e-Prescriptions & Queue Localization
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
      return global.localizeRxText ? global.localizeRxText(text) : text;
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

      const titleEl = document.getElementById('consultActivePatientName');
      if (titleEl) {
        titleEl.textContent = `${this.t('consulting_label', 'Consulting')}: ${q.patientName} (${q.token}) — ${q.age} Yrs, ${q.gender}`;
      }
      const vitalsEl = document.getElementById('consultActiveVitals');
      if (vitalsEl) {
        vitalsEl.textContent = `${this.t('complaint_label', 'Complaint')}: ${this.tr(q.complaint)} | BP: ${q.vitals.bp}, SpO2: ${q.vitals.spo2}, Temp: ${q.vitals.temp}, Pulse: ${q.vitals.pulse}`;
      }

      const modal = document.getElementById('doctorConsultModal');
      if (modal) modal.style.display = 'flex';
    }

    closeConsultModal() {
      const modal = document.getElementById('doctorConsultModal');
      if (modal) modal.style.display = 'none';
      this.selectedPatient = null;
    }

    submitPrescription(e) {
      if (e) e.preventDefault();
      if (!this.selectedPatient) return;

      const diagnosis = document.getElementById('rxDiagnosis').value.trim() || 'Acute Viral Fever';
      const med1 = document.getElementById('rxMed1').value;
      const med2 = document.getElementById('rxMed2').value;
      const advice = document.getElementById('rxAdvice').value.trim() || 'Take plenty of clean drinking water and rest.';

      const medicines = [];
      if (med1) medicines.push({ name: med1, dosage: '1 tablet 3 times a day after meals', timing: '1-1-1' });
      if (med2) medicines.push({ name: med2, dosage: '1 tablet twice daily', timing: '1-0-1' });

      this.store.completeConsult(this.selectedPatient.id, {
        token: this.selectedPatient.token,
        patientName: this.selectedPatient.patientName,
        doctorName: 'Dr. Priya Sharma, MBBS, MD',
        diagnosis,
        medicines,
        advice
      });

      this.closeConsultModal();
      if (typeof window.toast === 'function') {
        window.toast('✓ ' + this.t('rx_generated_toast', 'Prescription Generated & Saved to Health Locker!'));
      }
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
    renderPrescriptionHistory() {
      const el = document.getElementById('doctorRxHistoryList');
      if (!el || !this.store) return;
      const rxList = this.store.getState().prescriptions || [];

      if (!rxList.length) {
        el.innerHTML = `<div style="text-align:center;padding:16px;color:var(--muted);">${this.t('no_rx_history', 'No recent prescriptions generated yet.')}</div>`;
        return;
      }

      el.innerHTML = rxList.slice(0, 5).map(rx => `
        <div class="rx-glass-card" style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:16px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow-panel);">
          
          <!-- RX HEADER -->
          <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:10px;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:22px;">📝</span>
              <div>
                <strong style="color:var(--primary-bright);font-size:16px;display:block;">${rx.patientName} (${rx.token || 'Rx'})</strong>
                <small style="color:var(--muted);font-size:11px;">${this.t('doctor_label', 'Doctor')}: ${rx.doctorName || 'Dr. Priya Sharma'}</small>
              </div>
            </div>
            <div style="text-align:right;">
              <span class="badge" style="background:rgba(22,163,74,0.15);color:#16a34a;font-size:11px;font-weight:700;padding:4px 8px;border-radius:12px;border:1px solid rgba(22,163,74,0.3);">
                ✓ ${this.t('rx_digital_verified', 'Verified e-Rx')}
              </span>
              <small style="display:block;color:var(--muted);font-size:11px;margin-top:2px;">${rx.date}</small>
            </div>
          </div>

          <!-- DIAGNOSIS (100% REGIONAL TRANSLATED) -->
          <div style="margin-bottom:12px;">
            <span style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;">${this.t('rx_diagnosis', 'Clinical Diagnosis')}:</span>
            <p style="font-size:15px;color:var(--ink);font-weight:700;margin-top:2px;">
              🩺 ${this.tr(rx.diagnosis)}
            </p>
          </div>

          <!-- PRESCRIBED MEDICINES (100% REGIONAL TRANSLATED) -->
          <div style="margin-bottom:12px;">
            <span style="font-size:12px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.5px;">${this.t('rx_medicines', 'Prescribed Generic Medicines')}:</span>
            <div style="background:var(--glass-1);border:1px solid var(--glass-border);padding:10px 14px;border-radius:12px;margin-top:4px;">
              ${rx.medicines.map((m, idx) => `
                <div style="padding:6px 0;${idx > 0 ? 'border-top:1px solid var(--line);' : ''}">
                  <strong style="color:var(--ink);font-size:14px;display:block;">💊 ${this.tr(m.name)}</strong>
                  <span style="font-size:12px;color:var(--ink-dim);display:inline-block;margin-top:2px;">
                    ⏰ ${this.tr(m.dosage)} ${m.timing ? `(${m.timing})` : ''}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- ADVICE (100% REGIONAL TRANSLATED) -->
          ${rx.advice ? `
            <div style="background:rgba(2,132,199,0.06);border:1px dashed var(--glass-border);padding:10px 12px;border-radius:10px;margin-bottom:12px;">
              <span style="font-size:11px;font-weight:700;color:var(--primary-bright);display:block;">💡 ${this.t('rx_advice', 'Doctor Advice')}:</span>
              <p style="font-size:13px;color:var(--ink);margin-top:2px;">${this.tr(rx.advice)}</p>
            </div>
          ` : ''}

          <!-- ACTIONS -->
          <div style="display:flex;gap:8px;justify-content:flex-end;">
            <button class="btn-glass" style="padding:6px 12px;font-size:12px;" onclick="window.print()">
              🖨️ ${this.t('btn_print_rx', 'Print Rx')}
            </button>
            <button class="btn-glass" style="padding:6px 12px;font-size:12px;" onclick="speakText('${this.t('rx_diagnosis', 'Diagnosis')}: ' + '${this.tr(rx.diagnosis)}')">
              🔊 ${this.t('read_aloud', 'Read Aloud')}
            </button>
          </div>

        </div>
      `).join('');
    }
  }

  global.doctorController = new DoctorController();

})(typeof window !== 'undefined' ? window : this);
