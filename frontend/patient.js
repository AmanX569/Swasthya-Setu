/**
 * =========================================================
 * SWASTHYA SETU - CITIZEN / PATIENT HUB (patient.js)
 * 100% Standalone, Pure-Client Rural Care Center
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

    renderAll() {
      this.renderAbhaCard();
      this.renderFamilyCircle();
      this.renderDailyMedications();
      this.renderLiveHospitals();
      this.renderLiveBloodBank();
    }

    // -------------------------------------------------------------
    // 1. ABHA CARD RENDER & PRINT
    // -------------------------------------------------------------
    renderAbhaCard() {
      const el = document.getElementById('abhaCardContainer');
      if (!el || !this.store) return;
      const user = this.store.getState().currentUser;

      el.innerHTML = `
        <div class="abha-badge-card" style="background:var(--glass-2);border:1.5px solid var(--glass-border);border-radius:18px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,0.06);position:relative;overflow:hidden;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid var(--line);padding-bottom:12px;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:28px;">🇮🇳</span>
              <div>
                <strong style="font-size:16px;color:var(--primary);display:block;">NATIONAL HEALTH AUTHORITY (ABHA)</strong>
                <small style="color:var(--muted);font-weight:600;">Government of India · राष्ट्रीय स्वास्थ्य प्राधिकरण</small>
              </div>
            </div>
            <span class="badge" style="background:var(--primary);color:#ffffff;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">ACTIVE VERIFIED</span>
          </div>

          <div style="display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;">
            <div style="width:68px;height:68px;background:rgba(0,82,204,0.1);border:1.5px solid var(--primary);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:32px;">
              👤
            </div>
            <div>
              <h3 style="font-size:18px;color:var(--ink);margin-bottom:4px;">${user.name}</h3>
              <p style="font-size:13px;color:var(--ink-dim);margin-bottom:2px;">Age: ${user.age} Yrs · Gender: ${user.gender} · Blood: <strong>${user.bloodGroup}</strong></p>
              <p style="font-size:12px;color:var(--muted);">${user.village}</p>
            </div>
            <div style="text-align:center;background:var(--glass-1);padding:8px;border-radius:10px;border:1px solid var(--glass-border);">
              <div style="font-size:28px;line-height:1;">📱</div>
              <small style="font-size:9px;color:var(--muted);font-weight:700;display:block;margin-top:2px;">QR SCAN</small>
            </div>
          </div>

          <div style="margin-top:14px;background:var(--primary);color:#ffffff;padding:10px 16px;border-radius:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <small style="font-size:10px;letter-spacing:1px;opacity:0.9;">ABHA NUMBER (14-DIGIT)</small>
              <div style="font-family:'IBM Plex Mono',monospace;font-size:16px;font-weight:700;letter-spacing:1px;">${user.abhaId}</div>
            </div>
            <div style="text-align:right;">
              <small style="font-size:10px;opacity:0.9;">PHONE LINKED</small>
              <div style="font-size:13px;font-weight:600;">+91 ${user.phone}</div>
            </div>
          </div>

          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="auth-btn-primary" style="flex:1;min-width:180px;padding:10px;font-size:13px;" onclick="patientController.printAbhaCard()">
              🖨️ Print / Download ABHA Card
            </button>
            <button class="btn-glass" style="padding:10px 16px;font-size:13px;" onclick="speakText('Your ABHA ID is ' + '${user.abhaId}' + '. Valid for free healthcare across all government and empaneled hospitals.')">
              🔊 Read Aloud
            </button>
          </div>
        </div>
      `;
    }

    printAbhaCard() {
      window.print();
    }

    // -------------------------------------------------------------
    // 2. 1-TAP 108 EMERGENCY SOS
    // -------------------------------------------------------------
    triggerSos() {
      const user = this.store.getState().currentUser;
      const message = `🚨 EMERGENCY 108 SOS TRIGGERED!\n\nPatient: ${user.name}\nPhone: +91 ${user.phone}\nLocation: ${user.village}\nABHA: ${user.abhaId}\n\nAmbulance dispatched to your GPS location.`;
      
      speakText('Emergency 108 ambulance alert sent! Medical dispatch is contacting you now.');
      if (typeof window.toast === 'function') {
        window.toast('🚨 Emergency 108 Alert Sent to Ambulance Grid!');
      }
      alert(message);
    }

    // -------------------------------------------------------------
    // 3. AUDIO-VISUAL SYMPTOM TRIAGE (6 RURAL COMPLAINTS)
    // -------------------------------------------------------------
    triageSymptom(type) {
      const triageData = {
        fever: {
          title: '🌡️ High Fever & Chills (तेज बुखार)',
          color: '#d97706',
          badge: '🟡 MODERATE · VISIT PHC TODAY',
          advice: 'Drink plenty of boiled water and ORS. Take Paracetamol 650mg if fever is above 100°F. If fever lasts more than 48 hours, visit Kondapalli PHC for Malaria/Dengue blood test.',
          audio: 'High fever triage: Drink clean water and ORS. Take Paracetamol. Visit your local PHC if fever persists for two days.'
        },
        snakebite: {
          title: '🐍 Snakebite / Scorpion Sting (सांप का काटना)',
          color: '#dc2626',
          badge: '🔴 CRITICAL EMERGENCY · GO TO HOSPITAL IMMEDIATELY',
          advice: 'DO NOT cut, suck, or tie a tight tourniquet. Keep patient calm and completely still. Rush immediately to Ibrahimpatnam CHC or District Hospital for Anti-Snake Venom (ASV). Call 108 now!',
          audio: 'Critical snakebite emergency! Do not move the affected limb. Go directly to CHC hospital for anti-venom injection.'
        },
        diarrhea: {
          title: '💧 Diarrhea & Dehydration (दस्त व उल्टी)',
          color: '#16a34a',
          badge: '🟢 SAFE FOR HOME CARE WITH ORS',
          advice: 'Dissolve 1 packet of ORS in 1 liter clean drinking water. Drink after every loose stool. Give Zinc tablets to children under 5. If extreme lethargy or no urination for 6 hours, visit PHC.',
          audio: 'Diarrhea care: Drink one liter of ORS water frequently. Keep hydrated with coconut water and rice kanji.'
        },
        pregnancy: {
          title: '🤰 Pregnancy Labor / Bleeding (प्रसव दर्द)',
          color: '#dc2626',
          badge: '🔴 EMERGENCY MATERNAL ADMISSION',
          advice: 'Severe labor pains or bleeding require immediate hospital delivery. Contact Lakshmi Didi (ASHA) immediately and call 108 ambulance for direct transport to Maternity Ward.',
          audio: 'Maternal alert: Contact your ASHA Didi and take 108 ambulance to hospital delivery ward right away.'
        },
        chestpain: {
          title: '🫀 Severe Chest Pain (छाती में तेज दर्द)',
          color: '#dc2626',
          badge: '🔴 CRITICAL EMERGENCY · CARDIAC ALERT',
          advice: 'Chest tightness, pain radiating to left arm, and cold sweats are heart emergency signs. Chew 1 Aspirin tablet immediately if available and rush to District Hospital via 108.',
          audio: 'Cardiac emergency: Chew Aspirin if available and call 108 ambulance to reach hospital ICU.'
        },
        breathing: {
          title: '😮‍💨 Difficulty Breathing / Asthma (सांस की तकलीफ)',
          color: '#d97706',
          badge: '🟡 URGENT · OXYGEN PHC VISIT',
          advice: 'Sit upright in an airy place. Use Salbutamol inhaler if prescribed. Visit Kondapalli PHC immediately for oxygen support and nebulization.',
          audio: 'Breathing difficulty: Sit upright, take inhaler if prescribed, and visit nearest PHC for oxygen support.'
        }
      };

      const item = triageData[type];
      if (!item) return;

      const container = document.getElementById('triageResultContainer');
      if (container) {
        container.innerHTML = `
          <div style="background:var(--glass-1);border:2px solid ${item.color};border-radius:16px;padding:20px;margin-top:16px;box-shadow:0 6px 20px rgba(0,0,0,0.08);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
              <h3 style="color:var(--ink);font-size:18px;">${item.title}</h3>
              <span style="background:${item.color};color:#ffffff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:20px;">${item.badge}</span>
            </div>
            <p style="font-size:14px;color:var(--ink-dim);line-height:1.6;margin-bottom:16px;">${item.advice}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button class="auth-btn-primary" style="background:#dc2626;border-color:#b91c1c;padding:8px 16px;font-size:13px;" onclick="patientController.triggerSos()">
                🚨 Call 108 Ambulance Now
              </button>
              <button class="btn-glass" style="padding:8px 16px;font-size:13px;" onclick="speakText('${item.audio}')">
                🔊 Listen in Audio (बोलकर सुनें)
              </button>
            </div>
          </div>
        `;
        speakText(item.audio);
      }
    }

    // -------------------------------------------------------------
    // 4. FAMILY HEALTH CIRCLE
    // -------------------------------------------------------------
    renderFamilyCircle() {
      const el = document.getElementById('familyMembersList');
      if (!el || !this.store) return;
      const fams = this.store.getState().familyMembers || [];

      if (!fams.length) {
        el.innerHTML = `<div style="text-align:center;padding:24px;color:var(--muted);">No family members added yet. Tap "+ Add Family Member" below.</div>`;
        return;
      }

      el.innerHTML = fams.map(f => `
        <div style="background:var(--glass-1);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:42px;height:42px;background:rgba(0,82,204,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;">
              ${f.gender === 'Female' ? '👩' : '👨'}
            </div>
            <div>
              <strong style="color:var(--ink);font-size:15px;display:block;">${f.name} (${f.relation})</strong>
              <small style="color:var(--muted);font-family:'IBM Plex Mono',monospace;">ABHA: ${f.abhaId}</small>
            </div>
          </div>
          <div style="text-align:right;">
            <span class="badge" style="background:rgba(0,82,204,0.1);color:var(--primary);padding:4px 8px;border-radius:12px;font-size:11px;font-weight:600;">${f.status || 'Active'}</span>
            <button style="display:block;margin-top:4px;color:#dc2626;font-size:11px;cursor:pointer;background:none;border:none;" onclick="patientController.removeFamilyMember('${f.id}')">✕ Remove</button>
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
    // 5. JAN AUSHADHI MEDICINE TRACKER & SAVINGS
    // -------------------------------------------------------------
    renderDailyMedications() {
      const el = document.getElementById('dailyMedsList');
      if (!el || !this.store) return;
      const meds = this.store.getState().dailyMedications || [];

      el.innerHTML = meds.map(m => `
        <div style="background:var(--glass-1);border:1.5px solid var(--glass-border);border-radius:14px;padding:14px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <strong style="color:var(--ink);font-size:15px;display:block;">${m.name}</strong>
            <small style="color:#16a34a;font-weight:700;">💰 ${m.saving}</small>
          </div>
          <div style="display:flex;gap:8px;">
            ${m.morning ? `
              <button class="btn-glass" style="padding:6px 10px;font-size:12px;background:${m.taken && m.taken.morning ? '#16a34a' : 'transparent'};color:${m.taken && m.taken.morning ? '#ffffff' : 'var(--ink)'};" onclick="patientController.toggleDose('${m.id}', 'morning')">
                ☀️ ${m.taken && m.taken.morning ? '✓ Taken' : 'Morning'}
              </button>
            ` : ''}
            ${m.noon ? `
              <button class="btn-glass" style="padding:6px 10px;font-size:12px;background:${m.taken && m.taken.noon ? '#16a34a' : 'transparent'};color:${m.taken && m.taken.noon ? '#ffffff' : 'var(--ink)'};" onclick="patientController.toggleDose('${m.id}', 'noon')">
                🌤️ ${m.taken && m.taken.noon ? '✓ Taken' : 'Noon'}
              </button>
            ` : ''}
            ${m.night ? `
              <button class="btn-glass" style="padding:6px 10px;font-size:12px;background:${m.taken && m.taken.night ? '#16a34a' : 'transparent'};color:${m.taken && m.taken.night ? '#ffffff' : 'var(--ink)'};" onclick="patientController.toggleDose('${m.id}', 'night')">
                🌙 ${m.taken && m.taken.night ? '✓ Taken' : 'Night'}
              </button>
            ` : ''}
          </div>
        </div>
      `).join('');
    }

    toggleDose(medId, time) {
      this.store.toggleDoseTaken(medId, time);
    }

    // -------------------------------------------------------------
    // 6. LIVE HOSPITAL BEDS & BLOOD BANK
    // -------------------------------------------------------------
    renderLiveHospitals() {
      const el = document.getElementById('hospitalBedsList');
      if (!el || !this.store) return;
      const hosps = this.store.getState().hospitals || [];

      el.innerHTML = hosps.map(h => `
        <div style="background:var(--glass-1);border:1.5px solid var(--glass-border);border-radius:14px;padding:16px;margin-bottom:12px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
            <div>
              <strong style="color:var(--primary);font-size:15px;display:block;">${h.name}</strong>
              <small style="color:var(--muted);">Distance: ${h.distance} · Doctor: ${h.doctorOnDuty}</small>
            </div>
            <a href="tel:${h.phone}" class="btn-glass" style="padding:4px 10px;font-size:12px;color:var(--primary);">📞 Call ${h.phone}</a>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(90px, 1fr));gap:8px;margin-top:10px;text-align:center;">
            <div style="background:rgba(22,163,74,0.08);border:1px solid rgba(22,163,74,0.3);padding:8px;border-radius:10px;">
              <small style="color:#166534;font-size:11px;display:block;">General</small>
              <strong style="color:#16a34a;font-size:16px;">${h.genBedsAvail} Avail</strong>
            </div>
            <div style="background:rgba(220,38,38,0.08);border:1px solid rgba(220,38,38,0.3);padding:8px;border-radius:10px;">
              <small style="color:#991b1b;font-size:11px;display:block;">ICU</small>
              <strong style="color:#dc2626;font-size:16px;">${h.icuBedsAvail} Avail</strong>
            </div>
            <div style="background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.3);padding:8px;border-radius:10px;">
              <small style="color:#075985;font-size:11px;display:block;">Oxygen</small>
              <strong style="color:#0284c7;font-size:16px;">${h.oxygenBedsAvail} Avail</strong>
            </div>
          </div>
        </div>
      `).join('');
    }

    renderLiveBloodBank() {
      const el = document.getElementById('bloodBankGrid');
      if (!el || !this.store) return;
      const bank = this.store.getState().bloodBank || {};

      el.innerHTML = Object.entries(bank).map(([grp, count]) => `
        <div style="background:var(--glass-1);border:1.5px solid var(--glass-border);border-radius:12px;padding:10px;text-align:center;">
          <strong style="color:#dc2626;font-size:16px;display:block;">${grp}</strong>
          <span style="font-size:14px;color:var(--ink);font-weight:700;">${count} Units</span>
          <small style="display:block;color:${count > 5 ? '#16a34a' : '#dc2626'};font-size:10px;font-weight:600;margin-top:2px;">
            ${count > 5 ? '✓ In Stock' : '⚠️ Low'}
          </small>
        </div>
      `).join('');
    }
  }

  global.patientController = new PatientController();

})(typeof window !== 'undefined' ? window : this);
