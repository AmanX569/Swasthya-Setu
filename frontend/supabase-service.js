/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE SERVICE CLIENT (supabase-service.js)
 * Production-grade PostgreSQL CRUD & Realtime Channels
 * =========================================================
 */

(function(global) {
  'use strict';

  class SupabaseService {
    constructor() {
      this.client = null;
      this.isOnline = false;
      this.channels = [];
    }

    init() {
      const config = global.SUPABASE_CONFIG;
      if (!config || !config.isConfigured()) {
        console.info('[Supabase] No credentials configured. Using local reactive store.');
        this.updateBadgeUI(false);
        return false;
      }

      if (typeof global.supabase === 'undefined' || typeof global.supabase.createClient !== 'function') {
        console.warn('[Supabase] @supabase/supabase-js library not loaded.');
        this.updateBadgeUI(false);
        return false;
      }

      try {
        this.client = global.supabase.createClient(config.url, config.anonKey);
        this.isOnline = true;
        this.updateBadgeUI(true);
        console.log('✓ [Supabase] Connected to Cloud PostgreSQL instance at:', config.url);
        this.setupRealtimeSubscriptions();
        this.syncInitialData();
        return true;
      } catch (err) {
        console.error('[Supabase] Initialization failed:', err);
        this.updateBadgeUI(false);
        return false;
      }
    }

    updateBadgeUI(connected) {
      const badge = document.getElementById('supabaseStatusBadge');
      if (badge) {
        if (connected) {
          badge.style.display = 'inline-flex';
          badge.style.background = 'rgba(22,163,74,0.15)';
          badge.style.color = '#16a34a';
          badge.style.border = '1px solid rgba(22,163,74,0.3)';
          badge.innerHTML = '⚡ <span>Supabase Live</span>';
        } else {
          badge.style.display = 'inline-flex';
          badge.style.background = 'var(--glass-2)';
          badge.style.color = 'var(--muted)';
          badge.style.border = '1px solid var(--glass-border)';
          badge.innerHTML = '⚙️ <span>Supabase Setup</span>';
        }
      }
    }

    // Synchronize full state from Supabase to store
    async syncInitialData() {
      if (!this.client || !global.appStore) return;
      try {
        const [qRes, hospRes, bloodRes, staffRes, ancRes, immRes, visRes, rxRes, medRes] = await Promise.all([
          this.client.from('consult_queue').select('*').order('created_at', { ascending: false }),
          this.client.from('hospitals').select('*').order('name'),
          this.client.from('blood_bank').select('*'),
          this.client.from('staff').select('*'),
          this.client.from('anc_records').select('*').order('created_at', { ascending: false }),
          this.client.from('immunizations').select('*').order('created_at', { ascending: false }),
          this.client.from('home_visits').select('*').order('created_at', { ascending: false }),
          this.client.from('prescriptions').select('*').order('created_at', { ascending: false }),
          this.client.from('medicines').select('*')
        ]);

        const patch = {};
        if (qRes.data && qRes.data.length) {
          patch.consultQueue = qRes.data.map(q => ({
            id: q.id,
            token: q.token,
            patientName: q.patient_name,
            age: q.age,
            gender: q.gender,
            complaint: q.complaint,
            vitals: { bp: q.bp, spo2: q.spo2, temp: q.temp, pulse: q.pulse },
            triage: q.triage,
            time: q.queue_time,
            status: q.status
          }));
        }

        if (hospRes.data && hospRes.data.length) {
          patch.hospitals = hospRes.data.map(h => ({
            id: h.id,
            name: h.name,
            type: h.type,
            distance: h.distance,
            totalBeds: h.total_beds,
            genBedsAvail: h.gen_beds_avail,
            icuBedsAvail: h.icu_beds_avail,
            oxygenBedsAvail: h.oxygen_beds_avail,
            doctorOnDuty: h.doctor_on_duty,
            phone: h.phone
          }));
        }

        if (bloodRes.data && bloodRes.data.length) {
          const bank = {};
          bloodRes.data.forEach(b => { bank[b.blood_group] = b.units_available; });
          patch.bloodBank = bank;
        }

        if (staffRes.data && staffRes.data.length) {
          patch.staff = staffRes.data.map(s => ({
            id: s.staff_code,
            name: s.name,
            role: s.role,
            phone: s.phone,
            location: s.location,
            status: s.status,
            regNo: s.reg_no,
            password: s.password_hash,
            pin: s.pin
          }));
        }

        if (ancRes.data && ancRes.data.length) {
          patch.ancRecords = ancRes.data.map(a => ({
            id: a.id,
            motherName: a.mother_name,
            husbandName: a.husband_name,
            age: a.age,
            village: a.village,
            weeks: a.weeks,
            edd: a.edd,
            bp: a.bp,
            hb: a.hb,
            ifaCount: a.ifa_count,
            riskLevel: a.risk_level,
            nextVisit: a.next_visit
          }));
        }

        if (immRes.data && immRes.data.length) {
          patch.immunizations = immRes.data.map(i => ({
            id: i.id,
            childName: i.child_name,
            parentName: i.parent_name,
            dob: i.dob,
            gender: i.gender,
            village: i.village,
            lastVaccine: i.last_vaccine,
            nextDue: i.next_due,
            status: i.status
          }));
        }

        if (visRes.data && visRes.data.length) {
          patch.homeVisits = visRes.data.map(v => ({
            id: v.id,
            household: v.household,
            members: v.members,
            priority: v.priority,
            task: v.task,
            status: v.status
          }));
        }

        if (rxRes.data && rxRes.data.length) {
          patch.prescriptions = rxRes.data.map(r => ({
            id: r.id,
            token: r.token,
            patientName: r.patient_name,
            doctorName: r.doctor_name,
            date: r.rx_date,
            diagnosis: r.diagnosis,
            medicines: r.medicines || [],
            advice: r.advice
          }));
        }

        if (medRes.data && medRes.data.length) {
          patch.medicines = medRes.data.map(m => ({
            id: m.id,
            name: m.name,
            category: m.category,
            stock: m.stock,
            unit: m.unit,
            genericPrice: Number(m.generic_price),
            brandPrice: Number(m.brand_price),
            status: m.status
          }));
        }

        // Apply to store
        Object.assign(global.appStore.state, patch);
        global.appStore.saveState();

        // Trigger active UI re-renders across all portals
        if (global.patientController) {
          if (typeof global.patientController.renderHospitals === 'function') global.patientController.renderHospitals();
          if (typeof global.patientController.renderBloodBank === 'function') global.patientController.renderBloodBank();
        }
        if (global.doctorController) {
          if (typeof global.doctorController.renderQueue === 'function') global.doctorController.renderQueue();
          if (typeof global.doctorController.renderStats === 'function') global.doctorController.renderStats();
          if (typeof global.doctorController.renderPrescriptions === 'function') global.doctorController.renderPrescriptions();
        }
        if (global.workerController) {
          if (typeof global.workerController.renderAnc === 'function') global.workerController.renderAnc();
          if (typeof global.workerController.renderImmunizations === 'function') global.workerController.renderImmunizations();
          if (typeof global.workerController.renderVisits === 'function') global.workerController.renderVisits();
        }
        if (global.adminController) {
          if (typeof global.adminController.renderStats === 'function') global.adminController.renderStats();
          if (typeof global.adminController.renderStaff === 'function') global.adminController.renderStaff();
          if (typeof global.adminController.renderHospitals === 'function') global.adminController.renderHospitals();
          if (typeof global.adminController.renderBloodBank === 'function') global.adminController.renderBloodBank();
          if (typeof global.adminController.renderMedicines === 'function') global.adminController.renderMedicines();
        }
      } catch (err) {
        console.warn('[Supabase] Sync warning:', err);
      }
    }

    // Realtime Subscriptions across all tables
    setupRealtimeSubscriptions() {
      if (!this.client) return;

      this.channels.forEach(ch => this.client.removeChannel(ch));
      this.channels = [];

      const tables = ['consult_queue', 'hospitals', 'blood_bank', 'prescriptions', 'anc_records', 'immunizations', 'home_visits', 'medicines', 'staff', 'sos_alerts'];

      tables.forEach(table => {
        const ch = this.client.channel('public:' + table)
          .on('postgres_changes', { event: '*', schema: 'public', table: table }, payload => {
            console.log('[Supabase Realtime] Event on ' + table + ':', payload);
            this.syncInitialData();
          })
          .subscribe();
        this.channels.push(ch);
      });
    }

    // Comprehensive Write Methods
    async insertPrescription(rx) {
      if (!this.client) return;
      return await this.client.from('prescriptions').insert([{
        token: rx.token,
        patient_name: rx.patientName,
        doctor_name: rx.doctorName,
        rx_date: rx.date,
        diagnosis: rx.diagnosis,
        medicines: rx.medicines,
        advice: rx.advice
      }]);
    }

    async insertQueuePatient(item) {
      if (!this.client) return;
      return await this.client.from('consult_queue').insert([{
        token: item.token,
        patient_name: item.patientName,
        age: item.age,
        gender: item.gender,
        complaint: item.complaint,
        bp: item.vitals ? item.vitals.bp : '120/80',
        spo2: item.vitals ? item.vitals.spo2 : '98%',
        temp: item.vitals ? item.vitals.temp : '98.6°F',
        pulse: item.vitals ? item.vitals.pulse : '78 bpm',
        triage: item.triage,
        queue_time: item.time,
        status: 'Waiting'
      }]);
    }

    async updateBedsCount(hospId, genBeds, icuBeds, oxyBeds) {
      if (!this.client) return;
      return await this.client.from('hospitals').update({
        gen_beds_avail: genBeds,
        icu_beds_avail: icuBeds,
        oxygen_beds_avail: oxyBeds
      }).eq('id', hospId);
    }

    async updateBloodUnits(group, count) {
      if (!this.client) return;
      return await this.client.from('blood_bank').update({
        units_available: count
      }).eq('blood_group', group);
    }

    async insertAncRecord(a) {
      if (!this.client) return;
      return await this.client.from('anc_records').insert([{
        mother_name: a.motherName,
        husband_name: a.husbandName,
        age: a.age || 24,
        village: a.village,
        weeks: a.weeks,
        edd: a.edd,
        bp: a.bp,
        hb: a.hb,
        ifa_count: a.ifaCount || 90,
        risk_level: a.riskLevel || 'Normal',
        next_visit: a.nextVisit
      }]);
    }

    async insertImmunization(i) {
      if (!this.client) return;
      return await this.client.from('immunizations').insert([{
        child_name: i.childName,
        parent_name: i.parentName,
        dob: i.dob,
        gender: i.gender,
        village: i.village,
        last_vaccine: i.lastVaccine,
        next_due: i.nextDue,
        status: i.status || 'Up to Date'
      }]);
    }

    async insertHomeVisit(v) {
      if (!this.client) return;
      return await this.client.from('home_visits').insert([{
        household: v.household,
        members: v.members || 4,
        priority: v.priority || 'Routine Check',
        task: v.task,
        status: v.status || 'Pending'
      }]);
    }

    async insertMedicine(m) {
      if (!this.client) return;
      return await this.client.from('medicines').insert([{
        name: m.name,
        category: m.category,
        stock: m.stock,
        unit: m.unit || 'Tablets',
        generic_price: m.genericPrice,
        brand_price: m.brandPrice,
        status: m.status || 'In Stock'
      }]);
    }

    async insertStaff(s) {
      if (!this.client) return;
      return await this.client.from('staff').insert([{
        staff_code: s.id,
        name: s.name,
        role: s.role,
        phone: s.phone,
        location: s.location,
        status: s.status || 'Active',
        reg_no: s.regNo,
        password_hash: s.password || (s.role + '@123'),
        pin: s.pin || '1234'
      }]);
    }

    async insertSosAlert(alert) {
      if (!this.client) return;
      return await this.client.from('sos_alerts').insert([{
        patient_name: alert.name,
        phone: alert.phone,
        village: alert.village,
        abha_id: alert.abhaId,
        status: 'Dispatched'
      }]);
    }
  }

  global.supabaseService = new SupabaseService();

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => global.supabaseService.init());
  } else {
    global.supabaseService.init();
  }

})(typeof window !== 'undefined' ? window : this);
