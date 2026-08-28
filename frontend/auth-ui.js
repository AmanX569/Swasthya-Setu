/**
 * Setu Rural Care Network - Unified Authentication & RBAC UI Controller
 * 
 * Manages the UI flows for Landing, Phone Login, 6-digit OTP verification,
 * Multi-role Selection ("Continue As"), Registration, Unauthorized Portal Protection,
 * and Profile Switch-Role Dropdown.
 */

(function(global) {
  'use strict';

  let currentPhone = '';
  let resendCountdown = 30;
  let countdownTimer = null;
  let isSendingOtp = false;
  let isVerifyingOtp = false;

  // DOM Container References
  let overlayEl = null;

  function initAuthUI() {
    createAuthDOM();
    bindGlobalEvents();

    // Check if session exists on load
    if (authService.isAuthenticated()) {
      const user = authService.getCurrentUser();
      const activeRole = authService.getActiveRole();
      hideAuthOverlay();
      updateTopBarProfile(user, activeRole);
      renderRoleBasedNavigation(activeRole);
    } else {
      showLandingScreen();
    }

    // Listen for auth state changes
    authService.onAuthChange((user) => {
      if (user && user.isAuthenticated) {
        hideAuthOverlay();
        updateTopBarProfile(user, user.activeRole);
        renderRoleBasedNavigation(user.activeRole);
      } else {
        showLandingScreen();
        updateTopBarProfile(null, 'patient');
        renderRoleBasedNavigation('patient');
      }
    });
  }

  function createAuthDOM() {
    if (document.getElementById('setuAuthOverlay')) return;

    overlayEl = document.createElement('div');
    overlayEl.id = 'setuAuthOverlay';
    overlayEl.className = 'auth-overlay';
    overlayEl.innerHTML = `
      <div class="auth-ambient-orb auth-orb-1" aria-hidden="true"></div>
      <div class="auth-ambient-orb auth-orb-2" aria-hidden="true"></div>
      <div id="authScreenContainer" class="auth-landing-shell"></div>
    `;
    document.body.appendChild(overlayEl);

    // Create Unauthorized Access Modal
    createUnauthorizedModalDOM();
  }

  function createUnauthorizedModalDOM() {
    if (document.getElementById('unauthorizedModal')) return;

    const modal = document.createElement('div');
    modal.id = 'unauthorizedModal';
    modal.className = 'modal-overlay';
    modal.style.zIndex = '1100';
    modal.innerHTML = `
      <div class="auth-modal-card auth-unauth-card">
        <div class="auth-unauth-icon">🛡️</div>
        <h3 class="auth-card-title" style="color:var(--danger-bright, #f87171);font-size:22px;">
          Access Denied · Unauthorized Portal
        </h3>
        <p class="auth-card-subtitle" id="unauthMessage" style="margin:10px 0 16px;font-size:13.5px;">
          You don't have permission to access this portal.
        </p>
        
        <div class="auth-unauth-badge-row" id="unauthBadgeRow"></div>

        <div id="unauthActions" style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:18px;">
          <button class="auth-btn-primary" id="unauthSwitchBtn" style="display:none;">
            <span>Switch Role &amp; Continue →</span>
          </button>
          <button class="auth-btn-primary" id="unauthReturnBtn" style="background:rgba(220,252,243,0.1);color:#ffffff;border:1px solid var(--auth-border);">
            <span>Return to My Portal</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('unauthReturnBtn').addEventListener('click', () => {
      modal.classList.remove('open');
      const activeRole = authService.getActiveRole();
      const defaultView = authService.getRoleDefaultView(activeRole);
      if (typeof window.switchView === 'function') {
        window.switchView(defaultView);
      }
    });
  }

  // -------------------------------------------------------------
  // SCREEN 1: LANDING / INTRO
  // -------------------------------------------------------------
  function showLandingScreen() {
    if (!overlayEl) return;
    overlayEl.classList.remove('hidden');

    const container = document.getElementById('authScreenContainer');
    const roles = authService.getAllRoleConfigs();

    container.innerHTML = `
      <div class="auth-hero-header">
        <div class="auth-brand-emblem">
          <div class="auth-brand-logo">स</div>
          <span style="font-weight:700;font-size:13px;letter-spacing:0.04em;">SWASTHYA SETU · BHARAT HEALTH GRID</span>
        </div>
        <h1 class="auth-hero-title">Unified Healthcare Platform</h1>
        <p class="auth-hero-subtitle">
          One secure login. Multiple roles. One connected healthcare ecosystem.
        </p>
      </div>

      <div class="auth-roles-grid">
        <div class="auth-role-card">
          <div class="auth-role-icon">${roles.admin.icon}</div>
          <h3 class="auth-role-title">${roles.admin.name}</h3>
          <p class="auth-role-desc">${roles.admin.description}</p>
          <span class="auth-role-badge ${roles.admin.badgeClass}">Admin Portal</span>
        </div>

        <div class="auth-role-card">
          <div class="auth-role-icon">${roles.doctor.icon}</div>
          <h3 class="auth-role-title">${roles.doctor.name}</h3>
          <p class="auth-role-desc">${roles.doctor.description}</p>
          <span class="auth-role-badge ${roles.doctor.badgeClass}">Doctor Portal</span>
        </div>

        <div class="auth-role-card">
          <div class="auth-role-icon">${roles.worker.icon}</div>
          <h3 class="auth-role-title">${roles.worker.name}</h3>
          <p class="auth-role-desc">${roles.worker.description}</p>
          <span class="auth-role-badge ${roles.worker.badgeClass}">Worker Portal</span>
        </div>

        <div class="auth-role-card">
          <div class="auth-role-icon">${roles.patient.icon}</div>
          <h3 class="auth-role-title">${roles.patient.name}</h3>
          <p class="auth-role-desc">${roles.patient.description}</p>
          <span class="auth-role-badge ${roles.patient.badgeClass}">Patient Portal</span>
        </div>
      </div>

      <div class="auth-landing-actions">
        <button class="auth-btn-primary" id="btnGetStarted" style="font-size:14.5px;padding:14px 24px;">
          <span>🔑 Log In (Existing User) →</span>
        </button>
        <button class="auth-btn-primary" style="font-size:14.5px;padding:14px 24px;background:linear-gradient(135deg, #06b6d4, #0891b2);border-color:#22d3ee;" onclick="authUI.showRegistrationScreen('')">
          <span>🌾 Register as New Patient</span>
        </button>
        <button class="auth-btn-danger" onclick="authUI.openEmergencyDirect()" style="padding:14px 20px;">
          <span>🚨 108 SOS</span>
        </button>
      </div>
    `;

    document.getElementById('btnGetStarted').addEventListener('click', () => {
      showPhoneLoginScreen();
    });
  }

  // -------------------------------------------------------------
  // SCREEN 2: UNIFIED PHONE LOGIN
  // -------------------------------------------------------------
  function showPhoneLoginScreen(prefillPhone = '') {
    const container = document.getElementById('authScreenContainer');
    const demos = authService.getDemoAccounts();

    container.innerHTML = `
      <div class="auth-modal-card">
        <button class="auth-modal-close" onclick="authUI.showLandingScreen()" title="Back to Intro">✕</button>
        
        <div class="auth-card-head">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div class="auth-brand-logo" style="width:26px;height:26px;font-size:13px;">स</div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--auth-primary-bright);">UNIFIED HEALTHCARE LOGIN</span>
          </div>
          <h2 class="auth-card-title">Enter your mobile number</h2>
          <p class="auth-card-subtitle">Everyone uses the same secure portal. We'll send a 6-digit verification code.</p>
        </div>

        <form id="phoneLoginForm" onsubmit="event.preventDefault(); authUI.handleSendOTP();">
          <div class="auth-input-group">
            <label class="auth-label" for="authPhoneInput">
              <span>Mobile Number</span>
              <span style="color:var(--auth-primary-bright);font-size:10.5px;">+91 (India)</span>
            </label>
            <div class="auth-phone-input-wrap">
              <div class="auth-phone-prefix">🇮🇳 +91</div>
              <input type="tel" id="authPhoneInput" class="auth-input" placeholder="98765 43210" 
                     value="${prefillPhone || currentPhone || '1111111111'}" maxlength="10" autocomplete="tel" autofocus>
            </div>
          </div>

          <button type="submit" class="auth-btn-primary" id="btnSendOtp" style="width:100%;justify-content:center;height:48px;margin-top:6px;">
            <span id="btnSendOtpText">Send OTP →</span>
          </button>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid rgba(220,252,243,0.1);">
            <span style="font-size:12px;color:var(--muted);">New to Swasthya Setu?</span>
            <button type="button" class="auth-link-btn" onclick="authUI.showRegistrationScreen(document.getElementById('authPhoneInput') ? document.getElementById('authPhoneInput').value : '')" style="color:#38bdf8;font-weight:700;">
              ✨ Register New Patient Account →
            </button>
          </div>
        </form>

        <div class="auth-demo-helper">
          <div class="auth-demo-helper-title">
            <span>⚡ Quick Demo Test Credentials (OTP: 123456)</span>
          </div>
          <div class="auth-demo-chips">
            <button type="button" class="auth-demo-chip" onclick="authUI.fillDemoPhone('1111111111')">
              👑 Admin (1111111111)
            </button>
            <button type="button" class="auth-demo-chip" onclick="authUI.fillDemoPhone('2222222222')">
              🩺 Doctor (2222222222)
            </button>
            <button type="button" class="auth-demo-chip" onclick="authUI.fillDemoPhone('3333333333')">
              🤝 Worker (3333333333)
            </button>
            <button type="button" class="auth-demo-chip" onclick="authUI.fillDemoPhone('4444444444')">
              🌾 Patient (4444444444)
            </button>
            <button type="button" class="auth-demo-chip" onclick="authUI.fillDemoPhone('5555555555')" style="border-color:rgba(59,130,246,0.4)">
              ✨ Admin + Patient (5555555555)
            </button>
            <button type="button" class="auth-demo-chip" onclick="authUI.fillDemoPhone('6666666666')" style="border-color:rgba(16,185,129,0.4)">
              ✨ Doctor + Patient (6666666666)
            </button>
          </div>
        </div>
      </div>
    `;

    setTimeout(() => {
      const input = document.getElementById('authPhoneInput');
      if (input) input.focus();
    }, 100);
  }

  function fillDemoPhone(phone) {
    const input = document.getElementById('authPhoneInput');
    if (input) {
      input.value = phone;
      input.focus();
    }
  }

  async function handleSendOTP() {
    if (isSendingOtp) return;
    const phoneInput = document.getElementById('authPhoneInput');
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!phone || phone.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    currentPhone = phone;
    isSendingOtp = true;
    const btn = document.getElementById('btnSendOtp');
    const btnText = document.getElementById('btnSendOtpText');
    if (btn) btn.disabled = true;
    if (btnText) btnText.innerHTML = `<span class="auth-spinner"></span> Sending OTP...`;

    try {
      const res = await authService.sendOTP(phone);
      showToast(res.message, 'success');
      showOtpScreen(phone);
    } catch (err) {
      showToast(err.message, 'error');
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Send OTP →';
    } finally {
      isSendingOtp = false;
    }
  }

  // -------------------------------------------------------------
  // SCREEN 3: 6-DIGIT OTP VERIFICATION
  // -------------------------------------------------------------
  function showOtpScreen(phone) {
    const container = document.getElementById('authScreenContainer');

    container.innerHTML = `
      <div class="auth-modal-card">
        <button class="auth-modal-close" onclick="authUI.showPhoneLoginScreen('${phone}')" title="Change Phone Number">✕</button>

        <div class="auth-card-head">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div class="auth-brand-logo" style="width:26px;height:26px;font-size:13px;">स</div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--auth-primary-bright);">SECURITY VERIFICATION</span>
          </div>
          <h2 class="auth-card-title">Verify your phone number</h2>
          <p class="auth-card-subtitle">
            Enter the 6-digit OTP sent to <strong style="color:#ffffff;">+91 ${phone}</strong>
          </p>
        </div>

        <div class="auth-otp-grid" id="otpBoxGrid">
          <input type="text" class="auth-otp-box" maxlength="1" data-index="0" autofocus inputmode="numeric">
          <input type="text" class="auth-otp-box" maxlength="1" data-index="1" inputmode="numeric">
          <input type="text" class="auth-otp-box" maxlength="1" data-index="2" inputmode="numeric">
          <input type="text" class="auth-otp-box" maxlength="1" data-index="3" inputmode="numeric">
          <input type="text" class="auth-otp-box" maxlength="1" data-index="4" inputmode="numeric">
          <input type="text" class="auth-otp-box" maxlength="1" data-index="5" inputmode="numeric">
        </div>

        <div class="auth-otp-meta">
          <button type="button" class="auth-link-btn" onclick="authUI.showPhoneLoginScreen('${phone}')">
            ← Change phone number
          </button>
          <div>
            <span id="otpCountdownText">Resend in 30s</span>
            <button type="button" class="auth-link-btn" id="btnResendOtp" style="display:none;" onclick="authUI.handleResendOTP()">
              Resend OTP
            </button>
          </div>
        </div>

        <button type="button" class="auth-btn-primary" id="btnVerifyOtp" style="width:100%;justify-content:center;height:48px;" onclick="authUI.handleVerifyOTP()">
          <span id="btnVerifyOtpText">Verify OTP &amp; Continue →</span>
        </button>

        <div style="margin-top:14px;text-align:center;">
          <small style="font-size:11.5px;color:var(--muted);cursor:pointer;" onclick="authUI.fillMockOtp()">
            ⚡ Auto-fill Demo OTP: <strong style="color:var(--auth-primary-bright);">123456</strong>
          </small>
        </div>
      </div>
    `;

    bindOtpInputEvents();
    startResendCountdown();

    // Auto focus first box
    setTimeout(() => {
      const firstBox = document.querySelector('.auth-otp-box[data-index="0"]');
      if (firstBox) firstBox.focus();
    }, 100);
  }

  function bindOtpInputEvents() {
    const boxes = document.querySelectorAll('.auth-otp-box');

    boxes.forEach((box, idx) => {
      // Auto-advance & backspace handler
      box.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val ? val[0] : '';

        if (e.target.value) {
          box.classList.add('filled');
          if (idx < boxes.length - 1) {
            boxes[idx + 1].focus();
          } else {
            // All boxes filled, trigger verify automatically
            checkAndAutoVerify();
          }
        } else {
          box.classList.remove('filled');
        }
      });

      box.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !box.value && idx > 0) {
          boxes[idx - 1].focus();
          boxes[idx - 1].value = '';
          boxes[idx - 1].classList.remove('filled');
        } else if (e.key === 'ArrowLeft' && idx > 0) {
          boxes[idx - 1].focus();
        } else if (e.key === 'ArrowRight' && idx < boxes.length - 1) {
          boxes[idx + 1].focus();
        } else if (e.key === 'Enter') {
          handleVerifyOTP();
        }
      });

      // Paste handler (handles full 6-digit paste)
      box.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedData = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        if (!pastedData) return;

        boxes.forEach((b, i) => {
          if (i < pastedData.length) {
            b.value = pastedData[i];
            b.classList.add('filled');
          }
        });

        const nextFocusIndex = Math.min(pastedData.length, boxes.length - 1);
        boxes[nextFocusIndex].focus();

        if (pastedData.length >= 6) {
          checkAndAutoVerify();
        }
      });
    });
  }

  function fillMockOtp() {
    const boxes = document.querySelectorAll('.auth-otp-box');
    const mock = '123456';
    boxes.forEach((b, i) => {
      b.value = mock[i];
      b.classList.add('filled');
    });
    const lastBox = boxes[boxes.length - 1];
    if (lastBox) lastBox.focus();
    checkAndAutoVerify();
  }

  function getEnteredOtp() {
    const boxes = document.querySelectorAll('.auth-otp-box');
    let otp = '';
    boxes.forEach(b => otp += b.value);
    return otp;
  }

  function checkAndAutoVerify() {
    const otp = getEnteredOtp();
    if (otp.length === 6) {
      setTimeout(() => handleVerifyOTP(), 150);
    }
  }

  function startResendCountdown() {
    clearInterval(countdownTimer);
    resendCountdown = 30;
    const countdownEl = document.getElementById('otpCountdownText');
    const resendBtn = document.getElementById('btnResendOtp');

    if (countdownEl) countdownEl.style.display = 'inline';
    if (resendBtn) resendBtn.style.display = 'none';

    countdownTimer = setInterval(() => {
      resendCountdown--;
      if (countdownEl) countdownEl.textContent = `Resend in ${resendCountdown}s`;

      if (resendCountdown <= 0) {
        clearInterval(countdownTimer);
        if (countdownEl) countdownEl.style.display = 'none';
        if (resendBtn) resendBtn.style.display = 'inline';
      }
    }, 1000);
  }

  async function handleResendOTP() {
    try {
      const res = await authService.sendOTP(currentPhone);
      showToast(`New OTP sent to +91 ${currentPhone}`, 'success');
      startResendCountdown();
      const boxes = document.querySelectorAll('.auth-otp-box');
      boxes.forEach(b => { b.value = ''; b.classList.remove('filled'); });
      if (boxes[0]) boxes[0].focus();
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  async function handleVerifyOTP() {
    if (isVerifyingOtp) return;
    const otp = getEnteredOtp();

    if (otp.length !== 6) {
      showToast('Please enter the full 6-digit OTP.', 'error');
      return;
    }

    isVerifyingOtp = true;
    const btn = document.getElementById('btnVerifyOtp');
    const btnText = document.getElementById('btnVerifyOtpText');
    if (btn) btn.disabled = true;
    if (btnText) btnText.innerHTML = `<span class="auth-spinner"></span> Verifying...`;

    try {
      const res = await authService.verifyOTP(currentPhone, otp);

      // Account Detection
      if (res.account) {
        handleAccountDetected(res.account);
      } else {
        showAccountNotFoundScreen(currentPhone);
      }
    } catch (err) {
      showToast(err.message, 'error');
      // Shake OTP boxes
      const boxes = document.querySelectorAll('.auth-otp-box');
      boxes.forEach(b => {
        b.classList.add('shake');
        setTimeout(() => b.classList.remove('shake'), 500);
      });
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Verify OTP & Continue →';
    } finally {
      isVerifyingOtp = false;
    }
  }

  // -------------------------------------------------------------
  // SCREEN 4: ACCOUNT DETECTION & ROLE HANDLING
  // -------------------------------------------------------------
  function handleAccountDetected(account) {
    const roles = account.roles || [];

    if (roles.length === 1) {
      // Single-role user: Auto-redirect immediately
      const singleRole = roles[0];
      const roleMeta = authService.getRoleMetadata(singleRole);
      
      showToast(`Welcome back, ${account.name}! Redirecting to ${roleMeta.shortName} Portal...`, 'success');
      
      const loggedUser = authService.loginUser(account, singleRole);
      
      setTimeout(() => {
        hideAuthOverlay();
        const defaultView = authService.getRoleDefaultView(singleRole);
        if (typeof window.switchView === 'function') {
          window.switchView(defaultView);
        }
      }, 500);

    } else if (roles.length > 1) {
      // Multi-role user: Show "Continue As" selector
      showContinueAsScreen(account);
    }
  }

  function showContinueAsScreen(account) {
    const container = document.getElementById('authScreenContainer');
    const roleConfigs = authService.getAllRoleConfigs();

    const roleCardsHtml = account.roles.map(roleId => {
      const r = roleConfigs[roleId];
      if (!r) return '';
      return `
        <div class="auth-continue-role-card" onclick="authUI.selectActiveRoleAndLogin('${roleId}')">
          <div class="auth-continue-role-icon">${r.icon}</div>
          <div class="auth-continue-role-info">
            <strong>${r.name}</strong>
            <small>${r.description}</small>
          </div>
          <span class="auth-role-badge ${r.badgeClass}">Continue →</span>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <div class="auth-modal-card" style="max-width:520px;">
        <div class="auth-card-head">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div class="auth-brand-logo" style="width:26px;height:26px;font-size:13px;">स</div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--auth-primary-bright);">MULTI-ROLE DETECTED</span>
          </div>
          <h2 class="auth-card-title">How would you like to continue?</h2>
          <p class="auth-card-subtitle">
            Welcome, <strong style="color:#ffffff;">${account.name}</strong>. Your account has multiple authorized roles. Choose a workspace:
          </p>
        </div>

        <div class="auth-continue-roles">
          ${roleCardsHtml}
        </div>

        <p style="font-size:11.5px;color:var(--muted);text-align:center;margin-top:14px;">
          💡 You can easily switch between your authorized roles anytime from your topbar profile menu.
        </p>
      </div>
    `;

    // Store account in memory for selection
    window._pendingMultiAccount = account;
  }

  function selectActiveRoleAndLogin(roleId) {
    const account = window._pendingMultiAccount;
    if (!account) return;

    const roleMeta = authService.getRoleMetadata(roleId);
    showToast(`Launching ${roleMeta.shortName} Portal...`, 'success');

    const loggedUser = authService.loginUser(account, roleId);
    delete window._pendingMultiAccount;

    hideAuthOverlay();
    const defaultView = authService.getRoleDefaultView(roleId);
    if (typeof window.switchView === 'function') {
      window.switchView(defaultView);
    }
  }

  // -------------------------------------------------------------
  // SCREEN 5: ACCOUNT NOT FOUND & REGISTRATION
  // -------------------------------------------------------------
  function showAccountNotFoundScreen(phone) {
    const container = document.getElementById('authScreenContainer');

    container.innerHTML = `
      <div class="auth-modal-card auth-notfound-box">
        <div class="auth-notfound-icon">🔍</div>
        <h2 class="auth-card-title" style="font-size:22px;">Account Not Found</h2>
        <p class="auth-card-subtitle" style="margin-bottom:24px;">
          No active healthcare account is linked to <strong style="color:#ffffff;">+91 ${phone}</strong>.
        </p>

        <div style="display:flex;flex-direction:column;gap:10px;">
          <button class="auth-btn-primary" style="justify-content:center;height:48px;" onclick="authUI.showRegistrationScreen('${phone}')">
            <span>✨ Create New Account →</span>
          </button>
          <button class="auth-btn-primary" style="background:rgba(220,252,243,0.1);color:#ffffff;border:1px solid var(--auth-border);justify-content:center;height:44px;" onclick="authUI.showPhoneLoginScreen('')">
            <span>Try Another Number</span>
          </button>
        </div>
      </div>
    `;
  }

  function showRegistrationScreen(phone = '') {
    const container = document.getElementById('authScreenContainer');
    const initialPhone = phone || currentPhone || '';

    container.innerHTML = `
      <div class="auth-modal-card" style="max-width:560px;max-height:90vh;overflow-y:auto;">
        <button class="auth-modal-close" onclick="authUI.showPhoneLoginScreen('${initialPhone}')" title="Back to Login">✕</button>

        <div class="auth-card-head">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <div class="auth-brand-logo" style="width:26px;height:26px;font-size:13px;">स</div>
            <span style="font-size:11px;font-weight:700;letter-spacing:0.08em;color:var(--auth-primary-bright);">NEW CITIZEN &amp; HEALTHCARE REGISTRATION</span>
          </div>
          <h2 class="auth-card-title">Register Healthcare Account</h2>
          <p class="auth-card-subtitle">Create your digital ABHA-linked health card &amp; connect to rural healthcare network.</p>
        </div>

        <!-- Role Selection Tabs -->
        <div class="auth-label"><span>Registering Account As:</span></div>
        <div class="auth-reg-tabs" style="margin-bottom:14px;">
          <button type="button" class="auth-reg-tab active" data-role="patient" onclick="authUI.switchRegRole('patient')">
            🌾 Patient / Family
          </button>
          <button type="button" class="auth-reg-tab" data-role="doctor" onclick="authUI.switchRegRole('doctor')">
            🩺 Doctor
          </button>
          <button type="button" class="auth-reg-tab" data-role="worker" onclick="authUI.switchRegRole('worker')">
            🤝 ASHA Worker
          </button>
        </div>

        <form id="regForm" onsubmit="event.preventDefault(); authUI.handleRegistration();">
          <div style="display:grid;grid-template-columns:1.2fr 1fr;gap:10px;">
            <div class="auth-input-group">
              <label class="auth-label" for="regName"><span>Full Name *</span></label>
              <input type="text" id="regName" class="auth-input" placeholder="e.g. Radhika Sharma" required autofocus>
            </div>

            <div class="auth-input-group">
              <label class="auth-label" for="regPhone"><span>10-Digit Mobile *</span></label>
              <input type="tel" id="regPhone" class="auth-input" placeholder="9876543210" pattern="[0-9]{10}" maxlength="10" value="${initialPhone}" required>
            </div>
          </div>

          <div class="auth-input-group">
            <label class="auth-label" for="regEmail"><span>Email Address (Optional)</span></label>
            <input type="email" id="regEmail" class="auth-input" placeholder="radhika@example.com">
          </div>

          <!-- Role-Specific Dynamic Fields -->
          <div id="regRoleFields">
            <!-- Patient Fields (Default) -->
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
              <div class="auth-input-group">
                <label class="auth-label" for="regAge"><span>Age (Yrs) *</span></label>
                <input type="number" id="regAge" class="auth-input" placeholder="28" min="1" max="120" value="28" required>
              </div>

              <div class="auth-input-group">
                <label class="auth-label" for="regGender"><span>Gender *</span></label>
                <select id="regGender" class="auth-input" required>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div class="auth-input-group">
                <label class="auth-label" for="regBlood"><span>Blood Group</span></label>
                <select id="regBlood" class="auth-input">
                  <option value="O+">O+</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="AB+">AB+</option>
                  <option value="O-">O-</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div class="auth-input-group">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <label class="auth-label" for="regAbha"><span>ABHA Health ID (Ayushman Bharat)</span></label>
                <button type="button" class="auth-link-btn" onclick="authUI.generateRandomAbha()" style="font-size:11px;color:#38bdf8;">
                  ⚡ Auto-Generate ABHA
                </button>
              </div>
              <input type="text" id="regAbha" class="auth-input" placeholder="e.g. 14-8832-1920-4412" value="14-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}">
            </div>

            <div class="auth-input-group">
              <label class="auth-label" for="regVillage"><span>Village / Gram Panchayat Location *</span></label>
              <input type="text" id="regVillage" class="auth-input" placeholder="e.g. Kondapalli Gramam, Ward 6" value="Kondapalli Gramam, Ward 6" required>
            </div>

            <div class="auth-input-group">
              <label class="auth-label" for="regConditions"><span>Health Condition / Special Care</span></label>
              <select id="regConditions" class="auth-input">
                <option value="General Health Checkup Active">General Citizen (Healthy)</option>
                <option value="ANC Pregnancy (2nd Trimester)">🤰 ANC Pregnancy (2nd Trimester)</option>
                <option value="ANC Pregnancy (3rd Trimester High Risk)">🤰 ANC Pregnancy (High Risk)</option>
                <option value="Essential Hypertension / High BP">❤️ Hypertension / High BP</option>
                <option value="Type 2 Diabetes Mellitus">🩸 Type 2 Diabetes Care</option>
                <option value="Infant / Child Immunization Due">👶 Infant Immunization Track</option>
                <option value="Senior Citizen Routine Monitoring">👴 Senior Citizen Chronic Care</option>
              </select>
            </div>

            <div class="auth-input-group">
              <label class="auth-label" for="regEmergency"><span>Emergency Contact &amp; Relation</span></label>
              <input type="text" id="regEmergency" class="auth-input" placeholder="e.g. Ramu (Husband · 9848119988)" value="Family Member (+91 ${initialPhone})">
            </div>
          </div>

          <button type="submit" class="auth-btn-primary" style="width:100%;justify-content:center;height:48px;margin-top:10px;">
            <span>💾 Complete Registration &amp; Enter Health Portal →</span>
          </button>
        </form>
      </div>
    `;

    window._selectedRegRole = 'patient';
  }

  function generateRandomAbha() {
    const input = document.getElementById('regAbha');
    if (input) {
      input.value = `14-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}`;
      showToast('Generated 14-digit Ayushman Bharat ABHA Health Number!', 'success');
    }
  }

  function switchRegRole(role) {
    window._selectedRegRole = role;
    document.querySelectorAll('.auth-reg-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.role === role);
    });

    const fieldsContainer = document.getElementById('regRoleFields');
    if (!fieldsContainer) return;

    if (role === 'patient') {
      fieldsContainer.innerHTML = `
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;">
          <div class="auth-input-group">
            <label class="auth-label" for="regAge"><span>Age (Yrs) *</span></label>
            <input type="number" id="regAge" class="auth-input" placeholder="28" min="1" max="120" value="28" required>
          </div>

          <div class="auth-input-group">
            <label class="auth-label" for="regGender"><span>Gender *</span></label>
            <select id="regGender" class="auth-input" required>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="auth-input-group">
            <label class="auth-label" for="regBlood"><span>Blood Group</span></label>
            <select id="regBlood" class="auth-input">
              <option value="O+">O+</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="O-">O-</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
        </div>

        <div class="auth-input-group">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <label class="auth-label" for="regAbha"><span>ABHA Health ID (Ayushman Bharat)</span></label>
            <button type="button" class="auth-link-btn" onclick="authUI.generateRandomAbha()" style="font-size:11px;color:#38bdf8;">
              ⚡ Auto-Generate ABHA
            </button>
          </div>
          <input type="text" id="regAbha" class="auth-input" placeholder="e.g. 14-8832-1920-4412" value="14-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}-${Math.floor(1000+Math.random()*9000)}">
        </div>

        <div class="auth-input-group">
          <label class="auth-label" for="regVillage"><span>Village / Gram Panchayat Location *</span></label>
          <input type="text" id="regVillage" class="auth-input" placeholder="e.g. Kondapalli Gramam, Ward 6" value="Kondapalli Gramam, Ward 6" required>
        </div>

        <div class="auth-input-group">
          <label class="auth-label" for="regConditions"><span>Health Condition / Special Care</span></label>
          <select id="regConditions" class="auth-input">
            <option value="General Health Checkup Active">General Citizen (Healthy)</option>
            <option value="ANC Pregnancy (2nd Trimester)">🤰 ANC Pregnancy (2nd Trimester)</option>
            <option value="ANC Pregnancy (3rd Trimester High Risk)">🤰 ANC Pregnancy (High Risk)</option>
            <option value="Essential Hypertension / High BP">❤️ Hypertension / High BP</option>
            <option value="Type 2 Diabetes Mellitus">🩸 Type 2 Diabetes Care</option>
            <option value="Infant / Child Immunization Due">👶 Infant Immunization Track</option>
            <option value="Senior Citizen Routine Monitoring">👴 Senior Citizen Chronic Care</option>
          </select>
        </div>

        <div class="auth-input-group">
          <label class="auth-label" for="regEmergency"><span>Emergency Contact &amp; Relation</span></label>
          <input type="text" id="regEmergency" class="auth-input" placeholder="e.g. Ramu (Husband · 9848119988)">
        </div>
      `;
    } else if (role === 'doctor') {
      fieldsContainer.innerHTML = `
        <div class="auth-input-group">
          <label class="auth-label" for="regLicense"><span>Medical Council Registration No. *</span></label>
          <input type="text" id="regLicense" class="auth-input" placeholder="e.g. AP-MCI-88421" required>
        </div>
        <div class="auth-input-group">
          <label class="auth-label" for="regSpec"><span>Specialization / Department *</span></label>
          <input type="text" id="regSpec" class="auth-input" placeholder="e.g. General Medicine / Obstetrics" value="General Medicine" required>
        </div>
        <div class="auth-input-group">
          <label class="auth-label" for="regHospital"><span>Affiliated Hospital / CHC</span></label>
          <input type="text" id="regHospital" class="auth-input" placeholder="e.g. Ibrahimpatnam CHC" value="Ibrahimpatnam CHC">
        </div>
      `;
    } else if (role === 'worker') {
      fieldsContainer.innerHTML = `
        <div class="auth-input-group">
          <label class="auth-label" for="regWorkerId"><span>ASHA / ANM Worker ID *</span></label>
          <input type="text" id="regWorkerId" class="auth-input" placeholder="e.g. ASHA-AP-KND-09" required>
        </div>
        <div class="auth-input-group">
          <label class="auth-label" for="regWard"><span>Assigned Ward / Village Route *</span></label>
          <input type="text" id="regWard" class="auth-input" placeholder="e.g. Kondapalli Sector Ward 6" value="Kondapalli Sector Ward 6" required>
        </div>
        <div class="auth-input-group">
          <label class="auth-label" for="regPhc"><span>Primary Health Centre (PHC)</span></label>
          <input type="text" id="regPhc" class="auth-input" placeholder="e.g. Kondapalli PHC" value="Kondapalli PHC">
        </div>
      `;
    }
  }

  function handleRegistration() {
    const nameInput = document.getElementById('regName');
    const phoneInput = document.getElementById('regPhone');
    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
    const email = document.getElementById('regEmail')?.value.trim() || '';
    const selectedRole = window._selectedRegRole || 'patient';

    if (!name || name.length < 2) {
      showToast('Please enter your full name.', 'error');
      if (nameInput) nameInput.focus();
      return;
    }

    if (!phone || phone.length !== 10) {
      showToast('Please enter a valid 10-digit mobile number.', 'error');
      if (phoneInput) phoneInput.focus();
      return;
    }

    let extraInfo = { email };
    if (selectedRole === 'patient') {
      extraInfo.abha = document.getElementById('regAbha')?.value.trim();
      extraInfo.village = document.getElementById('regVillage')?.value.trim();
      extraInfo.age = document.getElementById('regAge')?.value.trim() || 28;
      extraInfo.gender = document.getElementById('regGender')?.value || 'Female';
      extraInfo.bloodGroup = document.getElementById('regBlood')?.value || 'O+';
      extraInfo.conditions = document.getElementById('regConditions')?.value || 'General Health Checkup Active';
      extraInfo.emergencyContact = document.getElementById('regEmergency')?.value.trim() || '';
      extraInfo.facility = 'Kondapalli PHC';
    } else if (selectedRole === 'doctor') {
      extraInfo.license = document.getElementById('regLicense')?.value.trim();
      extraInfo.designation = document.getElementById('regSpec')?.value.trim() || 'Clinician';
      extraInfo.facility = document.getElementById('regHospital')?.value.trim() || 'Ibrahimpatnam CHC';
    } else if (selectedRole === 'worker') {
      extraInfo.workerId = document.getElementById('regWorkerId')?.value.trim();
      extraInfo.designation = 'Frontline Worker (' + (document.getElementById('regWard')?.value.trim() || 'Village Route') + ')';
      extraInfo.facility = document.getElementById('regPhc')?.value.trim() || 'Kondapalli PHC';
    }

    try {
      const user = authService.registerUser({
        name,
        phone,
        selectedRole,
        extraInfo
      });

      const roleMeta = authService.getRoleMetadata(selectedRole);
      showToast(`🎉 Registration Complete! Welcome ${name} to Swasthya Setu ${roleMeta.shortName} Portal.`, 'success');

      hideAuthOverlay();
      const defaultView = authService.getRoleDefaultView(selectedRole);
      if (typeof window.switchView === 'function') {
        window.switchView(defaultView);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  function checkViewAccess(targetView) {
    if (!authService.isAuthenticated()) {
      showPhoneLoginScreen();
      return false;
    }

    const activeRole = authService.getActiveRole();
    const isAllowed = authService.canAccessView(targetView, activeRole);

    if (!isAllowed) {
      showUnauthorizedModal(targetView);
      return false;
    }

    return true;
  }

  function showUnauthorizedModal(targetView) {
    const modal = document.getElementById('unauthorizedModal');
    if (!modal) return;

    const activeRole = authService.getActiveRole();
    const activeMeta = authService.getRoleMetadata(activeRole);
    const authorizedRolesForView = authService.getAuthorizedRolesForView(targetView);

    const messageEl = document.getElementById('unauthMessage');
    const badgeRow = document.getElementById('unauthBadgeRow');
    const switchBtn = document.getElementById('unauthSwitchBtn');

    messageEl.innerHTML = `
      You are currently logged in as <strong style="color:#ffffff;">${activeMeta.name}</strong>.
      This section is restricted and requires specific elevated permissions.
    `;

    badgeRow.innerHTML = `
      <span class="auth-role-badge ${activeMeta.badgeClass}">Active: ${activeMeta.shortName}</span>
    `;

    // If the user's account has an authorized role that CAN view this page, provide 1-click switch
    if (authorizedRolesForView.length > 0) {
      const targetRole = authorizedRolesForView[0];
      const targetMeta = authService.getRoleMetadata(targetRole);

      switchBtn.style.display = 'inline-flex';
      switchBtn.innerHTML = `<span>Switch to ${targetMeta.shortName} &amp; Open →</span>`;
      switchBtn.onclick = () => {
        modal.classList.remove('open');
        authService.setActiveRole(targetRole);
        showToast(`Switched active role to ${targetMeta.shortName}`, 'success');
        if (typeof window.switchView === 'function') {
          window.switchView(targetView);
        }
      };
    } else {
      switchBtn.style.display = 'none';
    }

    modal.classList.add('open');
  }

  // -------------------------------------------------------------
  // TOPBAR PROFILE & SWITCH-ROLE MENU
  // -------------------------------------------------------------
  function updateTopBarProfile(user, activeRole) {
    const chipContainer = document.getElementById('topbarProfileChipContainer');
    if (!chipContainer) return;

    if (!user || !user.isAuthenticated) {
      chipContainer.innerHTML = `
        <button class="auth-btn-primary" style="padding:6px 14px;min-height:34px;font-size:12px;" onclick="authUI.showLandingScreen()">
          <span>🔑 Sign In</span>
        </button>
      `;
      return;
    }

    const roleMeta = authService.getRoleMetadata(activeRole);
    const userRoles = user.roles || [];
    const isMultiRole = userRoles.length > 1;

    let switchRolesHtml = '';
    if (isMultiRole) {
      switchRolesHtml = `
        <div class="auth-dropdown-title">Switch Active Role</div>
        ${userRoles.map(rId => {
          const r = authService.getRoleMetadata(rId);
          const isActive = rId === activeRole;
          return `
            <button class="auth-dropdown-role-btn ${isActive ? 'active' : ''}" onclick="authUI.switchActiveRoleFromMenu('${rId}')">
              <span>${r.icon} ${r.shortName}</span>
              ${isActive ? '<span style="color:var(--auth-primary-bright);font-size:11px;">● Active</span>' : '<span style="font-size:11px;opacity:0.6;">Switch →</span>'}
            </button>
          `;
        }).join('')}
        <div style="height:1px;background:rgba(220,252,243,0.1);margin:10px 0;"></div>
      `;
    } else {
      switchRolesHtml = `
        <div class="auth-dropdown-title">Account Role</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:10px;padding:6px 8px;background:rgba(4,18,15,0.4);border-radius:8px;">
          ${roleMeta.icon} ${roleMeta.name} (Single Role)
        </div>
      `;
    }

    chipContainer.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;">
        <div class="auth-user-chip" id="authUserChip" onclick="authUI.toggleProfileDropdown(event)">
          <div class="auth-user-avatar">${user.avatar || 'U'}</div>
          <div class="auth-user-details">
            <span class="auth-user-name">${user.name.split(' ')[0]}</span>
            <span class="auth-user-role-badge">${roleMeta.shortName}${isMultiRole ? ' ▾' : ''}</span>
          </div>
        </div>
        <button class="btn-glass sm" onclick="authUI.handleLogout()" style="color:#f87171;min-height:34px;padding:6px 10px;font-size:11.5px;" title="Sign Out">
          <span>🚪 Exit</span>
        </button>
      </div>

        <div class="auth-profile-dropdown" id="authProfileDropdown" onclick="event.stopPropagation()">
          <div class="auth-dropdown-user-header">
            <strong style="font-size:13.5px;color:#ffffff;display:block;">${user.name}</strong>
            <small style="font-size:11px;color:var(--muted);display:block;">+91 ${user.phone}</small>
            <span class="auth-role-badge ${roleMeta.badgeClass}" style="margin-top:6px;">Current: ${roleMeta.badge}</span>
          </div>

          ${switchRolesHtml}

          <button class="auth-dropdown-logout-btn" onclick="authUI.handleLogout()">
            <span>🚪 Sign Out</span>
          </button>
        </div>
      </div>
    `;

    // Also update main stage title / eyebrow
    const topHeading = document.getElementById('topHeading');
    const topEyebrow = document.getElementById('topEyebrow');
    if (topHeading) topHeading.textContent = `Namaste, ${user.name}`;
    if (topEyebrow) topEyebrow.textContent = `Role: ${roleMeta.name} · ${user.facility || 'Kondapalli Grid'}`;
  }

  function toggleProfileDropdown(e) {
    if (e) e.stopPropagation();
    const menu = document.getElementById('authProfileDropdown');
    if (menu) {
      menu.classList.toggle('open');
    }
  }

  function closeProfileDropdown() {
    const menu = document.getElementById('authProfileDropdown');
    if (menu) menu.classList.remove('open');
  }

  function switchActiveRoleFromMenu(newRole) {
    closeProfileDropdown();
    try {
      authService.setActiveRole(newRole);
      renderRoleBasedNavigation(newRole);
      const roleMeta = authService.getRoleMetadata(newRole);
      showToast(`Switched active workspace to ${roleMeta.shortName}`, 'success');

      // Navigate to the role's default portal
      const defaultView = authService.getRoleDefaultView(newRole);
      if (typeof window.switchView === 'function') {
        window.switchView(defaultView);
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  }

  function handleLogout() {
    if (confirm('Are you sure you want to sign out?')) {
      closeProfileDropdown();
      authService.logoutUser();
      showToast('You have been logged out successfully.', 'info');
      showLandingScreen();
    }
  }

  function renderRoleBasedNavigation(activeRole) {
    const sidebarRail = document.querySelector('.sidebar-rail');
    if (!sidebarRail) return;

    // Find or create dynamic nav container inside sidebar rail
    let dynamicNavContainer = document.getElementById('roleDynamicNavContainer');
    if (!dynamicNavContainer) {
      dynamicNavContainer = document.createElement('div');
      dynamicNavContainer.id = 'roleDynamicNavContainer';
      dynamicNavContainer.className = 'role-dynamic-nav';

      const brandHeader = sidebarRail.querySelector('.brand-header');
      const railFooter = sidebarRail.querySelector('.rail-footer');
      if (brandHeader && railFooter) {
        sidebarRail.insertBefore(dynamicNavContainer, railFooter);
      } else {
        sidebarRail.appendChild(dynamicNavContainer);
      }
    }

    // Hide any legacy hardcoded nav items outside our container
    sidebarRail.querySelectorAll('.nav-group-title, .nav-btn').forEach(el => {
      if (!dynamicNavContainer.contains(el)) {
        el.style.display = 'none';
      }
    });

    let navHtml = '';
    let mobileNavHtml = '';

    if (activeRole === 'admin') {
      navHtml = `
        <div class="nav-group-title" data-i18n="nav_admin_desk">Admin Command · प्रशासन</div>
        <button class="nav-btn active" data-view="dashboard" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('overview');">
          <span class="nav-icon">👑</span><span data-i18n="nav_admin_overview">Command Center</span>
        </button>
        <button class="nav-btn" data-view="dashboard" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('staff');">
          <span class="nav-icon">👥</span><span data-i18n="nav_admin_staff">Staff &amp; Users</span>
        </button>
        <button class="nav-btn" data-view="dashboard" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('approvals');">
          <span class="nav-icon">🩺</span><span data-i18n="nav_admin_approvals">Doctor Approvals</span>
        </button>
        <button class="nav-btn" data-view="dashboard" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('heatmap');">
          <span class="nav-icon">🗺️</span><span data-i18n="nav_admin_heatmap">Outbreak Heatmap</span>
        </button>
        <button class="nav-btn" data-view="dashboard" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('supply');">
          <span class="nav-icon">📦</span><span data-i18n="nav_admin_supply">Drug Supply</span>
        </button>
        <button class="nav-btn" data-view="dashboard" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('beds');">
          <span class="nav-icon">🏥</span><span data-i18n="nav_admin_beds">Bed Grid &amp; Blood</span>
        </button>
      `;

      mobileNavHtml = `
        <button class="mobile-nav-item active" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('overview');">
          <span class="mobile-icon">👑</span><span>Command</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('staff');">
          <span class="mobile-icon">👥</span><span>Staff</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('dashboard'); if(window.adminController) adminController.switchTab('beds');">
          <span class="mobile-icon">🏥</span><span>Beds</span>
        </button>
        <button class="mobile-nav-item" onclick="authUI.handleLogout()" style="color:#f87171;">
          <span class="mobile-icon">🚪</span><span>Sign Out</span>
        </button>
      `;

    } else if (activeRole === 'doctor') {
      navHtml = `
        <div class="nav-group-title" data-i18n="nav_doctor_desk">Clinical Practice · चिकित्सा सेवा</div>
        <button class="nav-btn active" data-view="tele" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('overview');">
          <span class="nav-icon">🩺</span><span data-i18n="nav_doc_overview">Doctor Desk</span>
        </button>
        <button class="nav-btn" data-view="tele" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('queue');">
          <span class="nav-icon">⏱️</span><span data-i18n="nav_doc_queue">Consult Queue</span>
        </button>
        <button class="nav-btn" data-view="tele" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('video');">
          <span class="nav-icon">🎥</span><span data-i18n="nav_doc_video">Teleconsult HUD</span>
        </button>
        <button class="nav-btn" data-view="tele" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('preconsult');">
          <span class="nav-icon">📋</span><span data-i18n="nav_doc_emr">Vitals &amp; EMR</span>
        </button>
        <button class="nav-btn" data-view="tele" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('rx');">
          <span class="nav-icon">💊</span><span data-i18n="nav_doc_rx">Smart e-Prescription</span>
        </button>
        <button class="nav-btn" data-view="tele" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('emergency');">
          <span class="nav-icon">🚨</span><span data-i18n="nav_doc_emergency">ICU Bed Reservation</span>
        </button>
      `;

      mobileNavHtml = `
        <button class="mobile-nav-item active" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('overview');">
          <span class="mobile-icon">🩺</span><span>Desk</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('queue');">
          <span class="mobile-icon">⏱️</span><span>Queue</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('tele'); if(window.doctorController) doctorController.switchTab('rx');">
          <span class="mobile-icon">💊</span><span>Rx</span>
        </button>
        <button class="mobile-nav-item" onclick="authUI.handleLogout()" style="color:#f87171;">
          <span class="mobile-icon">🚪</span><span>Sign Out</span>
        </button>
      `;

    } else if (activeRole === 'worker') {
      navHtml = `
        <div class="nav-group-title" data-i18n="nav_asha_desk">Frontline Field Care · आशा दीदी</div>
        <button class="nav-btn active" data-view="worker" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('overview');">
          <span class="nav-icon">🤝</span><span data-i18n="nav_worker_overview">ASHA Desk</span>
        </button>
        <button class="nav-btn" data-view="worker" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('anc');">
          <span class="nav-icon">🤰</span><span data-i18n="nav_worker_anc">High-Risk ANC</span>
        </button>
        <button class="nav-btn" data-view="worker" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('immunizations');">
          <span class="nav-icon">👶</span><span data-i18n="nav_worker_uip">Child Vaccines</span>
        </button>
        <button class="nav-btn" data-view="worker" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('visits');">
          <span class="nav-icon">🗺️</span><span data-i18n="nav_worker_visits">Home Visits Route</span>
        </button>
        <button class="nav-btn" data-view="worker" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('vitals');">
          <span class="nav-icon">🩺</span><span data-i18n="nav_worker_vitals">Vital Entry</span>
        </button>
        <button class="nav-btn" data-view="worker" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('sync');">
          <span class="nav-icon">📶</span><span data-i18n="nav_worker_sync">Offline Sync</span>
        </button>
      `;

      mobileNavHtml = `
        <button class="mobile-nav-item active" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('overview');">
          <span class="mobile-icon">🤝</span><span>Desk</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('anc');">
          <span class="mobile-icon">🤰</span><span>ANC</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('worker'); if(window.workerController) workerController.switchTab('visits');">
          <span class="mobile-icon">🗺️</span><span>Visits</span>
        </button>
        <button class="mobile-nav-item" onclick="authUI.handleLogout()" style="color:#f87171;">
          <span class="mobile-icon">🚪</span><span>Sign Out</span>
        </button>
      `;

    } else {
      // Default: Patient Role
      navHtml = `
        <div class="nav-group-title" data-i18n="nav_patient_care">Patient Care · रोगी स्वास्थ्य</div>
        <button class="nav-btn active" data-view="home" onclick="switchView('home')">
          <span class="nav-icon">⌂</span><span data-i18n="nav_home">Home &amp; Journey</span>
        </button>
        <button class="nav-btn" data-view="triage" onclick="switchView('triage')">
          <span class="nav-icon">🩺</span><span data-i18n="nav_triage">3D Symptom Check</span>
        </button>
        <button class="nav-btn" data-view="appointments" onclick="switchView('appointments')">
          <span class="nav-icon">📅</span><span data-i18n="nav_appt">Queue &amp; Token</span>
        </button>
        <button class="nav-btn" data-view="records" onclick="switchView('records')">
          <span class="nav-icon">📋</span><span data-i18n="nav_records">Health Locker (ABHA)</span>
        </button>

        <div class="nav-group-title" data-i18n="nav_village_grid">Village Grid · ग्रामीण सेवा</div>
        <button class="nav-btn" data-view="sos" onclick="switchView('sos')">
          <span class="nav-icon">🚨</span><span data-i18n="nav_sos">Emergency 108 SOS</span>
        </button>
        <button class="nav-btn" data-view="medicines" onclick="switchView('medicines')">
          <span class="nav-icon">💊</span><span data-i18n="nav_meds">Jan Aushadhi &amp; Stock</span>
        </button>
        <button class="nav-btn" data-view="referrals" onclick="switchView('referrals')">
          <span class="nav-icon">⇄</span><span data-i18n="nav_referrals">Referral Ladder</span>
        </button>
        <button class="nav-btn" data-view="firstaid" onclick="switchView('firstaid')">
          <span class="nav-icon">🩹</span><span data-i18n="nav_firstaid">Visual First Aid</span>
        </button>
      `;

      mobileNavHtml = `
        <button class="mobile-nav-item active" onclick="switchView('home')">
          <span class="mobile-icon">⌂</span><span>Home</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('triage')">
          <span class="mobile-icon">🩺</span><span>Triage</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('sos')">
          <span class="mobile-icon">🚨</span><span>108 SOS</span>
        </button>
        <button class="mobile-nav-item" onclick="switchView('medicines')">
          <span class="mobile-icon">💊</span><span>Meds</span>
        </button>
        <button class="mobile-nav-item" onclick="authUI.handleLogout()" style="color:#f87171;">
          <span class="mobile-icon">🚪</span><span>Sign Out</span>
        </button>
      `;
    }

    dynamicNavContainer.innerHTML = navHtml;

    const mobileNav = document.querySelector('.mobile-bottom-nav');
    if (mobileNav) {
      mobileNav.innerHTML = mobileNavHtml;
    }

    // Apply i18n translations across new navigation nodes
    if (global.i18n && typeof global.i18n.translateDOM === 'function') {
      global.i18n.translateDOM();
    }
  }

  function hideAuthOverlay() {
    if (overlayEl) overlayEl.classList.add('hidden');
  }

  function openEmergencyDirect() {
    hideAuthOverlay();
    if (typeof window.switchView === 'function') {
      window.switchView('sos');
    }
    showToast('🚨 Emergency 108 Mode Activated', 'error');
  }

  function showToast(msg, type = 'info') {
    if (typeof window.toast === 'function') {
      window.toast(msg);
    } else {
      console.log(`[Toast ${type}]`, msg);
    }
  }

  function bindGlobalEvents() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#authUserChip')) {
        closeProfileDropdown();
      }
    });
  }

  // Export public interface
  global.authUI = {
    init: initAuthUI,
    showLandingScreen,
    showPhoneLoginScreen,
    fillDemoPhone,
    handleSendOTP,
    showOtpScreen,
    fillMockOtp,
    handleResendOTP,
    handleVerifyOTP,
    selectActiveRoleAndLogin,
    showAccountNotFoundScreen,
    showRegistrationScreen,
    generateRandomAbha,
    switchRegRole,
    handleRegistration,
    checkViewAccess,
    showUnauthorizedModal,
    toggleProfileDropdown,
    switchActiveRoleFromMenu,
    handleLogout,
    openEmergencyDirect
  };

  // Auto initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthUI);
  } else {
    initAuthUI();
  }

})(typeof window !== 'undefined' ? window : this);
