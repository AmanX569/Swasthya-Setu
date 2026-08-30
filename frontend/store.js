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
    patients: [], // All registered citizen profiles

    staff: [
      { id: 'ADM-7856', staff_code: 'ADM-7856', name: 'Aman Yadav', role: 'admin', phone: '7906684557', location: 'District HQ', status: 'Active Online', regNo: 'ADM-AP-001', password: 'Aman@123', pin: 'Aman@123' },
      { id: 'DOC-101', staff_code: 'DOC-101', name: 'Dr. Priya Sharma, MBBS, MD', role: 'doctor', phone: '9811122233', location: 'Kondapalli PHC', status: 'Active Online', regNo: 'MCI-AP-48912', password: 'doc@123', pin: '1234' },
      { id: 'ASH-201', staff_code: 'ASH-201', name: 'Lakshmi Didi (ASHA Lead)', role: 'worker', phone: '9833344455', location: 'Sector 4, Kondapalli', status: 'On Home Visits', regNo: 'ASHA-AP-094', password: 'asha@123', pin: '1234' }
    ],

    familyMembers: [
      { id: 'FAM-001', name: 'Ramesh Kumar', relation: 'Self', age: 38, gender: 'Male', abhaId: '14-8921-4402-9912', status: 'Healthy' },
      { id: 'FAM-002', name: 'Sunita Devi', relation: 'Spouse', age: 34, gender: 'Female', abhaId: '14-3819-5510-7734', status: 'ANC Due' },
      { id: 'FAM-003', name: 'Aarav Kumar', relation: 'Son', age: 6, gender: 'Male', abhaId: '14-9912-1102-3345', status: 'UIP Immunized' }
    ],

    consultQueue: [
      { id: 'Q-101', token: 'T-01', patientName: 'Ramesh Kumar', age: 38, gender: 'M', complaint: 'High Fever & Body Ache for 3 Days', vitals: { bp: '120/80', spo2: '98%', temp: '101.4°F', pulse: '88 bpm' }, triage: 'Yellow', time: '10:15 AM', status: 'Waiting' },
      { id: 'Q-102', token: 'T-02', patientName: 'Sunita Devi', age: 34, gender: 'F', complaint: '2nd Trimester Routine Check & Mild Dizziness', vitals: { bp: '110/70', spo2: '99%', temp: '98.6°F', pulse: '76 bpm' }, triage: 'Green', time: '10:30 AM', status: 'Waiting' },
      { id: 'Q-103', token: 'T-03', patientName: 'Gopal Raju', age: 52, gender: 'M', complaint: 'Chest Tightness & Breathlessness on Exertion', vitals: { bp: '150/95', spo2: '94%', temp: '99.1°F', pulse: '104 bpm' }, triage: 'Red', time: '10:45 AM', status: 'Urgent' }
    ],

    prescriptions: [],

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
      { id: 'HOSP-01', name: 'Kondapalli Primary Health Centre (PHC)', type: 'PHC', distance: '1.2 km', totalBeds: 20, genBedsAvail: 8, icuBedsAvail: 2, oxygenBedsAvail: 6, doctorOnDuty: 'Dr. Priya Sharma', phone: '0866-281001' },
      { id: 'HOSP-02', name: 'Ibrahimpatnam Community Health Centre (CHC)', type: 'CHC', distance: '6.5 km', totalBeds: 60, genBedsAvail: 18, icuBedsAvail: 5, oxygenBedsAvail: 14, doctorOnDuty: 'Dr. Rajesh Verma', phone: '0866-282002' },
      { id: 'HOSP-03', name: 'Government General Hospital (GGH), Vijayawada', type: 'District Hospital', distance: '16.0 km', totalBeds: 500, genBedsAvail: 74, icuBedsAvail: 12, oxygenBedsAvail: 45, doctorOnDuty: 'Emergency Trauma Team', phone: '0866-257000' }
    ],

    bloodBank: {
      'A+': 14, 'A-': 4, 'B+': 22, 'B-': 6,
      'O+': 31, 'O-': 8, 'AB+': 11, 'AB-': 3
    },

    medicines: [
      { id: 'DRUG-01', name: 'Paracetamol 650mg', category: 'Fever & Pain Relief', stock: 450, unit: 'Tablets', genericPrice: 8, brandPrice: 34, status: 'In Stock' },
      { id: 'DRUG-02', name: 'Amoxicillin 500mg', category: 'Antibiotic Infection', stock: 220, unit: 'Capsules', genericPrice: 28, brandPrice: 110, status: 'In Stock' },
      { id: 'DRUG-03', name: 'Metformin 500mg', category: 'Diabetes / Blood Sugar', stock: 380, unit: 'Tablets', genericPrice: 12, brandPrice: 58, status: 'In Stock' }
    ]
  };

  class Store {
    constructor() {
      this.listeners = [];
      this.state = this.loadState();
    }

    loadState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return { ...DEFAULT_INITIAL_STATE, ...parsed };
        }
      } catch (e) {
        console.warn('[Store] Local load fallback:', e);
      }
      return JSON.parse(JSON.stringify(DEFAULT_INITIAL_STATE));
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
      const inputId = (credentials.id || credentials.phone || credentials.abhaId || '').trim();
      const inputPass = (credentials.password || credentials.passcode || credentials.pin || credentials.otp || '').trim();

      if (!inputId) {
        return { success: false, message: 'Please enter your Mobile Number or ID.' };
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
        return (sId === inputId.toLowerCase()) || 
               (digitsOnly && sPhone && (sPhone === digitsOnly || sPhone.slice(-10) === digitsOnly.slice(-10))) || 
               (sReg === inputId.toLowerCase());
      });

      // 2. Search Registered Patient Profiles
      const registeredPatients = this.state.patients || [];
      if (this.state.currentUser && !registeredPatients.some(p => p.phone === this.state.currentUser.phone)) {
        registeredPatients.push(this.state.currentUser);
      }

      const matchingPatients = registeredPatients.filter(p => {
        const pPhone = (p.phone || '').replace(/\D/g, '');
        const pAbha = (p.abhaId || p.abha_id || '').toLowerCase();
        return (digitsOnly && pPhone && (pPhone === digitsOnly || pPhone.slice(-10) === digitsOnly.slice(-10))) || 
               (pAbha === inputId.toLowerCase());
      });

      // Check if identity exists in system
      const identityExists = (matchingStaff.length > 0) || (matchingPatients.length > 0);
      if (!identityExists) {
        return { 
          success: false, 
          message: '⚠️ Access Denied: No account found with this Mobile Number or ID. Citizens must click "Register New User" below.' 
        };
      }

      // Validate Passwords & Collect Authorized Roles
      const matchedRoles = [];

      matchingStaff.forEach(s => {
        const staffPass = s.password || s.pin || s.password_hash;
        if (staffPass === inputPass) {
          if (!matchedRoles.some(r => r.role === s.role)) {
            matchedRoles.push({ role: s.role, user: s, label: s.name + ' (' + s.role.toUpperCase() + ')' });
          }
        }
      });

      matchingPatients.forEach(p => {
        const patPass = p.password || p.pin || '123456';
        if (patPass === inputPass) {
          if (!matchedRoles.some(r => r.role === 'patient')) {
            matchedRoles.push({ role: 'patient', user: p, label: p.name + ' (CITIZEN)' });
          }
        }
      });

      // Identity was found, but password was wrong
      if (matchedRoles.length === 0) {
        return { success: false, message: '⚠️ Incorrect Password or Security PIN. Access Denied.' };
      }

      // Multi-Role Resolution (e.g. Doctor + Patient or Admin + Doctor)
      if (!role && matchedRoles.length > 1) {
        return { multiRole: true, availableRoles: matchedRoles };
      }

      // Log into target role
      const targetRole = role || matchedRoles[0].role;
      const targetMatch = matchedRoles.find(r => r.role === targetRole) || matchedRoles[0];

      this.state.session = { isLoggedIn: true, role: targetMatch.role, user: targetMatch.user };
      if (targetMatch.role === 'patient') {
        this.state.currentUser = targetMatch.user;
      }
      this.saveState();

      return { success: true, user: targetMatch.user, availableRoles: matchedRoles };
    }

    // Patient Self-Registration (Only for Citizens)
    registerPatientUser(data) {
      const abhaId = `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPatient = {
        id: 'USR-PAT-' + String(Date.now()).slice(-4),
        abhaId: abhaId,
        name: data.name || 'Citizen',
        phone: data.phone || '9876543210',
        age: parseInt(data.age, 10) || 30,
        gender: data.gender || 'Male',
        village: data.village || 'Kondapalli Ward',
        bloodGroup: data.bloodGroup || 'O+',
        password: data.password || '123456',
        role: 'patient'
      };

      if (!this.state.patients) this.state.patients = [];
      this.state.patients.unshift(newPatient);
      this.state.currentUser = newPatient;
      this.state.session = { isLoggedIn: true, role: 'patient', user: newPatient };
      this.saveState();

      if (global.supabaseService) {
        global.supabaseService.insertProfile(newPatient);
      }
      return { success: true, user: newPatient };
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
    deleteStaff(id) {
      console.log('[Store] Deleting staff member:', id);
      this.state.staff = (this.state.staff || []).filter(s => s.id !== id && s.staff_code !== id && s.phone !== id);
      this.saveState();

      if (global.supabaseService) {
        global.supabaseService.deleteStaff(id);
      }

      if (global.adminController) {
        if (typeof global.adminController.renderStaffTable === 'function') global.adminController.renderStaffTable();
        if (typeof global.adminController.renderStats === 'function') global.adminController.renderStats();
      }
    }

    logout() {
      this.state.session = { isLoggedIn: false, role: null, user: null };
      this.saveState();
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

      if (global.doctorController && typeof global.doctorController.renderQueue === 'function') {
        global.doctorController.renderQueue();
        global.doctorController.renderStats();
      }

      return { success: true, patient: newPatient, queueItem };
    }

    // Patient Direct Teleconsultation Request to Doctor
    requestDoctorConsult(consultData) {
      const user = this.state.currentUser || (this.state.session && this.state.session.user) || { name: 'Citizen Patient', phone: '9876543210' };
      const tokenNum = String((this.state.consultQueue || []).length + 1).padStart(2, '0');
      
      const queueItem = {
        id: 'Q-' + String(Date.now()).slice(-4),
        token: `T-${tokenNum}`,
        patientName: user.name || 'Citizen Patient',
        patientPhone: user.phone || '9876543210',
        abhaId: user.abhaId || '14-8921-4402-9912',
        age: user.age || 35,
        gender: (user.gender === 'Female' || user.gender === 'F') ? 'F' : 'M',
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

      if (global.doctorController && typeof global.doctorController.renderQueue === 'function') {
        global.doctorController.renderQueue();
        global.doctorController.renderStats();
      }

      return queueItem;
    }

    addFamilyMember(member) {
      const id = 'FAM-' + String(Date.now()).slice(-4);
      const abha = member.abhaId || `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newFam = { id, abhaId: abha, status: 'Healthy', ...member };
      if (!this.state.familyMembers) this.state.familyMembers = [];
      this.state.familyMembers.push(newFam);
      this.saveState();
      return newFam;
    }

    deleteFamilyMember(id) {
      this.state.familyMembers = (this.state.familyMembers || []).filter(f => f.id !== id);
      this.saveState();
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
      this.state.consultQueue = (this.state.consultQueue || []).filter(q => q.id !== queueId);
      
      let newRx = null;
      if (prescriptionData) {
        newRx = {
          id: 'RX-' + String(Date.now()).slice(-4),
          date: new Date().toISOString().split('T')[0],
          ...prescriptionData
        };
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
    updateBedCount(hospId, type, delta) {
      const hosp = (this.state.hospitals || []).find(h => h.id === hospId);
      if (hosp) {
        if (type === 'gen') hosp.genBedsAvail = Math.max(0, hosp.genBedsAvail + delta);
        if (type === 'icu') hosp.icuBedsAvail = Math.max(0, hosp.icuBedsAvail + delta);
        if (type === 'oxygen') hosp.oxygenBedsAvail = Math.max(0, hosp.oxygenBedsAvail + delta);
        this.saveState();
        if (global.supabaseService) {
          global.supabaseService.updateBedsCount(hosp.id, hosp.genBedsAvail, hosp.icuBedsAvail, hosp.oxygenBedsAvail);
        }
      }
    }

    updateBloodStock(group, delta) {
      if (this.state.bloodBank && this.state.bloodBank[group] !== undefined) {
        this.state.bloodBank[group] = Math.max(0, this.state.bloodBank[group] + delta);
        this.saveState();
        if (global.supabaseService) {
          global.supabaseService.updateBloodUnits(group, this.state.bloodBank[group]);
        }
      }
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
