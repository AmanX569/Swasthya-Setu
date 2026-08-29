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
        console.log('✓ [Supabase] Connected to PostgreSQL instance at:', config.url);
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

    // Synchronize initial data from Supabase to store
    async syncInitialData() {
      if (!this.client || !global.appStore) return;
      try {
        const [qRes, hospRes, bloodRes, staffRes, ancRes, rxRes, medRes] = await Promise.all([
          this.client.from('consult_queue').select('*').order('created_at', { ascending: false }),
          this.client.from('hospitals').select('*').order('name'),
          this.client.from('blood_bank').select('*'),
          this.client.from('staff').select('*'),
          this.client.from('anc_records').select('*').order('created_at', { ascending: false }),
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

        // Apply to store
        Object.assign(global.appStore.state, patch);
        global.appStore.saveState();

        // Trigger active UI re-renders across portals
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
        console.warn('[Supabase] Initial sync warning:', err);
      }
    }

    // Realtime Subscriptions via WebSockets
    setupRealtimeSubscriptions() {
      if (!this.client) return;

      // Clean old channels
      this.channels.forEach(ch => this.client.removeChannel(ch));
      this.channels = [];

      const queueChannel = this.client.channel('public:consult_queue')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'consult_queue' }, payload => {
          console.log('[Supabase Realtime] Queue change:', payload);
          this.syncInitialData();
        })
        .subscribe();

      const hospitalChannel = this.client.channel('public:hospitals')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'hospitals' }, payload => {
          console.log('[Supabase Realtime] Hospitals change:', payload);
          this.syncInitialData();
        })
        .subscribe();

      const bloodChannel = this.client.channel('public:blood_bank')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'blood_bank' }, payload => {
          console.log('[Supabase Realtime] Blood Bank change:', payload);
          this.syncInitialData();
        })
        .subscribe();

      this.channels.push(queueChannel, hospitalChannel, bloodChannel);
    }

    // CRUD Methods
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
