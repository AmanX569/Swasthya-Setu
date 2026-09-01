/**
 * =========================================================
 * SWASTHYA SETU - 24x7 AI CLINICAL HEALTH BOT & SYMPTOM GUIDE
 * (Swasthya AI Sahayak / स्वास्थय AI सहायक)
 * Instant Triage, First-Aid, Danger Red Flags & Home Care
 * =========================================================
 */

(function(global) {
  'use strict';

  // Comprehensive Clinical Knowledgebase with Typo & Phonetic Tolerance
  const CLINICAL_KB = [
    {
      id: 'fever',
      keywords: ['fever', 'fiver', 'fvr', 'fevr', 'temperature', 'temp', 'bukhar', 'jwaram', 'chills', 'hot body', 'shivering', '102', '103', '101', '100', '104', 'pyrexia'],
      title: 'High Fever & Hyperpyrexia (उच्च बुखार)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · HOME CARE & PHC MONITORING',
      severityColor: '#d97706',
      summary: 'Fever is the body\'s immune response fighting infection. Immediate temperature reduction and hydration are crucial.',
      steps: [
        '**Cold / Tepid Sponging**: Apply a clean cloth soaked in normal tap water (not ice cold) on forehead, neck, armpits, and groin to rapidly lower body temperature.',
        '**Oral Hydration**: Drink coconut water, lemon water with salt, thin dal soup, or warm water to prevent dehydration.',
        '**Light Cotton Clothing**: Dress in light, breathable cotton clothes. Avoid wrapping the patient in thick heavy blankets.',
        '**Temperature Monitoring**: Check temperature every 2 hours using a digital thermometer.'
      ],
      medicines: [
        '**Paracetamol 500mg / 650mg** (Jan Aushadhi: ₹1.50 per strip) — 1 tablet every 6–8 hours after food for adults.',
        '**WHO-ORS Electrolytes** (Jan Aushadhi: ₹4.00) — to maintain electrolyte balance.'
      ],
      redFlags: [
        'Temperature exceeding 103°F (39.4°C) not coming down with medication.',
        'Seizures or fits (Febrile convulsion), especially in children under 5.',
        'Severe headache, neck stiffness, or inability to touch chin to chest.',
        'Continuous vomiting or purple/red spots on skin.'
      ],
      suggestedQuestions: [
        'Is the fever accompanied by shivering or chills?',
        'How many days has the fever been present?',
        'Are there any skin rashes, joint pains, or cough?'
      ],
      audioSummary: 'High fever care: Do tepid sponging with normal water on forehead and armpits. Stay hydrated with ORS and take Paracetamol after food. If fever exceeds 103 degrees or seizures occur, visit nearest PHC.'
    },
    {
      id: 'snakebite',
      keywords: ['snake', 'snakebite', 'snak', 'bite', 'venom', 'saap', 'samp', 'paamu', 'cobra', 'viper', 'krait', 'bitten by snake'],
      title: 'Snake Bite Emergency Protocol (सांप काटने पर आपातकालीन उपचार)',
      severity: 'critical',
      severityLabel: '🔴 CRITICAL EMERGENCY · IMMEDIATE 108 AMBULANCE',
      severityColor: '#dc2626',
      summary: 'All snake bites in India must be treated as medical emergencies requiring Anti-Snake Venom (ASV) at the nearest Government CHC/Hospital.',
      steps: [
        '**Immobilize Immediately**: Keep the patient completely calm, lying down, and still. Any muscle movement accelerates venom spread.',
        '**Keep Below Heart**: Position the bitten limb below the level of the heart.',
        '**Remove Tight Items**: Remove bangles, rings, anklets, and tight shoes before swelling begins.',
        '**CRITICAL DO NOTS**: Do NOT cut the wound, do NOT suck the venom, do NOT tie a tight tourniquet, and do NOT apply cow dung or herbal pastes.'
      ],
      medicines: [
        '**Polyvalent Anti-Snake Venom (ASV)** — Administered via IV drip exclusively at Government PHC / CHC hospitals.'
      ],
      redFlags: [
        'Drooping eyelids (Ptosis), difficulty swallowing, or slurred speech.',
        'Active bleeding from bite marks, nose, or gums.',
        'Rapidly spreading swelling and severe pain up the leg or arm.',
        'Breathing difficulty or sudden limb weakness.'
      ],
      suggestedQuestions: [
        'How many minutes ago did the bite occur?',
        'Can you describe the snake (color, triangular head, bands)?',
        'Is there active bleeding or difficulty in opening eyes?'
      ],
      audioSummary: 'Snake bite emergency: Keep the patient calm and completely still. Do not cut or tie the wound. Call 108 ambulance immediately to reach the nearest hospital for anti-snake venom.'
    },
    {
      id: 'diarrhea',
      keywords: ['diarrhea', 'diarrhoea', 'loose motion', 'motions', 'dast', 'dastur', 'vidhivulu', 'dehydration', 'watery stool', 'stomach loose', 'cholera', 'potty', 'tatti'],
      title: 'Acute Diarrhea & Dehydration Care (दस्त एवं निर्जलीकरण)',
      severity: 'moderate',
      severityLabel: '🟢 MILD TO MODERATE · ORS & ZINC THERAPY',
      severityColor: '#16a34a',
      summary: 'Dehydration from fluid and salt loss is the primary risk in diarrhea. Continuous oral rehydration saves lives.',
      steps: [
        '**Prepare WHO-ORS Solution**: Mix 1 full sachet of WHO-ORS in exactly 1 Liter of clean boiled/filtered water. Drink 1 glass (200ml) after every loose motion.',
        '**Home Fluids**: Drink rice kanji with salt, buttermilk, coconut water, and light dal water.',
        '**Zinc Therapy for Children**: Children under 5 should take 20mg Zinc tablet daily for 14 days to rebuild gut immunity.',
        '**Nutritious Diet**: Continue feeding khichdi, curd-rice, bananas, and boiled potatoes. Do NOT starve the patient.'
      ],
      medicines: [
        '**WHO-ORS Sachet 21.8g** (Jan Aushadhi: ₹4.50 per pack).',
        '**Zinc Sulfate 20mg Tablets** (Jan Aushadhi: ₹1.20 per strip).',
        '**Lactic Acid Bacillus / Probiotics** (Jan Aushadhi: ₹3.50).'
      ],
      redFlags: [
        'Sunken eyes, extreme thirst, dry mouth, or no urine for >6 hours.',
        'Blood or mucus in stool (Dysentery).',
        'Repeated vomiting preventing fluid retention.',
        'Lethargy, unconsciousness, or floppy limpness in infants.'
      ],
      suggestedQuestions: [
        'Is there any blood or mucus in the stool?',
        'How many episodes of loose stool in the last 24 hours?',
        'Is the patient able to drink fluids without vomiting?'
      ],
      audioSummary: 'Diarrhea care: Drink one glass of ORS solution after every loose motion. Give Zinc tablets for children under 5. If there is blood in stool or extreme weakness, consult a doctor immediately.'
    },
    {
      id: 'chestpain',
      keywords: ['chest', 'heart', 'cardiac', 'chest pain', 'sineme dard', 'chhati', 'gunde noppi', 'heart attack', 'angina', 'left arm pain', 'chest tight', 'chest pressure', 'suffocation chest'],
      title: 'Acute Chest Pain & Cardiac Alert (छाती में दर्द व दिल का दौरा)',
      severity: 'critical',
      severityLabel: '🔴 CRITICAL CARDIAC ALERT · CALL 108 IMMEDIATELY',
      severityColor: '#dc2626',
      summary: 'Severe crushing chest pain radiating to left arm or jaw with sweating requires immediate hospital emergency ECG.',
      steps: [
        '**Call 108 Emergency**: Request an Advanced Life Support (ALS) Ambulance with defibrillator and ECG.',
        '**Rest in W-Position**: Help the patient sit upright with knees bent and back firmly supported to reduce cardiac strain.',
        '**Loosen Clothing**: Unbutton tight shirt collar and belt for maximum oxygen intake.',
        '**Aspirin First-Aid**: If conscious and not allergic, chew 1 Soluble Aspirin (300mg/325mg) with a sip of water.'
      ],
      medicines: [
        '**Aspirin 300mg / 325mg (Soluble)** (Jan Aushadhi: ₹0.80 per strip).',
        '**Sorbitrate 5mg** — Under tongue only if previously prescribed by a cardiologist.'
      ],
      redFlags: [
        'Pain radiating to left shoulder, left arm, neck, jaw, or upper back.',
        'Cold profuse sweating, breathlessness, dizziness, or fainting.',
        'Severe heaviness like a heavy weight pressing on the chest.'
      ],
      suggestedQuestions: [
        'Does the pain spread to your left arm or jaw?',
        'Is there sweating or shortness of breath?',
        'Does the patient have a history of heart disease, diabetes, or high BP?'
      ],
      audioSummary: 'Cardiac emergency: Sit down in a supported upright position. Chew one Aspirin tablet if available. Call 108 ambulance immediately to reach the nearest hospital emergency ICU.'
    },
    {
      id: 'breathing',
      keywords: ['breath', 'breathing', 'asthma', 'suffocation', 'wheezing', 'shortness of breath', 'saans', 'dam', 'oopiri', 'gasping', 'choking', 'cough breath', 'oxygen low'],
      title: 'Breathing Difficulty & Asthma Care (सांस लेने में तकलीफ)',
      severity: 'critical',
      severityLabel: '🔴 HIGH URGENCY · PHC OXYGEN & NEBULIZATION',
      severityColor: '#dc2626',
      summary: 'Severe breathlessness requires immediate bronchodilator therapy and oxygen saturation (SpO2) evaluation.',
      steps: [
        '**Sit Upright (Tripod Posture)**: Never allow the patient to lie flat. Sit leaning slightly forward with hands on knees.',
        '**Use Rescue Inhaler**: If the patient has a prescribed inhaler (Salbutamol/Asthalin), administer 2–4 puffs with a spacer immediately.',
        '**Airflow**: Open all windows and doors for fresh ventilation. Keep crowds away.',
        '**Head to PHC**: Visit nearest PHC for oxygen concentrator support and nebulization.'
      ],
      medicines: [
        '**Salbutamol 100mcg Inhaler** (Jan Aushadhi: ₹45.00 vs ₹180 market).',
        '**Budesonide 0.5mg Respules** for nebulizer (Jan Aushadhi: ₹12.00).'
      ],
      redFlags: [
        'Bluish tint on lips, fingernails, or tongue (Cyanosis).',
        'Inability to speak 2–3 words without gasping.',
        'Ribs pulling inward while breathing (intercostal retractions).',
        'Oxygen level (SpO2) falling below 92%.'
      ],
      suggestedQuestions: [
        'Is there whistling or wheezing sound in the chest?',
        'Is a pulse oximeter available to check oxygen level?',
        'Is this sudden onset or a known history of asthma?'
      ],
      audioSummary: 'Breathing difficulty: Sit upright leaning forward. Take 2 to 4 puffs of your rescue inhaler if prescribed. Visit the nearest PHC for oxygen support and nebulization.'
    },
    {
      id: 'pregnancy',
      keywords: ['pregnancy', 'labour', 'pregnant', 'garbh', 'prasav', 'contractions', 'water break', 'amniotic', 'bleeding pregnancy', 'delivery', 'delivery pain', 'labor'],
      title: 'Pregnancy Labour & Maternal Emergency (प्रसव पीड़ा व मातृत्व देखभाल)',
      severity: 'critical',
      severityLabel: '🔴 MATERNAL EMERGENCY · DISPATCH 108 AMBULANCE',
      severityColor: '#dc2626',
      summary: 'Active labour pains, leaking water, or vaginal bleeding in pregnancy require institutional delivery at 24x7 FRU/CHC.',
      steps: [
        '**Call 108 & ASHA Lead**: Alert your local ASHA worker and request immediate 108 maternal transport.',
        '**Left Lateral Position**: Have the mother lie on her left side to optimize blood and oxygen flow to the baby.',
        '**Pack Mother-Child Kit**: Keep MCP Card (Maternal & Child Protection), ABHA card, clean clothes, and baby wraps ready.',
        '**Slow Deep Breathing**: Guide calm, deep breathing during each contraction.'
      ],
      medicines: [
        '**Iron & Folic Acid (IFA) Tablets** (Provided free at PHC).',
        '**Calcium 500mg + Vitamin D3** (Jan Aushadhi: ₹4.50 per strip).'
      ],
      redFlags: [
        'Vaginal bleeding or sudden gush of clear/green fluid.',
        'Severe headache, blurred vision, or high blood pressure (Eclampsia).',
        'Decreased or absent baby movements in the last 12 hours.',
        'Severe constant lower abdominal pain.'
      ],
      suggestedQuestions: [
        'How many weeks or months pregnant is the mother?',
        'How frequent are the contractions (minutes apart)?',
        'Has there been any water breakage or bleeding?'
      ],
      audioSummary: 'Maternal labour care: Lie on the left side and guide slow deep breathing. Call 108 ambulance and inform your local ASHA worker for safe hospital delivery.'
    },
    {
      id: 'vomiting',
      keywords: ['vomit', 'vomiting', 'nausea', 'ulti', 'vamthulu', 'throwing up', 'puking', 'gastric', 'acid', 'stomach upset', 'food poison'],
      title: 'Nausea, Vomiting & Gastric Relief (उल्टी व मितली)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · SIP HYDRATION & ANTI-EMETIC',
      severityColor: '#d97706',
      summary: 'Frequent vomiting depletes stomach electrolytes. Small sips of fluid prevent further gastric irritation.',
      steps: [
        '**Rest Stomach 15 Mins**: Avoid large gulps of water immediately after vomiting. Wait 15 minutes, then take 1 teaspoon of ORS or water every 5 minutes.',
        '**Ginger / Mint Infusion**: Warm water infused with crushed ginger or mint leaves soothes gastric contractions.',
        '**Bland Diet**: When vomiting stops for 4 hours, introduce clear soups, toast, or boiled rice with a pinch of salt.',
        '**Avoid Triggers**: Avoid oily, spicy, dairy, or fried foods.'
      ],
      medicines: [
        '**Ondansetron 4mg (Mouth Dissolving)** (Jan Aushadhi: ₹3.00 per strip) — Take 30 mins before meals.',
        '**Domperidone 10mg + Pantoprazole 40mg** (Jan Aushadhi: ₹12.00 per strip) — For acidity and nausea.'
      ],
      redFlags: [
        'Vomiting blood (coffee-ground appearance) or green bile.',
        'Inability to retain liquids for more than 12 hours.',
        'Severe right lower abdomen pain (possible Appendicitis).',
        'High fever, stiff neck, or extreme lethargy.'
      ],
      suggestedQuestions: [
        'How many times has vomiting occurred today?',
        'Is there any abdominal pain or fever?',
        'Is the vomit containing food, bile, or blood?'
      ],
      audioSummary: 'Vomiting care: Rest the stomach for 15 minutes, then take small sips of ORS every 5 minutes. Take Ondansetron mouth-dissolving tablet if prescribed. Avoid spicy and oily foods.'
    },
    {
      id: 'headache',
      keywords: ['headache', 'head pain', 'migraine', 'sar dard', 'tala noppi', 'temple pain', 'dizziness', 'head ache', 'sir dard'],
      title: 'Severe Headache & Migraine Management (सिरदर्द व माइग्रेन)',
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
        'Headache with weakness in one arm/leg, facial drooping, or slurred speech (Stroke alert).',
        'Headache following head injury or trauma.',
        'Headache with high fever, neck stiffness, and confusion.'
      ],
      suggestedQuestions: [
        'Is the headache on one side or the entire head?',
        'Are you experiencing sensitivity to light or nausea?',
        'Did the headache come on gradually or suddenly within seconds?'
      ],
      audioSummary: 'Headache care: Rest in a dark, quiet room and drink 2 glasses of water. Apply a cool compress on temples. Take Paracetamol after food. If accompanied by facial drooping or speech difficulty, call 108 immediately.'
    },
    {
      id: 'bleeding',
      keywords: ['cut', 'wound', 'bleeding', 'injury', 'chot', 'rakta', 'ghav', 'trauma', 'burn', 'jalan', 'blood', 'scraped', 'accident'],
      title: 'Wound Bleeding & Burn First-Aid (चोट व रक्तस्राव प्राथमिक चिकित्सा)',
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
      ],
      audioSummary: 'Wound first aid: Apply direct firm pressure with a clean cloth for 10 minutes. Clean with running water and apply Povidone Iodine ointment. Get a Tetanus TT shot at the nearest PHC within 24 hours.'
    },
    {
      id: 'dengue',
      keywords: ['dengue', 'malaria', 'mosquito', 'platelet', 'body ache', 'backache', 'eye pain', 'machhar', 'dengu'],
      title: 'Dengue & Vector-Borne Disease Signs (डेंगू एवं मलेरिया लक्षण)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · CBC & PLATELET TEST REQUIRED',
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
      ],
      audioSummary: 'Dengue signs: Stay well hydrated with coconut water and ORS. Take only Paracetamol for fever. Do not take Aspirin or Ibuprofen. Get a CBC platelet test at your nearest PHC.'
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
          text: 'Namaste! I am your **24x7 Swasthya AI Clinical Health Assistant**. If our doctors are busy or you need immediate guidance, describe your symptoms below (in English, Hindi, or Telugu) or tap any quick symptom above. I will provide instant clinical assessment, first-aid steps, home remedies, danger red flags, and affordable Jan Aushadhi medicine guidance.',
          time: this.getFormattedTime(),
          audioSummary: 'Namaste! I am your 24x7 Swasthya AI Clinical Health Assistant. Describe your symptoms or tap any quick symptom for instant first aid and medicine guidance.'
        }
      ];
    }

    getFormattedTime() {
      const d = new Date();
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    renderChat() {
      if (typeof document === 'undefined') return;
      const container = document.getElementById('aiChatMessagesContainer');
      if (!container) return;

      if (!this.messages || this.messages.length === 0) {
        this.initDefaultChat();
      }

      container.innerHTML = this.messages.map((m, idx) => {
        if (m.sender === 'user') {
          return `
            <div style="display:flex;justify-content:flex-end;margin-bottom:12px;">
              <div style="max-width:82%;background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;padding:12px 16px;border-radius:18px 18px 4px 18px;box-shadow:0 2px 8px rgba(2,132,199,0.25);">
                <div style="font-size:14px;line-height:1.5;">${this.escapeHtml(m.text)}</div>
                <div style="font-size:10px;opacity:0.8;text-align:right;margin-top:4px;">${m.time}</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div style="display:flex;gap:10px;margin-bottom:16px;align-items:flex-start;">
              <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;box-shadow:0 3px 10px rgba(16,185,129,0.4);">
                🤖
              </div>
              <div style="flex:1;max-width:88%;background:var(--glass-2);border:1.5px solid var(--glass-border);color:var(--ink);padding:14px 18px;border-radius:4px 18px 18px 18px;box-shadow:var(--shadow-panel);">
                
                ${m.severityLabel ? `
                  <div style="display:inline-block;background:${m.severityColor || '#0284c7'};color:#ffffff;font-size:11px;font-weight:800;padding:4px 12px;border-radius:12px;margin-bottom:10px;letter-spacing:0.5px;">
                    ${m.severityLabel}
                  </div>
                ` : ''}

                <div style="font-size:14px;line-height:1.6;color:var(--ink-dim);">
                  ${this.formatMarkdown(m.text)}
                </div>

                ${m.steps && m.steps.length ? `
                  <div style="margin-top:12px;background:rgba(2,132,199,0.06);border-left:3.5px solid var(--primary-bright);padding:10px 14px;border-radius:0 10px 10px 0;">
                    <strong style="color:var(--ink);font-size:13px;display:block;margin-bottom:6px;">🩺 Step-by-Step Immediate Clinical First-Aid:</strong>
                    <ol style="margin:0;padding-left:18px;font-size:13px;line-height:1.5;color:var(--ink-dim);">
                      ${m.steps.map(s => `<li style="margin-bottom:4px;">${this.formatMarkdown(s)}</li>`).join('')}
                    </ol>
                  </div>
                ` : ''}

                ${m.medicines && m.medicines.length ? `
                  <div style="margin-top:10px;background:rgba(22,163,74,0.06);border-left:3.5px solid #16a34a;padding:10px 14px;border-radius:0 10px 10px 0;">
                    <strong style="color:#15803d;font-size:13px;display:block;margin-bottom:6px;">💊 PMBJP Jan Aushadhi Affordable Generic Medicines:</strong>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.5;color:var(--ink-dim);">
                      ${m.medicines.map(med => `<li style="margin-bottom:4px;">${this.formatMarkdown(med)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${m.redFlags && m.redFlags.length ? `
                  <div style="margin-top:10px;background:rgba(220,38,38,0.06);border-left:3.5px solid #dc2626;padding:10px 14px;border-radius:0 10px 10px 0;">
                    <strong style="color:#b91c1c;font-size:13px;display:block;margin-bottom:4px;">🚨 Red-Flag Warnings (When to Rush to Hospital):</strong>
                    <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.4;color:#b91c1c;">
                      ${m.redFlags.map(rf => `<li style="margin-bottom:2px;">${rf}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <!-- ACTIONS ROW -->
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:10px;border-top:1px solid var(--line);">
                  ${m.severity === 'critical' ? `
                    <button type="button" onclick="patientController.triggerSos()" class="auth-btn-primary" style="background:#dc2626;border-color:#b91c1c;padding:7px 16px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;">
                      🚨 Call 108 Ambulance
                    </button>
                  ` : ''}

                  <button type="button" onclick="patientController.openPatientVideoCallModal()" class="auth-btn-primary" style="background:linear-gradient(135deg, #16a34a, #15803d);border:none;padding:7px 16px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;">
                    📹 Video Call Doctor
                  </button>

                  <button type="button" onclick="aiHealthBot.speakMessage(${idx})" class="btn-glass" style="padding:7px 14px;font-size:12px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-weight:700;">
                    <span>🔊</span> <span>Read Aloud</span>
                  </button>
                </div>

                ${m.suggestedQuestions && m.suggestedQuestions.length ? `
                  <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
                    ${m.suggestedQuestions.map(q => `
                      <button type="button" onclick="aiHealthBot.sendUserQuery('${this.escapeHtml(q)}')" style="background:var(--glass-1);border:1px solid var(--glass-border);color:var(--primary-bright);padding:5px 12px;border-radius:14px;font-size:11.5px;font-weight:700;cursor:pointer;transition:all 0.2s ease;">
                        💬 ${q}
                      </button>
                    `).join('')}
                  </div>
                ` : ''}

                <div style="font-size:10px;color:var(--muted);text-align:right;margin-top:8px;">
                  ${m.time} · Swasthya AI Clinical Protocol
                </div>

              </div>
            </div>
          `;
        }
      }).join('');

      container.scrollTop = container.scrollHeight;
    }

    sendUserQuery(queryText) {
      const input = document.getElementById('aiChatInput');
      const text = queryText || (input ? input.value.trim() : '');
      if (!text) return;

      if (input && !queryText) input.value = '';

      this.messages.push({
        sender: 'user',
        text: text,
        time: this.getFormattedTime()
      });

      this.renderChat();
      this.showTypingIndicator();

      setTimeout(() => {
        this.processAiResponse(text);
      }, 500);
    }

    showTypingIndicator() {
      const container = document.getElementById('aiChatMessagesContainer');
      if (!container) return;

      const typingHtml = `
        <div id="aiTypingIndicator" style="display:flex;gap:10px;margin-bottom:12px;align-items:center;">
          <div style="width:34px;height:34px;border-radius:50%;background:#10b981;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:18px;">
            🤖
          </div>
          <div style="background:var(--glass-2);border:1px solid var(--glass-border);padding:8px 16px;border-radius:12px;font-size:12.5px;color:var(--muted);">
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

      const qClean = query.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');
      const words = qClean.split(/\s+/).filter(w => w.length > 1);

      // Intelligent Fuzzy & Keyword Scoring
      let bestMatch = null;
      let maxScore = 0;

      for (const entry of CLINICAL_KB) {
        let score = 0;
        for (const kw of entry.keywords) {
          if (qClean.includes(kw)) {
            score += kw.length * 3;
          }
          // Fuzzy word check (e.g. fiver -> fever, dastur -> dast)
          for (const w of words) {
            if (kw.includes(w) || w.includes(kw) || this.isSimilar(w, kw)) {
              score += 4;
            }
          }
        }
        if (score > maxScore) {
          maxScore = score;
          bestMatch = entry;
        }
      }

      if (bestMatch && maxScore >= 3) {
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
          audioSummary: bestMatch.audioSummary,
          time: this.getFormattedTime()
        });
      } else {
        // Clinical General Assessment
        this.messages.push({
          sender: 'ai',
          text: `### Clinical Assessment for: "${this.escapeHtml(query)}"\n\nBased on national rural clinical triage guidelines:\n\n1. **Home Rest & Hydration**: Rest in a well-ventilated room and drink clean water, ORS, or coconut water.\n2. **Consult On-Duty Doctor**: Since our registered doctors are currently available on the telemedicine grid, tap **Video Call Doctor** below for an official prescription.\n3. **Emergency Alert**: If you experience severe chest pain, extreme breathlessness, sudden paralysis, or uncontrolled bleeding, tap **Call 108 Ambulance** immediately.`,
          severity: 'moderate',
          severityLabel: '🟡 CLINICAL TRIAGE ADVISORY',
          severityColor: '#0284c7',
          steps: [
            'Record your body temperature and pulse if a thermometer/oximeter is available.',
            'Note down when the symptoms started and any current medications.',
            'Keep your ABHA health card ready for the doctor consultation.'
          ],
          medicines: [
            '**Paracetamol 500mg** (for fever/pain) — Jan Aushadhi: ₹1.50 per strip.',
            '**ORS Electrolytes** — Jan Aushadhi: ₹4.00 per pack.'
          ],
          redFlags: [
            'Sudden breathlessness or chest tightness.',
            'High fever >103°F with stiff neck or convulsions.',
            'Loss of consciousness or continuous vomiting.'
          ],
          suggestedQuestions: [
            'Is the symptom mild, moderate, or severe?',
            'How many days has this been happening?',
            'Are there any known drug allergies?'
          ],
          audioSummary: 'Clinical advice: Rest and stay hydrated. We recommend connecting to an on-duty doctor via live video call or visiting the nearest PHC.',
          time: this.getFormattedTime()
        });
      }

      this.renderChat();
    }

    isSimilar(a, b) {
      if (a === b) return true;
      if (Math.abs(a.length - b.length) > 2) return false;
      // Simple Levenshtein distance <= 2
      let diff = 0;
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] !== b[i]) diff++;
      }
      return diff <= 2;
    }

    triggerSymptomPill(symptomId) {
      const mapping = {
        fever: 'high fever temperature with chills and body heat',
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

    speakMessage(idx) {
      const m = this.messages[idx];
      if (!m) return;
      const textToSpeak = m.audioSummary || m.text.replace(/###/g, '').replace(/\*\*/g, '');
      if (typeof global.speakText === 'function') {
        global.speakText(textToSpeak);
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      }
    }

    startVoiceInput() {
      if (typeof window === 'undefined') return;

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (global.toast) global.toast('🎙️ Voice recognition not supported on this browser. Please type your query.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
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
  }

  // Export Singleton
  global.aiHealthBot = new AiHealthBotController();

  // Auto-render on DOM ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        global.aiHealthBot.renderChat();
      });
    } else {
      global.aiHealthBot.renderChat();
    }
  }

})(typeof window !== 'undefined' ? window : global);
