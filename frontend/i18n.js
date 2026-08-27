/**
 * =========================================================
 * SWASTHYA SETU - MULTILINGUAL TRANSLATION ENGINE (i18n.js)
 * High-precision translation for 7 Indian regional languages
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
      nav_patient_care: 'Patient Care',
      nav_village_grid: 'Village Grid',
      nav_doctor_desk: 'Clinical Desk',
      nav_asha_desk: 'ASHA Frontline',
      nav_admin_desk: 'Admin Command',

      // Patient Navigation
      nav_home: 'Home & Journey',
      nav_triage: '3D Symptom Check',
      nav_appt: 'Queue & Token',
      nav_records: 'Health Locker (ABHA)',
      nav_sos: 'Emergency 108 SOS',
      nav_meds: 'Jan Aushadhi & Stock',
      nav_referrals: 'Referral Ladder',
      nav_firstaid: 'Visual First Aid',

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
      welcome_heading: 'Village Health Reassurance & Care Ladder',
      welcome_subline: 'Your health records are synchronized across Kondapalli Sub-Centre, PHC, and District Hospital.',
      stat_active_sos: 'Emergency 108 Active',
      stat_followups: 'Follow-ups Due',
      stat_medicines: 'Medicines in Stock',
      family_care: 'Family Health Circle',
      care_ladder: 'Care Journey & Referral Ladder',
      daily_meds_title: 'Daily Medication Schedule & Jan Aushadhi Tracker',
      live_beds_title: 'Live Hospital & Bed Capacity Near You',

      // Triage View
      triage_title: '3D AI Symptom Self-Triage (Gemini Flash)',
      triage_question: 'What is the primary symptom bothering you today?',
      triage_guidance: 'Select a symptom or tap any body hotspot above for instant Red/Yellow/Green safety triage and pre-hospital first aid.',

      // Medicines View
      meds_title: 'Jan Aushadhi Generic Medicine Savings & Calculator',
      rx_scan_title: 'AI Prescription Scanner (Gemini Multimodal OCR)',
      rx_scan_desc: 'Upload or scan handwritten doctor prescription to extract medicines and save 80%+ with Jan Aushadhi generics.'
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
      nav_home: 'मुख्य पृष्ठ व देखभाल',
      nav_triage: '3D लक्षण जांच (AI)',
      nav_appt: 'टोकन व कतार',
      nav_records: 'डिजिटल स्वास्थ्य लॉकर (ABHA)',
      nav_sos: 'आपातकालीन 108 एम्बुलेंस',
      nav_meds: 'जन औषधि व दवाइयां',
      nav_referrals: 'रेफ़रल सीढ़ी',
      nav_firstaid: 'प्राथमिक उपचार निर्देश',

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
      welcome_heading: 'ग्रामीण स्वास्थ्य देखभाल व रेफरल यात्रा',
      welcome_subline: 'आपका स्वास्थ्य रिकॉर्ड उप-केंद्र, प्राथमिक स्वास्थ्य केंद्र व जिला अस्पताल में सुरक्षित रूप से साझा है।',
      stat_active_sos: 'सक्रिय 108 एम्बुलेंस',
      stat_followups: 'लंबित जांच व दौरे',
      stat_medicines: 'दवाओं की उपलब्धता',
      family_care: 'परिवार स्वास्थ्य चक्र',
      care_ladder: 'देखभाल यात्रा व रेफरल सीढ़ी',
      daily_meds_title: 'दैनिक दवा सूची व जन औषधि बचत ट्रैकर',
      live_beds_title: 'नजदीकी अस्पताल, आईसीयू व सामान्य बेड की लाइव स्थिति',

      // Triage View
      triage_title: '3D AI लक्षण जांच व सुरक्षा सलाह (Gemini)',
      triage_question: 'आज आपको मुख्य रूप से क्या शारीरिक समस्या है?',
      triage_guidance: 'तुरंत लाल/पीला/हरा जोखिम मूल्यांकन और प्राथमिक उपचार प्राप्त करने हेतु लक्षण चुनें।',

      // Medicines View
      meds_title: 'जन औषधि जेनेरिक दवाएं व बचत कैलकुलेटर',
      rx_scan_title: 'एआई पर्चा स्कैनर (Gemini OCR)',
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

      welcome_heading: 'గ్రామీణ ఆరోగ్య సంరక్షణ & రిఫరల్ నెట్‌వర్క్',
      welcome_subline: 'మీ ఆరోగ్య రికార్డులు కొండపల్లి ఉప-కేంద్రం, ప్రాథమిక ఆరోగ్య కేంద్రం మరియు జిల్లా ఆసుపత్రితో సమన్వయం చేయబడ్డాయి.',
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
      rx_scan_title: 'AI ప్రిస్క్రిప్షన్ స్కానర్',
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

      nav_doc_overview: 'மருத்துவர் மருத்துவ டெஸ்க்',
      nav_doc_queue: 'நேரடி நோயாளி வரிசை',
      nav_doc_video: 'வீடியோ ஆலோசனைக் கூடம்',
      nav_doc_emr: 'முந்தைய மருத்துவக் குறிப்புகள்',
      nav_doc_rx: 'ஸ்மார்ட் மின்-மருந்துச்சீட்டு',
      nav_doc_emergency: 'தீவிர சிகிச்சைப் பிரிவு முன்பதிவு',

      nav_worker_overview: 'ஆஷா களப்பணி டெஸ்க்',
      nav_worker_anc: 'கர்ப்பிணிப் பெண்கள் கண்காணிப்பு (ANC)',
      nav_worker_uip: 'குழந்தைகள் தடுப்பூசி (UIP)',
      nav_worker_visits: 'தினசரி இல்லப் பார்வைகள்',
      nav_worker_vitals: 'உடல்நல அளவீடுகள் பதிவு',
      nav_worker_sync: 'ஆஃப்லைன் ஒத்திசைவு',

      nav_admin_overview: 'நிர்வாக கட்டளை மையம்',
      nav_admin_staff: 'பணியாளர்கள் விவரம்',
      nav_admin_approvals: 'மருத்துவர் சான்றிதழ் அனுமதி',
      nav_admin_heatmap: 'நோய் பரவல் வரைபடம்',
      nav_admin_supply: 'மருந்து இருப்பு நிலை',
      nav_admin_beds: 'மருத்துவமனை படுக்கைகள் & இரத்த வங்கி',

      welcome_heading: 'கிராமப்புற சுகாதாரப் பராமரிப்பு & பரிந்துரை கட்டமைப்பு',
      welcome_subline: 'உங்கள் சுகாதாரப் பதிவுகள் ஆரம்ப சுகாதார நிலையம் மற்றும் மாவட்ட மருத்துவமனையுடன் இணைக்கப்பட்டுள்ளன.',
      stat_active_sos: 'செயலில் உள்ள 108 ஆம்புலன்ஸ்',
      stat_followups: 'நிலுவையில் உள்ள பரிசோதனைகள்',
      stat_medicines: 'மருந்துகள் இருப்பு',
      family_care: 'குடும்ப சுகாதார வட்டம்',
      care_ladder: 'பராமரிப்புப் பயணம் & பரிந்துரை ஏணி',
      daily_meds_title: 'தினசரி மருந்து அட்டவணை & ஜன் ஔஷதி சேமிப்பு',
      live_beds_title: 'அருகிலுள்ள மருத்துவமனை படுக்கைகள் நேரடி நிலை',

      triage_title: '3D AI அறிகுறிகள் பகுப்பாய்வு & அவசர வழிகாட்டல்',
      triage_question: 'இன்று உங்களுக்கு உள்ள முதன்மையான உடல்நலக் குறைபாடு என்ன?',
      triage_guidance: 'உடனடி சிவப்பு/மஞ்சள்/பச்சை பாதுகாப்பு வழிகாட்டலுக்கு அறிகுறிகளைத் தேர்ந்தெடுக்கவும்.',

      meds_title: 'ஜன் ஔஷதி ஜெனரிக் மருந்துகள் & சேமிப்புக் கணக்கீடு',
      rx_scan_title: 'AI மருந்துச்சீட்டு ஸ்கேனர்',
      rx_scan_desc: 'மருத்துவரின் மருந்துச் சீட்டை ஸ்கேன் செய்து 80% வரை பணத்தை சேமிக்கவும்.'
    },

    mr: {
      tagline: 'स्वास्थ्य सेतू · ग्रामीण आरोग्य ग्रिड',
      top_title: 'नमस्ते, अनिता जी',
      top_eyebrow: 'आंध्र प्रदेश · कोंडापल्ली आरोग्य क्षेत्र',
      weather_ticker: '38°C कडक ऊन — स्वच्छ पाणी व ओआरएस प्या | 🌧️ डेंग्यू टाळण्यासाठी पाण्याची भांडी झाकून ठेवा.',
      btn_theme: '🌙 थीम',
      btn_sos: '🚨 आपत्कालीन 108',
      btn_login: '🔑 लॉगिन',
      btn_read_aloud: '🔊 ऐका',

      nav_patient_care: 'रुग्ण सेवा',
      nav_village_grid: 'ग्रामीण ग्रिड',
      nav_doctor_desk: 'डॉक्टर क्लिनिकल डेस्क',
      nav_asha_desk: 'आशा दीदी डेस्क',
      nav_admin_desk: 'प्रशासन केंद्र',

      nav_home: 'मुख्य पान व प्रवास',
      nav_triage: '3D लक्षण तपासणी',
      nav_appt: 'टोकन व रांग',
      nav_records: 'डिजिटल आरोग्य लॉकर (ABHA)',
      nav_sos: 'आपत्कालीन 108 SOS',
      nav_meds: 'जन औषधी व औषधे',
      nav_referrals: 'रेफरल शिडी',
      nav_firstaid: 'प्रथमोपचार मार्गदर्शक',

      nav_doc_overview: 'डॉक्टर क्लिनिकल डेस्क',
      nav_doc_queue: 'थेट रुग्ण रांग',
      nav_doc_video: 'टेलिकन्सल्टेशन व्हिडिओ',
      nav_doc_emr: 'आरोग्य नोंदी व व्हायटल्स',
      nav_doc_rx: 'स्मार्ट ई-प्रिस्क्रिप्शन',
      nav_doc_emergency: 'आयसीयू बेड आरक्षण',

      nav_worker_overview: 'आशा फ्रंटलाइन डेस्क',
      nav_worker_anc: 'उच्च जोखीम मातृत्व (ANC)',
      nav_worker_uip: 'बाल लसीकरण (UIP)',
      nav_worker_visits: 'दैनिक घरभेटी',
      nav_worker_vitals: 'व्हायटल्स नोंदणी',
      nav_worker_sync: 'ऑफलाईन सिंक',

      nav_admin_overview: 'प्रशासन कमांड सेंटर',
      nav_admin_staff: 'आरोग्य कर्मचारी सूची',
      nav_admin_approvals: 'डॉक्टर परवाना पडताळणी',
      nav_admin_heatmap: 'साथरोग उद्रेक नकाशा',
      nav_admin_supply: 'औषध साठा स्थिती',
      nav_admin_beds: 'रुग्णालय बेड्स व रक्तपेढी',

      welcome_heading: 'ग्रामीण आरोग्य सेवा व रेफरल प्रवास',
      welcome_subline: 'तुमच्या आरोग्याच्या नोंदी प्राथमिक आरोग्य केंद्र आणि जिल्हा रुग्णालयाशी सुरक्षितपणे जोडलेल्या आहेत.',
      stat_active_sos: 'सक्रिय 108 रुग्णवाहिका',
      stat_followups: 'प्रलंबित तपासण्या',
      stat_medicines: 'औषध साठा',
      family_care: 'कुटुंब आरोग्य चक्र',
      care_ladder: 'आरोग्य प्रवास व रेफरल शिडी',
      daily_meds_title: 'दैनिक औषध वेळापत्रक व जन औषधी बचत',
      live_beds_title: 'जवळचे रुग्णालय, आयसीयू व सामान्य बेड्सची सद्यस्थिती',

      triage_title: '3D AI लक्षण तपासणी व आपत्कालीन सल्ला',
      triage_question: 'आज तुम्हाला कोणती मुख्य शारीरिक समस्या जाणवत आहे?',
      triage_guidance: 'लाल/पिवळा/हिरवा धोका मूल्यांकन आणि प्रथमोपचारासाठी लक्षण निवडा.',

      meds_title: 'जन औषधी जेनेरिक औषधे व बचत गणक',
      rx_scan_title: 'AI प्रिस्क्रिप्शन स्कॅनर',
      rx_scan_desc: 'डॉक्टरांची चिठ्ठी स्कॅन करा आणि जन औषधी जेनेरिक औषधांवर 80% पेक्षा जास्त बचत मिळवा.'
    },

    bn: {
      tagline: 'স্বাস্থ্য সেতু · গ্রামীণ স্বাস্থ্য গ্রিড',
      top_title: 'নমস্কার, অনিতা দেবী',
      top_eyebrow: 'অন্ধ্রপ্রদেশ · কোন্ডাপল্লী স্বাস্থ্য খাত',
      weather_ticker: '38°C তীব্র গরম — পরিষ্কার জল এবং ওআরএস পান করুন | 🌧️ ডেঙ্গু প্রতিরোধে জলের পাত্র ঢেকে রাখুন।',
      btn_theme: '🌙 থিম',
      btn_sos: '🚨 জরুরি ১০৮',
      btn_login: '🔑 লগইন',
      btn_read_aloud: '🔊 শুনে নিন',

      nav_patient_care: 'রোগী সেবা',
      nav_village_grid: 'গ্রামীণ স্বাস্থ্য গ্রিড',
      nav_doctor_desk: 'ডাক্তার ক্লিনিকাল ডেস্ক',
      nav_asha_desk: 'আশা দিদি ডেস্ক',
      nav_admin_desk: 'প্রশাসন কমান্ড',

      nav_home: 'মূল পাতা ও যত্ন',
      nav_triage: '3D লক্ষণ পরীক্ষা (AI)',
      nav_appt: 'টোকেন ও সারি',
      nav_records: 'স্বাস্থ্য লকার (ABHA)',
      nav_sos: 'জরুরি ১০৮ অ্যাম্বুলেন্স',
      nav_meds: 'জন ঔষধি ও ওষুধ',
      nav_referrals: 'রেফারেল সিঁড়ি',
      nav_firstaid: 'প্রাথমিক চিকিৎসা',

      nav_doc_overview: 'ডাক্তার ক্লিনিকাল ডেস্ক',
      nav_doc_queue: 'সরাসরি রোগী সারি',
      nav_doc_video: 'টেলিকনসাল্টেশন ভিডিও',
      nav_doc_emr: 'স্বাস্থ্য রেকর্ড ও ভাইটালস',
      nav_doc_rx: 'স্মার্ট ই-প্রেসক্রিপশন',
      nav_doc_emergency: 'আইসিইউ বেড বুকিং',

      nav_worker_overview: 'আশা ফ্রন্টলাইন ডেস্ক',
      nav_worker_anc: 'উচ্চ ঝুঁকিপূর্ণ মাতৃত্ব (ANC)',
      nav_worker_uip: 'শিশু টিকাদান (UIP)',
      nav_worker_visits: 'দৈনিক গৃহ পরিদর্শন',
      nav_worker_vitals: 'ভাইটালস এন্ট্রি',
      nav_worker_sync: 'অফলাইন সিঙ্ক',

      nav_admin_overview: 'প্রশাসন কমান্ড সেন্টার',
      nav_admin_staff: 'স্বাস্থ্যকর্মী তালিকা',
      nav_admin_approvals: 'ডাক্তার লাইসেন্স অনুমোদন',
      nav_admin_heatmap: 'সংক্রামক রোগ হটস্পট ম্যাপ',
      nav_admin_supply: 'ওষুধের মজুদ অবস্থা',
      nav_admin_beds: 'হাসপাতাল বেড ও ব্লাড ব্যাংক',

      welcome_heading: 'গ্রামীণ স্বাস্থ্যসেবা ও রেফারেল ব্যবস্থা',
      welcome_subline: 'আপনার স্বাস্থ্য রেকর্ড প্রাথমিক স্বাস্থ্যকেন্দ্র ও জেলা হাসপাতালের সাথে নিরাপদে সমন্বিত।',
      stat_active_sos: 'সক্রিয় ১০৮ অ্যাম্বুলেন্স',
      stat_followups: 'বাকি থাকা স্বাস্থ্য পরীক্ষা',
      stat_medicines: 'ওষুধের মজুদ',
      family_care: 'পরিবার স্বাস্থ্য চক্র',
      care_ladder: 'স্বাস্থ্য যাত্রা ও রেফারেল সিঁড়ি',
      daily_meds_title: 'দৈনিক ওষুধের তালিকা ও জন ঔষধি সঞ্চয়',
      live_beds_title: 'নিকটবর্তী হাসপাতাল, আইসিইউ ও সাধারণ বেডের লাইভ অবস্থা',

      triage_title: '3D AI লক্ষণ পরীক্ষা ও জরুরি নির্দেশনা',
      triage_question: 'আজ আপনার প্রধান শারীরিক সমস্যা কী?',
      triage_guidance: 'ঝুঁকি মূল্যায়ন এবং প্রাথমিক চিকিৎসার জন্য উপযুক্ত লক্ষণটি বেছে নিন।',

      meds_title: 'জন ঔষধি জেনেরিক ওষুধ ও সঞ্চয় ক্যালকুলেটর',
      rx_scan_title: 'এআই প্রেসক্রিপশন স্ক্যানার',
      rx_scan_desc: 'প্রেসক্রিপশন স্ক্যান করে জন ঔষধি জেনেরিক ওষুধের মাধ্যমে ৮০% পর্যন্ত অর্থ সাশ্রয় করুন।'
    },

    kn: {
      tagline: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು · ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ನೆಟ್‌ವರ್ಕ್',
      top_title: 'ನಮಸ್ಕಾರ, ಅನಿತಾ',
      top_eyebrow: 'ಆಂಧ್ರಪ್ರದೇಶ · ಕೊಂಡಪಲ್ಲಿ ಆರೋಗ್ಯ ವಲಯ',
      weather_ticker: '38°C ತೀವ್ರ ಬಿಸಿಲು — ಶುದ್ಧ ನೀರು ಮತ್ತು ಓಆರ್‌ಎಸ್ ಕುಡಿಯಿರಿ | 🌧️ ಡೆಂಗ್ಯೂ ತಡೆಗಟ್ಟಲು ನೀರನ್ನು ಮುಚ್ಚಿಡಿ.',
      btn_theme: '🌙 ಥೀಮ್',
      btn_sos: '🚨 ತುರ್ತು 108',
      btn_login: '🔑 ಲಾಗಿನ್',
      btn_read_aloud: '🔊 ಓದಿ ಕೇಳಿ',

      nav_patient_care: 'ರೋಗಿ ಆರೈಕೆ',
      nav_village_grid: 'ಗ್ರಾಮೀಣ ನೆಟ್‌ವರ್ಕ್',
      nav_doctor_desk: 'ವೈದ್ಯರ ಕ್ಲಿನಿಕಲ್ ಡೆಸ್ಕ್',
      nav_asha_desk: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆ ಡೆಸ್ಕ್',
      nav_admin_desk: 'ಆಡಳಿತ ಕೇಂದ್ರ',

      nav_home: 'ಮುಖಪುಟ & ಪ್ರಯಾಣ',
      nav_triage: '3D ಲಕ್ಷಣಗಳ ತಪಾಸಣೆ',
      nav_appt: 'ಟೋಕನ್ & ಸರತಿ ಸಾಲು',
      nav_records: 'ಆರೋಗ್ಯ ದಾಖಲೆ (ABHA)',
      nav_sos: 'ತುರ್ತು 108 ಆಂಬ್ಯುಲೆನ್ಸ್',
      nav_meds: 'ಜನ ಔಷಧಿ & ಔಷಧಿಗಳು',
      nav_referrals: 'ರೆಫರಲ್ ಏಣಿ',
      nav_firstaid: 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ',

      nav_doc_overview: 'ವೈದ್ಯರ ಕ್ಲಿನಿಕಲ್ ಡೆಸ್ಕ್',
      nav_doc_queue: 'ಲೈವ್ ರೋಗಿಗಳ ಸಾಲು',
      nav_doc_video: 'ಟೆಲಿಕನ್ಸಲ್ಟೇಶನ್ ವಿಡಿಯೋ',
      nav_doc_emr: 'ಆರೋಗ್ಯ ದಾಖಲೆಗಳು & ವೈಟಲ್ಸ್',
      nav_doc_rx: 'ಸ್ಮಾರ್ಟ್ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್',
      nav_doc_emergency: 'ಐಸಿಯು ಬೆಡ್ ಕಾಯ್ದಿರಿಸುವಿಕೆ',

      nav_worker_overview: 'ಆಶಾ ಫ್ರಂಟ್‌ಲೈನ್ ಡೆಸ್ಕ್',
      nav_worker_anc: 'ಗರ್ಭಿಣಿಯರ ಆರೈಕೆ (ANC)',
      nav_worker_uip: 'ಮಕ್ಕಳ ಲಸಿಕೆ (UIP)',
      nav_worker_visits: 'ದೈನಂದಿನ ಮನೆ ಭೇಟಿ',
      nav_worker_vitals: 'ವೈಟಲ್ಸ್ ದಾಖಲಾತಿ',
      nav_worker_sync: 'ಆಫ್‌ಲೈನ್ ಸಿಂಕ್',

      nav_admin_overview: 'ಆಡಳಿತ ಕಮಾಂಡ್ ಸೆಂಟರ್',
      nav_admin_staff: 'ಆರೋಗ್ಯ ಸಿಬ್ಬಂದಿ ಪಟ್ಟಿ',
      nav_admin_approvals: 'ವೈದ್ಯರ ಪರವಾನಗಿ ಪರಿಶೀಲನೆ',
      nav_admin_heatmap: 'ಸಾಂಕ್ರಾಮಿಕ ರೋಗ ಹರಡುವಿಕೆ ನಕ್ಷೆ',
      nav_admin_supply: 'ಔಷಧಿ ದಾಸ್ತಾನು ಸ್ಥಿತಿ',
      nav_admin_beds: 'ಆಸ್ಪತ್ರೆ ಬೆಡ್ಡುಗಳು & ರಕ್ತ ನಿಧಿ',

      welcome_heading: 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಆರೈಕೆ & ರೆಫರಲ್ ವ್ಯವಸ್ಥೆ',
      welcome_subline: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ ಮತ್ತು ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಯೊಂದಿಗೆ ಸುರಕ್ಷಿತವಾಗಿ ಜೋಡಿಸಲಾಗಿದೆ.',
      stat_active_sos: 'ಸಕ್ರಿಯ 108 ಆಂಬ್ಯುಲೆನ್ಸ್',
      stat_followups: 'ಬಾಕಿ ಇರುವ ತಪಾಸಣೆಗಳು',
      stat_medicines: 'ಔಷಧಿ ಲಭ್ಯತೆ',
      family_care: 'ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ',
      care_ladder: 'ಆರೋಗ್ಯ ಪ್ರಯಾಣ & ರೆಫರಲ್ ಏಣಿ',
      daily_meds_title: 'ದೈನಂದಿನ ಔಷಧಿ ವೇಳಾಪಟ್ಟಿ & ಜನ ಔಷಧಿ ಉಳಿತಾಯ',
      live_beds_title: 'ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ, ಐಸಿಯು ಮತ್ತು ಸಾಮಾನ್ಯ ಬೆಡ್ಡುಗಳ ಲೈವ್ ಸ್ಥಿತಿ',

      triage_title: '3D AI ಲಕ್ಷಣ ತಪಾಸಣೆ & ತುರ್ತು ಮಾರ್ಗದರ್ಶನ',
      triage_question: 'ಇಂದು ನಿಮಗೆ ಇರುವ ಮುಖ್ಯ ಆರೋಗ್ಯ ಸಮಸ್ಯೆ ಏನು?',
      triage_guidance: 'ತುರ್ತು ಸುರಕ್ಷತಾ ಸಲಹೆ ಮತ್ತು ಪ್ರಥಮ ಚಿಕಿತ್ಸೆಗಾಗಿ ಲಕ್ಷಣವನ್ನು ಆಯ್ಕೆಮಾಡಿ.',

      meds_title: 'ಜನ ಔಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು & ಉಳಿತಾಯ ಲೆಕ್ಕಾಚಾರ',
      rx_scan_title: 'AI ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನರ್',
      rx_scan_desc: 'ವೈದ್ಯರ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಜನ ಔಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿಗಳೊಂದಿಗೆ 80% ಕ್ಕಿಂತ ಹೆಚ್ಚು ಉಳಿಸಿ.'
    }
  };

  class I18nEngine {
    constructor() {
      this.currentLang = this.getSavedLanguage();
    }

    getSavedLanguage() {
      try {
        return localStorage.getItem(STORAGE_KEY_LANG) || 'hi';
      } catch (e) {
        return 'hi';
      }
    }

    setLanguage(lang) {
      if (!I18N_DICTIONARY[lang]) {
        console.warn(`Language '${lang}' not found, falling back to 'en'`);
        lang = 'en';
      }
      this.currentLang = lang;
      try {
        localStorage.setItem(STORAGE_KEY_LANG, lang);
      } catch (e) {
        console.error('Error saving language:', e);
      }

      this.translateDOM();
      
      // Update header dropdown selection if it exists
      const langSelect = document.getElementById('headerLangSelect');
      if (langSelect && langSelect.value !== lang) {
        langSelect.value = lang;
      }

      // Notify other modules / trigger re-render if needed
      document.dispatchEvent(new CustomEvent('i18n:languageChanged', { detail: { lang } }));
      return lang;
    }

    get(key, fallback = '') {
      const langDict = I18N_DICTIONARY[this.currentLang] || I18N_DICTIONARY['en'];
      if (langDict && langDict[key]) {
        return langDict[key];
      }
      const enDict = I18N_DICTIONARY['en'];
      return (enDict && enDict[key]) ? enDict[key] : fallback || key;
    }

    translateDOM() {
      const lang = this.currentLang;
      const dict = I18N_DICTIONARY[lang] || I18N_DICTIONARY['en'];
      const enDict = I18N_DICTIONARY['en'];

      // 1. Translate all elements with data-i18n attribute
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = dict[key] || enDict[key];
        if (translation) {
          el.innerHTML = translation;
        }
      });

      // 2. Translate placeholders
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translation = dict[key] || enDict[key];
        if (translation) {
          el.setAttribute('placeholder', translation);
        }
      });

      // 3. Update weather ticker text
      const weatherEl = document.getElementById('weatherText');
      if (weatherEl && dict.weather_ticker) {
        weatherEl.textContent = dict.weather_ticker;
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
      window.toast(`🌐 Language changed to ${langNames[lang] || lang.toUpperCase()}`);
    }
  };

})(typeof window !== 'undefined' ? window : this);
