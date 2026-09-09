/**
 * =============================================================================
 * SWASTHYA SETU — PRODUCTION AI HEALTH TRIAGE CONTROLLER (Swasthya AI)
 * Real-time Clinical Triage Assistant with Multilingual & Voice Support
 * =============================================================================
 */

(function(global) {
  'use strict';

  const SUPPORTED_LANGS = {
    en: { name: 'English', voiceCode: 'en-IN' },
    hi: { name: 'हिंदी', voiceCode: 'hi-IN' },
    gu: { name: 'ગુજરાતી', voiceCode: 'gu-IN' },
    mr: { name: 'मराठी', voiceCode: 'mr-IN' },
    ta: { name: 'தமிழ்', voiceCode: 'ta-IN' },
    te: { name: 'తెలుగు', voiceCode: 'te-IN' },
    bn: { name: 'বাংলা', voiceCode: 'bn-IN' }
  };

  const I18N_TEXT = {
    en: {
      title: 'Swasthya AI',
      subtitle: 'AI Health Triage Assistant',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: '⚠️ AI guidance is for information and triage only and does not replace a qualified healthcare professional.',
      placeholder: 'Describe symptoms (e.g. fever, headache)...',
      send: 'Send',
      thinking: 'Analyzing symptoms...',
      error: 'Sorry, could not process your health query. Please check your connection or retry.',
      retry: 'Retry',
      tooFast: 'You are sending messages too quickly. Please wait a moment before trying again.',
      tooLong: 'Please shorten your message (maximum 4,000 characters).',
      listen: 'Read Aloud',
      stopAudio: 'Stop',
      copied: 'Copied to clipboard!',
      quickLabel: 'Suggested topics:'
    },
    hi: {
      title: 'स्वास्थ्य AI',
      subtitle: 'AI स्वास्थ्य ट्राइएज',
      welcome: 'नमस्ते! मैं स्वास्थ्य AI हूँ, आपका स्वास्थ्य ट्राइएज सहायक। अपने लक्षणों या स्वास्थ्य संबंधी चिंताओं के बारे में बताएं, और मैं संभावित कारणों, चेतावनी संकेतों और आगे क्या करना है, यह समझने में आपकी मदद करूँगा।',
      disclaimer: '⚠️ AI मार्गदर्शन केवल जानकारी और ट्राइएज के लिए है और योग्य डॉक्टर का विकल्प नहीं है।',
      placeholder: 'लक्षण बताएं (जैसे बुखार, सिरदर्द)...',
      send: 'भेजें',
      thinking: 'लक्षणों का विश्लेषण जारी है...',
      error: 'क्षमा करें, अनुरोध पूरा नहीं हो सका। कृपया पुनः प्रयास करें।',
      retry: 'पुनः प्रयास करें',
      tooFast: 'आप बहुत तेज़ी से संदेश भेज रहे हैं। कृपया कुछ क्षण प्रतीक्षा करें।',
      tooLong: 'कृपया अपना संदेश छोटा करें (अधिकतम 4,000 अक्षर)।',
      listen: 'सुनें',
      stopAudio: 'रोकें',
      copied: 'कॉपी हो गया!',
      quickLabel: 'सुझाए गए विषय:'
    },
    gu: {
      title: 'સ્વાસ્થ્ય AI',
      subtitle: 'AI હેલ્થ ટ્રાયજ',
      welcome: 'નમસ્તે! હું સ્વાસ્થ્ય AI છું, તમારો હેલ્થ ટ્રાયજ સહાયક. તમારા લક્ષણો જણાવો, હું શક્ય કારણો અને યોગ્ય સલાહ આપીશ.',
      disclaimer: '⚠️ AI માર્ગદર્શન માત્ર માહિતી અને ટ્રાયજ માટે છે, ડૉક્ટરનો વિકલ્પ નથી.',
      placeholder: 'તમારા લક્ષણો વર્ણવો...',
      send: 'મોકલો',
      thinking: 'વિશ્લેષણ કરી રહ્યું છે...',
      error: 'વિનંતી પ્રક્રિયા કરવામાં નિષ્ફળ. ફરી પ્રયાસ કરો.',
      retry: 'ફરી પ્રયાસ કરો',
      tooFast: 'કૃપા કરીને થોડી રાહ જુઓ.',
      tooLong: 'સંદેશ 4,000 અક્ષરોથી નાનો હોવો જોઈએ.',
      listen: 'સાંભળો',
      stopAudio: 'રોકો',
      copied: 'કૉપિ થઈ ગયું!',
      quickLabel: 'સૂચિત વિષયો:'
    },
    mr: {
      title: 'स्वास्थ्य AI',
      subtitle: 'AI आरोग्य ट्रायज',
      welcome: 'नमस्कार! मी स्वास्थ्य AI आहे, तुमचा आरोग्य ट्रायज सहाय्यक. तुमची लक्षणे सांगा, मी संभाव्य कारणे आणि मार्गदर्शन देईन.',
      disclaimer: '⚠️ AI मार्गदर्शन केवळ माहितीसाठी आहे आणि डॉक्टरांचा पर्याय नाही.',
      placeholder: 'तुमची लक्षणे सांगा...',
      send: 'पाठवा',
      thinking: 'विश्लेषण करत आहे...',
      error: 'विनंती प्रक्रिया करण्यात अयशस्वी. पुन्हा प्रयत्न करा.',
      retry: 'पुन्हा प्रयत्न',
      tooFast: 'कृपया थोडा वेळ थांबा.',
      tooLong: 'संदेश 4,000 अक्षरांपेक्षा लहान असावा.',
      listen: 'ऐका',
      stopAudio: 'थांबवा',
      copied: 'कॉपी झाले!',
      quickLabel: 'सुचवलेले विषय:'
    },
    ta: {
      title: 'ஸ்வஸ்த்யா AI',
      subtitle: 'AI சுகாதார வழிகாட்டி',
      welcome: 'வணக்கம்! நான் ஸ்வஸ்த்யா AI. உங்கள் அறிகுறிகளைச் சொல்லுங்கள், தகுந்த வழிகாட்டலை வழங்குகிறேன்.',
      disclaimer: '⚠️ AI வழிகாட்டுதல் தகவலுக்கு மட்டுமே, மருத்துவருக்கு மாற்றாகாது.',
      placeholder: 'அறிகுறிகளை விவரிக்கவும்...',
      send: 'அனுப்பு',
      thinking: 'ஆராய்கிறது...',
      error: 'செயலாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      retry: 'மீண்டும் முயற்சி',
      tooFast: 'சிறிது நேரம் காத்திருக்கவும்.',
      tooLong: 'செய்தி 4,000 எழுத்துகளுக்குள் இருக்க வேண்டும்.',
      listen: 'கேட்க',
      stopAudio: 'நிறுத்து',
      copied: 'நகலெடுக்கப்பட்டது!',
      quickLabel: 'பரிந்துரைக்கப்பட்டவை:'
    },
    te: {
      title: 'స్వాస్థ్య AI',
      subtitle: 'AI హెల్త్ ట్రయాజ్',
      welcome: 'నమస్కారం! నేను స్వాస్థ్య AI, మీ ఆరోగ్య ట్రయాజ్ సహాయకుడిని. మీ లక్షణాలను తెలియజేయండి, సాధ్యమయ్యే కారణాలు, ప్రమాద సంకేతాలు మరియు తీసుకోవలసిన జాగ్రత్తలను వివరించడంలో నేను మీకు సహాయపడతాను.',
      disclaimer: '⚠️ AI మార్గదర్శకత్వం సమాచారం మరియు ట్రయాజ్ కోసం మాత్రమే, ఇది అర్హత కలిగిన వైద్యునికి ప్రత్యామ్నాయం కాదు.',
      placeholder: 'మీ లక్షణాలను వివరించండి...',
      send: 'పంపండి',
      thinking: 'ఆలోచిస్తున్నాను...',
      error: 'క్షమించండి, అభ్యర్థన ప్రాసెస్ చేయడం సాధ్యం కాలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.',
      retry: 'మళ్లీ ప్రయత్నించు',
      tooFast: 'మీరు చాలా వేగంగా సందేశాలు పంపుతున్నారు. దయచేసి కాసేపు వేచి ఉండండి.',
      tooLong: 'దయచేసి మీ సందేశాన్ని కుదించండి (గరిష్టంగా 4,000 అక్షరాలు).',
      listen: 'వినండి',
      stopAudio: 'ఆపండి',
      copied: 'కాపీ చేయబడింది!',
      quickLabel: 'సూచించిన అంశాలు:'
    },
    bn: {
      title: 'স্বাস্থ্য AI',
      subtitle: 'AI হেলথ ট্রায়াজ',
      welcome: 'নমস্কার! আমি স্বাস্থ্য AI, আপনার স্বাস্থ্য ট্রায়াজ সহায়ক। আপনার লক্ষণগুলি বলুন, আমি সঠিক পরামর্শ প্রদান করব।',
      disclaimer: '⚠️ AI নির্দেশিকা শুধুমাত্র তথ্য ও ট্রায়াজের জন্য, যোগ্য চিকিৎসকের বিকল্প নয়।',
      placeholder: 'লক্ষণগুলি লিখুন...',
      send: 'পাঠান',
      thinking: 'বিশ্লেষণ করা হচ্ছে...',
      error: 'অনুরোধটি ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
      retry: 'পুনরায় চেষ্টা',
      tooFast: 'দয়া করে একটু অপেক্ষা করুন।',
      tooLong: 'বার্তাটি ৪,০০০ অক্ষরের কম হতে হবে।',
      listen: 'শুনুন',
      stopAudio: 'থামুন',
      copied: 'কপি হয়েছে!',
      quickLabel: 'প্রস্তাবিত বিষয়:'
    }
  };

  const QUICK_PROMPTS = [
    { label: 'Check my symptoms', query: 'I would like to check my symptoms' },
    { label: 'Fever', query: 'I have a fever' },
    { label: 'Cough', query: 'I have a persistent cough' },
    { label: 'Headache', query: 'I have a headache' },
    { label: 'Stomach pain', query: 'My stomach hurts' },
    { label: 'Medication question', query: 'I have a question about my medication' }
  ];

  class SwasthyaAiChatController {
    constructor() {
      this.isOpen = false;
      this.isMinimized = false;
      this.isProcessing = false;
      this.currentLang = 'en';
      try {
        const savedLang = localStorage.getItem('swasthya_ai_lang');
        if (savedLang && SUPPORTED_LANGS[savedLang]) this.currentLang = savedLang;
      } catch (e) {}

      this.conversationId = null;
      try {
        this.conversationId = sessionStorage.getItem('swasthya_ai_conv_id') || null;
      } catch (e) {}

      this.chatHistory = this.loadHistory();
      this.lastFailedMessage = null;
      this.recognition = null;
      this.isRecording = false;
      this.isSpeaking = false;

      this.initVoiceInput();
      this.initKeyboardEsc();
    }

    loadHistory() {
      try {
        const saved = sessionStorage.getItem('swasthya_ai_history_v4');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      return [this.getWelcomeMessage()];
    }

    saveHistory() {
      try {
        sessionStorage.setItem('swasthya_ai_history_v4', JSON.stringify(this.chatHistory.slice(-30)));
        if (this.conversationId) {
          sessionStorage.setItem('swasthya_ai_conv_id', this.conversationId);
        }
      } catch (e) {}
    }

    getWelcomeMessage() {
      const strings = I18N_TEXT[this.currentLang] || I18N_TEXT.en;
      return {
        role: 'assistant',
        text: strings.welcome,
        triageLevel: 'LOW',
        timestamp: new Date().toISOString(),
        showQuickPrompts: true
      };
    }

    initVoiceInput() {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onstart = () => {
          this.isRecording = true;
          this.updateMicUi(true);
        };
        this.recognition.onresult = (e) => {
          const transcript = e.results[0][0].transcript;
          const input = document.getElementById('swasthyaAiInput');
          if (input) {
            input.value = transcript;
            this.sendUserMessage(transcript);
          }
        };
        this.recognition.onerror = () => {
          this.isRecording = false;
          this.updateMicUi(false);
        };
        this.recognition.onend = () => {
          this.isRecording = false;
          this.updateMicUi(false);
        };
      }
    }

    updateMicUi(isRecording) {
      this.isRecording = isRecording;
      const btn = document.getElementById('swasthyaAiMicBtn');
      if (btn) {
        btn.style.color = isRecording ? '#ef4444' : '#cbd5e1';
        btn.style.borderColor = isRecording ? '#ef4444' : 'rgba(255,255,255,0.15)';
      }
      const banner = document.getElementById('swasthyaAiRecordingBanner');
      if (banner) {
        banner.style.display = isRecording ? 'flex' : 'none';
      }
    }

    toggleVoiceInput() {
      if (!this.recognition) {
        alert('Voice input is supported in Google Chrome, Microsoft Edge, and modern mobile browsers.');
        return;
      }
      if (this.isRecording) {
        try { this.recognition.stop(); } catch (err) {}
        this.isRecording = false;
        this.updateMicUi(false);
      } else {
        this.startVoice();
      }
    }

    startVoice() {
      if (!this.recognition) return;
      const langConfig = SUPPORTED_LANGS[this.currentLang] || SUPPORTED_LANGS.en;
      this.recognition.lang = langConfig.voiceCode;
      try {
        this.recognition.start();
      } catch (e) {
        try { this.recognition.stop(); } catch (err) {}
      }
    }

    initKeyboardEsc() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.toggleWindow(false);
        }
      });
    }

    bindEvents() {
      const form = document.getElementById('swasthyaAiForm');
      if (form) {
        form.onsubmit = (e) => this.handleSend(e);
      }
      const sendBtn = document.getElementById('swasthyaAiSendBtn');
      if (sendBtn) {
        sendBtn.onclick = (e) => this.handleSend(e);
      }
      const input = document.getElementById('swasthyaAiInput');
      if (input) {
        input.onkeydown = (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSend(e);
          }
        };
      }
      const micBtn = document.getElementById('swasthyaAiMicBtn');
      if (micBtn) {
        micBtn.onclick = (e) => {
          e.preventDefault();
          this.toggleVoiceInput();
        };
      }
    }

    toggleWindow(forceState) {
      this.isOpen = (typeof forceState === 'boolean') ? forceState : !this.isOpen;
      const modal = document.getElementById('swasthyaAiWindow');
      const launcher = document.getElementById('swasthyaAiLauncherBtn');

      if (modal) {
        if (this.isOpen) {
          modal.style.setProperty('display', 'flex', 'important');
          this.isMinimized = false;
          modal.classList.remove('minimized');
          this.renderChat();
          this.updateStrings();
          this.bindEvents();
          setTimeout(() => {
            const input = document.getElementById('swasthyaAiInput');
            if (input) input.focus();
          }, 100);
        } else {
          modal.style.setProperty('display', 'none', 'important');
        }
      }

      if (launcher) {
        launcher.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
      }
    }

    setLanguage(langCode) {
      if (SUPPORTED_LANGS[langCode]) {
        this.currentLang = langCode;
        try { localStorage.setItem('swasthya_ai_lang', langCode); } catch (e) {}
        if (this.chatHistory.length === 1 && this.chatHistory[0].showQuickPrompts) {
          this.chatHistory[0] = this.getWelcomeMessage();
        }
        this.renderChat();
        this.updateStrings();
      }
    }

    updateStrings() {
      const strings = I18N_TEXT[this.currentLang] || I18N_TEXT.en;
      const titleEl = document.getElementById('swasthyaAiTitle');
      if (titleEl) titleEl.textContent = strings.title;
      const subEl = document.getElementById('swasthyaAiSubtitle');
      if (subEl) subEl.textContent = strings.subtitle;
      const inputEl = document.getElementById('swasthyaAiInput');
      if (inputEl) inputEl.placeholder = strings.placeholder;
      const langSel = document.getElementById('swasthyaAiLangSelect');
      if (langSel) langSel.value = this.currentLang;
      const banner = document.getElementById('swasthyaAiDisclaimer');
      if (banner) banner.textContent = strings.disclaimer;
    }

    populatePrompt(text) {
      const input = document.getElementById('swasthyaAiInput');
      if (input) {
        input.value = text;
        input.focus();
      }
    }

    getPatientContext() {
      try {
        const appState = window.appStore ? window.appStore.getState() : null;
        const user = (appState && (appState.currentUser || (appState.session && appState.session.user))) || {};
        return {
          age: user.age || null,
          gender: user.gender || null
        };
      } catch (e) {
        return {};
      }
    }

    handleSend(e) {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      const input = document.getElementById('swasthyaAiInput');
      const text = input ? input.value : '';
      if (!text || !text.trim()) return false;
      this.sendUserMessage(text.trim());
      return false;
    }

    generateOfflineTriage(query) {
      const q = (query || '').toLowerCase();
      
      // Emergency: chest pain
      if (q.includes('chest pain') || q.includes('heart attack') || q.includes('radiating to') || (q.includes('chest') && q.includes('sweat'))) {
        return {
          triageLevel: 'EMERGENCY',
          message: '### 🚨 EMERGENCY CLINICAL ALERT: Chest Pain Detected\n\n' +
            '**CRITICAL SAFETY DIRECTIVE:** Your symptoms indicate potential cardiovascular distress requiring IMMEDIATE medical intervention.\n\n' +
            '**IMMEDIATE ACTIONS:**\n' +
            '1. 🚨 **CALL NATIONAL AMBULANCE 108 OR EMERGENCY 112 IMMEDIATELY.**\n' +
            '2. Stop all physical activity and sit in a comfortable, propped-up position.\n' +
            '3. Loosen tight clothing around neck and waist.\n' +
            '4. Do NOT drive yourself to the hospital.',
          emergencyNotice: '🚨 EMERGENCY: CALL NATIONAL AMBULANCE 108 IMMEDIATELY'
        };
      }

      // Emergency: stroke FAST
      if (q.includes('stroke') || q.includes('slurred speech') || q.includes('facial droop') || q.includes('face droop') || (q.includes('cannot move') && q.includes('arm'))) {
        return {
          triageLevel: 'EMERGENCY',
          message: '### 🚨 EMERGENCY CLINICAL ALERT: Suspected Stroke (FAST Signs)\n\n' +
            '**CRITICAL SAFETY DIRECTIVE:** Sudden weakness, facial drooping, or slurred speech are potential indicators of acute stroke.\n\n' +
            '**IMMEDIATE ACTIONS:**\n' +
            '1. 🚨 **CALL NATIONAL AMBULANCE 108 IMMEDIATELY.** Time lost is brain lost.\n' +
            '2. Note the exact time symptoms started.\n' +
            '3. Do NOT give food, water, or oral medications.\n' +
            '4. Keep the patient in a safe recovery position.',
          emergencyNotice: '🚨 EMERGENCY: CALL 108 IMMEDIATELY'
        };
      }

      // Prescription refusal
      if (q.includes('prescribe') || q.includes('antibiotic') || q.includes('amoxicillin') || q.includes('azithromycin') || q.includes('dosage of')) {
        return {
          triageLevel: 'LOW',
          message: '### 💊 Medication & Prescription Policy\n\n' +
            'As an AI Health Triage Assistant, I **cannot prescribe antibiotics, prescription medications, or recommend clinical drug dosages**.\n\n' +
            'Prescription drugs require an in-person or verified telemedicine clinical examination by a licensed medical practitioner to prevent antibiotic resistance and adverse drug interactions.\n\n' +
            '👉 Please connect with an on-duty doctor on the Swasthya Setu portal or visit your nearest Primary Health Centre (PHC).'
        };
      }

      // Fever
      if (q.includes('fever') || q.includes('temperature') || q.includes('chills')) {
        const isUrgent = q.includes('3 day') || q.includes('4 day') || q.includes('high') || q.includes('shiver');
        return {
          triageLevel: isUrgent ? 'URGENT' : 'MODERATE',
          message: '### 🌡️ Clinical Assessment: Fever (' + (isUrgent ? 'URGENT' : 'MODERATE') + ')\n\n' +
            '**Possible Causes:** Acute viral illness, seasonal flu, respiratory tract infection, or vector-borne conditions (such as dengue or malaria).\n\n' +
            '**🩺 Safe Home Care & Observation:**\n' +
            '• Drink plenty of clean boiled water, ORS fluids, and warm broths to prevent dehydration.\n' +
            '• Use lukewarm water sponge compresses on forehead and neck.\n' +
            '• Rest in a well-ventilated room wearing light cotton clothing.\n\n' +
            '**🚩 Red-Flag Symptoms to Watch For:**\n' +
            '• Temperature > 103°F (39.4°C)\n' +
            '• Stiff neck, severe persistent vomiting, or skin rash/bleeding spots\n' +
            '• Fever lasting more than 48–72 hours\n\n' +
            '**👨‍⚕️ Recommended Professional:** General Physician or local Primary Health Centre (PHC) Medical Officer.'
        };
      }

      // Headache
      if (q.includes('headache') || q.includes('head hurt') || q.includes('migraine')) {
        return {
          triageLevel: 'LOW',
          message: '### 🧠 Clinical Assessment: Headache (LOW Urgency)\n\n' +
            '**Possible Causes:** Tension headache, eye strain, dehydration, irregular sleep, or mild sinus pressure.\n\n' +
            '**🩺 Safe Home Care Steps:**\n' +
            '• Drink 1–2 glasses of water to address possible dehydration.\n' +
            '• Take a break from computer and phone screens.\n' +
            '• Rest in a quiet, dimly lit room.\n\n' +
            '**🚩 Red-Flag Danger Signs:**\n' +
            '• Sudden \'thunderclap\' headache (worst pain of your life)\n' +
            '• Headache with fever and stiff neck, or sudden numbness/weakness\n\n' +
            '**👨‍⚕️ Recommended Next Step:** Home care observation; consult a physician if pain persists or recurs frequently.'
        };
      }

      // Cough / Cold
      if (q.includes('cough') || q.includes('cold') || q.includes('sore throat')) {
        return {
          triageLevel: 'LOW',
          message: '### 🫁 Clinical Assessment: Cough & Respiratory Symptoms (LOW Urgency)\n\n' +
            '**Possible Causes:** Common viral upper respiratory tract infection, seasonal allergy, or pharyngitis.\n\n' +
            '**🩺 Safe Home Care Steps:**\n' +
            '• Warm water gargles with a pinch of salt 2–3 times daily.\n' +
            '• Steam inhalation to relieve nasal and throat congestion.\n' +
            '• Sip warm water with honey and ginger.\n\n' +
            '**🚩 Red Flags:** Shortness of breath, chest pain when coughing, or coughing up blood.\n\n' +
            '**👨‍⚕️ Recommended Professional:** Primary Care Physician or Community Health Officer (CHO).'
        };
      }

      // Stomach Pain / Digestion
      if (q.includes('stomach') || q.includes('belly') || q.includes('vomit') || q.includes('diarrhea') || q.includes('loose')) {
        return {
          triageLevel: 'MODERATE',
          message: '### 🥣 Clinical Assessment: Digestive Symptoms (MODERATE Urgency)\n\n' +
            '**Possible Causes:** Acute gastritis, dietary indiscretion, mild gastroenteritis, or indigestion.\n\n' +
            '**🩺 Safe Home Care Steps:**\n' +
            '• Prepare WHO Oral Rehydration Salts (ORS) in 1 Liter clean boiled water and sip frequently.\n' +
            '• Eat light, bland foods (khichdi, curd rice, bananas).\n' +
            '• Avoid spicy, greasy, or raw street foods.\n\n' +
            '**🚩 Red Flags:** Severe unrelenting pain, blood in vomit or stools, or unable to retain any liquids for >6 hours.\n\n' +
            '**👨‍⚕️ Recommended Professional:** General Physician or Gastroenterologist.'
        };
      }

      // Default General Triage
      return {
        triageLevel: 'LOW',
        message: '### 🩺 Health Triage Guidance\n\n' +
          '**Clinical Assessment:** Your symptoms could be related to temporary environmental factors, localized strain, or a mild prodrome.\n\n' +
          '**🩺 Recommended Next Steps:**\n' +
          '1. Ensure adequate rest and stay well hydrated.\n' +
          '2. Monitor whether symptoms improve over the next 24 to 48 hours.\n' +
          '3. If symptoms worsen or you experience persistent discomfort, consult an on-duty doctor on Swasthya Setu.'
      };
    }

    async sendUserMessage(text) {
      if (this.isProcessing) return;

      const input = document.getElementById('swasthyaAiInput');
      const sendBtn = document.getElementById('swasthyaAiSendBtn');
      const micBtn = document.getElementById('swasthyaAiMicBtn');
      const strings = I18N_TEXT[this.currentLang] || I18N_TEXT.en;

      const query = (text || (input ? input.value : '') || '').trim();
      if (!query) return;

      if (query.length > 4000) {
        alert(strings.tooLong);
        return;
      }

      if (input) input.value = '';

      this.lastFailedMessage = null;
      this.chatHistory.push({
        role: 'user',
        text: query,
        timestamp: new Date().toISOString()
      });
      this.saveHistory();
      this.renderChat();

      this.isProcessing = true;
      if (sendBtn) sendBtn.disabled = true;
      if (input) input.disabled = true;
      if (micBtn) micBtn.disabled = true;
      this.renderChat();

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 16000);

      try {
        let result = null;

        // Try API client first
        if (window.swasthyaAPI && typeof window.swasthyaAPI.sendAiTriageMessage === 'function') {
          try {
            result = await window.swasthyaAPI.sendAiTriageMessage({
              message: query,
              conversationId: this.conversationId,
              language: this.currentLang,
              patientContext: this.getPatientContext()
            });
            if (result && result.conversationId) {
              this.conversationId = result.conversationId;
            }
          } catch (apiErr) {
            console.warn('[Swasthya AI] API Client attempt:', apiErr.message);
          }
        }

        // Direct fetch fallback if API client didn't return success
        if (!result || !result.success) {
          const endpoints = [
            '/api/ai/triage/chat',
            'http://localhost:5000/api/ai/triage/chat',
            'http://localhost:54321/api/ai/triage/chat'
          ];
          for (const ep of endpoints) {
            try {
              const res = await fetch(ep, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({
                  message: query,
                  conversationId: this.conversationId,
                  language: this.currentLang,
                  patientContext: this.getPatientContext()
                })
              });
              if (res.ok) {
                const data = await res.json();
                if (data && data.success) {
                  result = data;
                  if (data.conversationId) this.conversationId = data.conversationId;
                  break;
                }
              }
            } catch (fetchErr) {
              // try next endpoint
            }
          }
        }

        clearTimeout(timeoutId);

        // If backend is unreachable or offline, provide safe offline clinical triage
        if (!result || !result.success) {
          result = this.generateOfflineTriage(query);
          result.success = true;
          if (!this.conversationId) {
            this.conversationId = 'local_' + Date.now().toString(36);
          }
          result.conversationId = this.conversationId;
        }

        this.chatHistory.push({
          role: 'assistant',
          text: result.message || result.summary || 'Guidance received.',
          triageLevel: result.triageLevel || 'LOW',
          emergencyNotice: result.emergencyNotice || null,
          disclaimer: result.disclaimer || null,
          timestamp: new Date().toISOString()
        });
        this.saveHistory();
      } catch (err) {
        clearTimeout(timeoutId);
        const fallback = this.generateOfflineTriage(query);
        this.chatHistory.push({
          role: 'assistant',
          text: fallback.message,
          triageLevel: fallback.triageLevel || 'LOW',
          emergencyNotice: fallback.emergencyNotice || null,
          timestamp: new Date().toISOString()
        });
        this.saveHistory();
      } finally {
        this.isProcessing = false;
        if (sendBtn) sendBtn.disabled = false;
        if (input) {
          input.disabled = false;
          input.focus();
        }
        if (micBtn) micBtn.disabled = false;
        this.renderChat();
      }
    }

    retryLast() {
      if (!this.lastFailedMessage) return;
      const msg = this.lastFailedMessage;
      if (this.chatHistory.length > 0 && this.chatHistory[this.chatHistory.length - 1].isError) {
        this.chatHistory.pop();
      }
      this.sendUserMessage(msg);
    }

    clearChat() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      this.chatHistory = [this.getWelcomeMessage()];
      this.conversationId = null;
      sessionStorage.removeItem('swasthya_ai_history_v4');
      sessionStorage.removeItem('swasthya_ai_conv_id');
      this.saveHistory();
      this.renderChat();
    }

    speak(text) {
      if (!('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      if (this.isSpeaking) {
        this.isSpeaking = false;
        this.renderChat();
        return;
      }
      const clean = text.replace(/[*#~]/g, '').replace(/https?:\/\/\S+/g, '').replace(/[🔴🟠🟡🟢🚨⚠️🚫💡🩺💊👨‍⚕️🏥🆘]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      const langConfig = SUPPORTED_LANGS[this.currentLang] || SUPPORTED_LANGS.en;
      utterance.lang = langConfig.voiceCode;
      utterance.rate = 0.95;
      utterance.onstart = () => { this.isSpeaking = true; this.renderChat(); };
      utterance.onend = () => { this.isSpeaking = false; this.renderChat(); };
      utterance.onerror = () => { this.isSpeaking = false; this.renderChat(); };
      window.speechSynthesis.speak(utterance);
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    markdownToHtml(md) {
      if (!md) return '';
      let out = this.escapeHtml(md);
      out = out.replace(/^### (.*$)/gim, '<h4 style="font-size:13.5px;font-weight:800;color:#34d399;margin:8px 0 4px 0;">$1</h4>');
      out = out.replace(/^## (.*$)/gim, '<h3 style="font-size:14.5px;font-weight:800;color:#34d399;margin:10px 0 6px 0;">$1</h3>');
      out = out.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:700;color:#ffffff;">$1</strong>');
      out = out.replace(/\*(.*?)\*/g, '<em style="font-style:italic;">$1</em>');
      out = out.replace(/^\s*[•-]\s+(.*$)/gim, '<li style="margin-bottom:3px;list-style-type:disc;margin-left:16px;">$1</li>');
      out = out.replace(/\n\n/g, '<div style="margin-bottom:6px;"></div>');
      out = out.replace(/\n/g, '<br>');
      return out;
    }

    renderChat() {
      const container = document.getElementById('swasthyaAiMessages');
      if (!container) return;
      const strings = I18N_TEXT[this.currentLang] || I18N_TEXT.en;

      let html = '';

      // Permanent top disclaimer banner
      html += '<div id="swasthyaAiDisclaimer" style="background:rgba(2,132,199,0.12);border:1px solid rgba(2,132,199,0.25);border-radius:10px;padding:8px 12px;font-size:11px;color:#94a3b8;line-height:1.45;margin-bottom:12px;">' + strings.disclaimer + '</div>';

      this.chatHistory.forEach((msg, idx) => {
        const isUser = msg.role === 'user';
        const level = msg.triageLevel || 'LOW';

        html += '<div style="display:flex;gap:8px;margin-bottom:12px;justify-content:' + (isUser ? 'flex-end' : 'flex-start') + ';">';
        if (!isUser) {
          html += '<div style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg, #0284c7, #0d9488);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;flex-shrink:0;">🩺</div>';
        }

        html += '<div style="max-width:82%;border-radius:16px;padding:12px 14px;font-size:13px;line-height:1.55;' +
          (isUser ? 'background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;border-bottom-right-radius:4px;' : 'background:#1e293b;color:#f1f5f9;border:1px solid rgba(255,255,255,0.08);border-bottom-left-radius:4px;') + '">';

        if (!isUser && !msg.isError) {
          html += this.renderBadge(level);
        }

        if (msg.emergencyNotice) {
          html += '<div style="background:rgba(220,38,38,0.2);border:1px solid #dc2626;border-radius:8px;padding:8px 10px;margin-bottom:8px;font-size:12px;font-weight:700;color:#f87171;">' +
            this.escapeHtml(msg.emergencyNotice) +
          '</div>';
        }

        html += '<div style="word-break:break-word;">' + this.markdownToHtml(msg.text) + '</div>';

        if (!isUser && msg.isError) {
          html += '<div style="margin-top:8px;">' +
            '<button type="button" onclick="window.swasthyaAi.retryLast()" style="background:#dc2626;border:none;color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:6px;cursor:pointer;">🔄 ' + strings.retry + '</button>' +
          '</div>';
        }

        if (!isUser && msg.showQuickPrompts) {
          html += this.renderQuickPromptsHtml();
        }

        if (!isUser && !msg.isError) {
          html += '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;">' +
            '<button type="button" onclick="window.swasthyaAi.speak(window.swasthyaAi.chatHistory[' + idx + '].text)" style="background:none;border:none;color:#34d399;cursor:pointer;font-size:11px;font-weight:700;padding:0;">🔊 ' + strings.listen + '</button>' +
            '<button type="button" onclick="window.swasthyaAi.copyMessage(' + idx + ')" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:11px;padding:0;">📋 Copy</button>' +
            '<span style="margin-left:auto;color:#64748b;font-size:10px;">' + this.formatTime(msg.timestamp) + '</span>' +
          '</div>';
        } else {
          html += '<div style="text-align:right;font-size:10px;color:rgba(255,255,255,0.7);margin-top:4px;">' + this.formatTime(msg.timestamp) + '</div>';
        }

        html += '</div>';

        if (isUser) {
          html += '<div style="width:32px;height:32px;border-radius:10px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;flex-shrink:0;">👤</div>';
        }

        html += '</div>';
      });

      if (this.isProcessing) {
        html += '<div style="display:flex;gap:8px;margin-bottom:12px;align-items:center;">' +
          '<div style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg, #10b981, #0d9488);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;flex-shrink:0;">🩺</div>' +
          '<div style="padding:10px 14px;border-radius:14px;background:#1e293b;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:6px;">' +
            '<span class="swasthya-ai-dot"></span>' +
            '<span class="swasthya-ai-dot"></span>' +
            '<span class="swasthya-ai-dot"></span>' +
            '<span style="font-size:12px;color:#94a3b8;margin-left:4px;">' + strings.thinking + '</span>' +
          '</div>' +
        '</div>';
      }

      container.innerHTML = html;
      container.scrollTop = container.scrollHeight;
    }

    copyMessage(idx) {
      if (this.chatHistory && this.chatHistory[idx]) {
        const text = this.chatHistory[idx].text;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(text).catch(() => {});
        }
        const strings = I18N_TEXT[this.currentLang] || I18N_TEXT.en;
        alert(strings.copied || 'Copied to clipboard');
      }
    }

    clickQuickPrompt(idx) {
      if (QUICK_PROMPTS[idx]) {
        this.populatePrompt(QUICK_PROMPTS[idx].query);
      }
    }

    renderBadge(level) {
      if (level === 'EMERGENCY') {
        return '<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(220,38,38,0.25);border:1px solid #dc2626;color:#f87171;font-weight:800;font-size:10.5px;padding:2px 8px;border-radius:6px;margin-bottom:6px;">🚨 EMERGENCY (CALL 108)</div>';
      }
      if (level === 'URGENT') {
        return '<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(234,88,12,0.25);border:1px solid #ea580c;color:#fb923c;font-weight:800;font-size:10.5px;padding:2px 8px;border-radius:6px;margin-bottom:6px;">🟠 URGENT (CONSULT DOCTOR TODAY)</div>';
      }
      if (level === 'MODERATE') {
        return '<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(202,138,4,0.25);border:1px solid #ca8a04;color:#facc15;font-weight:800;font-size:10.5px;padding:2px 8px;border-radius:6px;margin-bottom:6px;">🟡 MODERATE (CLINICAL OBSERVATION)</div>';
      }
      return '<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(16,185,129,0.25);border:1px solid #10b981;color:#34d399;font-weight:800;font-size:10.5px;padding:2px 8px;border-radius:6px;margin-bottom:6px;">🟢 LOW (ROUTINE / HOME CARE)</div>';
    }

    renderQuickPromptsHtml() {
      let html = '<div style="margin-top:10px;display:flex;flex-wrap:wrap;gap:6px;">';
      QUICK_PROMPTS.forEach((qp, idx) => {
        html += '<button type="button" onclick="window.swasthyaAi.clickQuickPrompt(' + idx + ')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:5px 9px;color:#cbd5e1;font-size:11px;cursor:pointer;">' + qp.label + '</button>';
      });
      html += '</div>';
      return html;
    }

    formatTime(iso) {
      try {
        const d = new Date(iso);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } catch (e) {
        return '';
      }
    }
  }

  // Global instance
  const instance = new SwasthyaAiChatController();
  global.swasthyaAi = instance;
  global.triggerSwasthyaAiChat = function(force) {
    instance.toggleWindow(force);
  };

  document.addEventListener('DOMContentLoaded', () => {
    instance.renderChat();
    instance.bindEvents();
  });

})(typeof window !== 'undefined' ? window : this);
