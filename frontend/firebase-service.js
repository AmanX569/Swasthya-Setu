/**
 * Swasthya Setu - Cloud Firestore Service Layer
 * 
 * Provides real-time synchronization across devices with zero-disruption local fallback:
 * 1. 🚨 108 Emergency Ambulance GPS & Telemetry HUD
 * 2. 📅 OPD & Teleconsultation Appointment Booking & Queue
 * 3. 💊 Doctor e-Prescription Issuance & Jan Aushadhi generic mapping
 * 4. 👩‍⚕️ ASHA Frontline Health Worker Vitals & High-Risk ANC Tracking
 * 5. 🏥 PHC/CHC Bed & Blood Availability
 * 6. 🎥 WebRTC Signaling Channel
 */

(function(global) {
  'use strict';

  class FirebaseService {
    constructor() {
      this.listeners = [];
    }

    get db() {
      return global.firebaseConfigManager && global.firebaseConfigManager.db;
    }

    get isLive() {
      return !!(this.db && global.firebaseConfigManager && global.firebaseConfigManager.isConfigured);
    }

    // -------------------------------------------------------------
    // 1. 108 AMBULANCE DISPATCH & LIVE HUD
    // -------------------------------------------------------------
    async dispatchAmbulance(dispatchData) {
      const payload = {
        ...dispatchData,
        timestamp: new Date().toISOString(),
        status: 'enroute',
        etaMinutes: 12,
        speedKmph: 58,
        driver: {
          name: 'Ravi Shankar',
          phone: '+91 94120 10822',
          vehicleNo: 'UP 20 G 1082',
          type: 'ALS (Advanced Life Support)'
        },
        equipment: ['Oxygen Cylinder (Full)', 'AED Defibrillator', 'Pulse Oximeter', 'Stretcher Bed']
      };

      if (this.isLive) {
        try {
          const docRef = await this.db.collection('emergency_dispatches').add(payload);
          return { id: docRef.id, ...payload };
        } catch (e) {
          console.warn('Firestore write failed, saving to local state:', e);
        }
      }

      // Local fallback
      localStorage.setItem('swasthya_setu_active_108', JSON.stringify(payload));
      return { id: 'local-sos-' + Date.now(), ...payload };
    }

    subscribeAmbulanceHUD(callback) {
      if (this.isLive) {
        try {
          const unsub = this.db.collection('emergency_dispatches')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .onSnapshot(snapshot => {
              if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                callback({ id: snapshot.docs[0].id, ...data });
              }
            }, err => console.warn('Firestore 108 listener error:', err));
          this.listeners.push(unsub);
          return unsub;
        } catch (e) {}
      }

      // Local fallback listener (poll / storage event)
      const checkLocal = () => {
        try {
          const saved = localStorage.getItem('swasthya_setu_active_108');
          if (saved) callback(JSON.parse(saved));
        } catch (e) {}
      };
      checkLocal();
      window.addEventListener('storage', (e) => {
        if (e.key === 'swasthya_setu_active_108') checkLocal();
      });
    }

    // -------------------------------------------------------------
    // 2. APPOINTMENTS & QUEUE MANAGEMENT
    // -------------------------------------------------------------
    async bookAppointment(aptData) {
      const payload = {
        ...aptData,
        id: `apt-${Date.now()}`,
        status: 'confirmed',
        tokenNo: Math.floor(Math.random() * 20) + 1,
        createdAt: new Date().toISOString()
      };

      if (this.isLive) {
        try {
          await this.db.collection('appointments').doc(payload.id).set(payload);
          return payload;
        } catch (e) {
          console.warn('Firestore appointment save failed, saving local:', e);
        }
      }

      // Local storage fallback
      const saved = this.getLocalArray('swasthya_setu_appointments');
      saved.unshift(payload);
      localStorage.setItem('swasthya_setu_appointments', JSON.stringify(saved));
      return payload;
    }

    subscribeAppointments(callback) {
      if (this.isLive) {
        try {
          const unsub = this.db.collection('appointments')
            .orderBy('createdAt', 'desc')
            .limit(20)
            .onSnapshot(snapshot => {
              const list = [];
              snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
              callback(list);
            }, err => console.warn('Firestore apt listener error:', err));
          this.listeners.push(unsub);
          return unsub;
        } catch (e) {}
      }

      // Local fallback
      callback(this.getLocalArray('swasthya_setu_appointments'));
    }

    // -------------------------------------------------------------
    // 3. DOCTOR e-PRESCRIPTIONS & JAN AUSHADHI GENERICS
    // -------------------------------------------------------------
    async savePrescription(rxData) {
      const payload = {
        ...rxData,
        id: `rx-${Date.now()}`,
        issuedAt: new Date().toISOString(),
        qrVerificationCode: `ABDM-RX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
      };

      if (this.isLive) {
        try {
          await this.db.collection('prescriptions').doc(payload.id).set(payload);
          return payload;
        } catch (e) {
          console.warn('Firestore prescription save failed, saving local:', e);
        }
      }

      const list = this.getLocalArray('swasthya_setu_prescriptions');
      list.unshift(payload);
      localStorage.setItem('swasthya_setu_prescriptions', JSON.stringify(list));
      return payload;
    }

    subscribePrescriptions(patientId, callback) {
      if (this.isLive) {
        try {
          let query = this.db.collection('prescriptions').orderBy('issuedAt', 'desc');
          if (patientId) query = query.where('patientId', '==', patientId);
          const unsub = query.limit(15).onSnapshot(snapshot => {
            const list = [];
            snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
            callback(list);
          }, err => console.warn('Firestore rx listener error:', err));
          this.listeners.push(unsub);
          return unsub;
        } catch (e) {}
      }

      const list = this.getLocalArray('swasthya_setu_prescriptions');
      callback(patientId ? list.filter(r => r.patientId === patientId) : list);
    }

    // -------------------------------------------------------------
    // 4. ASHA FRONTLINE VITALS & ANC TRACKING
    // -------------------------------------------------------------
    async logFrontlineVitals(vitalsData) {
      const payload = {
        ...vitalsData,
        id: `vital-${Date.now()}`,
        loggedAt: new Date().toISOString(),
        synced: this.isLive
      };

      if (this.isLive) {
        try {
          await this.db.collection('frontline_vitals').doc(payload.id).set(payload);
          return payload;
        } catch (e) {
          console.warn('Firestore vitals save failed, queueing locally:', e);
        }
      }

      // Offline sync queue
      const queue = this.getLocalArray('swasthya_setu_vitals_queue');
      queue.unshift(payload);
      localStorage.setItem('swasthya_setu_vitals_queue', JSON.stringify(queue));
      return payload;
    }

    subscribeFrontlineVitals(callback) {
      if (this.isLive) {
        try {
          const unsub = this.db.collection('frontline_vitals')
            .orderBy('loggedAt', 'desc')
            .limit(30)
            .onSnapshot(snapshot => {
              const list = [];
              snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
              callback(list);
            }, err => console.warn('Firestore vitals listener error:', err));
          this.listeners.push(unsub);
          return unsub;
        } catch (e) {}
      }

      callback(this.getLocalArray('swasthya_setu_vitals_queue'));
    }

    // -------------------------------------------------------------
    // 5. WEBRTC SIGNALING ROOM CHANNEL
    // -------------------------------------------------------------
    async sendWebRTCSignal(roomId, signal) {
      if (this.isLive) {
        try {
          await this.db.collection('telemed_rooms').doc(roomId).set({
            ...signal,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
          return true;
        } catch (e) {}
      }
      localStorage.setItem(`swasthya_setu_webrtc_${roomId}`, JSON.stringify(signal));
      return true;
    }

    subscribeWebRTCRoom(roomId, callback) {
      if (this.isLive) {
        try {
          const unsub = this.db.collection('telemed_rooms').doc(roomId).onSnapshot(doc => {
            if (doc.exists) callback(doc.data());
          });
          this.listeners.push(unsub);
          return unsub;
        } catch (e) {}
      }

      window.addEventListener('storage', (e) => {
        if (e.key === `swasthya_setu_webrtc_${roomId}`) {
          try { callback(JSON.parse(e.newValue)); } catch (err) {}
        }
      });
    }

    // Helpers
    getLocalArray(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : [];
      } catch (e) {
        return [];
      }
    }
  }

  global.firebaseService = new FirebaseService();

})(typeof window !== 'undefined' ? window : this);
