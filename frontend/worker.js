/**
 * =========================================================
 * SWASTHYA SETU - ASHA FRONTLINE WORKER HUB (worker.js)
 * 100% Standalone ANC, UIP & Village Home Visit Tracker
 * =========================================================
 */

(function(global) {
  'use strict';

  class WorkerController {
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
      this.renderAncRecords();
      this.renderImmunizations();
      this.renderHomeVisits();
      this.renderMasterRegistry();
      this.renderAshaCallHistory();
    }

    renderAncTable() { this.renderAncRecords(); }
    renderUipTable() { this.renderImmunizations(); }
    renderStats() { this.renderAll(); }

    // 1. ANC High-Risk Mothers
    renderAncRecords() {
      const el = document.getElementById('workerAncTableBody') || document.getElementById('ashaAncTableBody');
      if (!el || !this.store) return;
      const ancs = this.store.getState().ancRecords || [];

      if (!ancs.length) {
        el.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--muted);">No pregnant mothers registered. Tap "+ Register Mother" above.</td></tr>`;
        return;
      }

      el.innerHTML = ancs.map(a => `
        <tr>
          <td><strong style="color:var(--ink);font-size:14px;">${a.motherName}</strong></td>
          <td style="color:var(--ink-dim);">${a.husbandName || '—'}</td>
          <td style="color:var(--muted);">${a.village}</td>
          <td style="color:var(--ink);">${a.weeks} Wks <small style="color:var(--muted);">(EDD: ${a.edd})</small></td>
          <td style="color:var(--ink-dim);">BP: <strong style="color:var(--ink)">${a.bp}</strong> | Hb: <strong style="color:var(--ink)">${a.hb || '11.0 g/dL'}</strong></td>
          <td>
            <span class="badge" style="background:${a.riskLevel.includes('High') ? 'rgba(220,38,38,0.2)' : 'rgba(22,163,74,0.2)'};color:${a.riskLevel.includes('High') ? '#ef4444' : '#22c55e'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;border:1px solid ${a.riskLevel.includes('High') ? '#ef4444' : '#22c55e'};">
              ${a.riskLevel}
            </span>
          </td>
          <td style="color:var(--primary-bright);font-weight:600;">${a.nextVisit}</td>
        </tr>
      `).join('');
    }

    
    // -------------------------------------------------------------
    // ASHA PATIENT REGISTRATION & DOCTOR REFERRAL
    // -------------------------------------------------------------
    openRegisterAndReferModal() {
      const m = document.getElementById('ashaReferModal');
      const docSelect = document.getElementById('referDoctorSelect');
      if (docSelect && this.store) {
        const doctors = (this.store.getState().staff || []).filter(s => s.role === 'doctor');
        docSelect.innerHTML = doctors.map(d => `
          <option value="${d.id || d.staff_code}">🩺 ${d.name} (${d.location || 'PHC/CHC'})</option>
        `).join('');
      }
      if (m) m.style.display = 'flex';
    }

    closeRegisterAndReferModal() {
      const m = document.getElementById('ashaReferModal');
      if (m) m.style.display = 'none';
    }

    submitRegisterAndRefer(e) {
      if (e) e.preventDefault();
      const name = document.getElementById('refPatName').value.trim();
      const phone = document.getElementById('refPatPhone').value.trim();
      const age = parseInt(document.getElementById('refPatAge').value, 10) || 30;
      const gender = document.getElementById('refPatGender').value;
      const bloodGroup = document.getElementById('refPatBlood').value;
      const village = document.getElementById('refPatVillage').value.trim();
      const complaint = document.getElementById('refPatComplaint').value.trim();
      const bp = document.getElementById('refPatBp').value.trim() || '120/80';
      const temp = document.getElementById('refPatTemp').value.trim() || '98.6°F';
      const triage = document.getElementById('refPatTriage').value;
      const docSelect = document.getElementById('referDoctorSelect');
      const doctorId = docSelect ? docSelect.value : null;
      const doctorName = docSelect && docSelect.options[docSelect.selectedIndex] ? docSelect.options[docSelect.selectedIndex].text : 'Medical Officer';

      if (!name || !phone || !complaint) {
        alert('Please fill in patient name, phone number, and reason for referral');
        return;
      }

      const res = this.store.addPatientAndReferToDoctor(
        { name, phone, age, gender, bloodGroup, village, password: '123' },
        { complaint, vitals: { bp, temp, spo2: '98%', pulse: '80 bpm' }, triage, assignedDoctorId: doctorId, assignedDoctorName: doctorName }
      );

      this.closeRegisterAndReferModal();
      this.renderAll();
      if (typeof window.toast === 'function') {
        window.toast('✓ Referred ' + name + ' to ' + doctorName + ' (Token: ' + res.queueItem.token + ')');
      }
    }

    // -------------------------------------------------------------
    // ASHA MASTER FIELD REGISTRY TABLE
    // -------------------------------------------------------------
    renderAshaMasterRegistry() {
      const el = document.getElementById('ashaMasterRegistryBody');
      if (!el || !this.store) return;

      const state = this.store.getState();
      const rows = [];

      // Add referrals & patient registrations
      (state.ashaRegistry || []).forEach(r => {
        rows.push({
          type: '🩺 Doctor Referral',
          name: r.patientName,
          phone: r.phone,
          village: r.village,
          details: r.details + ' → ' + r.target,
          date: r.date
        });
      });

      // Add ANC Records
      (state.ancRecords || []).forEach(a => {
        rows.push({
          type: '🤰 ANC Mother',
          name: a.motherName,
          phone: '—',
          village: a.village,
          details: 'Weeks: ' + a.weeks + ' · BP: ' + a.bp + ' · ' + a.riskLevel,
          date: a.nextVisit || 'Active'
        });
      });

      // Add UIP Immunizations
      (state.immunizations || []).forEach(i => {
        rows.push({
          type: '👶 UIP Vaccine',
          name: i.childName,
          phone: 'Parent: ' + i.parentName,
          village: i.village,
          details: i.lastVaccine + ' (' + i.status + ')',
          date: i.nextDue || 'Recorded'
        });
      });

      // Add Home Visits
      (state.homeVisits || []).forEach(v => {
        rows.push({
          type: '🏡 Home Visit',
          name: v.household,
          phone: 'Members: ' + v.members,
          village: 'Assigned Sector',
          details: v.priority + ' · ' + v.task + ' [' + v.status + ']',
          date: 'Daily Log'
        });
      });

      if (!rows.length) {
        el.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--muted);">No field entries logged yet.</td></tr>';
        return;
      }

      el.innerHTML = rows.map(r => `
        <tr>
          <td><strong style="color:var(--primary-bright);font-size:12px;">${r.type}</strong></td>
          <td><strong style="color:var(--ink);">${r.name}</strong></td>
          <td style="color:var(--muted);">${r.phone}</td>
          <td style="color:var(--ink-dim);font-size:12px;">${r.details}</td>
          <td style="color:var(--muted);font-size:11px;">${r.date}</td>
        </tr>
      `).join('');
    }

    openAddAncModal() {
      const m = document.getElementById('addAncModal');
      if (m) m.style.display = 'flex';
    }

    closeAddAncModal() {
      const m = document.getElementById('addAncModal');
      if (m) m.style.display = 'none';
    }

    submitAddAnc(e) {
      if (e) e.preventDefault();
      const motherName = document.getElementById('ancMotherName').value.trim();
      const husbandName = document.getElementById('ancHusbandName').value.trim();
      const village = document.getElementById('ancVillage').value.trim();
      const weeks = parseInt(document.getElementById('ancWeeks').value, 10) || 12;
      const bp = document.getElementById('ancBp').value.trim() || '110/70';
      const hb = (document.getElementById('ancHb') ? document.getElementById('ancHb').value.trim() : '') || '11.0 g/dL';
      const riskLevel = document.getElementById('ancRisk').value;

      if (!motherName) {
        alert('Please enter mother name');
        return;
      }

      this.store.addAncRecord({
        motherName,
        husbandName,
        village: village || 'Kondapalli Sector',
        weeks,
        edd: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
        bp,
        hb,
        ifaCount: 90,
        riskLevel,
        nextVisit: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
      });

      this.closeAddAncModal();
      if (typeof window.toast === 'function') window.toast('✓ Registered ' + motherName + ' in Maternal ANC Register');
    }

    // 2. Child UIP Immunization
    renderImmunizations() {
      const el = document.getElementById('workerImmTableBody') || document.getElementById('ashaUipTableBody');
      if (!el || !this.store) return;
      const imms = this.store.getState().immunizations || [];

      if (!imms.length) {
        el.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--muted);">No immunization records found. Tap "+ Add Vaccine" above.</td></tr>';
        return;
      }

      el.innerHTML = imms.map(i => `
        <tr>
          <td><strong style="color:var(--ink);font-size:14px;">${i.childName}</strong></td>
          <td style="color:var(--ink-dim);">${i.parentName}</td>
          <td style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">${i.dob}</td>
          <td style="color:var(--ink-dim);">${i.village || 'Kondapalli'}</td>
          <td><strong style="color:var(--primary-bright)">${i.lastVaccine}</strong></td>
          <td style="color:var(--ink-dim);">${i.nextDue}</td>
          <td>
            <span class="badge" style="background:rgba(22,163,74,0.15);color:#16a34a;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">
              ${i.status}
            </span>
          </td>
        </tr>
      `).join('');
    }

    openAddImmModal() {
      const m = document.getElementById('addImmModal');
      if (m) m.style.display = 'flex';
    }

    closeAddImmModal() {
      const m = document.getElementById('addImmModal');
      if (m) m.style.display = 'none';
    }

    submitAddImm(e) {
      if (e) e.preventDefault();
      const childName = document.getElementById('immChildName').value.trim();
      const parentName = document.getElementById('immParentName').value.trim();
      const dob = document.getElementById('immDob').value.trim() || new Date().toISOString().split('T')[0];
      const gender = document.getElementById('immGender').value;
      const village = document.getElementById('immVillage').value.trim() || 'Kondapalli';
      const lastVaccine = document.getElementById('immVaccine').value.trim() || 'BCG + OPV-0';

      if (!childName) {
        alert('Please enter child name');
        return;
      }

      this.store.addImmunization({
        childName,
        parentName,
        dob,
        gender,
        village,
        lastVaccine,
        nextDue: 'Next UIP Camp',
        status: 'Up to Date'
      });

      this.closeAddImmModal();
      if (typeof window.toast === 'function') window.toast('✓ Added ' + childName + ' to UIP Tracker');
    }

    // 3. Home Visits
    renderHomeVisits() {
      const el = document.getElementById('workerHomeVisitsGrid') || document.getElementById('workerVisitsList') || document.getElementById('ashaVisitsList');
      if (!el || !this.store) return;
      const visits = this.store.getState().homeVisits || [];

      if (!visits.length) {
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);grid-column:1/-1;">No home visits scheduled for today. Tap "+ Add Visit" above.</div>';
        return;
      }

      el.innerHTML = visits.map(v => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;box-shadow:var(--shadow-panel);display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
              <strong style="color:var(--ink);font-size:15px;">${v.household}</strong>
              <span class="badge" style="background:${v.priority.includes('High') ? 'rgba(239,68,68,0.15)' : 'rgba(2,132,199,0.15)'};color:${v.priority.includes('High') ? '#ef4444' : 'var(--primary-bright)'};padding:3px 8px;border-radius:10px;font-size:11px;font-weight:700;">
                ${v.priority}
              </span>
            </div>
            <p style="font-size:13px;color:var(--ink-dim);margin-bottom:10px;line-height:1.4;">📋 ${v.task}</p>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);padding-top:8px;margin-top:8px;">
            <small style="color:var(--muted);">Members: ${v.members || 4}</small>
            <button class="btn-glass" style="padding:4px 10px;font-size:11px;font-weight:700;background:${v.status === 'Completed' ? '#16a34a' : 'var(--glass-1)'};color:${v.status === 'Completed' ? '#ffffff' : 'var(--ink)'};border-color:${v.status === 'Completed' ? '#16a34a' : 'var(--glass-border)'};" onclick="workerController.toggleVisit('${v.id}')">
              ${v.status === 'Completed' ? '✓ Completed' : 'Mark Done'}
            </button>
          </div>
        </div>
      `).join('');
    }

    openAddVisitModal() {
      const modal = document.getElementById('addVisitModal');
      if (modal) modal.style.display = 'flex';
    }

    closeAddVisitModal() {
      const modal = document.getElementById('addVisitModal');
      if (modal) modal.style.display = 'none';
    }

    submitAddVisit(e) {
      if (e) e.preventDefault();
      const household = document.getElementById('visHousehold').value.trim();
      const members = parseInt(document.getElementById('visMembers').value, 10) || 4;
      const priority = document.getElementById('visPriority').value;
      const task = document.getElementById('visTask').value.trim();

      if (!household || !task) {
        alert('Please enter resident name/household and task description');
        return;
      }

      this.store.addHomeVisit({ household, members, priority, task });
      document.getElementById('visHousehold').value = '';
      document.getElementById('visTask').value = '';
      this.closeAddVisitModal();
      
      this.renderHomeVisits();
      if (typeof this.renderStats === 'function') this.renderStats();
      this.renderMasterRegistry();
      if (typeof window.toast === 'function') window.toast('✓ Scheduled home visit for ' + household);
    }

    openAshaVideoCallModal() {
      const modal = document.getElementById('ashaVideoCallModal');
      const patSelect = document.getElementById('ashaVideoPatientSelect');
      const docSelect = document.getElementById('ashaVideoDoctorSelect');

      if (this.store) {
        const patients = this.store.getState().patients || [];
        const doctors = (this.store.getState().staff || []).filter(s => s.role === 'doctor');

        if (patSelect) {
          patSelect.innerHTML = patients.map(p => `<option value="${p.name}" data-phone="${p.phone}" data-age="${p.age}" data-gender="${p.gender}">🌾 ${p.name} (${p.village || 'Ward'}) - ABHA: ${p.abhaId || '14-XXXX'}</option>`).join('') || '<option value="Beneficiary Resident">🌾 Village Beneficiary Resident</option>';
        }

        if (docSelect) {
          docSelect.innerHTML = doctors.map(d => `<option value="${d.name}">🩺 ${d.name} (${d.location || 'PHC/CHC'})</option>`).join('') || '<option value="Dr. Priya Sharma, MBBS, MD">🩺 Dr. Priya Sharma, MBBS, MD (On Duty)</option>';
        }
      }

      if (modal) modal.style.display = 'flex';
    }

    closeAshaVideoCallModal() {
      const modal = document.getElementById('ashaVideoCallModal');
      if (modal) modal.style.display = 'none';
    }

    submitAshaVideoCall(e) {
      if (e) e.preventDefault();
      const patSelect = document.getElementById('ashaVideoPatientSelect');
      const docSelect = document.getElementById('ashaVideoDoctorSelect');
      const complaintInput = document.getElementById('ashaVideoComplaint');

      const patName = patSelect ? patSelect.value : 'Citizen Beneficiary';
      const docName = docSelect ? docSelect.value : 'Dr. Priya Sharma, MBBS, MD';
      const complaint = complaintInput ? complaintInput.value.trim() : 'Frontline ASHA Home Visit Teleconsultation';

      const ashaUser = (this.store && this.store.getState().session && this.store.getState().session.user) || { name: 'Lakshmi Didi (ASHA Lead)' };

      this.closeAshaVideoCallModal();

      if (global.videoCallController) {
        global.videoCallController.startVideoCall({
          callerRole: 'worker',
          callerName: patName,
          recipientRole: 'doctor',
          recipientName: docName,
          facilitatorName: ashaUser.name || 'ASHA Frontline Field Worker',
          complaint: 'ASHA Facilitated Call: ' + complaint
        });
      }
    }

    renderAshaCallHistory() {
      const el = document.getElementById('ashaVideoCallHistoryContainer');
      if (!el || !this.store) return;
      const history = this.store.getVideoCallHistory('worker') || [];

      if (!history.length) {
        el.innerHTML = '<div style="text-align:center;padding:20px;color:var(--muted);background:var(--glass-2);border-radius:12px;border:1px dashed var(--glass-border);grid-column:1/-1;">No frontline telemedicine video calls facilitated yet. Tap "+ Facilitate Doctor Video Call" above.</div>';
        return;
      }

      el.innerHTML = history.map(c => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;box-shadow:var(--shadow-panel);">
          <div>
            <strong style="color:var(--ink);font-size:14px;display:block;">${c.callerName} ↔ ${c.recipientName}</strong>
            <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">Token: ${c.token} · 📅 ${c.date} (${c.time}) · Facilitator: ${c.facilitatorName || 'ASHA Lead'}</small>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="badge" style="background:rgba(34,197,94,0.15);color:#16a34a;font-weight:700;font-size:11px;">⏱️ ${c.duration}</span>
            <span class="badge" style="background:rgba(2,132,199,0.15);color:#0284c7;font-weight:700;font-size:11px;">✓ ${c.status}</span>
          </div>
        </div>
      `).join('');
    }

    renderMasterRegistry() {
      const el = document.getElementById('ashaMasterRegistryBody');
      if (!el || !this.store) return;
      const patients = this.store.getState().patients || [];

      if (!patients.length) {
        el.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--muted);">No village residents registered yet.</td></tr>';
        return;
      }

      el.innerHTML = patients.map(p => `
        <tr>
          <td><strong style="color:var(--primary-bright);font-family:'IBM Plex Mono',monospace;font-size:12px;">${p.abhaId || '14-XXXX'}</strong></td>
          <td><strong style="color:var(--ink);font-size:13px;">${p.name}</strong></td>
          <td style="color:var(--ink-dim);">${p.age} Yrs / ${p.gender}</td>
          <td style="color:var(--muted);">${p.village || 'Kondapalli'}</td>
          <td><span class="badge" style="background:rgba(2,132,199,0.12);color:var(--primary-bright);padding:2px 6px;border-radius:10px;font-size:11px;">${p.bloodGroup || 'O+'}</span></td>
          <td style="color:var(--muted);">${p.phone}</td>
        </tr>
      `).join('');
    }
  }

  global.workerController = new WorkerController();

})(typeof window !== 'undefined' ? window : this);
