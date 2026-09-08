/**
 * =========================================================
 * SWASTHYA SETU - HEALTH ADMINISTRATION DESK (admin.js)
 * Full Online/Offline Provisioning, Hospital Beds & Drug Supply
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
      const elGrid = document.getElementById('adminStatsGrid');
      if (!elGrid || !this.store) return;
      const state = this.store.getState();
      const staffCount = (state.staff || []).length;
      const queueCount = (state.consultQueue || []).length;
      const ancCount = (state.ancRecords || []).length;
      const totalBeds = (state.hospitals || []).reduce((acc, h) => acc + (h.genBedsAvail || 0) + (h.icuBedsAvail || 0) + (h.oxygenBedsAvail || 0), 0);

      elGrid.innerHTML = `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;text-align:center;box-shadow:var(--shadow-panel);">
          <small style="color:var(--muted);font-size:11px;font-weight:700;display:block;text-transform:uppercase;">Active Medical Staff</small>
          <strong style="font-size:24px;color:var(--primary-bright);font-weight:900;">${staffCount}</strong>
        </div>
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;text-align:center;box-shadow:var(--shadow-panel);">
          <small style="color:var(--muted);font-size:11px;font-weight:700;display:block;text-transform:uppercase;">Live Teleconsult Queue</small>
          <strong style="font-size:24px;color:#d97706;font-weight:900;">${queueCount}</strong>
        </div>
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;text-align:center;box-shadow:var(--shadow-panel);">
          <small style="color:var(--muted);font-size:11px;font-weight:700;display:block;text-transform:uppercase;">High-Risk ANC Mothers</small>
          <strong style="font-size:24px;color:#db2777;font-weight:900;">${ancCount}</strong>
        </div>
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;text-align:center;box-shadow:var(--shadow-panel);">
          <small style="color:var(--muted);font-size:11px;font-weight:700;display:block;text-transform:uppercase;">Available Govt Beds</small>
          <strong style="font-size:24px;color:#16a34a;font-weight:900;">${totalBeds}</strong>
        </div>
      `;
    }

    renderStaffTable() {
      const el = document.getElementById('adminStaffTableBody');
      if (!el || !this.store) return;
      const staffList = this.store.getState().staff || [];

      if (!staffList.length) {
        el.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:20px;color:var(--muted);">No staff registered yet. Click "+ Provision New Staff" above.</td></tr>`;
        return;
      }

      el.innerHTML = staffList.map(s => `
        <tr>
          <td><strong style="color:var(--primary-bright);font-family:'IBM Plex Mono',monospace;font-size:13px;">${s.id || s.staff_code}</strong></td>
          <td>
            <strong style="color:var(--ink);display:block;font-size:14px;">${s.name}</strong>
            <small style="color:var(--muted);">${s.regNo || '—'}</small>
          </td>
          <td>
            <span class="badge" style="background:${s.role === 'doctor' ? 'rgba(2,132,199,0.15)' : s.role === 'worker' ? 'rgba(22,163,74,0.15)' : 'rgba(217,119,6,0.15)'};color:${s.role === 'doctor' ? 'var(--primary-bright)' : s.role === 'worker' ? '#22c55e' : '#f59e0b'};padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">
              ${s.role === 'doctor' ? '🩺 Doctor' : s.role === 'worker' ? '🤝 ASHA / ANM' : '👑 Administrator'}
            </span>
          </td>
          <td style="color:var(--ink-dim);">${s.location || 'District Center'}</td>
          <td style="color:var(--muted);">+91 ${s.phone}</td>
          <td>
            <button style="color:#ef4444;background:none;border:none;cursor:pointer;font-size:12px;font-weight:700;" onclick="adminController.confirmRemoveStaff('${s.id || s.staff_code}')">✕ Remove</button>
          </td>
        </tr>
      `).join('');
    }

    openProvisionStaffModal() {
      const m = document.getElementById('provisionStaffModal');
      if (m) m.style.display = 'flex';
    }

    closeProvisionStaffModal() {
      const m = document.getElementById('provisionStaffModal');
      if (m) m.style.display = 'none';
    }

    confirmRemoveStaff(id) {
      if (!this.store) return;
      const targetStr = String(id || '').trim();
      const staffList = this.store.getState().staff || [];
      const staff = staffList.find(s => s && (s.id === targetStr || s.staff_code === targetStr || s.db_id === targetStr));

      this.pendingDeleteStaffId = targetStr;

      const nameEl = document.getElementById('removeStaffModalName');
      const idEl = document.getElementById('removeStaffModalId');
      const roleEl = document.getElementById('removeStaffModalRole');
      const locEl = document.getElementById('removeStaffModalLocation');

      if (nameEl) nameEl.textContent = staff ? staff.name : targetStr;
      if (idEl) idEl.textContent = staff ? (staff.staff_code || staff.id) : targetStr;
      if (roleEl) roleEl.textContent = staff ? (staff.role ? staff.role.toUpperCase() : 'STAFF') : 'STAFF';
      if (locEl) locEl.textContent = staff ? (staff.location || 'Health Facility') : 'Health Facility';

      const btn = document.getElementById('confirmDeleteStaffBtn');
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = '🗑️ Permanently Delete Staff';
      }

      const modal = document.getElementById('removeStaffConfirmModal');
      if (modal) {
        modal.style.display = 'flex';
      }
    }

    closeRemoveStaffModal() {
      this.pendingDeleteStaffId = null;
      const modal = document.getElementById('removeStaffConfirmModal');
      if (modal) modal.style.display = 'none';
    }

    async executeRemoveStaff() {
      if (!this.pendingDeleteStaffId || !this.store) return;
      const id = this.pendingDeleteStaffId;
      const btn = document.getElementById('confirmDeleteStaffBtn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ Removing from Database...';
      }

      try {
        await this.store.deleteStaff(id);
        this.closeRemoveStaffModal();
        this.renderStaffTable();
        this.renderKpis();
        if (typeof window.toast === 'function') {
          window.toast('✓ Permanently removed staff member from National Registry & Cloud');
        }
      } catch (err) {
        console.error('[Admin] Staff deletion failed:', err);
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '🗑️ Permanently Delete Staff';
        }
        if (typeof window.toast === 'function') {
          window.toast('⚠️ Failed to remove staff member: ' + (err.message || 'Database error'));
        }
      }
    }

    submitProvisionStaff(e) {
      if (e) e.preventDefault();
      const role = document.getElementById('provStaffRole').value;
      const name = document.getElementById('provStaffName').value.trim();
      const phone = document.getElementById('provStaffPhone').value.trim();
      const regNo = document.getElementById('provStaffRegNo') ? document.getElementById('provStaffRegNo').value.trim() : '';
      const location = document.getElementById('provStaffLocation') ? document.getElementById('provStaffLocation').value.trim() : 'District Health Center';
      const password = document.getElementById('provStaffPassword') ? document.getElementById('provStaffPassword').value.trim() : (role + '@123');

      if (!name || !phone) {
        alert('Please enter Name and Official Mobile number');
        return;
      }

      const newMember = this.store.provisionStaffMember(role, {
        name,
        phone,
        location: location || 'District Health Center',
        regNo: regNo || (role.toUpperCase() + '-AP-' + Math.floor(1000 + Math.random() * 9000)),
        password: password || (role + '@123')
      });

      document.getElementById('provStaffName').value = '';
      document.getElementById('provStaffPhone').value = '';
      if (document.getElementById('provStaffRegNo')) document.getElementById('provStaffRegNo').value = '';
      if (document.getElementById('provStaffLocation')) document.getElementById('provStaffLocation').value = '';
      if (document.getElementById('provStaffPassword')) document.getElementById('provStaffPassword').value = '';

      this.closeProvisionStaffModal();
      this.renderStaffTable();
      this.renderKpis();

      if (typeof window.toast === 'function') {
        window.toast('✓ Successfully provisioned ' + role.toUpperCase() + ': ' + newMember.name + ' (' + newMember.id + ')');
      }
    }

    removeStaff(id) {
      // Direct remove delegates to custom confirmation modal
      this.confirmRemoveStaff(id);
    }

    renderAdminBeds() {
      const el = document.getElementById('adminBedsGrid');
      if (!el || !this.store) return;
      // Stably sort hospitals by name so grid order never shifts
      const hosps = [...(this.store.getState().hospitals || [])].sort((a, b) => (a.name || '').localeCompare(b.name || ''));

      el.innerHTML = hosps.map(h => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow-panel);">
          <strong style="color:var(--primary-bright);font-size:16px;display:block;margin-bottom:10px;">${h.name}</strong>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(110px, 1fr));gap:10px;">
            <div style="background:var(--glass-1);border:1px solid var(--glass-border);border-radius:10px;padding:10px;text-align:center;">
              <small style="color:var(--muted);display:block;font-size:11px;">General</small>
              <strong style="font-size:18px;color:#16a34a;display:block;margin:4px 0;">${h.genBedsAvail || 0}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass bed-btn" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds(this, '${h.id}', 'gen', 1)">+1</button>
                <button class="btn-glass bed-btn" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds(this, '${h.id}', 'gen', -1)">-1</button>
              </div>
            </div>
            <div style="background:var(--glass-1);border:1px solid var(--glass-border);border-radius:10px;padding:10px;text-align:center;">
              <small style="color:var(--muted);display:block;font-size:11px;">ICU</small>
              <strong style="font-size:18px;color:#ef4444;display:block;margin:4px 0;">${h.icuBedsAvail || 0}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass bed-btn" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds(this, '${h.id}', 'icu', 1)">+1</button>
                <button class="btn-glass bed-btn" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds(this, '${h.id}', 'icu', -1)">-1</button>
              </div>
            </div>
            <div style="background:var(--glass-1);border:1px solid var(--glass-border);border-radius:10px;padding:10px;text-align:center;">
              <small style="color:var(--muted);display:block;font-size:11px;">Oxygen</small>
              <strong style="font-size:18px;color:var(--primary-bright);display:block;margin:4px 0;">${h.oxygenBedsAvail || 0}</strong>
              <div style="display:flex;justify-content:center;gap:6px;">
                <button class="btn-glass bed-btn" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds(this, '${h.id}', 'oxygen', 1)">+1</button>
                <button class="btn-glass bed-btn" style="padding:2px 8px;font-size:12px;" onclick="adminController.updateBeds(this, '${h.id}', 'oxygen', -1)">-1</button>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    }

    async updateBeds(btnEl, hospId, type, delta) {
      if (btnEl) btnEl.disabled = true;
      try {
        await this.store.updateBedCount(hospId, type, delta);
        this.renderAdminBeds();
        this.renderKpis();
      } catch (err) {
        console.error('[Admin] Bed count update failed:', err);
        if (typeof window.toast === 'function') {
          window.toast('⚠️ Unable to sync bed count with database: ' + (err.message || 'Database error'));
        }
        this.renderAdminBeds();
      } finally {
        if (btnEl) btnEl.disabled = false;
      }
    }

    renderAdminBlood() {
      const el = document.getElementById('adminBloodGrid');
      if (!el || !this.store) return;
      const bank = this.store.getState().bloodBank || {};

      // Fixed canonical sequence: strictly invariant order so cards NEVER shuffle
      const CANONICAL_BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

      el.innerHTML = CANONICAL_BLOOD_GROUPS.map(grp => {
        const count = bank[grp] !== undefined ? bank[grp] : 0;
        return `
          <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:12px;padding:10px;text-align:center;">
            <strong style="color:#ef4444;font-size:16px;display:block;">${grp}</strong>
            <span style="font-size:18px;font-weight:800;color:var(--ink);display:block;margin:4px 0;">${count}</span>
            <div style="display:flex;justify-content:center;gap:4px;">
              <button class="btn-glass blood-btn" style="padding:2px 6px;font-size:11px;" onclick="adminController.updateBlood(this, '${grp}', 1)">+1</button>
              <button class="btn-glass blood-btn" style="padding:2px 6px;font-size:11px;" onclick="adminController.updateBlood(this, '${grp}', -1)">-1</button>
            </div>
          </div>
        `;
      }).join('');
    }

    async updateBlood(btnEl, grp, delta) {
      if (btnEl) btnEl.disabled = true;
      try {
        await this.store.updateBloodStock(grp, delta);
        this.renderAdminBlood();
      } catch (err) {
        console.error('[Admin] Blood stock update failed:', err);
        if (typeof window.toast === 'function') {
          window.toast('⚠️ Unable to sync blood inventory with database: ' + (err.message || 'Database error'));
        }
        this.renderAdminBlood();
      } finally {
        if (btnEl) btnEl.disabled = false;
      }
    }

    renderAdminMedicines() {
      const el = document.getElementById('adminDrugTableBody') || document.getElementById('adminMedicinesTableBody');
      if (!el || !this.store) return;
      const meds = this.store.getState().medicines || [];

      if (!meds.length) {
        el.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:20px;color:var(--muted);">No medicines in Jan Aushadhi Catalog. Click "+ Add Medicine" to add.</td></tr>';
        return;
      }

      el.innerHTML = meds.map(m => {
        const savings = Math.max(0, (m.brandPrice || 0) - (m.genericPrice || 0));
        const savingsPct = m.brandPrice > 0 ? Math.round((savings / m.brandPrice) * 100) : 0;

        return `
          <tr>
            <td>
              <strong style="color:var(--ink);font-size:14px;display:block;">${m.name}</strong>
              <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;font-size:11px;">${m.id || 'DRUG'}</small>
            </td>
            <td style="color:var(--ink-dim);font-weight:600;">${m.category || 'General Medicine'}</td>
            <td><strong style="color:var(--ink);font-weight:800;">${m.stock || 100}</strong> <small style="color:var(--muted);">${m.unit || 'Tablets'}</small></td>
            <td style="color:#15803d;font-weight:900;font-size:14px;">₹${m.genericPrice}</td>
            <td style="text-decoration:line-through;color:var(--muted);font-size:13px;">₹${m.brandPrice}</td>
            <td>
              <span class="badge" style="background:rgba(22,163,74,0.15);color:#15803d;padding:4px 8px;border-radius:12px;font-size:11px;font-weight:800;">
                ${savingsPct > 0 ? savingsPct + '% OFF' : 'In Stock'}
              </span>
            </td>
            <td>
              <button style="color:#ef4444;background:none;border:none;cursor:pointer;font-size:12px;font-weight:800;" onclick="adminController.removeMedicine('${m.id}')" title="Delete Medicine">✕ Remove</button>
            </td>
          </tr>
        `;
      }).join('');
    }

    removeMedicine(id) {
      if (confirm('Are you sure you want to remove this medicine from Jan Aushadhi catalog?')) {
        this.store.deleteMedicine(id);
        this.renderAdminMedicines();
        if (global.patientController && typeof global.patientController.renderDailyMedications === 'function') {
          global.patientController.renderDailyMedications();
        }
        if (typeof window.toast === 'function') {
          window.toast('✓ Removed medicine from Jan Aushadhi Inventory');
        }
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

      const newMed = this.store.addMedicine({
        name,
        category: category || 'General Medicine',
        stock,
        unit: 'Tablets',
        genericPrice,
        brandPrice,
        status: 'In Stock'
      });

      document.getElementById('drugName').value = '';
      document.getElementById('drugCat').value = '';
      document.getElementById('drugStock').value = '200';
      document.getElementById('drugGenPrice').value = '';
      document.getElementById('drugBrandPrice').value = '';

      this.closeAddDrugModal();
      this.renderAdminMedicines();

      if (global.patientController && typeof global.patientController.renderDailyMedications === 'function') {
        global.patientController.renderDailyMedications();
      }

      if (typeof window.toast === 'function') {
        window.toast('✓ Added ' + name + ' (₹' + genericPrice + ') to Jan Aushadhi Inventory & Synced to Database');
      }
    }
  }

  global.adminController = new AdminController();

})(typeof window !== 'undefined' ? window : this);
