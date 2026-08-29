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
        el.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--muted);">No pregnant mothers registered. Tap "+ Register Mother" above.</td></tr>`;
        return;
      }

      el.innerHTML = ancs.map(a => `
        <tr>
          <td><strong style="color:var(--ink);font-size:14px;">${a.motherName}</strong></td>
          <td style="color:var(--ink-dim);">${a.husbandName || '—'}</td>
          <td style="color:var(--muted);">${a.village}</td>
          <td style="color:var(--ink);">${a.weeks} Wks <small style="color:var(--muted);">(EDD: ${a.edd})</small></td>
          <td style="color:var(--ink-dim);">BP: <strong style="color:var(--ink)">${a.bp}</strong> | Hb: <strong style="color:var(--ink)">${a.hb}</strong></td>
          <td>
            <span class="badge" style="background:${a.riskLevel.includes('High') ? 'rgba(220,38,38,0.2)' : 'rgba(22,163,74,0.2)'};color:${a.riskLevel.includes('High') ? '#ef4444' : '#22c55e'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;border:1px solid ${a.riskLevel.includes('High') ? '#ef4444' : '#22c55e'};">
              ${a.riskLevel}
            </span>
          </td>
          <td style="color:var(--primary-bright);font-weight:600;">${a.nextVisit}</td>
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
          <td><strong style="color:var(--ink);font-size:14px;">${u.childName}</strong></td>
          <td style="color:var(--ink-dim);">${u.parentName}</td>
          <td style="color:var(--muted);">${u.dob} (${u.gender})</td>
          <td style="color:var(--ink);">${u.lastVaccine}</td>
          <td><strong style="color:var(--primary-bright);">${u.nextDue}</strong></td>
          <td><span class="badge" style="background:rgba(2,132,199,0.15);color:var(--primary-bright);padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">${u.status}</span></td>
        </tr>
      `).join('');
    }

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
          <button class="btn-glass" style="padding:8px 14px;font-size:12px;background:${v.status === 'Completed' ? '#16a34a' : 'var(--glass-1)'};color:${v.status === 'Completed' ? '#ffffff' : 'var(--ink)'};border-color:${v.status === 'Completed' ? '#16a34a' : 'var(--glass-border)'};" onclick="workerController.toggleVisit('${v.id}')">
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
