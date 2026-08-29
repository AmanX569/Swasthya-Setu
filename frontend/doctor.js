/**
 * =========================================================
 * SWASTHYA SETU - DOCTOR CLINICAL DESK (doctor.js)
 * High-Contrast Dark Mode & Glassmorphic Prescriptions
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

    renderConsultQueue() {
      const el = document.getElementById('doctorQueueTableBody');
      if (!el || !this.store) return;
      const queue = this.store.getState().consultQueue || [];

      if (!queue.length) {
        el.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--muted);">No patients waiting in queue. Tap "+ Add Patient" above.</td></tr>`;
        return;
      }

      el.innerHTML = queue.map(q => `
        <tr>
          <td><strong style="color:var(--primary-bright);font-family:'IBM Plex Mono',monospace;font-size:14px;">${q.token}</strong></td>
          <td>
            <strong style="color:var(--ink);display:block;font-size:14px;">${q.patientName}</strong>
            <small style="color:var(--muted);font-size:11px;">Age: ${q.age} · ${q.gender}</small>
          </td>
          <td style="color:var(--ink);max-width:220px;white-space:normal;font-size:13px;">${q.complaint}</td>
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
              🩺 Consult & Prescribe
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
        titleEl.textContent = `Consulting: ${q.patientName} (${q.token}) — Age ${q.age}, ${q.gender}`;
      }
      const vitalsEl = document.getElementById('consultActiveVitals');
      if (vitalsEl) {
        vitalsEl.textContent = `Chief Complaint: ${q.complaint} | Vitals: BP ${q.vitals.bp}, SpO2 ${q.vitals.spo2}, Temp ${q.vitals.temp}, Pulse ${q.vitals.pulse}`;
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

      const diagnosis = document.getElementById('rxDiagnosis').value.trim() || 'Clinical Review';
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
        window.toast('✓ Prescription Generated & Saved to Health Locker!');
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

    renderPrescriptionHistory() {
      const el = document.getElementById('doctorRxHistoryList');
      if (!el || !this.store) return;
      const rxList = this.store.getState().prescriptions || [];

      if (!rxList.length) {
        el.innerHTML = `<div style="text-align:center;padding:16px;color:var(--muted);">No recent prescriptions generated yet.</div>`;
        return;
      }

      el.innerHTML = rxList.slice(0, 5).map(rx => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow-panel);">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
            <strong style="color:var(--primary-bright);font-size:16px;">${rx.patientName} (${rx.token || 'Rx'})</strong>
            <small style="color:var(--muted);">${rx.date}</small>
          </div>
          <p style="font-size:14px;color:var(--ink);margin-bottom:8px;"><strong>Diagnosis:</strong> ${rx.diagnosis}</p>
          <div style="background:var(--glass-1);border:1px solid var(--glass-border);padding:10px 14px;border-radius:10px;font-size:13px;color:var(--ink-dim);">
            ${rx.medicines.map(m => `• <strong style="color:var(--ink);">${m.name}</strong> (${m.dosage})`).join('<br>')}
          </div>
          ${rx.advice ? `<p style="font-size:12px;color:var(--muted);margin-top:8px;"><strong>Advice:</strong> ${rx.advice}</p>` : ''}
        </div>
      `).join('');
    }
  }

  global.doctorController = new DoctorController();

})(typeof window !== 'undefined' ? window : this);
