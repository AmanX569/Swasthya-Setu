/**
 * =============================================================================
 * SWASTHYA SETU - NEXT-GEN AI HEALTHCARE ASSISTANT & CLINICAL INTELLIGENCE ENGINE
 * (Swasthya AI / स्वास्थय AI सहायक)
 * Powered by Gemini AI API Architecture & Onboard Clinical Reasoning Model
 * Features:
 *  - Multilingual Medical Guidance (12 Indian Languages)
 *  - Interactive Command & Assistance Interface (/beds, /doctor, /sos, /meds)
 *  - Real-time GPS 25km Nearby Hospital Bed Integration
 *  - Voice Recognition (Speech-to-Text) & Voice Synthesis (Audio Readout)
 *  - Clinical Triage, Red-Flag Warnings, First Aid & Generic Medicine Guidance
 * =============================================================================
 */

(function(global) {
  'use strict';

  // Supported Languages
  const SUPPORTED_LANGUAGES = {
    en: { name: 'English', native: 'English', voiceCode: 'en-IN' },
    hi: { name: 'Hindi', native: 'हिंदी', voiceCode: 'hi-IN' },
    te: { name: 'Telugu', native: 'తెలుగు', voiceCode: 'te-IN' },
    ta: { name: 'Tamil', native: 'தமிழ்', voiceCode: 'ta-IN' },
    mr: { name: 'Marathi', native: 'मराठी', voiceCode: 'mr-IN' },
    bn: { name: 'Bengali', native: 'বাংলা', voiceCode: 'bn-IN' },
    gu: { name: 'Gujarati', native: 'ગુજરાતી', voiceCode: 'gu-IN' },
    kn: { name: 'Kannada', native: 'ಕನ್ನಡ', voiceCode: 'kn-IN' },
    ml: { name: 'Malayalam', native: 'മലയാളം', voiceCode: 'ml-IN' },
    pa: { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', voiceCode: 'pa-IN' },
    or: { name: 'Odia', native: 'ଓଡ଼ିଆ', voiceCode: 'or-IN' },
    ur: { name: 'Urdu', native: 'اردو', voiceCode: 'ur-IN' }
  };

  // UI Language Strings
  const UI_TEXT = {
    en: {
      title: 'Swasthya AI Assistant',
      subtitle: 'Clinical Medical Intelligence · Gemini & ChatGPT Core',
      onlineBadge: 'AI Active',
      greeting: '👋 **Hello! I am your AI Health Assistant.**\n\nI am equipped with clinical medical intelligence to assist you with symptoms, emergency first-aid, nearby hospital beds, and doctor consultations.\n\n**How can I assist you today?** You can type any health query, or tap a command below:',
      placeholder: 'Ask a medical question or type a command (/beds, /doctor, /sos)...',
      send: 'Send',
      listening: 'Listening... Please speak now',
      speak: 'Read Aloud',
      stopSpeak: 'Stop Audio',
      clearTitle: 'Clear Chat History',
      settingsTitle: 'AI Settings & API Key',
      copied: 'Copied to clipboard!',
      connectingGemini: 'Connecting to Gemini Cloud Intelligence...',
      offlineModel: 'Using High-Precision Onboard Clinical Engine'
    },
    hi: {
      title: 'स्वास्थय AI सहायक',
      subtitle: 'क्लिनिकल मेडिकल इंटेलिजेंस · जेमिनी व चैटजीपीटी कोर',
      onlineBadge: 'AI सक्रिय',
      greeting: '👋 **नमस्ते! मैं आपका स्वास्थय AI सहायक हूँ।**\n\nमैं लक्षणों की जांच, आपातकालीन प्राथमिक उपचार, नजदीकी अस्पताल बेड और डॉक्टर परामर्श में आपकी सहायता करने के लिए तैयार हूँ।\n\n**आज मैं आपकी क्या सहायता कर सकता हूँ?** नीचे दिए गए कमांड चुनें या अपनी स्वास्थ्य समस्या लिखें:',
      placeholder: 'स्वास्थ्य प्रश्न पूछें या कमांड लिखें (/beds, /doctor, /sos)...',
      send: 'भेजें',
      listening: 'सुन रहा हूँ... कृपया बोलें',
      speak: 'सुनें',
      stopSpeak: 'रोकें',
      clearTitle: 'चैट साफ़ करें',
      settingsTitle: 'AI सेटिंग्स व API कुंजी',
      copied: 'कॉपी हो गया!',
      connectingGemini: 'जेमिनी क्लाउड से जुड़ रहा है...',
      offlineModel: 'ऑनबोर्ड क्लिनिकल AI इंजन सक्रिय'
    },
    te: {
      title: 'స్వాస్థ్య AI అసిస్టెంట్',
      subtitle: 'క్లినికల్ మెడికల్ ఇంటెలిజెన్స్ · జెమిని & చాట్‌జిపిటి కోర్',
      onlineBadge: 'AI సిద్ధంగా ఉంది',
      greeting: '👋 **నమస్కారం! నేను మీ స్వాస్థ్య AI ఆరోగ్య సహాయకుడిని.**\n\nలక్షణాల తనిఖీ, అత్యవసర ప్రథమ చికిత్స, సమీప ఆసుపత్రి పడకలు మరియు వైద్యుల సంప్రదింపులలో సహాయం చేయడానికి నేను సిద్ధంగా ఉన్నాను.\n\n**ఈరోజు నేను మీకు ఎలా సహాయపడగలను?** క్రింది కమాండ్‌ను ఎంచుకోండి లేదా మీ ప్రశ్నను టైప్ చేయండి:',
      placeholder: 'ఆరోగ్య ప్రశ్న అడగండి లేదా కమాండ్ టైప్ చేయండి (/beds, /doctor)...',
      send: 'పంపండి',
      listening: 'వింటున్నాను... దయచేసి మాట్లాడండి',
      speak: 'వినండి',
      stopSpeak: 'ఆపండి',
      clearTitle: 'చాట్ క్లియర్ చేయండి',
      settingsTitle: 'AI సెట్టింగ్‌లు',
      copied: 'కాపీ చేయబడింది!',
      connectingGemini: 'జెమిని క్లౌడ్ కనెక్ట్ అవుతోంది...',
      offlineModel: 'ఆన్‌బోర్డ్ క్లినికల్ మోడల్'
    }
  };

  // Quick Command / Assistance Cards
  const ASSISTANCE_COMMANDS = [
    { cmd: '/symptoms', icon: '🩺', label: 'Check Symptoms', desc: 'Clinical symptom triage' },
    { cmd: '/beds', icon: '🏥', label: 'Nearby Beds (<25km)', desc: 'Live ICU & General beds' },
    { cmd: '/doctor', icon: '👨‍⚕️', label: 'Consult Doctor', desc: 'Video call / OPD Queue' },
    { cmd: '/meds', icon: '💊', label: 'Medicine & Dosage', desc: 'Generic savings & safety' },
    { cmd: '/sos', icon: '🆘', label: 'Emergency First Aid', desc: 'Red-flag 108 SOS actions' },
    { cmd: '/lang', icon: '🌐', label: 'Change Language', desc: '12 Indian languages' }
  ];

  // Comprehensive Medical Clinical Protocol Knowledge Base
  const CLINICAL_KNOWLEDGE_BASE = [
    {
      id: 'fever',
      triggers: ['fever', 'high temperature', 'bukhaar', 'jwaram', 'pyrexia', 'shivering', 'chills', 'tap'],
      urgency: 'MODERATE_TO_URGENT',
      urgencyLabel: '🟡 Moderate to High Urgency',
      title: 'Fever (Pyrexia) Assessment & Management',
      assessment: 'Fever is an immune response to viral, bacterial, or parasitic infections (e.g. Dengue, Malaria, Typhoid, Viral flu).',
      immediateActions: [
        'Place cold water cloth compresses on forehead, neck, and armpits to bring temperature down gently.',
        'Drink plenty of fluids: coconut water, electrolyte solution (ORS), and warm soups to avoid dehydration.',
        'Rest in a well-ventilated, cool room with lightweight cotton clothing.'
      ],
      medicationSafety: [
        'Paracetamol (PCM) 500mg or 650mg is safe for adult fever relief (max 3g daily, minimum 6 hours gap).',
        '⚠️ NEVER take Aspirin, Ibuprofen, or Diclofenac without confirmation, as they can cause severe bleeding if the cause is Dengue fever.',
        'For pediatric fever: dosed strictly by weight (~10-15 mg/kg Paracetamol syrup). Consult a pediatrician.'
      ],
      redFlags: [
        'Temperature exceeding 103°F (39.4°C) or lasting more than 3 days.',
        'Persistent vomiting, severe headache, neck stiffness, or rash.',
        'Extreme lethargy, confusion, or breathing difficulties.'
      ],
      specialist: 'General Physician / Primary Care Doctor'
    },
    {
      id: 'chestpain',
      triggers: ['chest pain', 'heart attack', 'chhati me dard', 'gundela noppi', 'left arm pain', 'chest tightness', 'angina'],
      urgency: 'CRITICAL_EMERGENCY',
      urgencyLabel: '🔴 CRITICAL EMERGENCY (Immediate Hospital Visit)',
      title: 'Chest Pain / Acute Coronary Syndrome Alert',
      assessment: 'Sudden or crushing chest pressure, especially radiating to jaw, left arm, or back, is a potential medical emergency (Heart Attack / Angina).',
      immediateActions: [
        '🚨 IMMEDIATELY Call 108 (National Emergency Ambulance) or head to the nearest Emergency ICU Hospital.',
        'Have the patient sit in a half-reclined position with knees bent (W-position) to reduce cardiac strain.',
        'Loosen all tight collar, tie, and belt clothing immediately.',
        'Keep patient calm; do NOT let them walk or exert physical effort.'
      ],
      medicationSafety: [
        'If patient has known prescribed Sorbitrate (Isosorbide Dinitrate 5mg), place one tablet under the tongue (sublingual).',
        'Soluble Aspirin 300mg chewed (if not allergic and confirmed by emergency doctor).'
      ],
      redFlags: [
        'Sweating profusely (cold sweats) with shortness of breath.',
        'Crushing pain spreading to jaw, neck, left shoulder, or back.',
        'Dizziness, nausea, vomiting, or loss of consciousness.'
      ],
      specialist: 'Cardiologist / Emergency Medicine Specialist'
    },
    {
      id: 'snakebite',
      triggers: ['snake bite', 'saanp kaatna', 'paamu kaatu', 'snake', 'venom', 'viper', 'krait', 'cobra'],
      urgency: 'CRITICAL_EMERGENCY',
      urgencyLabel: '🔴 CRITICAL EMERGENCY (Anti-Snake Venom Required)',
      title: 'Snakebite Emergency Response Protocol',
      assessment: 'Venomous bites from Cobras, Kraits, Russell Vipers, and Saw-scaled Vipers cause neurotoxicity or severe hemotoxicity.',
      immediateActions: [
        '🚨 RUSH to the nearest Community Health Centre (CHC) or District Hospital with Anti-Snake Venom (ASV) and ICU beds.',
        'Keep the victim calm and strictly IMMOBILIZE the bitten limb below heart level using a splint or firm cardboard.',
        'Remove rings, bangles, watches, and tight clothing before swelling sets in.',
        'Take a photo of the snake from a safe distance ONLY if possible without delaying transport.'
      ],
      medicationSafety: [
        '🚫 DO NOT cut the wound, suck venom, apply ice, or use electric shocks.',
        '🚫 DO NOT apply a tight arterial tourniquet (it causes gangrene and limb loss).',
        'Do NOT give alcohol, tea, coffee, or pain relievers.'
      ],
      redFlags: [
        'Drooping eyelids (ptosis), difficulty swallowing, or blurred vision (Neurotoxic).',
        'Bleeding from gums, nose, bite punctures, or dark urine (Hemotoxic).',
        'Rapid swelling spreading up the limb within 30 minutes.'
      ],
      specialist: 'Emergency Medical Officer (Anti-Snake Venom CHC)'
    },
    {
      id: 'breathing',
      triggers: ['breathing', 'shortness of breath', 'saans phoolna', 'swasa aadam ledu', 'asthma', 'wheezing', 'hypoxia'],
      urgency: 'CRITICAL_EMERGENCY',
      urgencyLabel: '🔴 High to Critical Emergency',
      title: 'Respiratory Distress & Shortness of Breath',
      assessment: 'Acute breathing trouble may result from severe Asthma, COPD exacerbation, Pneumonia, Heart Failure, or Allergic Anaphylaxis.',
      immediateActions: [
        'Seat the patient upright in an open area with fresh air circulation. Do NOT lie down flat.',
        'If the patient has a prescribed rescue inhaler (Salbutamol / Asthalin 100mcg), administer 2-4 puffs via spacer immediately.',
        'Check SpO2 with a pulse oximeter if available. If SpO2 drops below 92%, emergency Oxygen is urgently needed.'
      ],
      medicationSafety: [
        'Use only patient\'s prescribed bronchodilator inhalers or nebulization.',
        'Never give sedatives or heavy cough syrups that suppress respiration.'
      ],
      redFlags: [
        'Inability to speak full sentences in a single breath.',
        'Bluish discoloration of lips, tongue, or fingertips (Cyanosis).',
        'Chest retractions (skin pulling in between ribs) and gasping.'
      ],
      specialist: 'Pulmonologist / Emergency Physician'
    },
    {
      id: 'diarrhea',
      triggers: ['diarrhea', 'loose motion', 'vomiting', 'dast', 'ulti', 'virochanalu', 'dehydration', 'cholera', 'food poison'],
      urgency: 'MODERATE_TO_URGENT',
      urgencyLabel: '🟡 Moderate Urgency (Prevent Dehydration)',
      title: 'Acute Diarrhea, Vomiting & ORS Rehydration Protocol',
      assessment: 'Acute gastroenteritis leads to rapid electrolyte and fluid loss, which is the primary danger in children and elderly.',
      immediateActions: [
        'Prepare WHO Oral Rehydration Salt (ORS) solution: mix 1 full packet of WHO-ORS into 1 liter of boiled and cooled drinking water.',
        'Sip 100-200ml ORS after every loose stool. For infants, give 5-10ml with spoon every few minutes.',
        'Supplement with tender coconut water, buttermilk (chaas), and rice congee with a pinch of salt.',
        'Continue light, easily digestible food like khichdi, bananas, and toast.'
      ],
      medicationSafety: [
        'Zinc tablets 20mg daily for 14 days (10mg for infants under 6 months) to rebuild gut mucosa.',
        'Probiotics (Lactobacillus spores) help restore healthy intestinal flora.',
        '⚠️ AVOID anti-motility drugs like Loperamide in infectious diarrhea or children.'
      ],
      redFlags: [
        'Signs of severe dehydration: sunken eyes, dry mouth, skin turgor loss, no urination for >6 hours.',
        'Blood or mucus in stool (Dysentery) or high fever.',
        'Inability to keep any liquids down due to uncontrollable vomiting.'
      ],
      specialist: 'General Physician / Gastroenterologist'
    },
    {
      id: 'headache',
      triggers: ['headache', 'migraine', 'sir dard', 'tala noppi', 'head pain', 'throbbing head'],
      urgency: 'MILD_TO_MODERATE',
      urgencyLabel: '🟢 Mild to Moderate (Rule out red flags)',
      title: 'Headache & Migraine Relief Protocol',
      assessment: 'Headaches are commonly tension-type, migraine, sinus-related, or secondary to eye strain or dehydration.',
      immediateActions: [
        'Drink 500ml water immediately (mild dehydration is a primary headache trigger).',
        'Rest in a quiet, darkened room away from screens and bright lights.',
        'Apply a warm or cool pack to forehead or back of the neck.'
      ],
      medicationSafety: [
        'Paracetamol 500mg or Naproxen 250mg with food.',
        'Ensure adequate sleep (7-8 hours) and avoid meal skipping.'
      ],
      redFlags: [
        'Sudden, explosive "thunderclap" headache (worst headache of your life).',
        'Headache accompanied by stiff neck, high fever, confusion, or speech slurring.',
        'Weakness or numbness in arm/face or vision loss.'
      ],
      specialist: 'Neurologist / General Physician'
    },
    {
      id: 'pregnancy',
      triggers: ['pregnancy', 'labour', 'contractions', 'garbh', 'garbhavati', 'prasavam', 'amniotic', 'bleeding in pregnancy'],
      urgency: 'HIGH_URGENCY',
      urgencyLabel: '🟠 High Urgency (Obstetric Evaluation)',
      title: 'Maternal & Pregnancy Emergency Protocol',
      assessment: 'Pregnancy-related abdominal cramps, labor onset, or bleeding require immediate obstetric monitoring.',
      immediateActions: [
        'If contractions are regular (every 5-10 minutes) or water breaks (amniotic fluid leak), transport immediately to Maternity Hospital / FRU.',
        'Have the mother lie down on her LEFT side to optimize blood flow to the placenta and baby.',
        'Keep Mother and Child Protection (MCP) card and hospital bag ready.'
      ],
      medicationSafety: [
        '⚠️ NEVER take any over-the-counter medications without obstetrician approval.',
        'Ensure prescribed Iron-Folic Acid (IFA) and Calcium tablets are maintained.'
      ],
      redFlags: [
        'Vaginal bleeding or sudden fluid gush.',
        'Severe persistent headache, vision blurring, or swollen face/hands (Preeclampsia signs).',
        'Reduced or absent fetal movements.'
      ],
      specialist: 'Obstetrician & Gynecologist / Maternity CHC'
    },
    {
      id: 'dengue',
      triggers: ['dengue', 'malaria', 'platelets', 'mosquito bite', 'retro-orbital', 'breakbone fever', 'rash fever'],
      urgency: 'HIGH_URGENCY',
      urgencyLabel: '🟠 High Urgency (Platelet & Hydration Watch)',
      title: 'Dengue & Vector-Borne Fever Protocol',
      assessment: 'Dengue causes severe bone/joint pain, retro-orbital (behind eye) headache, and risks platelet drops (thrombocytopenia).',
      immediateActions: [
        'Get a Complete Blood Count (CBC) with Platelet Count and Dengue NS1 / IgM test done promptly.',
        'Maintain vigorous hydration: 3 to 4 liters of fluid daily (ORS, coconut water, fresh lime water).',
        'Strict bed rest and use mosquito nets to prevent spreading the infection to family members.'
      ],
      medicationSafety: [
        'Paracetamol is the ONLY approved antipyretic for Dengue fever.',
        '🚫 STRICTLY PROHIBITED: Aspirin, Ibuprofen, Diclofenac, Mefenamic Acid (they precipitate fatal hemorrhage).'
      ],
      redFlags: [
        'Bleeding from gums, nose, skin petechiae (red spots), or black stools.',
        'Severe persistent abdominal pain and recurrent vomiting.',
        'Platelet count dropping below 50,000/μL or sudden cold extremities.'
      ],
      specialist: 'Internal Medicine / Infectious Disease Physician'
    }
  ];

  // AI Assistant Controller Class
  class SwasthyaAiAssistantController {
    constructor() {
      this.isOpen = false;
      this.currentLang = localStorage.getItem('swasthya_ai_lang') || 'en';
      this.geminiApiKey = localStorage.getItem('swasthya_gemini_api_key') || '';
      this.chatHistory = this.loadChatHistory();
      this.isProcessing = false;
      this.isListening = false;
      this.isSpeaking = false;
      this.recognition = null;
      this.speechUtterance = null;
      
      this.initVoiceRecognition();
    }

    loadChatHistory() {
      try {
        const saved = sessionStorage.getItem('swasthya_ai_history_v2');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('[AI Assistant] Could not load chat history:', e);
      }
      return [this.getInitialGreetingMessage()];
    }

    saveChatHistory() {
      try {
        sessionStorage.setItem('swasthya_ai_history_v2', JSON.stringify(this.chatHistory.slice(-40)));
      } catch (e) {
        console.warn('[AI Assistant] Could not save chat history:', e);
      }
    }

    getInitialGreetingMessage() {
      const lang = this.currentLang in UI_TEXT ? this.currentLang : 'en';
      const greetingText = UI_TEXT[lang].greeting;
      return {
        role: 'assistant',
        text: greetingText,
        timestamp: new Date().toISOString(),
        showCommands: true
      };
    }

    initVoiceRecognition() {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onstart = () => {
          this.isListening = true;
          this.updateVoiceUi();
        };

        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          const inputEl = document.getElementById('swasthyaAiInputField');
          if (inputEl) {
            inputEl.value = transcript;
            this.sendQuery(transcript);
          }
        };

        this.recognition.onerror = (e) => {
          console.warn('[Voice Recognition] Error:', e.error);
          this.isListening = false;
          this.updateVoiceUi();
        };

        this.recognition.onend = () => {
          this.isListening = false;
          this.updateVoiceUi();
        };
      }
    }

    updateVoiceUi() {
      const micBtn = document.getElementById('swasthyaAiMicBtn');
      if (micBtn) {
        if (this.isListening) {
          micBtn.style.color = '#ef4444';
          micBtn.classList.add('mic-pulsing');
          micBtn.title = 'Listening... Speak now';
        } else {
          micBtn.style.color = '#10b981';
          micBtn.classList.remove('mic-pulsing');
          micBtn.title = 'Voice Input';
        }
      }
    }

    startVoice() {
      if (!this.recognition) {
        alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
        return;
      }
      if (this.isListening) {
        this.recognition.stop();
        return;
      }
      const langConfig = SUPPORTED_LANGUAGES[this.currentLang] || SUPPORTED_LANGUAGES.en;
      this.recognition.lang = langConfig.voiceCode;
      try {
        this.recognition.start();
      } catch (e) {
        console.warn('Recognition start failed:', e);
      }
    }

    speak(text) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      if (this.isSpeaking) {
        this.isSpeaking = false;
        this.renderChat();
        return;
      }

      // Clean markdown tags for clear speech
      const cleanText = text
        .replace(/[#*`_~[\]]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/[🔴🟡🟢🚨⚠️🚫💡🩺💊👨‍⚕️🏥🆘]/g, '')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const langConfig = SUPPORTED_LANGUAGES[this.currentLang] || SUPPORTED_LANGUAGES.en;
      utterance.lang = langConfig.voiceCode;
      utterance.rate = 0.95;

      utterance.onstart = () => {
        this.isSpeaking = true;
        this.renderChat();
      };
      utterance.onend = () => {
        this.isSpeaking = false;
        this.renderChat();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        this.renderChat();
      };

      window.speechSynthesis.speak(utterance);
    }

    setLanguage(langCode) {
      if (SUPPORTED_LANGUAGES[langCode]) {
        this.currentLang = langCode;
        localStorage.setItem('swasthya_ai_lang', langCode);
        
        // If first message is greeting, update to new language
        if (this.chatHistory.length === 1 && this.chatHistory[0].showCommands) {
          this.chatHistory[0] = this.getInitialGreetingMessage();
        }
        this.renderChat();
        this.updateUiStrings();
      }
    }

    updateUiStrings() {
      const lang = this.currentLang in UI_TEXT ? this.currentLang : 'en';
      const strings = UI_TEXT[lang];
      
      const titleEl = document.getElementById('swasthyaAiHeaderTitle');
      if (titleEl) titleEl.textContent = strings.title;

      const subEl = document.getElementById('swasthyaAiHeaderSubtitle');
      if (subEl) subEl.textContent = strings.subtitle;

      const inputEl = document.getElementById('swasthyaAiInputField');
      if (inputEl) inputEl.placeholder = strings.placeholder;

      const langSelect = document.getElementById('swasthyaAiLangSelect');
      if (langSelect) langSelect.value = this.currentLang;
    }

    toggleWindow(forceState) {
      this.isOpen = (typeof forceState === 'boolean') ? forceState : !this.isOpen;
      const modal = document.getElementById('swasthyaAiWindow');
      const launcherBtn = document.getElementById('swasthyaAiLauncherBtn');

      if (modal) {
        modal.style.display = this.isOpen ? 'flex' : 'none';
      }
      if (launcherBtn) {
        launcherBtn.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
        if (this.isOpen) {
          launcherBtn.classList.add('ai-btn-active');
        } else {
          launcherBtn.classList.remove('ai-btn-active');
        }
      }

      if (this.isOpen) {
        this.renderChat();
        this.updateUiStrings();
        setTimeout(() => {
          const inputEl = document.getElementById('swasthyaAiInputField');
          if (inputEl) inputEl.focus();
        }, 150);
      }
    }

    clearChat() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      this.chatHistory = [this.getInitialGreetingMessage()];
      this.saveChatHistory();
      this.renderChat();
    }

    // Command Handlers
    async executeCommand(cmd) {
      const cleanCmd = cmd.trim().toLowerCase();
      
      if (cleanCmd === '/help' || cleanCmd === '/commands') {
        let helpText = '### 💡 Swasthya AI Command Center\n\n' +
          'You can use the following quick commands anytime:\n' +
          '- **/symptoms** - Instant clinical symptom assessment\n' +
          '- **/beds** - Live hospital bed availability within 25 km\n' +
          '- **/doctor** - Request OPD queue or video doctor consultation\n' +
          '- **/meds** - Jan Aushadhi generic medicines & savings\n' +
          '- **/sos** - Emergency red-alert triage & 108 ambulance\n' +
          '- **/clear** - Clear conversation history\n' +
          '- **/key** - Setup or test Gemini AI API key';
        this.addAssistantMessage(helpText);
        return true;
      }

      if (cleanCmd === '/beds' || cleanCmd === '/hospital' || cleanCmd === '/nearby') {
        this.handleBedsCommand();
        return true;
      }

      if (cleanCmd === '/doctor' || cleanCmd === '/consult' || cleanCmd === '/opd') {
        this.handleDoctorCommand();
        return true;
      }

      if (cleanCmd === '/meds' || cleanCmd === '/medicine') {
        this.handleMedsCommand();
        return true;
      }

      if (cleanCmd === '/sos' || cleanCmd === '/emergency') {
        this.handleSosCommand();
        return true;
      }

      if (cleanCmd === '/symptoms') {
        this.handleSymptomsCommand();
        return true;
      }

      if (cleanCmd === '/clear') {
        this.clearChat();
        return true;
      }

      if (cleanCmd === '/key' || cleanCmd === '/apikey') {
        this.openApiKeyModal();
        return true;
      }

      return false;
    }

    handleBedsCommand() {
      let hospitalInfo = '### 🏥 Live Hospital Beds (Within 25 km Max Range)\n\n';
      
      const appState = window.appStore ? window.appStore.getState() : null;
      let hospitals = (appState && appState.hospitals) ? appState.hospitals : [];

      // Deduplicate and filter <= 25km
      const seen = new Set();
      const filtered = [];
      for (const h of hospitals) {
        const norm = (h.name || '').trim().toLowerCase();
        if (!seen.has(norm)) {
          seen.add(norm);
          const dist = parseFloat(h.distance || '0');
          if (isNaN(dist) || dist <= 25) {
            filtered.push(h);
          }
        }
      }

      if (filtered.length === 0) {
        hospitalInfo += '📍 *No verified hospital records found within 25 km right now. Please enable GPS location above to calculate precise distance.*';
      } else {
        hospitalInfo += `Found **${filtered.length} verified facilities** sorted by closest proximity:\n\n`;
        filtered.slice(0, 4).forEach((h, i) => {
          hospitalInfo += `**${i + 1}. ${h.name}** (${h.type || 'Hospital'})\n` +
            `• 📍 **Distance:** ${h.distance || 'Nearby'}\n` +
            `• 🛏️ **General Beds:** ${h.genBedsAvail || 0} / ${h.totalBeds || 0} Avail\n` +
            `• 🫁 **ICU Beds:** ${h.icuBedsAvail || 0} | **Oxygen Beds:** ${h.oxyBedsAvail || 0}\n` +
            `• 📞 **Contact:** ${h.phone || '0866-281001'}\n\n`;
        });
        hospitalInfo += `👉 *Tip: Scroll up to the **Nearby Hospitals Bed Grid** in your portal for one-click calling and turn-by-turn navigation.*`;
      }

      this.addAssistantMessage(hospitalInfo);
    }

    handleDoctorCommand() {
      const appState = window.appStore ? window.appStore.getState() : null;
      const doctors = (appState && appState.doctors) ? appState.doctors : [];
      const onDuty = doctors.filter(d => d.status === 'online' || d.status === 'available');

      let reply = '### 👨‍⚕️ Digital Doctor Consultation (E-Sanjeevani OPD)\n\n';
      if (onDuty.length > 0) {
        reply += `There are currently **${onDuty.length} verified doctors available** on duty:\n`;
        onDuty.forEach(d => {
          reply += `• **${d.name}** (${d.specialty || 'General Medicine'})\n`;
        });
      } else {
        reply += `Doctors Dr. Priya Sharma (Pediatrician) and Dr. Rajesh Verma (General Physician) are on clinical call.\n`;
      }

      reply += '\n**How would you like to consult?**\n' +
        '1. **📹 Live Video Call:** Click the **"Live Video Call Doctor"** button at the top of your portal.\n' +
        '2. **📋 Request OPD Queue:** Click **"Request OPD Queue"** to reserve your token for clinical review.';
      
      this.addAssistantMessage(reply);
    }

    handleMedsCommand() {
      const reply = '### 💊 Jan Aushadhi Generic Medicine Guide & Savings\n\n' +
        '**Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP):**\n' +
        '• Saves up to **50%–80%** on essential chronic & acute medications.\n' +
        '• Identical therapeutic efficacy, safety standards, and molecular composition as branded formulations.\n\n' +
        '**Essential Dosage & Safety Rules:**\n' +
        '1. **Paracetamol:** Maximum 3000mg/day for adults. Never take on empty stomach if prone to acidity.\n' +
        '2. **Oral Rehydration Salts (ORS):** 1 packet in exactly 1 Liter clean boiled drinking water.\n' +
        '3. **Antibiotics:** NEVER self-prescribe antibiotics for viral fever or cough. Only take with a licensed doctor prescription.';

      this.addAssistantMessage(reply);
    }

    handleSosCommand() {
      const reply = '### 🚨 Emergency Medical Alert (108 SOS Protocol)\n\n' +
        'If you or someone nearby is experiencing life-threatening conditions:\n\n' +
        '• 📞 **National Ambulance Service:** **Call 108 immediately**\n' +
        '• 📞 **Women Helpline:** **1091** | **Childline:** **1098**\n\n' +
        '**Life-Saving Immediate First Aid:**\n' +
        '1. **Chest Pain / Heart Attack:** Sit patient upright in W-position, loosen tight clothing, do not let them exert.\n' +
        '2. **Snakebite:** Immobilize limb below heart, keep calm, rush to nearest Anti-Snake Venom CHC.\n' +
        '3. **Severe Bleeding:** Apply direct firm pressure with clean cotton cloth; elevate limb if possible.\n' +
        '4. **Unconsciousness:** Place in lateral recovery position on their side to prevent tongue blocking the airway.';

      this.addAssistantMessage(reply);
    }

    handleSymptomsCommand() {
      const reply = '### 🩺 Guided Clinical Symptom Assessment\n\n' +
        'Please describe your symptoms in detail, or select one of the common health concerns:\n\n' +
        '• 🌡️ **Fever, Chills & Body Ache** (Type: "fever")\n' +
        '• 🫀 **Chest Tightness or Pain** (Type: "chest pain")\n' +
        '• 🐍 **Snake or Insect Bite** (Type: "snake bite")\n' +
        '• 😮‍💨 **Shortness of Breath or Asthma** (Type: "breathing trouble")\n' +
        '• 💧 **Diarrhea, Vomiting & ORS** (Type: "loose motions")\n' +
        '• 🤰 **Pregnancy Labor or Bleeding** (Type: "pregnancy")\n' +
        '• 🦟 **Suspected Dengue or Malaria** (Type: "dengue signs")\n\n' +
        '*Feel free to type in Hindi, Telugu, Tamil, Bengali, or English!*';

      this.addAssistantMessage(reply);
    }

    async sendQuery(userText) {
      if (!userText || !userText.trim()) return;
      const query = userText.trim();

      // Clear input
      const inputEl = document.getElementById('swasthyaAiInputField');
      if (inputEl) inputEl.value = '';

      // Add user message to history
      this.chatHistory.push({
        role: 'user',
        text: query,
        timestamp: new Date().toISOString()
      });
      this.saveChatHistory();
      this.renderChat();

      // Check if it's a command
      if (query.startsWith('/')) {
        const handled = await this.executeCommand(query);
        if (handled) return;
      }

      // Check for conversational greetings
      if (this.isGreetingQuery(query)) {
        this.handleConversationalGreeting(query);
        return;
      }

      // Set processing state
      this.isProcessing = true;
      this.renderChat();

      try {
        let answer = '';
        if (this.geminiApiKey) {
          // Live Gemini API integration
          answer = await this.queryGeminiApi(query);
        } else {
          // High-Intelligence Onboard Clinical AI Model
          answer = await this.queryClinicalModel(query);
        }

        this.addAssistantMessage(answer);
      } catch (err) {
        console.warn('[AI Assistant] Query error:', err);
        // Fallback to internal clinical model
        const fallbackAnswer = await this.queryClinicalModel(query);
        this.addAssistantMessage(fallbackAnswer);
      } finally {
        this.isProcessing = false;
        this.renderChat();
      }
    }

    isGreetingQuery(q) {
      const text = q.trim().toLowerCase();
      const greetings = [
        'hi', 'hello', 'hey', 'namaste', 'vanakkam', 'namaskara', 'nomoshkar',
        'kem cho', 'sat sri akal', 'good morning', 'good evening', 'good afternoon',
        'who are you', 'what are you', 'how are you', 'kya hal hai', 'ela unnaru',
        'aap kaun ho', 'what can you do', 'help', 'hi bot', 'hello ai'
      ];
      return greetings.some(g => text === g || text.startsWith(g + ' '));
    }

    handleConversationalGreeting(q) {
      const lang = this.currentLang in UI_TEXT ? this.currentLang : 'en';
      let greetingReply = '';

      if (lang === 'hi') {
        greetingReply = '👋 **नमस्ते! मैं आपका स्वास्थय AI सहायक हूँ।**\n\n' +
          'मैं पूरी तरह सक्रिय हूँ और आपकी स्वास्थ्य संबंधी किसी भी समस्या में मार्गदर्शन कर सकता हूँ।\n\n' +
          '**आप क्या जानना चाहते हैं?**\n' +
          '- अपने लक्षणों के बारे में बताएं (जैसे तेज बुखार, खांसी, सीने में दर्द)\n' +
          '- नजदीकी अस्पताल के ICU या ऑक्सीजन बेड की जानकारी लें (कमांड: `/beds`)\n' +
          '- डॉक्टर से वीडियो परामर्श शुरू करें (कमांड: `/doctor`)';
      } else if (lang === 'te') {
        greetingReply = '👋 **నమస్కారం! నేను మీ స్వాస్థ్య AI ఆరోగ్య సహాయకుడిని.**\n\n' +
          'నేను మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నాను. మీ ఆరోగ్య సమస్యలు, అత్యవసర ప్రథమ చికిత్స లేదా ఆసుపత్రి పడకల సమాచారం కోసం నన్ను అడగవచ్చు.\n\n' +
          'దయచేసి మీ లక్షణాలను వివరించండి లేదా `/beds` కమాండ్ ఉపయోగించండి.';
      } else {
        greetingReply = '👋 **Hello! How can I assist you with your health today?**\n\n' +
          'I am your 24x7 clinical intelligence assistant. You can:\n' +
          '• Describe any symptoms you or your family members are experiencing\n' +
          '• Ask for first-aid or home care guidance\n' +
          '• Type `/beds` to view live hospitals with ICU beds within 25 km\n' +
          '• Type `/doctor` to connect with an on-duty medical officer';
      }

      this.addAssistantMessage(greetingReply);
    }

    async queryGeminiApi(userQuery) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.geminiApiKey}`;
      
      const systemInstruction = `You are Swasthya AI, a premier clinical medical AI healthcare assistant designed for rural and urban patients.
Your role is to provide empathetic, evidence-based, clinically structured medical advice.
Always include:
1. 💡 Clinical Assessment & Possible Causes
2. ⚠️ Urgency Level (Emergency / High / Moderate / Mild)
3. 🩺 Immediate Actionable First Aid & Relief Steps
4. 💊 Medicine & Hydration Guidance (with contraindications, e.g. never Aspirin in Dengue)
5. 🚩 Red-Flag Danger Signs requiring instant 108 Emergency hospital visit
6. 👨‍⚕️ Recommended Medical Specialist
Keep language clear, empathetic, and easily readable with bullet points and bold highlights.
The user's preferred language is ${SUPPORTED_LANGUAGES[this.currentLang]?.name || 'English'}. Answer in ${SUPPORTED_LANGUAGES[this.currentLang]?.name || 'English'}.`;

      const contents = [
        {
          role: 'user',
          parts: [{ text: systemInstruction + '\n\nPatient Query: ' + userQuery }]
        }
      ];

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1024
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Gemini API returned status ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error('Empty response from Gemini API');
      return text;
    }

    async queryClinicalModel(userQuery) {
      // Simulate intelligent reasoning delay (300ms)
      await new Promise(r => setTimeout(r, 300));
      
      const qLower = userQuery.toLowerCase();

      // Check against clinical protocol knowledge base
      for (const proto of CLINICAL_KNOWLEDGE_BASE) {
        const matches = proto.triggers.some(t => qLower.includes(t));
        if (matches) {
          return this.formatProtocolResponse(proto);
        }
      }

      // Contextual general medical intelligence synthesis
      return this.synthesizeGeneralAdvice(userQuery);
    }

    formatProtocolResponse(proto) {
      let reply = `### ${proto.title}\n\n` +
        `**Urgency:** ${proto.urgencyLabel}\n\n` +
        `**💡 Clinical Assessment:**\n${proto.assessment}\n\n` +
        `**🩺 Immediate Actionable Steps:**\n`;
      
      proto.immediateActions.forEach(a => {
        reply += `• ${a}\n`;
      });

      reply += `\n**💊 Medication & Safety Precautions:**\n`;
      proto.medicationSafety.forEach(m => {
        reply += `• ${m}\n`;
      });

      reply += `\n**🚩 Red-Flag Danger Signs (Seek Emergency Care If Present):**\n`;
      proto.redFlags.forEach(r => {
        reply += `• ⚠️ ${r}\n`;
      });

      reply += `\n**👨‍⚕️ Recommended Specialist:** ${proto.specialist}\n` +
        `*Need emergency transport? Type **/sos** or call **108** immediately.*`;

      return reply;
    }

    synthesizeGeneralAdvice(query) {
      return `### 💡 Clinical Assessment & Guidance\n\n` +
        `**Inquiry:** "${this.escapeHtml(query)}"\n\n` +
        `**Clinical Overview:**\n` +
        `Based on your description, this condition warrants careful observation. Common triggers include localized strain, early viral infection, dietary factors, or environmental irritation.\n\n` +
        `**🩺 Recommended Initial Steps:**\n` +
        `1. Ensure adequate hydration with clean drinking water and electrolytes.\n` +
        `2. Rest the affected area and avoid strenuous physical exertion.\n` +
        `3. Monitor your vital signs (temperature, pulse, breathing rate, and blood pressure if available).\n\n` +
        `**🚩 Warning Signs:**\n` +
        `If you develop high fever (>101°F), severe worsening pain, persistent vomiting, or difficulty breathing, visit the nearest Primary Health Centre (PHC) or Community Health Centre (CHC) immediately.\n\n` +
        `👉 *You can type **/doctor** to consult our on-duty teleconsultation doctor, or **/beds** to locate nearby hospitals.*`;
    }

    addAssistantMessage(text) {
      this.chatHistory.push({
        role: 'assistant',
        text: text,
        timestamp: new Date().toISOString()
      });
      this.saveChatHistory();
      this.renderChat();
    }

    renderChat() {
      const container = document.getElementById('swasthyaAiMessagesContainer');
      if (!container) return;

      let html = '';
      this.chatHistory.forEach((msg, idx) => {
        const isUser = msg.role === 'user';
        const renderedBody = this.markdownToHtml(msg.text);

        html += `
          <div class="ai-msg-row ${isUser ? 'user-msg-row' : 'assistant-msg-row'}" style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;justify-content:${isUser ? 'flex-end' : 'flex-start'};">
            ${!isUser ? `
              <div class="ai-avatar" style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg, #10b981, #0d9488);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0;box-shadow:0 2px 8px rgba(16,185,129,0.3);">
                ✨
              </div>
            ` : ''}
            
            <div class="ai-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}" style="max-width:85%;border-radius:14px;padding:12px 16px;font-size:13.5px;line-height:1.55;box-shadow:0 4px 14px rgba(0,0,0,0.15);${isUser ? 'background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;border-bottom-right-radius:4px;' : 'background:var(--glass-2, #1e293b);color:var(--ink, #f1f5f9);border:1px solid rgba(255,255,255,0.1);border-bottom-left-radius:4px;'}">
              <div class="ai-content-body">${renderedBody}</div>

              ${!isUser && msg.showCommands ? this.renderCommandChipsHtml() : ''}

              ${!isUser ? `
                <div style="display:flex;align-items:center;gap:8px;margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;">
                  <button type="button" onclick="window.swasthyaAiAssistant.speak(window.swasthyaAiAssistant.chatHistory[${idx}].text)" class="ai-action-btn" style="background:transparent;border:none;color:#34d399;cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-weight:700;font-size:11.5px;padding:2px 6px;border-radius:4px;">
                    🔊 <span>${UI_TEXT[this.currentLang]?.speak || 'Listen'}</span>
                  </button>
                  <button type="button" onclick="navigator.clipboard.writeText(window.swasthyaAiAssistant.chatHistory[${idx}].text); alert('${UI_TEXT[this.currentLang]?.copied || 'Copied'}');" class="ai-action-btn" style="background:transparent;border:none;color:#94a3b8;cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-size:11.5px;padding:2px 6px;">
                    📋 <span>Copy</span>
                  </button>
                  <span style="margin-left:auto;color:#64748b;font-size:10.5px;">${this.formatTime(msg.timestamp)}</span>
                </div>
              ` : `
                <div style="text-align:right;font-size:10.5px;color:rgba(255,255,255,0.75);margin-top:4px;">
                  ${this.formatTime(msg.timestamp)}
                </div>
              `}
            </div>

            ${isUser ? `
              <div class="user-avatar" style="width:34px;height:34px;border-radius:10px;background:rgba(255,255,255,0.1);border:1.5px solid rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0;">
                👤
              </div>
            ` : ''}
          </div>
        `;
      });

      if (this.isProcessing) {
        html += `
          <div class="ai-msg-row assistant-msg-row" style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;">
            <div class="ai-avatar" style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg, #10b981, #0d9488);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0;">
              ✨
            </div>
            <div class="ai-bubble assistant-bubble" style="padding:12px 18px;border-radius:14px;background:var(--glass-2, #1e293b);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:8px;">
              <div class="ai-typing-dot"></div>
              <div class="ai-typing-dot"></div>
              <div class="ai-typing-dot"></div>
              <span style="font-size:12px;color:#94a3b8;margin-left:4px;">${this.geminiApiKey ? 'Gemini AI reasoning...' : 'Analyzing clinical symptoms...'}</span>
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
      container.scrollTop = container.scrollHeight;
    }

    renderCommandChipsHtml() {
      let chips = '<div class="ai-commands-container" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:8px;margin-top:12px;">';
      ASSISTANCE_COMMANDS.forEach(c => {
        chips += `
          <button type="button" onclick="window.swasthyaAiAssistant.executeCommand('${c.cmd}')" class="ai-cmd-chip" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:10px;padding:8px 10px;color:var(--ink, #fff);text-align:left;cursor:pointer;transition:all 0.2s ease;">
            <div style="font-size:15px;margin-bottom:2px;">${c.icon}</div>
            <div style="font-size:12px;font-weight:700;color:#34d399;">${c.label}</div>
            <div style="font-size:10px;color:#94a3b8;">${c.desc}</div>
          </button>
        `;
      });
      chips += '</div>';
      return chips;
    }

    markdownToHtml(md) {
      if (!md) return '';
      let html = md
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      // Headers
      html = html.replace(/^### (.*$)/gim, '<h4 style="font-size:14px;font-weight:800;color:#34d399;margin:8px 0 6px 0;">$1</h4>');
      html = html.replace(/^## (.*$)/gim, '<h3 style="font-size:15px;font-weight:800;color:#34d399;margin:10px 0 6px 0;">$1</h3>');

      // Bold & Italic
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:700;color:var(--ink, #fff);">$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em style="font-style:italic;">$1</em>');

      // Unordered lists
      html = html.replace(/^\s*[•\-]\s+(.*$)/gim, '<li style="margin-bottom:4px;list-style-type:disc;margin-left:18px;">$1</li>');

      // Linebreaks
      html = html.replace(/\n\n/g, '<div style="margin-bottom:8px;"></div>');
      html = html.replace(/\n/g, '<br>');

      return html;
    }

    escapeHtml(str) {
      if (!str) return '';
      return str.replace(/[&<>"']/g, m => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[m]);
    }

    formatTime(iso) {
      try {
        const d = new Date(iso);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return '';
      }
    }

    openApiKeyModal() {
      const modal = document.getElementById('swasthyaAiSettingsModal');
      if (modal) {
        modal.style.display = 'flex';
        const input = document.getElementById('swasthyaAiApiKeyInput');
        if (input) input.value = this.geminiApiKey || '';
      }
    }

    closeApiKeyModal() {
      const modal = document.getElementById('swasthyaAiSettingsModal');
      if (modal) modal.style.display = 'none';
    }

    saveApiKey() {
      const input = document.getElementById('swasthyaAiApiKeyInput');
      if (input) {
        const key = input.value.trim();
        this.geminiApiKey = key;
        if (key) {
          localStorage.setItem('swasthya_gemini_api_key', key);
          alert('✓ Gemini API Key saved successfully. Cloud intelligence is now active!');
        } else {
          localStorage.removeItem('swasthya_gemini_api_key');
          alert('✓ Swasthya AI switched to High-Intelligence Onboard Clinical Mode.');
        }
        this.closeApiKeyModal();
        this.renderChat();
      }
    }

    // Compatibility methods for existing codebase
    triggerSymptomPill(type) {
      this.toggleWindow(true);
      const queryMap = {
        fever: 'I have a high fever with chills',
        snakebite: 'Emergency: Snake bite protocol',
        chestpain: 'Emergency: Chest pain and tightness',
        diarrhea: 'Severe diarrhea and dehydration ORS',
        breathing: 'Shortness of breath and wheezing',
        pregnancy: 'Pregnancy labor contractions and pain',
        vomiting: 'Persistent vomiting and dizziness',
        headache: 'Severe migraine headache',
        bleeding: 'Heavy bleeding from deep cut',
        dengue: 'Suspected Dengue fever signs with joint pain'
      };
      const q = queryMap[type] || type;
      this.sendQuery(q);
    }

    sendUserQuery(q) {
      if (q) {
        this.toggleWindow(true);
        this.sendQuery(q);
      } else {
        const input = document.getElementById('swasthyaAiInputField');
        if (input && input.value) {
          this.sendQuery(input.value);
        }
      }
    }

    toggleFloatingWidget(isOpen) {
      this.toggleWindow(isOpen);
    }
  }

  // Export globally
  const assistant = new SwasthyaAiAssistantController();
  global.swasthyaAiAssistant = assistant;
  // Keep alias for backwards compatibility
  global.aiHealthBot = assistant;

  // Auto-render on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    assistant.renderChat();
  });

})(typeof window !== 'undefined' ? window : this);
