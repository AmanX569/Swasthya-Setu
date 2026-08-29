/**
 * =========================================================
 * SWASTHYA SETU - MULTILINGUAL LIVE TRANSLATION ENGINE (i18n.js)
 * 100% Comprehensive, Dynamic & Speech-Enabled Translation
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_LANG = 'swasthya_setu_lang';

  const I18N_DICTIONARY = {
    en: {
      tagline: 'Swasthya Setu · Rural Healthcare Grid',
      weather_ticker: '38°C High Heat — Drink Clean Water & ORS | 🌧️ Keep water storage covered to prevent dengue.',
      btn_theme: '🏛️ Theme',
      btn_sos: '🚨 SOS 108',
      btn_login: '🔑 Sign In',
      btn_read_aloud: '🔊 Read Aloud',

      nav_patient_care: 'Patient Care · रोगी सेवा',
      nav_village_grid: 'Village Grid · ग्रामीण सेवा',
      nav_doctor_desk: 'Clinical Desk · चिकित्सक',
      nav_asha_desk: 'ASHA Frontline · आशा',
      nav_admin_desk: 'Admin Command · प्रशासन',

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

      welcome_heading: 'Care is close to your home',
      welcome_subline: 'Start with one simple step. Your nearest Kondapalli Sub-Centre & ASHA Didi are ready to help, even when phone signal is low.',
      stat_active_sos: 'Emergency 108 Active',
      stat_followups: 'Follow-ups Due',
      stat_medicines: 'Medicines in Stock',
      family_care: 'Family Health Circle · परिवार स्वास्थ्य चक्र',
      care_ladder: 'Care Journey & Referral Ladder · देखभाल सीढ़ी',
      daily_meds_title: 'Daily Medication Schedule & Jan Aushadhi Tracker',
      live_beds_title: 'Live Hospital & Bed Capacity Near You',
      triage_title: '3D AI Symptom Self-Triage (Gemini Flash)',
      triage_question: 'What is the primary symptom bothering you today?',
      meds_title: 'Jan Aushadhi Generic Medicine Savings & Stock',
      rx_scan_title: 'AI Prescription Scanner & Digitizer',
      rx_scan_desc: 'Upload or photograph doctor prescription to extract medicines and save 80%+ with Jan Aushadhi generics.'
    },

    hi: {
      tagline: 'स्वास्थ्य सेतु · ग्रामीण स्वास्थ्य ग्रिड',
      weather_ticker: '38°C तेज गर्मी — स्वच्छ पानी और ओआरएस पिएं | 🌧️ डेंगू से बचाव हेतु पानी के बर्तन ढककर रखें।',
      btn_theme: '🏛️ थीम बदलें',
      btn_sos: '🚨 आपातकाल 108',
      btn_login: '🔑 लॉगिन करें',
      btn_read_aloud: '🔊 बोलकर सुनाएं',

      nav_patient_care: 'रोगी स्वास्थ्य सेवा',
      nav_village_grid: 'ग्रामीण स्वास्थ्य ग्रिड',
      nav_doctor_desk: 'चिकित्सक क्लिनिकल डेस्क',
      nav_asha_desk: 'आशा दीदी कार्यक्षेत्र',
      nav_admin_desk: 'प्रशासन कमांड सेंटर',

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

      welcome_heading: 'स्वास्थ्य सेवा आपके घर के पास है',
      welcome_subline: 'एक साधारण कदम से शुरुआत करें। आपका नजदीकी कोंडापल्ली उप-केंद्र व आशा दीदी फोन सिग्नल कम होने पर भी आपकी सेवा के लिए तैयार हैं।',
      stat_active_sos: 'सक्रिय 108 एम्बुलेंस',
      stat_followups: 'लंबित स्वास्थ्य दौरे',
      stat_medicines: 'दवाइयों की उपलब्धता',
      family_care: 'परिवार स्वास्थ्य चक्र · सभी सदस्य',
      care_ladder: 'देखभाल यात्रा व रेफरल सीढ़ी',
      daily_meds_title: 'दैनिक दवा सूची व जन औषधि बचत ट्रैकर',
      live_beds_title: 'नजदीकी अस्पताल व बेड उपलब्धता',
      triage_title: '3D AI लक्षण स्व-जांच व सलाह',
      triage_question: 'आज आपको मुख्य रूप से क्या समस्या है?',
      meds_title: 'जन औषधि generic दवाइयां व बचत',
      rx_scan_title: 'AI पर्चा स्कैनर व डिजिटाइज़र',
      rx_scan_desc: 'डॉक्टर का पर्चा अपलोड करें और जन औषधि से 80%+ की बचत करें।'
    },

    te: {
      tagline: 'స్వాస్థ్య సేతు · గ్రామీణ ఆరోగ్య గ్రిడ్',
      weather_ticker: '38°C తీవ్రమైన ఎండ — శుభ్రమైన నీరు మరియు ORS త్రాగండి | 🌧️ డెంగ్యూ నివారణకు నీటి నిల్వలను మూసి ఉంచండి.',
      btn_theme: '🏛️ థీమ్',
      btn_sos: '🚨 అత్యవసర 108',
      btn_login: '🔑 లాగిన్',
      btn_read_aloud: '🔊 చదివి వినిపించు',

      nav_patient_care: 'రోగి సంరక్షణ',
      nav_village_grid: 'గ్రామీణ సేవలు',
      nav_doctor_desk: 'డాక్టర్ డెస్క్',
      nav_asha_desk: 'ఆశా ఫ్రంట్‌లైన్',
      nav_admin_desk: 'అడ్మిన్ కమాండ్',

      nav_home: 'హోమ్ & ప్రయాణం',
      nav_triage: '3D లక్షణాల పరీక్ష',
      nav_appt: 'క్యూ & టోకెన్',
      nav_records: 'హెల్త్ లాకర్ (ABHA)',
      nav_sos: 'అత్యవసర 108 SOS',
      nav_meds: 'జన్ ఔషధి మందులు',
      nav_referrals: 'రిఫరల్ నిచ్చెన',
      nav_firstaid: 'ప్రథమ చికిత్స',
      nav_asha: 'ఆశా దీదీ డెస్క్',
      nav_dashboard: 'అడ్మిన్ కమాండ్ సెంటర్',

      welcome_heading: 'వైద్య సంరక్షణ మీ ఇంటి సమీపంలోనే ఉంది',
      welcome_subline: 'ఒక సాధారణ అడుగుతో ప్రారంభించండి. కొండపల్లి ఉప-కేంద్రం మరియు ఆశా దీదీ సహాయం చేయడానికి సిద్ధంగా ఉన్నారు.',
      stat_active_sos: 'సక్రియ 108 సేవ',
      stat_followups: 'రాబోయే తనిఖీలు',
      stat_medicines: 'మందుల నిల్వ',
      family_care: 'కుటుంబ ఆరోగ్య చక్రం',
      care_ladder: 'సంరక్షణ ప్రయాణం & రిఫరల్ నిచ్చెన',
      daily_meds_title: 'రోజువారీ మందుల షెడ్యూల్ & జన్ ఔషధి పొదుపు',
      live_beds_title: 'సమీప ఆసుపత్రులు & బెడ్ల లైవ్ వివరాలు',
      triage_title: '3D AI లక్షణాల పరీక్ష & అత్యవసర సలహా',
      triage_question: 'ఈ రోజు మీకు ఉన్న ప్రధాన సమస్య ఏమిటి?',
      meds_title: 'జన్ ఔషధి మందుల పొదుపు & స్టాక్',
      rx_scan_title: 'AI ప్రిస్క్రిప్షన్ స్కానర్',
      rx_scan_desc: 'ప్రిస్క్రిప్షన్ ఫోటో అప్‌లోడ్ చేసి జన్ ఔషధి ద్వారా 80%+ ఆదా చేయండి.'
    },

    ta: {
      tagline: 'சுவஸ்த்யா சேது · கிராமப்புற சுகாதார கட்டமைப்பு',
      weather_ticker: '38°C அதிக வெப்பம் — சுத்தமான நீர் அருந்தவும் | 🌧️ டெங்கு தடுப்புக்காக தண்ணீரை மூடி வைக்கவும்.',
      btn_theme: '🏛️ தீம்',
      btn_sos: '🚨 அவசர 108',
      btn_login: '🔑 உள்நுழைக',
      btn_read_aloud: '🔊 வாசித்துக் காட்டு',

      nav_patient_care: 'நோயாளி பராமரிப்பு',
      nav_village_grid: 'கிராமப்புற கட்டமைப்பு',
      nav_doctor_desk: 'மருத்துவர் மேசை',
      nav_asha_desk: 'ஆஷா பணியாளர்',
      nav_admin_desk: 'நிர்வாக மையம்',

      nav_home: 'முகப்பு & பயணம்',
      nav_triage: '3D அறிகுறி பரிசோதனை',
      nav_appt: 'வரிசை & டோக்கன்',
      nav_records: 'சுகாதார ஆவணங்கள் (ABHA)',
      nav_sos: 'அவசர 108 SOS',
      nav_meds: 'ஜன் ஔஷதி மருந்துகள்',
      nav_referrals: 'பரிந்துரை ஏணி',
      nav_firstaid: 'முதலுதவி',
      nav_asha: 'ஆஷா மேசை',
      nav_dashboard: 'நிர்வாக கட்டளை மையம்',

      welcome_heading: 'மருத்துவ சேவை உங்கள் வீட்டின் அருகில் உள்ளது',
      welcome_subline: 'ஒரு எளிய படியுடன் தொடங்குங்கள். உங்கள் அருகிலுள்ள ஆஷா பணியாளர் உதவ தயாராக உள்ளார்.',
      stat_active_sos: 'செயலில் உள்ள 108',
      stat_followups: 'நிலுவை பரிசோதனைகள்',
      stat_medicines: 'மருந்து இருப்பு',
      family_care: 'குடும்ப சுகாதார வட்டம்',
      care_ladder: 'சிகிச்சை பயணம் & பரிந்துரை ஏணி',
      daily_meds_title: 'தினசரி மருந்து அட்டவணை',
      live_beds_title: 'அருகிலுள்ள மருத்துவமனை படுக்கை நிலை',
      triage_title: '3D AI அறிகுறி பரிசோதனை',
      triage_question: 'இன்று உங்கள் முக்கிய பிரச்சனை என்ன?',
      meds_title: 'ஜன் ஔஷதி மருந்துகள் & சேமிப்பு',
      rx_scan_title: 'AI மருந்து சீட்டு ஸ்கேனர்',
      rx_scan_desc: 'மருந்து சீட்டை பதிவேற்றி 80%+ சேமிக்கவும்.'
    },

    mr: {
      tagline: 'स्वास्थ्य सेतू · ग्रामीण आरोग्य ग्रिड',
      weather_ticker: '38°C तीव्र उष्णता — स्वच्छ पाणी आणि ओआरएस प्या | 🌧️ डेंग्यूपासून संरक्षणासाठी पाणी झाकून ठेवा.',
      btn_theme: '🏛️ थीम',
      btn_sos: '🚨 आपत्कालीन 108',
      btn_login: '🔑 साइन इन',
      btn_read_aloud: '🔊 ऐका',

      nav_patient_care: 'रुग्ण सेवा',
      nav_village_grid: 'ग्रामीण सेवा',
      nav_doctor_desk: 'डॉक्टर डेस्क',
      nav_asha_desk: 'आशा सेविका',
      nav_admin_desk: 'प्रशासन कक्ष',

      nav_home: 'मुख्य पृष्ठ व प्रवास',
      nav_triage: '3D लक्षण तपासणी',
      nav_appt: 'टोकन व रांग',
      nav_records: 'आरोग्य लॉकर (ABHA)',
      nav_sos: 'आपत्कालीन 108 SOS',
      nav_meds: 'जन औषधी व साठा',
      nav_referrals: 'रेफरल शिडी',
      nav_firstaid: 'प्रथमोपचार',
      nav_asha: 'आशा डेस्क',
      nav_dashboard: 'प्रशासन कमांड सेंटर',

      welcome_heading: 'आरोग्य सेवा तुमच्या घराच्या जवळ आहे',
      welcome_subline: 'एका साध्या पावलाने सुरुवात करा. तुमचे जवळचे उप-केंद्र आणि आशा दीदी मदतीसाठी सज्ज आहेत.',
      stat_active_sos: 'सक्रिय 108 रुग्णवाहिका',
      stat_followups: 'प्रलंबित तपासणी',
      stat_medicines: 'औषध साठा',
      family_care: 'कुटुंब आरोग्य चक्र',
      care_ladder: 'काळजी प्रवास आणि रेफरल शिडी',
      daily_meds_title: 'दैनिक औषध वेळापत्रक',
      live_beds_title: 'जवळचे रुग्णालय व बेड उपलब्धता',
      triage_title: '3D AI लक्षण तपासणी',
      triage_question: 'आज तुम्हाला कोणती मुख्य समस्या आहे?',
      meds_title: 'जन औषधी औषधे व बचत',
      rx_scan_title: 'AI प्रिस्क्रिप्शन स्कॅनर',
      rx_scan_desc: 'प्रिस्क्रिप्शन अपलोड करा आणि जन औषधीद्वारे 80%+ बचत करा.'
    },

    bn: {
      tagline: 'স্বাস্থ্য সেতু · গ্রামীণ স্বাস্থ্য গ্রিড',
      weather_ticker: '38°C প্রচণ্ড গরম — বিশুদ্ধ জল এবং ওআরএস পান করুন | 🌧️ ডেঙ্গু প্রতিরোধে জল ঢেকে রাখুন।',
      btn_theme: '🏛️ থিম',
      btn_sos: '🚨 জরুরি 108',
      btn_login: '🔑 সাইন ইন',
      btn_read_aloud: '🔊 শুনে নিন',

      nav_patient_care: 'রোগী সেবা',
      nav_village_grid: 'গ্রামীণ স্বাস্থ্যসেবা',
      nav_doctor_desk: 'চিকিৎসক ডেস্ক',
      nav_asha_desk: 'আশা কর্মী ডেস্ক',
      nav_admin_desk: 'প্রশাসন কেন্দ্র',

      nav_home: 'হোম ও চিকিৎসা',
      nav_triage: '3D লক্ষণ পরীক্ষা',
      nav_appt: 'টোকেন ও সারি',
      nav_records: 'স্বাস্থ্য লকার (ABHA)',
      nav_sos: 'জরুরি 108 SOS',
      nav_meds: 'জন ঔষধি ও ওষুধ',
      nav_referrals: 'রেফারেল মই',
      nav_firstaid: 'প্রাথমিক চিকিৎসা',
      nav_asha: 'আশা দিদি ডেস্ক',
      nav_dashboard: 'প্রশাসন কমান্ড সেন্টার',

      welcome_heading: 'স্বাস্থ্যসেবা আপনার বাড়ির কাছেই',
      welcome_subline: 'একটি সহজ পদক্ষেপে শুরু করুন। নিকটস্থ স্বাস্থ্য কেন্দ্র ও আশা দিদি আপনার পাশে আছেন।',
      stat_active_sos: 'সক্রিয় 108 অ্যাম্বুলেন্স',
      stat_followups: 'বাকি ফলো-আপ',
      stat_medicines: 'ওষুধের স্টক',
      family_care: 'পারিবারিক স্বাস্থ্য চক্র',
      care_ladder: 'চিকিৎসা যাত্রা ও রেফারেল মই',
      daily_meds_title: 'দৈনিক ওষুধের সময়সূচী',
      live_beds_title: 'নিকটবর্তী হাসপাতালের বেড অবস্থা',
      triage_title: '3D AI লক্ষণ পরীক্ষা',
      triage_question: 'আজ আপনার প্রধান সমস্যা কী?',
      meds_title: 'জন ঔষধি জেনেরিক ওষুধ ও সঞ্চয়',
      rx_scan_title: 'AI প্রেসক্রিপশন স্ক্যানার',
      rx_scan_desc: 'প্রেসক্রিপশন আপলোড করে জন ঔষধি থেকে 80%+ সঞ্চয় করুন।'
    },

    kn: {
      tagline: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು · ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಜಾಲ',
      weather_ticker: '38°C ತೀವ್ರ ಶಾಖ — ಶುದ್ಧ ನೀರು ಮತ್ತು ಒಆರ್‌ಎಸ್ ಕುಡಿಯಿರಿ | 🌧️ ಡೆಂಗ್ಯೂ ತಡೆಗಟ್ಟಲು ನೀರನ್ನು ಮುಚ್ಚಿಡಿ.',
      btn_theme: '🏛️ ಥೀಮ್',
      btn_sos: '🚨 ತುರ್ತು 108',
      btn_login: '🔑 ಲಾಗಿನ್',
      btn_read_aloud: '🔊 ಓದಿ ಕೇಳಿ',

      nav_patient_care: 'ರೋಗಿ ಆರೈಕೆ',
      nav_village_grid: 'ಗ್ರಾಮೀಣ ಸೇವೆ',
      nav_doctor_desk: 'ವೈದ್ಯರ ಡೆಸ್ಕ್',
      nav_asha_desk: 'ಆಶಾ ಮುಂಚೂಣಿ',
      nav_admin_desk: 'ಆಡಳಿತ ಕೇಂದ್ರ',

      nav_home: 'ಮುಖಪುಟ & ಪ್ರಯಾಣ',
      nav_triage: '3D ಲಕ್ಷಣ ತಪಾಸಣೆ',
      nav_appt: 'ಸರತಿ & ಟೋಕನ್',
      nav_records: 'ಆರೋಗ್ಯ ಲಾಕರ್ (ABHA)',
      nav_sos: 'ತುರ್ತು 108 SOS',
      nav_meds: 'ಜನ ಔಷಧಿ ಮಳಿಗೆ',
      nav_referrals: 'ರೆಫರಲ್ ಏಣಿ',
      nav_firstaid: 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ',
      nav_asha: 'ಆಶಾ ದೀದಿ ಡೆಸ್ಕ್',
      nav_dashboard: 'ಆಡಳಿತ ಕಮಾಂಡ್ ಸೆಂಟರ್',

      welcome_heading: 'ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮ ಮನೆಯ ಸಮೀಪದಲ್ಲಿದೆ',
      welcome_subline: 'ಒಂದು ಸರಳ ಹೆಜ್ಜೆಯೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಿ. ಕೊಂಡಪಲ್ಲಿ ಉಪ-ಕೇಂದ್ರ ಮತ್ತು ಆಶಾ ದೀದಿ ಸದಾ ಸಿದ್ಧರಾಗಿದ್ದಾರೆ.',
      stat_active_sos: 'ಸಕ್ರಿಯ 108 ಸೇವೆ',
      stat_followups: 'ಬಾಕಿ ತಪಾಸಣೆಗಳು',
      stat_medicines: 'ಔಷಧಿಗಳ ಲಭ್ಯತೆ',
      family_care: 'ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ',
      care_ladder: 'ಆರೋಗ್ಯ ಪಯಣ ಮತ್ತು ರೆಫರಲ್ ಏಣಿ',
      daily_meds_title: 'ದೈನಂದಿನ ಔಷಧಿ ವೇಳಾಪಟ್ಟಿ',
      live_beds_title: 'ಸಮೀಪದ ಆಸ್ಪತ್ರೆ & ಬೆಡ್ ಲಭ್ಯತೆ',
      triage_title: '3D AI ಲಕ್ಷಣ ಪರೀಕ್ಷೆ',
      triage_question: 'ಇಂದು ನಿಮ್ಮ ಮುಖ್ಯ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಏನು?',
      meds_title: 'ಜನ ಔಷಧಿ ಉಳಿತಾಯ & ದಾಸ್ತಾನು',
      rx_scan_title: 'AI ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನರ್',
      rx_scan_desc: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಜನ ಔಷಧಿಯೊಂದಿಗೆ 80%+ ಉಳಿಸಿ.'
    }
  };

  class I18nEngine {
    constructor() {
      this.currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'en';
      this.dict = I18N_DICTIONARY;
    }

    init() {
      this.setLanguage(this.currentLang);
      this.observeDOM();
    }

    get(key, fallback = '') {
      const langDict = this.dict[this.currentLang] || this.dict.en;
      return langDict[key] || this.dict.en[key] || fallback || key;
    }

    setLanguage(lang) {
      if (!this.dict[lang]) lang = 'en';
      this.currentLang = lang;
      localStorage.setItem(STORAGE_KEY_LANG, lang);

      // Sync select dropdowns
      document.querySelectorAll('#langSelect, .lang-select').forEach(sel => {
        sel.value = lang;
      });

      this.applyTranslations(lang);
    }

    applyTranslations(lang) {
      const dict = this.dict[lang] || this.dict.en;

      // 1. Data-i18n element translation
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
          el.textContent = dict[key];
        }
      });

      // 2. Data-i18n-placeholder translation
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
          el.setAttribute('placeholder', dict[key]);
        }
      });

      // 3. Update weather ticker
      const weatherEl = document.getElementById('weatherText');
      if (weatherEl && dict.weather_ticker) {
        weatherEl.textContent = dict.weather_ticker;
      }

      // 4. Deep text translation
      this.translateTextNodes(document.body, lang);
    }

    translateTextNodes(root, lang) {
      if (!root) return;

      const PHRASES = {
        hi: {
          'Care is close to your home': 'स्वास्थ्य सेवा आपके घर के पास है',
          'Emergency 108 Active': 'सक्रिय 108 एम्बुलेंस',
          'Follow-ups Due': 'लंबित स्वास्थ्य दौरे',
          'Medicines in Stock': 'दवाइयों की उपलब्धता',
          'Avg Queue Wait': 'औसत कतार प्रतीक्षा',
          'Referral Ladder': 'रेफरल सीढ़ी',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'परिवार स्वास्थ्य चक्र · सभी सदस्य',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'देखभाल यात्रा व रेफरल सीढ़ी',
          'Download ABHA Card (PDF)': 'आभा कार्ड डाउनलोड (PDF)',
          'Download e-Rx (PDF)': 'ई-पर्चा डाउनलोड (PDF)',
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
          'Upload Rx Photo / PDF': 'पर्चा फोटो / PDF अपलोड करें',
          'Quick Scan Demo': 'त्वरित स्कैन डेमो'
        },
        te: {
          'Care is close to your home': 'వైద్య సంరక్షణ మీ ఇంటి సమీపంలోనే ఉంది',
          'Emergency 108 Active': 'సక్రియ 108 సేవ',
          'Follow-ups Due': 'రాబోయే తనిఖీలు',
          'Medicines in Stock': 'మందుల నిల్వ',
          'Avg Queue Wait': 'సగటు క్యూ సమయం',
          'Referral Ladder': 'రిఫరల్ నిచ్చెన',
          'Family Health Circle · परिवार स्वास्थ्य चक्र': 'కుటుంబ ఆరోగ్య చక్రం',
          'Care Journey & Referral Ladder · देखभाल सीढ़ी': 'సంరక్షణ ప్రయాణం & రిఫరల్ నిచ్చెన',
          'Download ABHA Card (PDF)': 'ఆభా కార్డు డౌన్‌లోడ్ (PDF)',
          'Download e-Rx (PDF)': 'ఈ-ప్రిస్క్రిప్షన్ డౌన్‌లోడ్ (PDF)',
          'Daily Medication Schedule & Jan Aushadhi Tracker': 'రోజువారీ మందుల షెడ్యూల్ & జన్ ఔషధి పొదుపు',
          'Live Hospital & Bed Capacity Near You': 'సమీప ఆసుపత్రులు, ఐసీయూ బెడ్ల లైవ్ వివరాలు',
          'Emergency 108 SOS': 'అత్యవసర 108 SOS',
          'Jan Aushadhi & Stock': 'జన్ ఔషధి మందులు',
          'Visual First Aid': 'ప్రథమ చికిత్స',
          'Admin Command Center': 'అడ్మిన్ కమాండ్ సెంటర్',
          'Doctor Clinical Desk': 'డాక్టర్ క్లినికల్ డెస్క్',
          'ASHA Frontline Desk': 'ఆశా ఫ్రంట్‌లైన్ డెస్క్',
          'Queue & Token': 'క్యూ & టోకెన్',
          'Health Locker (ABHA)': 'ఆరోగ్య రికಾರ್డు (ABHA)',
          'Home & Journey': 'హోమ్ & ప్రయాణం'
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
        if (node.parentElement && (node.parentElement.tagName === 'SCRIPT' || node.parentElement.tagName === 'STYLE')) {
          continue;
        }

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

    observeDOM() {
      if (typeof MutationObserver === 'undefined') return;
      const observer = new MutationObserver((mutations) => {
        if (this.currentLang !== 'en') {
          for (const m of mutations) {
            for (const node of m.addedNodes) {
              if (node.nodeType === 1) {
                this.translateTextNodes(node, this.currentLang);
              }
            }
          }
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  // Voice speech synthesis helper
  global.speakText = function(text) {
    if (!('speechSynthesis' in window)) {
      if (typeof window.toast === 'function') window.toast('Speech synthesis is not supported on this device.');
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
    utter.rate = 0.95;
    utter.pitch = 1.0;

    window.speechSynthesis.speak(utter);
    if (typeof window.toast === 'function') {
      window.toast('🔊 ' + text.slice(0, 45) + '...');
    }
  };

  // Singleton instance
  const i18n = new I18nEngine();
  global.i18n = i18n;
  global.I18N_DICTIONARY = I18N_DICTIONARY;

  // Global onLanguageChange handler
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

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
  } else {
    i18n.init();
  }

})(typeof window !== 'undefined' ? window : this);
