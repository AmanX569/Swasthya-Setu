/**
 * =============================================================================
 * SWASTHYA SETU — PRODUCTION AI HEALTH TRIAGE CONTROLLER (Swasthya AI)
 * Real-time Clinical Triage Assistant with Multilingual & Voice Support
 * Connects directly to backend API (/api/ai/triage/chat) -> Real AI Model
 * =============================================================================
 */

(function(global) {
  'use strict';

  const SUPPORTED_LANGS = {
    en: { name: 'English', voiceCode: 'en-IN' },
    hi: { name: 'हिंदी', voiceCode: 'hi-IN' },
    te: { name: 'తెలుగు', voiceCode: 'te-IN' },
    gu: { name: 'ગુજરાતી', voiceCode: 'gu-IN' },
    mr: { name: 'मराठी', voiceCode: 'mr-IN' },
    ta: { name: 'தமிழ்', voiceCode: 'ta-IN' },
    bn: { name: 'বাংলা', voiceCode: 'bn-IN' }
  };

  const I18N_TEXT = {
    en: {
      title: 'Swasthya AI',
      subtitle: 'AI Health Triage',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: 'AI guidance is for information and triage only and does not replace a qualified healthcare professional.',
      placeholder: 'Describe your symptoms...',
      send: 'Send',
      thinking: 'Thinking...',
      error: "Sorry, I couldn't process that request right now. Please try again.",
      retry: 'Retry',
      tooFast: "You're sending messages too quickly. Please wait a moment and try again.",
      tooLong: 'Please shorten your message and try again (maximum 4,000 characters).',
      listen: 'Read Aloud',
      stopAudio: 'Stop',
      copied: 'Copied to clipboard!',
      quickLabel: 'Quick suggestions:'
    },
    hi: {
      title: 'स्वास्थ्य AI',
      subtitle: 'AI स्वास्थ्य ट्राइएज',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: 'AI मार्गदर्शन केवल जानकारी और ट्राइएज के लिए है और योग्य स्वास्थ्य सेवा पेशेवर का विकल्प नहीं है।',
      placeholder: 'अपने लक्षणों का वर्णन करें...',
      send: 'भेजें',
      thinking: 'सोच रहा हूँ...',
      error: 'क्षमा करें, अनुरोध पूरा नहीं हो सका। कृपया पुनः प्रयास करें।',
      retry: 'पुनः प्रयास करें',
      tooFast: 'आप बहुत तेज़ी से संदेश भेज रहे हैं। कृपया कुछ क्षण प्रतीक्षा करें और पुनः प्रयास करें।',
      tooLong: 'कृपया अपना संदेश छोटा करें और पुनः प्रयास करें (अधिकतम 4,000 अक्षर)।',
      listen: 'सुनें',
      stopAudio: 'रोकें',
      copied: 'कॉपी हो गया!',
      quickLabel: 'त्वरित सुझाव:'
    },
    te: {
      title: 'స్వాస్థ్య AI',
      subtitle: 'AI హెల్త్ ట్రయాజ్',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: 'AI మార్గదర్శకత్వం సమాచారం మరియు ట్రయాజ్ కోసం మాత్రమే మరియు అర్హత కలిగిన వైద్యునికి ప్రత్యామ్నాయం కాదు.',
      placeholder: 'మీ లక్షణాలను వివరించండి...',
      send: 'పంపండి',
      thinking: 'ఆలోచిస్తున్నాను...',
      error: 'క్షమించండి, అభ్యర్థనను ప్రాసెస్ చేయడం సాధ్యం కాలేదు. దయచేసి మళ్లీ ప్రయత్నించండి.',
      retry: 'మళ్లీ ప్రయత్నించు',
      tooFast: 'మీరు చాలా వేగంగా సందేశాలు పంపుతున్నారు. దయచేసి కాసేపు వేచి ఉండి మళ్లీ ప్రయత్నించండి.',
      tooLong: 'దయచేసి మీ సందేశాన్ని కుదించి మళ్లీ ప్రయత్నించండి (గరిష్టంగా 4,000 అక్షరాలు).',
      listen: 'వినండి',
      stopAudio: 'ఆపండి',
      copied: 'కాపీ చేయబడింది!',
      quickLabel: 'త్వరిత సూచనలు:'
    },
    gu: {
      title: 'સ્વાસ્થ્ય AI',
      subtitle: 'AI હેલ્થ ટ્રાયજ',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: 'AI માર્ગદર્શન માત્ર માહિતી અને ટ્રાયજ માટે છે, ડૉક્ટરનો વિકલ્પ નથી.',
      placeholder: 'તમારા લક્ષણો વર્ણવો...',
      send: 'મોકલો',
      thinking: 'વિચારી રહ્યું છે...',
      error: 'ક્ષમા કરશો, વિનંતી પ્રક્રિયા થઈ શકી નથી. કૃપા કરીને ફરી પ્રયાસ કરો.',
      retry: 'ફરી પ્રયાસ કરો',
      tooFast: 'કૃપા કરીને થોડી રાહ જુઓ અને ફરી પ્રયાસ કરો.',
      tooLong: 'સંદેશ 4,000 અક્ષરોથી નાનો હોવો જોઈએ.',
      listen: 'સાંભળો',
      stopAudio: 'રોકો',
      copied: 'કૉપિ થઈ ગયું!',
      quickLabel: 'સૂચનો:'
    },
    mr: {
      title: 'स्वास्थ्य AI',
      subtitle: 'AI आरोग्य ट्रायज',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: 'AI मार्गदर्शन केवळ माहितीसाठी आहे आणि डॉक्टरांचा पर्याय नाही.',
      placeholder: 'तुमची लक्षणे सांगा...',
      send: 'पाठवा',
      thinking: 'विचार करत आहे...',
      error: 'माफ करा, विनंती पूर्ण होऊ शकली नाही. कृपया पुन्हा प्रयत्न करा.',
      retry: 'पुन्हा प्रयत्न',
      tooFast: 'कृपया थोडा वेळ थांबा आणि पुन्हा प्रयत्न करा.',
      tooLong: 'संदेश 4,000 अक्षरांपेक्षा लहान असावा.',
      listen: 'ऐका',
      stopAudio: 'थांबवा',
      copied: 'कॉपी झाले!',
      quickLabel: 'सूचना:'
    },
    ta: {
      title: 'ஸ்வஸ்த்யா AI',
      subtitle: 'AI சுகாதார வழிகாட்டி',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: 'AI வழிகாட்டுதல் தகவலுக்கு மட்டுமே, மருத்துவருக்கு மாற்றாகாது.',
      placeholder: 'அறிகுறிகளை விவரிக்கவும்...',
      send: 'அனுப்பு',
      thinking: 'யோசிக்கிறது...',
      error: 'மன்னிக்கவும், செயலாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      retry: 'மீண்டும் முயற்சி',
      tooFast: 'சிறிது நேரம் காத்திருந்து மீண்டும் முயற்சிக்கவும்.',
      tooLong: 'செய்தி 4,000 எழுத்துகளுக்குள் இருக்க வேண்டும்.',
      listen: 'கேட்க',
      stopAudio: 'நிறுத்து',
      copied: 'நகலெடுக்கப்பட்டது!',
      quickLabel: 'பரிந்துரைகள்:'
    },
    bn: {
      title: 'স্বাস্থ্য AI',
      subtitle: 'AI হেলথ ট্রায়াজ',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: 'AI নির্দেশিকা শুধুমাত্র তথ্য ও ট্রায়াজের জন্য, যোগ্য চিকিৎসকের বিকল্প নয়।',
      placeholder: 'লক্ষণগুলি লিখুন...',
      send: 'পাঠান',
      thinking: 'ভাবছে...',
      error: 'অনুরোধটি ব্যর্থ হয়েছে। আবার চেষ্টা করুন।',
      retry: 'পুনরায় চেষ্টা',
      tooFast: 'দয়া করে একটু অপেক্ষা করুন এবং আবার চেষ্টা করুন।',
      tooLong: 'বার্তাটি ৪,০০০ অক্ষরের কম হতে হবে।',
      listen: 'শুনুন',
      stopAudio: 'থামুন',
      copied: 'কপি হয়েছে!',
      quickLabel: 'পরামর্শ:'
    }
  };

  const QUICK_PROMPTS = [
    { label: 'Check my symptoms', query: 'I would like to check my symptoms' },
    { label: 'Fever', query: 'I have fever' },
    { label: 'Cough', query: 'I have cough' },
    { label: 'Headache', query: 'I have headache' },
    { label: 'Stomach pain', query: 'I have stomach pain' },
    { label: 'Medication question', query: 'I have a medication question' }
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
        const saved = sessionStorage.getItem('swasthya_ai_history_v5');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
      return [this.getWelcomeMessage()];
    }

    saveHistory() {
      try {
        sessionStorage.setItem('swasthya_ai_history_v5', JSON.stringify(this.chatHistory.slice(-30)));
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
      try {
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
            }
            this.sendUserMessage(transcript);
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
      } catch (e) {
        console.warn('[SwasthyaAI] Speech recognition init failed:', e);
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
      try {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape' && this.isOpen) {
            this.toggleWindow(false);
          }
        });
      } catch (e) {}
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
      try {
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
      } catch (e) {
        console.error('[SwasthyaAI] toggleWindow error:', e);
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
          gender: user.gender || null,
          chronicConditions: Array.isArray(user.chronicConditions) ? user.chronicConditions : []
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

    /**
     * Sends user message to real backend API endpoint (/api/ai/triage/chat)
     */
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

      // Double-send protection: disable input and send button while in-flight
      this.isProcessing = true;
      if (sendBtn) sendBtn.disabled = true;
      if (input) input.disabled = true;
      if (micBtn) micBtn.disabled = true;
      this.renderChat();

      // 16-second timeout with AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 16000);

      try {
        let result = null;
        let responseStatus = 200;
        let responseData = null;

        // Try API client gateway first if available
        if (window.swasthyaAPI && typeof window.swasthyaAPI.sendAiTriageMessage === 'function') {
          try {
            responseData = await window.swasthyaAPI.sendAiTriageMessage({
              message: query,
              conversationId: this.conversationId,
              language: this.currentLang,
              patientContext: this.getPatientContext()
            });
            if (responseData && responseData.success) {
              result = responseData;
            }
          } catch (apiErr) {
            console.warn('[Swasthya AI] API Client gateway error:', apiErr.message);
          }
        }

        // Direct fetch to backend endpoints
        if (!result) {
          const endpoints = [
            '/api/ai/triage/chat',
            'http://localhost:5000/api/ai/triage/chat'
          ];

          let lastErr = null;
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

              responseStatus = res.status;
              let data = null;
              try { data = await res.json(); } catch (e) {}

              if (res.ok && data && data.success) {
                result = data;
                break;
              } else if (res.status === 429) {
                const err = new Error(strings.tooFast);
                err.status = 429;
                throw err;
              } else if (!res.ok) {
                const errMsg = (data && data.error) || strings.error;
                const err = new Error(errMsg);
                err.status = res.status;
                throw err;
              }
            } catch (epErr) {
              lastErr = epErr;
              if (epErr.name === 'AbortError' || epErr.status === 429) {
                throw epErr; // Don't keep retrying if rate limited or timed out
              }
            }
          }

          if (!result && lastErr) {
            throw lastErr;
          }
        }

        clearTimeout(timeoutId);

        if (!result || !result.success) {
          throw new Error(strings.error);
        }

        // Real AI model response succeeded
        if (result.conversationId) {
          this.conversationId = result.conversationId;
        }

        this.chatHistory.push({
          role: 'assistant',
          text: result.message || result.summary || 'Clinical assessment completed.',
          triageLevel: result.triageLevel || 'LOW',
          emergencyNotice: result.emergencyNotice || null,
          disclaimer: result.disclaimer || null,
          followUpQuestions: result.followUpQuestions || [],
          timestamp: new Date().toISOString(),
          isError: false
        });
        this.saveHistory();

      } catch (err) {
        clearTimeout(timeoutId);
        console.error('[Swasthya AI] Triage request failed:', err);

        this.lastFailedMessage = query;
        let userErrorMessage = strings.error;

        if (err.name === 'AbortError') {
          userErrorMessage = "The request timed out. Please check your connection and tap Retry.";
        } else if (err.status === 429) {
          userErrorMessage = strings.tooFast;
        }

        // Display error message state with Retry button (NO fake medical fallback)
        this.chatHistory.push({
          role: 'assistant',
          text: userErrorMessage,
          triageLevel: 'LOW',
          timestamp: new Date().toISOString(),
          isError: true
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

      // Remove the error response message from chat history
      if (this.chatHistory.length > 0 && this.chatHistory[this.chatHistory.length - 1].isError) {
        this.chatHistory.pop();
      }
      // Remove the user message that caused the error so sendUserMessage won't duplicate it
      if (this.chatHistory.length > 0 && this.chatHistory[this.chatHistory.length - 1].role === 'user') {
        this.chatHistory.pop();
      }

      this.sendUserMessage(msg);
    }

    clearChat() {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      this.chatHistory = [this.getWelcomeMessage()];
      this.conversationId = null;
      try {
        sessionStorage.removeItem('swasthya_ai_history_v5');
        sessionStorage.removeItem('swasthya_ai_conv_id');
      } catch (e) {}
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
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
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

        // Error State with Retry Button
        if (!isUser && msg.isError) {
          html += '<div style="margin-top:10px;">' +
            '<button type="button" onclick="window.swasthyaAi && window.swasthyaAi.retryLast()" aria-label="Retry last request" style="background:#dc2626;border:none;color:#fff;font-size:11.5px;font-weight:700;padding:5px 12px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(220,38,38,0.3);">🔄 ' + strings.retry + '</button>' +
          '</div>';
        }

        // Quick prompts when no conversation history yet
        if (!isUser && msg.showQuickPrompts && this.chatHistory.length === 1) {
          html += this.renderQuickPromptsHtml();
        }

        if (!isUser && !msg.isError) {
          html += '<div style="display:flex;align-items:center;gap:8px;margin-top:8px;padding-top:6px;border-top:1px solid rgba(255,255,255,0.08);font-size:11px;">' +
            '<button type="button" onclick="window.swasthyaAi && window.swasthyaAi.speak(window.swasthyaAi.chatHistory[' + idx + '].text)" style="background:none;border:none;color:#34d399;cursor:pointer;font-size:11px;font-weight:700;padding:0;">🔊 ' + strings.listen + '</button>' +
            '<button type="button" onclick="window.swasthyaAi && window.swasthyaAi.copyMessage(' + idx + ')" style="background:none;border:none;color:#94a3b8;cursor:pointer;font-size:11px;padding:0;">📋 Copy</button>' +
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

      // Loading state ("Thinking...")
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
        html += '<button type="button" onclick="window.swasthyaAi && window.swasthyaAi.clickQuickPrompt(' + idx + ')" style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:5px 10px;color:#cbd5e1;font-size:11px;cursor:pointer;transition:all 0.2s ease;">' + qp.label + '</button>';
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

  // Safe Global Instantiation with Error Boundary
  try {
    const instance = new SwasthyaAiChatController();
    global.swasthyaAi = instance;
    global.triggerSwasthyaAiChat = function(force) {
      instance.toggleWindow(force);
    };

    if (typeof document !== 'undefined') {
      document.addEventListener('DOMContentLoaded', () => {
        try {
          instance.renderChat();
          instance.bindEvents();
        } catch (domErr) {
          console.error('[SwasthyaAI] DOM initialization error:', domErr);
        }
      });
    }
  } catch (initErr) {
    console.error('[SwasthyaAI] Controller initialization error:', initErr);
  }

})(typeof window !== 'undefined' ? window : this);
