/**
 * =========================================================
 * SWASTHYA SETU - 24x7 AI CLINICAL HEALTH BOT & SYMPTOM GUIDE
 * (Swasthya AI Sahayak / स्वास्थय AI सहायक)
 * Instant Triage, First-Aid, Danger Red Flags & Home Care
 * =========================================================
 */

(function(global) {
  'use strict';

  // Comprehensive Clinical Knowledgebase for Rural & Emergency Telemedicine
  const CLINICAL_KB = [
    {
      keywords: ['fever', 'temperature', 'bukhar', 'jwaram', 'chills', 'hot body', 'shivering', '102', '103', '101', 'pyrexia'],
      title: 'High Fever & Hyperpyrexia',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · HOME CARE & PHC MONITORING',
      severityColor: '#d97706',
      summary: 'Fever is the body\'s natural defense mechanism fighting infection. Immediate temperature reduction and hydration are crucial.',
      steps: [
        '**Cold/Tepid Sponging**: Apply a cloth soaked in normal tap water (not ice cold) on forehead, neck, armpits, and groin to rapidly bring down body heat.',
        '**Hydration**: Drink plenty of fluids — coconut water, lemon water, thin dal soup, or warm water with a pinch of salt.',
        '**Loose Clothing**: Dress the patient in light, breathable cotton clothes. Do not wrap in heavy blankets.',
        '**Temperature Monitoring**: Check oral or armpit temperature every 2 hours.'
      ],
      medicines: [
        '**Paracetamol 500mg/650mg** (PMBJP Jan Aushadhi: ₹1.50 per strip) — 1 tablet every 6–8 hours after food for adults.',
        '**ORS Oral Rehydration Salts** (Jan Aushadhi: ₹4.00) — to replenish electrolytes.'
      ],
      redFlags: [
        'Temperature exceeding 103°F (39.4°C) not responding to medication.',
        'Seizures / Fits (Febrile convulsion), especially in children under 5.',
        'Severe headache, neck stiffness, or inability to bend neck forward.',
        'Persistent vomiting, extreme drowsiness, or petechial purple skin rash.'
      ],
      suggestedQuestions: [
        'Is the fever accompanied by shivering or chills?',
        'How many days has the fever been present?',
        'Are there any skin rashes, joint pains, or cough?'
      ]
    },
    {
      keywords: ['snake', 'snakebite', 'bite', 'venom', 'saap', 'paamu', 'cobra', 'viper', 'krait'],
      title: 'Snake Bite Emergency Protocol',
      severity: 'critical',
      severityLabel: '🔴 CRITICAL EMERGENCY · IMMEDIATE 108 AMBULANCE',
      severityColor: '#dc2626',
      summary: 'All snake bites in India must be treated as potentially venomous medical emergencies requiring Anti-Snake Venom (ASV) at nearest CHC/Hospital.',
      steps: [
        '**Immobilize Immediately**: Keep the victim completely calm and still. Movement accelerates venom absorption into the bloodstream.',
        '**Keep Below Heart Level**: Position the bitten limb below the level of the heart.',
        '**Remove Constrictive Items**: Remove rings, bangles, watches, and tight clothing before swelling starts.',
        '**DO NOT DO**: Do NOT cut the wound, do NOT suck the venom, do NOT apply tourniquets or ice, and do NOT apply herbal pastes.'
      ],
      medicines: [
        '**Polyvalent Anti-Snake Venom (ASV)** — Administered exclusively at Government PHC / CHC hospitals via IV drip.'
      ],
      redFlags: [
        'Drooping eyelids (Ptosis), difficulty swallowing or breathing.',
        'Bleeding from gums, nose, or bite puncture marks.',
        'Severe localized swelling spreading rapidly up the limb.',
        'Slurred speech, muscle weakness, or paralysis.'
      ],
      suggestedQuestions: [
        'When did the bite occur (how many minutes ago)?',
        'Can you describe the snake (color, shape, markings)?',
        'Is there active bleeding or difficulty in swallowing?'
      ]
    },
    {
      keywords: ['diarrhea', 'loose motion', 'motions', 'dast', 'vidhivulu', 'dehydration', 'watery stool', 'stomach loose', 'cholera'],
      title: 'Acute Diarrhea & Dehydration Care',
      severity: 'moderate',
      severityLabel: '🟢 MILD TO MODERATE · ORS & ZINC THERAPY',
      severityColor: '#16a34a',
      summary: 'Dehydration from fluid loss is the primary danger in diarrhea. Continuous oral rehydration is lifesaving.',
      steps: [
        '**Prepare WHO-ORS Solution**: Dissolve 1 full sachet of WHO-ORS in exactly 1 Liter of clean drinking water. Drink 200ml after every loose stool.',
        '**Home Rehydration Fluids**: Rice kanji with salt, coconut water, buttermilk, and light vegetable soup.',
        '**Zinc Supplementation**: For children under 5, give 20mg Zinc tablet daily for 14 days to regenerate intestinal lining.',
        '**Continue Feeding**: Do NOT stop food. Give light, digestible meals (khichdi, curd-rice, bananas, boiled potatoes).'
      ],
      medicines: [
        '**WHO-ORS Sachet 21.8g** (Jan Aushadhi: ₹4.50 per pack).',
        '**Zinc Sulfate 20mg Tablets** (Jan Aushadhi: ₹1.20 per strip).',
        '**Probiotic Spores Capsule / Sachet** (Jan Aushadhi: ₹3.50).'
      ],
      redFlags: [
        'Sunken eyes, extreme thirst, dry tongue, or absence of urine for >6 hours.',
        'Blood or mucus in stool (Dysentery).',
        'Persistent vomiting making oral fluid intake impossible.',
        'Extreme lethargy, confusion, or floppy limpness in infants.'
      ],
      suggestedQuestions: [
        'Are there any signs of blood in the stool?',
        'Is the patient able to retain oral fluids without vomiting?',
        'What is the frequency of loose motions per day?'
      ]
    },
    {
      keywords: ['chest', 'heart', 'cardiac', 'chest pain', 'sineme dard', 'chhati', 'gunde noppi', 'heart attack', 'angina', 'left arm pain'],
      title: 'Acute Chest Pain & Cardiac Alert',
      severity: 'critical',
      severityLabel: '🔴 CRITICAL CARDIAC ALERT · CALL 108 IMMEDIATELY',
      severityColor: '#dc2626',
      summary: 'Severe chest tightness or pressure radiating to left arm/jaw can indicate acute myocardial infarction (heart attack). Time is heart muscle.',
      steps: [
        '**Call 108 Emergency**: Immediately request an Advanced Life Support (ALS) Ambulance with ECG monitor.',
        '**Rest in Semi-Sitting Position**: Help the patient sit down with knees bent and back supported (W-position) to reduce cardiac workload.',
        '**Loosen Tight Clothing**: Unbutton collar, belt, and chest wear for maximum airflow.',
        '**Aspirin First-Aid**: If conscious and not allergic to aspirin, chew one 300mg/325mg Disprin/Aspirin tablet with a sip of water.'
      ],
      medicines: [
        '**Aspirin 75mg / 150mg / 325mg (Soluble)** (Jan Aushadhi: ₹0.80 per strip) — Anti-platelet emergency loading.',
        '**Sorbitrate (Isosorbide Dinitrate 5mg)** — Sublingual only if previously prescribed by a cardiologist.'
      ],
      redFlags: [
        'Pain radiating to left shoulder, left arm, neck, jaw, or upper back.',
        'Associated cold profuse sweating, breathlessness, dizziness, or fainting.',
        'Feeling of impending doom or intense crushing chest heaviness.'
      ],
      suggestedQuestions: [
        'Does the pain radiate to your left arm or jaw?',
        'Is there accompanying cold sweating or shortness of breath?',
        'Does the patient have a history of hypertension or diabetes?'
      ]
    },
    {
      keywords: ['breath', 'breathing', 'asthma', 'suffocation', 'wheezing', 'shortness of breath', 'saans', 'dam', 'oopiri'],
      title: 'Respiratory Distress & Asthma Wheezing',
      severity: 'critical',
      severityLabel: '🔴 HIGH URGENCY · PHC OXYGEN & NEBULIZATION',
      severityColor: '#dc2626',
      summary: 'Inability to breathe comfortably requires immediate bronchodilator therapy and oxygen saturation (SpO2) evaluation.',
      steps: [
        '**Sit Upright**: Never allow the patient to lie flat. Sit leaning slightly forward with hands on knees (tripod position).',
        '**Inhaler / Rotahaler**: If patient has a prescribed rescue inhaler (Salbutamol/Asthalin), administer 2–4 puffs with a spacer immediately.',
        '**Fresh Air Circulation**: Open all windows and doors. Keep bystanders away to prevent panic.',
        '**Visit Nearest PHC / CHC**: Head to the nearest health centre for SpO2 monitoring and oxygen concentrator support.'
      ],
      medicines: [
        '**Salbutamol 100mcg Inhaler** (Jan Aushadhi: ₹45.00 vs ₹180 market).',
        '**Budesonide 0.5mg Respules** for nebulization (Jan Aushadhi: ₹12.00).'
      ],
      redFlags: [
        'Bluish discoloration of lips, tongue, or fingertips (Cyanosis).',
        'Inability to speak full sentences without gasping for breath.',
        'Retraction of ribs/neck muscles during breathing (intercostal indrawing).',
        'SpO2 pulse oximeter reading dropping below 92%.'
      ],
      suggestedQuestions: [
        'Is there audible whistling or wheezing sound from chest?',
        'Do you have an available pulse oximeter to check oxygen %?',
        'Is this a known history of asthma or sudden onset?'
      ]
    },
    {
      keywords: ['pregnancy', 'labour', 'pregnant', 'garbh', 'prasav', 'contrations', 'water break', 'amniotic', 'bleeding pregnancy', 'delivery'],
      title: 'Maternal Labour & Pregnancy Emergency',
      severity: 'critical',
      severityLabel: '🔴 MATERNAL EMERGENCY · DISPATCH 108 AMBULANCE',
      severityColor: '#dc2626',
      summary: 'Active labour pains, leaking fluids, or vaginal bleeding in pregnancy require institutional delivery at 24x7 FRU/CHC.',
      steps: [
        '**Call 108 & ASHA Lead**: Alert your local ASHA worker and request immediate 108 Emergency maternal transport.',
        '**Left Lateral Position**: Have the mother lie on her left side to optimize placental blood flow and oxygen to the baby.',
        '**Pack Mother-Child Kit**: Keep MCP Card (Maternal & Child Protection), ABHA card, clean clothes, and baby wraps ready.',
        '**Calm & Slow Breathing**: Guide deep rhythmic breathing during contractions.'
      ],
      medicines: [
        '**Iron & Folic Acid (IFA) Tablets** (Supplied free at PHC).',
        '**Calcium 500mg + Vitamin D3** (Jan Aushadhi: ₹4.50 per strip).'
      ],
      redFlags: [
        'Vaginal bleeding or sudden gush of clear/green amniotic fluid.',
        'Severe headache, blurring of vision, or high blood pressure (Eclampsia).',
        'Decreased or absent fetal movements in the last 12 hours.',
        'Severe continuous lower abdominal pain.'
      ],
      suggestedQuestions: [
        'How many weeks or months pregnant is the mother?',
        'How frequent are the labour contractions (minutes apart)?',
        'Has there been any water breakage or vaginal bleeding?'
      ]
    },
    {
      keywords: ['vomit', 'vomiting', 'nausea', 'ulti', 'vamthulu', 'throwing up', 'puking'],
      title: 'Nausea, Vomiting & Gastric Distress',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · SIPS OF HYDRATION & ANTI-EMETIC',
      severityColor: '#d97706',
      summary: 'Frequent vomiting depletes stomach electrolytes and causes rapid exhaustion. Small, frequent sips prevent nausea triggers.',
      steps: [
        '**Rest the Stomach**: Avoid large gulps of water immediately after vomiting. Wait 15 minutes, then take 1 teaspoon of water or ORS every 5 minutes.',
        '**Ginger or Mint Infusion**: Warm water infused with crushed ginger or mint leaves soothes gastric contractions.',
        '**Bland Diet**: When vomiting stops for 4 hours, introduce clear soups, toast, or boiled rice with a pinch of salt.',
        '**Avoid Triggers**: Stay away from oily, spicy, dairy, or heavily seasoned food.'
      ],
      medicines: [
        '**Ondansetron 4mg (Mouth Dissolving)** (Jan Aushadhi: ₹3.00 per strip) — Take 30 mins before meals.',
        '**Domperidone 10mg + Pantoprazole 40mg** (Jan Aushadhi: ₹12.00 per strip) — For acidity-induced vomiting.'
      ],
      redFlags: [
        'Vomiting blood (coffee-ground appearance) or green bile.',
        'Inability to hold any liquid down for more than 12 hours.',
        'Severe right lower quadrant abdominal pain (suspected Appendicitis).',
        'Confusion, extreme weakness, or high fever with stiff neck.'
      ],
      suggestedQuestions: [
        'How many episodes of vomiting occurred today?',
        'Is there any accompanying abdominal pain or fever?',
        'Is the vomit containing food, bile, or blood?'
      ]
    },
    {
      keywords: ['headache', 'head pain', 'migraine', 'sar dard', 'tala noppi', 'temple pain', 'dizziness'],
      title: 'Severe Headache & Migraine Management',
      severity: 'mild',
      severityLabel: '🟢 MILD TO MODERATE · REST & HYDRATION',
      severityColor: '#16a34a',
      summary: 'Tension headaches, dehydration, and migraine respond well to rest, hydration, and mild analgesics.',
      steps: [
        '**Dark, Quiet Room**: Rest in a dark, quiet, well-ventilated room to relieve sensory strain.',
        '**Hydration**: Drink 2 large glasses of cool water immediately.',
        '**Cold/Warm Compress**: Apply a cool damp cloth or ice pack over forehead and temples.',
        '**Gentle Temple Massage**: Light circular pressure on temples and neck base relieves muscle tension.'
      ],
      medicines: [
        '**Paracetamol 500mg + Caffeine** (Jan Aushadhi: ₹1.80 per strip).',
        '**Naproxen 250mg / Ibuprofen 400mg** (Jan Aushadhi: ₹3.00 per strip) — Take after food.'
      ],
      redFlags: [
        'Sudden, explosive "thunderclap" headache (worst headache of life).',
        'Headache accompanied by weakness in one arm/leg, facial drooping, or slurred speech (Stroke alert).',
        'Headache following head injury or trauma.',
        'Headache with high fever, neck stiffness, and confusion.'
      ],
      suggestedQuestions: [
        'Is the headache on one side or the entire head?',
        'Are you experiencing sensitivity to light or nausea?',
        'Did the headache come on gradually or suddenly within seconds?'
      ]
    },
    {
      keywords: ['cut', 'wound', 'bleeding', 'injury', 'chot', 'rakta', 'ghav', 'trauma', 'burn', 'jalan'],
      title: 'Wound Bleeding & Burn First-Aid',
      severity: 'moderate',
      severityLabel: '🟡 URGENT FIRST AID · WOUND HYGIENE',
      severityColor: '#d97706',
      summary: 'Controlling blood loss and preventing infection through clean water washing are critical first-aid steps.',
      steps: [
        '**Direct Pressure**: Apply firm, continuous pressure directly over the wound using a clean cloth or sterile gauze for 10 full minutes.',
        '**Elevate the Wound**: Keep the injured part raised above heart level to decrease blood flow to the injury.',
        '**Clean with Running Water**: Gently wash the wound with clean drinking water to remove dirt. Do NOT apply dirt, cow dung, or turmeric.',
        '**For Burns**: Cool immediately under running tap water for 15 minutes. Do NOT break blisters.'
      ],
      medicines: [
        '**Povidone Iodine 5% Ointment** (Jan Aushadhi: ₹14.00 vs ₹60 market).',
        '**Tetanus Toxoid (TT) Injection** — Within 24 hours at nearest PHC if not vaccinated in last 5 years.'
      ],
      redFlags: [
        'Pulsating or spurting bright red blood that does not stop after 10 minutes of direct pressure.',
        'Deep gaping wound requiring surgical stitches.',
        'Numbness or loss of sensation beyond the cut area.',
        'Burn covering a large area, face, hands, or groin.'
      ],
      suggestedQuestions: [
        'Is the bleeding stopping with direct pressure?',
        'When did the person receive their last Tetanus (TT) shot?',
        'Is the injury caused by a rusty metal or animal bite?'
      ]
    },
    {
      keywords: ['dengue', 'malaria', 'mosquito', 'platelet', 'body ache', 'backache', 'eye pain'],
      title: 'Vector-Borne Disease (Dengue / Malaria) Signs',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · COMPLETE BLOOD COUNT (CBC) REQUIRED',
      severityColor: '#d97706',
      summary: 'Dengue and Malaria present with sudden high fever, retro-orbital eye pain, and severe bone aches.',
      steps: [
        '**Complete Blood Count (CBC) & Platelet Test**: Get a rapid malaria card test and CBC done at your nearest PHC/CHC.',
        '**Strict Rest & Hydration**: Drink 3–4 liters of fluids daily (tender coconut water, ORS, pomegranate juice, soups).',
        '**DO NOT TAKE NSAIDs**: Do NOT take Aspirin, Ibuprofen, or Brufen as they increase bleeding risks in dengue. ONLY use Paracetamol for fever.',
        '**Mosquito Nets**: Sleep under insecticide-treated bed nets to avoid spreading to family members.'
      ],
      medicines: [
        '**Paracetamol 500mg** (Jan Aushadhi: ₹1.50) — Safe for fever in dengue/malaria.',
        '**Chloroquine / Artemisinin Combo (ACT)** — ONLY after confirmed laboratory malaria test under doctor supervision.'
      ],
      redFlags: [
        'Red pin-prick spots (Petechiae) on skin or spontaneous gum/nose bleeding.',
        'Severe persistent abdominal pain with continuous vomiting.',
        'Platelet count dropping below 50,000 / µL.',
        'Extreme fatigue, dizziness, or cold clammy hands and feet.'
      ],
      suggestedQuestions: [
        'Are you having severe pain behind the eyeballs or backache?',
        'Have you noticed any red spots on the skin or nosebleeds?',
        'Has a blood test (CBC / Malaria card) been conducted?'
      ]
    }
  ];

  class AiHealthBotController {
    constructor() {
      this.messages = [];
      this.isTyping = false;
      this.initDefaultChat();
    }

    initDefaultChat() {
      this.messages = [
        {
          sender: 'ai',
          text: 'Namaste! I am your **24x7 Swasthya AI Clinical Assistant**. If our doctors are busy or you need immediate guidance, describe your symptoms below or tap any quick symptom pill above. I\'ll provide instant triage assessment, first-aid steps, home remedies, and Jan Aushadhi medicine guidance.',
          time: this.getFormattedTime(),
          actions: []
        }
      ];
    }

    getFormattedTime() {
      const d = new Date();
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    renderChat() {
      const container = document.getElementById('aiChatMessagesContainer');
      if (!container) return;

      container.innerHTML = this.messages.map((m, idx) => {
        if (m.sender === 'user') {
          return `
            <div style="display:flex;justify-content:flex-end;margin-bottom:12px;">
              <div style="max-width:80%;background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;padding:12px 16px;border-radius:18px 18px 4px 18px;box-shadow:0 2px 8px rgba(2,132,199,0.25);">
                <div style="font-size:14px;line-height:1.5;">${this.escapeHtml(m.text)}</div>
                <div style="font-size:10px;opacity:0.75;text-align:right;margin-top:4px;">${m.time}</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;">
              <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;box-shadow:0 2px 8px rgba(16,185,129,0.4);">
                🤖
              </div>
              <div style="max-width:86%;background:var(--glass-2);border:1.5px solid var(--glass-border);color:var(--ink);padding:14px 18px;border-radius:4px 18px 18px 18px;box-shadow:var(--shadow-panel);">
                
                ${m.severityLabel ? `
                  <div style="display:inline-block;background:${m.severityColor || '#0284c7'};color:#ffffff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:12px;margin-bottom:8px;letter-spacing:0.5px;">
                    ${m.severityLabel}
                  </div>
                ` : ''}

                <div style="font-size:14px;line-height:1.6;color:var(--ink-dim);">
                  ${this.formatMarkdown(m.text)}
                </div>

                ${m.steps && m.steps.length ? `
                  <div style="margin-top:10px;background:rgba(2,132,199,0.06);border-left:3px solid var(--primary-bright);padding:10px 14px;border-radius:0 8px 8px 0;">
                    <strong style="color:var(--ink);font-size:13px;display:block;margin-bottom:6px;">🩺 Step-by-Step Immediate Clinical First-Aid:</strong>
                    <ol style="margin:0;padding-left:18px;font-size:13px;line-height:1.5;color:var(--ink-dim);">
                      ${m.steps.map(s => `<li style="margin-bottom:4px;">${this.formatMarkdown(s)}</li>`).join('')}
                    </ol>
                  </div>
                ` : ''}

                ${m.medicines && m.medicines.length ? `
                  <div style="margin-top:10px;background:rgba(22,163,74,0.06);border-left:3px solid #16a34a;padding:10px 14px;border-radius:0 8px 8px 0;">
                    <strong style="color:#15803d;font-size:13px;display:block;margin-bottom:6px;">💊 PMBJP Jan Aushadhi Affordable Generic Medicines:</strong>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.5;color:var(--ink-dim);">
                      ${m.medicines.map(med => `<li style="margin-bottom:4px;">${this.formatMarkdown(med)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${m.redFlags && m.redFlags.length ? `
                  <div style="margin-top:10px;background:rgba(220,38,38,0.06);border-left:3px solid #dc2626;padding:10px 14px;border-radius:0 8px 8px 0;">
                    <strong style="color:#b91c1c;font-size:13px;display:block;margin-bottom:4px;">🚨 Red-Flag Warnings (When to Rush to Hospital):</strong>
                    <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.4;color:#b91c1c;">
                      ${m.redFlags.map(rf => `<li style="margin-bottom:2px;">${rf}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <!-- ACTIONS ROW -->
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px;padding-top:10px;border-top:1px solid var(--line);">
                  ${m.severity === 'critical' ? `
                    <button type="button" onclick="patientController.triggerSos()" class="auth-btn-primary" style="background:#dc2626;border-color:#b91c1c;padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;">
                      🚨 Call 108 Ambulance
                    </button>
                  ` : ''}

                  <button type="button" onclick="patientController.openPatientVideoCallModal()" class="auth-btn-primary" style="background:linear-gradient(135deg, #16a34a, #15803d);border:none;padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;">
                    📹 Video Call Doctor
                  </button>

                  <button type="button" onclick="speakText(\`${this.escapeForSpeech(m.speechText || m.text)}\`)" class="btn-glass" style="padding:6px 12px;font-size:12px;border-radius:8px;">
                    🔊 Read Aloud
                  </button>
                </div>

                ${m.suggestedQuestions && m.suggestedQuestions.length ? `
                  <div style="margin-top:10px;display:flex;gap:6px;flex-wrap:wrap;">
                    ${m.suggestedQuestions.map(q => `
                      <button type="button" onclick="aiHealthBot.sendUserQuery('${this.escapeHtml(q)}')" style="background:var(--glass-1);border:1px solid var(--glass-border);color:var(--primary-bright);padding:4px 10px;border-radius:14px;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.2s ease;">
                        💬 ${q}
                      </button>
                    `).join('')}
                  </div>
                ` : ''}

                <div style="font-size:10px;color:var(--muted);text-align:right;margin-top:6px;">
                  ${m.time} · Swasthya AI Clinical Protocol
                </div>

              </div>
            </div>
          `;
        }
      }).join('');

      // Scroll to bottom
      container.scrollTop = container.scrollHeight;
    }

    sendUserQuery(queryText) {
      const input = document.getElementById('aiChatInput');
      const text = queryText || (input ? input.value.trim() : '');
      if (!text) return;

      if (input && !queryText) input.value = '';

      // Add user message
      this.messages.push({
        sender: 'user',
        text: text,
        time: this.getFormattedTime()
      });

      this.renderChat();
      this.showTypingIndicator();

      setTimeout(() => {
        this.processAiResponse(text);
      }, 700);
    }

    showTypingIndicator() {
      const container = document.getElementById('aiChatMessagesContainer');
      if (!container) return;

      const typingHtml = `
        <div id="aiTypingIndicator" style="display:flex;gap:10px;margin-bottom:12px;align-items:center;">
          <div style="width:32px;height:32px;border-radius:50%;background:#10b981;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:16px;">
            🤖
          </div>
          <div style="background:var(--glass-2);border:1px solid var(--glass-border);padding:8px 14px;border-radius:12px;font-size:12px;color:var(--muted);">
            <em>Swasthya AI is evaluating clinical symptoms...</em>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', typingHtml);
      container.scrollTop = container.scrollHeight;
    }

    removeTypingIndicator() {
      const el = document.getElementById('aiTypingIndicator');
      if (el) el.remove();
    }

    processAiResponse(query) {
      this.removeTypingIndicator();

      const qLower = query.toLowerCase();

      // Find matching knowledgebase entry
      let bestMatch = null;
      let maxScore = 0;

      for (const entry of CLINICAL_KB) {
        let score = 0;
        for (const kw of entry.keywords) {
          if (qLower.includes(kw)) {
            score += kw.length;
          }
        }
        if (score > maxScore) {
          maxScore = score;
          bestMatch = entry;
        }
      }

      if (bestMatch && maxScore > 0) {
        this.messages.push({
          sender: 'ai',
          text: `### ${bestMatch.title}\n${bestMatch.summary}`,
          severity: bestMatch.severity,
          severityLabel: bestMatch.severityLabel,
          severityColor: bestMatch.severityColor,
          steps: bestMatch.steps,
          medicines: bestMatch.medicines,
          redFlags: bestMatch.redFlags,
          suggestedQuestions: bestMatch.suggestedQuestions,
          speechText: `${bestMatch.title}. ${bestMatch.summary} Step 1: ${bestMatch.steps[0].replace(/\*\*/g, '')}`,
          time: this.getFormattedTime()
        });
      } else {
        // Generic intelligent clinical response
        this.messages.push({
          sender: 'ai',
          text: `### Clinical Assessment for: "${this.escapeHtml(query)}"\n\nThank you for describing your health concern. Based on national clinical triage guidelines:\n\n1. **General Care**: Stay well-hydrated, rest in an airy room, and avoid self-medicating with unverified antibiotics.\n2. **Doctor Consultation**: Since our registered doctors are currently available on the telemedicine grid, we recommend requesting a digital OPD consultation for an official prescription.\n3. **Emergency Check**: If you experience severe chest pain, breathing difficulty, sudden weakness, or intense uncontrolled pain, tap **Call 108** below immediately.`,
          severity: 'moderate',
          severityLabel: '🟡 CLINICAL TRIAGE ADVISORY',
          severityColor: '#0284c7',
          steps: [
            'Record vital signs (temperature, pulse, blood pressure if device available).',
            'Note the exact duration and progression of symptoms for the doctor.',
            'Keep all previous medical records and current prescriptions handy.'
          ],
          medicines: [
            '**Paracetamol 500mg** (for pain/fever) — Jan Aushadhi: ₹1.50 per strip.',
            '**ORS Electrolytes** — Jan Aushadhi: ₹4.00 per pack.'
          ],
          redFlags: [
            'Severe sudden breathlessness or chest tightness.',
            'High fever >103°F with stiff neck or convulsions.',
            'Loss of consciousness or continuous vomiting.'
          ],
          suggestedQuestions: [
            'Is the symptom mild, moderate, or severe?',
            'Has this occurred before in the past?',
            'Are there any known drug allergies?'
          ],
          speechText: `Clinical assessment: Stay rested and hydrated. We recommend connecting to an on-duty doctor via live video call.`,
          time: this.getFormattedTime()
        });
      }

      this.renderChat();
    }

    triggerSymptomPill(symptomId) {
      const mapping = {
        fever: 'high fever with body shivering and hot temperature',
        snakebite: 'snake bite emergency with fang puncture marks',
        diarrhea: 'loose watery diarrhea motions with dehydration',
        pregnancy: 'maternal pregnancy labour pain contractions',
        chestpain: 'severe tight chest pain radiating to left arm',
        breathing: 'difficulty breathing and severe chest wheezing',
        vomiting: 'frequent vomiting and nausea unable to digest food',
        headache: 'severe migraine headache and temple pressure',
        bleeding: 'deep cut wound with active bleeding',
        dengue: 'high fever with severe body pain and suspected dengue'
      };

      const query = mapping[symptomId] || symptomId;
      this.sendUserQuery(query);
    }

    startVoiceInput() {
      if (typeof window === 'undefined') return;

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (global.toast) global.toast('🎙️ Voice input is not supported in this browser. Please type your query.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN'; // Indian English / Hinglish
      recognition.interimResults = false;

      if (global.toast) global.toast('🎙️ Listening... Speak your symptoms now.');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('aiChatInput');
        if (input) input.value = transcript;
        this.sendUserQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (global.toast) global.toast('🎙️ Speech not recognized. Please try again or type.');
      };

      recognition.start();
    }

    clearChat() {
      this.initDefaultChat();
      this.renderChat();
      if (global.toast) global.toast('🧹 Chat history cleared.');
    }

    formatMarkdown(text) {
      if (!text) return '';
      return text
        .replace(/### (.*)/g, '<h4 style="color:var(--ink);font-size:15px;font-weight:800;margin:0 0 6px;">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--ink);font-weight:700;">$1</strong>')
        .replace(/\n/g, '<br/>');
    }

    escapeHtml(text) {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    escapeForSpeech(text) {
      if (!text) return '';
      return text.replace(/[^a-zA-Z0-9 ,.?!]/g, ' ').replace(/\s+/g, ' ');
    }
  }

  // Export Singleton
  global.aiHealthBot = new AiHealthBotController();

  // Auto-render on DOM ready
  if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
      global.aiHealthBot.renderChat();
    });
  }

})(typeof window !== 'undefined' ? window : global);
