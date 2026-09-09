/**
 * =============================================================================
 * SWASTHYA SETU — SMART AI HEALTHCARE TRIAGE CHATBOT (ai-health-bot.js)
 * Production Clinical Triage Client, Deterministic Emergency Alerts & Multi-Language
 * Zero Client-Side API Keys · Backend Proxied via /api/ai/triage/chat
 * =============================================================================
 */

(function(global) {
  'use strict';

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

  const UI_TEXT = {
    en: {
      title: 'Swasthya AI Triage',
      subtitle: 'Symptom Assessment & Healthcare Guidance',
      onlineBadge: 'AI Active',
      greeting: '👋 **Hello! I am your AI Health Triage Assistant.**\n\nI can help you assess your symptoms, understand potential health conditions, evaluate urgency, and guide you on safe next steps.\n\n*This is an AI-assisted triage service, not an official medical diagnosis.*\n\n**How can I help you today?** Type your symptoms below or select a quick topic:',
      placeholder: 'Describe your symptoms (e.g. fever for 2 days, headache)...',
      send: 'Send',
      listening: 'Listening... Please speak now',
      speak: 'Read Aloud',
      stopSpeak: 'Stop Audio',
      clearTitle: 'Clear Chat History',
      disclaimer: '⚠️ AI-assisted healthcare triage. Not a medical diagnosis. In life-threatening emergencies, call 108 or 112 immediately.',
      copied: 'Copied to clipboard!'
    },
    hi: {
      title: 'स्वास्थय AI ट्रायज',
      subtitle: 'लक्षण मूल्यांकन व प्राथमिक मार्गदर्शन',
      onlineBadge: 'AI सक्रिय',
      greeting: '👋 **नमस्ते! मैं आपका स्वास्थय AI ट्रायज सहायक हूँ।**\n\nमैं आपके लक्षणों का मूल्यांकन करने, तात्कालिकता (Urgency) जांचने और सुरक्षित अगले कदमों में मार्गदर्शन करने के लिए तैयार हूँ।\n\n*यह एआई परीक्षण सेवा है, कोई औपचारिक चिकित्सा निदान नहीं है।*\n\n**आज मैं आपकी क्या सहायता कर सकता हूँ?** नीचे अपने लक्षण लिखें या विकल्प चुनें:',
      placeholder: 'अपने लक्षणों का विवरण दें (जैसे 2 दिन से बुखार, सिरदर्द)...',
      send: 'भेजें',
      listening: 'सुन रहा हूँ... कृपया बोलें',
      speak: 'सुनें',
      stopSpeak: 'रोकें',
      clearTitle: 'चैट साफ़ करें',
      disclaimer: '⚠️ एआई-सहायता प्राप्त स्वास्थ्य परीक्षण। कोई औपचारिक निदान नहीं। आपातकाल में तुरंत 108 पर कॉल करें।',
      copied: 'कॉपी हो गया!'
    },
    te: {
      title: 'స్వాస్థ్య AI ట్రయాజ్',
      subtitle: 'లక్షణాల మూల్యాంకనం & ఆరోగ్య మార్గదర్శకత్వం',
      onlineBadge: 'AI సిద్ధంగా ఉంది',
      greeting: '👋 **నమస్కారం! నేను మీ స్వాస్థ్య AI ట్రయాజ్ సహాయకుడిని.**\n\nలక్షణాలను అంచనా వేయడం, అత్యవసర స్థాయిని గుర్తించడం మరియు సురక్షితమైన తదుపరి చర్యలలో సహాయపడటానికి నేను సిద్ధంగా ఉన్నాను.\n\n*ఇది కేవలం AI మార్గదర్శకత్వం మాత్రమే, అధికారిక వైద్య నిర్ధారణ కాదు.*\n\n**ఈరోజు నేను మీకు ఎలా సహాయపడగలను?** క్రింద మీ సమస్యను టైప్ చేయండి:',
      placeholder: 'మీ లక్షణాలను వివరించండి (ఉదా: 2 రోజులుగా జ్వరం, తలనొప్పి)...',
      send: 'పంపండి',
      listening: 'వింటున్నాను... మాట్లాడండి',
      speak: 'వినండి',
      stopSpeak: 'ఆపండి',
      clearTitle: 'చాట్ క్లియర్ చేయండి',
      disclaimer: '⚠️ AI ఆధారిత ఆరోగ్య మార్గదర్శకత్వం. వైద్య నిర్ధారణ కాదు. అత్యవసర పరిస్థితుల్లో వెంటనే 108కి కాల్ చేయండి.',
      copied: 'కాపీ చేయబడింది!'
    }
  };

  const QUICK_PROMPTS = [
    { label: '🌡️ High Fever & Chills', query: 'I have a high fever and body chills for 2 days' },
    { label: '🫀 Chest Discomfort', query: 'I am experiencing chest discomfort and tightness' },
    { label: '💆 Severe Headache', query: 'I have a severe headache and dizziness' },
    { label: '😮‍💨 Shortness of Breath', query: 'I am feeling shortness of breath and wheezing' },
    { label: '🥣 Stomach & Loose Motions', query: 'I have loose motions and stomach cramps since morning' }
  ];

  class SwasthyaAiAssistantController {
    constructor() {
      this.isOpen = false;
      this.isMinimized = false;
      this.currentLang = 'en';
      try {
        this.currentLang = localStorage.getItem('swasthya_ai_lang') || 'en';
      } catch (e) {}

      this.conversationId = null;
      try {
        this.conversationId = sessionStorage.getItem('swasthya_ai_conv_id') || null;
      } catch (e) {}

      this.chatHistory = this.loadChatHistory();
      this.isProcessing = false;
      this.isListening = false;
      this.isSpeaking = false;
      this.recognition = null;

      try {
        this.initVoiceRecognition();
      } catch (err) {
        console.warn('[AI Triage] Voice recognition unavailable:', err);
      }

      try {
        this.initKeyboardListeners();
      } catch (err) {
        console.warn('[AI Triage] Keyboard listener init error:', err);
      }
    }

    loadChatHistory() {
      try {
        const saved = sessionStorage.getItem('swasthya_ai_history_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('[AI Triage] Could not load chat history:', e);
      }
      return [this.getInitialGreetingMessage()];
    }

    saveChatHistory() {
      try {
        sessionStorage.setItem('swasthya_ai_history_v3', JSON.stringify(this.chatHistory.slice(-30)));
        if (this.conversationId) {
          sessionStorage.setItem('swasthya_ai_conv_id', this.conversationId);
        }
      } catch (e) {
        console.warn('[AI Triage] Could not save chat history:', e);
      }
    }

    getInitialGreetingMessage() {
      const lang = this.currentLang in UI_TEXT ? this.currentLang : 'en';
      return {
        role: 'assistant',
        text: UI_TEXT[lang].greeting,
        triageLevel: 'LOW',
        timestamp: new Date().toISOString(),
        showQuickChips: true
      };
    }

    initKeyboardListeners() {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.toggleWindow(false);
        }
      });
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
            this.sendUserQuery(transcript);
          }
        };

        this.recognition.onerror = () => {
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
          micBtn.title = 'Listening... Speak now';
        } else {
          micBtn.style.color = '#10b981';
          micBtn.title = 'Voice Input';
        }
      }
    }

    startVoice() {
      if (!this.recognition) {
        alert('Voice input is supported in Google Chrome, Edge, and modern mobile browsers.');
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

      const cleanText = text
        .replace(/[#*`_~[\]]/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/[🔴🟠🟡🟢🚨⚠️🚫💡🩺💊👨‍⚕️🏥🆘]/g, '')
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
        if (this.chatHistory.length === 1 && this.chatHistory[0].showQuickChips) {
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

      const disclaimerEl = document.getElementById('swasthyaAiDisclaimerBanner');
      if (disclaimerEl) disclaimerEl.textContent = strings.disclaimer;
    }

    toggleWindow(forceState) {
      this.isOpen = (typeof forceState === 'boolean') ? forceState : !this.isOpen;
      const modal = document.getElementById('swasthyaAiWindow');
      const launcherBtn = document.getElementById('swasthyaAiLauncherBtn');

      if (modal) {
        if (this.isOpen) {
          modal.style.setProperty('display', 'flex', 'important');
          modal.classList.remove('ai-window-minimized');
          this.isMinimized = false;
        } else {
          modal.style.setProperty('display', 'none', 'important');
        }
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
        }, 120);
      }
    }

    toggleMinimize() {
      const modal = document.getElementById('swasthyaAiWindow');
      if (!modal) return;

      this.isMinimized = !this.isMinimized;
      if (this.isMinimized) {
        modal.style.height = '60px';
        const body = document.getElementById('swasthyaAiBodyArea');
        if (body) body.style.display = 'none';
      } else {
        modal.style.height = '';
        const body = document.getElementById('swasthyaAiBodyArea');
        if (body) body.style.display = 'flex';
      }
    }

    clearChat() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      this.chatHistory = [this.getInitialGreetingMessage()];
      this.conversationId = null;
      sessionStorage.removeItem('swasthya_ai_history_v3');
      sessionStorage.removeItem('swasthya_ai_conv_id');
      this.saveChatHistory();
      this.renderChat();
    }

    getPatientContext() {
      const appState = window.appStore ? window.appStore.getState() : null;
      const user = (appState && (appState.currentUser || (appState.session && appState.session.user))) || {};
      return {
        age: user.age || null,
        gender: user.gender || null,
        chronicConditions: []
      };
    }

    async sendUserQuery(text) {
      if (this.isProcessing) return;

      const inputEl = document.getElementById('swasthyaAiInputField');
      const sendBtn = document.getElementById('swasthyaAiSendBtn');
      const micBtn = document.getElementById('swasthyaAiMicBtn');

      const query = (text || (inputEl ? inputEl.value : '') || '').trim();
      if (!query) return;

      if (query.length > 1000) {
        alert('Your message exceeds the 1,000 character limit. Please summarize your primary symptoms.');
        return;
      }

      if (inputEl) inputEl.value = '';

      // Add user message to UI
      this.chatHistory.push({
        role: 'user',
        text: query,
        timestamp: new Date().toISOString()
      });
      this.saveChatHistory();
      this.renderChat();

      // Check commands
      if (query.startsWith('/')) {
        const handled = await this.executeCommand(query);
        if (handled) return;
      }

      this.isProcessing = true;
      if (sendBtn) sendBtn.disabled = true;
      if (inputEl) inputEl.disabled = true;
      if (micBtn) micBtn.disabled = true;
      this.renderChat();

      try {
        let triageResult = null;

        // Call backend API (supports authenticated and guest triage)
        if (window.swasthyaAPI && typeof window.swasthyaAPI.sendAiTriageMessage === 'function') {
          try {
            triageResult = await window.swasthyaAPI.sendAiTriageMessage({
              message: query,
              conversationId: this.conversationId,
              language: this.currentLang,
              patientContext: this.getPatientContext()
            });
            if (triageResult && triageResult.conversationId) {
              this.conversationId = triageResult.conversationId;
            }
          } catch (apiErr) {
            console.warn('[AI Triage] Backend API offline. Using onboard clinical engine:', apiErr.message);
            triageResult = this.evaluateLocalClinicalFallback(query);
          }
        } else {
          triageResult = this.evaluateLocalClinicalFallback(query);
        }

        this.addAssistantResponse(triageResult);
      } catch (err) {
        console.error('[AI Triage] Error processing symptom query:', err);
        const fallback = this.evaluateLocalClinicalFallback(query);
        this.addAssistantResponse(fallback);
      } finally {
        this.isProcessing = false;
        if (sendBtn) sendBtn.disabled = false;
        if (inputEl) {
          inputEl.disabled = false;
          inputEl.focus();
        }
        if (micBtn) micBtn.disabled = false;
        this.renderChat();
      }
    }

    evaluateLocalClinicalFallback(query) {
      const q = (query || '').toLowerCase();

      // 1. Red flag emergency
      if (/(chest\s*pain|heart\s*attack|cannot\s*breathe|shortness\s*of\s*breath|slurred\s*speech|stroke|snake\s*bite|severe\s*bleeding|tightness)/i.test(q)) {
        return {
          triageLevel: 'EMERGENCY',
          emergencyNotice: '🚨 **CRITICAL MEDICAL EMERGENCY ALERT (EMERGENCY RED FLAG)**\n\nImmediate emergency medical attention required. Call 108 or 112 now.',
          message: '### 🚨 Critical Urgency: Immediate Medical Attention Needed\n\n**Possible Causes:** Potential acute cardiovascular, respiratory, or neurological emergency.\n\n**Immediate Steps:**\n1. Call **108 (Ambulance)** or **112** immediately.\n2. Do not let the patient walk or exert.\n3. Transport to the nearest Emergency/ICU hospital.',
          disclaimer: '⚠️ AI-assisted triage guidance, not a medical diagnosis.'
        };
      }

      // 2. High Fever
      if (/(fever|chills|bukhaar|jwaram|temperature)/i.test(q)) {
        const isProlonged = /(3\s*days|days|week|high)/i.test(q);
        return {
          triageLevel: isProlonged ? 'URGENT' : 'MODERATE',
          message: `### 🌡️ Fever Assessment (${isProlonged ? 'URGENT' : 'MODERATE'})\n\n` +
            `**Possible Causes:** Viral influenza, seasonal infection, or vector-borne illness (e.g. malaria, dengue).\n\n` +
            `**Recommended Actions:**\n` +
            `• Hydrate with clean water, ORS, and warm fluids.\n` +
            `• Lukewarm sponge baths to lower body temperature.\n` +
            `• Consult a registered physician or PHC if fever persists beyond 48 hours or exceeds 102°F.`,
          disclaimer: '⚠️ AI-assisted triage guidance, not a medical diagnosis.'
        };
      }

      // 3. Diarrhea & Dehydration
      if (/(diarrhea|loose\s*motion|dehydration|ors|vomiting|stomach\s*pain)/i.test(q)) {
        return {
          triageLevel: 'MODERATE',
          message: '### 💧 Gastrointestinal & Dehydration Assessment (MODERATE)\n\n' +
            '**Possible Causes:** Acute gastroenteritis, dietary irritation, or bacterial/viral infection.\n\n' +
            '**Recommended Actions:**\n' +
            '• Drink Oral Rehydration Salts (ORS) solution regularly after every loose stool.\n' +
            '• Consume boiled water, rice water, and bland soft foods.\n' +
            '• Seek immediate medical attention if blood is present in stools, or if lethargy/severe thirst occurs.',
          disclaimer: '⚠️ AI-assisted triage guidance, not a medical diagnosis.'
        };
      }

      // 4. Headache & Dizziness
      if (/(headache|migraine|dizziness|sir\s*dard)/i.test(q)) {
        return {
          triageLevel: 'MODERATE',
          message: '### 💆 Headache & Neurological Assessment (MODERATE)\n\n' +
            '**Possible Causes:** Tension headache, dehydration, eyestrain, or sinus congestion.\n\n' +
            '**Recommended Actions:**\n' +
            '• Rest in a quiet, darkened room and stay hydrated.\n' +
            '• Monitor blood pressure if known hypertensive.\n' +
            '• Seek emergency care immediately if accompanied by neck stiffness, confusion, or speech changes.',
          disclaimer: '⚠️ AI-assisted triage guidance, not a medical diagnosis.'
        };
      }

      // 5. General Low Urgency
      return {
        triageLevel: 'LOW',
        message: '### 🩺 Health Guidance (LOW Urgency)\n\n' +
          '**Clinical Summary:** Based on your description, this condition warrants rest and careful observation.\n\n' +
          '**Recommended Next Steps:**\n' +
          '1. Rest and stay well hydrated.\n' +
          '2. Observe symptoms over the next 24 to 48 hours.\n' +
          '3. If symptoms worsen, connect with a doctor via the portal or visit your nearest PHC.',
        disclaimer: '⚠️ AI-assisted triage guidance, not a medical diagnosis.'
      };
    }

    addAssistantResponse(result) {
      this.chatHistory.push({
        role: 'assistant',
        text: result.message || result.summary || 'Clinical guidance received.',
        triageLevel: result.triageLevel || 'LOW',
        emergencyNotice: result.emergencyNotice || null,
        disclaimer: result.disclaimer || null,
        timestamp: new Date().toISOString()
      });
      this.saveChatHistory();
      this.renderChat();
    }

    renderChat() {
      const container = document.getElementById('swasthyaAiMessagesContainer');
      if (!container) return;

      let html = '';

      // Permanent top medical disclaimer banner
      html += `
        <div id="swasthyaAiDisclaimerBanner" style="background:rgba(2,132,199,0.12);border:1px solid rgba(2,132,199,0.25);border-radius:10px;padding:8px 12px;font-size:11px;color:#94a3b8;line-height:1.45;margin-bottom:12px;">
          ${UI_TEXT[this.currentLang]?.disclaimer || UI_TEXT.en.disclaimer}
        </div>
      `;

      this.chatHistory.forEach((msg, idx) => {
        const isUser = msg.role === 'user';
        const renderedBody = this.markdownToHtml(msg.text);
        const level = msg.triageLevel || 'LOW';

        html += `
          <div class="ai-msg-row ${isUser ? 'user-msg-row' : 'assistant-msg-row'}" style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;justify-content:${isUser ? 'flex-end' : 'flex-start'};">
            ${!isUser ? `
              <div class="ai-avatar" style="width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg, #10b981, #0d9488);display:flex;align-items:center;justify-content:center;color:#fff;font-size:16px;flex-shrink:0;box-shadow:0 2px 8px rgba(16,185,129,0.3);">
                ✨
              </div>
            ` : ''}

            <div class="ai-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}" style="max-width:86%;border-radius:14px;padding:12px 16px;font-size:13.5px;line-height:1.55;box-shadow:0 4px 14px rgba(0,0,0,0.15);${isUser ? 'background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;border-bottom-right-radius:4px;' : 'background:#1e293b;color:#f1f5f9;border:1px solid rgba(255,255,255,0.1);border-bottom-left-radius:4px;'}">
              
              ${!isUser && msg.triageLevel ? this.renderTriageBadge(level) : ''}

              ${!isUser && msg.emergencyNotice ? `
                <div style="background:rgba(220,38,38,0.18);border:1.5px solid #dc2626;border-radius:10px;padding:10px 12px;margin-bottom:10px;font-size:12.5px;color:#fca5a5;">
                  ${this.markdownToHtml(msg.emergencyNotice)}
                </div>
              ` : ''}

              <div class="ai-content-body">${renderedBody}</div>

              ${!isUser && msg.showQuickChips ? this.renderQuickChipsHtml() : ''}

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
            <div class="ai-bubble assistant-bubble" style="padding:12px 18px;border-radius:14px;background:#1e293b;border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;gap:8px;">
              <div class="ai-typing-dot"></div>
              <div class="ai-typing-dot"></div>
              <div class="ai-typing-dot"></div>
              <span style="font-size:12px;color:#94a3b8;margin-left:4px;">Evaluating symptoms &amp; clinical urgency...</span>
            </div>
          </div>
        `;
      }

      container.innerHTML = html;
      container.scrollTop = container.scrollHeight;
    }

    renderTriageBadge(level) {
      if (level === 'EMERGENCY') {
        return `<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(220,38,38,0.2);border:1px solid #dc2626;color:#f87171;font-weight:800;font-size:11px;padding:3px 10px;border-radius:8px;margin-bottom:8px;animation:pulseAiGlow 2s infinite;">
          🚨 CRITICAL EMERGENCY (108 CALL)
        </div>`;
      }
      if (level === 'URGENT') {
        return `<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(234,88,12,0.2);border:1px solid #ea580c;color:#fb923c;font-weight:800;font-size:11px;padding:3px 10px;border-radius:8px;margin-bottom:8px;">
          🟠 URGENT (DOCTOR CONSULT TODAY)
        </div>`;
      }
      if (level === 'MODERATE') {
        return `<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(202,138,4,0.2);border:1px solid #ca8a04;color:#facc15;font-weight:800;font-size:11px;padding:3px 10px;border-radius:8px;margin-bottom:8px;">
          🟡 MODERATE (OBSERVE &amp; REVIEW)
        </div>`;
      }
      return `<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(16,185,129,0.2);border:1px solid #10b981;color:#34d399;font-weight:800;font-size:11px;padding:3px 10px;border-radius:8px;margin-bottom:8px;">
        🟢 LOW URGENCY (HOME CARE)
      </div>`;
    }

    renderQuickChipsHtml() {
      let chips = '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;">';
      QUICK_PROMPTS.forEach(q => {
        chips += `
          <button type="button" onclick="window.swasthyaAiAssistant.sendUserQuery('${q.query.replace(/'/g, "\\'")}')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.14);border-radius:14px;padding:6px 10px;color:#cbd5e1;font-size:11.5px;cursor:pointer;transition:all 0.2s ease;">
            ${q.label}
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

      html = html.replace(/^### (.*$)/gim, '<h4 style="font-size:14px;font-weight:800;color:#34d399;margin:8px 0 6px 0;">$1</h4>');
      html = html.replace(/^## (.*$)/gim, '<h3 style="font-size:15px;font-weight:800;color:#34d399;margin:10px 0 6px 0;">$1</h3>');
      html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:700;color:#fff;">$1</strong>');
      html = html.replace(/\*(.*?)\*/g, '<em style="font-style:italic;">$1</em>');
      html = html.replace(/^\s*[•\-]\s+(.*$)/gim, '<li style="margin-bottom:4px;list-style-type:disc;margin-left:18px;">$1</li>');
      html = html.replace(/\n\n/g, '<div style="margin-bottom:8px;"></div>');
      html = html.replace(/\n/g, '<br>');

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

    async executeCommand(cmd) {
      const clean = cmd.trim().toLowerCase();
      if (clean === '/clear') {
        this.clearChat();
        return true;
      }
      if (clean === '/beds') {
        this.handleBedsCommand();
        return true;
      }
      if (clean === '/doctor') {
        this.handleDoctorCommand();
        return true;
      }
      if (clean === '/sos') {
        this.handleSosCommand();
        return true;
      }
      if (clean === '/meds') {
        this.handleMedsCommand();
        return true;
      }
      return false;
    }

    handleBedsCommand() {
      const appState = window.appStore ? window.appStore.getState() : null;
      const hospitals = (appState && appState.hospitals) ? appState.hospitals : [];
      let reply = '### 🏥 Live Hospital Beds (Within 25 km)\n\n';
      if (hospitals.length === 0) {
        reply += '📍 *No hospital records found within 25 km right now. Please enable GPS in your portal.*';
      } else {
        reply += `Found **${hospitals.length} facilities** nearby:\n\n`;
        hospitals.slice(0, 3).forEach((h, i) => {
          reply += `**${i + 1}. ${h.name}**\n• Distance: ${h.distance || 'Nearby'} | Gen Beds: ${h.genBedsAvail || 0} | ICU Beds: ${h.icuBedsAvail || 0}\n\n`;
        });
        reply += '👉 *Scroll up to the Nearby Hospitals Bed Grid in your portal for instant calling.*';
      }
      this.chatHistory.push({ role: 'assistant', text: reply, timestamp: new Date().toISOString() });
      this.saveChatHistory();
      this.renderChat();
    }

    handleDoctorCommand() {
      const reply = '### 👨‍⚕️ Consult an On-Duty Doctor\n\n' +
        'You can consult licensed government physicians directly through your Swasthya Setu dashboard:\n\n' +
        '1. **📹 Live Video Call:** Click the **"Live Video Call Doctor"** button at the top of your portal.\n' +
        '2. **📋 Request OPD Queue:** Click **"Request OPD Queue"** to receive an OPD token number for today.';
      this.chatHistory.push({ role: 'assistant', text: reply, timestamp: new Date().toISOString() });
      this.saveChatHistory();
      this.renderChat();
    }

    handleSosCommand() {
      const reply = '### 🚨 Emergency Medical Alert (108 SOS Protocol)\n\n' +
        '• 📞 **National Emergency Ambulance:** **Call 108 immediately**\n' +
        '• 📞 **Emergency Helpline:** **Call 112**\n\n' +
        '**Immediate Life-Saving First Aid:**\n' +
        '1. **Chest Pain:** Sit in W-position, loosen tight clothes, do not exert.\n' +
        '2. **Stroke Signs:** Note the time, rush to nearest hospital with CT scanner.\n' +
        '3. **Severe Bleeding:** Apply direct firm pressure with clean cotton cloth.';
      this.chatHistory.push({ role: 'assistant', text: reply, triageLevel: 'EMERGENCY', emergencyNotice: 'Call 108 Ambulance Immediately', timestamp: new Date().toISOString() });
      this.saveChatHistory();
      this.renderChat();
    }

    handleMedsCommand() {
      const reply = '### 💊 Jan Aushadhi Generic Medicine Guide\n\n' +
        '• Saves up to **50%–80%** on essential generic medicines with identical bioequivalence.\n' +
        '• Always confirm dosage with a qualified doctor or pharmacist.\n' +
        '• Never self-medicate with antibiotics.';
      this.chatHistory.push({ role: 'assistant', text: reply, timestamp: new Date().toISOString() });
      this.saveChatHistory();
      this.renderChat();
    }

    // Compatibility methods
    triggerSymptomPill(type) {
      this.toggleWindow(true);
      const queryMap = {
        fever: 'I have a high fever with chills',
        snakebite: 'Emergency: Snake bite protocol',
        chestpain: 'Emergency: Chest pain and tightness',
        diarrhea: 'Severe diarrhea and dehydration ORS',
        breathing: 'Shortness of breath and wheezing',
        headache: 'Severe headache and dizziness'
      };
      this.sendUserQuery(queryMap[type] || type);
    }

    toggleFloatingWidget(isOpen) {
      this.toggleWindow(isOpen);
    }
  }

  // Export controller
  const assistant = new SwasthyaAiAssistantController();
  global.swasthyaAiAssistant = assistant;
  global.aiHealthBot = assistant;

  document.addEventListener('DOMContentLoaded', () => {
    assistant.renderChat();
  });

})(typeof window !== 'undefined' ? window : this);
