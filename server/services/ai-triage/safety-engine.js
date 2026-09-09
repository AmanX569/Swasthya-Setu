/**
 * =============================================================================
 * SWASTHYA SETU — CLINICAL SAFETY & EMERGENCY OVERRIDE ENGINE
 * Deterministic rules, Red Flag Detection, Injection Defense & Response Guardrails
 * =============================================================================
 */

'use strict';

/**
 * Emergency Red Flag Definitions for Immediate 108/112 Overrides
 */
const EMERGENCY_PATTERNS = [
  {
    id: 'cardiac_emergency',
    regex: /\b(chest\s*pain|chest\s*pressure|chest\s*tightness|heart\s*attack|pain\s*(radiating|spreading)\s*to\s*(left\s*arm|jaw|neck|back)|chhati\s*me\s*dard|gundela\s*noppi)\b/i,
    title: 'Acute Chest Pain / Potential Cardiac Emergency',
    reason: 'Sudden or crushing chest discomfort, especially radiating to arm or jaw, can indicate an acute coronary syndrome or myocardial infarction.'
  },
  {
    id: 'stroke_emergency',
    regex: /\b(facial\s*droop|face\s*droop|slurred\s*speech|speech\s*difficulty|weakness\s*on\s*one\s*side|arm\s*weakness|sudden\s*numbness|cannot\s*move\s*arm|paralysis|stroke|pakshaghat)\b/i,
    title: 'Potential Stroke / Acute Neurological Emergency (FAST)',
    reason: 'Sudden facial weakness, arm drift, or speech difficulty requires immediate emergency neurological thrombolysis assessment.'
  },
  {
    id: 'respiratory_distress',
    regex: /\b(cannot\s*breathe|severe\s*shortness\s*of\s*breath|gasping\s*for\s*air|blue\s*lips|blue\s*fingers|cyanosis|choking|saans\s*nahi\s*aarahi|swasa\s*aadam\s*ledu)\b/i,
    title: 'Severe Respiratory Distress / Hypoxia',
    reason: 'Acute inability to breathe or bluish discoloration is a critical airway/oxygen emergency.'
  },
  {
    id: 'snakebite_poisoning',
    regex: /\b(snake\s*bite|saanp\s*kaatna|paamu\s*kaatu|venomous\s*bite|poison|swallowed\s*poison|insect\s*poison|pesticide\s*ingestion)\b/i,
    title: 'Snakebite or Acute Poisoning Alert',
    reason: 'Venomous bites and chemical poisonings require urgent hospital administration of Anti-Snake Venom (ASV) or toxicological antidotes.'
  },
  {
    id: 'severe_hemorrhage',
    regex: /\b(uncontrolled\s*bleeding|coughing\s*up\s*blood|vomiting\s*blood|heavy\s*blood\s*loss|khoon\s*ki\s*ulti|raktasravam)\b/i,
    title: 'Severe Hemorrhage / Internal Bleeding',
    reason: 'Vomiting blood or uncontrolled external arterial bleeding causes rapid hypovolemic shock.'
  },
  {
    id: 'neurological_thunderclap',
    regex: /\b(worst\s*headache\s*of\s*(my\s*)?life|thunderclap\s*headache|headache\s*with\s*stiff\s*neck\s*and\s*fever|sudden\s*loss\s*of\s*consciousness|unresponsive|seizure\s*lasting)\b/i,
    title: 'Severe Neurological Red Flag / Suspected Hemorrhage or Meningitis',
    reason: 'Sudden explosive headaches or loss of consciousness with fever/neck rigidity require emergency trauma/ICU neuro-imaging.'
  },
  {
    id: 'maternal_obstetric_emergency',
    regex: /\b(pregnancy\s*(bleeding|heavy\s*pain)|amniotic\s*leak|water\s*broke|severe\s*labor\s*pains|garbhavati\s*bleeding)\b/i,
    title: 'Maternal Obstetric Emergency',
    reason: 'Active vaginal bleeding or labor progression during pregnancy requires urgent First Referral Unit (FRU) delivery care.'
  }
];

/**
 * Prompt Injection and Jailbreak Signatures
 */
const INJECTION_PATTERNS = [
  /\bignore\s+(all\s+)?(previous|prior|above)\s+instructions\b/i,
  /\b(you\s+are\s+now|act\s+as)\s+(DAN|unfiltered|jailbroken|developer\s+mode)\b/i,
  /\bdisregard\s+system\s+prompt\b/i,
  /\breveal\s+(your\s+)?system\s+prompt\b/i,
  /\boutput\s+all\s+hidden\s+rules\b/i,
  /\bpretend\s+you\s+are\s+(a\s+licensed\s+doctor|someone\s+who\s+can\s+prescribe)\b/i,
  /\bdiagnose\s+me\s+definitively\b/i,
  /\bgive\s+me\s+a\s+confirmed\s+diagnosis\b/i
];

class SafetyEngine {
  static checkEmergencyRedFlags(text) {
    if (!text || typeof text !== 'string') {
      return { isEmergency: false, match: null };
    }

    const clean = text.trim();
    for (const p of EMERGENCY_PATTERNS) {
      if (p.regex.test(clean)) {
        return {
          isEmergency: true,
          match: p
        };
      }
    }

    return { isEmergency: false, match: null };
  }

  static sanitizeInput(text) {
    if (!text || typeof text !== 'string') {
      return { sanitized: '', injectionDetected: false };
    }

    let sanitized = text.trim();
    if (sanitized.length > 1000) {
      sanitized = sanitized.slice(0, 1000);
    }

    sanitized = sanitized
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]+>/g, '');

    let injectionDetected = false;
    for (const p of INJECTION_PATTERNS) {
      if (p.test(sanitized)) {
        injectionDetected = true;
        sanitized = sanitized.replace(p, '[Filtered security instruction]');
      }
    }

    return { sanitized, injectionDetected };
  }

  static enforceResponseGuardrails(text) {
    if (!text || typeof text !== 'string') return '';

    let safeText = text;
    safeText = safeText.replace(/\bYou definitely have\b/gi, 'Your symptoms could potentially indicate');
    safeText = safeText.replace(/\bI diagnose you with\b/gi, 'Based on clinical guidelines, a potential consideration is');
    safeText = safeText.replace(/\bYou are diagnosed with\b/gi, 'Possible conditions to discuss with your doctor include');
    safeText = safeText.replace(/\bI confirm that you have\b/gi, 'A healthcare professional should evaluate you for');

    return safeText;
  }

  static getEmergencyNotice(emergencyMatch, lang = 'en') {
    const title = emergencyMatch ? emergencyMatch.title : 'Medical Emergency Alert';
    const reason = emergencyMatch ? emergencyMatch.reason : 'Your symptoms suggest an urgent, life-threatening condition.';

    if (lang === 'hi') {
      return `🚨 **आपातकालीन चेतावनी (EMERGENCY RED FLAG)**\n\n` +
        `**${title}**\n` +
        `⚠️ ${reason}\n\n` +
        `**तत्काल आवश्यक कदम:**\n` +
        `1. 📞 **तुरंत राष्ट्रीय एम्बुलेंस सेवा 108 या आपातकालीन 112 पर कॉल करें।**\n` +
        `2. मरीज को शांत रखें, शारीरिक श्रम न करने दें, और निकटतम अस्पताल/सामुदायिक स्वास्थ्य केंद्र (CHC/ICU) ले जाएं।\n` +
        `3. सहायता के लिए तुरंत स्थानीय आशा (ASHA) या स्वास्थ्य कार्यकर्ता से संपर्क करें।`;
    }

    if (lang === 'te') {
      return `🚨 **అత్యవసర హెచ్చరిక (EMERGENCY RED FLAG)**\n\n` +
        `**${title}**\n` +
        `⚠️ ${reason}\n\n` +
        `**వెంటనే చేయవలసిన పనులు:**\n` +
        `1. 📞 **వెంటనే 108 లేదా 112 జాతీయ అత్యవసర అంబులెన్స్‌కు కాల్ చేయండి.**\n` +
        `2. రోగిని ప్రశాంతంగా ఉంచండి మరియు సమీపంలోని ప్రభుత్వ లేదా అత్యవసర ఆసుపత్రికి (CHC/ICU) తీసుకెళ్లండి.\n` +
        `3. సహాయం కోసం స్థానిక ఆశా (ASHA) కార్యకర్తను సంప్రదించండి.`;
    }

    return `🚨 **CRITICAL MEDICAL EMERGENCY ALERT (EMERGENCY RED FLAG)**\n\n` +
      `**${title}**\n` +
      `⚠️ ${reason}\n\n` +
      `**IMMEDIATE LIFE-SAVING ACTIONS:**\n` +
      `1. 📞 **Call 108 (National Ambulance) or 112 (Emergency) IMMEDIATELY.**\n` +
      `2. Rush to the nearest Community Health Centre (CHC), District Hospital, or Emergency Trauma Centre.\n` +
      `3. Keep the patient still, avoid physical exertion, and notify the local ASHA or Community Health Worker.`;
  }

  static getDisclaimer(lang = 'en') {
    if (lang === 'hi') {
      return '⚠️ **चिकित्सा अस्वीकरण:** यह एआई-सहायता प्राप्त स्वास्थ्य परीक्षण और प्राथमिक मार्गदर्शन है, कोई आधिकारिक चिकित्सा निदान नहीं है। किसी भी गंभीर या बिगड़ती स्थिति में तुरंत एक योग्य चिकित्सक या निकटतम स्वास्थ्य केंद्र से संपर्क करें।';
    }
    if (lang === 'te') {
      return '⚠️ **వైద్య నిరాకరణ:** ఇది కేవలం AI ఆధారిత ఆరోగ్య మార్గదర్శకత్వం మాత్రమే, అధికారిక వైద్య నిర్ధారణ కాదు. తీవ్రమైన లక్షణాలు ఉంటే వెంటనే అర్హత కలిగిన వైద్యుడిని లేదా సమీప ఆసుపత్రిని సంప్రదించండి.';
    }
    return '⚠️ **Medical Disclaimer:** This is an AI-assisted healthcare triage and information service, NOT a formal medical diagnosis. If your symptoms are severe, unusual, or worsening, immediately consult a qualified medical professional or visit the nearest healthcare facility.';
  }
}

module.exports = {
  SafetyEngine,
  EMERGENCY_PATTERNS,
  INJECTION_PATTERNS
};
