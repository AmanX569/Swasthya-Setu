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
    }

    // 1. ANC High-Risk Mothers
    renderAncRecords() {
      const el = document.getElementById('ashaAncTableBody');
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
      const el = document.getElementById('ashaUipTableBody');
      if (!el || !this.store) return;
      const uips = this.store.getState().immunizations || [];

      el.innerHTML = uips.map(u => `
        <tr>
          <td><strong style="color:var(--ink);font-size:14px;">${u.childName}</strong></td>
          <td style="color:var(--ink-dim);">${u.parentName}</td>
          <td style="color:var(--muted);">${u.dob} (${u.gender})</td>
          <td style="color:var(--ink);">${u.lastVaccine}</td>
          <td><strong style="color:var(--primary-bright);">${u.nextDue}</strong></td>
          <td><span class="badge" style="background:rgba(2,132,199,0.15);color:var(--primary-bright);padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">${u.status}</span></td>
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
      const el = document.getElementById('ashaVisitsList');
      if (!el || !this.store) return;
      const visits = this.store.getState().homeVisits || [];

      el.innerHTML = visits.map(v => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;box-shadow:var(--shadow-panel);">
          <div>
            <strong style="color:var(--ink);font-size:15px;display:block;">${v.household}</strong>
            <small style="color:var(--primary-bright);font-weight:700;">Priority: ${v.priority}</small>
            <p style="font-size:13px;color:var(--ink-dim);margin-top:2px;">Task: ${v.task}</p>
          </div>
          <button class="btn-glass" style="padding:8px 14px;font-size:12px;background:${v.status === 'Completed' ? '#16a34a' : 'var(--glass-1)'};color:${v.status === 'Completed' ? '#ffffff' : 'var(--ink)'};border-color:${v.status === 'Completed' ? '#16a34a' : 'var(--glass-border)'};cursor:pointer;" onclick="workerController.toggleVisit('${v.id}')">
            ${v.status === 'Completed' ? '✓ Completed' : 'Mark Done'}
          </button>
        </div>
      `).join('');
    }

    toggleVisit(id) {
      this.store.toggleHomeVisit(id);
    }

    openAddVisitModal() {
      const m = document.getElementById('addVisitModal');
      if (m) m.style.display = 'flex';
    }

    closeAddVisitModal() {
      const m = document.getElementById('addVisitModal');
      if (m) m.style.display = 'none';
    }

    submitAddVisit(e) {
      if (e) e.preventDefault();
      const household = document.getElementById('visHousehold').value.trim();
      const members = parseInt(document.getElementById('visMembers').value, 10) || 3;
      const priority = document.getElementById('visPriority').value;
      const task = document.getElementById('visTask').value.trim();

      if (!household) {
        alert('Please enter household name');
        return;
      }

      this.store.addHomeVisit({
        household,
        members,
        priority,
        task: task || 'Routine Health Visit & Vitals Check'
      });

      this.closeAddVisitModal();
      if (typeof window.toast === 'function') window.toast('✓ Added Home Visit for ' + household);
    }
  }

  global.workerController = new WorkerController();

})(typeof window !== 'undefined' ? window : this);
