/**
 * =========================================================
 * SWASTHYA SETU - DOCTOR CLINICAL DESK (doctor.js)
 * 100% Standalone Teleconsultation & e-Prescription Engine
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

    renderConsultQueue() {
      const el = document.getElementById('doctorQueueTableBody');
      if (!el || !this.store) return;
      const queue = this.store.getState().consultQueue || [];

      if (!queue.length) {
        el.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:24px;color:#64748b;">No patients waiting in queue. Tap "+ Add Walk-in Patient" to admit.</td></tr>`;
        return;
      }

      el.innerHTML = queue.map(q => `
        <tr>
          <td><strong style="color:#0052cc;font-family:'IBM Plex Mono',monospace;">${q.token}</strong></td>
          <td>
            <strong style="color:#0f172a;display:block;">${q.patientName}</strong>
            <small style="color:#64748b;">Age: ${q.age} · ${q.gender}</small>
          </td>
          <td style="color:#334155;max-width:200px;">${q.complaint}</td>
          <td>
            <div style="font-size:11px;color:#475569;">
              <span>BP: <strong>${q.vitals.bp || '120/80'}</strong></span> | 
              <span>SpO2: <strong>${q.vitals.spo2 || '98%'}</strong></span><br>
              <span>Temp: <strong>${q.vitals.temp || '98.6°F'}</strong></span> | 
              <span>Pulse: <strong>${q.vitals.pulse || '78'}</strong></span>
            </div>
          </td>
          <td>
            <span class="badge" style="background:${q.triage === 'Red' ? '#fee2e2' : q.triage === 'Yellow' ? '#fef3c7' : '#dcfce7'};color:${q.triage === 'Red' ? '#dc2626' : q.triage === 'Yellow' ? '#d97706' : '#16a34a'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">
              ${q.triage}
            </span>
          </td>
          <td style="color:#64748b;font-size:12px;">${q.time}</td>
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
        window.toast('✓ Prescription Generated & Sent to Patient ABHA Health Locker!');
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
        el.innerHTML = `<div style="text-align:center;padding:16px;color:#64748b;">No recent prescriptions generated yet.</div>`;
        return;
      }

      el.innerHTML = rxList.slice(0, 5).map(rx => `
        <div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;padding:14px;margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <strong style="color:#0052cc;font-size:15px;">${rx.patientName} (${rx.token || 'Rx'})</strong>
            <small style="color:#64748b;">${rx.date}</small>
          </div>
          <p style="font-size:13px;color:#0f172a;margin-bottom:6px;"><strong>Diagnosis:</strong> ${rx.diagnosis}</p>
          <div style="background:#f8fafc;padding:8px 12px;border-radius:8px;font-size:12px;color:#334155;">
            ${rx.medicines.map(m => `• ${m.name} (${m.dosage})`).join('<br>')}
          </div>
        </div>
      `).join('');
    }
  }

  global.doctorController = new DoctorController();

})(typeof window !== 'undefined' ? window : this);
