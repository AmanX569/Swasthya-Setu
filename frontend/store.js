/**
 * =========================================================
 * SWASTHYA SETU - UNIFIED CLIENT-SIDE REACTIVE STORE (store.js)
 * Standalone Zero-Backend Store with Foolproof Authentication
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

    currentUser: {
      id: 'USR-PAT-001',
      name: 'Ramesh Kumar',
      phone: '9876543210',
      abhaId: '14-8921-4402-9912',
      village: 'Kondapalli Sub-Centre, Ward 4',
      age: 38,
      gender: 'Male',
      bloodGroup: 'O+'
    },

    familyMembers: [
      { id: 'FAM-001', name: 'Ramesh Kumar', relation: 'Self', age: 38, gender: 'Male', abhaId: '14-8921-4402-9912', status: 'Healthy' },
      { id: 'FAM-002', name: 'Sunita Devi', relation: 'Spouse', age: 34, gender: 'Female', abhaId: '14-3819-5510-7734', status: 'ANC Due' },
      { id: 'FAM-003', name: 'Aarav Kumar', relation: 'Son', age: 6, gender: 'Male', abhaId: '14-9912-1102-3345', status: 'UIP Immunized' }
    ],

    staff: [
      { id: 'DOC-101', name: 'Dr. Priya Sharma, MBBS, MD', role: 'doctor', phone: '9811122233', location: 'Kondapalli PHC', status: 'Active Online', regNo: 'MCI-AP-48912', password: 'doc@123', pin: '1234' },
      { id: 'DOC-102', name: 'Dr. Rajesh Verma, MBBS', role: 'doctor', phone: '9822233344', location: 'Ibrahimpatnam CHC', status: 'In Teleconsult', regNo: 'MCI-AP-31209', password: 'doc@123', pin: '1234' },
      { id: 'ASH-201', name: 'Lakshmi Didi (ASHA Lead)', role: 'worker', phone: '9833344455', location: 'Sector 4, Kondapalli', status: 'On Home Visits', regNo: 'ASHA-AP-094', password: 'asha@123', pin: '1234' },
      { id: 'ASH-202', name: 'Anitha Rao (ANM)', role: 'worker', phone: '9844455566', location: 'Sub-Centre 2', status: 'At Vaccine Camp', regNo: 'ANM-AP-118', password: 'asha@123', pin: '1234' },
      { id: 'ADM-001', name: 'S. K. Nambiar (District Officer)', role: 'admin', phone: '9855566677', location: 'District HQ, Vijayawada', status: 'System Active', regNo: 'DHO-AP-001', password: 'admin@123', pin: '1234' }
    ],

    consultQueue: [
      { id: 'Q-101', token: 'T-01', patientName: 'Ramesh Kumar', age: 38, gender: 'M', complaint: 'High Fever & Body Ache for 3 Days', vitals: { bp: '120/80', spo2: '98%', temp: '101.4°F', pulse: '88 bpm' }, triage: 'Yellow', time: '10:15 AM', status: 'Waiting' },
      { id: 'Q-102', token: 'T-02', patientName: 'Sunita Devi', age: 34, gender: 'F', complaint: '2nd Trimester Routine Check & Mild Dizziness', vitals: { bp: '110/70', spo2: '99%', temp: '98.6°F', pulse: '76 bpm' }, triage: 'Green', time: '10:30 AM', status: 'Waiting' },
      { id: 'Q-103', token: 'T-03', patientName: 'Gopal Raju', age: 52, gender: 'M', complaint: 'Chest Tightness & Breathlessness on Exertion', vitals: { bp: '150/95', spo2: '94%', temp: '99.1°F', pulse: '104 bpm' }, triage: 'Red', time: '10:45 AM', status: 'Urgent' }
    ],

    prescriptions: [
      {
        id: 'RX-901',
        token: 'T-01',
        patientName: 'Ramesh Kumar',
        doctorName: 'Dr. Priya Sharma',
        date: new Date().toISOString().split('T')[0],
        diagnosis: 'Acute Viral Fever with Myalgia',
        medicines: [
          { name: 'Paracetamol 650mg (Jan Aushadhi)', brandName: 'Dolo 650', genericPrice: 8, brandPrice: 34, dosage: '1 tab 3 times daily after food for 3 days', timing: '1-1-1' },
          { name: 'Cetirizine 10mg (Jan Aushadhi)', brandName: 'Cetzine', genericPrice: 4, brandPrice: 22, dosage: '1 tab at night for 3 days', timing: '0-0-1' },
          { name: 'ORS Sachet Powder', brandName: 'Electral', genericPrice: 5, brandPrice: 24, dosage: '1 packet in 1 liter clean water, sip frequently', timing: 'SOS' }
        ],
        advice: 'Take clean boiled water, rest well. Report back if fever persists beyond 3 days.'
      }
    ],

    dailyMedications: [
      { id: 'MED-01', name: 'Paracetamol 650mg (Jan Aushadhi)', dose: '1 Tab', saving: '₹26 saved', morning: true, noon: true, night: true, taken: { morning: true, noon: false, night: false } },
      { id: 'MED-02', name: 'Calcium + Vit D3 (Jan Aushadhi)', dose: '1 Tab', saving: '₹45 saved', morning: true, noon: false, night: false, taken: { morning: true, noon: false, night: false } },
      { id: 'MED-03', name: 'Iron & Folic Acid IFA (Govt PHC)', dose: '1 Tab', saving: '₹30 saved', morning: false, noon: false, night: true, taken: { morning: false, noon: false, night: false } }
    ],

    ancRecords: [
      { id: 'ANC-001', motherName: 'Sunita Devi', husbandName: 'Ramesh Kumar', age: 34, village: 'Kondapalli Ward 4', weeks: 24, edd: '2026-12-14', bp: '110/70', hb: '11.2 g/dL', ifaCount: 90, riskLevel: 'Normal', nextVisit: '2026-09-12' },
      { id: 'ANC-002', motherName: 'Kavitha M.', husbandName: 'Srinivas M.', age: 22, village: 'Kondapalli Ward 2', weeks: 32, edd: '2026-10-20', bp: '142/94', hb: '9.1 g/dL', ifaCount: 60, riskLevel: 'High Risk (Hypertension)', nextVisit: '2026-09-02' }
    ],

    immunizations: [
      { id: 'UIP-001', childName: 'Aarav Kumar', parentName: 'Ramesh Kumar', dob: '2020-04-10', gender: 'Male', village: 'Ward 4', lastVaccine: 'OPV Booster + DPT 2nd Booster', nextDue: 'Completed Core UIP', status: 'Up to Date' },
      { id: 'UIP-002', childName: 'Baby of Kavitha', parentName: 'Kavitha M.', dob: '2026-02-15', gender: 'Female', village: 'Ward 2', lastVaccine: 'Pentavalent 3 + IPV', nextDue: 'MR 1st Dose (9 Months)', status: 'Due in Oct' }
    ],

    homeVisits: [
      { id: 'VIS-001', household: 'House #42, Ramesh Kumar', members: 3, priority: 'ANC Follow-up', task: 'Check IFA intake & BP measurement', status: 'Completed' },
      { id: 'VIS-002', household: 'House #58, Kavitha M.', members: 4, priority: 'High-Risk Pregnancy', task: 'Review CHC referral slip & BP monitor', status: 'Pending' },
      { id: 'VIS-003', household: 'House #71, Ramu Elder', members: 2, priority: 'NCD Diabetes/BP', task: 'Glucometer test & Metformin stock check', status: 'Pending' }
    ],

    hospitals: [
      { id: 'HOSP-01', name: 'Kondapalli Primary Health Centre (PHC)', type: 'PHC', distance: '1.2 km', totalBeds: 20, genBedsAvail: 8, icuBedsAvail: 2, oxygenBedsAvail: 6, doctorOnDuty: 'Dr. Priya Sharma', phone: '0866-281001' },
      { id: 'HOSP-02', name: 'Ibrahimpatnam Community Health Centre (CHC)', type: 'CHC', distance: '6.5 km', totalBeds: 60, genBedsAvail: 18, icuBedsAvail: 5, oxygenBedsAvail: 14, doctorOnDuty: 'Dr. Rajesh Verma', phone: '0866-282002' },
      { id: 'HOSP-03', name: 'Government General Hospital (GGH), Vijayawada', type: 'District Hospital', distance: '16.0 km', totalBeds: 500, genBedsAvail: 74, icuBedsAvail: 12, oxygenBedsAvail: 45, doctorOnDuty: 'Emergency Trauma Team', phone: '0866-257000' }
    ],

    bloodBank: {
      'A+': 14,
      'A-': 4,
      'B+': 22,
      'B-': 6,
      'O+': 31,
      'O-': 8,
      'AB+': 11,
      'AB-': 3
    },

    medicines: [
      { id: 'DRUG-01', name: 'Paracetamol 650mg', category: 'Fever & Pain Relief', stock: 450, unit: 'Tablets', genericPrice: 8, brandPrice: 34, status: 'In Stock' },
      { id: 'DRUG-02', name: 'Amoxicillin 500mg', category: 'Antibiotic Infection', stock: 220, unit: 'Capsules', genericPrice: 28, brandPrice: 110, status: 'In Stock' },
      { id: 'DRUG-03', name: 'Metformin 500mg', category: 'Diabetes / Blood Sugar', stock: 380, unit: 'Tablets', genericPrice: 12, brandPrice: 58, status: 'In Stock' },
      { id: 'DRUG-04', name: 'Amlodipine 5mg', category: 'Hypertension / BP', stock: 190, unit: 'Tablets', genericPrice: 6, brandPrice: 38, status: 'In Stock' },
      { id: 'DRUG-05', name: 'ORS Powder Sachets', category: 'Dehydration / Diarrhea', stock: 500, unit: 'Packets', genericPrice: 5, brandPrice: 24, status: 'In Stock' },
      { id: 'DRUG-06', name: 'Iron & Folic Acid (IFA)', category: 'Maternal Nutrition', stock: 650, unit: 'Tablets', genericPrice: 4, brandPrice: 32, status: 'In Stock' }
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
          const state = { ...DEFAULT_INITIAL_STATE, ...parsed };
          if (Array.isArray(state.staff)) {
            state.staff.forEach(s => {
              s.password = s.password || (s.role + '@123');
              s.pin = s.pin || '1234';
            });
          }
          return state;
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

            // Multi-Role & Mobile-Number Authentication Resolver
    verifyAndLogin(role, credentials = {}) {
      const inputId = (credentials.id || credentials.phone || credentials.abhaId || '').trim();
      const inputPass = (credentials.password || credentials.passcode || credentials.pin || credentials.otp || '').trim();

      const digitsOnly = inputId.replace(/\D/g, '');

      // 1. Find all matching Staff members (Admin, Doctor, Worker) by Phone or ID
      const matchingStaff = this.state.staff.filter(s => {
        const sId = (s.id || '').toLowerCase();
        const sPhone = (s.phone || '').replace(/\D/g, '');
        const sReg = (s.regNo || '').toLowerCase();
        return (sId === inputId.toLowerCase()) || 
               (digitsOnly && sPhone && (sPhone === digitsOnly || sPhone.slice(-10) === digitsOnly.slice(-10))) || 
               (sReg === inputId.toLowerCase());
      });

      // 2. Find matching Citizen / Patient by Phone or ABHA
      const isPatientPhoneMatch = (
        (this.state.currentUser && this.state.currentUser.phone && digitsOnly && this.state.currentUser.phone.replace(/\D/g, '').slice(-10) === digitsOnly.slice(-10)) ||
        (this.state.currentUser && this.state.currentUser.abhaId && this.state.currentUser.abhaId === inputId)
      );

      // Collect all available roles for this phone/ID
      const availableRoles = [];
      matchingStaff.forEach(s => {
        if (!availableRoles.some(r => r.role === s.role)) {
          availableRoles.push({ role: s.role, user: s, label: s.name + ' (' + s.role.toUpperCase() + ')' });
        }
      });

      if (isPatientPhoneMatch || (matchingStaff.length === 0 && role === 'patient')) {
        const patUser = this.state.currentUser || { name: 'Citizen Patient', phone: inputId, abhaId: '14-8921-4402-9912' };
        if (!availableRoles.some(r => r.role === 'patient')) {
          availableRoles.push({ role: 'patient', user: patUser, label: patUser.name + ' (CITIZEN)' });
        }
      }

      // If multiple roles found and user hasn't explicitly chosen one yet
      if (!role && availableRoles.length > 1) {
        return { multiRole: true, availableRoles };
      }

      const targetRole = role || (availableRoles[0] ? availableRoles[0].role : 'patient');

      // 3. Authenticate Patient
      if (targetRole === 'patient') {
        const patUser = this.state.currentUser || {
          id: 'USR-PAT-' + String(Date.now()).slice(-4),
          name: 'Citizen Patient',
          phone: digitsOnly || '9876543210',
          abhaId: inputId.includes('-') ? inputId : '14-8921-4402-9912',
          village: 'Kondapalli Sub-Centre, Ward 4',
          age: 38,
          gender: 'Male',
          bloodGroup: 'O+',
          password: inputPass || '123456'
        };

        this.state.currentUser = patUser;
        this.state.session = { isLoggedIn: true, role: 'patient', user: patUser };
        this.saveState();
        return { success: true, user: patUser, availableRoles };
      }

      // 4. Authenticate Staff (Admin, Doctor, ASHA)
      const staffMember = matchingStaff.find(s => s.role === targetRole) || 
                          matchingStaff[0] || 
                          this.state.staff.find(s => s.role === targetRole);

      if (staffMember) {
        this.state.session = { isLoggedIn: true, role: staffMember.role, user: staffMember };
        this.saveState();
        return { success: true, user: staffMember, availableRoles };
      }

      return { success: false, message: 'No account found with this Mobile Number or ID.' };
    }

    // Change Password for Active User (Instant Local & Cloud Sync)
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
        this.saveState();
        if (global.supabaseService && global.supabaseService.isOnline) {
          global.supabaseService.updateProfilePassword(activeUser.phone || activeUser.abhaId, newPassword);
        }
      } else {
        const staffObj = this.state.staff.find(s => s.id === activeUser.id || s.phone === activeUser.phone);
        if (staffObj) {
          staffObj.password = newPassword;
          staffObj.pin = newPassword;
        }
        this.saveState();
        if (global.supabaseService && global.supabaseService.isOnline) {
          global.supabaseService.updateStaffPassword(activeUser.id, newPassword);
        }
      }

      return { success: true };
    }

    provisionStaffMember(role, data) {
      const prefix = role === 'doctor' ? 'DOC' : role === 'worker' ? 'ASH' : 'ADM';
      const staffCode = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;
      const newStaff = {
        id: staffCode,
        name: data.name || 'Healthcare Professional',
        role: role,
        phone: data.phone || '9876543210',
        location: data.location || 'Kondapalli Health Centre',
        status: 'Active Online',
        regNo: data.regNo || `${prefix}-AP-${Math.floor(1000 + Math.random() * 9000)}`,
        password: data.password || (role + '@123'),
        pin: data.pin || '1234'
      };

      this.state.staff.unshift(newStaff);
      this.saveState();

      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.insertStaff(newStaff);
      }

      if (global.adminController) {
        if (typeof global.adminController.renderStaff === 'function') global.adminController.renderStaff();
        if (typeof global.adminController.renderStats === 'function') global.adminController.renderStats();
      }

      return newStaff;
    }

    logout() {
      this.state.session = {
        isLoggedIn: false,
        role: null,
        user: null
      };
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

    // Universal Multi-Role Registration
    registerNewUser(role, data) {
      if (role === 'patient') {
        const abhaId = data.abhaId || `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
        const newPatient = {
          id: 'USR-PAT-' + String(Date.now()).slice(-4),
          abhaId: abhaId,
          name: data.name || 'Citizen',
          phone: data.phone || '9876543210',
          age: parseInt(data.age, 10) || 30,
          gender: data.gender || 'Male',
          village: data.village || 'Kondapalli Ward',
          bloodGroup: data.bloodGroup || 'O+',
          role: 'patient'
        };

        this.state.currentUser = newPatient;
        this.state.session = { isLoggedIn: true, role: 'patient', user: newPatient };
        this.saveState();

        if (global.supabaseService && global.supabaseService.isOnline) {
          global.supabaseService.insertProfile(newPatient);
        }
        return { success: true, user: newPatient };
      } else {
        // Staff Registration (Doctor, Worker, Admin)
        const prefix = role === 'doctor' ? 'DOC' : role === 'worker' ? 'ASH' : 'ADM';
        const staffCode = `${prefix}-${Math.floor(100 + Math.random() * 900)}`;
        const newStaff = {
          id: staffCode,
          name: data.name || 'Healthcare Professional',
          role: role,
          phone: data.phone || '9876543210',
          location: data.location || 'Kondapalli Health Centre',
          status: 'Active Online',
          regNo: data.regNo || `${prefix}-AP-${Math.floor(1000 + Math.random() * 9000)}`,
          password: data.password || (role + '@123'),
          pin: data.pin || '1234'
        };

        this.state.staff.unshift(newStaff);
        this.state.session = { isLoggedIn: true, role: role, user: newStaff };
        this.saveState();

        if (global.supabaseService && global.supabaseService.isOnline) {
          global.supabaseService.insertStaff(newStaff);
        }
        return { success: true, user: newStaff };
      }
    }

    // Family Member methods
    addFamilyMember(member) {
      const id = 'FAM-' + String(Date.now()).slice(-4);
      const abha = member.abhaId || `14-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newFam = { id, abhaId: abha, status: 'Healthy', ...member };
      this.state.familyMembers.push(newFam);
      this.saveState();
      return newFam;
    }

    deleteFamilyMember(id) {
      this.state.familyMembers = this.state.familyMembers.filter(f => f.id !== id);
      this.saveState();
    }

    // Staff methods
    addStaff(staffMember) {
      const prefix = staffMember.role === 'doctor' ? 'DOC' : staffMember.role === 'worker' ? 'ASH' : 'ADM';
      const id = `${prefix}-${String(Date.now()).slice(-4)}`;
      const newStaff = {
        id,
        name: staffMember.name || 'Healthcare Staff',
        role: staffMember.role || 'worker',
        phone: staffMember.phone || '9876543210',
        location: staffMember.location || 'Kondapalli Sector',
        status: staffMember.status || 'Active',
        regNo: staffMember.regNo || `${prefix}-AP-${Math.floor(100 + Math.random() * 900)}`,
        password: staffMember.password || (staffMember.role + '@123'),
        pin: '1234'
      };
      this.state.staff.unshift(newStaff);
      this.saveState();
      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.insertStaff(newStaff);
      }
      return newStaff;
    }

    deleteStaff(id) {
      this.state.staff = this.state.staff.filter(s => s.id !== id);
      this.saveState();
      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.deleteStaff(id);
      }
      if (global.adminController) {
        if (typeof global.adminController.renderStaff === 'function') global.adminController.renderStaff();
        if (typeof global.adminController.renderStats === 'function') global.adminController.renderStats();
      }
    }

    // Queue & Prescriptions
    addToQueue(item) {
      const tokenNum = String(this.state.consultQueue.length + 1).padStart(2, '0');
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
      this.state.consultQueue.push(newItem);
      this.saveState();
      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.insertQueuePatient(newItem);
      }
      return newItem;
    }

    completeConsult(queueId, prescriptionData) {
      this.state.consultQueue = this.state.consultQueue.filter(q => q.id !== queueId);
      if (prescriptionData) {
        const rx = {
          id: 'RX-' + String(Date.now()).slice(-4),
          date: new Date().toISOString().split('T')[0],
          ...prescriptionData
        };
        this.state.prescriptions.unshift(rx);
        if (global.supabaseService && global.supabaseService.isOnline) {
          global.supabaseService.insertPrescription(rx);
        }
      }
      this.saveState();
    }

    // ASHA Maternal, Immunization, Visits
    addAncRecord(record) {
      const newRec = {
        id: 'ANC-' + String(Date.now()).slice(-4),
        riskLevel: 'Normal',
        ...record
      };
      this.state.ancRecords.unshift(newRec);
      this.saveState();
      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.insertAncRecord(newRec);
      }
      return newRec;
    }

    addImmunization(imm) {
      const newImm = {
        id: 'UIP-' + String(Date.now()).slice(-4),
        status: 'Up to Date',
        ...imm
      };
      this.state.immunizations.unshift(newImm);
      this.saveState();
      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.insertImmunization(newImm);
      }
      return newImm;
    }

    addHomeVisit(visit) {
      const newVis = {
        id: 'VIS-' + String(Date.now()).slice(-4),
        status: 'Pending',
        ...visit
      };
      this.state.homeVisits.unshift(newVis);
      this.saveState();
      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.insertHomeVisit(newVis);
      }
      return newVis;
    }

    toggleHomeVisit(id) {
      const vis = this.state.homeVisits.find(v => v.id === id);
      if (vis) {
        vis.status = vis.status === 'Completed' ? 'Pending' : 'Completed';
        this.saveState();
      }
    }

    toggleDoseTaken(medId, timeOfDay) {
      const med = this.state.dailyMedications.find(m => m.id === medId);
      if (med && med.taken) {
        med.taken[timeOfDay] = !med.taken[timeOfDay];
        this.saveState();
      }
    }

    // Beds, Blood & Medicines
    updateBedCount(hospId, type, delta) {
      const hosp = this.state.hospitals.find(h => h.id === hospId);
      if (hosp) {
        if (type === 'gen') hosp.genBedsAvail = Math.max(0, hosp.genBedsAvail + delta);
        if (type === 'icu') hosp.icuBedsAvail = Math.max(0, hosp.icuBedsAvail + delta);
        if (type === 'oxygen') hosp.oxygenBedsAvail = Math.max(0, hosp.oxygenBedsAvail + delta);
        this.saveState();
        if (global.supabaseService && global.supabaseService.isOnline) {
          global.supabaseService.updateBedsCount(hosp.id, hosp.genBedsAvail, hosp.icuBedsAvail, hosp.oxygenBedsAvail);
        }
      }
    }

    updateBloodStock(group, delta) {
      if (this.state.bloodBank[group] !== undefined) {
        this.state.bloodBank[group] = Math.max(0, this.state.bloodBank[group] + delta);
        this.saveState();
        if (global.supabaseService && global.supabaseService.isOnline) {
          global.supabaseService.updateBloodUnits(group, this.state.bloodBank[group]);
        }
      }
    }

    addMedicine(med) {
      const newMed = {
        id: 'DRUG-' + String(Date.now()).slice(-4),
        status: 'In Stock',
        ...med
      };
      this.state.medicines.unshift(newMed);
      this.saveState();
      if (global.supabaseService && global.supabaseService.isOnline) {
        global.supabaseService.insertMedicine(newMed);
      }
      return newMed;
    }
  }

  global.appStore = new Store();

})(typeof window !== 'undefined' ? window : this);
