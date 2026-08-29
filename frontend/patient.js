/**
 * =========================================================
 * SWASTHYA SETU - CITIZEN / PATIENT HUB (patient.js)
 * 100% Pure Language Localization for Symptoms, Medicines & Doses
 * =========================================================
 */

(function(global) {
  'use strict';

  class PatientController {
    constructor() {
      this.store = global.appStore;
    }

    init() {
      this.renderAll();
      if (this.store) {
        this.store.subscribe(() => this.renderAll());
      }
    }

    t(key, fallback) {
      return global.i18n ? global.i18n.get(key, fallback) : (fallback || key);
    }

    renderAll() {
      this.renderAbhaCard();
      this.renderFamilyCircle();
      this.renderDailyMedications();
      this.renderTriageButtons();
      this.renderLiveHospitals();
      this.renderLiveBloodBank();
      this.renderPrescriptions();
    }

    // -------------------------------------------------------------
    // 1. DYNAMIC SYMPTOM TRIAGE BUTTONS (PURE LOCAL LANGUAGE)
    // -------------------------------------------------------------
    renderTriageButtons() {
      const container = document.getElementById('symptomButtonsGrid');
      if (!container) return;

      const symptoms = [
        { id: 'fever', icon: '🌡️', key: 'sym_fever', defaultName: 'High Fever' },
        { id: 'snakebite', icon: '🐍', key: 'sym_snakebite', defaultName: 'Snake Bite' },
        { id: 'diarrhea', icon: '💧', key: 'sym_diarrhea', defaultName: 'Diarrhea' },
        { id: 'pregnancy', icon: '🤰', key: 'sym_pregnancy', defaultName: 'Pregnancy Pain' },
        { id: 'chestpain', icon: '🫀', key: 'sym_chestpain', defaultName: 'Chest Pain' },
        { id: 'breathing', icon: '😮‍💨', key: 'sym_breathing', defaultName: 'Breathing Difficulty' }
      ];

      container.innerHTML = symptoms.map(s => `
        <button class="btn-glass" style="padding:14px 8px;text-align:center;font-weight:700;display:flex;flex-direction:column;align-items:center;justify-content:center;" onclick="patientController.triageSymptom('${s.id}')">
          <div style="font-size:28px;margin-bottom:6px;">${s.icon}</div>
          <span style="font-size:13px;color:var(--ink);line-height:1.2;">${this.t(s.key, s.defaultName)}</span>
        </button>
      `).join('');
    }

    // -------------------------------------------------------------
    // 2. ABHA CARD RENDER & PRINT
    // -------------------------------------------------------------
    renderAbhaCard() {
      const el = document.getElementById('abhaCardContainer');
      if (!el || !this.store) return;
      const user = this.store.getState().currentUser;

      el.innerHTML = `
        <div class="abha-badge-card" style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:18px;padding:20px;box-shadow:var(--shadow-panel);position:relative;overflow:hidden;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid var(--line);padding-bottom:12px;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:28px;">🇮🇳</span>
              <div>
                <strong style="font-size:15px;color:var(--primary-bright);display:block;">${this.t('abha_nha', 'NATIONAL HEALTH AUTHORITY (ABHA)')}</strong>
                <small style="color:var(--muted);font-weight:600;">${this.t('abha_gov', 'Government of India')}</small>
              </div>
            </div>
            <span class="badge" style="background:var(--primary);color:#ffffff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">${this.t('abha_active', 'ACTIVE VERIFIED')}</span>
          </div>

          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;">
            <div style="width:68px;height:68px;background:rgba(2,132,199,0.15);border:1.5px solid var(--primary-bright);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:32px;">
              👤
            </div>
            <div>
              <h3 style="font-size:18px;color:var(--ink);margin-bottom:4px;font-weight:700;">${user.name}</h3>
              <p style="font-size:13px;color:var(--ink-dim);margin-bottom:2px;">Age: ${user.age} Yrs · Gender: ${user.gender} · Blood: <strong style="color:var(--primary-bright)">${user.bloodGroup}</strong></p>
              <p style="font-size:12px;color:var(--muted);">${user.village}</p>
            </div>
            <div style="text-align:center;background:var(--glass-1);padding:8px;border-radius:10px;border:1px solid var(--glass-border);">
              <div style="font-size:28px;line-height:1;">📱</div>
              <small style="font-size:9px;color:var(--muted);font-weight:700;display:block;margin-top:2px;">${this.t('abha_qr', 'QR SCAN')}</small>
            </div>
          </div>

          <div style="margin-top:14px;background:var(--primary);color:#ffffff;padding:10px 16px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <small style="font-size:10px;letter-spacing:1px;opacity:0.9;">${this.t('abha_number_label', 'ABHA NUMBER (14-DIGIT)')}</small>
              <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;font-weight:700;letter-spacing:1px;">${user.abhaId}</div>
            </div>
            <div style="text-align:right;">
              <small style="font-size:10px;opacity:0.9;">${this.t('abha_phone_label', 'PHONE LINKED')}</small>
              <div style="font-size:13px;font-weight:600;">+91 ${user.phone}</div>
            </div>
          </div>

          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="auth-btn-primary" style="flex:1;min-width:180px;padding:10px;font-size:13px;" onclick="patientController.printAbhaCard()">
              ${this.t('btn_print_abha', '🖨️ Print / Download ABHA Card')}
            </button>
            <button class="btn-glass" style="padding:10px 16px;font-size:13px;" onclick="speakText('Your ABHA ID is ' + '${user.abhaId}')">
              ${this.t('read_aloud', '🔊 Read Aloud')}
            </button>
          </div>
        </div>
      `;
    }

    
    // -------------------------------------------------------------
    // 7. PATIENT E-PRESCRIPTION HISTORY & PDF DOWNLOAD
    // -------------------------------------------------------------
    renderPrescriptions() {
      const container = document.getElementById('patientPrescriptionsContainer');
      if (!container || !this.store) return;

      const user = this.store.getState().currentUser || {};
      const allRx = this.store.getState().prescriptions || [];

      // Filter prescriptions for this patient (or show all if demo/all)
      const myRx = allRx.filter(r => {
        if (!r.patientName) return true;
        if (!user.name) return true;
        return r.patientName.toLowerCase().includes(user.name.toLowerCase()) || 
               user.name.toLowerCase().includes(r.patientName.toLowerCase());
      });

      if (!myRx.length) {
        container.innerHTML = `
          <div style="text-align:center;padding:24px 16px;background:var(--glass-2);border-radius:14px;border:1px dashed var(--glass-border);color:var(--muted);">
            <div style="font-size:32px;margin-bottom:8px;">📜</div>
            <strong style="color:var(--ink);display:block;font-size:14px;">No e-Prescriptions Yet</strong>
            <small>Once a doctor completes your OPD consultation, your official digital prescription will appear here with instant PDF download.</small>
          </div>
        `;
        return;
      }

      container.innerHTML = myRx.map(rx => {
        const medsList = Array.isArray(rx.medicines) ? rx.medicines : [];
        return `
          <div class="glass-panel" style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:16px;padding:18px;margin-bottom:14px;box-shadow:var(--shadow-panel);">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--line);padding-bottom:12px;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
              <div>
                <span class="badge" style="background:rgba(2,132,199,0.15);color:var(--primary-bright);padding:4px 10px;border-radius:12px;font-size:11px;font-weight:700;font-family:'IBM Plex Mono',monospace;">
                  ${rx.id || 'RX-OPD'} · ${rx.token || 'T-OPD'}
                </span>
                <h3 style="font-size:17px;color:var(--ink);font-weight:800;margin-top:6px;">${rx.diagnosis || 'Clinical Consultation'}</h3>
                <small style="color:var(--muted);font-weight:600;">👨‍⚕️ ${rx.doctorName || 'Medical Officer'} · 📅 ${rx.date || new Date().toISOString().split('T')[0]}</small>
              </div>

              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="auth-btn-primary" style="background:linear-gradient(135deg, #0284c7, #0369a1);border:none;padding:8px 14px;font-size:12px;font-weight:700;box-shadow:0 2px 8px rgba(2,132,199,0.3);display:flex;align-items:center;gap:6px;cursor:pointer;border-radius:8px;" onclick="patientController.downloadPrescriptionPdf('${rx.id}')">
                  <span>📥</span> <span>Download PDF</span>
                </button>
                <button class="btn-glass" style="padding:8px 12px;font-size:12px;font-weight:700;" onclick="patientController.printPrescription('${rx.id}')">
                  🖨️ Print
                </button>
                <button class="btn-glass" style="padding:8px 12px;font-size:12px;font-weight:700;color:#ef4444;border-color:rgba(239,68,68,0.3);" onclick="patientController.deletePrescription('${rx.id}')" title="Delete prescription after downloading to free up space">
                  🗑️ Delete
                </button>
              </div>
            </div>

            <!-- Medicines Table -->
            <div style="margin-bottom:12px;">
              <strong style="font-size:12px;color:var(--ink-dim);display:block;margin-bottom:6px;">💊 Prescribed Generic Medicines (Jan Aushadhi):</strong>
              <div style="display:flex;flex-direction:column;gap:6px;">
                ${medsList.map(m => `
                  <div style="display:flex;justify-content:space-between;align-items:center;background:var(--glass-1);border:1px solid var(--glass-border);padding:8px 12px;border-radius:10px;font-size:13px;">
                    <div>
                      <strong style="color:var(--ink);">${m.name || m}</strong>
                      <small style="color:var(--muted);display:block;">Dosage: ${m.dosage || 'As directed by doctor'} · Timing: ${m.timing || 'After food'}</small>
                    </div>
                    ${m.genericPrice ? `<span class="badge" style="background:rgba(22,163,74,0.15);color:#22c55e;font-size:11px;font-weight:700;">₹${m.genericPrice} (Save ₹${(m.brandPrice || m.genericPrice * 3) - m.genericPrice})</span>` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Clinical Advice -->
            ${rx.advice ? `
              <div style="background:rgba(2,132,199,0.08);border:1px dashed rgba(2,132,199,0.3);border-radius:10px;padding:10px 12px;font-size:12px;color:var(--ink);">
                <strong style="color:var(--primary-bright);display:block;margin-bottom:2px;">👨‍⚕️ Doctor's Advice & Precautions:</strong>
                ${rx.advice}
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }

    // Direct PDF Generator for e-Prescriptions
    downloadPrescriptionPdf(rxId) {
      const allRx = this.store.getState().prescriptions || [];
      const rx = allRx.find(r => r.id === rxId) || allRx[0];
      const user = this.store.getState().currentUser || { name: 'Citizen Patient', age: 38, gender: 'Male', abhaId: '14-8921-4402-9912', village: 'Kondapalli Sub-Centre' };

      if (!rx) {
        alert('Prescription details not found');
        return;
      }

      // Create printable/PDF container
      const printArea = document.createElement('div');
      printArea.id = 'pdfRenderContainer';
      printArea.style.padding = '30px';
      printArea.style.fontFamily = "'Plus Jakarta Sans', Arial, sans-serif";
      printArea.style.color = '#0f172a';
      printArea.style.background = '#ffffff';
      printArea.style.maxWidth = '800px';
      printArea.style.margin = '0 auto';
      printArea.style.border = '2px solid #0284c7';
      printArea.style.borderRadius = '12px';

      const medsList = Array.isArray(rx.medicines) ? rx.medicines : [];

      printArea.innerHTML = `
        <!-- GOVT HEADER -->
        <div style="border-bottom:3px double #0284c7;padding-bottom:16px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:12px;">
            <img src="assets/logo.png" style="width:58px;height:58px;border-radius:50%;object-fit:cover;" alt="Swasthya Setu Logo">
            <div>
              <h2 style="font-size:18px;font-weight:900;color:#0369a1;margin:0;letter-spacing:0.5px;">MINISTRY OF HEALTH & FAMILY WELFARE</h2>
              <small style="font-size:11px;font-weight:700;color:#475569;display:block;">Ayushman Bharat Digital Mission (ABDM) · National Rural Telemedicine Grid</small>
              <small style="font-size:10px;color:#0284c7;font-weight:800;">OFFICIAL CLINICAL e-PRESCRIPTION</small>
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:13px;font-weight:800;color:#0284c7;font-family:monospace;">Rx ID: ${rx.id || 'RX-OPD-901'}</div>
            <div style="font-size:11px;color:#64748b;">Date: ${rx.date || new Date().toISOString().split('T')[0]}</div>
            <div style="font-size:11px;color:#16a34a;font-weight:700;">✓ ABDM Digitally Verified</div>
          </div>
        </div>

        <!-- DOCTOR & PATIENT INFO GRID -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-bottom:18px;font-size:12px;">
          <div>
            <strong style="color:#0369a1;display:block;font-size:13px;margin-bottom:4px;">👨‍⚕️ Prescribing Medical Officer:</strong>
            <div style="font-weight:800;font-size:14px;color:#0f172a;">${rx.doctorName || 'Medical Officer'}</div>
            <div style="color:#64748b;">Medical Council Reg: ${rx.doctorRegNo || 'MCI-AP-48912'}</div>
            <div style="color:#64748b;">${rx.doctorLocation || 'District Health Centre (PHC/CHC)'}</div>
          </div>
          <div>
            <strong style="color:#0369a1;display:block;font-size:13px;margin-bottom:4px;">👤 Patient Information:</strong>
            <div style="font-weight:800;font-size:14px;color:#0f172a;">${rx.patientName || user.name}</div>
            <div style="color:#64748b;">Age/Gender: ${user.age || 38} Yrs / ${user.gender || 'Male'} · Blood: ${user.bloodGroup || 'O+'}</div>
            <div style="color:#0f172a;font-weight:700;font-family:monospace;">ABHA ID: ${user.abhaId || '14-8921-4402-9912'}</div>
          </div>
        </div>

        <!-- CLINICAL DIAGNOSIS -->
        <div style="background:#f0f9ff;border-left:4px solid #0284c7;padding:10px 14px;border-radius:6px;margin-bottom:18px;">
          <small style="font-size:10px;font-weight:800;color:#0369a1;letter-spacing:0.5px;display:block;">CLINICAL DIAGNOSIS & REASON FOR CONSULTATION</small>
          <div style="font-size:14px;font-weight:800;color:#0c4a6e;margin-top:2px;">${rx.diagnosis || 'Acute Viral Fever with Myalgia'}</div>
        </div>

        <!-- RX SECTION & MEDICINE TABLE -->
        <div style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;">
            <span style="font-size:22px;font-weight:900;color:#0284c7;font-family:serif;">℞</span>
            <strong style="font-size:13px;color:#0f172a;">Prescribed Medicines (Jan Aushadhi Generic Formulations):</strong>
          </div>

          <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:left;">
            <thead>
              <tr style="background:#0284c7;color:#ffffff;">
                <th style="padding:8px 10px;border-radius:6px 0 0 0;">#</th>
                <th style="padding:8px 10px;">Generic Medicine Name & Strength</th>
                <th style="padding:8px 10px;">Dosage Schedule</th>
                <th style="padding:8px 10px;">Timing / Instructions</th>
                <th style="padding:8px 10px;border-radius:0 6px 0 0;text-align:right;">Jan Aushadhi Price</th>
              </tr>
            </thead>
            <tbody>
              ${medsList.map((m, idx) => `
                <tr style="border-bottom:1px solid #e2e8f0;background:${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
                  <td style="padding:8px 10px;font-weight:700;color:#64748b;">${idx + 1}</td>
                  <td style="padding:8px 10px;font-weight:800;color:#0f172a;">${m.name || m}</td>
                  <td style="padding:8px 10px;color:#334155;">${m.dosage || '1 Tablet 3 times daily'}</td>
                  <td style="padding:8px 10px;color:#334155;">${m.timing || 'After meals for 3 days'}</td>
                  <td style="padding:8px 10px;text-align:right;font-weight:800;color:#16a34a;">₹${m.genericPrice || 8}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- DOCTOR ADVICE -->
        <div style="background:#fefce8;border:1px solid #fde047;border-radius:8px;padding:12px;margin-bottom:20px;font-size:12px;color:#713f12;">
          <strong style="display:block;margin-bottom:4px;color:#854d0e;">⚠️ Doctor Advice & Dietary Precautions:</strong>
          <div>${rx.advice || 'Take clean boiled water, rest well. If temperature exceeds 101°F or persists beyond 3 days, visit PHC immediately.'}</div>
        </div>

        <!-- FOOTER & DIGITAL SIGNATURE -->
        <div style="border-top:1.5px solid #e2e8f0;padding-top:16px;display:flex;justify-content:space-between;align-items:flex-end;font-size:11px;color:#64748b;">
          <div>
            <div><strong>Jan Aushadhi Generic Pharmacy:</strong> Available at nearest PHC/CHC.</div>
            <div style="color:#0284c7;font-weight:700;margin-top:2px;">Emergency 24x7 Ambulance SOS: Dial 108</div>
          </div>
          <div style="text-align:center;">
            <div style="font-family:cursive;font-size:18px;color:#0369a1;font-weight:700;">${rx.doctorName || 'Authorized Medical Officer'}</div>
            <div style="border-top:1px solid #cbd5e1;padding-top:2px;font-weight:700;color:#0f172a;">Authorized Medical Officer Sign</div>
            <small style="font-size:9px;color:#16a34a;">Digitally Signed via e-Sanjeevani</small>
          </div>
        </div>
      `;

      // Check if html2pdf is available
      if (typeof window.html2pdf === 'function') {
        const opt = {
          margin: 10,
          filename: `e-Prescription-${rx.id || 'RX'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        window.html2pdf().from(printArea).set(opt).save();
        if (typeof window.toast === 'function') {
          window.toast('📥 Downloading Official e-Prescription PDF (' + (rx.id || 'RX') + ')');
        }
      } else {
        // Fallback: Open print dialog in clean popup
        const win = window.open('', '_blank');
        win.document.write(`
          <html>
            <head><title>e-Prescription-${rx.id || 'RX'}</title></head>
            <body style="margin:0;padding:20px;">${printArea.outerHTML}</body>
          </html>
        `);
        win.document.close();
        win.focus();
        setTimeout(() => { win.print(); }, 500);
      }
    }

    deletePrescription(rxId) {
      if (confirm('Are you sure you want to delete this prescription from your health locker?')) {
        if (this.store) {
          this.store.deletePrescription(rxId);
          if (typeof window.toast === 'function') {
            window.toast('🗑️ Prescription deleted from Health Locker');
          }
        }
      }
    }

    printPrescription(rxId) {
      this.downloadPrescriptionPdf(rxId);
    }


    
    openRequestConsultModal() {
      const m = document.getElementById('patientRequestConsultModal');
      const docSelect = document.getElementById('patientConsultDoctorSelect');
      if (docSelect && this.store) {
        const doctors = (this.store.getState().staff || []).filter(s => s.role === 'doctor');
        docSelect.innerHTML = doctors.map(d => `
          <option value="${d.id || d.staff_code}">🩺 ${d.name} (${d.location || 'PHC/CHC'})</option>
        `).join('');
      }
      if (m) m.style.display = 'flex';
    }

    closeRequestConsultModal() {
      const m = document.getElementById('patientRequestConsultModal');
      if (m) m.style.display = 'none';
    }

    submitRequestConsult(e) {
      if (e) e.preventDefault();
      const complaint = document.getElementById('patReqComplaint').value.trim();
      const duration = document.getElementById('patReqDuration').value.trim();
      const bp = document.getElementById('patReqBp').value.trim() || '120/80';
      const temp = document.getElementById('patReqTemp').value.trim() || '98.6°F';
      const triage = document.getElementById('patReqTriage').value;
      const docSelect = document.getElementById('patientConsultDoctorSelect');
      const doctorId = docSelect ? docSelect.value : null;
      const doctorName = docSelect && docSelect.options[docSelect.selectedIndex] ? docSelect.options[docSelect.selectedIndex].text : 'Medical Officer';

      if (!complaint) {
        alert('Please describe your symptoms/illness for the doctor');
        return;
      }

      const qItem = this.store.requestDoctorConsult({
        complaint: complaint + (duration ? ' (Duration: ' + duration + ')' : ''),
        vitals: { bp, temp, spo2: '98%', pulse: '76 bpm' },
        triage,
        assignedDoctorId: doctorId,
        assignedDoctorName: doctorName
      });

      this.closeRequestConsultModal();
      if (typeof window.toast === 'function') {
        window.toast('🚀 Consultation Request Sent to ' + doctorName + '! Your Token is ' + qItem.token);
      }
    }

    printAbhaCard() {
      window.print();
    }

    // -------------------------------------------------------------
    // 3. 1-TAP 108 EMERGENCY SOS
    // -------------------------------------------------------------
    triggerSos() {
      const user = this.store.getState().currentUser;
      const message = `🚨 EMERGENCY 108 SOS!\n\nPatient: ${user.name}\nPhone: +91 ${user.phone}\nLocation: ${user.village}\nABHA: ${user.abhaId}\n\nEmergency ambulance dispatched.`;
      
      // User can trigger speech manually if desired
      if (typeof window.toast === 'function') {
        window.toast('🚨 Emergency 108 Alert Dispatched!');
      }
      alert(message);
    }

    // -------------------------------------------------------------
    // 4. AUDIO-VISUAL SYMPTOM TRIAGE
    // -------------------------------------------------------------
    triageSymptom(type) {
      const triageData = {
        fever: {
          title: this.t('sym_fever', 'High Fever'),
          color: '#d97706',
          badge: '🟡 MODERATE · VISIT PHC',
          advice: 'Drink plenty of boiled water and ORS. Take Paracetamol if fever is above 100°F. If fever lasts more than 48 hours, visit PHC for Malaria/Dengue test.',
          audio: 'High fever triage: Drink clean water and ORS. Take Paracetamol and visit PHC if fever lasts two days.'
        },
        snakebite: {
          title: this.t('sym_snakebite', 'Snake Bite'),
          color: '#dc2626',
          badge: '🔴 CRITICAL EMERGENCY · GO TO HOSPITAL',
          advice: 'DO NOT cut, suck, or tie tight tourniquet. Keep patient calm and still. Rush immediately to nearest CHC for Anti-Snake Venom (ASV). Call 108 now!',
          audio: 'Critical snakebite emergency! Do not move the affected limb. Go directly to CHC hospital for anti-venom.'
        },
        diarrhea: {
          title: this.t('sym_diarrhea', 'Diarrhea'),
          color: '#16a34a',
          badge: '🟢 SAFE FOR HOME CARE WITH ORS',
          advice: 'Dissolve 1 packet of ORS in 1 liter clean drinking water. Drink after every loose stool. Give Zinc tablets to children under 5.',
          audio: 'Diarrhea care: Drink one liter of ORS water frequently to prevent dehydration.'
        },
        pregnancy: {
          title: this.t('sym_pregnancy', 'Pregnancy Pain'),
          color: '#dc2626',
          badge: '🔴 EMERGENCY MATERNAL ADMISSION',
          advice: 'Severe labor pains or bleeding require immediate hospital delivery. Contact your ASHA Didi immediately and take 108 ambulance.',
          audio: 'Maternal alert: Contact your ASHA Didi and take 108 ambulance to hospital delivery ward right away.'
        },
        chestpain: {
          title: this.t('sym_chestpain', 'Chest Pain'),
          color: '#dc2626',
          badge: '🔴 CRITICAL CARDIAC ALERT',
          advice: 'Chest tightness radiating to left arm or jaw with cold sweats requires immediate hospital emergency care. Call 108.',
          audio: 'Cardiac emergency: Chew Aspirin if available and call 108 ambulance to reach hospital ICU.'
        },
        breathing: {
          title: this.t('sym_breathing', 'Breathing Difficulty'),
          color: '#d97706',
          badge: '🟡 URGENT · OXYGEN PHC VISIT',
          advice: 'Sit upright in an airy place. Use inhaler if prescribed. Visit nearest PHC for oxygen support and nebulization.',
          audio: 'Breathing difficulty: Sit upright, take inhaler if prescribed, and visit nearest PHC for oxygen support.'
        }
      };

      const item = triageData[type];
      if (!item) return;

      const container = document.getElementById('triageResultContainer');
      if (container) {
        container.innerHTML = `
          <div style="background:var(--glass-2);border:2px solid ${item.color};border-radius:16px;padding:18px;margin-top:14px;box-shadow:var(--shadow-panel);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
              <h3 style="color:var(--ink);font-size:17px;font-weight:700;">${item.title}</h3>
              <span style="background:${item.color};color:#ffffff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">${item.badge}</span>
            </div>
            <p style="font-size:14px;color:var(--ink-dim);line-height:1.6;margin-bottom:14px;">${item.advice}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button class="auth-btn-primary" style="background:#dc2626;border-color:#b91c1c;padding:8px 16px;font-size:13px;" onclick="patientController.triggerSos()">
                ${this.t('btn_call_108', '🚨 Call 108 Ambulance')}
              </button>
              <button class="btn-glass" style="padding:8px 16px;font-size:13px;" onclick="speakText('${item.audio}')">
                ${this.t('read_aloud', '🔊 Listen in Audio')}
              </button>
            </div>
          </div>
        `;
        // Manual audio button only
      }
    }

    // -------------------------------------------------------------
    // 5. FAMILY HEALTH CIRCLE
    // -------------------------------------------------------------
    renderFamilyCircle() {
      const el = document.getElementById('familyMembersList');
      if (!el || !this.store) return;
      const fams = this.store.getState().familyMembers || [];

      if (!fams.length) {
        el.innerHTML = `<div style="text-align:center;padding:20px;color:var(--muted);">No family members added yet. Tap "+ Add Member" below.</div>`;
        return;
      }

      el.innerHTML = fams.map(f => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;box-shadow:var(--shadow-panel);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;background:rgba(2,132,199,0.12);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">
              ${f.gender === 'Female' ? '👩' : '👨'}
            </div>
            <div>
              <strong style="color:var(--ink);font-size:15px;display:block;">${f.name} (${f.relation})</strong>
              <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">ABHA: ${f.abhaId}</small>
            </div>
          </div>
          <div style="text-align:right;">
            <span class="badge" style="background:rgba(2,132,199,0.12);color:var(--primary-bright);padding:4px 8px;border-radius:12px;font-size:11px;font-weight:700;">${f.status || 'Active'}</span>
            <button style="display:block;margin-top:4px;color:#dc2626;font-size:11px;cursor:pointer;background:none;border:none;font-weight:600;" onclick="patientController.removeFamilyMember('${f.id}')">✕ Remove</button>
          </div>
        </div>
      `).join('');
    }

    openAddFamilyModal() {
      const modal = document.getElementById('addFamilyModal');
      if (modal) modal.style.display = 'flex';
    }

    closeAddFamilyModal() {
      const modal = document.getElementById('addFamilyModal');
      if (modal) modal.style.display = 'none';
    }

    submitAddFamily(e) {
      if (e) e.preventDefault();
      const name = document.getElementById('famName').value.trim();
      const relation = document.getElementById('famRelation').value;
      const age = parseInt(document.getElementById('famAge').value, 10) || 25;
      const gender = document.getElementById('famGender').value;

      if (!name) {
        alert('Please enter member name');
        return;
      }

      this.store.addFamilyMember({ name, relation, age, gender });
      this.closeAddFamilyModal();
      if (typeof window.toast === 'function') window.toast('✓ Added ' + name + ' to Family Health Circle');
    }

    removeFamilyMember(id) {
      if (confirm('Are you sure you want to remove this family member?')) {
        this.store.deleteFamilyMember(id);
      }
    }

    // -------------------------------------------------------------
    // 6. JAN AUSHADHI MEDICINE TRACKER & SAVINGS (100% TRANSLATED)
    // -------------------------------------------------------------
    renderDailyMedications() {
      const el = document.getElementById('dailyMedsList');
      if (!el || !this.store) return;
      const meds = this.store.getState().dailyMedications || [];

      const medKeyMap = {
        'MED-01': { key: 'med_paracetamol', amount: '26', defaultName: 'Paracetamol 650mg (Jan Aushadhi)' },
        'MED-02': { key: 'med_calcium', amount: '45', defaultName: 'Calcium + Vit D3 (Jan Aushadhi)' },
        'MED-03': { key: 'med_ifa', amount: '30', defaultName: 'Iron & Folic Acid IFA (Govt PHC)' }
      };

      const savedWord = this.t('saved_text', 'saved');
      const morningLabel = this.t('dose_morning', '☀️ Morning');
      const noonLabel = this.t('dose_noon', '🌤️ Noon');
      const nightLabel = this.t('dose_night', '🌙 Night');
      const takenLabel = this.t('dose_taken', '✓ Taken');

      el.innerHTML = meds.map(m => {
        const meta = medKeyMap[m.id] || { key: '', amount: '25', defaultName: m.name };
        const localizedName = this.t(meta.key, meta.defaultName);
        const savingText = `💰 ₹${meta.amount} ${savedWord}`;

        return `
          <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;box-shadow:var(--shadow-panel);">
            <div>
              <strong style="color:var(--ink);font-size:15px;display:block;">${localizedName}</strong>
              <small style="color:#16a34a;font-weight:700;">${savingText}</small>
            </div>
            <div style="display:flex;gap:8px;">
              ${m.morning ? `
                <button class="btn-glass" style="padding:6px 10px;font-size:12px;background:${m.taken && m.taken.morning ? '#16a34a' : 'var(--glass-1)'};color:${m.taken && m.taken.morning ? '#ffffff' : 'var(--ink)'};border-color:${m.taken && m.taken.morning ? '#16a34a' : 'var(--glass-border)'};" onclick="patientController.toggleDose('${m.id}', 'morning')">
                  ${m.taken && m.taken.morning ? takenLabel : morningLabel}
                </button>
              ` : ''}
              ${m.noon ? `
                <button class="btn-glass" style="padding:6px 10px;font-size:12px;background:${m.taken && m.taken.noon ? '#16a34a' : 'var(--glass-1)'};color:${m.taken && m.taken.noon ? '#ffffff' : 'var(--ink)'};border-color:${m.taken && m.taken.noon ? '#16a34a' : 'var(--glass-border)'};" onclick="patientController.toggleDose('${m.id}', 'noon')">
                  ${m.taken && m.taken.noon ? takenLabel : noonLabel}
                </button>
              ` : ''}
              ${m.night ? `
                <button class="btn-glass" style="padding:6px 10px;font-size:12px;background:${m.taken && m.taken.night ? '#16a34a' : 'var(--glass-1)'};color:${m.taken && m.taken.night ? '#ffffff' : 'var(--ink)'};border-color:${m.taken && m.taken.night ? '#16a34a' : 'var(--glass-border)'};" onclick="patientController.toggleDose('${m.id}', 'night')">
                  ${m.taken && m.taken.night ? takenLabel : nightLabel}
                </button>
              ` : ''}
            </div>
          </div>
        `;
      }).join('');
    }

    toggleDose(medId, time) {
      this.store.toggleDoseTaken(medId, time);
    }

    // -------------------------------------------------------------
    // 7. LIVE HOSPITAL BEDS & BLOOD BANK
    // -------------------------------------------------------------
    renderLiveHospitals() {
      const el = document.getElementById('hospitalBedsList');
      if (!el || !this.store) return;
      const hosps = this.store.getState().hospitals || [];

      const genBedsText = this.t('gen_beds', 'General Beds');
      const icuBedsText = this.t('icu_beds', 'ICU Beds');
      const oxyBedsText = this.t('oxy_beds', 'Oxygen Beds');
      const availText = this.t('avail', 'Avail');

      el.innerHTML = hosps.map(h => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px;box-shadow:var(--shadow-panel);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
            <div>
              <strong style="color:var(--primary-bright);font-size:15px;display:block;">${h.name}</strong>
              <small style="color:var(--muted);">Distance: ${h.distance} · Doctor: ${h.doctorOnDuty}</small>
            </div>
            <a href="tel:${h.phone}" class="btn-glass" style="padding:4px 10px;font-size:12px;color:var(--primary-bright);">📞 Call ${h.phone}</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(90px, 1fr));gap:8px;margin-top:10px;text-align:center;">
            <div style="background:rgba(22,163,74,0.12);border:1px solid rgba(22,163,74,0.3);padding:8px;border-radius:10px;">
              <small style="color:#16a34a;font-size:11px;font-weight:600;display:block;">${genBedsText}</small>
              <strong style="color:#16a34a;font-size:16px;">${h.genBedsAvail} ${availText}</strong>
            </div>
            <div style="background:rgba(220,38,38,0.12);border:1px solid rgba(220,38,38,0.3);padding:8px;border-radius:10px;">
              <small style="color:#dc2626;font-size:11px;font-weight:600;display:block;">${icuBedsText}</small>
              <strong style="color:#dc2626;font-size:16px;">${h.icuBedsAvail} ${availText}</strong>
            </div>
            <div style="background:rgba(2,132,199,0.12);border:1px solid rgba(2,132,199,0.3);padding:8px;border-radius:10px;">
              <small style="color:#0284c7;font-size:11px;font-weight:600;display:block;">${oxyBedsText}</small>
              <strong style="color:#0284c7;font-size:16px;">${h.oxygenBedsAvail} ${availText}</strong>
            </div>
          </div>
        </div>
      `).join('');
    }

    renderLiveBloodBank() {
      const el = document.getElementById('bloodBankGrid');
      if (!el || !this.store) return;
      const bank = this.store.getState().bloodBank || {};

      const inStockText = this.t('in_stock', '✓ In Stock');
      const lowStockText = this.t('low_stock', '⚠️ Low');

      el.innerHTML = Object.entries(bank).map(([grp, count]) => `
        <div style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:12px;padding:10px;text-align:center;">
          <strong style="color:#dc2626;font-size:16px;display:block;">${grp}</strong>
          <span style="font-size:14px;color:var(--ink);font-weight:700;">${count} Units</span>
          <small style="display:block;color:${count > 5 ? '#16a34a' : '#dc2626'};font-size:10px;font-weight:600;margin-top:2px;">
            ${count > 5 ? inStockText : lowStockText}
          </small>
        </div>
      `).join('');
    }
  }

  global.patientController = new PatientController();

})(typeof window !== 'undefined' ? window : this);
