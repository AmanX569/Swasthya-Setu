/**
 * =========================================================
 * SWASTHYA SETU - HEALTH ADMINISTRATION DESK (admin.js)
 * 100% Standalone Personnel, Bed Grid & Inventory Command
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
        el.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:20px;color:#64748b;">No staff registered yet. Add staff above.</td></tr>`;
        return;
      }

      el.innerHTML = staffList.map(s => `
        <tr>
          <td><strong style="color:#0052cc;font-family:'IBM Plex Mono',monospace;">${s.id}</strong></td>
          <td>
            <strong style="color:#0f172a;display:block;">${s.name}</strong>
            <small style="color:#64748b;">${s.regNo || '—'}</small>
          </td>
          <td>
            <span class="badge" style="background:${s.role === 'doctor' ? '#e0f2fe' : s.role === 'worker' ? '#f0fdf4' : '#fef3c7'};color:${s.role === 'doctor' ? '#0052cc' : s.role === 'worker' ? '#16a34a' : '#d97706'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">
              ${s.role === 'doctor' ? '🩺 Doctor' : s.role === 'worker' ? '🤝 ASHA / ANM' : '👑 Administrator'}
            </span>
          </td>
          <td>${s.location}</td>
          <td>+91 ${s.phone}</td>
          <td>
            <button style="color:#dc2626;background:none;border:none;cursor:pointer;font-size:12px;font-weight:600;" onclick="adminController.removeStaff('${s.id}')">✕ Remove</button>
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
        <div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:16px;margin-bottom:12px;">
          <strong style="color:#0052cc;font-size:16px;display:block;margin-bottom:10px;">${h.name}</strong>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:10px;text-align:center;">
              <small style="color:#64748b;display:block;">General</small>
              <strong style="font-size:18px;color:#16a34a;display:block;margin:4px 0;">${h.genBedsAvail}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'gen', 1)">+1</button>
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'gen', -1)">-1</button>
              </div>
            </div>
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:10px;text-align:center;">
              <small style="color:#64748b;display:block;">ICU</small>
              <strong style="font-size:18px;color:#dc2626;display:block;margin:4px 0;">${h.icuBedsAvail}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'icu', 1)">+1</button>
                <button class="btn-glass" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds('${h.id}', 'icu', -1)">-1</button>
              </div>
            </div>
            <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:10px;text-align:center;">
              <small style="color:#64748b;display:block;">Oxygen</small>
              <strong style="font-size:18px;color:#0284c7;display:block;margin:4px 0;">${h.oxygenBedsAvail}</strong>
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
        <div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;padding:10px;text-align:center;">
          <strong style="color:#dc2626;font-size:16px;display:block;">${grp}</strong>
          <span style="font-size:18px;font-weight:800;color:#0f172a;display:block;margin:4px 0;">${count}</span>
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

      el.innerHTML = meds.map(m => `
        <tr>
          <td><strong style="color:#0f172a;">${m.name}</strong></td>
          <td>${m.category}</td>
          <td><strong>${m.stock}</strong> ${m.unit}</td>
          <td>₹${m.genericPrice}</td>
          <td style="text-decoration:line-through;color:#64748b;">₹${m.brandPrice}</td>
          <td><span class="badge" style="background:#f0fdf4;color:#16a34a;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">${m.status}</span></td>
        </tr>
      `).join('');
    }
  }

  global.adminController = new AdminController();

})(typeof window !== 'undefined' ? window : this);
