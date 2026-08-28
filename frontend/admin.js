/**
 * Swasthya Setu - Admin & System Leader Command Center Service
 * 
 * Provides comprehensive healthcare administration:
 * 1. Executive Command Center Dashboard
 * 2. User & Staff Management (Patients, Doctors, Field Workers, Admins)
 * 3. Doctor Registration Approval Workflow
 * 4. Field Worker (ASHA/ANM) Geographic Assignment & Routing
 * 5. Disease Surveillance & Outbreak Detection Heatmap
 * 6. Inventory & Drug Supply Tracker across Rural Distribution Hubs
 * 7. Consultation & Service Analytics
 * 8. District Hospital Capacity & Live Bed Grid
 * 9. Blood Bank Real-time Monitoring (8 Blood Groups)
 * 10. Emergency System Alert Feed
 */

(function(global) {
  'use strict';

  // Master Mock Dataset for Healthcare Administration
  const adminState = {
    currentTab: 'overview',
    staffFilter: 'all',
    staffSearch: '',
    inventoryCenterFilter: 'all',
    inventoryStatusFilter: 'all',
    inventorySearch: '',
    diseaseFilter: 'all',
    selectedWorkerId: null,
    selectedDocId: null
  };

  const adminData = {
    stats: {
      totalPatients: '24,850',
      totalDoctors: 142,
      totalWorkers: 385,
      pendingDoctorApprovals: 6,
      activeConsultations: 48,
      criticalMedicineShortages: 3,
      totalHospitalBeds: 720,
      availableHospitalBeds: 184,
      avgWaitTimeMinutes: 14,
      activeDiseaseAlerts: 4
    },

    alerts: [
      {
        id: 'alt-01',
        type: 'critical',
        category: 'Outbreak Detection',
        title: 'Potential Dengue Outbreak Detected in Zone A',
        location: 'Kondapalli Sector · Ward 4 & 6',
        detail: 'Abnormal spike: +38% acute fever with thrombocytopenia reported in last 48 hours.',
        timestamp: '18 mins ago',
        actionLabel: 'Dispatch Rapid ASHA Squad'
      },
      {
        id: 'alt-02',
        type: 'critical',
        category: 'ICU Capacity',
        title: 'ICU Capacity Warning: Ibrahimpatnam CHC',
        location: 'Ibrahimpatnam CHC',
        detail: 'Only 1 of 8 ICU ventilator beds available. Trauma intake diverted to District Hospital.',
        timestamp: '42 mins ago',
        actionLabel: 'View Bed Grid'
      },
      {
        id: 'alt-03',
        type: 'warn',
        category: 'Drug Supply',
        title: 'Critical Stockout Risk: ORS & Insulin 40IU',
        location: 'Rural Distribution Hub 3 (Kondapalli)',
        detail: 'Buffer stock below 15% minimum threshold. 4 Sub-centres pending dispatch.',
        timestamp: '1 hour ago',
        actionLabel: 'Approve Emergency Stock Transfer'
      },
      {
        id: 'alt-04',
        type: 'warn',
        category: 'Blood Bank',
        title: 'O- Negative Blood Stock Deficit',
        location: 'Vijayawada District Blood Bank',
        detail: 'O- available units dropped to 2 (Minimum required: 10 units).',
        timestamp: '2 hours ago',
        actionLabel: 'Broadcast Donor Appeal'
      }
    ],

    // User & Staff Roster
    users: [
      {
        id: 'USR-DOC-101',
        name: 'Dr. K. V. Rao',
        role: 'doctor',
        phone: '2222222222',
        email: 'dr.rao@swasthyasetu.gov.in',
        specialization: 'Senior Consultant (General Medicine)',
        facility: 'Ibrahimpatnam CHC',
        location: 'Krishna District',
        status: 'Active',
        regDate: '12 Jan 2025',
        verified: true,
        consultsCompleted: 1420,
        rating: 4.8
      },
      {
        id: 'USR-DOC-102',
        name: 'Dr. Priya Patel',
        role: 'doctor',
        phone: '6666666666',
        email: 'dr.priya@swasthyasetu.gov.in',
        specialization: 'Obstetrics & Gynaecology (OB-GYN)',
        facility: 'Vijayawada District Hospital',
        location: 'Vijayawada Rural',
        status: 'Active',
        regDate: '04 Mar 2025',
        verified: true,
        consultsCompleted: 980,
        rating: 4.9
      },
      {
        id: 'USR-DOC-103',
        name: 'Dr. Ramesh Chandra',
        role: 'doctor',
        phone: '9848011223',
        email: 'dr.ramesh@swasthyasetu.gov.in',
        specialization: 'Pediatric Care & Neonatal Specialist',
        facility: 'Kondapalli PHC',
        location: 'Kondapalli Sector',
        status: 'Active',
        regDate: '18 Nov 2024',
        verified: true,
        consultsCompleted: 1150,
        rating: 4.7
      },
      {
        id: 'USR-DOC-104',
        name: 'Dr. Sunita Deshmukh',
        role: 'doctor',
        phone: '9876500112',
        email: 'dr.sunita@swasthyasetu.gov.in',
        specialization: 'Cardiologist & Emergency Physician',
        facility: 'Mylavaram Area Hospital',
        location: 'Mylavaram Block',
        status: 'Suspended',
        regDate: '15 Aug 2024',
        verified: true,
        consultsCompleted: 620,
        rating: 4.2
      },
      {
        id: 'USR-WRK-201',
        name: 'B. Saraswati',
        role: 'worker',
        phone: '3333333333',
        email: 'saraswati.asha@swasthyasetu.org',
        designation: 'Lead ASHA Didi (Ward 6)',
        facility: 'Kondapalli Sub-Centre',
        location: 'Kondapalli Village',
        status: 'Active',
        regDate: '10 Feb 2024',
        verified: true,
        householdsCovered: 142,
        syncStatus: 'Full Sync'
      },
      {
        id: 'USR-WRK-202',
        name: 'K. Nageswara Rao',
        role: 'worker',
        phone: '9440123456',
        email: 'nageswar.anm@swasthyasetu.org',
        designation: 'Auxiliary Nurse Midwife (ANM)',
        facility: 'Ibrahimpatnam Sector Hub',
        location: 'Ibrahimpatnam Rural',
        status: 'Active',
        regDate: '22 Apr 2024',
        verified: true,
        householdsCovered: 210,
        syncStatus: 'Full Sync'
      },
      {
        id: 'USR-WRK-203',
        name: 'M. Lakshmi Devi',
        role: 'worker',
        phone: '9849223344',
        email: 'lakshmi.asha@swasthyasetu.org',
        designation: 'Community Health Mobilizer',
        facility: 'Mylavaram Sub-Centre',
        location: 'Mylavaram Sector',
        status: 'Active',
        regDate: '05 Sep 2024',
        verified: true,
        householdsCovered: 165,
        syncStatus: '2G Intermittent'
      },
      {
        id: 'USR-PAT-301',
        name: 'Anitha K.',
        role: 'patient',
        phone: '4444444444',
        email: 'anitha.k@example.com',
        abhaId: '14-2938-7710-4521',
        facility: 'Kondapalli PHC',
        location: 'Kondapalli Sector',
        status: 'Active',
        regDate: '14 Jul 2026',
        verified: true,
        healthScore: 'Good · ANC Tracked'
      },
      {
        id: 'USR-PAT-302',
        name: 'Suresh B.',
        role: 'patient',
        phone: '9848555666',
        email: 'suresh.b@example.com',
        abhaId: '14-8842-1920-3321',
        facility: 'Ibrahimpatnam CHC',
        location: 'Ibrahimpatnam East',
        status: 'Active',
        regDate: '19 Aug 2026',
        verified: true,
        healthScore: 'Chronic · Hypertension'
      },
      {
        id: 'USR-PAT-303',
        name: 'Lakshmi P.',
        role: 'patient',
        phone: '9848777888',
        email: 'lakshmi.p@example.com',
        abhaId: '14-9912-4410-8823',
        facility: 'Vijayawada District Hospital',
        location: 'Vijayawada Rural',
        status: 'Active',
        regDate: '12 Aug 2026',
        verified: true,
        healthScore: 'High-Risk · TB DOTS'
      },
      {
        id: 'USR-ADM-401',
        name: 'Rajesh Sharma',
        role: 'admin',
        phone: '1111111111',
        email: 'rajesh.sharma@health.gov.in',
        designation: 'Chief Medical Officer & System Leader',
        facility: 'Kondapalli Community Grid Command',
        location: 'State HQ · Andhra Pradesh',
        status: 'Active',
        regDate: '01 Jan 2024',
        verified: true,
        permissions: 'Full Superadmin Access'
      },
      {
        id: 'USR-ADM-402',
        name: 'Vikram Mehta',
        role: 'admin',
        phone: '5555555555',
        email: 'vikram.mehta@health.gov.in',
        designation: 'Facility Administrator & Multi-Role Lead',
        facility: 'Kondapalli District Network',
        location: 'Kondapalli PHC',
        status: 'Active',
        regDate: '15 Jan 2024',
        verified: true,
        permissions: 'District Admin & Citizen Access'
      }
    ],

    // Doctor Approvals Queue
    pendingDoctors: [
      {
        id: 'DOC-APP-891',
        name: 'Dr. Anand Verma',
        phone: '9876543219',
        email: 'anand.verma@medcare.in',
        specialization: 'General Surgery & Trauma Care',
        mciNumber: 'MCI-AP-2018-99412',
        experience: '9 Years',
        affiliatedHospital: 'Ibrahimpatnam CHC',
        location: 'Krishna District',
        qualification: 'MBBS, MS (General Surgery)',
        documents: ['Medical Council Reg Certificate', 'Government ID (Aadhaar)', 'MBBS Degree Copy'],
        appliedDate: '26 Aug 2026',
        status: 'Pending Review'
      },
      {
        id: 'DOC-APP-892',
        name: 'Dr. Sneha Reddy',
        phone: '9848123499',
        email: 'dr.sneha.reddy@aiims.edu',
        specialization: 'Pediatrics & Child Health',
        mciNumber: 'MCI-TG-2020-44129',
        experience: '6 Years',
        affiliatedHospital: 'Kondapalli PHC',
        location: 'Kondapalli Sector',
        qualification: 'MBBS, DCH (Pediatrics)',
        documents: ['State Medical Council Verified', 'NMC Good Standing', 'ID Proof'],
        appliedDate: '27 Aug 2026',
        status: 'Pending Review'
      },
      {
        id: 'DOC-APP-893',
        name: 'Dr. Farhan Akhtar',
        phone: '9949887766',
        email: 'dr.farhan@ruralhealth.org',
        specialization: 'Pulmonology & Respiratory Medicine',
        mciNumber: 'MCI-MH-2017-77218',
        experience: '8 Years',
        affiliatedHospital: 'Vijayawada District Hospital',
        location: 'Vijayawada Rural',
        qualification: 'MBBS, MD (Pulmonology)',
        documents: ['Medical License Copy', 'Specialist Board Certification'],
        appliedDate: '27 Aug 2026',
        status: 'Pending Review'
      },
      {
        id: 'DOC-APP-894',
        name: 'Dr. Deepa Nair',
        phone: '9440998811',
        email: 'dr.deepa@telecare.org',
        specialization: 'Dermatology & Infectious Diseases',
        mciNumber: 'MCI-KL-2019-33812',
        experience: '5 Years',
        affiliatedHospital: 'Mylavaram Area Hospital',
        location: 'Mylavaram Block',
        qualification: 'MBBS, MD (Dermatology)',
        documents: ['State Medical License', 'Clinical Experience Certificate'],
        appliedDate: '28 Aug 2026',
        status: 'Pending Review'
      }
    ],

    // Field Worker Assignment Matrix
    workerAssignments: [
      {
        id: 'WA-01',
        workerId: 'USR-WRK-201',
        workerName: 'B. Saraswati (ASHA)',
        phone: '3333333333',
        district: 'Krishna District',
        block: 'Kondapalli Block',
        village: 'Kondapalli Gramam (Ward 4, 5, 6)',
        phc: 'Kondapalli PHC',
        householdsAssigned: 142,
        highRiskPatients: 14,
        status: 'Active Route'
      },
      {
        id: 'WA-02',
        workerId: 'USR-WRK-202',
        workerName: 'K. Nageswara Rao (ANM)',
        phone: '9440123456',
        district: 'Krishna District',
        block: 'Ibrahimpatnam Block',
        village: 'Guntupalli & Koturu Villages',
        phc: 'Ibrahimpatnam CHC',
        householdsAssigned: 210,
        highRiskPatients: 26,
        status: 'Active Route'
      },
      {
        id: 'WA-03',
        workerId: 'USR-WRK-203',
        workerName: 'M. Lakshmi Devi (ASHA)',
        phone: '9849223344',
        district: 'Krishna District',
        block: 'Mylavaram Block',
        village: 'Chandrala & Velvadam Villages',
        phc: 'Mylavaram Area Hospital',
        householdsAssigned: 165,
        highRiskPatients: 18,
        status: 'Active Route'
      },
      {
        id: 'WA-04',
        workerId: 'USR-WRK-204',
        workerName: 'R. Anjaneyulu (Field Health Worker)',
        phone: '9490334455',
        district: 'Krishna District',
        block: 'Jaggaiahpeta Block',
        village: 'Vedadri & Torraguntapalem',
        phc: 'Jaggaiahpeta CHC',
        householdsAssigned: 188,
        highRiskPatients: 21,
        status: 'Pending Reassignment'
      }
    ],

    // Disease Surveillance & Real-Time Outbreak Heatmap
    diseaseSurveillance: {
      totalCasesMonth: 1248,
      activeOutbreaks: 2,
      spikesDetected: 3,
      regions: [
        {
          name: 'Kondapalli Sector (Zone A)',
          district: 'Krishna',
          activeCases: 384,
          primaryDisease: 'Dengue & Acute Viral Fever',
          riskLevel: 'Critical',
          trend: '+38% spike',
          status: 'Active Outbreak Alert',
          breakdown: { dengue: 112, fever: 198, malaria: 42, respiratory: 32 }
        },
        {
          name: 'Ibrahimpatnam Block (Zone B)',
          district: 'Krishna',
          activeCases: 295,
          primaryDisease: 'Acute Respiratory Infection (ARI)',
          riskLevel: 'Moderate',
          trend: '+6% baseline',
          status: 'Under Surveillance',
          breakdown: { dengue: 24, fever: 140, malaria: 18, respiratory: 113 }
        },
        {
          name: 'Vijayawada Rural (Zone C)',
          district: 'Krishna',
          activeCases: 312,
          primaryDisease: 'Gastroenteritis & Waterborne',
          riskLevel: 'High',
          trend: '+19% spike',
          status: 'Watchlist Active',
          breakdown: { dengue: 35, fever: 165, malaria: 28, respiratory: 84 }
        },
        {
          name: 'Mylavaram Sector (Zone D)',
          district: 'Krishna',
          activeCases: 162,
          primaryDisease: 'Seasonal Viral Fever',
          riskLevel: 'Low',
          trend: '-8% declining',
          status: 'Controlled Baseline',
          breakdown: { dengue: 12, fever: 98, malaria: 14, respiratory: 38 }
        },
        {
          name: 'Jaggaiahpeta Block (Zone E)',
          district: 'Krishna',
          activeCases: 95,
          primaryDisease: 'Malaria & Vector-Borne',
          riskLevel: 'Low',
          trend: 'Stable',
          status: 'Normal Control',
          breakdown: { dengue: 8, fever: 52, malaria: 22, respiratory: 13 }
        }
      ]
    },

    // Drug Supply & Inventory across Rural Distribution Centers
    inventory: [
      {
        id: 'MED-01',
        name: 'Paracetamol 500mg Tablets',
        category: 'Analgesics & Antipyretic',
        available: 4850,
        minimum: 1500,
        center: 'Kondapalli PHC Central Store',
        expiry: 'Mar 2028',
        lastRestocked: '22 Aug 2026',
        status: 'In Stock',
        statusType: 'good'
      },
      {
        id: 'MED-02',
        name: 'Iron & Folic Acid (IFA) Tablets',
        category: 'Maternal ANC Nutrition',
        available: 6420,
        minimum: 2000,
        center: 'Kondapalli Sub-Centre Depot',
        expiry: 'Dec 2027',
        lastRestocked: '24 Aug 2026',
        status: 'In Stock',
        statusType: 'good'
      },
      {
        id: 'MED-03',
        name: 'Oral Rehydration Salts (ORS Sachets)',
        category: 'Emergency Dehydration Kit',
        available: 340,
        minimum: 1200,
        center: 'Rural Distribution Hub 3 (Kondapalli)',
        expiry: 'Jul 2028',
        lastRestocked: '10 Aug 2026',
        status: 'Critical Shortage',
        statusType: 'bad'
      },
      {
        id: 'MED-04',
        name: 'Insulin (Human 40 IU/ml Vials)',
        category: 'Endocrine & Diabetes Care',
        available: 18,
        minimum: 60,
        center: 'Ibrahimpatnam CHC Cold-Chain Hub',
        expiry: 'Nov 2026',
        lastRestocked: '02 Aug 2026',
        status: 'Critical Shortage',
        statusType: 'bad'
      },
      {
        id: 'MED-05',
        name: 'Amoxicillin 500mg Capsules',
        category: 'Essential Antibiotics',
        available: 480,
        minimum: 800,
        center: 'Ibrahimpatnam CHC Central Store',
        expiry: 'May 2027',
        lastRestocked: '18 Aug 2026',
        status: 'Low Stock',
        statusType: 'warn'
      },
      {
        id: 'MED-06',
        name: 'Oxytocin Injection (5 IU/ml)',
        category: 'Maternal Emergency Delivery',
        available: 110,
        minimum: 50,
        center: 'Vijayawada District Hospital Depot',
        expiry: 'Jan 2028',
        lastRestocked: '25 Aug 2026',
        status: 'In Stock',
        statusType: 'good'
      },
      {
        id: 'MED-07',
        name: 'Anti-Snake Venom (Polyvalent Serum)',
        category: 'Emergency Antivenom Kits',
        available: 24,
        minimum: 30,
        center: 'Vijayawada District Trauma Depot',
        expiry: 'Oct 2027',
        lastRestocked: '15 Aug 2026',
        status: 'Low Stock',
        statusType: 'warn'
      },
      {
        id: 'MED-08',
        name: 'Anti-TB Kit (Category I DOTS)',
        category: 'National TB Elimination',
        available: 310,
        minimum: 100,
        center: 'Vijayawada District TB Centre',
        expiry: 'Sep 2028',
        lastRestocked: '20 Aug 2026',
        status: 'In Stock',
        statusType: 'good'
      }
    ],

    // Rural Distribution Centers
    distributionCenters: [
      {
        name: 'Kondapalli PHC Central Depot',
        location: 'Kondapalli Sector (Krishna)',
        totalMeds: 84,
        criticalItems: 1,
        lastUpdate: '28 Aug 2026, 09:30 AM',
        connectivity: 'Online 4G'
      },
      {
        name: 'Ibrahimpatnam CHC Regional Store',
        location: 'Ibrahimpatnam Highway Block',
        totalMeds: 118,
        criticalItems: 2,
        lastUpdate: '28 Aug 2026, 08:45 AM',
        connectivity: 'Online 4G'
      },
      {
        name: 'Rural Sub-Centre Depot 3 (Kondapalli)',
        location: 'Kondapalli Village Ward 6',
        totalMeds: 38,
        criticalItems: 2,
        lastUpdate: '27 Aug 2026, 05:20 PM',
        connectivity: '2G Low Bandwidth'
      },
      {
        name: 'Vijayawada Central Medical Depot',
        location: 'District HQ Campus',
        totalMeds: 240,
        criticalItems: 0,
        lastUpdate: '28 Aug 2026, 10:00 AM',
        connectivity: 'Fiber Optic Sync'
      }
    ],

    // Hospital Capacity & Live Bed Control Grid
    hospitalGrid: [
      {
        id: 'HOSP-01',
        name: 'Vijayawada District Hospital (Tertiary Command)',
        location: 'Vijayawada District HQ (26 km)',
        tier: 'Tier 4 · District Hospital',
        totalBeds: 450,
        availableBeds: 92,
        occupiedBeds: 358,
        occupancyRate: 80,
        icuBeds: 48,
        availableIcu: 8,
        oxygenBeds: 160,
        availableOxygen: 34,
        emergencyStatus: 'AVAILABLE',
        statusType: 'good',
        bloodBankReady: 'Full Stock (All Groups)'
      },
      {
        id: 'HOSP-02',
        name: 'Ibrahimpatnam Community Health Centre (CHC)',
        location: 'Ibrahimpatnam Block (11 km)',
        tier: 'Tier 3 · CHC 24/7 MO',
        totalBeds: 120,
        availableBeds: 18,
        occupiedBeds: 102,
        occupancyRate: 85,
        icuBeds: 8,
        availableIcu: 1,
        oxygenBeds: 40,
        availableOxygen: 5,
        emergencyStatus: 'LIMITED',
        statusType: 'warn',
        bloodBankReady: 'O+ and B+ Available'
      },
      {
        id: 'HOSP-03',
        name: 'Kondapalli Primary Health Centre (PHC)',
        location: 'Kondapalli Village (3.2 km)',
        tier: 'Tier 2 · PHC Maternal Hub',
        totalBeds: 40,
        availableBeds: 14,
        occupiedBeds: 26,
        occupancyRate: 65,
        icuBeds: 2,
        availableIcu: 2,
        oxygenBeds: 12,
        availableOxygen: 6,
        emergencyStatus: 'AVAILABLE',
        statusType: 'good',
        bloodBankReady: 'Emergency RDT & Plasma Pack'
      },
      {
        id: 'HOSP-04',
        name: 'Mylavaram Area Hospital',
        location: 'Mylavaram Block (19 km)',
        tier: 'Tier 3 · Sub-District Hospital',
        totalBeds: 110,
        availableBeds: 60,
        occupiedBeds: 50,
        occupancyRate: 45,
        icuBeds: 6,
        availableIcu: 4,
        oxygenBeds: 30,
        availableOxygen: 16,
        emergencyStatus: 'AVAILABLE',
        statusType: 'good',
        bloodBankReady: 'A+, B+, O+ Available'
      }
    ],

    // Blood Bank Monitoring Grid (8 Blood Groups)
    bloodBank: [
      { group: 'A+', units: 44, minimum: 25, status: 'Adequate Stock', statusType: 'good', hospital: 'Vijayawada District Blood Centre' },
      { group: 'A-', units: 12, minimum: 10, status: 'Adequate Stock', statusType: 'good', hospital: 'Vijayawada District Blood Centre' },
      { group: 'B+', units: 58, minimum: 25, status: 'Adequate Stock', statusType: 'good', hospital: 'Vijayawada District Blood Centre' },
      { group: 'B-', units: 9, minimum: 10, status: 'Low Stock', statusType: 'warn', hospital: 'Ibrahimpatnam CHC Blood Hub' },
      { group: 'AB+', units: 28, minimum: 15, status: 'Adequate Stock', statusType: 'good', hospital: 'Vijayawada District Blood Centre' },
      { group: 'AB-', units: 4, minimum: 8, status: 'Critical Shortage', statusType: 'bad', hospital: 'Vijayawada District Blood Centre' },
      { group: 'O+', units: 82, minimum: 35, status: 'Optimal Stock', statusType: 'good', hospital: 'Vijayawada & Ibrahimpatnam' },
      { group: 'O-', units: 2, minimum: 10, status: 'Critical Shortage', statusType: 'bad', hospital: 'Vijayawada District Blood Centre' }
    ],

    // Consultation & Service Analytics Metrics
    analytics: {
      totalConsultations: 12480,
      resolvedConsultations: 11920,
      pendingConsultations: 560,
      cancelledConsultations: 80,
      avgWaitTimeMinutes: 14,
      avgConsultDurationMinutes: 11.5,
      doctorUtilizationRate: 88,
      teleConsultShare: '42%',
      patientSatisfactionScore: '4.7 / 5.0',
      dailyTrends: [
        { day: 'Mon', count: 420, waitMin: 15 },
        { day: 'Tue', count: 480, waitMin: 13 },
        { day: 'Wed', count: 390, waitMin: 12 },
        { day: 'Thu', count: 530, waitMin: 16 },
        { day: 'Fri', count: 490, waitMin: 14 },
        { day: 'Sat', count: 560, waitMin: 18 },
        { day: 'Sun', count: 280, waitMin: 10 }
      ]
    }
  };

  // -------------------------------------------------------------
  // CONTROLLER & UI RENDERERS
  // -------------------------------------------------------------

  class AdminController {
    constructor() {
      this.data = adminData;
      this.state = adminState;
    }

    init() {
      this.renderCommandCenter();
      if (global.firebaseService && typeof global.firebaseService.subscribeStaffMembers === 'function') {
        global.firebaseService.subscribeStaffMembers(cloudList => {
          if (Array.isArray(cloudList) && cloudList.length > 0) {
            cloudList.forEach(cloudUser => {
              const idx = this.data.users.findIndex(u => u.id === cloudUser.id);
              if (idx >= 0) this.data.users[idx] = cloudUser;
              else this.data.users.unshift(cloudUser);
            });
            if (this.state.currentTab === 'staff') {
              this.renderStaffManagement();
            }
          }
        });
      }
    }

    switchTab(tabId) {
      this.state.currentTab = tabId;
      document.querySelectorAll('.admin-nav-tab').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabId);
      });

      document.querySelectorAll('.admin-tab-pane').forEach(pane => {
        pane.classList.toggle('active', pane.id === `admin-pane-${tabId}`);
      });

      // Render tab content on switch
      if (tabId === 'overview') this.renderOverview();
      else if (tabId === 'staff') this.renderStaffManagement();
      else if (tabId === 'approvals') this.renderDoctorApprovals();
      else if (tabId === 'workers') this.renderWorkerAssignments();
      else if (tabId === 'disease') this.renderDiseaseSurveillance();
      else if (tabId === 'inventory') this.renderInventory();
      else if (tabId === 'analytics') this.renderAnalytics();
      else if (tabId === 'hospitals') this.renderHospitalGrid();
      else if (tabId === 'blood') this.renderBloodBank();
    }

    // -------------------------------------------------------------
    // TAB 1: EXECUTIVE COMMAND CENTER OVERVIEW
    // -------------------------------------------------------------
    renderOverview() {
      const container = document.getElementById('admin-pane-overview');
      if (!container) return;

      const s = this.data.stats;
      const alerts = this.data.alerts;

      container.innerHTML = `
        <!-- Top Executive KPI Counters -->
        <div class="admin-kpi-grid">
          <div class="admin-kpi-card" onclick="adminController.switchTab('staff')">
            <span class="kpi-icon">🌾</span>
            <div>
              <div class="kpi-label">Total Registered Citizens</div>
              <div class="kpi-val">${s.totalPatients}</div>
              <div class="kpi-delta good">↑ +8.4% this month</div>
            </div>
          </div>

          <div class="admin-kpi-card" onclick="adminController.switchTab('staff')">
            <span class="kpi-icon">🩺</span>
            <div>
              <div class="kpi-label">Active Doctors &amp; Clinicians</div>
              <div class="kpi-val">${s.totalDoctors}</div>
              <div class="kpi-delta good">88% Live Utilization</div>
            </div>
          </div>

          <div class="admin-kpi-card" onclick="adminController.switchTab('workers')">
            <span class="kpi-icon">🤝</span>
            <div>
              <div class="kpi-label">ASHA &amp; Field Staff Roster</div>
              <div class="kpi-val">${s.totalWorkers}</div>
              <div class="kpi-delta good">98% Village Route Active</div>
            </div>
          </div>

          <div class="admin-kpi-card" onclick="adminController.switchTab('approvals')" style="border-color:rgba(245,158,11,0.35);">
            <span class="kpi-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;">⏳</span>
            <div>
              <div class="kpi-label">Pending Doctor Approvals</div>
              <div class="kpi-val" style="color:#f59e0b;">${this.data.pendingDoctors.filter(d=>d.status==='Pending Review').length}</div>
              <div class="kpi-delta warn">Requires System Review</div>
            </div>
          </div>
        </div>

        <!-- Monitoring Health Counters -->
        <div class="admin-kpi-grid" style="grid-template-columns: repeat(4, 1fr); margin-top:14px;">
          <div class="admin-kpi-card" onclick="adminController.switchTab('disease')">
            <span class="kpi-icon" style="background:rgba(239,68,68,0.15);color:#ef4444;">🚨</span>
            <div>
              <div class="kpi-label">Active Disease Spikes</div>
              <div class="kpi-val" style="color:#ef4444;">${s.activeDiseaseAlerts} Alerts</div>
              <div class="kpi-delta bad">Dengue in Zone A</div>
            </div>
          </div>

          <div class="admin-kpi-card" onclick="adminController.switchTab('inventory')">
            <span class="kpi-icon" style="background:rgba(239,68,68,0.15);color:#ef4444;">💊</span>
            <div>
              <div class="kpi-label">Critical Drug Shortages</div>
              <div class="kpi-val" style="color:#f87171;">${s.criticalMedicineShortages} Hubs</div>
              <div class="kpi-delta bad">ORS &amp; Insulin below 15%</div>
            </div>
          </div>

          <div class="admin-kpi-card" onclick="adminController.switchTab('hospitals')">
            <span class="kpi-icon" style="background:rgba(16,185,129,0.15);color:#10b981;">🏥</span>
            <div>
              <div class="kpi-label">Available Hospital Beds</div>
              <div class="kpi-val">${s.availableHospitalBeds} / ${s.totalHospitalBeds}</div>
              <div class="kpi-delta good">25.5% Vacant Grid</div>
            </div>
          </div>

          <div class="admin-kpi-card" onclick="adminController.switchTab('analytics')">
            <span class="kpi-icon" style="background:rgba(6,182,212,0.15);color:#06b6d4;">⏱️</span>
            <div>
              <div class="kpi-label">Avg. Consultation Wait</div>
              <div class="kpi-val">${s.avgWaitTimeMinutes} min</div>
              <div class="kpi-delta good">↓ 4 min faster vs avg</div>
            </div>
          </div>
        </div>

        <!-- Real-Time Command Alerts Feed -->
        <div style="margin-top:24px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h4 style="font-size:16px;color:#ffffff;display:flex;align-items:center;gap:8px;">
              <span>🚨 Live Network Alerts &amp; Outbreak Warnings</span>
            </h4>
            <span style="font-size:11.5px;color:var(--muted);">Automated Surveillance Feed</span>
          </div>

          <div class="admin-alert-list">
            ${alerts.map(a => `
              <div class="admin-alert-item ${a.type}">
                <div class="admin-alert-head">
                  <span class="admin-alert-tag ${a.type}">${a.category}</span>
                  <span style="font-size:11px;color:var(--muted);">${a.timestamp}</span>
                </div>
                <strong class="admin-alert-title">${a.title}</strong>
                <p class="admin-alert-detail">📍 <strong>${a.location}</strong> — ${a.detail}</p>
                <div style="margin-top:8px;">
                  <button class="btn-glass sm" onclick="adminController.handleAlertAction('${a.id}')">
                    <span>${a.actionLabel} →</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Quick Summary Mini-Widgets (Hospital & Disease Grid Preview) -->
        <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:18px;margin-top:24px;">
          <div class="glass-panel" style="padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <h4 style="font-size:15px;color:#ffffff;">🏥 District Hospital Capacity Board</h4>
              <button class="btn-glass sm" onclick="adminController.switchTab('hospitals')">Full Bed Grid →</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px;">
              ${this.data.hospitalGrid.slice(0, 3).map(h => `
                <div style="padding:12px;background:rgba(4,18,15,0.5);border:1px solid var(--auth-border);border-radius:12px;display:flex;justify-content:space-between;align-items:center;">
                  <div>
                    <strong style="font-size:13.5px;color:#ffffff;display:block;">${h.name.split('(')[0]}</strong>
                    <small style="font-size:11.5px;color:var(--muted);">General: ${h.availableBeds} free · ICU: ${h.availableIcu} free · O₂: ${h.availableOxygen} free</small>
                  </div>
                  <span class="admin-status-badge ${h.statusType}">${h.emergencyStatus}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="glass-panel" style="padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <h4 style="font-size:15px;color:#ffffff;">🩸 Blood Bank Inventory Status</h4>
              <button class="btn-glass sm" onclick="adminController.switchTab('blood')">All Blood Units →</button>
            </div>
            <div class="admin-blood-mini-grid">
              ${this.data.bloodBank.map(b => `
                <div class="admin-blood-tile ${b.statusType}">
                  <span class="blood-group">${b.group}</span>
                  <strong class="blood-units">${b.units} U</strong>
                  <span class="blood-status-text">${b.status.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }

    handleAlertAction(alertId) {
      if (alertId === 'alt-01') this.switchTab('disease');
      else if (alertId === 'alt-02') this.switchTab('hospitals');
      else if (alertId === 'alt-03') this.switchTab('inventory');
      else if (alertId === 'alt-04') this.switchTab('blood');
    }

    // -------------------------------------------------------------
    // TAB 2: USER & STAFF MANAGEMENT
    // -------------------------------------------------------------
    renderStaffManagement() {
      const container = document.getElementById('admin-pane-staff');
      if (!container) return;

      const filter = this.state.staffFilter;
      const search = this.state.staffSearch.toLowerCase();

      let filteredUsers = this.data.users.filter(u => {
        const matchesRole = filter === 'all' || u.role === filter;
        const matchesSearch = !search || 
          u.name.toLowerCase().includes(search) || 
          u.id.toLowerCase().includes(search) || 
          u.phone.includes(search) || 
          (u.facility && u.facility.toLowerCase().includes(search));
        return matchesRole && matchesSearch;
      });

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">👥 Healthcare Staff &amp; User Registry</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Manage credentialed doctors, frontline ASHA workers, registered citizens, and system leaders.
            </p>
          <div style="display:flex;gap:10px;align-items:center;">
            <button class="btn-glass sm" onclick="adminController.exportStaffToCSV()" style="font-size:12.5px;padding:8px 14px;">
              <span>📥 Export CSV Table</span>
            </button>
            <button class="auth-btn-primary" onclick="adminController.openAddStaffModal()" style="font-size:13px;padding:8px 16px;">
              <span>+ Add Healthcare Staff</span>
            </button>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="admin-toolbar">
          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${filter === 'all' ? 'active' : ''}" onclick="adminController.setStaffFilter('all')">All Users (${this.data.users.length})</button>
            <button class="admin-filter-btn ${filter === 'doctor' ? 'active' : ''}" onclick="adminController.setStaffFilter('doctor')">🩺 Doctors (${this.data.users.filter(u=>u.role==='doctor').length})</button>
            <button class="admin-filter-btn ${filter === 'worker' ? 'active' : ''}" onclick="adminController.setStaffFilter('worker')">🤝 Field Workers (${this.data.users.filter(u=>u.role==='worker').length})</button>
            <button class="admin-filter-btn ${filter === 'patient' ? 'active' : ''}" onclick="adminController.setStaffFilter('patient')">🌾 Patients (${this.data.users.filter(u=>u.role==='patient').length})</button>
            <button class="admin-filter-btn ${filter === 'admin' ? 'active' : ''}" onclick="adminController.setStaffFilter('admin')">👑 Administrators (${this.data.users.filter(u=>u.role==='admin').length})</button>
          </div>

          <div class="admin-search-wrap">
            <input type="text" class="auth-input" placeholder="🔍 Search name, ID, phone, or facility..." 
                   value="${this.state.staffSearch}" oninput="adminController.setStaffSearch(this.value)">
          </div>
        </div>

        <!-- Users Table -->
        <div class="glass-panel" style="padding:0;overflow:hidden;margin-top:16px;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>User Details</th>
                <th>Role</th>
                <th>Facility / Ward</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Registered</th>
                <th style="text-align:right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUsers.map(u => `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:10px;">
                      <div class="auth-user-avatar" style="width:34px;height:34px;font-size:12px;">${u.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                      <div>
                        <strong style="color:#ffffff;font-size:13.5px;">${u.name}</strong>
                        <small style="display:block;color:var(--muted);font-family:'IBM Plex Mono',monospace;font-size:10.5px;">${u.id}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="auth-role-badge badge-${u.role}">${u.role.toUpperCase()}</span>
                  </td>
                  <td style="font-size:12.5px;">
                    <strong>${u.facility || u.location}</strong>
                    <small style="display:block;color:var(--muted);">${u.specialization || u.designation || u.location}</small>
                  </td>
                  <td style="font-size:12px;font-family:'IBM Plex Mono',monospace;">
                    +91 ${u.phone}
                    <small style="display:block;color:var(--muted);font-family:inherit;">${u.email || ''}</small>
                  </td>
                  <td>
                    <span class="admin-status-badge ${u.status === 'Active' ? 'good' : 'warn'}">
                      ● ${u.status}
                    </span>
                  </td>
                  <td style="font-size:12px;color:var(--muted);">${u.regDate}</td>
                  <td style="text-align:right;">
                    <div style="display:inline-flex;gap:6px;">
                      <button class="btn-glass sm" onclick="adminController.viewUserDetails('${u.id}')">View</button>
                      <button class="btn-glass sm" style="color:${u.status === 'Active' ? '#fca5a5' : '#86efac'};" 
                              onclick="adminController.toggleUserStatus('${u.id}')">
                        ${u.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
              ${filteredUsers.length === 0 ? `
                <tr>
                  <td colspan="7" style="text-align:center;padding:32px;color:var(--muted);">
                    No matching users found for "${this.state.staffSearch}".
                  </td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      `;
    }

    setStaffFilter(filter) {
      this.state.staffFilter = filter;
      this.renderStaffManagement();
    }

    setStaffSearch(query) {
      this.state.staffSearch = query;
      this.renderStaffManagement();
    }

    toggleUserStatus(userId) {
      const user = this.data.users.find(u => u.id === userId);
      if (!user) return;

      const newStatus = user.status === 'Active' ? 'Suspended' : 'Active';
      const confirmAction = confirm(`Are you sure you want to ${newStatus === 'Suspended' ? 'suspend/deactivate' : 'reactivate'} ${user.name}?`);
      
      if (confirmAction) {
        user.status = newStatus;
        if (typeof window.toast === 'function') {
          window.toast(`User ${user.name} has been ${newStatus.toLowerCase()}d.`);
        }
        this.renderStaffManagement();
      }
    }

    viewUserDetails(userId) {
      const u = this.data.users.find(usr => usr.id === userId);
      if (!u) return;

      alert(`📋 Healthcare User Profile:\n\nName: ${u.name}\nUser ID: ${u.id}\nRole: ${u.role.toUpperCase()}\nStatus: ${u.status}\nPhone: +91 ${u.phone}\nEmail: ${u.email}\nFacility: ${u.facility || u.location}\nSpecialization / Role: ${u.specialization || u.designation || 'N/A'}\nRegistration Date: ${u.regDate}`);
    }

    async openAddStaffModal() {
      const name = prompt('Enter Full Name of Healthcare Professional:');
      if (!name) return;
      const role = prompt('Enter Role (doctor / worker / admin / nurse):', 'doctor');
      if (!role) return;
      const phone = prompt('Enter 10-digit Mobile Number:', '9800000000');
      if (!phone) return;

      const newUser = {
        id: `USR-${role.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim(),
        role: role.toLowerCase(),
        phone: phone.trim(),
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@swasthyasetu.gov.in`,
        facility: 'Kondapalli Community Grid',
        location: 'Krishna District',
        status: 'Active',
        regDate: 'Today',
        verified: true
      };

      this.data.users.unshift(newUser);

      // Save directly to Firebase Realtime Database & Cloud Firestore
      if (global.firebaseService && typeof global.firebaseService.saveStaffMember === 'function') {
        await global.firebaseService.saveStaffMember(newUser);
      }

      if (typeof window.toast === 'function') {
        window.toast(`✓ Added ${name} (${role.toUpperCase()}) & synced to Firebase!`);
      }
      this.renderStaffManagement();
    }

    exportStaffToCSV() {
      const headers = ['User ID', 'Full Name', 'Role', 'Facility / Location', 'Contact Number', 'Email', 'Status', 'Registered Date'];
      const rows = this.data.users.map(u => [
        `"${u.id || ''}"`,
        `"${u.name || ''}"`,
        `"${(u.role || '').toUpperCase()}"`,
        `"${u.facility || u.location || ''}"`,
        `"+91 ${u.phone || ''}"`,
        `"${u.email || ''}"`,
        `"${u.status || 'Active'}"`,
        `"${u.regDate || ''}"`
      ]);

      const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `Swasthya_Setu_Staff_Roster_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      if (typeof window.toast === 'function') {
        window.toast('📥 Downloaded Staff Roster CSV Table Spreadsheet!');
      }
    }

    // -------------------------------------------------------------
    // TAB 3: DOCTOR REGISTRATION APPROVAL WORKFLOW
    // -------------------------------------------------------------
    renderDoctorApprovals() {
      const container = document.getElementById('admin-pane-approvals');
      if (!container) return;

      const pending = this.data.pendingDoctors;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🩺 Doctor Credential Approvals</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Review Medical Council Registration (MCI/NMC), license certificates, and verify clinician credentials before platform activation.
            </p>
          </div>
          <span class="admin-status-badge warn" style="font-size:12px;">
            ${pending.filter(d=>d.status==='Pending Review').length} Pending Verifications
          </span>
        </div>

        <div class="admin-approval-grid">
          ${pending.map(d => `
            <div class="glass-panel admin-approval-card ${d.status === 'Approved' ? 'approved' : ''}">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <h4 style="font-size:16px;color:#ffffff;margin:0 0 4px;">${d.name}</h4>
                  <span style="font-size:12px;color:var(--auth-primary-bright);font-weight:700;">${d.specialization}</span>
                </div>
                <span class="admin-status-badge ${d.status === 'Approved' ? 'good' : (d.status === 'Rejected' ? 'bad' : 'warn')}">
                  ${d.status}
                </span>
              </div>

              <div class="approval-meta-grid">
                <div>
                  <small>Medical Council License No.</small>
                  <strong style="font-family:'IBM Plex Mono',monospace;">${d.mciNumber}</strong>
                </div>
                <div>
                  <small>Qualification &amp; Experience</small>
                  <strong>${d.qualification} (${d.experience})</strong>
                </div>
                <div>
                  <small>Affiliated Hospital</small>
                  <strong>${d.affiliatedHospital}</strong>
                </div>
                <div>
                  <small>Contact &amp; Applied Date</small>
                  <strong>+91 ${d.phone} · ${d.appliedDate}</strong>
                </div>
              </div>

              <div style="margin:12px 0 8px;padding:8px 12px;background:rgba(4,18,15,0.4);border-radius:10px;">
                <span style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.04em;">Uploaded Verification Documents:</span>
                <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">
                  ${d.documents.map(doc => `
                    <span class="tag info" style="font-size:10.5px;cursor:pointer;" onclick="alert('Viewing document: ${doc} for ${d.name} (Verified Digital Stamp ✓)')">📄 ${doc}</span>
                  `).join('')}
                </div>
              </div>

              ${d.status === 'Pending Review' ? `
                <div class="approval-actions-row">
                  <button class="btn-glass sm" onclick="adminController.viewDoctorCredentials('${d.id}')">
                    <span>🔍 View Credentials</span>
                  </button>
                  <button class="auth-btn-primary" style="padding:6px 16px;font-size:12px;" onclick="adminController.approveDoctor('${d.id}')">
                    <span>✓ Approve &amp; Activate</span>
                  </button>
                  <button class="btn-glass sm" style="color:#f87171;border-color:rgba(239,68,68,0.3);" onclick="adminController.rejectDoctor('${d.id}')">
                    <span>✕ Reject</span>
                  </button>
                </div>
              ` : `
                <div style="margin-top:12px;font-size:12px;color:var(--muted);">
                  Status: <strong>${d.status} by Administrator Rajesh Sharma</strong> on ${d.appliedDate}.
                </div>
              `}
            </div>
          `).join('')}
        </div>
      `;
    }

    viewDoctorCredentials(docId) {
      const doc = this.data.pendingDoctors.find(d => d.id === docId);
      if (!doc) return;

      alert(`🩺 Medical Credential Dossier:\n\nDoctor: ${doc.name}\nSpecialization: ${doc.specialization}\nMedical Council Reg: ${doc.mciNumber}\nDegree: ${doc.qualification}\nExperience: ${doc.experience}\nHospital: ${doc.affiliatedHospital}\nPhone: +91 ${doc.phone}\nDocuments: ${doc.documents.join(', ')}\n\nStatus: ${doc.status}`);
    }

    approveDoctor(docId) {
      const doc = this.data.pendingDoctors.find(d => d.id === docId);
      if (!doc) return;

      const confirmApprove = confirm(`Approve and grant platform clinical practice access to ${doc.name}?`);
      if (!confirmApprove) return;

      doc.status = 'Approved';

      // Add to active users roster
      this.data.users.push({
        id: `USR-DOC-${Math.floor(100 + Math.random() * 900)}`,
        name: doc.name,
        role: 'doctor',
        phone: doc.phone,
        email: doc.email,
        specialization: doc.specialization,
        facility: doc.affiliatedHospital,
        location: doc.location,
        status: 'Active',
        regDate: 'Today (Approved)',
        verified: true,
        consultsCompleted: 0,
        rating: 5.0
      });

      if (typeof window.toast === 'function') {
        window.toast(`✓ Doctor ${doc.name} approved and activated onto Swasthya Setu network!`);
      }

      this.renderDoctorApprovals();
    }

    rejectDoctor(docId) {
      const doc = this.data.pendingDoctors.find(d => d.id === docId);
      if (!doc) return;

      const reason = prompt(`Enter rejection reason for ${doc.name}:`, 'Medical registration number verification failed.');
      if (!reason) return;

      doc.status = 'Rejected';
      if (typeof window.toast === 'function') {
        window.toast(`Doctor registration for ${doc.name} rejected: ${reason}`);
      }

      this.renderDoctorApprovals();
    }

    // -------------------------------------------------------------
    // TAB 4: FIELD WORKER (ASHA/ANM) ASSIGNMENT
    // -------------------------------------------------------------
    renderWorkerAssignments() {
      const container = document.getElementById('admin-pane-workers');
      if (!container) return;

      const assignments = this.data.workerAssignments;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🗺️ Field Worker Geographic Allocation &amp; Routing</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Assign ASHA/ANM workers to specific rural blocks, villages, wards, and Primary Health Centres (PHCs).
            </p>
          </div>
        </div>

        <div class="glass-panel" style="padding:0;overflow:hidden;margin-top:16px;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Field Worker</th>
                <th>District &amp; Block</th>
                <th>Assigned Village / Route</th>
                <th>Supervising PHC</th>
                <th>Households</th>
                <th>High-Risk ANC/TB</th>
                <th>Status</th>
                <th style="text-align:right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${assignments.map(a => `
                <tr>
                  <td>
                    <strong style="color:#ffffff;font-size:13.5px;display:block;">${a.workerName}</strong>
                    <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">+91 ${a.phone}</small>
                  </td>
                  <td>
                    <strong>${a.block}</strong>
                    <small style="display:block;color:var(--muted);">${a.district}</small>
                  </td>
                  <td style="font-size:13px;color:var(--auth-primary-bright);font-weight:600;">
                    📍 ${a.village}
                  </td>
                  <td style="font-size:12.5px;">${a.phc}</td>
                  <td style="font-size:13px;font-weight:700;">${a.householdsAssigned} Homes</td>
                  <td style="font-size:13px;color:#f59e0b;font-weight:700;">${a.highRiskPatients} Cases</td>
                  <td>
                    <span class="admin-status-badge ${a.status.includes('Active') ? 'good' : 'warn'}">
                      ● ${a.status}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn-glass sm" onclick="adminController.openReassignModal('${a.id}')">
                      <span>✏️ Reassign Route</span>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    openReassignModal(assignmentId) {
      const a = this.data.workerAssignments.find(item => item.id === assignmentId);
      if (!a) return;

      const newVillage = prompt(`Reassign Village/Ward for ${a.workerName}:`, a.village);
      if (!newVillage) return;

      const newPhc = prompt(`Supervising PHC:`, a.phc);
      if (!newPhc) return;

      a.village = newVillage.trim();
      a.phc = newPhc.trim();
      a.status = 'Active Route';

      if (typeof window.toast === 'function') {
        window.toast(`✓ Route updated: ${a.workerName} assigned to ${a.village} (${a.phc}).`);
      }

      this.renderWorkerAssignments();
    }

    // -------------------------------------------------------------
    // TAB 5: DISEASE SURVEILLANCE & OUTBREAK HEATMAP
    // -------------------------------------------------------------
    renderDiseaseSurveillance() {
      const container = document.getElementById('admin-pane-disease');
      if (!container) return;

      const surv = this.data.diseaseSurveillance;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🦠 Disease Surveillance &amp; Outbreak Detection Grid</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Real-time anomaly detection, syndrome clustering, and geographical risk heatmaps.
            </p>
          </div>
          <button class="btn-glass btn-danger" onclick="adminController.broadcastEpidemicAlert()">
            <span>🚨 Broadcast Emergency Health Advisory</span>
          </button>
        </div>

        <!-- Surveillance Outbreak Heatmap Tiles -->
        <div style="margin-top:16px;">
          <h4 style="font-size:15px;color:#ffffff;margin-bottom:12px;">🗺️ Regional Risk &amp; Outbreak Heatmap</h4>
          <div class="admin-heatmap-grid">
            ${surv.regions.map(r => `
              <div class="admin-heatmap-card ${r.riskLevel.toLowerCase()}">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                  <strong style="font-size:15px;color:#ffffff;">${r.name}</strong>
                  <span class="admin-status-badge ${r.riskLevel === 'Critical' ? 'bad' : (r.riskLevel === 'High' ? 'warn' : 'good')}">
                    ${r.riskLevel.toUpperCase()} RISK
                  </span>
                </div>
                <div style="margin:10px 0;">
                  <span style="font-size:28px;font-weight:800;font-family:'Fraunces',serif;color:#ffffff;">${r.activeCases}</span>
                  <span style="font-size:12px;color:var(--muted);">active cases</span>
                  <div style="font-size:12px;color:${r.trend.includes('+') ? '#f87171' : '#4ade80'};font-weight:700;margin-top:2px;">
                    ${r.trend}
                  </div>
                </div>
                <div style="font-size:12px;color:var(--ink-dim);margin-bottom:10px;">
                  Primary Threat: <strong>${r.primaryDisease}</strong>
                </div>

                <!-- Syndrome Breakdown Bars -->
                <div class="syndrome-bar-wrap">
                  <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--muted);">
                    <span>Dengue: ${r.breakdown.dengue}</span>
                    <span>Fever: ${r.breakdown.fever}</span>
                    <span>Malaria: ${r.breakdown.malaria}</span>
                    <span>ARI: ${r.breakdown.respiratory}</span>
                  </div>
                </div>

                <div style="margin-top:12px;">
                  <button class="btn-glass sm" style="width:100%;justify-content:center;" onclick="alert('Surveillance drilldown for ${r.name}: Immediate containment protocols active.')">
                    <span>Inspect Zone Clusters →</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    broadcastEpidemicAlert() {
      const text = prompt('Enter Health Alert Advisory to push to all ASHA Didis & PHCs:', 'Urgent: High incidence of Dengue reported. Conduct door-to-door water check and distribute ORS kits.');
      if (!text) return;
      if (typeof window.toast === 'function') {
        window.toast(`🚨 Emergency advisory broadcasted to 385 Field Workers & 4 Hospitals.`);
      }
    }

    // -------------------------------------------------------------
    // TAB 6: INVENTORY & DRUG SUPPLY TRACKER
    // -------------------------------------------------------------
    renderInventory() {
      const container = document.getElementById('admin-pane-inventory');
      if (!container) return;

      const centerFilter = this.state.inventoryCenterFilter;
      const statusFilter = this.state.inventoryStatusFilter;
      const search = this.state.inventorySearch.toLowerCase();

      let items = this.data.inventory.filter(med => {
        const matchCenter = centerFilter === 'all' || med.center.includes(centerFilter);
        const matchStatus = statusFilter === 'all' || med.status === statusFilter;
        const matchSearch = !search || med.name.toLowerCase().includes(search) || med.category.toLowerCase().includes(search);
        return matchCenter && matchStatus && matchSearch;
      });

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">💊 Essential Drug Supply &amp; Rural Distribution Hubs</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Monitor stock levels, minimum safe thresholds, and supply chain logistics across rural health centres.
            </p>
          </div>
        </div>

        <!-- Inventory Filters -->
        <div class="admin-toolbar">
          <div class="admin-filter-tabs">
            <button class="admin-filter-btn ${statusFilter === 'all' ? 'active' : ''}" onclick="adminController.setInventoryStatusFilter('all')">All Items (${this.data.inventory.length})</button>
            <button class="admin-filter-btn ${statusFilter === 'Critical Shortage' ? 'active' : ''}" onclick="adminController.setInventoryStatusFilter('Critical Shortage')">🚨 Critical Shortage (2)</button>
            <button class="admin-filter-btn ${statusFilter === 'Low Stock' ? 'active' : ''}" onclick="adminController.setInventoryStatusFilter('Low Stock')">⚠️ Low Stock (2)</button>
            <button class="admin-filter-btn ${statusFilter === 'In Stock' ? 'active' : ''}" onclick="adminController.setInventoryStatusFilter('In Stock')">✓ In Stock (4)</button>
          </div>

          <div class="admin-search-wrap">
            <input type="text" class="auth-input" placeholder="🔍 Search medicine or category..." 
                   value="${this.state.inventorySearch}" oninput="adminController.setInventorySearch(this.value)">
          </div>
        </div>

        <!-- Inventory Table -->
        <div class="glass-panel" style="padding:0;overflow:hidden;margin-top:16px;">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Medicine / Essential Item</th>
                <th>Category</th>
                <th>Available Units</th>
                <th>Min. Threshold</th>
                <th>Distribution Centre</th>
                <th>Expiry</th>
                <th>Stock Status</th>
                <th style="text-align:right">Action</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(m => `
                <tr>
                  <td>
                    <strong style="color:#ffffff;font-size:13.5px;display:block;">${m.name}</strong>
                    <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">${m.id}</small>
                  </td>
                  <td style="font-size:12.5px;color:var(--muted);">${m.category}</td>
                  <td style="font-size:14px;font-weight:700;font-family:'IBM Plex Mono',monospace;color:${m.available < m.minimum ? '#f87171' : '#4ade80'};">
                    ${m.available.toLocaleString()}
                  </td>
                  <td style="font-size:13px;font-family:'IBM Plex Mono',monospace;color:var(--muted);">${m.minimum.toLocaleString()}</td>
                  <td style="font-size:12.5px;">${m.center}</td>
                  <td style="font-size:12px;color:var(--muted);">${m.expiry}</td>
                  <td>
                    <span class="admin-status-badge ${m.statusType}">
                      ${m.status}
                    </span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn-glass sm" onclick="adminController.reorderMedicine('${m.id}')">
                      <span>📦 Reorder Stock</span>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    setInventoryStatusFilter(status) {
      this.state.inventoryStatusFilter = status;
      this.renderInventory();
    }

    setInventorySearch(search) {
      this.state.inventorySearch = search;
      this.renderInventory();
    }

    reorderMedicine(medId) {
      const med = this.data.inventory.find(m => m.id === medId);
      if (!med) return;

      const qty = prompt(`Enter replenishment quantity for ${med.name}:`, '2000');
      if (!qty) return;

      med.available += parseInt(qty, 10);
      if (med.available >= med.minimum) {
        med.status = 'In Stock';
        med.statusType = 'good';
      }

      if (typeof window.toast === 'function') {
        window.toast(`✓ Emergency replenishment of ${qty} units ordered for ${med.name}!`);
      }

      this.renderInventory();
    }

    // -------------------------------------------------------------
    // TAB 7: CONSULTATION & SERVICE ANALYTICS
    // -------------------------------------------------------------
    renderAnalytics() {
      const container = document.getElementById('admin-pane-analytics');
      if (!container) return;

      const a = this.data.analytics;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">📈 Consultation &amp; Care Quality Analytics</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Telemedicine throughput, clinical resolution rate, patient queue velocity, and doctor efficiency.
            </p>
          </div>
        </div>

        <!-- Headline Metrics -->
        <div class="admin-kpi-grid" style="grid-template-columns:repeat(4, 1fr);">
          <div class="admin-kpi-card">
            <span class="kpi-icon">📋</span>
            <div>
              <div class="kpi-label">Total Consultations</div>
              <div class="kpi-val">${a.totalConsultations.toLocaleString()}</div>
              <div class="kpi-delta good">↑ +14.2% Growth</div>
            </div>
          </div>

          <div class="admin-kpi-card">
            <span class="kpi-icon" style="background:rgba(16,185,129,0.15);color:#10b981;">✓</span>
            <div>
              <div class="kpi-label">Resolved &amp; Prescribed</div>
              <div class="kpi-val" style="color:#10b981;">${a.resolvedConsultations.toLocaleString()}</div>
              <div class="kpi-delta good">95.5% Resolution Rate</div>
            </div>
          </div>

          <div class="admin-kpi-card">
            <span class="kpi-icon" style="background:rgba(245,158,11,0.15);color:#f59e0b;">⏳</span>
            <div>
              <div class="kpi-label">Pending / In Queue</div>
              <div class="kpi-val" style="color:#f59e0b;">${a.pendingConsultations}</div>
              <div class="kpi-delta warn">Live OPD Queue</div>
            </div>
          </div>

          <div class="admin-kpi-card">
            <span class="kpi-icon" style="background:rgba(6,182,212,0.15);color:#06b6d4;">⭐</span>
            <div>
              <div class="kpi-label">Patient CSAT Rating</div>
              <div class="kpi-val" style="color:#06b6d4;">${a.patientSatisfactionScore}</div>
              <div class="kpi-delta good">Based on 8,420 reviews</div>
            </div>
          </div>
        </div>

        <!-- Daily Consultation Volume Chart -->
        <div class="glass-panel" style="padding:22px;margin-top:20px;">
          <h4 style="font-size:16px;color:#ffffff;margin-bottom:14px;">📊 Weekly Consultation Load &amp; Average Wait Velocity</h4>
          <div style="display:flex;align-items:flex-end;gap:18px;height:160px;padding-top:20px;">
            ${a.dailyTrends.map(t => `
              <div style="flex:1;display:flex;flex-direction:column;align-items:center;height:100%;justify-content:flex-end;">
                <span style="font-size:11px;font-weight:700;color:var(--auth-primary-bright);font-family:'IBM Plex Mono',monospace;margin-bottom:6px;">${t.count}</span>
                <div style="width:100%;max-width:42px;height:${(t.count / 600) * 100}%;background:linear-gradient(180deg, var(--auth-primary-bright), var(--auth-primary));border-radius:8px 8px 3px 3px;"></div>
                <span style="font-size:11px;color:var(--muted);margin-top:8px;">${t.day}</span>
                <span style="font-size:10px;color:var(--muted);">${t.waitMin}m wait</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // -------------------------------------------------------------
    // TAB 8: DISTRICT HOSPITAL CAPACITY & LIVE BED GRID
    // -------------------------------------------------------------
    renderHospitalGrid() {
      const container = document.getElementById('admin-pane-hospitals');
      if (!container) return;

      const hospitals = this.data.hospitalGrid;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🏥 District Hospital Capacity &amp; Live Bed Grid</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Central real-time control board tracking General, ICU, and Oxygen bed vacancies across district facilities.
            </p>
          </div>
        </div>

        <div class="admin-hospital-grid">
          ${hospitals.map(h => `
            <div class="glass-panel admin-hosp-card">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
                <div>
                  <h4 style="font-size:16px;color:#ffffff;margin:0 0 3px;">${h.name}</h4>
                  <small style="color:var(--muted);">${h.tier} · ${h.location}</small>
                </div>
                <span class="admin-status-badge ${h.statusType}">
                  ${h.emergencyStatus}
                </span>
              </div>

              <!-- Bed Vacancy Metric Chips -->
              <div class="hosp-bed-stats-grid">
                <div class="hosp-bed-box">
                  <small>General Beds</small>
                  <strong style="color:${h.availableBeds > 20 ? '#4ade80' : '#f87171'};">${h.availableBeds} Free</strong>
                  <span style="font-size:10.5px;color:var(--muted);">of ${h.totalBeds} total</span>
                </div>

                <div class="hosp-bed-box">
                  <small>ICU Ventilator</small>
                  <strong style="color:${h.availableIcu > 2 ? '#4ade80' : '#f87171'};">${h.availableIcu} Free</strong>
                  <span style="font-size:10.5px;color:var(--muted);">of ${h.icuBeds} total</span>
                </div>

                <div class="hosp-bed-box">
                  <small>Oxygen Supported</small>
                  <strong style="color:${h.availableOxygen > 10 ? '#4ade80' : '#f87171'};">${h.availableOxygen} Free</strong>
                  <span style="font-size:10.5px;color:var(--muted);">of ${h.oxygenBeds} total</span>
                </div>
              </div>

              <!-- Progress bar -->
              <div style="margin-top:14px;">
                <div style="display:flex;justify-content:space-between;font-size:11.5px;margin-bottom:5px;">
                  <span style="color:var(--muted);">Total Bed Occupancy</span>
                  <span style="font-weight:700;color:#ffffff;">${h.occupancyRate}% Occupied</span>
                </div>
                <div style="height:8px;background:rgba(255,255,255,0.1);border-radius:99px;overflow:hidden;">
                  <div style="height:100%;width:${h.occupancyRate}%;background:linear-gradient(90deg, #10b981, #f59e0b, #ef4444);border-radius:99px;"></div>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid rgba(220,252,243,0.1);">
                <span style="font-size:11.5px;color:var(--muted);">🩸 ${h.bloodBankReady}</span>
                <button class="btn-glass sm" onclick="alert('Routing emergency transport to ${h.name.split('(')[0]}')">
                  <span>Allocate Patient →</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    // -------------------------------------------------------------
    // TAB 9: BLOOD BANK MONITOR
    // -------------------------------------------------------------
    renderBloodBank() {
      const container = document.getElementById('admin-pane-blood');
      if (!container) return;

      const blood = this.data.bloodBank;

      container.innerHTML = `
        <div class="admin-section-header">
          <div>
            <h3 style="font-size:20px;margin:0 0 4px;color:#ffffff;">🩸 Regional Blood Bank Inventory Monitor</h3>
            <p style="font-size:12.5px;color:var(--muted);margin:0;">
              Real-time blood stock across all 8 major blood groups with automatic deficit donor broadcast.
            </p>
          </div>
          <button class="btn-glass btn-danger" onclick="adminController.broadcastBloodAppeal('O-')">
            <span>📢 Broadcast Urgent O- Donor Appeal</span>
          </button>
        </div>

        <div class="admin-blood-full-grid">
          ${blood.map(b => `
            <div class="glass-panel admin-blood-card ${b.statusType}">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div class="blood-bubble ${b.statusType}">${b.group}</div>
                <span class="admin-status-badge ${b.statusType}">${b.status}</span>
              </div>

              <div style="margin:16px 0 10px;">
                <div style="font-size:32px;font-weight:800;font-family:'Fraunces',serif;color:#ffffff;">
                  ${b.units} <span style="font-size:14px;color:var(--muted);font-family:inherit;">Units</span>
                </div>
                <small style="font-size:11.5px;color:var(--muted);">Min Safe Reserve: ${b.minimum} Units</small>
              </div>

              <div style="font-size:11.5px;color:var(--ink-dim);margin-bottom:14px;">
                📍 ${b.hospital}
              </div>

              <button class="btn-glass sm" style="width:100%;justify-content:center;" onclick="adminController.broadcastBloodAppeal('${b.group}')">
                <span>Request ${b.group} Donors</span>
              </button>
            </div>
          `).join('')}
        </div>
      `;
    }

    broadcastBloodAppeal(group) {
      if (typeof window.toast === 'function') {
        window.toast(`📢 Urgent blood donation broadcast dispatched for ${group} blood group!`);
      }
    }

    // -------------------------------------------------------------
    // MAIN MASTER MOUNT
    // -------------------------------------------------------------
    renderCommandCenter() {
      const mainDashboard = document.getElementById('view-dashboard');
      if (!mainDashboard) return;

      mainDashboard.innerHTML = `
        <div class="admin-command-shell">
          <!-- Command Bar Navigation Tabs -->
          <div class="admin-nav-bar">
            <button class="admin-nav-tab active" data-tab="overview" onclick="adminController.switchTab('overview')">
              <span>📊 Command Dashboard</span>
            </button>
            <button class="admin-nav-tab" data-tab="staff" onclick="adminController.switchTab('staff')">
              <span>👥 Staff &amp; Users</span>
            </button>
            <button class="admin-nav-tab" data-tab="approvals" onclick="adminController.switchTab('approvals')">
              <span>🩺 Doctor Approvals (${this.data.pendingDoctors.filter(d=>d.status==='Pending Review').length})</span>
            </button>
            <button class="admin-nav-tab" data-tab="workers" onclick="adminController.switchTab('workers')">
              <span>🗺️ Worker Routes</span>
            </button>
            <button class="admin-nav-tab" data-tab="disease" onclick="adminController.switchTab('disease')">
              <span>🦠 Disease Surveillance</span>
            </button>
            <button class="admin-nav-tab" data-tab="inventory" onclick="adminController.switchTab('inventory')">
              <span>💊 Drug Supply</span>
            </button>
            <button class="admin-nav-tab" data-tab="analytics" onclick="adminController.switchTab('analytics')">
              <span>📈 Analytics</span>
            </button>
            <button class="admin-nav-tab" data-tab="hospitals" onclick="adminController.switchTab('hospitals')">
              <span>🏥 Bed Grid</span>
            </button>
            <button class="admin-nav-tab" data-tab="blood" onclick="adminController.switchTab('blood')">
              <span>🩸 Blood Bank</span>
            </button>
          </div>

          <!-- Tab Content Panes -->
          <div class="admin-tab-pane active" id="admin-pane-overview"></div>
          <div class="admin-tab-pane" id="admin-pane-staff"></div>
          <div class="admin-tab-pane" id="admin-pane-approvals"></div>
          <div class="admin-tab-pane" id="admin-pane-workers"></div>
          <div class="admin-tab-pane" id="admin-pane-disease"></div>
          <div class="admin-tab-pane" id="admin-pane-inventory"></div>
          <div class="admin-tab-pane" id="admin-pane-analytics"></div>
          <div class="admin-tab-pane" id="admin-pane-hospitals"></div>
          <div class="admin-tab-pane" id="admin-pane-blood"></div>
        </div>
      `;

      // Render initial overview tab
      this.renderOverview();
    }
  }

  // Export singleton to global
  global.adminController = new AdminController();

})(typeof window !== 'undefined' ? window : this);
