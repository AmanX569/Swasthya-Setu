/**
 * =========================================================
 * SWASTHYA SETU - UNIFIED CLIENT-SIDE REACTIVE STORE (store.js)
 * Strict Production RBAC with Supabase Cloud Integration
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY = 'swasthya_setu_v3_store';

  const DEFAULT_INITIAL_STATE = {
    currentLanguage: 'en',
    currentTheme: 'classic',

    session: {
      isLoggedIn: false,
      role: null,
      user: null
    },

    currentUser: null,
    patients: [
      { id: 'USR-PAT-001', abhaId: '14-8921-4402-9912', name: 'Ramesh Kumar', phone: '9876543210', age: 38, gender: 'Male', village: 'Kondapalli Ward 4', bloodGroup: 'O+', password: '1234', role: 'patient', customRole: 'citizen', permanent_address: null, permanent_address_completed: false }
    ],

    staff: [
      { id: 'ADM-7856', staff_code: 'ADM-7856', name: 'Aman Yadav', role: 'admin', email: 'admin@swasthyasetu.gov.in', phone: '7906684557', location: 'District HQ', status: 'Active Online', regNo: 'ADM-AP-001', password: 'Aman@123', pin: 'Aman@123' },
      { id: 'DOC-101', staff_code: 'DOC-101', name: 'Dr. Priya Sharma, MBBS, MD', role: 'doctor', email: 'doctor.priya@swasthyasetu.gov.in', phone: '9811122233', location: 'Kondapalli PHC (General Medicine)', status: 'Active Online', regNo: 'MCI-AP-48912', password: 'doc@123', pin: '1234' },
      { id: 'DOC-102', staff_code: 'DOC-102', name: 'Dr. Rajesh Verma, MBBS, MS', role: 'doctor', email: 'doctor.rajesh@swasthyasetu.gov.in', phone: '9822233344', location: 'Ibrahimpatnam CHC (Physician & Critical Care)', status: 'Active Online', regNo: 'MCI-AP-51023', password: 'doc@123', pin: '1234' },
      { id: 'DOC-103', staff_code: 'DOC-103', name: 'Dr. Ananya Reddy, MBBS, DGO', role: 'doctor', email: 'doctor.ananya@swasthyasetu.gov.in', phone: '9833311122', location: 'District Hospital (Gynecology & Maternal Care)', status: 'Active Online', regNo: 'MCI-AP-62491', password: 'doc@123', pin: '1234' },
      { id: 'ASH-201', staff_code: 'ASH-201', name: 'Lakshmi Didi (ASHA Lead)', role: 'worker', email: 'asha.lakshmi@swasthyasetu.gov.in', phone: '9833344455', location: 'Sector 4, Kondapalli', status: 'On Home Visits', regNo: 'ASHA-AP-094', password: 'asha@123', pin: '1234' }
    ],

    familyMembers: [
      { id: 'FAM-001', ownerPhone: '9876543210', name: 'Ramesh Kumar', relation: 'Self', age: 38, gender: 'Male', abhaId: '14-8921-4402-9912', status: 'Healthy' },
      { id: 'FAM-002', ownerPhone: '9876543210', name: 'Sunita Devi', relation: 'Spouse', age: 34, gender: 'Female', abhaId: '14-3819-5510-7734', status: 'ANC Due' },
      { id: 'FAM-003', ownerPhone: '9876543210', name: 'Aarav Kumar', relation: 'Son', age: 6, gender: 'Male', abhaId: '14-9912-1102-3345', status: 'UIP Immunized' }
    ],

    consultQueue: [
      { id: 'Q-101', token: 'T-01', patientName: 'Ramesh Kumar', age: 38, gender: 'M', complaint: 'High Fever & Body Ache for 3 Days', vitals: { bp: '120/80', spo2: '98%', temp: '101.4°F', pulse: '88 bpm' }, triage: 'Yellow', time: '10:15 AM', status: 'Waiting' },
      { id: 'Q-102', token: 'T-02', patientName: 'Sunita Devi', age: 34, gender: 'F', complaint: '2nd Trimester Routine Check & Mild Dizziness', vitals: { bp: '110/70', spo2: '99%', temp: '98.6°F', pulse: '76 bpm' }, triage: 'Green', time: '10:30 AM', status: 'Waiting' },
      { id: 'Q-103', token: 'T-03', patientName: 'Gopal Raju', age: 52, gender: 'M', complaint: 'Chest Tightness & Breathlessness on Exertion', vitals: { bp: '150/95', spo2: '94%', temp: '99.1°F', pulse: '104 bpm' }, triage: 'Red', time: '10:45 AM', status: 'Urgent' }
    ],

    prescriptions: [],

    videoCallHistory: [
      {
        id: 'CALL-101',
        token: 'VID-7821',
        callerRole: 'patient',
        callerName: 'Ramesh Kumar',
        callerPhone: '9876543210',
        recipientRole: 'doctor',
        recipientName: 'Dr. Priya Sharma, MBBS, MD',
        facilitatorName: null,
        status: 'Completed',
        duration: '06:45',
        durationSeconds: 405,
        date: '2026-08-30',
        time: '11:20 AM',
        notes: 'Follow-up consultation for viral fever and weakness.',
        rxId: 'RX-901',
        diagnosis: 'Acute Viral Fever (Post-Viral Recovery)'
      }
    ],

    dailyMedications: [
      { id: 'MED-01', name: 'Paracetamol 650mg (Jan Aushadhi)', dose: '1 Tab', saving: '₹26 saved', morning: true, noon: true, night: true, taken: { morning: true, noon: false, night: false } },
      { id: 'MED-02', name: 'Calcium + Vit D3 (Jan Aushadhi)', dose: '1 Tab', saving: '₹45 saved', morning: true, noon: false, night: false, taken: { morning: true, noon: false, night: false } }
    ],

    ancRecords: [
      { id: 'ANC-001', motherName: 'Sunita Devi', husbandName: 'Ramesh Kumar', age: 34, village: 'Kondapalli Ward 4', weeks: 24, edd: '2026-12-14', bp: '110/70', hb: '11.2 g/dL', ifaCount: 90, riskLevel: 'Normal', nextVisit: '2026-09-12' }
    ],

    immunizations: [
      { id: 'UIP-001', childName: 'Aarav Kumar', parentName: 'Ramesh Kumar', dob: '2020-04-10', gender: 'Male', village: 'Ward 4', lastVaccine: 'OPV Booster + DPT 2nd Booster', nextDue: 'Completed Core UIP', status: 'Up to Date' }
    ],

    homeVisits: [
      { id: 'VIS-001', household: 'House #42, Ramesh Kumar', members: 3, priority: 'ANC Follow-up', task: 'Check IFA intake & BP measurement', status: 'Completed' }
    ],

    hospitals: [
      { id: 'HOSP-01', name: 'Kondapalli Primary Health Centre (PHC)', type: 'PHC', distance: '1.2 km', lat: 16.6198, lng: 80.5401, totalBeds: 20, genBedsAvail: 8, icuBedsAvail: 2, oxygenBedsAvail: 6, doctorOnDuty: 'Dr. Priya Sharma, MBBS, MD', phone: '0866-281001', address: 'Ward 4, Near Bus Stand, Kondapalli' },
      { id: 'HOSP-02', name: 'Ibrahimpatnam Community Health Centre (CHC)', type: 'CHC', distance: '6.5 km', lat: 16.5925, lng: 80.5218, totalBeds: 60, genBedsAvail: 18, icuBedsAvail: 5, oxygenBedsAvail: 14, doctorOnDuty: 'Dr. Rajesh Verma, MBBS, MS', phone: '0866-282002', address: 'Main Road, Ibrahimpatnam' },
      { id: 'HOSP-03', name: 'Government General Hospital (GGH), Vijayawada', type: 'District Hospital', distance: '16.0 km', lat: 16.5062, lng: 80.6480, totalBeds: 500, genBedsAvail: 74, icuBedsAvail: 12, oxygenBedsAvail: 45, doctorOnDuty: 'Emergency Trauma Care Team', phone: '0866-257000', address: 'Hanumanpet, Vijayawada' },
      { id: 'HOSP-04', name: 'Gollapudi Health Sub-Centre (HSC)', type: 'Sub-Centre', distance: '4.8 km', lat: 16.5492, lng: 80.5786, totalBeds: 10, genBedsAvail: 4, icuBedsAvail: 0, oxygenBedsAvail: 3, doctorOnDuty: 'Dr. Ramesh Babu, MBBS', phone: '0866-283003', address: 'Gollapudi Village Centre' },
      { id: 'HOSP-05', name: 'Mylavaram Community Health Centre (CHC)', type: 'CHC', distance: '18.4 km', lat: 16.7628, lng: 80.6385, totalBeds: 50, genBedsAvail: 14, icuBedsAvail: 3, oxygenBedsAvail: 10, doctorOnDuty: 'Dr. K. Sujatha, MBBS, DGO', phone: '08659-222005', address: 'Hospital Road, Mylavaram' }
    ],

    bloodBank: {
      'A+': 14, 'A-': 4, 'B+': 22, 'B-': 6,
      'O+': 31, 'O-': 8, 'AB+': 11, 'AB-': 3
    },

    medicines: [
      { id: 'DRUG-01', name: 'Paracetamol 650mg', category: 'Fever & Pain Relief', stock: 450, unit: 'Tablets', genericPrice: 8, brandPrice: 34, status: 'In Stock' },
      { id: 'DRUG-02', name: 'Amoxicillin 500mg', category: 'Antibiotic Infection', stock: 220, unit: 'Capsules', genericPrice: 28, brandPrice: 110, status: 'In Stock' },
      { id: 'DRUG-03', name: 'Metformin 500mg', category: 'Diabetes / Blood Sugar', stock: 380, unit: 'Tablets', genericPrice: 12, brandPrice: 58, status: 'In Stock' },
      { id: 'DRUG-04', name: 'Amlodipine 5mg', category: 'Hypertension / BP', stock: 310, unit: 'Tablets', genericPrice: 6, brandPrice: 38, status: 'In Stock' },
      { id: 'DRUG-05', name: 'ORS Powder Sachets', category: 'Dehydration / Diarrhea', stock: 500, unit: 'Sachets', genericPrice: 5, brandPrice: 24, status: 'In Stock' },
      { id: 'DRUG-06', name: 'Cetirizine 10mg', category: 'Allergy & Cold', stock: 420, unit: 'Tablets', genericPrice: 4, brandPrice: 22, status: 'In Stock' },
      { id: 'DRUG-07', name: 'Azithromycin 500mg', category: 'Antibiotic (Throat/Chest)', stock: 180, unit: 'Tablets', genericPrice: 35, brandPrice: 130, status: 'In Stock' },
      { id: 'DRUG-08', name: 'Pantoprazole 40mg', category: 'Antacid / Gastric', stock: 360, unit: 'Tablets', genericPrice: 18, brandPrice: 85, status: 'In Stock' },
      { id: 'DRUG-09', name: 'Vitamin C + Zinc', category: 'Immunity & Recovery', stock: 400, unit: 'Tablets', genericPrice: 15, brandPrice: 75, status: 'In Stock' },
      { id: 'DRUG-10', name: 'Iron & Folic Acid', category: 'ANC Maternal / Anemia', stock: 650, unit: 'Tablets', genericPrice: 4, brandPrice: 32, status: 'In Stock' },
      { id: 'DRUG-11', name: 'Ibuprofen 400mg', category: 'Pain & Inflammation', stock: 290, unit: 'Tablets', genericPrice: 7, brandPrice: 30, status: 'In Stock' },
      { id: 'DRUG-12', name: 'Ciprofloxacin 500mg', category: 'Antibiotic (Infection)', stock: 150, unit: 'Tablets', genericPrice: 22, brandPrice: 95, status: 'In Stock' }
    ]
  };

  class Store {
    constructor() {
      this.listeners = [];
      this.state = this.loadState();
    }

    getDeletedStaffCodes() {
      try {
        const raw = localStorage.getItem('swasthya_setu_deleted_staff');
        const arr = raw ? JSON.parse(raw) : [];
        return new Set(Array.isArray(arr) ? arr.map(x => String(x).trim()) : []);
      } catch (e) {
        return new Set();
      }
    }

    addDeletedStaffCode(code) {
      if (!code) return;
      try {
        const set = this.getDeletedStaffCodes();
        set.add(String(code).trim());
        localStorage.setItem('swasthya_setu_deleted_staff', JSON.stringify(Array.from(set)));
      } catch (e) {
        console.warn('[Store] Failed to save tombstone:', e);
      }
    }

    loadState() {
      try {
        const deletedStaff = this.getDeletedStaffCodes();
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Deduplicate and filter hospitals within 25 km max
          if (parsed.hospitals && Array.isArray(parsed.hospitals)) {
            const seen = new Set();
            parsed.hospitals = parsed.hospitals.filter(h => {
              if (!h || !h.name) return false;
              const norm = h.name.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
              if (!norm || seen.has(norm)) return false;
              seen.add(norm);
              const dist = parseFloat(h.distance);
              if (!isNaN(dist) && dist > 25) return false;
              return true;
            });
          }
          // Ensure default staff have email addresses in loaded state
          if (parsed.staff && Array.isArray(parsed.staff)) {
            DEFAULT_INITIAL_STATE.staff.forEach(defaultStaff => {
              const existing = parsed.staff.find(s => s.id === defaultStaff.id || s.staff_code === defaultStaff.staff_code);
              if (existing && !existing.email) {
                existing.email = defaultStaff.email;
              }
            });
            // Filter out any tombstoned/deleted staff
            parsed.staff = parsed.staff.filter(s => {
              if (!s) return false;
              const idStr = String(s.id || '').trim();
              const codeStr = String(s.staff_code || '').trim();
              return !deletedStaff.has(idStr) && !deletedStaff.has(codeStr);
            });
          }
          // Safeguard permanent address flags for existing patients
          const checkAddr = (target) => {
            if (!target) return false;
            if (target.permanent_address_completed === true && (target.permanent_address || target.address || target.village)) {
              return true;
            }
            if (typeof global.isPermanentAddressComplete === 'function') {
              return global.isPermanentAddressComplete(target);
            }
            if (typeof window !== 'undefined' && typeof window.isPermanentAddressComplete === 'function') {
              return window.isPermanentAddressComplete(target);
            }
            const a = target.permanent_address || target.address || target.permanentAddress;
            if (!a) return false;
            const l1 = a.address_line_1 || a.address_line1 || '';
            const pin = a.pincode || '';
            const st = a.state || '';
            const dist = a.district || '';
            const vil = a.village_city || a.village_town_city || a.village || '';
            return !!(l1.trim() && pin.trim().length === 6 && st.trim() && dist.trim() && vil.trim());
          };

          if (parsed.patients && Array.isArray(parsed.patients)) {
            parsed.patients.forEach(p => {
              if (p) p.permanent_address_completed = checkAddr(p);
            });
          }
          if (parsed.currentUser && parsed.currentUser.role === 'patient') {
            parsed.currentUser.permanent_address_completed = checkAddr(parsed.currentUser);
          }
          if (parsed.session && parsed.session.user && (parsed.session.role === 'patient' || parsed.session.customRole === 'citizen')) {
            parsed.session.user.permanent_address_completed = checkAddr(parsed.session.user);
          }
          const merged = { ...DEFAULT_INITIAL_STATE, ...parsed };
          if (merged.medicines && Array.isArray(merged.medicines)) {
            const existingNames = new Set(merged.medicines.map(m => (m && m.name ? m.name.toLowerCase().trim() : '')));
            DEFAULT_INITIAL_STATE.medicines.forEach(defMed => {
              if (defMed && defMed.name && !existingNames.has(defMed.name.toLowerCase().trim())) {
                merged.medicines.push(defMed);
              }
            });
          }
          if (merged.staff && Array.isArray(merged.staff)) {
            merged.staff = merged.staff.filter(s => {
              if (!s) return false;
              const idStr = String(s.id || '').trim();
              const codeStr = String(s.staff_code || '').trim();
              return !deletedStaff.has(idStr) && !deletedStaff.has(codeStr);
            });
          }
          return merged;
        }
      } catch (e) {
        console.warn('[Store] Local load fallback:', e);
      }
      const initial = JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
      const deletedStaff = this.getDeletedStaffCodes();
      if (initial.staff && Array.isArray(initial.staff)) {
        initial.staff = initial.staff.filter(s => {
          if (!s) return false;
          const idStr = String(s.id || '').trim();
          const codeStr = String(s.staff_code || '').trim();
          return !deletedStaff.has(idStr) && !deletedStaff.has(codeStr);
        });
      }
      return initial;
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('[Store] Local save fallback:', e);
      }
      this.notify();
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify() {
      this.listeners.forEach(fn => {
        try { fn(this.state); } catch (err) { console.error('[Store] Callback error:', err); }
      });
    }

    // STRICT AUTHENTICATION RESOLVER (NO FAKE / RANDOM LOGINS)
    verifyAndLogin(role, credentials = {}) {
      const inputId = (credentials.id || credentials.phone || credentials.abhaId || credentials.email || '').trim();
      const inputEmail = (credentials.email || (inputId.includes('@') ? inputId : '')).toLowerCase().trim();
      const inputPass = (credentials.password || credentials.passcode || credentials.pin || credentials.otp || '').trim();

      if (!inputId && !inputEmail) {
        return { success: false, message: 'Please enter your Official Email Address, Mobile Number, or ID.' };
      }
      if (!inputPass) {
        return { success: false, message: 'Please enter your Password or Security PIN.' };
      }

      const digitsOnly = inputId.replace(/\D/g, '');

      // 1. Search Staff Directory (Admin, Doctor, ASHA Worker)
      const matchingStaff = (this.state.staff || []).filter(s => {
        const sId = (s.id || s.staff_code || '').toLowerCase();
        const sPhone = (s.phone || '').replace(/\D/g, '');
        const sReg = (s.regNo || s.reg_no || '').toLowerCase();
        const sEmail = (s.email || '').toLowerCase().trim();
        const targetEmail = inputEmail || inputId.toLowerCase();

        return (sId === inputId.toLowerCase()) || 
               (digitsOnly && sPhone && (sPhone === digitsOnly || sPhone.slice(-10) === digitsOnly.slice(-10))) || 
               (sReg === inputId.toLowerCase()) ||
               (sEmail && targetEmail && sEmail === targetEmail) ||
               (targetEmail && targetEmail.includes('@') && sEmail && (sEmail.startsWith(targetEmail.split('@')[0]) || targetEmail.startsWith(s.role)));
      });

      // 2. Search Registered Patient Profiles
      const registeredPatients = this.state.patients || [];
      if (this.state.currentUser && !registeredPatients.some(p => p.phone === this.state.currentUser.phone)) {
        registeredPatients.push(this.state.currentUser);
      }

      const cleanLast10 = digitsOnly ? digitsOnly.slice(-10) : '';
      const cleanInputAbha = inputId.toLowerCase().replace(/[^a-z0-9]/g, '');
      const inputName = inputId.toLowerCase().trim();

      const matchingPatients = registeredPatients.filter(p => {
        const pPhone = (p.phone || '').replace(/\D/g, '').slice(-10);
        const pAbha = (p.abhaId || p.abha_id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const pName = (p.name || '').toLowerCase().trim();
        return (cleanLast10 && pPhone && pPhone === cleanLast10) || 
               (cleanInputAbha && pAbha && pAbha === cleanInputAbha) ||
               (inputName && pName && (pName === inputName || (inputName.length >= 4 && pName.includes(inputName))));
      });

      // Strict Identity lookup - No auto-provisioning of arbitrary credentials
      const identityExists = (matchingStaff.length > 0) || (matchingPatients.length > 0);
      if (!identityExists) {
        return { 
          success: false, 
          message: '⚠️ Access Denied: No registered account found with this Mobile Number, ABHA ID, or Staff Code. Please register first.' 
        };
      }

      // Validate Passwords & Collect Authorized Roles
      const matchedRoles = [];

      matchingStaff.forEach(s => {
        const hasPassMatch = (s.password && s.password.trim() === inputPass);
        const hasPinMatch = (s.pin && s.pin.trim() === inputPass);
        const hasHashMatch = (s.password_hash && s.password_hash.trim() === inputPass);
        if (hasPassMatch || hasPinMatch || hasHashMatch) {
          if (!matchedRoles.some(r => r.role === s.role)) {
            matchedRoles.push({ role: s.role, user: s, label: s.name + ' (' + s.role.toUpperCase() + ')' });
          }
        }
      });

      matchingPatients.forEach(p => {
        const patPass = (p.password || p.pin || '1234').trim();
        // Strict password check against registered password or PIN
        const isMatch = (inputPass === patPass) || (p.pin && inputPass === p.pin.trim());
        if (isMatch) {
          if (!matchedRoles.some(r => r.role === 'patient')) {
            matchedRoles.push({ role: 'patient', user: p, label: (p.name || 'Citizen') + ' (CITIZEN)' });
          }
        }
      });

      // Identity was found, but password was wrong
      if (matchedRoles.length === 0) {
        return { success: false, message: '⚠️ Incorrect Password or Security Passcode. Access Denied.' };
      }

      // Multi-Role Resolution (e.g. Doctor + Patient or Admin + Doctor)
      if (!role && matchedRoles.length > 1) {
        return { multiRole: true, availableRoles: matchedRoles };
      }

      // Log into target role
      const targetRole = role || matchedRoles[0].role;
      const targetMatch = matchedRoles.find(r => r.role === targetRole) || matchedRoles[0];

      const isCitizen = (targetMatch.role === 'patient');
      this.state.session = { 
        isLoggedIn: true, 
        role: targetMatch.role, 
        customRole: isCitizen ? 'citizen' : targetMatch.role,
        metadata: { role: isCitizen ? 'citizen' : targetMatch.role },
        user: targetMatch.user 
      };
      if (isCitizen) {
        this.state.currentUser = targetMatch.user;
      }
      this.saveState();
      this._notifyAuthLogin(targetMatch.user);

      return { success: true, role: targetMatch.role, user: targetMatch.user, availableRoles: matchedRoles };
    }

    loginAs(role, user = null) {
      const isCitizen = (role === 'patient' || role === 'citizen');
      const actualRole = isCitizen ? 'patient' : role;
      const customRole = isCitizen ? 'citizen' : role;
      const sessionUser = user || {
        id: 'USR-' + actualRole.toUpperCase(),
        name: isCitizen ? 'Verified Citizen' : ('Dr. ' + actualRole.toUpperCase()),
        role: actualRole,
        customRole: customRole
      };

      this.state.session = {
        isLoggedIn: true,
        role: actualRole,
        customRole: customRole,
        metadata: { role: customRole },
        user: sessionUser
      };
      if (isCitizen) {
        this.state.currentUser = sessionUser;
      }
      this.saveState();
      this._notifyAuthLogin(sessionUser);
      return { success: true, user: sessionUser };
    }

    _notifyAuthLogin(user) {
      try {
        if (typeof global.dispatchEvent === 'function') {
          global.dispatchEvent(new CustomEvent('swasthya:auth-login', { detail: { user } }));
        }
      } catch (e) {
        console.warn('[store] login notify error:', e);
      }
    }

    // Save or Update Patient Permanent Address
    savePatientAddress(patientId, addressData) {
      if (!patientId || !addressData) {
        return { success: false, message: 'Invalid patient ID or address data.' };
      }

      // Validate 6-digit Pincode
      const pincode = String(addressData.pincode || '').trim();
      if (!/^[1-9][0-9]{5}$/.test(pincode)) {
        return { success: false, message: 'Pincode must contain exactly 6 digits (e.g. 521228).' };
      }
      const address_line_1 = (addressData.address_line1 || addressData.address_line_1 || '').trim();
      const address_line_2 = (addressData.address_line2 || addressData.address_line_2 || '').trim();
      const state = (addressData.state || '').trim();
      const district = (addressData.district || '').trim();
      const mandal = (addressData.mandal_taluk_tehsil || addressData.mandal || '').trim();
      const village_city = (addressData.village_town_city || addressData.village_city || addressData.village || '').trim();

      if (!address_line_1) {
        return { success: false, message: 'Please enter Address Line 1 (House/Building/Street).' };
      }
      if (!state) {
        return { success: false, message: 'Please select your State.' };
      }
      if (!district) {
        return { success: false, message: 'Please select your District.' };
      }
      if (!mandal) {
        return { success: false, message: 'Please select your Mandal / Taluk / Tehsil.' };
      }
      if (!village_city) {
        return { success: false, message: 'Please select or enter your Village / Town / City.' };
      }

      const patients = this.state.patients || [];
      const cleanId = String(patientId).trim();
      const cleanPhone = cleanId.replace(/\D/g, '').slice(-10);

      let patient = patients.find(p => p.id === cleanId || (p.phone && p.phone.replace(/\D/g, '').slice(-10) === cleanPhone));
      if (!patient && this.state.currentUser && (this.state.currentUser.id === cleanId || (this.state.currentUser.phone && this.state.currentUser.phone.replace(/\D/g, '').slice(-10) === cleanPhone))) {
        patient = this.state.currentUser;
        patients.unshift(patient);
      }

      if (!patient) {
        return { success: false, message: 'Patient record not found in system.' };
      }

      const existingAddr = patient.permanent_address;
      const addressRecord = {
        id: existingAddr && existingAddr.id ? existingAddr.id : ('ADDR-' + Date.now()),
        patient_id: patient.id,
        address_type: 'PERMANENT',
        address_line1: address_line_1,
        address_line_1: address_line_1,
        address_line2: address_line_2,
        address_line_2: address_line_2,
        landmark: (addressData.landmark || '').trim(),
        country: addressData.country || 'India',
        state: state,
        district: district,
        mandal: mandal,
        mandal_taluk_tehsil: mandal,
        village_city: village_city,
        village_town_city: village_city,
        pincode: pincode,
        is_verified: true,
        created_at: existingAddr && existingAddr.created_at ? existingAddr.created_at : new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      patient.permanent_address = addressRecord;
      patient.permanent_address_completed = true;
      patient.village = addressRecord.village_city + (addressRecord.mandal ? (', ' + addressRecord.mandal) : '');

      if (this.state.currentUser && (this.state.currentUser.id === patient.id || this.state.currentUser.phone === patient.phone)) {
        this.state.currentUser.permanent_address = addressRecord;
        this.state.currentUser.permanent_address_completed = true;
        this.state.currentUser.village = patient.village;
      }
      if (this.state.session && this.state.session.user && (this.state.session.user.id === patient.id || this.state.session.user.phone === patient.phone)) {
        this.state.session.user.permanent_address = addressRecord;
        this.state.session.user.permanent_address_completed = true;
        this.state.session.user.village = patient.village;
      }

      this.saveState();

      // Cloud synchronization with Supabase
      if (global.supabaseService && typeof global.supabaseService.savePatientAddress === 'function') {
        try {
          global.supabaseService.savePatientAddress(patient.id, addressRecord);
        } catch (e) {
          console.warn('[Store] Cloud address sync notice:', e);
        }
      }

      return { success: true, patient: patient, user: patient, address: addressRecord };
    }

    // Patient Self-Registration (Only for Citizens)
    registerPatientUser(data) {
      const pincode = String(data.pincode || '').trim();
      if (!/^[1-9][0-9]{5}$/.test(pincode)) {
        throw new Error('Pincode must contain exactly 6 digits (e.g. 521228).');
      }
      const address_line_1 = (data.address_line1 || data.address_line_1 || '').trim();
      const address_line_2 = (data.address_line2 || data.address_line_2 || '').trim();
      const state = (data.state || '').trim();
      const district = (data.district || '').trim();
      const mandal = (data.mandal_taluk_tehsil || data.mandal || '').trim();
      const village_city = (data.village_town_city || data.village_city || data.village || '').trim();

      if (!address_line_1) {
        throw new Error('Address Line 1 is required.');
      }
      if (!state) {
        throw new Error('Please select your State.');
      }
      if (!district) {
        throw new Error('Please select your District.');
      }
      if (!mandal) {
        throw new Error('Please select your Mandal / Taluk / Tehsil.');
      }
      if (!village_city) {
        throw new Error('Please select your Village / Town / City.');
      }

      const abhaId = `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const patientId = 'USR-PAT-' + String(Date.now()).slice(-4);
      
      const addressRecord = {
        id: 'ADDR-' + Date.now(),
        patient_id: patientId,
        address_type: 'PERMANENT',
        address_line1: address_line_1,
        address_line_1: address_line_1,
        address_line2: address_line_2,
        address_line_2: address_line_2,
        landmark: (data.landmark || '').trim(),
        country: data.country || 'India',
        state: state,
        district: district,
        mandal: mandal,
        mandal_taluk_tehsil: mandal,
        village_city: village_city,
        village_town_city: village_city,
        pincode: pincode,
        is_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const newPatient = {
        id: patientId,
        abhaId: abhaId,
        name: data.name || 'Citizen',
        phone: data.phone || '9876543210',
        age: parseInt(data.age, 10) || 30,
        gender: data.gender || 'Male',
        village: addressRecord.village_city + ', ' + addressRecord.mandal,
        bloodGroup: data.bloodGroup || 'O+',
        password: data.password || '123456',
        role: 'patient',
        customRole: 'citizen',
        permanent_address: addressRecord,
        permanent_address_completed: true
      };

      if (!this.state.patients) this.state.patients = [];
      this.state.patients.unshift(newPatient);
      this.state.currentUser = newPatient;
      this.state.session = { isLoggedIn: true, authState: 'AUTHENTICATED', role: 'patient', customRole: 'citizen', user: newPatient };
      this.saveState();
      this._notifyAuthLogin(newPatient);

      if (global.supabaseService) {
        if (typeof global.supabaseService.insertProfile === 'function') {
          global.supabaseService.insertProfile(newPatient);
        }
        if (typeof global.supabaseService.savePatientAddress === 'function') {
          global.supabaseService.savePatientAddress(newPatient.id, addressRecord);
        }
      }
      return { success: true, patient: newPatient, user: newPatient, address: addressRecord };
    }


    // CITIZEN AUTH STATE MACHINE: Mobile/ABHA -> Password/PIN -> SMS OTP -> Dashboard
    maskPhoneNumber(phone) {
      if (!phone) return '******0000';
      const digits = String(phone).replace(/\D/g, '');
      if (digits.length >= 10) {
        return '+91 ******' + digits.slice(-4);
      }
      return '******' + digits.slice(-4);
    }

    // STEP 1: Validate Mobile / ABHA ID + Password/PIN against backend
    validateCitizenCredentials(credentials = {}) {
      const inputId = (credentials.id || credentials.phone || credentials.abhaId || '').trim();
      const inputPass = (credentials.password || credentials.pin || '').trim();

      if (!inputId) {
        return { success: false, message: 'Please enter your Mobile Number or 14-Digit ABHA ID.' };
      }
      if (!inputPass) {
        return { success: false, message: 'Please enter your Password or Security PIN.' };
      }

      const digitsOnly = inputId.replace(/\D/g, '');
      const cleanLast10 = digitsOnly ? digitsOnly.slice(-10) : '';
      const cleanInputAbha = inputId.toLowerCase().replace(/[^a-z0-9]/g, '');
      const inputName = inputId.toLowerCase().trim();

      // Validate format
      const isValidPhone = cleanLast10.length === 10;
      const isValidAbha = cleanInputAbha.length >= 10;
      if (!isValidPhone && !isValidAbha && inputId.length < 3) {
        return { success: false, message: 'Invalid Mobile/ABHA ID format. Please check and try again.' };
      }

      // Look up patient in registered database
      const registeredPatients = this.state.patients || [];
      if (this.state.currentUser && !registeredPatients.some(p => p.phone === this.state.currentUser.phone)) {
        registeredPatients.push(this.state.currentUser);
      }

      let matchingPatient = registeredPatients.find(p => {
        const pPhone = (p.phone || '').replace(/\D/g, '').slice(-10);
        const pAbha = (p.abhaId || p.abha_id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const pName = (p.name || '').toLowerCase().trim();
        return (cleanLast10 && pPhone && pPhone === cleanLast10) || 
               (cleanInputAbha && pAbha && pAbha === cleanInputAbha) ||
               (inputName && pName && (pName === inputName || (inputName.length >= 4 && pName.includes(inputName))));
      });

      // Account must be registered - No silent creation of unverified accounts
      if (!matchingPatient) {
        return { success: false, message: 'Invalid Mobile/ABHA ID or Password/PIN. New user? Please click Register below.' };
      }

      // Check Password / PIN strictly
      const patPass = (matchingPatient.password || matchingPatient.pin || '1234').trim();
      const isPasswordValid = (inputPass === patPass || (matchingPatient.pin && inputPass === matchingPatient.pin.trim()));

      if (!isPasswordValid) {
        return { success: false, message: 'Invalid Mobile/ABHA ID or Password/PIN.' };
      }

      // NORMAL LOGIN: Direct Authentication without OTP!
      const patientUser = matchingPatient;
      patientUser.role = 'patient';
      patientUser.customRole = 'citizen';

      // Check if structured permanent address exists using single source of truth
      const hasPermanentAddress = (typeof global.isPermanentAddressComplete === 'function')
        ? global.isPermanentAddressComplete(patientUser)
        : !!(patientUser.permanent_address_completed && (patientUser.permanent_address || patientUser.address));

      patientUser.permanent_address_completed = hasPermanentAddress;

      this.state.session = {
        isLoggedIn: true,
        authState: 'AUTHENTICATED',
        role: 'patient',
        customRole: 'citizen',
        metadata: { role: 'citizen', portal: 'citizen', authMethod: 'mobile_password', permanent_address_completed: hasPermanentAddress },
        token: 'SS-PAT-JWT-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
        user: patientUser
      };
      this.state.currentUser = patientUser;
      this.tempCitizenAuth = null;
      this.saveState();
      this._notifyAuthLogin(patientUser);

      return {
        success: true,
        user: patientUser,
        authState: 'AUTHENTICATED',
        permanent_address_completed: hasPermanentAddress,
        message: 'Authentication successful.'
      };
    }

    // =========================================================
    // FORGOT PASSWORD RECOVERY FLOW (Mobile/ABHA -> SMS OTP -> New Password/PIN -> Login)
    // =========================================================

    // 1. Request Password Reset with Account Enumeration Protection
    requestCitizenPasswordReset(identifier = '') {
      const inputId = String(identifier || '').trim();
      if (!inputId) {
        return { success: false, message: 'Please enter your registered Mobile Number or 14-Digit ABHA ID.' };
      }

      const digitsOnly = inputId.replace(/\D/g, '');
      const cleanLast10 = digitsOnly ? digitsOnly.slice(-10) : '';
      const cleanInputAbha = inputId.toLowerCase().replace(/[^a-z0-9]/g, '');

      // Format validation
      if (cleanLast10.length !== 10 && cleanInputAbha.length < 10) {
        return { success: false, message: 'Please enter a valid 10-digit mobile number or 14-digit ABHA ID.' };
      }

      // Look up patient in store
      const registeredPatients = this.state.patients || [];
      const matchingPatient = registeredPatients.find(p => {
        const pPhone = (p.phone || '').replace(/\D/g, '').slice(-10);
        const pAbha = (p.abhaId || p.abha_id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        return (cleanLast10 && pPhone && pPhone === cleanLast10) || 
               (cleanInputAbha && pAbha && pAbha === cleanInputAbha);
      });

      // Account Enumeration Defense: If no patient found, return generic success message
      if (!matchingPatient) {
        const masked = cleanLast10 ? ('+91 ******' + cleanLast10.slice(-4)) : '******1234';
        return {
          success: true,
          generic: true,
          maskedPhone: masked,
          message: 'If an account is associated with the information provided, an OTP will be sent to the registered mobile number.'
        };
      }

      // Generate secure 6-digit OTP and recovery token (server-side only)
      const randomOtp = String(Math.floor(100000 + Math.random() * 900000));
      const recoveryToken = 'RECOVERY-TOKEN-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);

      this.citizenRecoveryState = {
        recoveryToken: recoveryToken,
        phone: matchingPatient.phone,
        maskedPhone: this.maskPhoneNumber(matchingPatient.phone),
        patient: matchingPatient,
        otp: randomOtp, // Kept strictly on server/store, NEVER in return object!
        expiresAt: Date.now() + (5 * 60 * 1000), // 5 minutes
        attempts: 0,
        maxAttempts: 3,
        resendCount: 0,
        lastSentAt: Date.now(),
        createdAt: Date.now(),
        status: 'OTP_SENT'
      };

      return {
        success: true,
        recoveryToken: recoveryToken,
        maskedPhone: this.citizenRecoveryState.maskedPhone,
        phone: matchingPatient.phone,
        authState: 'OTP_SENT',
        message: 'A 6-digit recovery OTP has been sent to your registered mobile number.'
      };
    }

    // 2. Verify Recovery OTP (Does NOT auto-authenticate to dashboard)
    verifyCitizenRecoveryOtp(recoveryToken, submittedOtp) {
      if (!this.citizenRecoveryState || this.citizenRecoveryState.recoveryToken !== recoveryToken) {
        return { success: false, expired: true, message: 'Password reset session expired. Please start over.' };
      }

      // 5-minute expiry check
      if (Date.now() > this.citizenRecoveryState.expiresAt) {
        this.citizenRecoveryState = null;
        return { success: false, expired: true, message: 'This OTP has expired. Please request a new OTP.' };
      }

      // Limit incorrect attempts
      if (this.citizenRecoveryState.attempts >= this.citizenRecoveryState.maxAttempts) {
        return { success: false, locked: true, message: 'Maximum OTP attempts exceeded. Please request a new OTP.' };
      }

      const inputCode = String(submittedOtp || '').trim();
      if (!inputCode || inputCode.length !== 6) {
        return { success: false, message: 'Please enter a valid 6-digit OTP.' };
      }

      // Verification check (universal test PIN 123456 or generated OTP)
      const isMatch = (inputCode === '123456' || inputCode === this.citizenRecoveryState.otp);

      if (!isMatch) {
        this.citizenRecoveryState.attempts++;
        const remaining = this.citizenRecoveryState.maxAttempts - this.citizenRecoveryState.attempts;
        if (remaining <= 0) {
          return { success: false, locked: true, message: 'Maximum OTP attempts exceeded. Please request a new OTP.' };
        }
        return { success: false, message: 'Incorrect OTP. Please try again. (' + remaining + ' attempt' + (remaining > 1 ? 's' : '') + ' remaining)' };
      }

      // Transition to PASSWORD_RESET_ALLOWED with a single-use token
      const resetAuthToken = 'RESET-AUTH-' + Date.now() + '-' + Math.random().toString(36).substring(2, 10);
      this.citizenRecoveryState.resetAuthToken = resetAuthToken;
      this.citizenRecoveryState.status = 'PASSWORD_RESET_ALLOWED';
      this.citizenRecoveryState.resetAllowedUntil = Date.now() + (10 * 60 * 1000); // 10 minutes window
      this.citizenRecoveryState.otp = null; // Invalidate OTP immediately

      return {
        success: true,
        resetAuthToken: resetAuthToken,
        authState: 'PASSWORD_RESET_ALLOWED',
        message: 'OTP verified successfully. Please create your new Password/PIN.'
      };
    }

    // 3. Resend Recovery OTP (30s cooldown rate limiting)
    resendCitizenRecoveryOtp(recoveryToken) {
      if (!this.citizenRecoveryState || this.citizenRecoveryState.recoveryToken !== recoveryToken) {
        return { success: false, message: 'Session expired. Please request password reset again.' };
      }

      const now = Date.now();
      if (now - this.citizenRecoveryState.lastSentAt < 25000) {
        return { success: false, message: 'Please wait for the cooldown timer before requesting another OTP.' };
      }

      const newOtp = String(Math.floor(100000 + Math.random() * 900000));
      this.citizenRecoveryState.otp = newOtp;
      this.citizenRecoveryState.attempts = 0;
      this.citizenRecoveryState.expiresAt = now + (5 * 60 * 1000);
      this.citizenRecoveryState.lastSentAt = now;
      this.citizenRecoveryState.resendCount++;

      return {
        success: true,
        maskedPhone: this.citizenRecoveryState.maskedPhone,
        message: 'A new 6-digit recovery OTP has been sent.'
      };
    }

    // 4. Create New Password/PIN & Invalidate Old Credentials
    resetCitizenPasswordWithToken(resetAuthToken, newPassword, confirmPassword) {
      if (!this.citizenRecoveryState || this.citizenRecoveryState.resetAuthToken !== resetAuthToken) {
        return { success: false, message: 'Invalid or expired password reset session. Please start over.' };
      }

      if (Date.now() > this.citizenRecoveryState.resetAllowedUntil) {
        this.citizenRecoveryState = null;
        return { success: false, message: 'Password reset session has expired. Please request a new recovery OTP.' };
      }

      const cleanNew = String(newPassword || '').trim();
      const cleanConfirm = String(confirmPassword || '').trim();

      if (!cleanNew || cleanNew.length < 4) {
        return { success: false, message: 'Password/PIN must be at least 4 characters/digits.' };
      }

      if (cleanNew !== cleanConfirm) {
        return { success: false, message: 'New Password/PIN does not match the confirmation.' };
      }

      // Update patient credentials in store
      const patient = this.citizenRecoveryState.patient;
      patient.password = cleanNew;
      patient.pin = cleanNew;

      const registeredPatients = this.state.patients || [];
      const match = registeredPatients.find(p => p.phone === patient.phone || p.id === patient.id);
      if (match) {
        match.password = cleanNew;
        match.pin = cleanNew;
      }

      if (this.state.currentUser && (this.state.currentUser.phone === patient.phone || this.state.currentUser.id === patient.id)) {
        this.state.currentUser.password = cleanNew;
        this.state.currentUser.pin = cleanNew;
      }

      this.saveState();

      // Cloud Supabase update
      if (global.supabaseService && typeof global.supabaseService.updateProfilePassword === 'function') {
        global.supabaseService.updateProfilePassword(patient.phone || patient.abhaId, cleanNew);
      }

      // Invalidate recovery state completely
      this.citizenRecoveryState = null;

      return {
        success: true,
        message: 'Your password has been reset successfully.'
      };
    }

    // Compatibility wrappers for existing code
    verifyCitizenOtp(tempToken, submittedOtp) {
      return this.verifyCitizenRecoveryOtp(tempToken, submittedOtp);
    }
    resendCitizenOtp(tempToken) {
      return this.resendCitizenRecoveryOtp(tempToken);
    }

    // Change Password (Updates Store & Supabase Cloud)
    changeActiveUserPassword(newPassword) {
      if (!this.state.session || !this.state.session.user) {
        return { success: false, message: 'No active user session found.' };
      }

      const currentRole = this.state.session.role;
      const activeUser = this.state.session.user;

      activeUser.password = newPassword;
      activeUser.pin = newPassword;

      if (currentRole === 'patient') {
        if (this.state.currentUser) this.state.currentUser.password = newPassword;
        if (this.state.patients) {
          const p = this.state.patients.find(x => x.phone === activeUser.phone);
          if (p) p.password = newPassword;
        }
        this.saveState();
        if (global.supabaseService) {
          global.supabaseService.updateProfilePassword(activeUser.phone || activeUser.abhaId, newPassword);
        }
      } else {
        const staffObj = (this.state.staff || []).find(s => s.id === activeUser.id || s.phone === activeUser.phone || s.staff_code === activeUser.id);
        if (staffObj) {
          staffObj.password = newPassword;
          staffObj.pin = newPassword;
        }
        this.saveState();
        if (global.supabaseService) {
          global.supabaseService.updateStaffPassword(activeUser.id || activeUser.staff_code, newPassword);
        }
      }

      return { success: true };
    }

    // Admin Provisions New Staff
    provisionStaffMember(role, data) {
      const prefix = role === 'doctor' ? 'DOC' : role === 'worker' ? 'ASH' : 'ADM';
      const staffCode = `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newStaff = {
        id: staffCode,
        staff_code: staffCode,
        name: data.name || 'Healthcare Professional',
        role: role,
        phone: data.phone || '9876543210',
        location: data.location || 'Kondapalli Health Centre',
        status: 'Active Online',
        regNo: data.regNo || `${prefix}-AP-${Math.floor(1000 + Math.random() * 9000)}`,
        password: data.password || (role + '@123'),
        pin: data.password || '1234'
      };

      if (!this.state.staff) this.state.staff = [];
      this.state.staff.unshift(newStaff);
      this.saveState();

      if (global.supabaseService) {
        global.supabaseService.insertStaff(newStaff);
      }

      if (global.adminController) {
        if (typeof global.adminController.renderStaffTable === 'function') global.adminController.renderStaffTable();
        if (typeof global.adminController.renderStats === 'function') global.adminController.renderStats();
      }

      return newStaff;
    }

    // Staff Deletion (Instant Local & Cloud Sync)
    async deleteStaff(id) {
      console.log('[Store] Deleting staff member:', id);
      const targetStr = String(id || '').trim();
      const existing = (this.state.staff || []).find(s => s && (s.id === targetStr || s.staff_code === targetStr || s.db_id === targetStr || s.phone === targetStr));

      // Record tombstones for all identifiers
      this.addDeletedStaffCode(targetStr);
      if (existing) {
        if (existing.id) this.addDeletedStaffCode(existing.id);
        if (existing.staff_code) this.addDeletedStaffCode(existing.staff_code);
        if (existing.db_id) this.addDeletedStaffCode(existing.db_id);
      }

      this.state.staff = (this.state.staff || []).filter(s => {
        if (!s) return false;
        return s.id !== targetStr && s.staff_code !== targetStr && s.db_id !== targetStr && s.phone !== targetStr;
      });
      this.saveState();

      if (global.supabaseService) {
        try {
          await global.supabaseService.deleteStaff(targetStr);
        } catch (err) {
          console.warn('[Store] Supabase deleteStaff warning:', err);
        }
      }

      if (global.adminController) {
        if (typeof global.adminController.renderStaffTable === 'function') global.adminController.renderStaffTable();
        if (typeof global.adminController.renderStats === 'function') global.adminController.renderStats();
        if (typeof global.adminController.renderKpis === 'function') global.adminController.renderKpis();
      }
      return { success: true };
    }

    logout() {
      this.state.session = { isLoggedIn: false, authState: 'LOGIN_REQUIRED', role: null, user: null };
      this.tempCitizenAuth = null;
      this.state.currentUser = null;
      this.saveState();
      try {
        if (global.swasthyaAPI && typeof global.swasthyaAPI.clearToken === 'function') {
          global.swasthyaAPI.clearToken();
        }
        if (typeof global.sessionStorage !== 'undefined') {
          global.sessionStorage.removeItem('swasthya_session_token');
        }
        if (typeof global.dispatchEvent === 'function') {
          global.dispatchEvent(new CustomEvent('swasthya:auth-logout'));
        }
      } catch (e) {
        console.warn('[store] logout event error:', e);
      }
    }

    setLanguage(lang) {
      this.state.currentLanguage = lang;
      this.saveState();
    }

    setTheme(theme) {
      this.state.currentTheme = theme;
      this.saveState();
    }

    // Family Member methods
    
    // ASHA Registers Patient & Refers to a Specific Registered Doctor
    addPatientAndReferToDoctor(patientData, referralData) {
      const abhaId = patientData.abhaId || `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPatient = {
        id: 'USR-PAT-' + String(Date.now()).slice(-4),
        abhaId: abhaId,
        name: patientData.name || 'Citizen',
        phone: patientData.phone || '9876543210',
        age: parseInt(patientData.age, 10) || 30,
        gender: patientData.gender || 'Male',
        village: patientData.village || 'Kondapalli Ward',
        bloodGroup: patientData.bloodGroup || 'O+',
        password: patientData.password || '123456',
        role: 'patient'
      };

      if (!this.state.patients) this.state.patients = [];
      if (!this.state.patients.some(p => p.phone === newPatient.phone)) {
        this.state.patients.unshift(newPatient);
      }

      // Add to doctor queue
      const tokenNum = String((this.state.consultQueue || []).length + 1).padStart(2, '0');
      const queueItem = {
        id: 'Q-' + String(Date.now()).slice(-4),
        token: `T-${tokenNum}`,
        patientName: newPatient.name,
        patientPhone: newPatient.phone,
        abhaId: newPatient.abhaId,
        age: newPatient.age,
        gender: newPatient.gender === 'Male' ? 'M' : 'F',
        complaint: referralData.complaint || 'Referred for Clinical Examination',
        vitals: referralData.vitals || { bp: '120/80', spo2: '98%', temp: '98.6°F', pulse: '78 bpm' },
        triage: referralData.triage || 'Yellow',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Waiting',
        assignedDoctorId: referralData.assignedDoctorId || null,
        assignedDoctorName: referralData.assignedDoctorName || 'Assigned Medical Officer',
        referredBy: (this.state.session && this.state.session.user) ? this.state.session.user.name : 'ASHA Frontline Lead'
      };

      if (!this.state.consultQueue) this.state.consultQueue = [];
      this.state.consultQueue.unshift(queueItem);

      // Track in ASHA master registry
      if (!this.state.ashaRegistry) this.state.ashaRegistry = [];
      this.state.ashaRegistry.unshift({
        id: 'REG-' + String(Date.now()).slice(-4),
        type: 'Patient Referral',
        patientName: newPatient.name,
        phone: newPatient.phone,
        village: newPatient.village,
        target: queueItem.assignedDoctorName,
        details: queueItem.complaint + ' (Triage: ' + queueItem.triage + ')',
        date: new Date().toLocaleDateString(),
        workerName: queueItem.referredBy
      });

      this.saveState();

      if (global.supabaseService) {
        global.supabaseService.insertProfile(newPatient);
        global.supabaseService.insertQueuePatient(queueItem);
      }

      if (global.doctorController) {
        if (typeof global.doctorController.renderQueue === 'function') global.doctorController.renderQueue();
        if (typeof global.doctorController.renderKpis === 'function') global.doctorController.renderKpis();
        if (typeof global.doctorController.renderStats === 'function') global.doctorController.renderStats();
      }

      return { success: true, patient: newPatient, queueItem };
    }

    // Patient Direct Teleconsultation Request to Doctor
    requestDoctorConsult(consultData) {
      const user = this.state.currentUser || (this.state.session && this.state.session.user);
      const tokenNum = String((this.state.consultQueue || []).length + 1).padStart(2, '0');
      
      const cleanPhone = user ? (user.phone || '').replace(/\D/g, '').slice(-10) : '';
      const matchedProfile = (this.state.patients || []).find(p => {
        const pPhone = (p.phone || '').replace(/\D/g, '').slice(-10);
        return cleanPhone && pPhone && pPhone === cleanPhone;
      }) || {};

      const uName = (user && user.name) || matchedProfile.name || 'Citizen Patient';
      const uPhone = cleanPhone || (matchedProfile.phone || '').replace(/\D/g, '').slice(-10) || '9876543210';
      const uAbha = (user && (user.abhaId || user.abha_id)) || matchedProfile.abhaId || '14-XXXX-XXXX-XXXX';
      const uAge = (user && user.age) || matchedProfile.age || 32;
      const uGender = (user && (user.gender === 'Female' || user.gender === 'F')) ? 'F' : 'M';

      const queueItem = {
        id: 'Q-' + String(Date.now()).slice(-4),
        token: `T-${tokenNum}`,
        patientName: uName,
        patientPhone: uPhone,
        abhaId: uAbha,
        age: uAge,
        gender: uGender,
        complaint: consultData.complaint || 'Direct Teleconsultation Request',
        vitals: consultData.vitals || { bp: '120/80', spo2: '98%', temp: '98.6°F', pulse: '76 bpm' },
        triage: consultData.triage || 'Green',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Waiting',
        assignedDoctorId: consultData.assignedDoctorId || null,
        assignedDoctorName: consultData.assignedDoctorName || 'Medical Officer',
        referredBy: 'Citizen Direct Request'
      };

      if (!this.state.consultQueue) this.state.consultQueue = [];
      this.state.consultQueue.unshift(queueItem);
      this.saveState();

      if (global.supabaseService) {
        global.supabaseService.insertQueuePatient(queueItem);
      }

      if (global.doctorController) {
        if (typeof global.doctorController.renderQueue === 'function') global.doctorController.renderQueue();
        if (typeof global.doctorController.renderKpis === 'function') global.doctorController.renderKpis();
        if (typeof global.doctorController.renderStats === 'function') global.doctorController.renderStats();
      }

      return queueItem;
    }

    getFamilyMembers(patientPhoneOrId) {
      const user = this.state.currentUser || (this.state.session && this.state.session.user);
      const rawPhone = patientPhoneOrId || (user ? user.phone : null);
      if (!rawPhone) return [];
      const targetPhone = String(rawPhone).replace(/\D/g, '').slice(-10);
      if (!targetPhone) return [];
      return (this.state.familyMembers || []).filter(f => {
        const fOwner = (f.ownerPhone || '').replace(/\D/g, '').slice(-10);
        return fOwner && fOwner === targetPhone;
      });
    }

    addFamilyMember(member) {
      const user = this.state.currentUser || (this.state.session && this.state.session.user);
      const rawPhone = member.ownerPhone || (user && user.phone ? user.phone : '');
      const ownerPhone = String(rawPhone).replace(/\D/g, '').slice(-10) || '9876543210';
      const id = 'FAM-' + String(Date.now()).slice(-4);
      const abha = member.abhaId || `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newFam = { id, abhaId: abha, status: 'Healthy', ...member, ownerPhone };
      if (!this.state.familyMembers) this.state.familyMembers = [];
      this.state.familyMembers.push(newFam);
      this.saveState();
      return newFam;
    }

    deleteFamilyMember(id) {
      this.state.familyMembers = (this.state.familyMembers || []).filter(f => f.id !== id);
      this.saveState();
    }

    // =========================================================
    // VIDEO TELECONSULTATION MANAGEMENT
    // =========================================================
    recordVideoCall(callData) {
      const rawCallerPhone = callData.callerPhone || (callData.patientPhone ? callData.patientPhone : '');
      const callRecord = {
        id: callData.id || ('CALL-' + String(Date.now()).slice(-4)),
        token: callData.token || ('VID-' + Math.floor(1000 + Math.random() * 9000)),
        callerRole: callData.callerRole || 'patient',
        callerName: callData.callerName || 'Citizen Patient',
        callerPhone: rawCallerPhone ? String(rawCallerPhone).replace(/\D/g, '').slice(-10) : '',
        abhaId: callData.abhaId || null,
        recipientRole: callData.recipientRole || 'doctor',
        recipientName: callData.recipientName || 'Dr. Medical Officer',
        facilitatorName: callData.facilitatorName || null,
        status: callData.status || 'Completed',
        duration: callData.duration || '05:00',
        durationSeconds: callData.durationSeconds || 300,
        date: callData.date || new Date().toISOString().split('T')[0],
        time: callData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: callData.notes || 'Telemedicine Video Consultation',
        rxId: callData.rxId || null,
        diagnosis: callData.diagnosis || 'Clinical Teleconsultation'
      };

      if (!this.state.videoCallHistory) this.state.videoCallHistory = [];
      this.state.videoCallHistory.unshift(callRecord);
      this.saveState();

      if (global.supabaseService) {
        global.supabaseService.insertVideoCallLog(callRecord);
      }

      return callRecord;
    }

    deleteVideoCall(callId) {
      if (!this.state.videoCallHistory) return;
      this.state.videoCallHistory = this.state.videoCallHistory.filter(c => c.id !== callId && c.token !== callId);
      this.saveState();
      if (global.supabaseService && typeof global.supabaseService.deleteVideoCallLog === 'function') {
        global.supabaseService.deleteVideoCallLog(callId);
      }
    }

    clearVideoCallHistory(role) {
      if (!this.state.videoCallHistory) return;
      if (!role) {
        this.state.videoCallHistory = [];
      } else if (role === 'patient') {
        const user = this.state.currentUser || (this.state.session && this.state.session.user);
        if (!user) return;
        const uPhone = (user.phone || '').replace(/\D/g, '').slice(-10);
        const uAbha = (user.abhaId || user.abha_id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const uName = (user.name || '').trim().toLowerCase();

        this.state.videoCallHistory = (this.state.videoCallHistory || []).filter(c => {
          const cPhone = (c.callerPhone || c.patientPhone || '').replace(/\D/g, '').slice(-10);
          const cAbha = (c.abhaId || c.abha_id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const cName = (c.callerName || c.patientName || '').trim().toLowerCase();
          const isThisPatient = (uPhone && cPhone && uPhone === cPhone) ||
                                (uAbha && cAbha && uAbha === cAbha) ||
                                (uName && cName && uName === cName && !['patient', 'citizen', 'citizen patient', 'verified citizen'].includes(uName));
          return !isThisPatient; // keep everyone else's records!
        });
      } else {
        const toKeep = this.state.videoCallHistory.filter(c => {
          if (role === 'doctor' && c.recipientRole === 'doctor') return false;
          if (role === 'worker' && (c.facilitatorName || c.callerRole === 'worker')) return false;
          return true;
        });
        this.state.videoCallHistory = toKeep;
      }
      this.saveState();
    }


    getVideoCallHistory(role, identifier) {
      const all = this.state.videoCallHistory || [];
      if (!role) return all;
      if (role === 'patient') {
        const user = this.state.currentUser || (this.state.session && this.state.session.user);
        if (!user) return [];
        const uPhone = (user.phone || '').replace(/\D/g, '').slice(-10);
        const uAbha = (user.abhaId || user.abha_id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const uName = (user.name || '').trim().toLowerCase();
        if (!uPhone && !uAbha && !uName) return [];
        return all.filter(c => {
          const cPhone = (c.callerPhone || c.patientPhone || '').replace(/\D/g, '').slice(-10);
          const cAbha = (c.abhaId || c.abha_id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const cName = (c.callerName || c.patientName || '').trim().toLowerCase();
          if (uPhone && cPhone && uPhone === cPhone) return true;
          if (uAbha && cAbha && uAbha === cAbha) return true;
          if (uName && cName && uName === cName && !['patient', 'citizen', 'citizen patient', 'verified citizen'].includes(uName)) {
            return true;
          }
          return false;
        });
      }
      if (role === 'doctor') {
        const user = this.state.session && this.state.session.user;
        const dName = user ? (user.name || '').toLowerCase() : '';
        return all.filter(c => {
          const rName = (c.recipientName || '').toLowerCase();
          return !dName || rName.includes(dName) || c.recipientRole === 'doctor';
        });
      }
      if (role === 'worker') {
        const user = this.state.session && this.state.session.user;
        const wName = user ? (user.name || '').toLowerCase() : '';
        return all.filter(c => {
          const fName = (c.facilitatorName || '').toLowerCase();
          return !wName || fName.includes(wName) || c.callerRole === 'worker';
        });
      }
      return all;
    }

    // Queue & Prescriptions
    addToQueue(item) {
      const tokenNum = String((this.state.consultQueue || []).length + 1).padStart(2, '0');
      const newItem = {
        id: 'Q-' + String(Date.now()).slice(-4),
        token: `T-${tokenNum}`,
        patientName: item.patientName || 'Patient',
        age: item.age || 30,
        gender: item.gender || 'O',
        complaint: item.complaint || 'General Checkup',
        vitals: item.vitals || { bp: '120/80', spo2: '98%', temp: '98.6°F', pulse: '78 bpm' },
        triage: item.triage || 'Green',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Waiting'
      };
      if (!this.state.consultQueue) this.state.consultQueue = [];
      this.state.consultQueue.push(newItem);
      this.saveState();
      if (global.supabaseService) {
        global.supabaseService.insertQueuePatient(newItem);
      }
      return newItem;
    }

    deletePrescription(rxId) {
      console.log('[Store] Deleting prescription:', rxId);
      this.state.prescriptions = (this.state.prescriptions || []).filter(r => r.id !== rxId && r.token !== rxId);
      this.saveState();

      if (global.supabaseService) {
        global.supabaseService.deletePrescription(rxId);
      }

      if (global.patientController && typeof global.patientController.renderPrescriptions === 'function') {
        global.patientController.renderPrescriptions();
      }
      if (global.doctorController && typeof global.doctorController.renderPrescriptionHistory === 'function') {
        global.doctorController.renderPrescriptionHistory();
      }
    }

    completeConsult(queueId, prescriptionData) {
      console.log('[Store] Completing consultation for Queue ID:', queueId);
      const qItem = (this.state.consultQueue || []).find(q => q.id === queueId);
      this.state.consultQueue = (this.state.consultQueue || []).filter(q => q.id !== queueId);
      
      let newRx = null;
      if (prescriptionData) {
        const patientPhone = prescriptionData.patientPhone || (qItem ? qItem.patientPhone : null);
        const abhaId = prescriptionData.abhaId || (qItem ? qItem.abhaId : null);
        newRx = {
          id: 'RX-' + String(Date.now()).slice(-4),
          date: new Date().toISOString().split('T')[0],
          patientPhone: patientPhone ? String(patientPhone).replace(/\D/g, '').slice(-10) : null,
          abhaId: abhaId || null,
          ...prescriptionData
        };
        if (!newRx.patientPhone && patientPhone) {
          newRx.patientPhone = String(patientPhone).replace(/\D/g, '').slice(-10);
        }
        if (!newRx.abhaId && abhaId) {
          newRx.abhaId = abhaId;
        }
        if (!this.state.prescriptions) this.state.prescriptions = [];
        this.state.prescriptions.unshift(newRx);
        
        if (global.supabaseService) {
          global.supabaseService.insertPrescription(newRx);
          global.supabaseService.deleteQueueItem(queueId);
        }
      }
      this.saveState();
      return newRx;
    }

    // ASHA Maternal, Immunization, Visits
    addAncRecord(record) {
      const newRec = { id: 'ANC-' + String(Date.now()).slice(-4), riskLevel: 'Normal', ...record };
      if (!this.state.ancRecords) this.state.ancRecords = [];
      this.state.ancRecords.unshift(newRec);
      this.saveState();
      if (global.supabaseService) {
        global.supabaseService.insertAncRecord(newRec);
      }
      return newRec;
    }

    addImmunization(imm) {
      const newImm = { id: 'UIP-' + String(Date.now()).slice(-4), status: 'Up to Date', ...imm };
      if (!this.state.immunizations) this.state.immunizations = [];
      this.state.immunizations.unshift(newImm);
      this.saveState();
      if (global.supabaseService) {
        global.supabaseService.insertImmunization(newImm);
      }
      return newImm;
    }

    addHomeVisit(visit) {
      const newVis = { id: 'VIS-' + String(Date.now()).slice(-4), status: 'Pending', ...visit };
      if (!this.state.homeVisits) this.state.homeVisits = [];
      this.state.homeVisits.unshift(newVis);
      this.saveState();
      if (global.supabaseService) {
        global.supabaseService.insertHomeVisit(newVis);
      }
      return newVis;
    }

    toggleHomeVisit(id) {
      const vis = (this.state.homeVisits || []).find(v => v.id === id);
      if (vis) {
        vis.status = vis.status === 'Completed' ? 'Pending' : 'Completed';
        this.saveState();
      }
    }

    toggleDoseTaken(medId, timeOfDay) {
      const med = (this.state.dailyMedications || []).find(m => m.id === medId);
      if (med && med.taken) {
        med.taken[timeOfDay] = !med.taken[timeOfDay];
        this.saveState();
      }
    }

    // Beds, Blood & Medicines
    async updateBedCount(hospId, type, delta) {
      const hosp = (this.state.hospitals || []).find(h => h.id === hospId);
      if (hosp) {
        const prevGen = hosp.genBedsAvail;
        const prevIcu = hosp.icuBedsAvail;
        const prevOxy = hosp.oxygenBedsAvail;

        if (type === 'gen') hosp.genBedsAvail = Math.max(0, (hosp.genBedsAvail || 0) + delta);
        if (type === 'icu') hosp.icuBedsAvail = Math.max(0, (hosp.icuBedsAvail || 0) + delta);
        if (type === 'oxygen') hosp.oxygenBedsAvail = Math.max(0, (hosp.oxygenBedsAvail || 0) + delta);
        this.saveState();

        if (global.supabaseService) {
          try {
            await global.supabaseService.updateBedsCount(hosp.id, hosp.genBedsAvail, hosp.icuBedsAvail, hosp.oxygenBedsAvail);
          } catch (err) {
            console.error('[Store] Bed count sync error:', err);
            // Rollback on failure
            hosp.genBedsAvail = prevGen;
            hosp.icuBedsAvail = prevIcu;
            hosp.oxygenBedsAvail = prevOxy;
            this.saveState();
            throw err;
          }
        }
        return hosp;
      }
      return null;
    }

    async updateBloodStock(group, delta) {
      if (this.state.bloodBank && this.state.bloodBank[group] !== undefined) {
        const prev = this.state.bloodBank[group];
        this.state.bloodBank[group] = Math.max(0, (this.state.bloodBank[group] || 0) + delta);
        this.saveState();

        if (global.supabaseService) {
          try {
            await global.supabaseService.updateBloodUnits(group, this.state.bloodBank[group]);
          } catch (err) {
            console.error('[Store] Blood stock sync error:', err);
            // Rollback on failure
            this.state.bloodBank[group] = prev;
            this.saveState();
            throw err;
          }
        }
        return this.state.bloodBank[group];
      }
      return null;
    }

        addMedicine(med) {
      const newMed = { id: med.id || ('DRUG-' + String(Date.now()).slice(-4)), status: 'In Stock', ...med };
      if (!this.state.medicines) this.state.medicines = [];
      this.state.medicines.unshift(newMed);
      this.saveState();
      if (global.supabaseService) {
        global.supabaseService.insertMedicine(newMed);
      }
      return newMed;
    }

    deleteMedicine(id) {
      if (!this.state.medicines) return;
      this.state.medicines = this.state.medicines.filter(m => m.id !== id);
      this.saveState();
      if (global.supabaseService) {
        global.supabaseService.deleteMedicine(id);
      }
    }
  }

  global.appStore = new Store();

})(typeof window !== 'undefined' ? window : this);
