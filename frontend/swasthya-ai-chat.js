/**
 * =============================================================================
 * SWASTHYA SETU — SWASTHYA AI HEALTH TRIAGE CHATBOT (swasthya-ai-chat.js)
 * Production Clinical Triage Client · Natural Language Assessment
 * Multi-Turn Conversation Memory · Deterministic Red-Flag Emergency Alerts
 * Strict Privacy & Zero Client-Side Secret Exposure
 * =============================================================================
 */

(function (global) {
  'use strict';

  const SUPPORTED_LANGS = {
    en: { name: 'English', voiceCode: 'en-IN', flag: 'EN' },
    hi: { name: 'हिंदी', voiceCode: 'hi-IN', flag: 'HI' },
    te: { name: 'తెలుగు', voiceCode: 'te-IN', flag: 'TE' }
  };

  const I18N_TEXT = {
    en: {
      title: 'Swasthya AI',
      subtitle: 'AI Health Triage',
      welcome: "Hello! I'm Swasthya AI, your health triage assistant. Tell me about your symptoms or health concern, and I'll help you understand possible causes, warning signs, and what to do next.",
      disclaimer: '⚠️ AI guidance is for information and triage only and does not replace a qualified healthcare professional.',
      placeholder: 'Describe your symptoms...',
      send: 'Send',
      thinking: 'Thinking...',
      error: "Sorry, I couldn't process that request right now. Please try again.",
      retry: 'Retry',
      tooFast: "You're sending messages too quickly. Please wait a moment and try again.",
      tooLong: 'Please shorten your message and try again (maximum 4,000 characters).',
      listen: 'Read Aloud',
      stopAudio: 'Stop Audio',
      copied: 'Copied to clipboard!',
      quickLabel: 'Suggested topics:'
    },
    hi: {
      title: 'स्वास्थय AI',
      subtitle: 'एआई स्वास्थ्य ट्रायज',
      welcome: 'नमस्ते! मैं स्वास्थय AI हूँ, आपका स्वास्थ्य ट्रायज सहायक। अपने लक्षणों के बारे में बताएं, और मैं संभावित कारणों, चेतावनी संकेतों और आगे के सुरक्षित कदमों को समझने में आपकी मदद करूँगा।',
      disclaimer: '⚠️ एआई मार्गदर्शन केवल सूचना और ट्रायज के लिए है, यह डॉक्टर का विकल्प नहीं है।',
      placeholder: 'अपने लक्षणों का विवरण दें...',
      send: 'भेजें',
      thinking: 'सोच रहा हूँ...',
      error: 'क्षमा करें, अभी अनुरोध प्रोसेस नहीं हो सका। कृपया पुनः प्रयास करें।',
      retry: 'पुनः प्रयास',
      tooFast: 'आप बहुत तेज़ी से संदेश भेज रहे हैं। कृपया कुछ क्षण प्रतीक्षा करें।',
      tooLong: 'कृपया अपना संदेश छोटा करें (अधिकतम 4,000 अक्षर)।',
      listen: 'सुनें',
      stopAudio: 'रोकें',
      copied: 'कॉपी हो गया!',
      quickLabel: 'सुझाए गए विषय:'
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
        this.recognition.onerror = () => this.updateMicUi(false);
        this.recognition.onend = () => this.updateMicUi(false);
      }
    }

    updateMicUi(isRecording) {
      const btn = document.getElementById('swasthyaAiMicBtn');
      if (btn) {
        btn.style.color = isRecording ? '#ef4444' : '#10b981';
        btn.title = isRecording ? 'Listening... Speak now' : 'Voice Input';
      }
    }

    startVoice() {
      if (!this.recognition) {
        alert('Voice input is supported in Google Chrome, Edge, and modern mobile browsers.');
        return;
      }
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

    toggleMinimize() {
      const modal = document.getElementById('swasthyaAiWindow');
      if (!modal) return;
      this.isMinimized = !this.isMinimized;
      const body = document.getElementById('swasthyaAiBody');
      if (this.isMinimized) {
        modal.style.height = '62px';
        if (body) body.style.display = 'none';
      } else {
        modal.style.height = '';
        if (body) body.style.display = 'flex';
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

        if (window.swasthyaAPI && typeof window.swasthyaAPI.sendAiTriageMessage === 'function') {
          result = await window.swasthyaAPI.sendAiTriageMessage({
            message: query,
            conversationId: this.conversationId,
            language: this.currentLang,
            patientContext: this.getPatientContext()
          });
          if (result && result.conversationId) {
            this.conversationId = result.conversationId;
          }
        } else {
          // Direct fallback fetch if client object not initialized
          const res = await fetch('/api/ai/triage/chat', {
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
          result = await res.json();
          if (result && result.conversationId) {
            this.conversationId = result.conversationId;
          }
        }

        clearTimeout(timeoutId);

        if (!result || !result.success) {
          throw new Error((result && result.error) || 'Request failed');
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
        console.warn('[Swasthya AI] Communication error:', err.message);
        this.lastFailedMessage = query;

        let errMsg = strings.error;
        if (err.message && err.message.includes('rate limit')) {
          errMsg = strings.tooFast;
        }

        this.chatHistory.push({
          role: 'assistant',
          isError: true,
          text: errMsg,
          triageLevel: 'LOW',
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
          html += '<div style="width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg, #10b981, #0d9488);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;flex-shrink:0;">🩺</div>';
        }

        html += '<div style="max-width:85%;border-radius:14px;padding:10px 14px;font-size:13px;line-height:1.5;box-shadow:0 3px 12px rgba(0,0,0,0.2);' + (isUser ? 'background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;border-bottom-right-radius:2px;' : 'background:#1e293b;color:#f1f5f9;border:1px solid rgba(255,255,255,0.1);border-bottom-left-radius:2px;') + '">';

        if (!isUser && msg.triageLevel && !msg.isError) {
          html += this.renderBadge(level);
        }

        if (!isUser && msg.emergencyNotice) {
          html += '<div style="background:rgba(220,38,38,0.2);border:1.5px solid #dc2626;border-radius:8px;padding:8px 10px;margin-bottom:8px;font-size:12px;color:#fca5a5;">' + this.markdownToHtml(msg.emergencyNotice) + '</div>';
        }

        html += '<div class="swasthya-ai-msg-body">' + this.markdownToHtml(msg.text) + '</div>';

        if (msg.isError && this.lastFailedMessage) {
          html += '<div style="margin-top:8px;"><button type="button" onclick="window.swasthyaAi.retryLast()" style="background:#dc2626;border:none;color:#ffffff;font-size:11px;font-weight:800;padding:4px 10px;border-radius:6px;cursor:pointer;">🔄 ' + strings.retry + '</button></div>';
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
  });

})(typeof window !== 'undefined' ? window : this);
