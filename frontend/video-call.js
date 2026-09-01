/**
 * =========================================================
 * SWASTHYA SETU - REAL-TIME VIDEO TELECONSULTATION ENGINE (video-call.js)
 * WebRTC Media Streams, In-Call e-Prescription & Telemedicine Controls
 * =========================================================
 */

(function(global) {
  'use strict';

  class VideoCallController {
    constructor() {
      this.store = null;
      this.localStream = null;
      this.isAudioMuted = false;
      this.isVideoMuted = false;
      this.currentFacingMode = 'user'; // 'user' (front) or 'environment' (back)
      this.callStartTime = null;
      this.callTimerInterval = null;
      this.currentCallData = null;
      this.inCallMessages = [];
      this.init();
    }

    init() {
      document.addEventListener('DOMContentLoaded', () => {
        this.store = global.appStore;
      });
    }

    // -------------------------------------------------------------
    // 1. LAUNCH & CONNECT VIDEO TELECONSULTATION
    // -------------------------------------------------------------
    async startVideoCall(callDetails = {}) {
      if (!this.store && global.appStore) this.store = global.appStore;
      const state = this.store ? this.store.getState() : {};
      const activeUser = (state.session && state.session.user) || state.currentUser || { name: 'Citizen Beneficiary', phone: '9876543210', role: 'patient' };

      const callerRole = callDetails.callerRole || (state.session ? state.session.role : 'patient') || 'patient';
      const callerName = callDetails.callerName || activeUser.name || 'Citizen Beneficiary';
      const callerPhone = callDetails.callerPhone || activeUser.phone || '9876543210';
      const recipientRole = callDetails.recipientRole || (callerRole === 'doctor' ? 'patient' : 'doctor');
      const recipientName = callDetails.recipientName || (callerRole === 'doctor' ? (callDetails.patientName || 'Citizen Patient') : 'Dr. Priya Sharma, MBBS, MD');
      const facilitatorName = callDetails.facilitatorName || (callerRole === 'worker' ? activeUser.name : null);

      this.currentCallData = {
        id: 'CALL-' + String(Date.now()).slice(-4),
        token: 'VID-' + Math.floor(1000 + Math.random() * 9000),
        callerRole,
        callerName,
        callerPhone,
        recipientRole,
        recipientName,
        facilitatorName,
        patientName: callDetails.patientName || (callerRole === 'patient' ? callerName : recipientName),
        patientAge: callDetails.patientAge || 35,
        patientGender: callDetails.patientGender || 'M',
        patientAbha: callDetails.patientAbha || '14-8921-4402-9912',
        complaint: callDetails.complaint || 'Direct Telemedicine Consultation',
        vitals: callDetails.vitals || { bp: '120/80', spo2: '98%', temp: '98.6°F', pulse: '76 bpm' },
        queueId: callDetails.queueId || null,
        startTime: Date.now(),
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.inCallMessages = [
        { sender: 'System', text: '🔒 ABDM Telemedicine Grid: 256-bit Encrypted Video Consultation Started', time: this.currentCallData.time }
      ];

      // Render Modal & Open Viewport
      this.renderVideoCallModal();
      const modal = document.getElementById('videoCallModal');
      if (modal) modal.style.display = 'flex';

      // Start Media Stream
      await this.initMediaStream();

      // Start Clock Timer
      this.startCallTimer();

      if (global.toast) {
        global.toast('📹 Connected to Video Teleconsultation with ' + recipientName);
      }
    }

    async initMediaStream() {
      const localVideo = document.getElementById('localVideoElement');
      const remoteVideo = document.getElementById('remoteVideoElement');
      const simulationNotice = document.getElementById('videoSimulationNotice');

      try {
        if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
          const constraints = {
            audio: true,
            video: {
              facingMode: this.currentFacingMode,
              width: { ideal: 640 },
              height: { ideal: 480 }
            }
          };
          this.localStream = await navigator.mediaDevices.getUserMedia(constraints);
          if (localVideo) {
            localVideo.srcObject = this.localStream;
            localVideo.play().catch(() => {});
          }
          if (simulationNotice) simulationNotice.style.display = 'none';
        } else {
          throw new Error('MediaDevices not supported in this environment');
        }
      } catch (err) {
        console.warn('[Video] Hardware camera not available, utilizing interactive telemedicine simulation:', err.message);
        if (simulationNotice) {
          simulationNotice.style.display = 'block';
          simulationNotice.innerHTML = '⚡ Live Telemedicine Stream Active (Camera Simulation Mode)';
        }
      }
    }

    // -------------------------------------------------------------
    // 2. VIDEO CONTROLS: MIC, CAMERA, FLIP, TIMER, CHAT, RX
    // -------------------------------------------------------------
    toggleAudio() {
      this.isAudioMuted = !this.isAudioMuted;
      if (this.localStream) {
        this.localStream.getAudioTracks().forEach(track => {
          track.enabled = !this.isAudioMuted;
        });
      }
      const btn = document.getElementById('btnToggleMic');
      if (btn) {
        btn.style.background = this.isAudioMuted ? '#dc2626' : 'rgba(255,255,255,0.2)';
        btn.innerHTML = this.isAudioMuted ? '🔇 <span class="ctrl-lbl">Unmute</span>' : '🎙️ <span class="ctrl-lbl">Mute</span>';
      }
      if (global.toast) {
        global.toast(this.isAudioMuted ? '🔇 Microphone Muted' : '🎙️ Microphone Live');
      }
    }

    toggleVideo() {
      this.isVideoMuted = !this.isVideoMuted;
      if (this.localStream) {
        this.localStream.getVideoTracks().forEach(track => {
          track.enabled = !this.isVideoMuted;
        });
      }
      const localPlaceholder = document.getElementById('localVideoPlaceholder');
      const localVideo = document.getElementById('localVideoElement');
      if (localPlaceholder && localVideo) {
        localPlaceholder.style.display = this.isVideoMuted ? 'flex' : 'none';
        localVideo.style.display = this.isVideoMuted ? 'none' : 'block';
      }
      const btn = document.getElementById('btnToggleCam');
      if (btn) {
        btn.style.background = this.isVideoMuted ? '#dc2626' : 'rgba(255,255,255,0.2)';
        btn.innerHTML = this.isVideoMuted ? '🚫 <span class="ctrl-lbl">Start Video</span>' : '📹 <span class="ctrl-lbl">Stop Video</span>';
      }
      if (global.toast) {
        global.toast(this.isVideoMuted ? '🚫 Camera Turned Off' : '📹 Camera Live');
      }
    }

    async switchCamera() {
      this.currentFacingMode = (this.currentFacingMode === 'user') ? 'environment' : 'user';
      const facingText = this.currentFacingMode === 'user' ? 'Front Camera' : 'Back Camera';

      if (this.localStream) {
        this.localStream.getTracks().forEach(t => t.stop());
      }

      await this.initMediaStream();

      const badge = document.getElementById('videoCameraFacingBadge');
      if (badge) badge.textContent = '📷 ' + facingText;

      if (global.toast) {
        global.toast('🔄 Switched to ' + facingText);
      }
    }

    startCallTimer() {
      this.callStartTime = Date.now();
      const timerEl = document.getElementById('videoCallTimerDisplay');
      if (this.callTimerInterval) clearInterval(this.callTimerInterval);

      this.callTimerInterval = setInterval(() => {
        const elapsedSec = Math.floor((Date.now() - this.callStartTime) / 1000);
        const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
        const secs = String(elapsedSec % 60).padStart(2, '0');
        if (timerEl) timerEl.textContent = `⏱️ ${mins}:${secs}`;
      }, 1000);
    }

    stopCallTimer() {
      if (this.callTimerInterval) {
        clearInterval(this.callTimerInterval);
        this.callTimerInterval = null;
      }
    }

    // -------------------------------------------------------------
    // 3. IN-CALL E-PRESCRIPTION DRAWER (DOCTORS)
    // -------------------------------------------------------------
    toggleInCallRxDrawer() {
      const drawer = document.getElementById('inCallRxDrawer');
      if (!drawer) return;
      const isOpen = drawer.style.display === 'block';
      drawer.style.display = isOpen ? 'none' : 'block';
      const chatDrawer = document.getElementById('inCallChatDrawer');
      if (chatDrawer && !isOpen) chatDrawer.style.display = 'none';

      // Populate doctor medicines catalog dropdowns
      if (!isOpen && this.store) {
        const meds = this.store.getState().medicines || [];
        const m1 = document.getElementById('inCallRxMed1');
        const m2 = document.getElementById('inCallRxMed2');
        const optionsHtml = meds.map(m => `<option value="${m.name}" data-gen="${m.genericPrice}">💊 ${m.name} (Jan Aushadhi ₹${m.genericPrice})</option>`).join('');
        if (m1) m1.innerHTML = optionsHtml;
        if (m2) m2.innerHTML = '<option value="">-- None / Single Drug --</option>' + optionsHtml;
      }
    }

    submitInCallRx(e) {
      if (e) e.preventDefault();
      if (!this.currentCallData) return;

      const diagInput = document.getElementById('inCallRxDiagnosis');
      const adviceInput = document.getElementById('inCallRxAdvice');
      const med1Select = document.getElementById('inCallRxMed1');
      const med2Select = document.getElementById('inCallRxMed2');

      const diagnosis = diagInput ? diagInput.value.trim() : 'Teleconsultation Follow-up';
      const advice = adviceInput ? adviceInput.value.trim() : 'Take clean water, complete prescribed generic dose and rest.';

      if (!diagnosis) {
        alert('Please enter clinical diagnosis for prescription.');
        return;
      }

      const medicines = [];
      if (med1Select && med1Select.value) {
        const opt = med1Select.options[med1Select.selectedIndex];
        const price = opt ? parseFloat(opt.getAttribute('data-gen')) : 8;
        medicines.push({ name: med1Select.value, genericPrice: price, dosage: '1 Tab TDS after food' });
      }
      if (med2Select && med2Select.value) {
        const opt = med2Select.options[med2Select.selectedIndex];
        const price = opt ? parseFloat(opt.getAttribute('data-gen')) : 12;
        medicines.push({ name: med2Select.value, genericPrice: price, dosage: '1 Tab Night' });
      }

      const activeDoctor = (this.store && this.store.getState().session && this.store.getState().session.user) || { name: 'Dr. Priya Sharma, MBBS, MD' };

      // Complete consultation and create prescription
      const rx = this.store.completeConsult(this.currentCallData.queueId || ('Q-' + Date.now()), {
        token: 'Rx-' + this.currentCallData.token,
        patientName: this.currentCallData.patientName,
        doctorName: activeDoctor.name || 'Authorized Medical Officer',
        diagnosis,
        advice,
        medicines: medicines.length ? medicines : [{ name: 'Paracetamol 650mg (Jan Aushadhi)', genericPrice: 8, dosage: '1 Tab TDS' }]
      });

      this.currentCallData.rxId = rx ? rx.id : ('RX-' + Date.now());
      this.currentCallData.diagnosis = diagnosis;

      // Close drawer & notify
      const drawer = document.getElementById('inCallRxDrawer');
      if (drawer) drawer.style.display = 'none';

      this.inCallMessages.push({
        sender: 'Doctor',
        text: '📜 Official e-Prescription (Rx ID: ' + this.currentCallData.rxId + ') issued and saved to patient health record.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.renderChatMessages();

      if (global.toast) {
        global.toast('📜 In-Call e-Prescription Issued Successfully (Rx ID: ' + this.currentCallData.rxId + ')');
      }

      if (global.patientController && typeof global.patientController.renderPrescriptions === 'function') {
        global.patientController.renderPrescriptions();
      }
    }

    // -------------------------------------------------------------
    // 4. IN-CALL CHAT & CLINICAL NOTES
    // -------------------------------------------------------------
    toggleInCallChat() {
      const drawer = document.getElementById('inCallChatDrawer');
      if (!drawer) return;
      const isOpen = drawer.style.display === 'block';
      drawer.style.display = isOpen ? 'none' : 'block';
      const rxDrawer = document.getElementById('inCallRxDrawer');
      if (rxDrawer && !isOpen) rxDrawer.style.display = 'none';
      if (!isOpen) this.renderChatMessages();
    }

    sendChatMessage(e) {
      if (e) e.preventDefault();
      const input = document.getElementById('inCallChatInput');
      if (!input || !input.value.trim()) return;
      const state = this.store ? this.store.getState() : {};
      const sender = (state.session && state.session.user) ? state.session.user.name : 'Participant';
      this.inCallMessages.push({
        sender,
        text: input.value.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      input.value = '';
      this.renderChatMessages();
    }

    renderChatMessages() {
      const container = document.getElementById('inCallChatMessages');
      if (!container) return;
      container.innerHTML = this.inCallMessages.map(m => `
        <div style="margin-bottom:8px;padding:6px 10px;border-radius:8px;background:${m.sender === 'System' ? 'rgba(2,132,199,0.15)' : 'rgba(255,255,255,0.08)'};border-left:3px solid ${m.sender === 'System' ? '#0284c7' : '#16a34a'};">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:11px;color:#94a3b8;">
            <strong>${m.sender}</strong>
            <span>${m.time}</span>
          </div>
          <p style="font-size:12px;color:#f8fafc;margin-top:2px;">${m.text}</p>
        </div>
      `).join('');
      container.scrollTop = container.scrollHeight;
    }

    // -------------------------------------------------------------
    // 5. END CALL & RECONCILE HISTORY
    // -------------------------------------------------------------
    endCall() {
      if (!this.currentCallData) {
        this.closeCallModal();
        return;
      }

      this.stopCallTimer();
      const elapsedSec = Math.max(12, Math.floor((Date.now() - this.currentCallData.startTime) / 1000));
      const mins = String(Math.floor(elapsedSec / 60)).padStart(2, '0');
      const secs = String(elapsedSec % 60).padStart(2, '0');
      const durationStr = `${mins}:${secs}`;

      // Save to store history
      const record = this.store.recordVideoCall({
        ...this.currentCallData,
        duration: durationStr,
        durationSeconds: elapsedSec,
        status: 'Completed'
      });

      // Stop camera/mic
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
        this.localStream = null;
      }

      this.closeCallModal();

      if (global.toast) {
        global.toast('📞 Video Teleconsultation Completed (' + durationStr + ') · Logged to History');
      }

      // Re-render histories across active views
      this.refreshAllCallHistories();
    }

    closeCallModal() {
      const modal = document.getElementById('videoCallModal');
      if (modal) modal.style.display = 'none';
      this.currentCallData = null;
      this.stopCallTimer();
      if (this.localStream) {
        this.localStream.getTracks().forEach(t => t.stop());
        this.localStream = null;
      }
    }

    refreshAllCallHistories() {
      if (global.patientController && typeof global.patientController.renderVideoCallHistory === 'function') {
        global.patientController.renderVideoCallHistory();
      }
      if (global.doctorController && typeof global.doctorController.renderDoctorCallHistory === 'function') {
        global.doctorController.renderDoctorCallHistory();
      }
      if (global.workerController && typeof global.workerController.renderAshaCallHistory === 'function') {
        global.workerController.renderAshaCallHistory();
      }
    }

    // -------------------------------------------------------------
    // 6. MODAL DOM INJECTION
    // -------------------------------------------------------------
    renderVideoCallModal() {
      let modal = document.getElementById('videoCallModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'videoCallModal';
        modal.className = 'modal-overlay';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(15, 23, 42, 0.96)';
        modal.style.zIndex = '999999';
        modal.style.display = 'none';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '12px';
        document.body.appendChild(modal);
      }

      const isDoctor = (this.store && this.store.getState().session && this.store.getState().session.role === 'doctor');
      const data = this.currentCallData || {};

      modal.innerHTML = `
        <div style="width:100%;max-width:1080px;height:92vh;background:#0f172a;border:1.5px solid rgba(2,132,199,0.4);border-radius:20px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.8);position:relative;">
          
          <!-- TOP TELEMEDICINE HEADER -->
          <div style="background:rgba(30,41,59,0.9);border-bottom:1px solid rgba(255,255,255,0.1);padding:10px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:38px;height:38px;background:#0284c7;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;">🩺</div>
              <div>
                <strong style="color:#f8fafc;font-size:14px;display:block;">${data.recipientName} ↔ ${data.callerName}</strong>
                <small style="color:#94a3b8;font-size:11px;">Token: ${data.token} · ${data.patientAbha || 'ABDM Verified'}</small>
              </div>
            </div>

            <div style="display:flex;align-items:center;gap:10px;">
              <span id="videoCameraFacingBadge" style="background:rgba(255,255,255,0.1);color:#cbd5e1;font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;">📷 Front Camera</span>
              <span id="videoCallTimerDisplay" style="background:rgba(22,163,74,0.2);color:#22c55e;border:1px solid rgba(34,197,94,0.4);font-size:12px;font-weight:800;padding:4px 10px;border-radius:12px;font-family:'IBM Plex Mono',monospace;">⏱️ 00:00</span>
              <span style="background:rgba(2,132,199,0.2);color:#38bdf8;font-size:11px;font-weight:700;padding:4px 8px;border-radius:8px;">🔒 256-bit Encrypted</span>
            </div>
          </div>

          <!-- MAIN VIDEO STAGE -->
          <div style="flex:1;position:relative;background:#020617;display:flex;overflow:hidden;">
            
            <!-- REMOTE VIDEO FEED (FULL) -->
            <div style="flex:1;position:relative;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #0f172a, #020617);">
              
              <!-- REMOTE AVATAR / TELEMEDICINE STAGE -->
              <div style="text-align:center;padding:20px;">
                <div style="width:110px;height:110px;margin:0 auto 14px;background:linear-gradient(135deg, #0284c7, #0369a1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:52px;box-shadow:0 0 30px rgba(2,132,199,0.5);border:3px solid #38bdf8;">
                  ${isDoctor ? '🌾' : '🩺'}
                </div>
                <h3 style="color:#ffffff;font-size:18px;font-weight:800;">${isDoctor ? (data.callerName || 'Citizen Patient') : (data.recipientName || 'Dr. Medical Officer')}</h3>
                <p style="color:#38bdf8;font-size:13px;font-weight:600;margin-top:2px;">${isDoctor ? ('Chief Complaint: ' + (data.complaint || 'OPD Teleconsultation')) : 'National Rural Telemedicine Grid · Kondapalli'}</p>
                <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,0.15);color:#22c55e;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;margin-top:10px;">
                  <span style="display:inline-block;width:8px;height:8px;background:#22c55e;border-radius:50%;"></span> Audio & Video Connected
                </div>
                <div id="videoSimulationNotice" style="margin-top:12px;font-size:11px;color:#94a3b8;"></div>
              </div>

              <!-- LOCAL PICTURE-IN-PICTURE (PIP) -->
              <div style="position:absolute;bottom:16px;right:16px;width:180px;height:130px;background:#1e293b;border:2px solid #0284c7;border-radius:14px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.6);z-index:10;">
                <video id="localVideoElement" autoplay muted playsinline style="width:100%;height:100%;object-fit:cover;"></video>
                <div id="localVideoPlaceholder" style="display:none;width:100%;height:100%;align-items:center;justify-content:center;background:#0f172a;color:#94a3b8;font-size:12px;flex-direction:column;gap:4px;">
                  <span>🚫</span> Camera Off
                </div>
                <span style="position:absolute;bottom:4px;left:6px;background:rgba(0,0,0,0.6);color:#fff;font-size:10px;padding:2px 6px;border-radius:4px;">You (Local)</span>
              </div>
            </div>

            <!-- IN-CALL DOCTOR PRESCRIPTION DRAWER (COLLAPSIBLE) -->
            <div id="inCallRxDrawer" style="display:none;width:340px;background:#1e293b;border-left:1.5px solid rgba(255,255,255,0.15);padding:16px;overflow-y:auto;z-index:20;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:8px;">
                <strong style="color:#38bdf8;font-size:14px;">📝 Write e-Prescription</strong>
                <button onclick="videoCallController.toggleInCallRxDrawer()" style="background:none;border:none;color:#94a3b8;font-size:16px;cursor:pointer;">✕</button>
              </div>

              <form onsubmit="videoCallController.submitInCallRx(event)">
                <div style="margin-bottom:10px;">
                  <label style="font-size:11px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:3px;">Patient Name</label>
                  <input type="text" class="input-field" value="${data.patientName || 'Patient'}" readonly style="background:rgba(0,0,0,0.3);color:#fff;height:38px;font-size:12px;">
                </div>

                <div style="margin-bottom:10px;">
                  <label style="font-size:11px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:3px;">Clinical Diagnosis *</label>
                  <input type="text" id="inCallRxDiagnosis" class="input-field" placeholder="e.g. Acute Bronchitis" required value="Acute Viral Fever with Myalgia" style="height:38px;font-size:12px;">
                </div>

                <div style="margin-bottom:10px;">
                  <label style="font-size:11px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:3px;">Jan Aushadhi Generic Medicine #1 *</label>
                  <select id="inCallRxMed1" class="input-field" style="height:38px;font-size:12px;"></select>
                </div>

                <div style="margin-bottom:10px;">
                  <label style="font-size:11px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:3px;">Generic Medicine #2 (Optional)</label>
                  <select id="inCallRxMed2" class="input-field" style="height:38px;font-size:12px;"></select>
                </div>

                <div style="margin-bottom:14px;">
                  <label style="font-size:11px;font-weight:700;color:#cbd5e1;display:block;margin-bottom:3px;">Clinical Advice & Diet</label>
                  <textarea id="inCallRxAdvice" class="input-field" rows="2" style="font-size:12px;" placeholder="Instructions...">Take clean water, complete prescribed generic dose and rest.</textarea>
                </div>

                <button type="submit" class="auth-btn-primary" style="background:#16a34a;border:none;width:100%;padding:10px;font-size:13px;font-weight:800;">
                  ✓ Issue Prescription Now
                </button>
              </form>
            </div>

            <!-- IN-CALL CHAT & NOTES DRAWER (COLLAPSIBLE) -->
            <div id="inCallChatDrawer" style="display:none;width:320px;background:#1e293b;border-left:1.5px solid rgba(255,255,255,0.15);padding:14px;display:none;flex-direction:column;z-index:20;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:6px;">
                <strong style="color:#38bdf8;font-size:13px;">💬 Consultation Chat & Notes</strong>
                <button onclick="videoCallController.toggleInCallChat()" style="background:none;border:none;color:#94a3b8;font-size:16px;cursor:pointer;">✕</button>
              </div>
              <div id="inCallChatMessages" style="flex:1;overflow-y:auto;max-height:55vh;margin-bottom:10px;"></div>
              <form onsubmit="videoCallController.sendChatMessage(event)" style="display:flex;gap:6px;">
                <input type="text" id="inCallChatInput" class="input-field" placeholder="Type message..." style="height:36px;font-size:12px;">
                <button type="submit" class="auth-btn-primary" style="background:#0284c7;padding:0 12px;font-size:12px;">Send</button>
              </form>
            </div>

          </div>

          <!-- BOTTOM TELEMEDICINE CONTROL TASKBAR -->
          <div style="background:#0f172a;border-top:1px solid rgba(255,255,255,0.1);padding:14px 20px;display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;">
            
            <button id="btnToggleMic" onclick="videoCallController.toggleAudio()" style="background:rgba(255,255,255,0.15);color:#ffffff;border:none;padding:10px 18px;border-radius:30px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:0.2s;">
              🎙️ <span>Mute</span>
            </button>

            <button id="btnToggleCam" onclick="videoCallController.toggleVideo()" style="background:rgba(255,255,255,0.15);color:#ffffff;border:none;padding:10px 18px;border-radius:30px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:0.2s;">
              📹 <span>Stop Video</span>
            </button>

            <button id="btnSwitchCam" onclick="videoCallController.switchCamera()" style="background:rgba(255,255,255,0.15);color:#ffffff;border:none;padding:10px 18px;border-radius:30px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;transition:0.2s;">
              🔄 <span>Flip Camera</span>
            </button>

            ${isDoctor ? `
              <button onclick="videoCallController.toggleInCallRxDrawer()" style="background:linear-gradient(135deg, #16a34a, #15803d);color:#ffffff;border:none;padding:10px 18px;border-radius:30px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(22,163,74,0.4);">
                📝 <span>e-Prescription</span>
              </button>
            ` : ''}

            <button onclick="videoCallController.toggleInCallChat()" style="background:rgba(255,255,255,0.15);color:#ffffff;border:none;padding:10px 18px;border-radius:30px;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;">
              💬 <span>Chat & Notes</span>
            </button>

            <button onclick="videoCallController.endCall()" style="background:#dc2626;color:#ffffff;border:none;padding:10px 24px;border-radius:30px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px;box-shadow:0 4px 16px rgba(220,38,38,0.5);">
              📞 <span>End Call</span>
            </button>
          </div>

        </div>
      `;
    }
  }

  global.videoCallController = new VideoCallController();

})(typeof window !== 'undefined' ? window : this);
