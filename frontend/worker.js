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

    renderAll() {
      this.renderAncRecords();
      this.renderImmunizations();
      this.renderHomeVisits();
    }

    renderAncRecords() {
      const el = document.getElementById('ashaAncTableBody');
      if (!el || !this.store) return;
      const ancs = this.store.getState().ancRecords || [];

      if (!ancs.length) {
        el.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:#64748b;">No pregnant mothers registered. Tap "+ Register Pregnant Mother" above.</td></tr>`;
        return;
      }

      el.innerHTML = ancs.map(a => `
        <tr>
          <td><strong style="color:#0f172a;">${a.motherName}</strong></td>
          <td>${a.husbandName || '—'}</td>
          <td>${a.village}</td>
          <td>${a.weeks} Wks (EDD: ${a.edd})</td>
          <td>BP: ${a.bp} | Hb: ${a.hb}</td>
          <td>
            <span class="badge" style="background:${a.riskLevel.includes('High') ? '#fee2e2' : '#dcfce7'};color:${a.riskLevel.includes('High') ? '#dc2626' : '#16a34a'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">
              ${a.riskLevel}
            </span>
          </td>
          <td>${a.nextVisit}</td>
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
      const hb = document.getElementById('ancHb').value.trim() || '11.0 g/dL';
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

    renderImmunizations() {
      const el = document.getElementById('ashaUipTableBody');
      if (!el || !this.store) return;
      const uips = this.store.getState().immunizations || [];

      el.innerHTML = uips.map(u => `
        <tr>
          <td><strong style="color:#0f172a;">${u.childName}</strong></td>
          <td>${u.parentName}</td>
          <td>${u.dob} (${u.gender})</td>
          <td>${u.lastVaccine}</td>
          <td><strong style="color:#0052cc;">${u.nextDue}</strong></td>
          <td><span class="badge" style="background:#e0f2fe;color:#0052cc;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:600;">${u.status}</span></td>
        </tr>
      `).join('');
    }

    renderHomeVisits() {
      const el = document.getElementById('ashaVisitsList');
      if (!el || !this.store) return;
      const visits = this.store.getState().homeVisits || [];

      el.innerHTML = visits.map(v => `
        <div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;padding:14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong style="color:#0f172a;font-size:15px;display:block;">${v.household}</strong>
            <small style="color:#0052cc;font-weight:700;">Priority: ${v.priority}</small>
            <p style="font-size:13px;color:#475569;margin-top:2px;">Task: ${v.task}</p>
          </div>
          <button class="btn-glass" style="padding:8px 14px;font-size:12px;background:${v.status === 'Completed' ? '#16a34a' : '#f1f5f9'};color:${v.status === 'Completed' ? '#ffffff' : '#0f172a'};" onclick="workerController.toggleVisit('${v.id}')">
            ${v.status === 'Completed' ? '✓ Completed' : 'Mark Done'}
          </button>
        </div>
      `).join('');
    }

    toggleVisit(id) {
      this.store.toggleHomeVisit(id);
    }
  }

  global.workerController = new WorkerController();

})(typeof window !== 'undefined' ? window : this);
