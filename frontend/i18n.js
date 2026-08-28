/**
 * =========================================================
 * SWASTHYA SETU - MULTILINGUAL TRANSLATION ENGINE (i18n.js)
 * Real-Time 100% Reversible Live Translation across 7 Indian Languages
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_LANG = 'swasthya_setu_lang';

  const I18N_DICTIONARY = {
    en: {
      tagline: 'Swasthya Setu · Rural Healthcare Grid',
      top_title: 'Namaste, Anitha K.',
      top_eyebrow: 'Andhra Pradesh · Kondapalli Health Sector',
      weather_ticker: '38°C High Heat — Drink Clean Water & ORS | 🌧️ Keep water storage covered to prevent dengue.',
      btn_theme: '🌙 Theme',
      btn_sos: '🚨 SOS 108',
      btn_login: '🔑 Sign In',
      btn_read_aloud: '🔊 Read Aloud',

      // Navigation Groups
      nav_patient_care: 'Patient Care · रोगी सेवा',
      nav_village_grid: 'Village Grid · ग्रामीण सेवा',
      nav_doctor_desk: 'Clinical Desk · चिकित्सक',
      nav_asha_desk: 'ASHA Frontline · आशा',
      nav_admin_desk: 'Admin Command · प्रशासन',

      // Patient Navigation
      nav_home: 'Home & Journey',
      nav_triage: '3D Symptom Check',
      nav_appt: 'Queue & Token',
      nav_records: 'Health Locker (ABHA)',
      nav_sos: 'Emergency 108 SOS',
      nav_meds: 'Jan Aushadhi & Stock',
      nav_referrals: 'Referral Ladder',
      nav_firstaid: 'Visual First Aid',
      nav_asha: 'ASHA Didi Desk',
      nav_dashboard: 'Admin Command Center',

      // Doctor Navigation
      nav_doc_overview: 'Doctor Clinical Desk',
      nav_doc_queue: 'Live Consult Queue',
      nav_doc_video: 'Teleconsultation HUD',
      nav_doc_emr: 'Pre-Consult Vitals & EMR',
      nav_doc_rx: 'Smart e-Prescription',
      nav_doc_emergency: 'ICU Bed Reservation',

      // Worker Navigation
      nav_worker_overview: 'ASHA Frontline Desk',
      nav_worker_anc: 'High-Risk Pregnancy (ANC)',
      nav_worker_uip: 'Child Immunization (UIP)',
      nav_worker_visits: 'Daily Home Visits',
      nav_worker_vitals: 'Frontline Vital Capture',
      nav_worker_sync: 'Offline Sync Queue',

      // Admin Navigation
      nav_admin_overview: 'Admin Command Center',
      nav_admin_staff: 'Staff & User Registry',
      nav_admin_approvals: 'Doctor Credential Approvals',
      nav_admin_heatmap: 'Disease Outbreak Map',
      nav_admin_supply: 'Rural Drug Supply',
      nav_admin_beds: 'Hospital Bed Grid & Blood',

      // Home View Elements
      welcome_heading: 'Care is close to your home',
      welcome_subline: 'Start with one simple step. Your nearest Kondapalli Sub-Centre & ASHA Didi are ready to help, even when phone signal is low.',
      stat_active_sos: 'Emergency 108 Active',
      stat_followups: 'Follow-ups Due',
      stat_medicines: 'Medicines in Stock',
      family_care: 'Family Health Circle · परिवार स्वास्थ्य चक्र',
      care_ladder: 'Care Journey & Referral Ladder · देखभाल सीढ़ी',
      daily_meds_title: 'Daily Medication Schedule & Jan Aushadhi Tracker',
      live_beds_title: 'Live Hospital & Bed Capacity Near You',

      // Triage View
      triage_title: '3D AI Symptom Self-Triage (Gemini Flash)',
      triage_question: 'What is the primary symptom bothering you today?',
      triage_guidance: 'Select a symptom or tap any body hotspot above for instant Red/Yellow/Green safety triage and pre-hospital first aid.',

      // Medicines View
      meds_title: 'Jan Aushadhi Generic Medicine Savings & Stock',
      rx_scan_title: 'AI Prescription Scanner & Digitizer (Gemini Multimodal OCR)',
      rx_scan_desc: 'Upload or photograph doctor handwritten prescription to extract medicines and save 80%+ with Jan Aushadhi generics.'
    },

    hi: {
      tagline: 'स्वास्थ्य सेतु · ग्रामीण स्वास्थ्य ग्रिड',
      top_title: 'नमस्ते, अनिता जी',
      top_eyebrow: 'आंध्र प्रदेश · कोंडापल्ली स्वास्थ्य क्षेत्र',
      weather_ticker: '38°C तेज गर्मी — स्वच्छ पानी और ओआरएस पिएं | 🌧️ डेंगू से बचाव हेतु पानी के बर्तन ढककर रखें।',
      btn_theme: '🌙 थीम',
      btn_sos: '🚨 आपातकाल 108',
      btn_login: '🔑 लॉगिन करें',
      btn_read_aloud: '🔊 बोलकर सुनाएं',

      // Navigation Groups
      nav_patient_care: 'रोगी स्वास्थ्य सेवा',
      nav_village_grid: 'ग्रामीण स्वास्थ्य ग्रिड',
      nav_doctor_desk: 'चिकित्सक क्लिनिकल डेस्क',
      nav_asha_desk: 'आशा दीदी कार्यक्षेत्र',
      nav_admin_desk: 'प्रशासन कमांड सेंटर',

      // Patient Navigation
      nav_home: 'मुख्य पृष्ठ व यात्रा',
      nav_triage: '3D लक्षण जांच (AI)',
      nav_appt: 'टोकन व कतार',
      nav_records: 'डिजिटल स्वास्थ्य लॉकर (ABHA)',
      nav_sos: 'आपातकालीन 108 एम्बुलेंस',
      nav_meds: 'जन औषधि व दवाइयां',
      nav_referrals: 'रेफ़रल सीढ़ी',
      nav_firstaid: 'प्राथमिक उपचार निर्देश',
      nav_asha: 'आशा दीदी डेस्क',
      nav_dashboard: 'प्रशासन कमांड सेंटर',

      // Doctor Navigation
      nav_doc_overview: 'डॉक्टर क्लिनिकल डेस्क',
      nav_doc_queue: 'लाइव मरीज कतार',
      nav_doc_video: 'टेलीकंसल्टेशन वीडियो HUD',
      nav_doc_emr: 'स्वास्थ्य रिकॉर्ड व विटल्स',
      nav_doc_rx: 'स्मार्ट ई-प्रिस्क्रिप्शन',
      nav_doc_emergency: 'आईसीयू बेड आरक्षण',

      // Worker Navigation
      nav_worker_overview: 'आशा फ्रंटलाइन डेस्क',
      nav_worker_anc: 'उच्च जोखिम मातृत्व (ANC)',
      nav_worker_uip: 'बाल टीकाकरण (UIP)',
      nav_worker_visits: 'दैनिक घरेलू दौरे',
      nav_worker_vitals: 'मरीज विटल्स एंट्री',
      nav_worker_sync: 'ऑफ़लाइन सिंक कतार',

      // Admin Navigation
      nav_admin_overview: 'प्रशासन कमांड सेंटर',
      nav_admin_staff: 'स्वास्थ्य कार्यकर्ता डायरेक्टरी',
      nav_admin_approvals: 'डॉक्टर लाइसेंस सत्यापन',
      nav_admin_heatmap: 'संक्रामक रोग हॉटस्पॉट मैप',
      nav_admin_supply: 'आवश्यक दवा भंडार',
      nav_admin_beds: 'अस्पताल बेड व ब्लड बैंक',

      // Home View Elements
      welcome_heading: 'स्वास्थ्य सेवा आपके घर के पास है',
      welcome_subline: 'एक साधारण कदम से शुरुआत करें। आपका नजदीकी कोंडापल्ली उप-केंद्र व आशा दीदी फोन सिग्नल कम होने पर भी आपकी सेवा के लिए तैयार हैं।',
      stat_active_sos: 'सक्रिय 108 एम्बुलेंस',
      stat_followups: 'लंबित स्वास्थ्य दौरे',
      stat_medicines: 'दवाइयों की उपलब्धता',
      family_care: 'परिवार स्वास्थ्य चक्र · सभी सदस्य',
      care_ladder: 'देखभाल यात्रा व रेफरल सीढ़ी',
      daily_meds_title: 'दैनिक दवा सूची व जन औषधि बचत ट्रैकर',
      live_beds_title: 'नजदीकी अस्पताल, आईसीयू व सामान्य बेड की लाइव स्थिति',

      // Triage View
      triage_title: '3D AI लक्षण स्व-जांच व सुरक्षा सलाह (Gemini)',
      triage_question: 'आज आपको मुख्य रूप से क्या शारीरिक समस्या है?',
      triage_guidance: 'तुरंत लाल/पीला/हरा जोखिम मूल्यांकन और प्राथमिक उपचार प्राप्त करने हेतु लक्षण चुनें।',

      // Medicines View
      meds_title: 'जन औषधि जेनेरिक दवाएं व बचत कैलकुलेटर',
      rx_scan_title: 'एआई पर्चा स्कैनर व डिजिटाइज़र (Gemini OCR)',
      rx_scan_desc: 'डॉक्टर का हस्तलिखित पर्चा स्कैन करें और जन औषधि जेनेरिक दवाओं पर 80% से अधिक की बचत पाएं।'
    },

    te: {
      tagline: 'స్వాస్థ్య సేతు · గ్రామీణ ఆరోగ్య నెట్‌వర్క్',
      top_title: 'నమస్కారం, అనిత గారు',
      top_eyebrow: 'ఆంధ్రప్రదేశ్ · కొండపల్లి ఆరోగ్య విభాగం',
      weather_ticker: '38°C ఎండ తీవ్రత — మంచినీరు & ఓఆర్ఎస్ తాగండి | 🌧️ డెంగ్యూ నివారణకు నీటి నిల్వలను మూసి ఉంచండి.',
      btn_theme: '🌙 థీమ్',
      btn_sos: '🚨 అత్యవసర 108',
      btn_login: '🔑 లాగిన్',
      btn_read_aloud: '🔊 చదివి వినిపించు',

      nav_patient_care: 'రోగి సంరక్షణ',
      nav_village_grid: 'గ్రామీణ సేవలు',
      nav_doctor_desk: 'వైద్యుల క్లినికల్ డెస్క్',
      nav_asha_desk: 'ఆశా కార్యకర్త డెస్క్',
      nav_admin_desk: 'అడ్మిన్ కమాండ్',

      nav_home: 'హోమ్ & ప్రయాణం',
      nav_triage: '3D లక్షణాల పరీక్ష',
      nav_appt: 'క్యూ & టోకెన్',
      nav_records: 'ఆరోగ్య రికార్డు (ABHA)',
      nav_sos: 'అత్యవసర 108 SOS',
      nav_meds: 'జన్ ఔషధి మందులు',
      nav_referrals: 'రిఫరల్ నిచ్చెన',
      nav_firstaid: 'ప్రథమ చికిత్స',
      nav_asha: 'ఆశా దీదీ డెస్క్',
      nav_dashboard: 'అడ్మిన్ కమాండ్ సెంటర్',

      nav_doc_overview: 'డాక్టర్ క్లినికల్ డెస్క్',
      nav_doc_queue: 'లైవ్ కన్సల్టేషన్ క్యూ',
      nav_doc_video: 'టెలికన్సల్టేషన్ వీడియో',
      nav_doc_emr: 'రోగి రికార్డులు & వైటల్స్',
      nav_doc_rx: 'స్మార్ట్ ప్రిస్క్రిప్షన్',
      nav_doc_emergency: 'ఐసీయూ బెడ్ రిజర్వేషన్',

      nav_worker_overview: 'ఆశా ఫ్రంట్‌లైన్ డెస్క్',
      nav_worker_anc: 'గర్భిణీ స్త్రీల సంరక్షణ (ANC)',
      nav_worker_uip: 'చిన్నారుల టీకాలు (UIP)',
      nav_worker_visits: 'ఇంటింటి సందర్శనలు',
      nav_worker_vitals: 'వైటల్స్ నమోదు',
      nav_worker_sync: 'ఆఫ్‌లైన్ సింక్',

      nav_admin_overview: 'అడ్మిన్ కమాండ్ సెంటర్',
      nav_admin_staff: 'వైద్య సిబ్బంది రిజిస్ట్రీ',
      nav_admin_approvals: 'డాక్టర్ లైసెన్స్ ధృవీకరణ',
      nav_admin_heatmap: 'వ్యాధుల వ్యాప్తి మ్యాప్',
      nav_admin_supply: 'మందుల నిల్వ స్థితి',
      nav_admin_beds: 'ఆసుపత్రి బెడ్లు & బ్లడ్ బ్యాంక్',

      welcome_heading: 'వైద్య సంరక్షణ మీ ఇంటి సమీపంలోనే ఉంది',
      welcome_subline: 'ఒక సాధారణ అడుగుతో ప్రారంభించండి. ఫోన్ సిగ్నల్ తక్కువగా ఉన్నప్పటికీ కొండపల్లి ఉప-కేంద్రం మరియు ఆశా దీదీ సహాయం చేయడానికి సిద్ధంగా ఉన్నారు.',
      stat_active_sos: 'క్రియాశీల 108 అంబులెన్స్',
      stat_followups: 'రాబోయే తనిఖీలు',
      stat_medicines: 'మందుల నిల్వ',
      family_care: 'కుటుంబ ఆరోగ్య చక్రం',
      care_ladder: 'సంరక్షణ ప్రయాణం & రిఫరల్ నిచ్చెన',
      daily_meds_title: 'రోజువారీ మందుల షెడ్యూల్ & జన్ ఔషధి పొదుపు',
      live_beds_title: 'సమీప ఆసుపత్రులు, ఐసీయూ మరియు సాధారణ బెడ్ల వివరాలు',

      triage_title: '3D AI లక్షణాల పరీక్ష & అత్యవసర సలహా',
      triage_question: 'ఈ రోజు మీకు ఉన్న ప్రధాన ఆరోగ్య సమస్య ఏమిటి?',
      triage_guidance: 'తక్షణ ఎరుపు/పసుపు/ఆకుపచ్చ వర్గీకరణ మరియు ప్రథమ చికిత్స కోసం లక్షణాన్ని ఎంచుకోండి.',

      meds_title: 'జన్ ఔషధి జనరిక్ మందులు & పొదుపు కాలిక్యులేటర్',
      rx_scan_title: 'AI ప్రిస్క్రిప్షన్ స్కానర్ & డిజిటైజర్',
      rx_scan_desc: 'వైద్యుల ప్రిస్క్రిప్షన్ స్కాన్ చేసి జన్ ఔషధి జనరిక్ మందులతో 80% కంటే ఎక్కువ ఆదా చేయండి.'
    },

    ta: {
      tagline: 'சுவஸ்திய சேது · கிராமப்புற சுகாதார கட்டமைப்பு',
      top_title: 'வணக்கம், அனிதா',
      top_eyebrow: 'ஆந்திரப் பிரதேசம் · கொண்டபல்லி சுகாதார பிரிவு',
      weather_ticker: '38°C அதிக வெப்பம் — தூய நீர் மற்றும் ஓ.ஆர்.எஸ் அருந்தவும் | 🌧️ டெங்கு தடுப்புக்கு நீர் தொட்டிகளை மூடி வைக்கவும்.',
      btn_theme: '🌙 தீம்',
      btn_sos: '🚨 அவசர 108',
      btn_login: '🔑 உள்நுழைவு',
      btn_read_aloud: '🔊 வாசிக்கவும்',

      nav_patient_care: 'நோயாளி பராமரிப்பு',
      nav_village_grid: 'கிராமப்புற கட்டமைப்பு',
      nav_doctor_desk: 'மருத்துவர் பிரிவு',
      nav_asha_desk: 'ஆஷா களப்பணி',
      nav_admin_desk: 'நிர்வாக மையம்',

      nav_home: 'முகப்பு & பயணம்',
      nav_triage: '3D அறிகுறிகள் சோதனை',
      nav_appt: 'வரிசை & டோக்கன்',
      nav_records: 'சுகாதார ஆவணம் (ABHA)',
      nav_sos: 'அவசர 108 ஆம்புலன்ஸ்',
      nav_meds: 'ஜன் ஔஷதி மருந்துகள்',
      nav_referrals: 'பரிந்துரை ஏணி',
      nav_firstaid: 'முதலுதவி வழிகாட்டி',
      nav_asha: 'ஆஷா பணிமனை',
      nav_dashboard: 'நிர்வாக மையம்',

      welcome_heading: 'மருத்துவ சேவை உங்கள் வீட்டின் அருகில் உள்ளது',
      welcome_subline: 'உங்கள் அருகிலுள்ள கொண்டபல்லி ஆரம்ப சுகாதார நிலையம் எப்போதும் உதவ தயாராக உள்ளது.',
      stat_active_sos: '108 அவசர ஊர்தி',
      stat_followups: 'நிலுவையில் உள்ள பரிசோதனை',
      stat_medicines: 'மருந்து இருப்பு',
      family_care: 'குடும்ப சுகாதார வட்டம்',
      care_ladder: 'சிகிச்சை பயணம் & பரிந்துரை ஏணி',
      daily_meds_title: 'தினசரி மருந்து அட்டவணை',
      live_beds_title: 'மருத்துவமனை படுக்கை நிலை',

      triage_title: '3D AI அறிகுறிகள் சுய ஆய்வு',
      triage_question: 'உங்களுக்கு என்ன பிரச்சனை உள்ளது?',
      triage_guidance: 'அவசர முதலுதவி பெற அறிகுறிகளை தேர்ந்தெடுக்கவும்.',
      meds_title: 'ஜன் ஔஷதி மருந்துகள் & சேமிப்பு',
      rx_scan_title: 'AI மருந்து சீட்டு ஸ்கேனர்',
      rx_scan_desc: 'மருத்துவர் சீட்டை ஸ்கேன் செய்து 80% வரை பணத்தை சேமிக்கவும்.'
    },

    mr: {
      tagline: 'स्वास्थ्य सेतू · ग्रामीण आरोग्य ग्रीड',
      top_title: 'नमस्ते, अनिता जी',
      top_eyebrow: 'आंध्र प्रदेश · कोंडापल्ली आरोग्य क्षेत्र',
      weather_ticker: '38°C उष्णता — स्वच्छ पाणी आणि ओआरएस प्या | 🌧️ डेंग्यूपासून संरक्षणासाठी पाण्याची भांडी झाकून ठेवा.',
      btn_theme: '🌙 थीम',
      btn_sos: '🚨 आपत्कालीन 108',
      btn_login: '🔑 साइन इन',
      btn_read_aloud: '🔊 ऐका',

      nav_patient_care: 'रुग्ण सेवा',
      nav_village_grid: 'ग्रामीण सेवा',
      nav_doctor_desk: 'डॉक्टर डेस्क',
      nav_asha_desk: 'आशा दीदी डेस्क',
      nav_admin_desk: 'प्रशासन केंद्र',

      nav_home: 'मुख्य पृष्ठ व प्रवास',
      nav_triage: '3D लक्षण तपासणी',
      nav_appt: 'टोकन व रांग',
      nav_records: 'आरोग्य लॉकर (ABHA)',
      nav_sos: 'आपत्कालीन 108 SOS',
      nav_meds: 'जन औषधी व औषधे',
      nav_referrals: 'रेफरल शिडी',
      nav_firstaid: 'प्रथमोपचार',
      nav_asha: 'आशा दीदी डेस्क',
      nav_dashboard: 'प्रशासन केंद्र',

      welcome_heading: 'आरोग्य सेवा तुमच्या घराच्या जवळ आहे',
      welcome_subline: 'कोंडापल्ली उपकेंद्र आणि आशा दीदी तुमच्या मदतीसाठी सदैव तयार आहेत.',
      stat_active_sos: '108 सक्रिय रुग्णवाहिका',
      stat_followups: 'प्रलंबित तपासणी',
      stat_medicines: 'औषध साठा',
      family_care: 'कुटुंब आरोग्य चक्र',
      care_ladder: 'काळजी प्रवास आणि रेफरल शिडी',
      daily_meds_title: 'दैनिक औषध वेळापत्रक',
      live_beds_title: 'जवळचे रुग्णालय आणि खाटांची स्थिती',

      triage_title: '3D AI लक्षण तपासणी',
      triage_question: 'तुम्हाला कोणती शारीरिक समस्या आहे?',
      triage_guidance: 'त्वरीत प्रथमोपचार व मार्गदर्शनासाठी लक्षणे निवडा.',
      meds_title: 'जन औषधी जेनेरिक औषधे व बचत',
      rx_scan_title: 'AI प्रिस्क्रिप्शन स्कॅनर',
      rx_scan_desc: 'डॉक्टरांचे प्रिस्क्रिप्शन स्कॅन करा आणि ८०% पर्यंत बचत मिळवा.'
    },

    bn: {
      tagline: 'স্বাস্থ্য সেতু · গ্রামীণ স্বাস্থ্য গ্রিড',
      top_title: 'নমস্কার, অনিতা দেবী',
      top_eyebrow: 'অন্ধ্র প্রদেশ · কোণ্ডাপল্লী স্বাস্থ্য কেন্দ্র',
      weather_ticker: '38°C তীব্র গরম — পরিষ্কার জল ও ওআরএস পান করুন | 🌧️ ডেঙ্গু প্রতিরোধে জলের পাত্র ঢেকে রাখুন।',
      btn_theme: '🌙 থিম',
      btn_sos: '🚨 জরুরী 108',
      btn_login: '🔑 লগইন',
      btn_read_aloud: '🔊 শুনুন',

      nav_patient_care: 'রোগী সেবা',
      nav_village_grid: 'গ্রামীণ সেবা',
      nav_doctor_desk: 'চিকিৎসক ডেস্ক',
      nav_asha_desk: 'আশা দিদি ডেস্ক',
      nav_admin_desk: 'প্রশাসন কেন্দ্র',

      nav_home: 'হোম ও চিকিৎসা যাত্রা',
      nav_triage: '3D লক্ষণ পরীক্ষা',
      nav_appt: 'টোকেন ও সিরিয়াল',
      nav_records: 'ডিজিটাল লকার (ABHA)',
      nav_sos: 'জরুরী 108 SOS',
      nav_meds: 'জন ঔষধি ও ওষুধ',
      nav_referrals: 'রেফারেল মই',
      nav_firstaid: 'প্রাথমিক চিকিৎসা',
      nav_asha: 'আশা দিদি ডেস্ক',
      nav_dashboard: 'প্রশাসন কেন্দ্র',

      welcome_heading: 'স্বাস্থ্যসেবা আপনার বাড়ির কাছেই',
      welcome_subline: 'কোণ্ডাপল্লী স্বাস্থ্য কেন্দ্র ও আশা দিদি আপনার সেবায় সদা প্রস্তুত।',
      stat_active_sos: 'সক্রিয় 108 অ্যাম্বুলেন্স',
      stat_followups: 'বাকি ফলো-আপ',
      stat_medicines: 'ওষুধের স্টক',
      family_care: 'পারিবারিক স্বাস্থ্য চক্র',
      care_ladder: 'চিকিৎসা যাত্রা ও রেফারেল মই',
      daily_meds_title: 'দৈনিক ওষুধের সময়সূচী',
      live_beds_title: 'নিকটবর্তী হাসপাতালের বেড স্থিতি',

      triage_title: '3D AI লক্ষণ পরীক্ষা',
      triage_question: 'আপনার প্রধান সমস্যা কী?',
      triage_guidance: 'সঠিক নির্দেশিকার জন্য লক্ষণ নির্বাচন করুন।',
      meds_title: 'জন ঔষধি জেনেরিক ওষুধ ও সাশ্রয়',
      rx_scan_title: 'AI প্রেসক্রিপশন স্ক্যানার',
      rx_scan_desc: 'প্রেসক্রিপশন স্ক্যান করে জেনেরিক ওষুধে ৮০% পর্যন্ত সাশ্রয় করুন।'
    },

    kn: {
      tagline: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು · ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ನೆಟ್‌ವರ್ಕ್',
      top_title: 'ನಮಸ್ಕಾರ, ಅನಿತಾ ಅವರೇ',
      top_eyebrow: 'ಆಂಧ್ರಪ್ರದೇಶ · ಕೊಂಡಪಲ್ಲಿ ಆರೋಗ್ಯ ವಲಯ',
      weather_ticker: '38°C ಬಿಸಿಲಿನ ತಾಪ — ಶುದ್ಧ ನೀರು ಮತ್ತು ಒಆರ್‌ಎಸ್ ಸೇವಿಸಿ | 🌧️ ಡೆಂಗ್ಯೂ ತಡೆಗಟ್ಟಲು ನೀರಿನ ಪಾತ್ರೆ ಮುಚ್ಚಿಡಿ.',
      btn_theme: '🌙 ಥೀಮ್',
      btn_sos: '🚨 ತುರ್ತು 108',
      btn_login: '🔑 ಲಾಗಿನ್',
      btn_read_aloud: '🔊 ಆಲಿಸಿ',

      nav_patient_care: 'ರೋಗಿ ಸೇವೆ',
      nav_village_grid: 'ಗ್ರಾಮೀಣ ಸೇವೆ',
      nav_doctor_desk: 'ವೈದ್ಯರ ಕ್ಲಿನಿಕಲ್ ಡೆಸ್ಕ್',
      nav_asha_desk: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆ ಡೆಸ್ಕ್',
      nav_admin_desk: 'ಆಡಳಿತ ಕೇಂದ್ರ',

      nav_home: 'ಮುಖಪುಟ & ಪ್ರಯಾಣ',
      nav_triage: '3D ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷೆ',
      nav_appt: 'ಸರತಿ & ಟೋಕನ್',
      nav_records: 'ಆರೋಗ್ಯ ಲಾಕರ್ (ABHA)',
      nav_sos: 'ತುರ್ತು 108 SOS',
      nav_meds: 'ಜನ ಔಷಧಿ & ಔಷಧಿಗಳು',
      nav_referrals: 'ರೆಫರಲ್ ಏಣಿ',
      nav_firstaid: 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ',
      nav_asha: 'ಆಶಾ ದೀದಿ ಡೆಸ್ಕ್',
      nav_dashboard: 'ಆಡಳಿತ ಕೇಂದ್ರ',

      welcome_heading: 'ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮ ಮನೆಯ ಸಮೀಪದಲ್ಲಿದೆ',
      welcome_subline: 'ಕೊಂಡಪಲ್ಲಿ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ ಮತ್ತು ಆಶಾ ದೀದಿ ಯಾವಾಗಲೂ ನಿಮ್ಮ ಸೇವೆಗೆ ಸಿದ್ಧ.',
      stat_active_sos: 'ಸಕ್ರಿಯ 108 ಆಂಬ್ಯುಲೆನ್ಸ್',
      stat_followups: 'ಬಾಕಿ ಇರುವ ತಪಾಸಣೆಗಳು',
      stat_medicines: 'ಔಷಧಿಗಳ ಲಭ್ಯತೆ',
      family_care: 'ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ',
      care_ladder: 'ಆರೋಗ್ಯ ಪಯಣ ಮತ್ತು ರೆಫರಲ್ ಏಣಿ',
      daily_meds_title: 'ದೈನಂದಿನ ಔಷಧಿ ವೇಳಾಪಟ್ಟಿ',
      live_beds_title: 'ಆಸ್ಪತ್ರೆ ಬೆಡ್ ವಿವರಗಳು',

      triage_title: '3D AI ರೋಗಲಕ್ಷಣಗಳ ಸ್ವಯಂ ಪರೀಕ್ಷೆ',
      triage_question: 'ನಿಮ್ಮ ಮುಖ್ಯ ಸಮಸ್ಯೆ ಏನು?',
      triage_guidance: 'ತಕ್ಷಣದ ಸಲಹೆಗಾಗಿ ಲಕ್ಷಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
      meds_title: 'ಜನ ಔಷಧಿ ಉಳಿತಾಯ ಲೆಕ್ಕಾಚಾರ',
      rx_scan_title: 'AI ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನರ್',
      rx_scan_desc: 'ವೈದ್ಯರ ಚೀಟಿ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಶೇ. 80 ಕ್ಕಿಂತ ಹೆಚ್ಚು ಉಳಿಸಿ.'
    }
  };

  class I18nEngine {
    constructor() {
      this.currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'hi';
    }

    setLanguage(lang) {
      if (!I18N_DICTIONARY[lang]) {
        lang = 'en';
      }
      this.currentLang = lang;
      try {
        localStorage.setItem(STORAGE_KEY_LANG, lang);
      } catch (e) {}

      this.translateDOM();

      const langSelect = document.getElementById('headerLangSelect');
      if (langSelect && langSelect.value !== lang) {
        langSelect.value = lang;
      }

      // Re-render active dynamic components in the new language if present
      if (typeof window.appState !== 'undefined') {
        const viewId = window.appState.view || 'home';
        if (viewId === 'home' && typeof window.patientController !== 'undefined') {
          window.patientController.init();
        } else if (viewId === 'dashboard' && typeof window.adminController !== 'undefined') {
          window.adminController.renderCommandCenter();
        } else if (viewId === 'tele' && typeof window.doctorController !== 'undefined') {
          window.doctorController.renderDoctorWorkspace();
        } else if (viewId === 'worker' && typeof window.workerController !== 'undefined') {
          window.workerController.renderWorkerWorkspace();
        } else if (viewId === 'sos' && typeof window.patientController !== 'undefined') {
          window.patientController.renderAmbulanceHUD();
        }
      }

      document.dispatchEvent(new CustomEvent('i18n:languageChanged', { detail: { lang } }));
      return lang;
    }

    get(key, fallback = '') {
      const langDict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY['en'];
      if (langDict && langDict[key]) return langDict[key];
      const enDict = I18N_DICTIONARY['en'];
      return (enDict && enDict[key]) ? enDict[key] : fallback || key;
    }

    translateDOM() {
      const lang = this.currentLang;
      const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY['en'];
      const enDict = I18N_DICTIONARY['en'];

      // 1. Translate all elements with data-i18n attribute (preserves original in data-i18n-orig)
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!el.dataset.i18nOrig) {
          el.dataset.i18nOrig = el.innerHTML;
        }
        if (lang === 'en') {
          el.innerHTML = enDict[key] || el.dataset.i18nOrig;
        } else {
          const translation = dict[key] || enDict[key];
          if (translation) el.innerHTML = translation;
        }
      });

      // 2. Translate placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (!el.dataset.i18nPlaceholderOrig) {
          el.dataset.i18nPlaceholderOrig = el.getAttribute('placeholder');
        }
        if (lang === 'en') {
          el.setAttribute('placeholder', enDict[key] || el.dataset.i18nPlaceholderOrig);
        } else {
          const translation = dict[key] || enDict[key];
          if (translation) el.setAttribute('placeholder', translation);
        }
      });

      // 3. Update weather ticker text
      const weatherEl = document.getElementById('weatherText');
      if (weatherEl && dict.weather_ticker) {
        weatherEl.textContent = dict.weather_ticker;
      }

      // 4. Universal deep text translation for all visible UI elements
      this.translateTextNodes(document.body, lang);
    }

    translateTextNodes(root, lang) {
      if (!root) return;

      const PHRASES = {
        hi: {
          'Care is close to your home': 'स्वास्थ्य सेवा आपके घर के पास है',
          'Start with one simple step. Your nearest Kondapalli Sub-Centre & ASHA Didi are ready to help, even when phone signal is low.': 'एक साधारण कदम से शुरुआत करें। आपका नजदीकी कोंडापल्ली उप-केंद्र व आशा दीदी फोन सिग्नल कम होने पर भी आपकी सेवा के लिए तैयार हैं।',
          'Avg Queue Wait': 'औसत कतार प्रतीक्षा',
          'Referral Ladder': 'रेफरल सीढ़ी',
          'Follow-ups Due': 'लंबित स्वास्थ्य दौरे',
          'Medicines in Stock': 'दवाइयों की उपलब्धता',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'परिवार स्वास्थ्य चक्र · सभी सदस्य',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'देखभाल यात्रा व रेफरल सीढ़ी',
          'Download ABHA Card (PDF)': 'आभा कार्ड डाउनलोड (PDF)',
          'Download e-Rx (PDF)': 'ई-पर्चा डाउनलोड (PDF)',
          '18 min': '18 मिनट',
          '2 Active': '2 सक्रिय',
          '3 Visits': '3 दौरे',
          '92%': '92% उपलब्ध',
          'Kondapalli PHC Stock Healthy': 'कोंडापल्ली स्वास्थ्य केंद्र स्टॉक पर्याप्त',
          '1 ANC Visit Overdue': '1 मातृत्व जांच लंबित',
          '1 In-transit to CHC': '1 सीएचसी की ओर अग्रसर',
          '↓ 34% faster via digital token': 'डिजिटल टोकन से 34% तेज',
          'Daily Medication Schedule & Jan Aushadhi Tracker': 'दैनिक दवा सूची व जन औषधि बचत ट्रैकर',
          'Live Hospital & Bed Capacity Near You': 'नजदीकी अस्पताल, आईसीयू व सामान्य बेड की लाइव स्थिति',
          '3D AI Symptom Self-Triage (Gemini Flash)': '3D AI लक्षण स्व-जांच व सलाह (Gemini)',
          'What is the primary symptom bothering you today?': 'आज आपको मुख्य रूप से क्या शारीरिक समस्या है?',
          'Emergency 108 SOS': 'आपातकालीन 108 एम्बुलेंस',
          'Jan Aushadhi & Stock': 'जन औषधि व दवाइयां',
          'Visual First Aid': 'प्राथमिक उपचार',
          'Admin Command Center': 'प्रशासन कमांड सेंटर',
          'Doctor Clinical Desk': 'डॉक्टर क्लिनिकल डेस्क',
          'ASHA Frontline Desk': 'आशा फ्रंटलाइन डेस्क',
          'Queue & Token': 'टोकन व कतार',
          'Health Locker (ABHA)': 'डिजिटल लॉकर (ABHA)',
          'Teleconsultation': 'टेलीकंसल्टेशन',
          'Home & Journey': 'मुख्य पृष्ठ व यात्रा',
          'Kondapalli Weather Advisory:': 'कोंडापल्ली मौसम व स्वास्थ्य सलाह:',
          'Select Emergency Condition': 'आपातकालीन स्थिति चुनें',
          'Patient Care · रोगी सेवा': 'रोगी सेवा',
          'Village Grid · ग्रामीण सेवा': 'ग्रामीण सेवा',
          'Admin Command · प्रशासन': 'प्रशासन कमांड',
          'AI Prescription Scanner & Digitizer': 'एआई पर्चा स्कैनर व डिजिटाइज़र',
          'Upload Rx Photo / PDF': 'पर्चा फोटो / PDF अपलोड करें',
          'Quick Scan Demo': 'त्वरित स्कैन डेमो'
        },
        te: {
          'Care is close to your home': 'వైద్య సంరక్షణ మీ ఇంటి సమీపంలోనే ఉంది',
          'Start with one simple step. Your nearest Kondapalli Sub-Centre & ASHA Didi are ready to help, even when phone signal is low.': 'ఒక సాధారణ అడుగుతో ప్రారంభించండి. ఫోన్ సిగ్నల్ తక్కువగా ఉన్నప్పటికీ కొండపల్లి ఉప-కేంద్రం మరియు ఆశా దీదీ సహాయం చేయడానికి సిద్ధంగా ఉన్నారు.',
          'Avg Queue Wait': 'సగటు క్యూ సమయం',
          'Referral Ladder': 'రిఫరల్ నిచ్చెన',
          'Follow-ups Due': 'రాబోయే తనిఖీలు',
          'Medicines in Stock': 'మందుల నిల్వ',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'కుటుంబ ఆరోగ్య చక్రం',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'సంరక్షణ ప్రయాణం & రిఫరల్ నిచ్చెన',
          'Download ABHA Card (PDF)': 'ఆభా కార్డు డౌన్‌లోడ్ (PDF)',
          'Download e-Rx (PDF)': 'ఈ-ప్రిస్క్రిప్షన్ డౌన్‌లోడ్ (PDF)',
          'Daily Medication Schedule & Jan Aushadhi Tracker': 'రోజువారీ మందుల షెడ్యూల్ & జన్ ఔషధి పొదుపు',
          'Live Hospital & Bed Capacity Near You': 'సమీప ఆసుపత్రులు, ఐసీయూ బెడ్ల లైవ్ వివరాలు',
          '3D AI Symptom Self-Triage (Gemini Flash)': '3D AI లక్షణాల పరీక్ష & అత్యవసర సలహా',
          'Emergency 108 SOS': 'అత్యవసర 108 SOS',
          'Jan Aushadhi & Stock': 'జన్ ఔషధి మందులు',
          'Visual First Aid': 'ప్రథమ చికిత్స',
          'Admin Command Center': 'అడ్మిన్ కమాండ్ సెంటర్',
          'Doctor Clinical Desk': 'డాక్టర్ క్లినికల్ డెస్క్',
          'ASHA Frontline Desk': 'ఆశా ఫ్రంట్‌లైన్ డెస్క్',
          'Queue & Token': 'క్యూ & టోకెన్',
          'Health Locker (ABHA)': 'ఆరోగ్య రికార్డు (ABHA)',
          'Teleconsultation': 'టెలికన్సల్టేషన్',
          'Home & Journey': 'హోమ్ & ప్రయాణం',
          'Upload Rx Photo / PDF': 'ప్రిస్క్రిప్షన్ ఫోటో అప్‌లోడ్',
          'Quick Scan Demo': 'తక్షణ స్కాన్ డెమో'
        },
        ta: {
          'Care is close to your home': 'மருத்துவ சேவை உங்கள் வீட்டின் அருகில் உள்ளது',
          'Avg Queue Wait': 'சராசரி காத்திருப்பு நேரம்',
          'Referral Ladder': 'பரிந்துரை ஏணி',
          'Follow-ups Due': 'நிலுவையில் உள்ள பரிசோதனை',
          'Medicines in Stock': 'மருந்து இருப்பு',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'குடும்ப சுகாதார வட்டம்',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'சிகிச்சை பயணம் & பரிந்துரை ஏணி',
          'Download ABHA Card (PDF)': 'ஆபா அட்டை பதிவிறக்கம் (PDF)',
          'Download e-Rx (PDF)': 'மருந்து சீட்டு பதிவிறக்கம் (PDF)',
          'Emergency 108 SOS': 'அவசர 108 SOS',
          'Jan Aushadhi & Stock': 'ஜன் ஔஷதி மருந்துகள்',
          'Home & Journey': 'முகப்பு & பயணம்'
        },
        mr: {
          'Care is close to your home': 'आरोग्य सेवा तुमच्या घराच्या जवळ आहे',
          'Avg Queue Wait': 'सरासरी रांगेतील वेळ',
          'Referral Ladder': 'रेफरल शिडी',
          'Follow-ups Due': 'प्रलंबित तपासणी',
          'Medicines in Stock': 'औषध साठा',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'कुटुंब आरोग्य चक्र',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'काळजी प्रवास आणि रेफरल शिडी',
          'Download ABHA Card (PDF)': 'आभा कार्ड डाउनलोड (PDF)',
          'Download e-Rx (PDF)': 'ई-प्रिस्क्रिप्शन डाउनलोड (PDF)',
          'Emergency 108 SOS': 'तातडीची 108 SOS',
          'Home & Journey': 'मुख्य पृष्ठ व प्रवास'
        },
        bn: {
          'Care is close to your home': 'স্বাস্থ্যসেবা আপনার বাড়ির কাছেই',
          'Avg Queue Wait': 'গড় অপেক্ষার সময়',
          'Referral Ladder': 'রেফারেল মই',
          'Follow-ups Due': 'বাকি ফলো-আপ',
          'Medicines in Stock': 'ওষুধের স্টক',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'পারিবারিক স্বাস্থ্য চক্র',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'চিকিৎসা যাত্রা ও রেফারেল মই',
          'Download ABHA Card (PDF)': 'আভা কার্ড ডাউনলোড (PDF)',
          'Download e-Rx (PDF)': 'ই-প্রেসক্রিপশন ডাউনলোড (PDF)',
          'Emergency 108 SOS': 'জরুরী 108 SOS',
          'Home & Journey': 'হোম ও চিকিৎসা'
        },
        kn: {
          'Care is close to your home': 'ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮ ಮನೆಯ ಸಮೀಪದಲ್ಲಿದೆ',
          'Avg Queue Wait': 'ಸರಾಸರಿ ಸರತಿ ಸಮಯ',
          'Referral Ladder': 'ರೆಫರಲ್ ಏಣಿ',
          'Follow-ups Due': 'ಬಾಕಿ ಇರುವ ತಪಾಸಣೆಗಳು',
          'Medicines in Stock': 'ಔಷಧಿಗಳ ಲಭ್ಯತೆ',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'ಆರೋಗ್ಯ ಪಯಣ ಮತ್ತು ರೆಫರಲ್ ಏಣಿ',
          'Download ABHA Card (PDF)': 'ಆಭಾ ಕಾರ್ಡ್ ಡೌನ್‌ಲೋಡ್ (PDF)',
          'Download e-Rx (PDF)': 'ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಡೌನ್‌ಲೋಡ್ (PDF)',
          'Emergency 108 SOS': 'ತುರ್ತು 108 SOS',
          'Home & Journey': 'ಮುಖಪುಟ & ಪ್ರಯಾಣ'
        }
      };

      const phrases = PHRASES[lang] || {};

      const filterVal = typeof NodeFilter !== "undefined" ? NodeFilter.SHOW_TEXT : 4;
      const walker = document.createTreeWalker(root, filterVal, null, false);
      let node;
      while ((node = walker.nextNode())) {
        if (node._i18nOriginalText === undefined) {
          node._i18nOriginalText = node.nodeValue;
        }

        const original = node._i18nOriginalText;
        if (!original || !original.trim()) continue;

        if (lang === 'en') {
          node.nodeValue = original;
        } else {
          let translated = original;
          for (const [enKey, targetVal] of Object.entries(phrases)) {
            if (translated.includes(enKey)) {
              translated = translated.split(enKey).join(targetVal);
            }
          }
          node.nodeValue = translated;
        }
      }
    }
  }

  // Singleton instance
  const i18n = new I18nEngine();

  // Export
  global.i18n = i18n;
  global.I18N_DICTIONARY = I18N_DICTIONARY;

  // Global helper onLanguageChange for HTML select tags
  global.onLanguageChange = function(lang) {
    i18n.setLanguage(lang);
    if (typeof window.toast === 'function') {
      const langNames = {
        en: 'English',
        hi: 'हिंदी (Hindi)',
        te: 'తెలుగు (Telugu)',
        ta: 'தமிழ் (Tamil)',
        mr: 'मराठी (Marathi)',
        bn: 'বাংলা (Bengali)',
        kn: 'ಕನ್ನಡ (Kannada)'
      };
      window.toast(`🌐 ${langNames[lang] || lang.toUpperCase()}`);
    }
  };

})(typeof window !== 'undefined' ? window : this);
