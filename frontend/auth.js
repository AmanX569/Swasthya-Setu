/**
 * Swasthya Setu (स्वास्थ्य सेतु) - Unified Authentication & RBAC Service
 * 
 * Modular authentication service providing phone login, 6-digit OTP verification,
 * account detection, multi-role permissions, active role switching, and portal routing.
 */

(function(global) {
  'use strict';

  // Role Metadata & System Configuration
  const ROLE_CONFIG = {
    admin: {
      id: 'admin',
      name: 'Admin / System Leader',
      shortName: 'Admin',
      badge: 'System Leader',
      description: 'Manage and oversee the healthcare platform, facility capacity, and network quality.',
      icon: '🏥',
      portalView: 'dashboard',
      portalName: 'Admin Portal (Facility Dashboard)',
      color: '#3b82f6',
      badgeClass: 'badge-admin'
    },
    doctor: {
      id: 'doctor',
      name: 'Doctor / Specialist',
      shortName: 'Doctor',
      badge: 'Clinician',
      description: 'Connect with patients, review longitudinal records, and provide teleconsultations.',
      icon: '🩺',
      portalView: 'tele',
      portalName: 'Doctor Portal (Clinical Desk)',
      color: '#10b981',
      badgeClass: 'badge-doctor'
    },
    worker: {
      id: 'worker',
      name: 'Field Worker (ASHA / ANM)',
      shortName: 'Field Worker',
      badge: 'Frontline Worker',
      description: 'Support patients and healthcare operations in the field with offline-ready tools.',
      icon: '🤝',
      portalView: 'worker',
      portalName: 'Field Worker Portal (ASHA Didi Desk)',
      color: '#f59e0b',
      badgeClass: 'badge-worker'
    },
    patient: {
      id: 'patient',
      name: 'Patient / Family',
      shortName: 'Patient',
      badge: 'Citizen / Patient',
      description: 'Access healthcare services, appointments, records, medicines, and family health circle.',
      icon: '🌾',
      portalView: 'home',
      portalName: 'Patient Portal (Health Space)',
      color: '#06b6d4',
      badgeClass: 'badge-patient'
    }
  };

  // View Permissions Matrix (Strict Role-Based Portal Separation)
  const VIEW_PERMISSIONS = {
    'dashboard': ['admin'],
    'tele': ['doctor'],
    'worker': ['worker'],
    'home': ['patient'],
    'triage': ['patient'],
    'appointments': ['patient'],
    'records': ['patient'],
    'sos': ['patient'],
    'medicines': ['patient'],
    'referrals': ['patient'],
    'firstaid': ['patient']
  };

  // Pre-configured Demo Accounts
  const INITIAL_DEMO_ACCOUNTS = [
    {
      userId: 'USR-ADMIN-001',
      name: 'Rajesh Sharma',
      phone: '1111111111',
      roles: ['admin'],
      activeRole: 'admin',
      designation: 'Chief Medical Officer / District Admin',
      facility: 'Kondapalli Community Health Grid',
      email: 'rajesh.sharma@health.gov.in',
      avatar: 'RS'
    },
    {
      userId: 'USR-DOC-002',
      name: 'Dr. K. V. Rao',
      phone: '2222222222',
      roles: ['doctor'],
      activeRole: 'doctor',
      designation: 'Senior Consultant (General Medicine)',
      facility: 'Ibrahimpatnam CHC',
      email: 'dr.rao@setucare.org',
      avatar: 'KR'
    },
    {
      userId: 'USR-WORKER-003',
      name: 'B. Saraswati',
      phone: '3333333333',
      roles: ['worker'],
      activeRole: 'worker',
      designation: 'Lead ASHA Facilitator (Ward 6)',
      facility: 'Kondapalli Sub-Centre',
      email: 'saraswati.asha@setucare.org',
      avatar: 'BS'
    },
    {
      userId: 'USR-PATIENT-004',
      name: 'Anitha K.',
      phone: '4444444444',
      roles: ['patient'],
      activeRole: 'patient',
      designation: 'Kondapalli Resident (ABHA Linked)',
      facility: 'Kondapalli PHC',
      email: 'anitha.k@example.com',
      avatar: 'AK'
    },
    {
      userId: 'USR-MULTI-005',
      name: 'Vikram Mehta',
      phone: '5555555555',
      roles: ['admin', 'patient'],
      activeRole: 'admin',
      designation: 'Facility Administrator & Community Member',
      facility: 'Kondapalli District Network',
      email: 'vikram.mehta@health.gov.in',
      avatar: 'VM'
    },
    {
      userId: 'USR-MULTI-006',
      name: 'Dr. Priya Patel',
      phone: '6666666666',
      roles: ['doctor', 'patient'],
      activeRole: 'doctor',
      designation: 'Specialist Physician & Registered Citizen',
      facility: 'Vijayawada Medical Centre',
      email: 'dr.priya@setucare.org',
      avatar: 'PP'
    }
  ];

  const MOCK_OTP = '123456';
  const STORAGE_KEY_AUTH = 'setu_authState';
  const STORAGE_KEY_ACTIVE_ROLE = 'setu_activeRole';
  const STORAGE_KEY_ACCOUNTS = 'setu_registeredAccounts';

  // Temporary OTP store for pending verifications (phone -> { otp, expiresAt, requestedAt })
  const pendingOtps = new Map();

  class AuthService {
    constructor() {
      this.initStorage();
      this.listeners = [];
    }

    initStorage() {
      try {
        if (!localStorage.getItem(STORAGE_KEY_ACCOUNTS)) {
          localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(INITIAL_DEMO_ACCOUNTS));
        }
      } catch (e) {
        console.warn('LocalStorage unavailable, running in in-memory mode:', e);
      }
    }

    getAccounts() {
      try {
        const data = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
        return data ? JSON.parse(data) : [...INITIAL_DEMO_ACCOUNTS];
      } catch (e) {
        return [...INITIAL_DEMO_ACCOUNTS];
      }
    }

    saveAccount(account) {
      const accounts = this.getAccounts();
      const idx = accounts.findIndex(a => a.phone === account.phone);
      if (idx >= 0) {
        accounts[idx] = { ...accounts[idx], ...account };
      } else {
        accounts.push(account);
      }
      try {
        localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
      } catch (e) {
        console.error('Error saving accounts:', e);
      }
      return account;
    }

    getAccountByPhone(phone) {
      const cleanPhone = String(phone).replace(/\D/g, '');
      const accounts = this.getAccounts();
      return accounts.find(a => a.phone === cleanPhone) || null;
    }

    // -------------------------------------------------------------
    // OTP WORKFLOW
    // -------------------------------------------------------------

    /**
     * Send OTP to phone number
     * @param {string} phone 
     * @returns {Promise<{success: boolean, message: string, phone: string, isDemoUser: boolean}>}
     */
    async sendOTP(phone) {
      const cleanPhone = String(phone).replace(/\D/g, '');
      if (cleanPhone.length !== 10) {
        throw new Error('Please enter a valid 10-digit mobile number.');
      }

      // Simulate network latency (400ms)
      await new Promise(resolve => setTimeout(resolve, 400));

      const expiresAt = Date.now() + (5 * 60 * 1000); // 5 minutes validity
      pendingOtps.set(cleanPhone, {
        otp: MOCK_OTP,
        expiresAt,
        requestedAt: Date.now()
      });

      const existing = this.getAccountByPhone(cleanPhone);

      return {
        success: true,
        phone: cleanPhone,
        message: `OTP sent successfully to +91 ${cleanPhone}. (Demo OTP: ${MOCK_OTP})`,
        isDemoUser: Boolean(existing),
        demoRoles: existing ? existing.roles : []
      };
    }

    /**
     * Verify OTP for phone number
     * @param {string} phone 
     * @param {string} otp 
     * @returns {Promise<{success: boolean, account: object|null, phone: string}>}
     */
    async verifyOTP(phone, otp) {
      const cleanPhone = String(phone).replace(/\D/g, '');
      const cleanOtp = String(otp).trim();

      // Simulate verification delay (350ms)
      await new Promise(resolve => setTimeout(resolve, 350));

      const pending = pendingOtps.get(cleanPhone);
      
      // Allow demo mock OTP even if pending entry was wiped on refresh
      const isValidOtp = cleanOtp === MOCK_OTP || (pending && pending.otp === cleanOtp);
      
      if (!isValidOtp) {
        throw new Error(`Invalid OTP. Please enter mock OTP ${MOCK_OTP} for testing.`);
      }

      if (pending && Date.now() > pending.expiresAt) {
        pendingOtps.delete(cleanPhone);
        throw new Error('OTP has expired. Please request a new OTP.');
      }

      pendingOtps.delete(cleanPhone);

      const account = this.getAccountByPhone(cleanPhone);
      return {
        success: true,
        account: account || null,
        phone: cleanPhone
      };
    }

    // -------------------------------------------------------------
    // LOGIN & SESSION MANAGEMENT
    // -------------------------------------------------------------

    /**
     * Logs in a user with a specific active role from their authorized roles
     * @param {object} account 
     * @param {string} selectedRole 
     */
    loginUser(account, selectedRole) {
      if (!account || !account.roles || !account.roles.length) {
        throw new Error('Invalid account or unauthorized roles.');
      }

      const role = selectedRole || account.activeRole || account.roles[0];
      if (!account.roles.includes(role)) {
        throw new Error(`Account is not authorized for role '${role}'.`);
      }

      const authState = {
        isAuthenticated: true,
        userId: account.userId || `USR-${Date.now()}`,
        name: account.name || 'User',
        phone: account.phone,
        roles: [...account.roles],
        activeRole: role,
        designation: account.designation || '',
        facility: account.facility || 'Kondapalli Community Grid',
        email: account.email || '',
        avatar: account.avatar || this.generateAvatar(account.name),
        loginTimestamp: new Date().toISOString()
      };

      try {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(authState));
        localStorage.setItem(STORAGE_KEY_ACTIVE_ROLE, role);
      } catch (e) {
        console.error('Failed to write authState to storage:', e);
      }

      this.notifyListeners(authState);
      return authState;
    }

    /**
     * Register a new user account
     * @param {object} regData 
     */
    registerUser(regData) {
      const { name, phone, selectedRole, extraInfo } = regData;
      const cleanPhone = String(phone).replace(/\D/g, '');

      if (!name || name.trim().length < 2) {
        throw new Error('Please enter a valid full name.');
      }

      if (!cleanPhone || cleanPhone.length !== 10) {
        throw new Error('Valid 10-digit mobile number required.');
      }

      if (!selectedRole || !ROLE_CONFIG[selectedRole]) {
        throw new Error('Please select a valid role.');
      }

      // Security check: Public admin registration is forbidden
      if (selectedRole === 'admin') {
        throw new Error('Administrator accounts cannot be created publicly. Access must be granted by an existing System Leader.');
      }

      // Check if phone already registered
      let account = this.getAccountByPhone(cleanPhone);
      if (account) {
        if (!account.roles.includes(selectedRole)) {
          account.roles.push(selectedRole);
        }
        account.name = name.trim();
      } else {
        account = {
          userId: `USR-${selectedRole.toUpperCase()}-${Date.now().toString().slice(-4)}`,
          name: name.trim(),
          phone: cleanPhone,
          roles: [selectedRole],
          activeRole: selectedRole,
          designation: extraInfo?.designation || ROLE_CONFIG[selectedRole].name,
          facility: extraInfo?.facility || 'Kondapalli Community Health Grid',
          email: extraInfo?.email || '',
          avatar: this.generateAvatar(name.trim()),
          registeredAt: new Date().toISOString(),
          extraInfo: extraInfo || {}
        };
      }

      this.saveAccount(account);
      return this.loginUser(account, selectedRole);
    }

    /**
     * Switch current active role for multi-role users
     * @param {string} newRole 
     */
    setActiveRole(newRole) {
      const auth = this.getCurrentUser();
      if (!auth || !auth.isAuthenticated) {
        throw new Error('User is not authenticated.');
      }

      if (!auth.roles.includes(newRole)) {
        throw new Error(`Unauthorized role: You do not have permission to switch to '${newRole}'.`);
      }

      auth.activeRole = newRole;
      try {
        localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(auth));
        localStorage.setItem(STORAGE_KEY_ACTIVE_ROLE, newRole);
      } catch (e) {
        console.error('Error persisting activeRole:', e);
      }

      this.notifyListeners(auth);
      return auth;
    }

    logoutUser() {
      try {
        localStorage.removeItem(STORAGE_KEY_AUTH);
        localStorage.removeItem(STORAGE_KEY_ACTIVE_ROLE);
      } catch (e) {
        console.error('Error clearing auth:', e);
      }
      this.notifyListeners(null);
    }

    // -------------------------------------------------------------
    // GETTERS & PERMISSIONS
    // -------------------------------------------------------------

    isAuthenticated() {
      const auth = this.getCurrentUser();
      return Boolean(auth && auth.isAuthenticated);
    }

    getCurrentUser() {
      try {
        const data = localStorage.getItem(STORAGE_KEY_AUTH);
        return data ? JSON.parse(data) : null;
      } catch (e) {
        return null;
      }
    }

    getActiveRole() {
      const auth = this.getCurrentUser();
      if (auth && auth.activeRole) {
        return auth.activeRole;
      }
      try {
        return localStorage.getItem(STORAGE_KEY_ACTIVE_ROLE) || 'patient';
      } catch (e) {
        return 'patient';
      }
    }

    getUserRoles() {
      const auth = this.getCurrentUser();
      return auth && auth.roles ? auth.roles : [];
    }

    hasRole(role) {
      const roles = this.getUserRoles();
      return roles.includes(role);
    }

    /**
     * Check if the active role can access a specific view/portal
     * @param {string} viewName 
     * @param {string} [role] 
     */
    canAccessView(viewName, role) {
      const currentRole = role || this.getActiveRole();
      const allowedRoles = VIEW_PERMISSIONS[viewName];
      if (!allowedRoles) {
        return true; // Unrestricted general view
      }
      return allowedRoles.includes(currentRole);
    }

    /**
     * Check which roles authorized for this user can access the target view
     * @param {string} viewName 
     */
    getAuthorizedRolesForView(viewName) {
      const userRoles = this.getUserRoles();
      const allowedRoles = VIEW_PERMISSIONS[viewName] || [];
      return userRoles.filter(r => allowedRoles.includes(r));
    }

    /**
     * Get default portal view for a role
     * @param {string} role 
     */
    getRoleDefaultView(role) {
      const config = ROLE_CONFIG[role];
      return config ? config.portalView : 'home';
    }

    getRoleMetadata(role) {
      return ROLE_CONFIG[role] || {
        id: role,
        name: role.toUpperCase(),
        shortName: role,
        badge: role,
        description: '',
        icon: '👤',
        portalView: 'home',
        portalName: 'Health Portal'
      };
    }

    getAllRoleConfigs() {
      return ROLE_CONFIG;
    }

    getDemoAccounts() {
      return INITIAL_DEMO_ACCOUNTS;
    }

    generateAvatar(name) {
      if (!name) return 'U';
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }

    // -------------------------------------------------------------
    // REACTIVE EVENT LISTENERS
    // -------------------------------------------------------------

    onAuthChange(callback) {
      if (typeof callback === 'function') {
        this.listeners.push(callback);
      }
    }

    notifyListeners(authState) {
      this.listeners.forEach(fn => {
        try {
          fn(authState);
        } catch (e) {
          console.error('Auth change listener error:', e);
        }
      });
    }
  }

  // Export singleton to global scope
  global.authService = new AuthService();
  global.ROLE_CONFIG = ROLE_CONFIG;

})(typeof window !== 'undefined' ? window : this);
