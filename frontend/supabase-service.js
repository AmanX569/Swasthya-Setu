/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE CLOUD & OFFLINE SYNC SERVICE
 * Full Bidirectional Sync, Realtime Streaming & Offline Outbox
 * =========================================================
 */

(function(global) {
  'use strict';

  class SupabaseService {
    constructor() {
      this.client = null;
      this.isOnline = navigator.onLine !== false;
      this.channels = [];
      this.syncInterval = null;
      this.isSyncingOutbox = false;
      this.init();
    }

    init() {
      const config = global.SUPABASE_CONFIG || global.supabaseConfig || {};
      if (config.url && config.anonKey && global.supabase && typeof global.supabase.createClient === 'function') {
        try {
          this.client = global.supabase.createClient(config.url, config.anonKey, {
            realtime: {
              params: {
                eventsPerSecond: 10
              }
            }
          });
          console.log('[Supabase Service] Initialized Cloud Client successfully');
          this.checkConnection();
        } catch (e) {
          console.warn('[Supabase Service] Client initialization warning:', e);
        }
      }

      this.initNetworkListeners();
    }

    initNetworkListeners() {
      if (typeof window === 'undefined' || typeof window.addEventListener !== 'function') return;

      window.addEventListener('online', () => {
        console.log('[Network] Internet Connection Restored');
        this.isOnline = true;
        this.updateNetworkBadge();
        if (global.toast) global.toast('📶 Internet Restored: Flushing Offline Outbox to Cloud...');
        this.checkConnection().then(() => {
          this.flushOfflineOutbox();
        });
      });

      window.addEventListener('offline', () => {
        console.log('[Network] Internet Connection Lost - Switching to Offline Outbox Mode');
        this.isOnline = false;
        this.updateNetworkBadge();
        if (global.toast) global.toast('🟡 Offline Mode Active: Data will be saved locally & auto-synced when online');
      });

      // Initial badge update
      this.updateNetworkBadge();

      // Check pending outbox on startup
      setTimeout(() => {
        if (this.isOnline) this.flushOfflineOutbox();
      }, 2000);
    }

    updateNetworkBadge() {
      if (typeof document === 'undefined') return;
      const badge = document.getElementById('networkStatusBadge');
      if (!badge) return;

      const outboxCount = this.getPendingOutboxCount();

      if (!navigator.onLine || !this.isOnline) {
        badge.innerHTML = `🟡 Offline Mode ${outboxCount > 0 ? '(' + outboxCount + ' queued)' : ''}`;
        badge.style.background = 'rgba(245, 158, 11, 0.18)';
        badge.style.color = '#d97706';
        badge.style.borderColor = 'rgba(245, 158, 11, 0.4)';
      } else if (this.isSyncingOutbox) {
        badge.innerHTML = `🔄 Syncing (${outboxCount} pending)...`;
        badge.style.background = 'rgba(2, 132, 199, 0.18)';
        badge.style.color = '#0284c7';
        badge.style.borderColor = 'rgba(2, 132, 199, 0.4)';
      } else {
        badge.innerHTML = `🟢 Online`;
        badge.style.background = 'rgba(22, 163, 74, 0.15)';
        badge.style.color = '#16a34a';
        badge.style.borderColor = 'rgba(22, 163, 74, 0.35)';
      }
    }

    // =========================================================================
    // OFFLINE OUTBOX MANAGEMENT
    // =========================================================================
    getPendingOutbox() {
      try {
        const raw = localStorage.getItem('swasthya_setu_outbox');
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    getPendingOutboxCount() {
      return this.getPendingOutbox().length;
    }

    savePendingOutbox(outbox) {
      try {
        localStorage.setItem('swasthya_setu_outbox', JSON.stringify(outbox));
        this.updateNetworkBadge();
      } catch (e) {
        console.error('[Outbox] Failed to save to localStorage:', e);
      }
    }

    enqueueOfflineAction(action, table, payload) {
      const outbox = this.getPendingOutbox();
      const item = {
        id: 'OUTBOX-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
        action,
        table,
        payload,
        createdAt: new Date().toISOString()
      };
      outbox.push(item);
      this.savePendingOutbox(outbox);
      console.log('[Offline Outbox] Enqueued action:', action, 'on table:', table, item);

      if (global.toast) {
        global.toast('📦 Record queued in Offline Outbox (' + outbox.length + ' pending sync)');
      }
      return item;
    }

    async flushOfflineOutbox() {
      if (this.isSyncingOutbox) return;
      const outbox = this.getPendingOutbox();
      if (!outbox.length || !this.client || !this.isOnline) {
        this.updateNetworkBadge();
        return;
      }

      this.isSyncingOutbox = true;
      this.updateNetworkBadge();
      console.log('[Offline Outbox] Flushing ' + outbox.length + ' queued actions to Cloud Database...');

      let successCount = 0;
      const remaining = [];

      for (const item of outbox) {
        try {
          let res = null;
          const p = item.payload;

          switch (item.action) {
            case 'insert_profile':
              res = await this.client.from('profiles').insert([{
                abha_id: p.abhaId || p.abha_id,
                name: p.name,
                phone: p.phone,
                age: p.age,
                gender: p.gender,
                village: p.village,
                blood_group: p.bloodGroup || p.blood_group
              }]);
              break;

            case 'insert_video_call':
              try {
                res = await this.client.from('video_call_history').insert([{
                  token: p.token || 'VID-101',
                  caller_role: p.callerRole,
                  caller_name: p.callerName,
                  caller_phone: p.callerPhone,
                  recipient_role: p.recipientRole,
                  recipient_name: p.recipientName,
                  facilitator_name: p.facilitatorName,
                  status: p.status,
                  duration: p.duration,
                  call_date: p.date,
                  call_time: p.time,
                  notes: p.notes,
                  rx_id: p.rxId
                }]);
              } catch (err) {
                console.warn('[Supabase] Video call history table sync skipped:', err.message);
              }
              break;

            case 'insert_prescription':
              res = await this.client.from('prescriptions').insert([{
                token: p.token || 'Rx',
                patient_name: p.patientName || p.patient_name,
                doctor_name: p.doctorName || p.doctor_name,
                rx_date: p.date || p.rx_date || new Date().toISOString().split('T')[0],
                diagnosis: p.diagnosis,
                medicines: p.medicines || [],
                advice: p.advice
              }]);
              break;

            case 'delete_prescription':
              res = await this.client.from('prescriptions').delete().or(`id.eq.${p.rxId},token.eq.${p.rxId}`);
              break;

            case 'insert_queue':
              res = await this.client.from('consult_queue').insert([{
                token: p.token || 'T-01',
                patient_name: p.patientName || p.patient_name,
                age: p.age,
                gender: p.gender,
                complaint: p.complaint,
                bp: p.vitals ? p.vitals.bp : '120/80',
                spo2: p.vitals ? p.vitals.spo2 : '98%',
                temp: p.vitals ? p.vitals.temp : '98.6°F',
                pulse: p.vitals ? p.vitals.pulse : '78 bpm',
                triage: p.triage || 'Green',
                queue_time: p.time || p.queue_time || '10:00 AM',
                status: 'Waiting'
              }]);
              break;

            case 'delete_queue':
              res = await this.client.from('consult_queue').delete().eq('id', p.queueId);
              break;

            case 'insert_anc':
              res = await this.client.from('anc_records').insert([{
                mother_name: p.motherName || p.mother_name,
                husband_name: p.husbandName || p.husband_name,
                age: p.age || 24,
                village: p.village,
                weeks: p.weeks,
                edd: p.edd,
                bp: p.bp,
                hb: p.hb,
                ifa_count: p.ifaCount || p.ifa_count || 90,
                risk_level: p.riskLevel || p.risk_level || 'Normal',
                next_visit: p.nextVisit || p.next_visit
              }]);
              break;

            case 'insert_immunization':
              res = await this.client.from('immunizations').insert([{
                child_name: p.childName || p.child_name,
                parent_name: p.parentName || p.parent_name,
                dob: p.dob,
                gender: p.gender,
                village: p.village,
                last_vaccine: p.lastVaccine || p.last_vaccine,
                next_due: p.nextDue || p.next_due,
                status: p.status || 'Up to Date'
              }]);
              break;

            case 'insert_visit':
              res = await this.client.from('home_visits').insert([{
                household: p.household,
                members: p.members || 4,
                priority: p.priority || 'Routine Check',
                task: p.task,
                status: p.status || 'Pending'
              }]);
              break;

            case 'insert_medicine':
              res = await this.client.from('medicines').insert([{
                name: p.name,
                category: p.category,
                stock: p.stock,
                unit: p.unit || 'Tablets',
                generic_price: p.genericPrice || p.generic_price,
                brand_price: p.brandPrice || p.brand_price,
                status: p.status || 'In Stock'
              }]);
              break;

            case 'delete_medicine':
              res = await this.client.from('medicines').delete().eq('id', p.id);
              break;

            case 'update_beds':
              res = await this.client.from('hospitals').update({
                gen_beds_avail: p.genBeds,
                icu_beds_avail: p.icuBeds,
                oxygen_beds_avail: p.oxyBeds
              }).eq('id', p.hospId);
              break;

            case 'update_blood':
              res = await this.client.from('blood_bank').update({
                units_available: p.count
              }).eq('blood_group', p.group);
              break;

            case 'insert_staff':
              res = await this.client.from('staff').insert([{
                staff_code: p.staff_code || p.id,
                name: p.name,
                role: p.role,
                phone: p.phone,
                location: p.location,
                status: p.status || 'Active Online',
                reg_no: p.regNo || p.reg_no,
                password_hash: p.password || p.password_hash || (p.role + '@123'),
                pin: p.pin || p.password || '1234'
              }]);
              break;

            case 'delete_staff':
              res = await this.client.from('staff').delete().or(`id.eq.${p.id},staff_code.eq.${p.id}`);
              break;
            case 'delete_video_call':
              res = await this.client.from('video_call_history').delete().or('id.eq.' + p.id + ',token.eq.' + p.id);
              break;
          }

          if (res && res.error) {
            console.warn('[Outbox] Error syncing item:', item.action, res.error);
            remaining.push(item);
          } else {
            successCount++;
          }
        } catch (err) {
          console.warn('[Outbox] Network failure during item sync:', item.action, err);
          remaining.push(item);
        }
      }

      this.savePendingOutbox(remaining);
      this.isSyncingOutbox = false;
      this.updateNetworkBadge();

      if (successCount > 0) {
        console.log('[Offline Outbox] Successfully flushed ' + successCount + ' items to Cloud Database');
        if (global.toast) {
          global.toast('⚡ ' + successCount + ' offline records successfully synchronized to National Cloud!');
        }
        // Fetch latest cloud state and re-render all active portals
        this.syncInitialData();
        if (!this.syncInterval) {
          this.syncInterval = setInterval(() => {
            if (this.isOnline && this.client) this.syncInitialData();
          }, 8000);
        }
      }
    }

    async checkConnection() {
      if (!this.client || !navigator.onLine) {
        this.isOnline = false;
        this.updateNetworkBadge();
        return false;
      }

      try {
        const { data, error } = await this.client.from('hospitals').select('id').limit(1);
        if (error) throw error;
        this.isOnline = true;
        this.updateNetworkBadge();
        this.setupRealtimeSubscriptions();
        this.syncInitialData();
        return true;
      } catch (err) {
        console.warn('[Supabase Service] Cloud database not reachable, working offline:', err.message);
        this.isOnline = false;
        this.updateNetworkBadge();
        return false;
      }
    }

    async syncInitialData() {
      if (!this.client || !this.isOnline || !global.appStore) return;

      try {
        const [profRes, staffRes, qRes, hospRes, bloodRes, ancRes, immRes, visRes, rxRes, medRes] = await Promise.all([
          this.client.from('profiles').select('*'),
          this.client.from('staff').select('*'),
          this.client.from('consult_queue').select('*').order('created_at', { ascending: true }),
          this.client.from('hospitals').select('*'),
          this.client.from('blood_bank').select('*'),
          this.client.from('anc_records').select('*').order('created_at', { ascending: false }),
          this.client.from('immunizations').select('*').order('created_at', { ascending: false }),
          this.client.from('home_visits').select('*').order('created_at', { ascending: false }),
          this.client.from('prescriptions').select('*').order('created_at', { ascending: false }),
          this.client.from('medicines').select('*')
        ]);

        const patch = {};

        // 1. PATIENTS / CITIZEN PROFILES: Strict Cloud Source of Truth
        if (profRes && Array.isArray(profRes.data)) {
          patch.patients = profRes.data.map(p => ({
            id: p.id,
            abhaId: p.abha_id,
            name: p.name,
            phone: p.phone,
            age: p.age,
            gender: p.gender,
            village: p.village,
            bloodGroup: p.blood_group,
            password: p.password_hash || p.password || p.pin || '123456',
            pin: p.pin || p.password_hash || p.password || '123456'
          }));

          const currentSession = global.appStore ? global.appStore.getState().session : null;
          if (currentSession && currentSession.isLoggedIn && currentSession.user) {
            patch.currentUser = currentSession.user;
          } else {
            patch.currentUser = null;
          }
        }

        if (staffRes && Array.isArray(staffRes.data)) {
          const defaultStaff = [
            { id: 'ADM-7856', staff_code: 'ADM-7856', name: 'Aman Yadav', role: 'admin', phone: '7906684557', location: 'District HQ', status: 'Active Online', regNo: 'ADM-AP-001', password: 'Aman@123', pin: 'Aman@123' },
            { id: 'DOC-101', staff_code: 'DOC-101', name: 'Dr. Priya Sharma, MBBS, MD', role: 'doctor', phone: '9811122233', location: 'Kondapalli PHC (General Medicine)', status: 'Active Online', regNo: 'MCI-AP-48912', password: 'doc@123', pin: '1234' },
            { id: 'DOC-102', staff_code: 'DOC-102', name: 'Dr. Rajesh Verma, MBBS, MS', role: 'doctor', phone: '9822233344', location: 'Ibrahimpatnam CHC (Physician & Critical Care)', status: 'Active Online', regNo: 'MCI-AP-51023', password: 'doc@123', pin: '1234' },
            { id: 'DOC-103', staff_code: 'DOC-103', name: 'Dr. Ananya Reddy, MBBS, DGO', role: 'doctor', phone: '9833311122', location: 'District Hospital (Gynecology & Maternal Care)', status: 'Active Online', regNo: 'MCI-AP-62491', password: 'doc@123', pin: '1234' },
            { id: 'ASH-201', staff_code: 'ASH-201', name: 'Lakshmi Didi (ASHA Lead)', role: 'worker', phone: '9833344455', location: 'Sector 4, Kondapalli', status: 'On Home Visits', regNo: 'ASHA-AP-094', password: 'asha@123', pin: '1234' }
          ];

          if (staffRes.data.length > 0) {
            patch.staff = staffRes.data.map(s => ({
              id: s.staff_code || s.id,
              staff_code: s.staff_code || s.id,
              name: s.name,
              role: s.role,
              phone: s.phone,
              location: s.location || 'District Health Centre',
              status: s.status || 'Active Online',
              regNo: s.reg_no || s.regNo || '—',
              password: s.password_hash || s.password || s.pin || (s.role + '@123'),
              pin: s.pin || s.password_hash || s.password || '1234'
            }));
          } else {
            patch.staff = defaultStaff;
          }
        }

        if (qRes && Array.isArray(qRes.data)) {
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

        if (ancRes && Array.isArray(ancRes.data)) {
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

        if (immRes && Array.isArray(immRes.data)) {
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

        if (visRes && Array.isArray(visRes.data)) {
          patch.homeVisits = visRes.data.map(v => ({
            id: v.id,
            household: v.household,
            members: v.members,
            priority: v.priority,
            task: v.task,
            status: v.status
          }));
        }

        if (rxRes && Array.isArray(rxRes.data)) {
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

        if (medRes && Array.isArray(medRes.data)) {
          patch.medicines = medRes.data.map(m => ({
            id: m.id || ('DRUG-' + String(Date.now()).slice(-4)),
            name: m.name,
            category: m.category,
            stock: m.stock,
            unit: m.unit,
            genericPrice: Number(m.generic_price || m.genericPrice || 10),
            brandPrice: Number(m.brand_price || m.brandPrice || 50),
            status: m.status || 'In Stock'
          }));
        }

        Object.assign(global.appStore.state, patch);
        global.appStore.saveState();

        // Re-render UI components across all portals
        if (global.patientController) {
          if (typeof global.patientController.renderDailyMedications === 'function') global.patientController.renderDailyMedications();
          if (typeof global.patientController.renderFamilyCircle === 'function') global.patientController.renderFamilyCircle();
          if (typeof global.patientController.renderLiveHospitals === 'function') global.patientController.renderLiveHospitals();
          if (typeof global.patientController.renderLiveBloodBank === 'function') global.patientController.renderLiveBloodBank();
          if (typeof global.patientController.renderPrescriptions === 'function') global.patientController.renderPrescriptions();
        }
        if (global.doctorController) {
          if (typeof global.doctorController.renderQueue === 'function') global.doctorController.renderQueue();
          if (typeof global.doctorController.renderPrescriptionHistory === 'function') global.doctorController.renderPrescriptionHistory();
        }
        if (global.workerController) {
          if (typeof global.workerController.renderAncTable === 'function') global.workerController.renderAncTable();
          if (typeof global.workerController.renderUipTable === 'function') global.workerController.renderUipTable();
          if (typeof global.workerController.renderHomeVisits === 'function') global.workerController.renderHomeVisits();
          if (typeof global.workerController.renderMasterRegistry === 'function') global.workerController.renderMasterRegistry();
        }
        if (global.adminController) {
          if (typeof global.adminController.renderAdminMedicines === 'function') global.adminController.renderAdminMedicines();
          if (typeof global.adminController.renderStaffTable === 'function') global.adminController.renderStaffTable();
          if (typeof global.adminController.renderAdminBeds === 'function') global.adminController.renderAdminBeds();
          if (typeof global.adminController.renderAdminBlood === 'function') global.adminController.renderAdminBlood();
          if (typeof global.adminController.renderKpis === 'function') global.adminController.renderKpis();
        }

        console.log('[Supabase Cloud] State successfully synchronized with Cloud Database');
      } catch (err) {
        console.warn('[Supabase Cloud] Synchronization warning:', err.message);
      }
    }

    setupRealtimeSubscriptions() {
      if (!this.client || !this.isOnline) return;

      this.channels.forEach(ch => this.client.removeChannel(ch));
      this.channels = [];

      const tables = ['consult_queue', 'hospitals', 'blood_bank', 'prescriptions', 'anc_records', 'immunizations', 'home_visits', 'medicines', 'staff', 'profiles', 'sos_alerts'];

      tables.forEach(table => {
        const ch = this.client.channel('public:' + table)
          .on('postgres_changes', { event: '*', schema: 'public', table: table }, payload => {
            console.log('[Supabase Realtime] Event on ' + table + ':', payload);
            
            // If new prescription arrived, notify patient immediately
            if (table === 'prescriptions' && (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE')) {
              const newRx = payload.new;
              if (global.toast) {
                global.toast('🔔 New e-Prescription Received from ' + (newRx.doctor_name || 'Doctor') + '! Tap to View & Download PDF');
              }
            }

            this.syncInitialData();
          })
          .subscribe();
        this.channels.push(ch);
      });
    }

    // =========================================================================
    // WRITE OPERATIONS WITH RESILIENT OFFLINE FALLBACK
    // =========================================================================
    async deletePrescription(rxId) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('delete_prescription', 'prescriptions', { rxId });
      }
      try {
        return await this.client.from('prescriptions').delete().or(`id.eq.${rxId},token.eq.${rxId}`);
      } catch (e) {
        return this.enqueueOfflineAction('delete_prescription', 'prescriptions', { rxId });
      }
    }

    // =========================================================
    // REAL-TIME TELECONSULTATION SIGNALING (WEBRTC BROADCAST)
    // =========================================================
    initTeleconsultChannel() {
      if (!this.client) return;
      try {
        if (this.teleconsultChannel) {
          this.client.removeChannel(this.teleconsultChannel);
        }
        this.teleconsultChannel = this.client.channel('teleconsult_realtime_grid', {
          config: { broadcast: { self: false } }
        });

        this.teleconsultChannel.on('broadcast', { event: 'teleconsult_signal' }, (payload) => {
          const actualSignal = (payload && payload.payload) ? payload.payload : payload;
          if (actualSignal && actualSignal.type && typeof this.onSignalCallback === 'function') {
            this.onSignalCallback(actualSignal);
          }
        });

        this.teleconsultChannel.subscribe((status) => {
          console.log('[Supabase Realtime] Teleconsult Signaling Channel Status:', status);
        });
      } catch (err) {
        console.warn('[Supabase Realtime] Teleconsult channel init fallback:', err.message);
      }
    }

        sendTeleconsultSignal(signalData) {
      // 1. Broadcast via Modern BroadcastChannel for instant 0ms cross-tab signaling
      if (typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function') {
        try {
          if (!this.localBroadcastChannel) {
            this.localBroadcastChannel = new window.BroadcastChannel('swasthya_teleconsult_channel');
          }
          this.localBroadcastChannel.postMessage(signalData);
        } catch (e) {}
      }

      // 2. Broadcast via Supabase Realtime Channel
      if (this.teleconsultChannel && this.isOnline) {
        try {
          this.teleconsultChannel.send({
            type: 'broadcast',
            event: 'teleconsult_signal',
            payload: signalData
          });
        } catch (e) {
          console.warn('[Supabase Realtime] Broadcast send error:', e.message);
        }
      }

      // 3. Broadcast via Window LocalStorage for fallback cross-tab sync
      try {
        localStorage.setItem('swasthya_teleconsult_active_signal', JSON.stringify({
          ...signalData,
          _sigTime: Date.now()
        }));
      } catch (e) {}
    }

        onTeleconsultSignal(callback) {
      this.onSignalCallback = callback;
      if (!this.teleconsultChannel) {
        this.initTeleconsultChannel();
      }

      // 1. Listen to BroadcastChannel for instant 0ms tab-to-tab signaling
      if (typeof window !== 'undefined' && typeof window.BroadcastChannel === 'function') {
        try {
          if (!this.localBroadcastChannel) {
            this.localBroadcastChannel = new window.BroadcastChannel('swasthya_teleconsult_channel');
          }
          this.localBroadcastChannel.onmessage = (event) => {
            if (event.data && typeof callback === 'function') {
              callback(event.data);
            }
          };
        } catch (e) {}
      }

      // 2. Listen to storage events for cross-tab simulation
      if (typeof window !== 'undefined' && window.addEventListener) {
        window.addEventListener('storage', (e) => {
          if (e.key === 'swasthya_teleconsult_active_signal' && e.newValue) {
            try {
              const data = JSON.parse(e.newValue);
              if (Date.now() - (data._sigTime || 0) < 15000) {
                callback(data);
              }
            } catch (err) {}
          }
        });
      }
    }

    async insertVideoCallLog(call) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_video_call', 'video_call_history', call);
      }
      try {
        return await this.client.from('video_call_history').insert([{
          token: call.token || 'VID-101',
          caller_role: call.callerRole,
          caller_name: call.callerName,
          caller_phone: call.callerPhone,
          recipient_role: call.recipientRole,
          recipient_name: call.recipientName,
          facilitator_name: call.facilitatorName,
          status: call.status || 'Completed',
          duration: call.duration,
          call_date: call.date || new Date().toISOString().split('T')[0],
          call_time: call.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          notes: call.notes,
          rx_id: call.rxId
        }]);
      } catch (e) {
        console.warn('[Supabase] Cloud video call logging fallback:', e.message);
        return this.enqueueOfflineAction('insert_video_call', 'video_call_history', call);
      }
    }
    async deleteVideoCallLog(callId) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('delete_video_call', 'video_call_history', { id: callId });
      }
      try {
        return await this.client.from('video_call_history').delete().or('id.eq.' + callId + ',token.eq.' + callId);
      } catch (e) {
        return this.enqueueOfflineAction('delete_video_call', 'video_call_history', { id: callId });
      }
    }


    async insertPrescription(rx) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_prescription', 'prescriptions', rx);
      }
      try {
        return await this.client.from('prescriptions').insert([{
          token: rx.token || 'Rx',
          patient_name: rx.patientName || rx.patient_name,
          doctor_name: rx.doctorName || rx.doctor_name,
          rx_date: rx.date || rx.rx_date || new Date().toISOString().split('T')[0],
          diagnosis: rx.diagnosis,
          medicines: rx.medicines || [],
          advice: rx.advice
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_prescription', 'prescriptions', rx);
      }
    }

    async deleteQueueItem(queueId, token) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('delete_queue', 'consult_queue', { queueId, token });
      }
      try {
        if (token) {
          return await this.client.from('consult_queue').delete().eq('token', token);
        }
        return await this.client.from('consult_queue').delete().or(`id.eq.${queueId},token.eq.${queueId}`);
      } catch (e) {
        return this.enqueueOfflineAction('delete_queue', 'consult_queue', { queueId, token });
      }
    }

    async insertQueuePatient(item) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_queue', 'consult_queue', item);
      }
      try {
        return await this.client.from('consult_queue').insert([{
          token: item.token || 'T-01',
          patient_name: item.patientName || item.patient_name || 'Citizen Patient',
          age: item.age || 30,
          gender: item.gender || 'M',
          complaint: item.complaint || 'General Consultation',
          bp: item.vitals ? item.vitals.bp : '120/80',
          spo2: item.vitals ? item.vitals.spo2 : '98%',
          temp: item.vitals ? item.vitals.temp : '98.6°F',
          pulse: item.vitals ? item.vitals.pulse : '78 bpm',
          triage: item.triage || 'Green',
          queue_time: item.time || item.queue_time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'Waiting'
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_queue', 'consult_queue', item);
      }
    }

    async updateBedsCount(hospId, genBeds, icuBeds, oxyBeds) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('update_beds', 'hospitals', { hospId, genBeds, icuBeds, oxyBeds });
      }
      try {
        return await this.client.from('hospitals').update({
          gen_beds_avail: genBeds,
          icu_beds_avail: icuBeds,
          oxygen_beds_avail: oxyBeds
        }).eq('id', hospId);
      } catch (e) {
        return this.enqueueOfflineAction('update_beds', 'hospitals', { hospId, genBeds, icuBeds, oxyBeds });
      }
    }

    async updateBloodUnits(group, count) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('update_blood', 'blood_bank', { group, count });
      }
      try {
        return await this.client.from('blood_bank').update({
          units_available: count
        }).eq('blood_group', group);
      } catch (e) {
        return this.enqueueOfflineAction('update_blood', 'blood_bank', { group, count });
      }
    }

    async insertAncRecord(a) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_anc', 'anc_records', a);
      }
      try {
        return await this.client.from('anc_records').insert([{
          mother_name: a.motherName || a.mother_name,
          husband_name: a.husbandName || a.husband_name,
          age: a.age || 24,
          village: a.village,
          weeks: a.weeks,
          edd: a.edd,
          bp: a.bp,
          hb: a.hb,
          ifa_count: a.ifaCount || a.ifa_count || 90,
          risk_level: a.riskLevel || a.risk_level || 'Normal',
          next_visit: a.nextVisit || a.next_visit
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_anc', 'anc_records', a);
      }
    }

    async insertImmunization(i) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_immunization', 'immunizations', i);
      }
      try {
        return await this.client.from('immunizations').insert([{
          child_name: i.childName || i.child_name,
          parent_name: i.parentName || i.parent_name,
          dob: i.dob,
          gender: i.gender,
          village: i.village,
          last_vaccine: i.lastVaccine || i.last_vaccine,
          next_due: i.nextDue || i.next_due,
          status: i.status || 'Up to Date'
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_immunization', 'immunizations', i);
      }
    }

    async insertHomeVisit(v) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_visit', 'home_visits', v);
      }
      try {
        return await this.client.from('home_visits').insert([{
          household: v.household,
          members: v.members || 4,
          priority: v.priority || 'Routine Check',
          task: v.task,
          status: v.status || 'Pending'
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_visit', 'home_visits', v);
      }
    }

    async insertMedicine(m) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_medicine', 'medicines', m);
      }
      try {
        return await this.client.from('medicines').insert([{
          name: m.name,
          category: m.category,
          stock: m.stock,
          unit: m.unit || 'Tablets',
          generic_price: m.genericPrice || m.generic_price,
          brand_price: m.brandPrice || m.brand_price,
          status: m.status || 'In Stock'
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_medicine', 'medicines', m);
      }
    }

    async deleteMedicine(id) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('delete_medicine', 'medicines', { id });
      }
      try {
        return await this.client.from('medicines').delete().eq('id', id);
      } catch (e) {
        return this.enqueueOfflineAction('delete_medicine', 'medicines', { id });
      }
    }

    async insertStaff(s) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_staff', 'staff', s);
      }
      try {
        return await this.client.from('staff').insert([{
          staff_code: s.staff_code || s.id,
          name: s.name,
          role: s.role,
          phone: s.phone,
          location: s.location || 'District Health Centre',
          status: s.status || 'Active Online',
          reg_no: s.regNo || s.reg_no,
          password_hash: s.password || s.password_hash || (s.role + '@123'),
          pin: s.pin || s.password || '1234'
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_staff', 'staff', s);
      }
    }

    async deleteStaff(id) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('delete_staff', 'staff', { id });
      }
      try {
        return await this.client.from('staff').delete().or(`id.eq.${id},staff_code.eq.${id}`);
      } catch (e) {
        return this.enqueueOfflineAction('delete_staff', 'staff', { id });
      }
    }

    async insertProfile(p) {
      if (!this.client || !this.isOnline) {
        return this.enqueueOfflineAction('insert_profile', 'profiles', p);
      }
      try {
        return await this.client.from('profiles').insert([{
          abha_id: p.abhaId || p.abha_id,
          name: p.name,
          phone: p.phone,
          age: p.age,
          gender: p.gender,
          village: p.village,
          blood_group: p.bloodGroup || p.blood_group
        }]);
      } catch (e) {
        return this.enqueueOfflineAction('insert_profile', 'profiles', p);
      }
    }
  }

  global.supabaseService = new SupabaseService();

})(typeof window !== 'undefined' ? window : this);
