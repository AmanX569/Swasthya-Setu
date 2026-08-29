/**
 * =========================================================
 * SWASTHYA SETU - MULTILINGUAL LIVE TRANSLATION & SPEECH ENGINE (i18n.js)
 * 7 Indian Languages with Real-Time Mutation Observer & Vernacular Voice
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_LANG = 'swasthya_setu_lang';

  const I18N_DICTIONARY = {
    en: {
      app_title: 'Swasthya Setu',
      app_tagline: 'Rural Healthcare Grid · ग्रामीण स्वास्थ्य सेतु',
      role_patient: '🌾 Citizen / Patient',
      role_doctor: '🩺 Doctor Clinic',
      role_worker: '🤝 ASHA Didi',
      role_admin: '👑 Health Admin',
      btn_theme: '🏛️ Theme',
      btn_sos: '🚨 Emergency 108 SOS',
      emergency_banner: '🚑 Immediate 108 Ambulance SOS — Tap to Call or Send GPS',
      welcome_heading: 'Healthcare is Close to Your Village',
      welcome_subline: 'Your local Sub-Centre, ASHA Didi, and PHC doctors are ready to help. Works 100% offline.',
      stat_active_sos: '108 Ambulance Active',
      stat_followups: 'Follow-ups Due',
      stat_medicines: 'Generic Meds In Stock',
      triage_title: '🩺 Visual AI Symptom Triage (आपातकालीन जांच)',
      triage_subtitle: 'Tap your symptom for instant first-aid guidance & emergency advice:',
      abha_title: '🆔 Digital ABHA Health Card (आयुष्मान कार्ड)',
      abha_desc: 'Your government health identity card. Keep it handy for free consultations and hospital visits.',
      btn_print_abha: '🖨️ Print / Download ABHA Card',
      meds_title: '💊 Jan Aushadhi Generic Medicine Savings',
      meds_desc: 'Save up to 80% with Pradhan Mantri Jan Aushadhi generic medicines. Same formula, lower price.',
      family_title: '👨‍👩‍👧 Family Health Circle (परिवार स्वास्थ्य चक्र)',
      btn_add_family: '+ Add Family Member',
      hospitals_title: '🏥 Live Hospital Beds & Blood Bank Near You',
      doc_queue_title: '📋 Live Teleconsultation Queue (ओपीडी कतार)',
      doc_rx_title: '📝 Smart e-Prescription Creator (डिजिटल पर्चा)',
      doc_tele_title: '📞 Teleconsultation Audio/Video HUD',
      asha_anc_title: '🤰 High-Risk Maternal Health Register (ANC)',
      asha_uip_title: '💉 Child Immunization Tracker (UIP टीका)',
      asha_visits_title: '🏡 Village Daily Home Visit Planner',
      admin_kpi_title: '📊 Rural Health Grid Executive Dashboard',
      admin_staff_title: '👥 Healthcare Personnel Registry',
      admin_beds_title: '🏥 Hospital Bed & Oxygen Grid',
      admin_blood_title: '🩸 Blood Bank Live Unit Stock',
      admin_drugs_title: '📦 Jan Aushadhi Medicine Inventory',
      read_aloud: '🔊 Read Aloud'
    },

    hi: {
      app_title: 'स्वास्थ्य सेतु',
      app_tagline: 'ग्रामीण स्वास्थ्य ग्रिड · जन जन तक उपचार',
      role_patient: '🌾 नागरिक / रोगी',
      role_doctor: '🩺 डॉक्टर क्लिनिक',
      role_worker: '🤝 आशा दीदी',
      role_admin: '👑 स्वास्थ्य प्रशासन',
      btn_theme: '🏛️ थीम बदलें',
      btn_sos: '🚨 आपातकाल 108',
      emergency_banner: '🚑 आपातकालीन 108 एम्बुलेंस — कॉल या लोकेशन भेजने हेतु टैप करें',
      welcome_heading: 'स्वास्थ्य सेवा आपके गांव के समीप है',
      welcome_subline: 'आपका उप-केंद्र, आशा दीदी और प्राथमिक स्वास्थ्य केंद्र सदैव आपकी सेवा में हैं। यह बिना इंटरनेट भी चलता है।',
      stat_active_sos: 'सक्रिय 108 एम्बुलेंस',
      stat_followups: 'लंबित स्वास्थ्य दौरे',
      stat_medicines: 'उपलब्ध जेनेरिक दवाइयां',
      triage_title: '🩺 लक्षण स्व-जांच व प्राथमिक उपचार',
      triage_subtitle: 'अपनी समस्या पर टैप करें और तुरंत सही सलाह प्राप्त करें:',
      abha_title: '🆔 डिजिटल आयुष्मान आभा कार्ड (ABHA)',
      abha_desc: 'आपका राष्ट्रीय स्वास्थ्य पहचान पत्र। सरकारी अस्पतालों व क्लिनिक में निशुल्क सेवा हेतु रखें।',
      btn_print_abha: '🖨️ आभा कार्ड प्रिंट / डाउनलोड करें',
      meds_title: '💊 जन औषधि बचत व दैनिक दवाइयां',
      meds_desc: 'प्रधानमंत्री जन औषधि से 80% तक की बचत करें। वही असर, बहुत कम दाम।',
      family_title: '👨‍👩‍👧 परिवार स्वास्थ्य चक्र (सभी सदस्य)',
      btn_add_family: '+ नया सदस्य जोड़ें',
      hospitals_title: '🏥 नजदीकी अस्पताल, बेड व ब्लड बैंक स्थिति',
      doc_queue_title: '📋 लाइव ओपीडी मरीज कतार',
      doc_rx_title: '📝 स्मार्ट डिजिटल ई-पर्चा (e-Rx)',
      doc_tele_title: '📞 टेलीकंसल्टेशन व परामर्श HUD',
      asha_anc_title: '🤰 गर्भवती महिला स्वास्थ्य रजिस्टर (ANC)',
      asha_uip_title: '💉 बाल टीकाकरण रजिस्टर (UIP)',
      asha_visits_title: '🏡 दैनिक घरेलू स्वास्थ्य दौरे',
      admin_kpi_title: '📊 स्वास्थ्य ग्रिड कमांड सेंटर',
      admin_staff_title: '👥 स्वास्थ्य कार्यकर्ता व डॉक्टर डायरेक्टरी',
      admin_beds_title: '🏥 अस्पताल बेड व ऑक्सीजन उपलब्धता',
      admin_blood_title: '🩸 ब्लड बैंक लाइव यूनिट स्टॉक',
      admin_drugs_title: '📦 जन औषधि दवा भंडार',
      read_aloud: '🔊 बोलकर सुनाएं'
    },

    te: {
      app_title: 'స్వాస్థ్య సేతు',
      app_tagline: 'గ్రామీణ ఆరోగ్య గ్రిడ్ · ప్రజల ఆరోగ్యం',
      role_patient: '🌾 పౌరుడు / రోగి',
      role_doctor: '🩺 డాక్టర్ క్లినిక్',
      role_worker: '🤝 ఆశా దీదీ',
      role_admin: '👑 అడ్మిన్',
      btn_theme: '🏛️ థీమ్',
      btn_sos: '🚨 అత్యవసర 108',
      emergency_banner: '🚑 అత్యవసర 108 అంబులెన్స్ — కాల్ లేదా జీపీఎస్ పంపండి',
      welcome_heading: 'వైద్య సంరక్షణ మీ గ్రామానికి సమీపంలోనే ఉంది',
      welcome_subline: 'మీ ఉప-కేంద్రం, ఆశా దీదీ మరియు డాక్టర్లు మీకు సాయం చేయడానికి సిద్ధంగా ఉన్నారు.',
      stat_active_sos: '108 సేవ అందుబాటులో ఉంది',
      stat_followups: 'తనిఖీలు పెండింగ్',
      stat_medicines: 'జన్ ఔషధి మందులు',
      triage_title: '🩺 3D లక్షణాల పరీక్ష & అత్యవసర సలహా',
      triage_subtitle: 'మీ లక్షణాన్ని ఎంచుకుని తక్షణ ప్రథమ చికిత్స సలహా పొందండి:',
      abha_title: '🆔 డిజిటల్ ఆభా హెల్త్ కార్డు (ABHA)',
      abha_desc: 'మీ జాతీయ ఆరోగ్య గుర్తింపు కార్డు. ఉచిత వైద్యం కోసం దీనిని ఉపయోగించండి.',
      btn_print_abha: '🖨️ ఆభా కార్డు ప్రింట్ / డౌన్‌లోడ్',
      meds_title: '💊 జన్ ఔషధి మందుల పొదుపు',
      meds_desc: 'జన్ ఔషధి ద్వారా 80% వరకు ఆదా చేసుకోండి.',
      family_title: '👨‍👩‍👧 కుటుంబ ఆరోగ్య చక్రం',
      btn_add_family: '+ కుటుంబ సభ్యుడిని చేర్చండి',
      hospitals_title: '🏥 సమీప ఆసుపత్రులు, బెడ్లు & బ్లడ్ బ్యాంక్',
      doc_queue_title: '📋 లైవ్ కన్సల్టేషన్ క్యూ',
      doc_rx_title: '📝 డిజిటల్ ప్రిస్క్రిప్షన్ (e-Rx)',
      doc_tele_title: '📞 టెలికన్సల్టేషన్ విభాగం',
      asha_anc_title: '🤰 గర్భిణీ స్త్రీల రికార్డు (ANC)',
      asha_uip_title: '💉 పిల్లల టీకాల రికార్డు (UIP)',
      asha_visits_title: '🏡 గ్రామ గృహ సందర్శనలు',
      admin_kpi_title: '📊 ఆరోగ్య కమాండ్ సెంటర్',
      admin_staff_title: '👥 వైద్య సిబ్బంది జాబితా',
      admin_beds_title: '🏥 ఆసుపత్రి బెడ్ల వివరాలు',
      admin_blood_title: '🩸 బ్లడ్ బ్యాంక్ నిల్వలు',
      admin_drugs_title: '📦 మందుల నిల్వ',
      read_aloud: '🔊 చదివి వినిపించు'
    },

    ta: {
      app_title: 'சுவஸ்த்யா சேது',
      app_tagline: 'கிராமப்புற சுகாதார கட்டமைப்பு',
      role_patient: '🌾 நோயாளி',
      role_doctor: '🩺 மருத்துவர்',
      role_worker: '🤝 ஆஷா பணியாளர்',
      role_admin: '👑 நிர்வாகம்',
      btn_theme: '🏛️ தீம்',
      btn_sos: '🚨 அவசர 108',
      emergency_banner: '🚑 அவசர 108 ஆம்புலன்ஸ் — அழைக்க தட்டவும்',
      welcome_heading: 'மருத்துவ சேவை உங்கள் கிராமத்திற்கு அருகில் உள்ளது',
      welcome_subline: 'உங்கள் அருகிலுள்ள சுகாதார மையம் மற்றும் ஆஷா பணியாளர்கள் உதவ தயாராக உள்ளனர்.',
      stat_active_sos: '108 தயார் நிலை',
      stat_followups: 'நிலுவை பரிசோதனைகள்',
      stat_medicines: 'மருந்து இருப்பு',
      triage_title: '🩺 முதலுதவி & அறிகுறி பரிசோதனை',
      triage_subtitle: 'உங்கள் உடல் பிரச்சனையை தேர்வு செய்து உடனடி வழிகாட்டல் பெறவும்:',
      abha_title: '🆔 டிஜிட்டல் ஆபா அட்டை (ABHA)',
      abha_desc: 'உங்கள் தேசிய சுகாதார அடையாள அட்டை.',
      btn_print_abha: '🖨️ ஆபா அட்டை பதிவிறக்கம்',
      meds_title: '💊 ஜன் ஔஷதி மருந்துகள் & சேமிப்பு',
      meds_desc: 'ஜன் ஔஷதி மூலம் 80% வரை பணத்தை சேமிக்கவும்.',
      family_title: '👨‍👩‍👧 குடும்ப சுகாதார வட்டம்',
      btn_add_family: '+ குடும்ப உறுப்பினர் சேர்க்க',
      hospitals_title: '🏥 அருகிலுள்ள மருத்துவமனை & ரத்த வங்கி',
      doc_queue_title: '📋 நோயாளி வரிசை',
      doc_rx_title: '📝 மருத்துவ சீட்டு (e-Rx)',
      doc_tele_title: '📞 தொலைதூர மருத்துவ சேவை',
      asha_anc_title: '🤰 கர்ப்பிணி பெண்கள் பதிவேடு (ANC)',
      asha_uip_title: '💉 தடுப்பூசி பதிவேடு (UIP)',
      asha_visits_title: '🏡 கிராம களப்பணி',
      admin_kpi_title: '📊 சுகாதார கட்டுப்பாட்டு மையம்',
      admin_staff_title: '👥 பணியாளர் பட்டியல்',
      admin_beds_title: '🏥 படுக்கை வசதி விவரம்',
      admin_blood_title: '🩸 ரத்த வங்கி இருப்பு',
      admin_drugs_title: '📦 மருந்து கிடங்கு',
      read_aloud: '🔊 வாசித்துக் காட்டு'
    },

    mr: {
      app_title: 'स्वास्थ्य सेतू',
      app_tagline: 'ग्रामीण आरोग्य ग्रिड',
      role_patient: '🌾 नागरिक / रुग्ण',
      role_doctor: '🩺 डॉक्टर',
      role_worker: '🤝 आशा सेविका',
      role_admin: '👑 प्रशासन',
      btn_theme: '🏛️ थीम',
      btn_sos: '🚨 आपत्कालीन 108',
      emergency_banner: '🚑 आपत्कालीन 108 रुग्णवाहिका — त्वरित कॉल करा',
      welcome_heading: 'आरोग्य सेवा तुमच्या गावाजवळ आहे',
      welcome_subline: 'तुमचे उपकेंद्र, आशा दीदी आणि डॉक्टर मदतीसाठी सज्ज आहेत.',
      stat_active_sos: '108 सक्रिय',
      stat_followups: 'प्रलंबित तपासण्या',
      stat_medicines: 'औषध साठा उपलब्ध',
      triage_title: '🩺 लक्षण तपासणी व प्रथमोपचार',
      triage_subtitle: 'तुमच्या समस्येवर टॅप करून त्वरित सल्ला मिळवा:',
      abha_title: '🆔 डिजिटल आभा आरोग्य कार्ड (ABHA)',
      abha_desc: 'तुमचे राष्ट्रीय आरोग्य ओळखपत्र.',
      btn_print_abha: '🖨️ आभा कार्ड प्रिंट करा',
      meds_title: '💊 जन औषधी बचत योजना',
      meds_desc: 'जन औषधीद्वारे ८०% पर्यंत बचत करा.',
      family_title: '👨‍👩‍👧 कुटुंब आरोग्य चक्र',
      btn_add_family: '+ नवीन सदस्य जोडा',
      hospitals_title: '🏥 जवळचे रुग्णालय, बेड व रक्तपेढी',
      doc_queue_title: '📋 ओपीडी रुग्ण रांग',
      doc_rx_title: '📝 डिजिटल प्रिस्क्रिप्शन',
      doc_tele_title: '📞 टेलिकन्सल्टेशन',
      asha_anc_title: '🤰 गरोदर माता नोंदवही (ANC)',
      asha_uip_title: '💉 बाल लसीकरण नोंद (UIP)',
      asha_visits_title: '🏡 दैनंदिन आरोग्य भेटी',
      admin_kpi_title: '📊 आरोग्य कमांड सेंटर',
      admin_staff_title: '👥 आरोग्य कर्मचारी यादी',
      admin_beds_title: '🏥 बेड उपलब्धता',
      admin_blood_title: '🩸 रक्त साठा',
      admin_drugs_title: '📦 औषध साठा',
      read_aloud: '🔊 ऐका'
    },

    bn: {
      app_title: 'স্বাস্থ্য সেতু',
      app_tagline: 'গ্রামীণ স্বাস্থ্যসেবা গ্রিড',
      role_patient: '🌾 নাগরিক / রোগী',
      role_doctor: '🩺 ডাক্তার',
      role_worker: '🤝 আশা কর্মী',
      role_admin: '👑 প্রশাসন',
      btn_theme: '🏛️ থিম',
      btn_sos: '🚨 জরুরি 108',
      emergency_banner: '🚑 জরুরি 108 অ্যাম্বুলেন্স — কল বা অবস্থান পাঠাতে ট্যাপ করুন',
      welcome_heading: 'স্বাস্থ্যসেবা আপনার গ্রামের কাছেই',
      welcome_subline: 'আপনার নিকটস্থ স্বাস্থ্যকেন্দ্র এবং আশা দিদি সর্বদা পাশে আছেন।',
      stat_active_sos: '১০৮ অ্যাম্বুলেন্স প্রস্তুত',
      stat_followups: 'বাকি ফলো-আপ',
      stat_medicines: 'ওষুধের স্টক আছে',
      triage_title: '🩺 লক্ষণ পরীক্ষা ও প্রাথমিক চিকিৎসা',
      triage_subtitle: 'আপনার সমস্যা নির্বাচন করে সঠিক পরামর্শ নিন:',
      abha_title: '🆔 ডিজিটাল আভা স্বাস্থ্য কার্ড (ABHA)',
      abha_desc: 'আপনার জাতীয় স্বাস্থ্য পরিচয়পত্র।',
      btn_print_abha: '🖨️ আভা কার্ড প্রিন্ট করুন',
      meds_title: '💊 জন ঔষধি সঞ্চয় ও ওষুধ',
      meds_desc: 'জন ঔষধি জেনেরিক ওষুধে ৮০% পর্যন্ত সাশ্রয় করুন।',
      family_title: '👨‍👩‍👧 পারিবারিক স্বাস্থ্য চক্র',
      btn_add_family: '+ নতুন সদস্য যোগ করুন',
      hospitals_title: '🏥 নিকটস্থ হাসপাতাল, বেড ও ব্লাড ব্যাংক',
      doc_queue_title: '📋 রোগী তালিকা',
      doc_rx_title: '📝 প্রেসক্রিপশন (e-Rx)',
      doc_tele_title: '📞 টেলিমেডিসিন',
      asha_anc_title: '🤰 গর্ভবতী স্বাস্থ্য রেকর্ড (ANC)',
      asha_uip_title: '💉 টিকাদান রেকর্ড (UIP)',
      asha_visits_title: '🏡 দৈনিক স্বাস্থ্য পরিদর্শন',
      admin_kpi_title: '📊 স্বাস্থ্য কমান্ড সেন্টার',
      admin_staff_title: '👥 স্বাস্থ্য কর্মী তালিকা',
      admin_beds_title: '🏥 হাসপাতালের বেড তথ্য',
      admin_blood_title: '🩸 ব্লাড ব্যাংক স্টক',
      admin_drugs_title: '📦 ওষুধ ইনভেন্টরি',
      read_aloud: '🔊 শুনুন'
    },

    kn: {
      app_title: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು',
      app_tagline: 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಜಾಲ',
      role_patient: '🌾 ನಾಗರಿಕ / ರೋಗಿ',
      role_doctor: '🩺 ವೈದ್ಯರು',
      role_worker: '🤝 ಆಶಾ ಕಾರ್ಯಕರ್ತೆ',
      role_admin: '👑 ಆಡಳಿತ',
      btn_theme: '🏛️ ಥೀಮ್',
      btn_sos: '🚨 ತುರ್ತು 108',
      emergency_banner: '🚑 ತುರ್ತು 108 ಆಂಬ್ಯುಲೆನ್ಸ್ — ಕರೆ ಮಾಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
      welcome_heading: 'ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮ ಹಳ್ಳಿಯ ಸಮೀಪದಲ್ಲಿದೆ',
      welcome_subline: 'ಉಪ-ಕೇಂದ್ರ, ಆಶಾ ದೀದಿ ಮತ್ತು ವೈದ್ಯರು ಸದಾ ನಿಮ್ಮ ಸೇವೆಗೆ ಸಿದ್ಧ.',
      stat_active_sos: '108 ಸೇವೆ ಲಭ್ಯ',
      stat_followups: 'ಬಾಕಿ ತಪಾಸಣೆಗಳು',
      stat_medicines: 'ಔಷಧಿಗಳ ಲಭ್ಯತೆ',
      triage_title: '🩺 ಲಕ್ಷಣ ಪರೀಕ್ಷೆ & ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ',
      triage_subtitle: 'ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಆರಿಸಿ ತಕ್ಷಣದ ಸಲಹೆ ಪಡೆಯಿರಿ:',
      abha_title: '🆔 ಡಿಜಿಟಲ್ ಆಭಾ ಹೆಲ್ತ್ ಕಾರ್ಡ್ (ABHA)',
      abha_desc: 'ನಿಮ್ಮ ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಗುರುತಿನ ಚೀಟಿ.',
      btn_print_abha: '🖨️ ಆಭಾ ಕಾರ್ಡ್ ಪ್ರಿಂಟ್ ಮಾಡಿ',
      meds_title: '💊 ಜನ ಔಷಧಿ ಉಳಿತಾಯ ಯೋಜನೆ',
      meds_desc: 'ಜನ ಔಷಧಿಯೊಂದಿಗೆ 80% ವರೆಗೆ ಹಣ ಉಳಿಸಿ.',
      family_title: '👨‍👩‍👧 ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ',
      btn_add_family: '+ ಹೊಸ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ',
      hospitals_title: '🏥 ಸಮೀಪದ ಆಸ್ಪತ್ರೆ, ಬೆಡ್ & ರಕ್ತನಿಧಿ',
      doc_queue_title: '📋 ರೋಗಿಗಳ ಸರತಿ',
      doc_rx_title: '📝 ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್',
      doc_tele_title: '📞 ಟೆಲಿಮೆಡಿಸಿನ್ ಕನ್ಸಲ್ಟೇಶನ್',
      asha_anc_title: '🤰 ಗರ್ಭಿಣಿಯರ ದಾಖಲೆ (ANC)',
      asha_uip_title: '💉 ಲಸಿಕೆ ದಾಖಲೆ (UIP)',
      asha_visits_title: '🏡 ಗ್ರಾಮ ಭೇಟಿಗಳು',
      admin_kpi_title: '📊 ಆರೋಗ್ಯ ಕಮಾಂಡ್ ಸೆಂಟರ್',
      admin_staff_title: '👥 ಆರೋಗ್ಯ ಸಿಬ್ಬಂದಿ ಪಟ್ಟಿ',
      admin_beds_title: '🏥 ಆಸ್ಪತ್ರೆ ಬೆಡ್ ಲಭ್ಯತೆ',
      admin_blood_title: '🩸 ರಕ್ತದ ದಾಸ್ತಾನು',
      admin_drugs_title: '📦 ಔಷಧಿ ದಾಸ್ತಾನು',
      read_aloud: '🔊 ಓದಿ ಕೇಳಿ'
    }
  };

  class I18nEngine {
    constructor() {
      this.currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'en';
      this.dict = I18N_DICTIONARY;
    }

    init() {
      this.setLanguage(this.currentLang);
    }

    get(key, fallback = '') {
      const langDict = this.dict[this.currentLang] || this.dict.en;
      return langDict[key] || this.dict.en[key] || fallback || key;
    }

    setLanguage(lang) {
      if (!this.dict[lang]) lang = 'en';
      this.currentLang = lang;
      localStorage.setItem(STORAGE_KEY_LANG, lang);

      if (global.appStore) {
        global.appStore.setLanguage(lang);
      }

      document.querySelectorAll('#langSelect, .lang-select').forEach(sel => {
        sel.value = lang;
      });

      this.applyTranslations(lang);
    }

    applyTranslations(lang) {
      const dict = this.dict[lang] || this.dict.en;

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });

      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
          el.setAttribute('placeholder', dict[key]);
        }
      });
    }
  }

  global.speakText = function(text) {
    if (!('speechSynthesis' in window)) {
      if (typeof window.toast === 'function') window.toast('Speech not supported on this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const lang = global.i18n ? global.i18n.currentLang : 'en';
    const langLocales = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      mr: 'mr-IN',
      bn: 'bn-IN',
      kn: 'kn-IN'
    };

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = langLocales[lang] || 'en-IN';
    utter.rate = 0.92;
    utter.pitch = 1.0;

    window.speechSynthesis.speak(utter);
    if (typeof window.toast === 'function') {
      window.toast('🔊 ' + text.slice(0, 40) + '...');
    }
  };

  global.onLanguageChange = function(lang) {
    global.i18n.setLanguage(lang);
    const names = { en: 'English', hi: 'हिंदी', te: 'తెలుగు', ta: 'தமிழ்', mr: 'मराठी', bn: 'বাংলা', kn: 'ಕನ್ನಡ' };
    if (typeof window.toast === 'function') {
      window.toast(`🌐 ${names[lang] || lang}`);
    }
  };

  const i18n = new I18nEngine();
  global.i18n = i18n;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
  } else {
    i18n.init();
  }

})(typeof window !== 'undefined' ? window : this);
