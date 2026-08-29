/**
 * =========================================================
 * SWASTHYA SETU - HEALTH ADMINISTRATION DESK (admin.js)
 * High-Contrast Glass Support & Dynamic Inventory
 * =========================================================
 */

(function(global) {
  'use strict';

  class AdminController {
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
      this.renderKpis();
      this.renderStaffTable();
      this.renderAdminBeds();
      this.renderAdminBlood();
      this.renderAdminMedicines();
    }

    renderKpis() {
      const state = this.store.getState();
      const elStaff = document.getElementById('kpiTotalStaff');
      if (elStaff) elStaff.textContent = (state.staff || []).length;

      const elQueue = document.getElementById('kpiQueueCount');
      if (elQueue) elQueue.textContent = (state.consultQueue || []).length;

      const elAnc = document.getElementById('kpiAncCount');
      if (elAnc) elAnc.textContent = (state.ancRecords || []).length;

      const totalBeds = (state.hospitals || []).reduce((acc, h) => acc + h.genBedsAvail + h.icuBedsAvail + h.oxygenBedsAvail, 0);
      const elBeds = document.getElementById('kpiTotalBeds');
      if (elBeds) elBeds.textContent = totalBeds;
    }

    renderStaffTable() {
      const el = document.getElementById('adminStaffTableBody');
      if (!el || !this.store) return;
      const staffList = this.store.getState().staff || [];

      if (!staffList.length) {
        el.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--muted);">No staff registered yet. Add staff above.</td></tr>`;
        return;
      }

      el.innerHTML = staffList.map(s => `
        <tr>
          <td><strong style="color:var(--primary-bright);font-family:'IBM Plex Mono',monospace;font-size:13px;">${s.id}</strong></td>
          <td>
            <strong style="color:var(--ink);display:block;font-size:14px;">${s.name}</strong>
            <small style="color:var(--muted);">${s.regNo || '—'}</small>
          </td>
          <td>
            <span class="badge" style="background:${s.role === 'doctor' ? 'rgba(2,132,199,0.15)' : s.role === 'worker' ? 'rgba(22,163,74,0.15)' : 'rgba(217,119,6,0.15)'};color:${s.role === 'doctor' ? 'var(--primary-bright)' : s.role === 'worker' ? '#22c55e' : '#f59e0b'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">
              ${s.role === 'doctor' ? '🩺 Doctor' : s.role === 'worker' ? '🤝 ASHA / ANM' : '👑 Administrator'}
            </span>
          </td>
          <td style="color:var(--ink-dim);">${s.location}</td>
          <td style="color:var(--muted);">+91 ${s.phone}</td>
          <td>
            <button style="color:#ef4444;background:none;border:none;cursor:pointer;font-size:12px;font-weight:700;" onclick="adminController.removeStaff('${s.id}')">✕ Remove</button>
          </td>
        </tr>
      `).join('');
    }

    submitQuickAddStaff(e) {
      if (e) e.preventDefault();
      const name = document.getElementById('quickStaffName').value.trim();
      const role = document.getElementById('quickStaffRole').value;
      const phone = document.getElementById('quickStaffPhone').value.trim();
      const location = document.getElementById('quickStaffLocation').value.trim();

      if (!name) {
        alert('Please enter staff name');
        return;
      }

      this.store.addStaff({
        name,
        role,
        phone: phone || '9876543210',
        location: location || 'Kondapalli Sector'
      });

      document.getElementById('quickStaffName').value = '';
      document.getElementById('quickStaffPhone').value = '';
      document.getElementById('quickStaffLocation').value = '';
      if (typeof window.toast === 'function') window.toast('✓ Added ' + name + ' to Staff Registry');
    }

    removeStaff(id) {
      if (confirm('Are you sure you want to remove this staff member?')) {
        this.store.deleteStaff(id);
      }
    }

    renderAdminBeds() {
      const el = document.getElementById('adminBedsGrid');
      if (!el || !this.store) return;
      const hosps = this.store.getState().hospitals || [];

      el.innerHTML = hosps.map(h => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow-panel);">
          <strong style="color:var(--primary-bright);font-size:16px;display:block;margin-bottom:10px;">${h.name}</strong>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));gap:10px;">
            <div style="background:var(--glass-1);border:1px solid var(--glass-border);border-radius:10px;padding:10px;text-align:center;">
              <small style="color:var(--muted);display:block;font-size:11px;">General</small>
              <strong style="font-size:18px;color:#16a34a;display:block;margin:4px 0;">${h.genBedsAvail}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'gen', 1)">+1</button>
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'gen', -1)">-1</button>
              </div>
            </div>
            <div style="background:var(--glass-1);border:1px solid var(--glass-border);border-radius:10px;padding:10px;text-align:center;">
              <small style="color:var(--muted);display:block;font-size:11px;">ICU</small>
              <strong style="font-size:18px;color:#ef4444;display:block;margin:4px 0;">${h.icuBedsAvail}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'icu', 1)">+1</button>
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'icu', -1)">-1</button>
              </div>
            </div>
            <div style="background:var(--glass-1);border:1px solid var(--glass-border);border-radius:10px;padding:10px;text-align:center;">
              <small style="color:var(--muted);display:block;font-size:11px;">Oxygen</small>
              <strong style="font-size:18px;color:var(--primary-bright);display:block;margin:4px 0;">${h.oxygenBedsAvail}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'oxygen', 1)">+1</button>
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'oxygen', -1)">-1</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    updateBeds(hospId, type, delta) {
      this.store.updateBedCount(hospId, type, delta);
    }

    renderAdminBlood() {
      const el = document.getElementById('adminBloodGrid');
      if (!el || !this.store) return;
      const bank = this.store.getState().bloodBank || {};

      el.innerHTML = Object.entries(bank).map(([grp, count]) => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:12px;padding:10px;text-align:center;">
          <strong style="color:#ef4444;font-size:16px;display:block;">${grp}</strong>
          <span style="font-size:18px;font-weight:800;color:var(--ink);display:block;margin:4px 0;">${count}</span>
          <div style="display:flex;justify-content:center;gap:4px;">
            <button class="btn-glass" style="padding:2px 6px;font-size:11px;" onclick="adminController.updateBlood('${grp}', 1)">+1</button>
            <button class="btn-glass" style="padding:2px 6px;font-size:11px;" onclick="adminController.updateBlood('${grp}', -1)">-1</button>
          </div>
        </div>
      `).join('');
    }

    updateBlood(grp, delta) {
      this.store.updateBloodStock(grp, delta);
    }

    renderAdminMedicines() {
      const el = document.getElementById('adminMedicinesTableBody');
      if (!el || !this.store) return;
      const meds = this.store.getState().medicines || [];

      const medKeyMap = {
        'DRUG-01': 'med_paracetamol',
        'DRUG-02': 'med_amoxicillin',
        'DRUG-03': 'med_metformin',
        'DRUG-04': 'med_amlodipine',
        'DRUG-05': 'med_ors',
        'DRUG-06': 'med_ifa'
      };

      const catKeyMap = {
        'DRUG-01': 'cat_fever',
        'DRUG-02': 'cat_antibiotic',
        'DRUG-03': 'cat_diabetes',
        'DRUG-04': 'cat_bp',
        'DRUG-05': 'cat_dehydration',
        'DRUG-06': 'cat_maternal'
      };

      el.innerHTML = meds.map(m => {
        const localizedName = this.t(medKeyMap[m.id], m.name);
        const localizedCat = this.t(catKeyMap[m.id], m.category);

        return `
          <tr>
            <td><strong style="color:var(--ink);font-size:14px;">${localizedName}</strong></td>
            <td style="color:var(--muted);">${localizedCat}</td>
            <td><strong style="color:var(--ink)">${m.stock}</strong> <small style="color:var(--muted)">${m.unit}</small></td>
            <td style="color:#16a34a;font-weight:700;">₹${m.genericPrice}</td>
            <td style="text-decoration:line-through;color:var(--muted);">₹${m.brandPrice}</td>
            <td><span class="badge" style="background:rgba(22,163,74,0.15);color:#22c55e;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">${m.status}</span></td>
          </tr>
        `;
      }).join('');
    }
  }

  
    openAddDrugModal() {
      const m = document.getElementById('addDrugModal');
      if (m) m.style.display = 'flex';
    }

    closeAddDrugModal() {
      const m = document.getElementById('addDrugModal');
      if (m) m.style.display = 'none';
    }

    submitAddDrug(e) {
      if (e) e.preventDefault();
      const name = document.getElementById('drugName').value.trim();
      const category = document.getElementById('drugCat').value.trim();
      const stock = parseInt(document.getElementById('drugStock').value, 10) || 100;
      const genericPrice = parseFloat(document.getElementById('drugGenPrice').value) || 10;
      const brandPrice = parseFloat(document.getElementById('drugBrandPrice').value) || 50;

      if (!name) {
        alert('Please enter medicine name');
        return;
      }

      this.store.addMedicine({
        name,
        category: category || 'General Medicine',
        stock,
        unit: 'Tablets',
        genericPrice,
        brandPrice,
        status: 'In Stock'
      });

      this.closeAddDrugModal();
      if (typeof window.toast === 'function') window.toast('✓ Added ' + name + ' to Jan Aushadhi Inventory');
    }

  global.adminController = new AdminController();

})(typeof window !== 'undefined' ? window : this);
