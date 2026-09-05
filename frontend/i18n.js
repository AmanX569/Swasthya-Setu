/**
 * =========================================================
 * SWASTHYA SETU - COMPLETE MULTILINGUAL TRANSLATION ENGINE (i18n.js)
 * 100% Pure Vernacular Translation for All UI, Portal Gateway & Medicines
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_LANG = 'swasthya_setu_lang';

  const I18N_DICTIONARY = {
    en: {
      consult_modal_title: 'Consultation & e-Prescription',
      consulting_label: 'Consulting',
      complaint_label: 'Chief Complaint',
      vitals_label: 'Vitals',
      years_short: 'Yrs',
      label_diagnosis: 'Clinical Diagnosis',
      label_primary_med: 'Primary Generic Medicine',
      label_secondary_med: 'Secondary Medicine',
      label_advice: 'Doctor Advice & Instructions',
      btn_generate_rx: '✓ Generate e-Rx',
      btn_cancel: 'Cancel',
      default_diagnosis_fever: 'Acute Viral Fever',
      default_advice_fever: 'Drink plenty of clean boiled water. Rest well.',
      opt_para: 'Paracetamol 650mg Tab (₹8 vs ₹34 Dolo)',
      opt_amox: 'Amoxicillin 500mg Cap (₹28 vs ₹110)',
      opt_met: 'Metformin 500mg Tab (₹12 vs ₹58)',
      opt_amlo: 'Amlodipine 5mg Tab (₹6 vs ₹38)',
      opt_ors: 'ORS Sachet Powder (₹5 vs ₹24)',
      opt_cetz: 'Cetirizine 10mg Tab (₹4 vs ₹22)',
      opt_vitc: 'Vitamin C + Zinc Tab (₹15 vs ₹75)',
      opt_ifa: 'Iron & Folic Acid Tab (₹4 vs ₹32)',
      btn_read_aloud: 'Read Aloud',
      btn_stop_audio: 'Stop Voice',
      no_patients_queue: 'No patients waiting in queue. Tap "+ Add Patient" above.',
      age_label: 'Age',
      btn_consult_prescribe: 'Consult & Prescribe',
      no_rx_history: 'No recent prescriptions generated yet.',
      doctor_label: 'Doctor',
      rx_digital_verified: 'Verified e-Rx',
      rx_diagnosis: 'Clinical Diagnosis',
      rx_medicines: 'Prescribed Generic Medicines',
      rx_advice: 'Doctor Advice',
      btn_print_rx: 'Print Rx',
      app_title: 'Swasthya Setu',
      app_tagline: 'Rural Healthcare Grid',
      portal_welcome: 'Welcome to Swasthya Setu',
      portal_subline: 'Select your respected portal below for dedicated healthcare access:',
      login_patient_title: 'Citizen / Patient Portal',
      login_patient_desc: 'Digital ABHA Card, 108 Emergency SOS, Jan Aushadhi generic medicines, symptom triage & family health.',
      login_doctor_title: 'Doctor Clinical Portal',
      login_doctor_desc: 'Teleconsultation OPD queue, diagnostic vitals review & instant electronic prescriptions.',
      login_worker_title: 'ASHA Frontline Portal',
      login_worker_desc: 'Maternal ANC register, child universal immunization (UIP) & daily village home visits.',
      login_admin_title: 'Health Admin Portal',
      login_admin_desc: 'Hospital bed grid, blood bank stock, healthcare staff registry & drug inventory control.',
      btn_enter_portal: 'Enter Portal',
      btn_quick_access: '⚡ 1-Tap Quick Access',
      btn_logout: '🚪 Log Out / Change Portal',
      logged_in_as: 'Active Session',
      role_patient: '🌾 Citizen',
      role_doctor: '🩺 Doctor',
      role_worker: '🤝 ASHA',
      role_admin: '👑 Admin',
      theme_classic: '🏛️ Classic (White & Blue)',
      theme_black: '⬛ Pure Black (Glass)',
      theme_navy: '🌊 Deep Navy (Glass)',
      btn_sos: '🚨 108 SOS',
      emergency_banner: '🚑 Immediate 108 Ambulance SOS — Tap to Call or Send GPS',
      emergency_subline: 'Direct connection to nearest Rural Emergency Dispatch Hub',
      btn_call_108: '📞 Call 108',
      btn_gps_sos: '📍 GPS SOS',
      abha_title: '🆔 Digital ABHA Health Card',
      abha_desc: 'Your government health identity card. Keep it handy for free consultations and hospital visits.',
      abha_nha: 'NATIONAL HEALTH AUTHORITY (ABHA)',
      abha_gov: 'Government of India',
      abha_active: 'ACTIVE VERIFIED',
      abha_qr: 'QR SCAN',
      abha_number_label: 'ABHA NUMBER (14-DIGIT)',
      abha_phone_label: 'PHONE LINKED',
      btn_print_abha: '🖨️ Print / Download ABHA Card',
      read_aloud: '🔊 Read Aloud',
      triage_title: '🩺 Visual AI Symptom Triage',
      triage_subtitle: 'Tap your symptom for instant first-aid guidance & emergency advice:',
      sym_fever: 'High Fever',
      sym_snakebite: 'Snake Bite',
      sym_diarrhea: 'Diarrhea',
      sym_pregnancy: 'Pregnancy Pain',
      sym_chestpain: 'Chest Pain',
      sym_breathing: 'Breathing Difficulty',
      meds_title: '💊 Jan Aushadhi Generic Medicine Savings',
      meds_desc: 'Save up to 80% with Pradhan Mantri Jan Aushadhi generic medicines.',
      dose_morning: '☀️ Morning',
      dose_noon: '🌤️ Noon',
      dose_night: '🌙 Night',
      dose_taken: '✓ Taken',
      saved_text: 'saved',
      family_title: '👨‍👩‍👧 Family Health Circle',
      btn_add_family: '+ Add Member',
      hospitals_title: '🏥 Live Hospital Beds & Blood Bank Near You',
      blood_title: '🩸 Blood Bank Live Availability (All Groups)',
      gen_beds: 'General Beds',
      icu_beds: 'ICU Beds',
      oxy_beds: 'Oxygen Beds',
      avail: 'Avail',
      in_stock: '✓ In Stock',
      low_stock: '⚠️ Low Stock',
      doc_queue_title: '📋 Live Teleconsultation Queue',
      btn_add_walkin: '+ Add Patient',
      doc_rx_title: '📝 Recent e-Prescriptions Generated',
      asha_anc_title: '🤰 High-Risk Maternal Health Register (ANC)',
      btn_add_anc: '+ Register Mother',
      asha_uip_title: '💉 Child Immunization Tracker (UIP)',
      asha_visits_title: '🏡 Village Daily Home Visit Planner',
      admin_kpi_title: '📊 Rural Health Grid Executive Dashboard',
      kpi_staff: 'Active Staff',
      kpi_queue: 'Queue Count',
      kpi_anc: 'ANC Mothers',
      kpi_beds: 'Available Beds',
      admin_staff_title: '👥 Healthcare Personnel Registry',
      admin_beds_title: '🏥 Hospital Bed & Oxygen Grid',
      admin_blood_title: '🩸 Blood Bank Stock Management',
      admin_drugs_title: '📦 Jan Aushadhi Medicine Inventory',
      med_paracetamol: 'Paracetamol 650mg (Jan Aushadhi)',
      med_calcium: 'Calcium + Vit D3 (Jan Aushadhi)',
      med_ifa: 'Iron & Folic Acid IFA (Govt PHC)',
      med_amoxicillin: 'Amoxicillin 500mg (Jan Aushadhi)',
      med_metformin: 'Metformin 500mg (Jan Aushadhi)',
      med_amlodipine: 'Amlodipine 5mg (Jan Aushadhi)',
      med_ors: 'ORS Sachet Powder',
      med_cetirizine: 'Cetirizine 10mg (Jan Aushadhi)',
      cat_fever: 'Fever & Pain Relief',
      cat_antibiotic: 'Antibiotic Infection',
      cat_diabetes: 'Diabetes / Blood Sugar',
      cat_bp: 'Hypertension / BP',
      cat_dehydration: 'Dehydration / Diarrhea',
      cat_maternal: 'Maternal Nutrition'
    },

    hi: {
      consult_modal_title: 'चिकित्सक परामर्श एवं डिजिटल ई-पर्चा',
      consulting_label: 'मरीज परामर्श',
      complaint_label: 'मुख्य समस्या / लक्षण',
      vitals_label: 'वाइटल्स',
      years_short: 'वर्ष',
      label_diagnosis: 'रोग निदान (डायग्नोसिस)',
      label_primary_med: 'प्राथमिक जन औषधि दवा',
      label_secondary_med: 'द्वितीयक जन औषधि दवा',
      label_advice: 'चिकित्सक परामर्श व निर्देश',
      btn_generate_rx: '✓ ई-पर्चा जारी करें',
      btn_cancel: 'रद्द करें',
      default_diagnosis_fever: 'तीव्र वायरल बुखार',
      default_advice_fever: 'उबला हुआ साफ पानी पिएं और पर्याप्त विश्राम करें।',
      opt_para: 'पैरासिटामोल 650mg (₹8 बनाम ₹34 डोलो)',
      opt_amox: 'अमोक्सिसिलिन 500mg (₹28 बनाम ₹110)',
      opt_met: 'मेटफॉर्मिन 500mg (₹12 बनाम ₹58)',
      opt_amlo: 'एम्लोडिपिन 5mg (₹6 बनाम ₹38)',
      opt_ors: 'ओआरएस पाउडर पैकेट (₹5 बनाम ₹24)',
      opt_cetz: 'सेट्रीजीन 10mg (₹4 बनाम ₹22)',
      opt_vitc: 'विटामिन सी + जिंक (₹15 बनाम ₹75)',
      opt_ifa: 'आयरन व फोलिक एसिड (₹4 बनाम ₹32)',
      btn_read_aloud: 'बोलकर सुनाएं',
      btn_stop_audio: 'आवाज बंद करें',
      no_patients_queue: 'कतार में कोई मरीज नहीं है। ऊपर "+ मरीज जोड़ें" दबाएं।',
      age_label: 'उम्र',
      btn_consult_prescribe: 'परामर्श व पर्चा दें',
      no_rx_history: 'हाल ही में कोई ई-पर्चा नहीं बनाया गया है।',
      doctor_label: 'चिकित्सक',
      rx_digital_verified: 'सत्यापित ई-पर्चा',
      rx_diagnosis: 'रोग निदान',
      rx_medicines: 'निर्धारित जन औषधि दवाइयां',
      rx_advice: 'चिकित्सक परामर्श',
      btn_print_rx: 'पर्चा प्रिंट करें',
      app_title: 'स्वास्थ्य सेतु',
      app_tagline: 'ग्रामीण स्वास्थ्य ग्रिड',
      portal_welcome: 'स्वास्थ्य सेतु में आपका स्वागत है',
      portal_subline: 'सेवाओं का उपयोग करने के लिए नीचे अपना संबंधित पोर्टल चुनें:',
      login_patient_title: 'नागरिक / मरीज पोर्टल',
      login_patient_desc: 'डिजिटल आभा कार्ड, 108 आपातकालीन सेवा, जन औषधि दवाइयां, लक्षण जांच व परिवार स्वास्थ्य।',
      login_doctor_title: 'चिकित्सक ओपीडी पोर्टल',
      login_doctor_desc: 'लाइव मरीज कतार, वाइटल्स जांच और त्वरित डिजिटल ई-पर्चा निर्माण।',
      login_worker_title: 'आशा दीदी फील्ड पोर्टल',
      login_worker_desc: 'गर्भवती महिला (ANC) रजिस्टर, शिशु टीकाकरण (UIP) और गांव के दैनिक घरेलू दौरे।',
      login_admin_title: 'जिला स्वास्थ्य प्रशासन पोर्टल',
      login_admin_desc: 'अस्पताल बेड ग्रिड, ब्लड बैंक स्टॉक, स्वास्थ्य कर्मचारी प्रबंधन और दवा भंडार।',
      btn_enter_portal: 'पोर्टल में प्रवेश करें',
      btn_quick_access: '⚡ 1-टैप सीधा प्रवेश',
      btn_logout: '🚪 लॉग आउट / पोर्टल बदलें',
      logged_in_as: 'सक्रिय सत्र',
      role_patient: '🌾 नागरिक',
      role_doctor: '🩺 डॉक्टर',
      role_worker: '🤝 आशा',
      role_admin: '👑 प्रशासन',
      theme_classic: '🏛️ क्लासिक (सफेद व नीला)',
      theme_black: '⬛ ब्लैक (ग्लास)',
      theme_navy: '🌊 नेवी ब्लू (ग्लास)',
      btn_sos: '🚨 108 आपातकाल',
      emergency_banner: '🚑 आपातकालीन 108 एम्बुलेंस — कॉल या लोकेशन भेजने हेतु टैप करें',
      emergency_subline: 'निकटतम ग्रामीण आपातकालीन केंद्र से त्वरित सहायता',
      btn_call_108: '📞 कॉल 108',
      btn_gps_sos: '📍 जीपीएस भेजें',
      abha_title: '🆔 डिजिटल आयुष्मान आभा कार्ड',
      abha_desc: 'आपका राष्ट्रीय स्वास्थ्य पहचान पत्र। सरकारी अस्पतालों में निशुल्क सेवा हेतु रखें।',
      abha_nha: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (ABHA)',
      abha_gov: 'भारत सरकार',
      abha_active: 'सत्यापित सक्रिय',
      abha_qr: 'क्यूआर स्कैन',
      abha_number_label: 'आभा संख्या (14-अंक)',
      abha_phone_label: 'लिंक्ड मोबाइल',
      btn_print_abha: '🖨️ आभा कार्ड प्रिंट / डाउनलोड करें',
      read_aloud: '🔊 बोलकर सुनाएं',
      triage_title: '🩺 लक्षण स्व-जांच व प्राथमिक उपचार',
      triage_subtitle: 'अपनी समस्या पर टैप करें और तुरंत सही सलाह प्राप्त करें:',
      sym_fever: 'तेज बुखार',
      sym_snakebite: 'सांप काटना',
      sym_diarrhea: 'दस्त व उल्टी',
      sym_pregnancy: 'प्रसव दर्द',
      sym_chestpain: 'छाती में दर्द',
      sym_breathing: 'सांस की तकलीफ',
      meds_title: '💊 जन औषधि बचत व दवाइयां',
      meds_desc: 'प्रधानमंत्री जन औषधि से 80% तक की बचत करें। वही असर, बहुत कम दाम।',
      dose_morning: '☀️ सुबह',
      dose_noon: '🌤️ दोपहर',
      dose_night: '🌙 रात',
      dose_taken: '✓ ली गई',
      saved_text: 'की बचत',
      family_title: '👨‍👩‍👧 परिवार स्वास्थ्य चक्र',
      btn_add_family: '+ सदस्य जोड़ें',
      hospitals_title: '🏥 नजदीकी अस्पताल, बेड व ब्लड बैंक',
      blood_title: '🩸 ब्लड बैंक लाइव यूनिट उपलब्धता (सभी ग्रुप)',
      gen_beds: 'सामान्य बेड',
      icu_beds: 'आईसीयू बेड',
      oxy_beds: 'ऑक्सीजन बेड',
      avail: 'उपलब्ध',
      in_stock: '✓ उपलब्ध',
      low_stock: '⚠️ कम स्टॉक',
      doc_queue_title: '📋 लाइव ओपीडी मरीज कतार',
      btn_add_walkin: '+ मरीज जोड़ें',
      doc_rx_title: '📝 हाल ही में जारी किए गए ई-पर्चे',
      asha_anc_title: '🤰 गर्भवती महिला स्वास्थ्य रजिस्टर (ANC)',
      btn_add_anc: '+ गर्भवती महिला जोड़ें',
      asha_uip_title: '💉 बाल टीकाकरण रजिस्टर (UIP)',
      asha_visits_title: '🏡 दैनिक घरेलू स्वास्थ्य दौरे',
      admin_kpi_title: '📊 स्वास्थ्य ग्रिड कमांड सेंटर',
      kpi_staff: 'सक्रिय स्टाफ',
      kpi_queue: 'कतार संख्या',
      kpi_anc: 'गर्भवती महिलाएं',
      kpi_beds: 'उपलब्ध बेड',
      admin_staff_title: '👥 स्वास्थ्य कार्यकर्ता व डॉक्टर डायरेक्टरी',
      admin_beds_title: '🏥 अस्पताल बेड व ऑक्सीजन ग्रिड',
      admin_blood_title: '🩸 ब्लड बैंक स्टॉक प्रबंधन',
      admin_drugs_title: '📦 जन औषधि दवा भंडार',
      med_paracetamol: 'पैरासिटामोल 650mg (जन औषधि)',
      med_calcium: 'कैल्शियम + विटामिन D3 (जन औषधि)',
      med_ifa: 'आयरन व फोलिक एसिड आईएफए (सरकारी प्राथमिक स्वास्थ्य केंद्र)',
      med_amoxicillin: 'अमोक्सिसिलिन 500mg (जन औषधि)',
      med_metformin: 'मेटफॉर्मिन 500mg (जन औषधि)',
      med_amlodipine: 'एम्लोडिपिन 5mg (जन औषधि)',
      med_ors: 'ओआरएस पाउडर पैकेट',
      med_cetirizine: 'सेट्रीजीन 10mg (जन औषधि)',
      cat_fever: 'बुखार व दर्द निवारक',
      cat_antibiotic: 'एंटीबायोटिक संक्रमण',
      cat_diabetes: 'मधुमेह / ब्लड शुगर',
      cat_bp: 'उच्च रक्तचाप / बीपी',
      cat_dehydration: 'निर्जलीकरण / दस्त',
      cat_maternal: 'मातृ पोषण व स्वास्थ्य'
    },

    te: {
      consult_modal_title: 'వైద్యుల సంప్రదింపు & డిజిటల్ ఇ-ప్రిస్క్రిప్షన్',
      consulting_label: 'రోగి పరీక్ష',
      complaint_label: 'ముఖ్య సమస్య / లక్షణాలు',
      vitals_label: 'వైటల్స్',
      years_short: 'సంవత్సరాలు',
      label_diagnosis: 'వ్యాధి నిర్ధారణ',
      label_primary_med: 'ప్రాథమిక జెనరిక్ మందు',
      label_secondary_med: 'ద్వితీయ జెనరిక్ మందు',
      label_advice: 'వైద్యుల సలహా మరియు సూచనలు',
      btn_generate_rx: '✓ ఇ-ప్రిస్క్రిప్షన్ ఇవ్వండి',
      btn_cancel: 'రద్దు చేయండి',
      default_diagnosis_fever: 'తీవ్రమైన వైరల్ జ్వరం',
      default_advice_fever: 'కాచి చల్లార్చిన నీరు ఎక్కువగా తాగండి, విశ్రాంతి తీసుకోండి.',
      opt_para: 'పారాసిటమాల్ 650mg (₹8 vs ₹34 డోలో)',
      opt_amox: 'అమోక్సిసిలిన్ 500mg (₹28 vs ₹110)',
      opt_met: 'మెట్‌ఫార్మిన్ 500mg (₹12 vs ₹58)',
      opt_amlo: 'ఆమ్లోడిపైన్ 5mg (₹6 vs ₹38)',
      opt_ors: 'ఓఆర్ఎస్ పౌడర్ ప్యాకెట్ (₹5 vs ₹24)',
      opt_cetz: 'సెటిరిజిన్ 10mg (₹4 vs ₹22)',
      opt_vitc: 'విటమిన్ సి + జింక్ (₹15 vs ₹75)',
      opt_ifa: 'ఐరన్ & ఫోలిక్ యాసిడ్ (₹4 vs ₹32)',
      btn_read_aloud: 'చదివి వినిపించు',
      btn_stop_audio: 'వాయిస్ ఆపు',
      no_patients_queue: 'క్యూలో రోగులు ఎవరూ లేరు. రోగిని జోడించండి.',
      age_label: 'వయస్సు',
      btn_consult_prescribe: 'పరీక్ష & మందులు ఇవ్వండి',
      no_rx_history: 'ఇటీవల ప్రిస్క్రిప్షన్లు ఏవీ ఇవ్వలేదు.',
      doctor_label: 'డాక్టర్',
      rx_digital_verified: 'ధృవీకరించిన ప్రిస్క్రిప్షన్',
      rx_diagnosis: 'వ్యాధి నిర్ధారణ',
      rx_medicines: 'సూచించిన మందులు',
      rx_advice: 'వైద్యుల సలహా',
      btn_print_rx: 'ప్రింట్ చేయండి',
      app_title: 'స్వాస్థ్య సేతు',
      app_tagline: 'గ్రామీణ ఆరోగ్య గ్రిడ్',
      portal_welcome: 'స్వాస్థ్య సేతుకు స్వాగతం',
      portal_subline: 'సేవలను పొందడానికి క్రింద మీ సంబంధిత పోర్టల్‌ను ఎంచుకోండి:',
      login_patient_title: 'పౌరుడు / రోగి పోర్టల్',
      login_patient_desc: 'డిజిటల్ ఆభా కార్డు, 108 ఎమర్జెన్సీ, జన్ ఔషధి మందులు & లక్షణాల తనిఖీ.',
      login_doctor_title: 'వైద్యుల క్లినికల్ పోర్టల్',
      login_doctor_desc: 'ఓపీడీ రోగుల క్యూ మరియు తక్షణ డిజిటల్ ప్రిస్క్రిప్షన్లు.',
      login_worker_title: 'ఆశా ఫ్రంట్‌లైన్ పోర్టల్',
      login_worker_desc: 'గర్భిణీ స్త్రీల రికార్డు, శిశు టీకాలు & గ్రామ గృహ సందర్శనలు.',
      login_admin_title: 'ఆరోగ్య పరిపాలనా పోర్టల్',
      login_admin_desc: 'ఆసుపత్రి బెడ్ల వివరాలు, బ్లడ్ బ్యాంక్ మరియు మందుల నిల్వ.',
      btn_enter_portal: 'పోర్టల్‌లోకి ప్రవేశించండి',
      btn_quick_access: '⚡ 1-ట్యాప్ ప్రత్యక్ష ప్రవేశం',
      btn_logout: '🚪 లాగ్ అవుట్ / మార్చండి',
      logged_in_as: 'యాక్టివ్ సెషన్',
      role_patient: '🌾 పౌరుడు',
      role_doctor: '🩺 డాక్టర్',
      role_worker: '🤝 ఆశా',
      role_admin: '👑 అడ్మిన్',
      theme_classic: '🏛️ క్లాసిక్ (తెలుపు & నీలం)',
      theme_black: '⬛ బ్లాక్ (గ్లాస్)',
      theme_navy: '🌊 నేవీ బ్లూ (గ్లాస్)',
      btn_sos: '🚨 108 అత్యవసరం',
      emergency_banner: '🚑 అత్యవసర 108 అంబులెన్స్ — కాల్ లేదా జీపీఎస్ పంపండి',
      emergency_subline: 'సమీప గ్రామీణ అత్యవసర విభాగానికి తక్షణ కనెక్షన్',
      btn_call_108: '📞 కాల్ 108',
      btn_gps_sos: '📍 జీపీఎస్ పంపండి',
      abha_title: '🆔 డిజిటల్ ఆభా హెల్త్ కార్డు',
      abha_desc: 'మీ జాతీయ ఆరోగ్య గుర్తింపు కార్డు. ఉచిత వైద్యం కోసం దీనిని ఉపయోగించండి.',
      abha_nha: 'జాతీయ ఆరోగ్య అథారిటీ (ABHA)',
      abha_gov: 'భారత ప్రభుత్వం',
      abha_active: 'ధృవీకరించబడింది',
      abha_qr: 'క్యూఆర్ స్కాన్',
      abha_number_label: 'ఆభా సంఖ్య (14-అంకెలు)',
      abha_phone_label: 'లింక్ చేయబడిన ఫోన్',
      btn_print_abha: '🖨️ ఆభా కార్డు ప్రింట్ / డౌన్‌లోడ్',
      read_aloud: '🔊 చదివి వినిపించు',
      triage_title: '🩺 లక్షణాల పరీక్ష & అత్యవసర సలహా',
      triage_subtitle: 'మీ లక్షణాన్ని ఎంచుకుని తక్షణ సలహా పొందండి:',
      sym_fever: 'తీవ్ర జ్వరం',
      sym_snakebite: 'పాము కాటు',
      sym_diarrhea: 'విరేచనాలు',
      sym_pregnancy: 'ప్రసవ నొప్పులు',
      sym_chestpain: 'ఛాతీ నొప్పి',
      sym_breathing: 'శ్వాస ఆడకపోవడం',
      meds_title: '💊 జన్ ఔషధి మందుల పొదుపు',
      meds_desc: 'జన్ ఔషధి ద్వారా 80% వరకు ఆదా చేసుకోండి.',
      dose_morning: '☀️ ఉదయం',
      dose_noon: '🌤️ మధ్యాహ్నం',
      dose_night: '🌙 రాత్రి',
      dose_taken: '✓ వేసుకున్నారు',
      saved_text: 'ఆదా అయింది',
      family_title: '👨‍👩‍👧 కుటుంబ ఆరోగ్య చక్రం',
      btn_add_family: '+ సభ్యుడిని చేర్చండి',
      hospitals_title: '🏥 సమీప ఆసుపత్రులు, బెడ్లు & బ్లడ్ బ్యాంక్',
      blood_title: '🩸 బ్లడ్ బ్యాంక్ నిల్వలు (అన్ని గ్రూపులు)',
      gen_beds: 'సాధారణ బెడ్లు',
      icu_beds: 'ఐసీయూ బెడ్లు',
      oxy_beds: 'ఆక్సిజన్ బెడ్లు',
      avail: 'అందుబాటులో ఉన్నాయి',
      in_stock: '✓ నిల్వ ఉంది',
      low_stock: '⚠️ తక్కువ నిల్వ',
      doc_queue_title: '📋 లైవ్ కన్సల్టేషన్ క్యూ',
      btn_add_walkin: '+ రోగిని చేర్చండి',
      doc_rx_title: '📝 డిజిటల్ ప్రిస్క్రిప్షన్లు',
      asha_anc_title: '🤰 గర్భిణీ స్త్రీల రికార్డు (ANC)',
      btn_add_anc: '+ గర్భిణీని నమోదు చేయండి',
      asha_uip_title: '💉 పిల్లల టీకాల రికార్డు (UIP)',
      asha_visits_title: '🏡 గ్రామ గృహ సందర్శనలు',
      admin_kpi_title: '📊 ఆరోగ్య కమాండ్ సెంటర్',
      kpi_staff: 'యాక్టివ్ సిబ్బంది',
      kpi_queue: 'క్యూ సంఖ్య',
      kpi_anc: 'గర్భిణీలు',
      kpi_beds: 'బెడ్ల లభ్యత',
      admin_staff_title: '👥 వైద్య సిబ్బంది జాబితా',
      admin_beds_title: '🏥 ఆసుపత్రి బెడ్ల వివరాలు',
      admin_blood_title: '🩸 బ్లడ్ బ్యాంక్ నిర్వహణ',
      admin_drugs_title: '📦 మందుల నిల్వ జాబితా',
      med_paracetamol: 'పారాసిటమాల్ 650mg (జన్ ఔషధి)',
      med_calcium: 'కాల్షియం + విటమిన్ D3 (జన్ ఔషధి)',
      med_ifa: 'ఐరన్ & ఫోలిక్ యాసిడ్ (ప్రభుత్వ పీహెచ్‌సీ)',
      med_amoxicillin: 'అమోక్సిసిలిన్ 500mg (జన్ ఔషధి)',
      med_metformin: 'మెట్‌ఫార్మిన్ 500mg (జన్ ఔషధి)',
      med_amlodipine: 'ఆమ్లోడిపైన్ 5mg (జన్ ఔషధి)',
      med_ors: 'ఓఆర్ఎస్ పౌడర్ ప్యాకెట్',
      med_cetirizine: 'సెటిరిజిన్ 10mg (జన్ ఔషధి)',
      cat_fever: 'జ్వరం & నొప్పి నివారణ',
      cat_antibiotic: 'యాంటీబయాటిక్ ఇన్ఫెక్షన్',
      cat_diabetes: 'డయాబెటిస్ / షుగర్',
      cat_bp: 'రక్తపోటు / బీపీ',
      cat_dehydration: 'డీహైడ్రేషన్ / విరేచనాలు',
      cat_maternal: 'మాతృ పోషణ'
    },

    ta: {
      consult_modal_title: 'மருத்துவ ஆலோசனை & மின்-மருத்துவ சீட்டு',
      consulting_label: 'நோயாளி பரிசோதனை',
      complaint_label: 'முக்கிய பிரச்சனை',
      vitals_label: 'உடல் நிலை',
      years_short: 'வயது',
      label_diagnosis: 'நோய் கண்டறிதல்',
      label_primary_med: 'முதன்மை ஜெனரிக் மருந்து',
      label_secondary_med: 'இரண்டாம் நிலை மருந்து',
      label_advice: 'மருத்துவர் ஆலோசனை & அறிவுரைகள்',
      btn_generate_rx: '✓ மின்-மருத்துவ சீட்டு உருவாக்கவும்',
      btn_cancel: 'ரத்து செய்',
      default_diagnosis_fever: 'கடுமையான வைரஸ் காய்ச்சல்',
      default_advice_fever: 'நிறைய காய்ச்சிய நீர் குடிக்கவும். நன்றாக ஓய்வெடுக்கவும்.',
      opt_para: 'பாராசிட்டமால் 650mg (₹8 vs ₹34 டோலோ)',
      opt_amox: 'அமோக்சிசிலின் 500mg (₹28 vs ₹110)',
      opt_met: 'மெட்பார்மின் 500mg (₹12 vs ₹58)',
      opt_amlo: 'அம்லோடிபின் 5mg (₹6 vs ₹38)',
      opt_ors: 'ஓஆர்எஸ் பொடி பாக்கெட் (₹5 vs ₹24)',
      opt_cetz: 'செட்ரிசின் 10mg (₹4 vs ₹22)',
      opt_vitc: 'வைட்டமின் சி + துத்தநாகம் (₹15 vs ₹75)',
      opt_ifa: 'இரும்புச்சத்து & ஃபோலிக் அமிலம் (₹4 vs ₹32)',
      btn_read_aloud: 'வாசித்துக் காட்டு',
      btn_stop_audio: 'ஒலியை நிறுத்து',
      no_patients_queue: 'வரிசையில் நோயாளிகள் இல்லை.',
      age_label: 'வயது',
      btn_consult_prescribe: 'பரிசோதனை & மருந்து சீட்டு',
      no_rx_history: 'சமீபத்திய மருத்துவ சீட்டுகள் இல்லை.',
      doctor_label: 'மருத்துவர்',
      rx_digital_verified: 'சரிபார்க்கப்பட்ட மருத்துவ சீட்டு',
      rx_diagnosis: 'நோய் கண்டறிதல்',
      rx_medicines: 'பரிந்துரைக்கப்பட்ட மருந்துகள்',
      rx_advice: 'மருத்துவர் ஆலோசனை',
      btn_print_rx: 'பிரிண்ட் செய்',
      app_title: 'சுவஸ்த்யா சேது',
      app_tagline: 'கிராமப்புற சுகாதார கட்டமைப்பு',
      portal_welcome: 'சுவஸ்த்யா சேதுவுக்கு நல்வரவு',
      portal_subline: 'சேவைகளைப் பெற கீழே உள்ள உங்கள் போர்ட்டலைத் தேர்வு செய்யவும்:',
      login_patient_title: 'நோயாளி / குடிமக்கள் போர்டல்',
      login_patient_desc: 'டிஜிட்டல் ஆபா அட்டை, 108 அவசர உதவி, ஜன் ஔஷதி மருந்துகள் & குடும்ப நலன்.',
      login_doctor_title: 'மருத்துவர் மருத்துவ போர்டல்',
      login_doctor_desc: 'நோயாளி வரிசை மேலாண்மை & உடனடி மின்-மருத்துவ சீட்டு.',
      login_worker_title: 'ஆஷா களப்பணி போர்டல்',
      login_worker_desc: 'கர்ப்பிணி பெண்கள் பதிவேடு, குழந்தை தடுப்பூசி & கிராம களப்பணிகள்.',
      login_admin_title: 'சுகாதார நிர்வாக போர்டல்',
      login_admin_desc: 'மருத்துவமனை படுக்கை வசதி, ரத்த வங்கி & பணியாளர் பட்டியல்.',
      btn_enter_portal: 'உள்நுழையவும்',
      btn_quick_access: '⚡ உடனடி உள்நுழைவு',
      btn_logout: '🚪 வெளியேறு / மாற்று',
      logged_in_as: 'செயலில் உள்ள அமர்வு',
      role_patient: '🌾 நோயாளி',
      role_doctor: '🩺 மருத்துவர்',
      role_worker: '🤝 ஆஷா',
      role_admin: '👑 நிர்வாகம்',
      theme_classic: '🏛️ கிளாசிக் (வெள்ளை & நீலம்)',
      theme_black: '⬛ கருப்பு (கிளாஸ்)',
      theme_navy: '🌊 நேவி நீலம் (கிளாஸ்)',
      btn_sos: '🚨 108 அவசரம்',
      emergency_banner: '🚑 அவசர 108 ஆம்புலன்ஸ் — அழைக்க அல்லது ஜிபிஎஸ் அனுப்ப தட்டவும்',
      emergency_subline: 'அருகிலுள்ள அவசர சிகிச்சை மையத்துடன் உடனடி இணைப்பு',
      btn_call_108: '📞 அழை 108',
      btn_gps_sos: '📍 ஜிபிஎஸ் அனுப்பு',
      abha_title: '🆔 டிஜிட்டல் ஆபா அட்டை',
      abha_desc: 'உங்கள் தேசிய சுகாதார அடையாள அட்டை. இலவச மருத்துவத்திற்கு பயன்படுத்தவும்.',
      abha_nha: 'தேசிய சுகாதார ஆணையம் (ABHA)',
      abha_gov: 'இந்திய அரசு',
      abha_active: 'செயலில் உள்ளது',
      abha_qr: 'ஸ்கேன் செய்',
      abha_number_label: 'ஆபா எண் (14-இலக்கம்)',
      abha_phone_label: 'இணைக்கப்பட்ட தொலைபேசி',
      btn_print_abha: '🖨️ ஆபா அட்டை பதிவிறக்கம்',
      read_aloud: '🔊 வாசித்துக் காட்டு',
      triage_title: '🩺 முதலுதவி & அறிகுறி பரிசோதனை',
      triage_subtitle: 'உங்கள் உடல் பிரச்சனையை தேர்வு செய்து உடனடி வழிகாட்டல் பெறவும்:',
      sym_fever: 'காய்ச்சல்',
      sym_snakebite: 'பாம்பு கடி',
      sym_diarrhea: 'வயிற்றுப்போக்கு',
      sym_pregnancy: 'பிரசவ வலி',
      sym_chestpain: 'நெஞ்சு வலி',
      sym_breathing: 'மூச்சுத்திணறல்',
      meds_title: '💊 ஜன் ஔஷதி மருந்துகள் & சேமிப்பு',
      meds_desc: 'ஜன் ஔஷதி மூலம் 80% வரை பணத்தை சேமிக்கவும்.',
      dose_morning: '☀️ காலை',
      dose_noon: '🌤️ மதியம்',
      dose_night: '🌙 இரவு',
      dose_taken: '✓ எடுக்கப்பட்டது',
      saved_text: 'சேமிக்கப்பட்டது',
      family_title: '👨‍👩‍👧 குடும்ப சுகாதார வட்டம்',
      btn_add_family: '+ உறுப்பினர் சேர்க்க',
      hospitals_title: '🏥 அருகிலுள்ள மருத்துவமனை & ரத்த வங்கி',
      blood_title: '🩸 ரத்த வங்கி இருப்பு (அனைத்து பிரிவுகள்)',
      gen_beds: 'பொது படுக்கைகள்',
      icu_beds: 'தீவிர சிகிச்சை படுக்கைகள்',
      oxy_beds: 'ஆக்ஸிஜன் படுக்கைகள்',
      avail: 'கிடைக்கிறது',
      in_stock: '✓ இருப்பு உள்ளது',
      low_stock: '⚠️ குறைந்த இருப்பு',
      doc_queue_title: '📋 நோயாளி வரிசை',
      btn_add_walkin: '+ நோயாளி சேர்க்க',
      doc_rx_title: '📝 சமீபத்திய மருத்துவ சீட்டுகள்',
      asha_anc_title: '🤰 கர்ப்பிணி பெண்கள் பதிவேடு (ANC)',
      btn_add_anc: '+ கர்ப்பிணி சேர்க்க',
      asha_uip_title: '💉 தடுப்பூசி பதிவேடு (UIP)',
      asha_visits_title: '🏡 கிராம களப்பணி',
      admin_kpi_title: '📊 சுகாதார கட்டுப்பாட்டு மையம்',
      kpi_staff: 'பணியாளர்கள்',
      kpi_queue: 'வரிசை எண்ணிக்கை',
      kpi_anc: 'கர்ப்பிணிகள்',
      kpi_beds: 'படுக்கைகள்',
      admin_staff_title: '👥 பணியாளர் பட்டியல்',
      admin_beds_title: '🏥 படுக்கை வசதி விவரம்',
      admin_blood_title: '🩸 ரத்த வங்கி மேலாண்மை',
      admin_drugs_title: '📦 மருந்து கிடங்கு',
      med_paracetamol: 'பாராசிட்டமால் 650mg (ஜன் ஔஷதி)',
      med_calcium: 'கால்சியம் + வைட்டமின் D3 (ஜன் ஔஷதி)',
      med_ifa: 'இரும்புச்சத்து & ஃபோலிக் அமிலம் (அரசு பிஎச்சி)',
      med_amoxicillin: 'அமோக்சிசிலின் 500mg (ஜன் ஔஷதி)',
      med_metformin: 'மெட்பார்மின் 500mg (ஜன் ஔஷதி)',
      med_amlodipine: 'அம்லோடிபின் 5mg (ஜன் ஔஷதி)',
      med_ors: 'ஓஆர்எஸ் பொடி பாக்கெட்',
      med_cetirizine: 'செட்ரிசின் 10mg (ஜன் ஔஷதி)',
      cat_fever: 'காய்ச்சல் நிவாரணி',
      cat_antibiotic: 'நுண்ணுயிர் எதிர்ப்பு',
      cat_diabetes: 'நீரிழிவு / சர்க்கரை',
      cat_bp: 'இரத்த அழுத்தம்',
      cat_dehydration: 'நீரிழப்பு / வயிற்றுப்போக்கு',
      cat_maternal: 'தாய்மை ஊட்டச்சத்து'
    },

    mr: {
      consult_modal_title: 'वैद्यकीय तपासणी आणि डिजिटल ई-प्रिस्क्रिप्शन',
      consulting_label: 'रुग्ण तपासणी',
      complaint_label: 'मुख्य तक्रार / लक्षणे',
      vitals_label: 'शारीरिक घटक',
      years_short: 'वर्षे',
      label_diagnosis: 'रोग निदान',
      label_primary_med: 'प्राथमिक जन औषधी औषध',
      label_secondary_med: 'दुय्यम जन औषधी औषध',
      label_advice: 'डॉक्टरांचा सल्ला व सूचना',
      btn_generate_rx: '✓ ई-प्रिस्क्रिप्शन द्या',
      btn_cancel: 'रद्द करा',
      default_diagnosis_fever: 'तीव्र व्हायरल ताप',
      default_advice_fever: 'उकळलेले पाणी भरपूर प्या आणि विश्रांती घ्या.',
      opt_para: 'पॅरासिटामॉल 650mg (₹8 विरुद्ध ₹34 डोलो)',
      opt_amox: 'अमोक्सिसिलिन 500mg (₹28 विरुद्ध ₹110)',
      opt_met: 'मेटफॉर्मिन 500mg (₹12 विरुद्ध ₹58)',
      opt_amlo: 'ॲम्लोडिपिन 5mg (₹6 विरुद्ध ₹38)',
      opt_ors: 'ओआरएस पावडर पॅकेट (₹5 विरुद्ध ₹24)',
      opt_cetz: 'सेट्रीझिन 10mg (₹4 विरुद्ध ₹22)',
      opt_vitc: 'व्हिटॅमिन सी + झिंक (₹15 विरुद्ध ₹75)',
      opt_ifa: 'लोह आणि फॉलिक ॲसिड (₹4 विरुद्ध ₹32)',
      btn_read_aloud: 'ऐका',
      btn_stop_audio: 'आवाज बंद',
      no_patients_queue: 'रांगेत रुग्ण नाहीत. रुग्ण जोडा.',
      age_label: 'वय',
      btn_consult_prescribe: 'तपासणी व प्रिस्क्रिप्शन',
      no_rx_history: 'नुकतेच दिलेले ई-प्रिस्क्रिप्शन उपलब्ध नाही.',
      doctor_label: 'डॉक्टर',
      rx_digital_verified: 'सत्यापित ई-प्रिस्क्रिप्शन',
      rx_diagnosis: 'रोग निदान',
      rx_medicines: 'दिलेली जन औषधी औषधे',
      rx_advice: 'डॉक्टरांचा सल्ला',
      btn_print_rx: 'प्रिंट करा',
      app_title: 'स्वास्थ्य सेतू',
      app_tagline: 'ग्रामीण आरोग्य ग्रिड',
      portal_welcome: 'स्वास्थ्य सेतू मध्ये आपले स्वागत आहे',
      portal_subline: 'आरोग्य सेवा मिळवण्यासाठी खालीलपैकी आपले पोर्टल निवडा:',
      login_patient_title: 'नागरिक / रुग्ण पोर्टल',
      login_patient_desc: 'डिजिटल आभा कार्ड, 108 रुग्णवाहिका, जन औषधी औषधे व कुटुंब आरोग्य.',
      login_doctor_title: 'डॉक्टर क्लिनिकल पोर्टल',
      login_doctor_desc: 'ओपीडी रुग्ण रांग, निदान व त्वरित डिजिटल ई-प्रिस्क्रिप्शन.',
      login_worker_title: 'आशा सेविका पोर्टल',
      login_worker_desc: 'गरोदर माता नोंद, बाल लसीकरण व दैनंदिन आरोग्य भेटी.',
      login_admin_title: 'आरोग्य प्रशासन पोर्टल',
      login_admin_desc: 'रुग्णालय बेड व्यवस्था, रक्त साठा व कर्मचारी यादी.',
      btn_enter_portal: 'पोर्टलमध्ये प्रवेश करा',
      btn_quick_access: '⚡ थेट प्रवेश',
      btn_logout: '🚪 लॉग आउट / पोर्टल बदला',
      logged_in_as: 'सक्रिय सत्र',
      role_patient: '🌾 नागरिक',
      role_doctor: '🩺 डॉक्टर',
      role_worker: '🤝 आशा',
      role_admin: '👑 प्रशासन',
      theme_classic: '🏛️ क्लासिक (पांढरा व निळा)',
      theme_black: '⬛ ब्लॅक (ग्लास)',
      theme_navy: '🌊 नेव्ही ब्लू (ग्लास)',
      btn_sos: '🚨 108 आपत्कालीन',
      emergency_banner: '🚑 आपत्कालीन 108 रुग्णवाहिका — त्वरित कॉल करा किंवा लोकेशन पाठवा',
      emergency_subline: 'जवळच्या ग्रामीण रुग्णवाहिका केंद्राशी थेट संपर्क',
      btn_call_108: '📞 कॉल 108',
      btn_gps_sos: '📍 जीपीएस पाठवा',
      abha_title: '🆔 डिजिटल आभा आरोग्य कार्ड',
      abha_desc: 'तुमचे राष्ट्रीय आरोग्य ओळखपत्र. मोफत उपचारांसाठी सोबत ठेवा.',
      abha_nha: 'राष्ट्रीय आरोग्य प्राधिकरण (ABHA)',
      abha_gov: 'भारत सरकार',
      abha_active: 'सत्यापित सक्रिय',
      abha_qr: 'क्यूआर स्कॅन',
      abha_number_label: 'आभा क्रमांक (14-अंकी)',
      abha_phone_label: 'लिंक्ड फोन',
      btn_print_abha: '🖨️ आभा कार्ड प्रिंट करा',
      read_aloud: '🔊 ऐका',
      triage_title: '🩺 लक्षण तपासणी व प्रथमोपचार',
      triage_subtitle: 'समस्येवर टॅप करून त्वरित योग्य सल्ला मिळवा:',
      sym_fever: 'तीव्र ताप',
      sym_snakebite: 'सर्पदंश',
      sym_diarrhea: 'उलट्या व जुलाब',
      sym_pregnancy: 'प्रसूती वेदना',
      sym_chestpain: 'छातीत दुखणे',
      sym_breathing: 'श्वास घेण्यास त्रास',
      meds_title: '💊 जन औषधी बचत योजना',
      meds_desc: 'जन औषधीद्वारे ८०% पर्यंत बचत करा. समान परिणाम, कमी किंमत.',
      dose_morning: '☀️ सकाळ',
      dose_noon: '🌤️ दुपार',
      dose_night: '🌙 रात्र',
      dose_taken: '✓ घेतली',
      saved_text: 'ची बचत',
      family_title: '👨‍👩‍👧 कुटुंब आरोग्य चक्र',
      btn_add_family: '+ सदस्य जोडा',
      hospitals_title: '🏥 जवळचे रुग्णालय, बेड व रक्तपेढी',
      blood_title: '🩸 रक्तपेढी थेट उपलब्धता (सर्व गट)',
      gen_beds: 'सामान्य बेड',
      icu_beds: 'आयसीयू बेड',
      oxy_beds: 'ऑक्सिजन बेड',
      avail: 'उपलब्ध',
      in_stock: '✓ उपलब्ध',
      low_stock: '⚠️ कमी साठा',
      doc_queue_title: '📋 ओपीडी रुग्ण रांग',
      btn_add_walkin: '+ रुग्ण जोडा',
      doc_rx_title: '📝 नुकतेच दिलेले ई-प्रिस्क्रिप्शन',
      asha_anc_title: '🤰 गरोदर माता नोंदवही (ANC)',
      btn_add_anc: '+ माता नोंदणी',
      asha_uip_title: '💉 बाल लसीकरण नोंद (UIP)',
      asha_visits_title: '🏡 दैनंदिन आरोग्य भेटी',
      admin_kpi_title: '📊 आरोग्य कमांड सेंटर',
      kpi_staff: 'सक्रिय कर्मचारी',
      kpi_queue: 'रांग संख्या',
      kpi_anc: 'गरोदर माता',
      kpi_beds: 'उपलब्ध बेड',
      admin_staff_title: '👥 आरोग्य कर्मचारी यादी',
      admin_beds_title: '🏥 बेड व ऑक्सिजन उपलब्धता',
      admin_blood_title: '🩸 रक्त साठा व्यवस्थापन',
      admin_drugs_title: '📦 जन औषधी औषध साठा',
      med_paracetamol: 'पॅरासिटामॉल 650mg (जन औषधी)',
      med_calcium: 'कॅल्शियम + व्हिटॅमिन D3 (जन औषधी)',
      med_ifa: 'लोह आणि फॉलिक ॲसिड (शासकीय प्राथमिक आरोग्य केंद्र)',
      med_amoxicillin: 'अमोक्सिसिलिन 500mg (जन औषधी)',
      med_metformin: 'मेटफॉर्मिन 500mg (जन औषधी)',
      med_amlodipine: 'ॲम्लोडिपिन 5mg (जन औषधी)',
      med_ors: 'ओआरएस पावडर पॅकेट',
      med_cetirizine: 'सेट्रीझिन 10mg (जन औषधी)',
      cat_fever: 'ताप व वेदनाशामक',
      cat_antibiotic: 'अँटीबायोटिक संसर्ग',
      cat_diabetes: 'मधुमेह / शुगर',
      cat_bp: 'रक्तदाब / बीपी',
      cat_dehydration: 'पाण्याची कमतरता',
      cat_maternal: 'मातृ पोषण'
    },

    bn: {
      consult_modal_title: 'ডাক্তারি পরামর্শ ও ডিজিটাল ই-প্রেসক্রিপশন',
      consulting_label: 'রোগী পরামর্শ',
      complaint_label: 'প্রধান লক্ষণ ও সমস্যা',
      vitals_label: 'শারীরিক অবস্থা',
      years_short: 'বছর',
      label_diagnosis: 'রোগ নির্ণয়',
      label_primary_med: 'প্রাথমিক জেনেরিক ওষুধ',
      label_secondary_med: 'দ্বিতীয় জেনেরিক ওষুধ',
      label_advice: 'ডাক্তারের পরামর্শ ও নির্দেশিকা',
      btn_generate_rx: '✓ ই-প্রেসক্রিপশন তৈরি করুন',
      btn_cancel: 'বাতিল করুন',
      default_diagnosis_fever: 'তীব্র ভাইরাল জ্বর',
      default_advice_fever: 'প্রচুর ফোটানো জল পান করুন ও বিশ্রাম নিন।',
      opt_para: 'প্যারাসিটামল 650mg (₹8 বনাম ₹34 ডোলো)',
      opt_amox: 'অ্যামোক্সিসিলিন 500mg (₹28 বনাম ₹110)',
      opt_met: 'মেটফর্মিন 500mg (₹12 বনাম ₹58)',
      opt_amlo: 'অ্যামলোডিপাইন 5mg (₹6 বনাম ₹38)',
      opt_ors: 'ওআরএস স্যালাইন প্যাকেট (₹5 বনাম ₹24)',
      opt_cetz: 'সেটিরিজিন 10mg (₹4 বনাম ₹22)',
      opt_vitc: 'ভিটামিন সি + জিঙ্ক (₹15 বনাম ₹75)',
      opt_ifa: 'আয়রন ও ফলিক অ্যাসিড (₹4 বনাম ₹32)',
      btn_read_aloud: 'শুনে নিন',
      btn_stop_audio: 'শব্দ বন্ধ',
      no_patients_queue: 'তালিকায় রোগী নেই।',
      age_label: 'বয়স',
      btn_consult_prescribe: 'পরামর্শ ও প্রেসক্রিপশন',
      no_rx_history: 'কোনো প্রেসক্রিপশন নেই।',
      doctor_label: 'ডাক্তার',
      rx_digital_verified: 'যাচাইকৃত প্রেসক্রিপশন',
      rx_diagnosis: 'রোগ নির্ণয়',
      rx_medicines: 'নির্ধারিত জেনেরিক ওষুধ',
      rx_advice: 'ডাক্তারের পরামর্শ',
      btn_print_rx: 'প্রিন্ট করুন',
      app_title: 'স্বাস্থ্য সেতু',
      app_tagline: 'গ্রামীণ স্বাস্থ্যসেবা গ্রিড',
      portal_welcome: 'স্বাস্থ্য সেতুতে স্বাগতম',
      portal_subline: 'স্বাস্থ্যসেবা পেতে নিচে আপনার নিজস্ব পোর্টাল নির্বাচন করুন:',
      login_patient_title: 'নাগরিক / রোগী পোর্টাল',
      login_patient_desc: 'ডিজিটাল আভা কার্ড, ১০৮ জরুরি সেবা, জন ঔষধি ওষুধ ও পারিবারিক স্বাস্থ্য।',
      login_doctor_title: 'ডাক্তার ক্লিনিক্যাল পোর্টাল',
      login_doctor_desc: 'ওপিডি রোগী তালিকা ও তাৎক্ষণিক ডিজিটাল প্রেসক্রিপশন।',
      login_worker_title: 'আশা কর্মী পোর্টাল',
      login_worker_desc: 'গর্ভবতী মায়ের রেকর্ড, শিশু টিকাদান ও বাড়ি পরিদর্শন।',
      login_admin_title: 'স্বাস্থ্য প্রশাসন পোর্টাল',
      login_admin_desc: 'হাসপাতাল বেড তথ্য, ব্লাড ব্যাংক ও কর্মী ব্যবস্থাপনা।',
      btn_enter_portal: 'প্রবেশ করুন',
      btn_quick_access: '⚡ সরাসরি প্রবেশ',
      btn_logout: '🚪 লগ আউট / পরিবর্তন',
      logged_in_as: 'সক্রিয় সেশন',
      role_patient: '🌾 নাগরিক',
      role_doctor: '🩺 ডাক্তার',
      role_worker: '🤝 আশা',
      role_admin: '👑 প্রশাসন',
      theme_classic: '🏛️ ক্লাসিক (সাদা ও নীল)',
      theme_black: '⬛ ব্ল্যাক (গ্লাস)',
      theme_navy: '🌊 নেভি ব্লু (গ্লাস)',
      btn_sos: '🚨 ১০৮ জরুরি',
      emergency_banner: '🚑 জরুরি ১০৮ অ্যাম্বুলেন্স — কল বা অবস্থান পাঠাতে ট্যাপ করুন',
      emergency_subline: 'নিকটতম গ্রামীণ জরুরি স্বাস্থ্য কেন্দ্রের সাথে সংযোগ',
      btn_call_108: '📞 কল ১০৮',
      btn_gps_sos: '📍 জিপিএস পাঠান',
      abha_title: '🆔 ডিজিটাল আভা স্বাস্থ্য কার্ড',
      abha_desc: 'আপনার জাতীয় স্বাস্থ্য পরিচয়পত্র। বিনামূল্যে চিকিৎসার জন্য সাথে রাখুন।',
      abha_nha: 'জাতীয় স্বাস্থ্য কর্তৃপক্ষ (ABHA)',
      abha_gov: 'ভারত সরকার',
      abha_active: 'যাচাইকৃত সক্রিয়',
      abha_qr: 'কিউআর স্ক্যান',
      abha_number_label: 'আভা নম্বর (১৪-সংখ্যা)',
      abha_phone_label: 'সংযুক্ত মোবাইল',
      btn_print_abha: '🖨️ আভা কার্ড প্রিন্ট করুন',
      read_aloud: '🔊 শুনে নিন',
      triage_title: '🩺 লক্ষণ পরীক্ষা ও প্রাথমিক চিকিৎসা',
      triage_subtitle: 'আপনার সমস্যা নির্বাচন করে সঠিক পরামর্শ নিন:',
      sym_fever: 'উচ্চ জ্বর',
      sym_snakebite: 'সাপের কামড়',
      sym_diarrhea: 'ডায়রিয়া ও বমি',
      sym_pregnancy: 'প্রসব বেদনা',
      sym_chestpain: 'বুকে ব্যথা',
      sym_breathing: 'শ্বাসকষ্ট',
      meds_title: '💊 জন ঔষধি সঞ্চয় ও ওষুধ',
      meds_desc: 'জন ঔষধি জেনেরিক ওষুধে ৮০% পর্যন্ত সাশ্রয় করুন।',
      dose_morning: '☀️ সকাল',
      dose_noon: '🌤️ দুপুর',
      dose_night: '🌙 রাত',
      dose_taken: '✓ নেওয়া হয়েছে',
      saved_text: 'সাশ্রয় হয়েছে',
      family_title: '👨‍👩‍👧 পারিবারিক স্বাস্থ্য চক্র',
      btn_add_family: '+ সদস্য যোগ করুন',
      hospitals_title: '🏥 নিকটস্থ হাসপাতাল, বেড ও ব্লাড ব্যাংক',
      blood_title: '🩸 ব্লাড ব্যাংক প্রাপ্যতা (সব গ্রুপ)',
      gen_beds: 'সাধারণ বেড',
      icu_beds: 'আইসিইউ বেড',
      oxy_beds: 'অক্সিজেন বেড',
      avail: 'পাওয়া যাবে',
      in_stock: '✓ মজুদ আছে',
      low_stock: '⚠️ কম মজুদ',
      doc_queue_title: '📋 ওপিডি রোগী তালিকা',
      btn_add_walkin: '+ রোগী যোগ করুন',
      doc_rx_title: '📝 সাম্প্রতিক ই-প্রেসক্রিপশন',
      asha_anc_title: '🤰 গর্ভবতী স্বাস্থ্য রেকর্ড (ANC)',
      btn_add_anc: '+ গর্ভবতী মা যোগ করুন',
      asha_uip_title: '💉 শিশু টিকাদান রেকর্ড (UIP)',
      asha_visits_title: '🏡 দৈনিক স্বাস্থ্য পরিদর্শন',
      admin_kpi_title: '📊 স্বাস্থ্য কমান্ড সেন্টার',
      kpi_staff: 'সক্রিয় কর্মী',
      kpi_queue: 'রোগী সংখ্যা',
      kpi_anc: 'গর্ভবতী মায়েরা',
      kpi_beds: 'উপলব্ধ বেড',
      admin_staff_title: '👥 স্বাস্থ্য কর্মী তালিকা',
      admin_beds_title: '🏥 হাসপাতালের বেড তথ্য',
      admin_blood_title: '🩸 ব্লাড ব্যাংক ব্যবস্থাপনা',
      admin_drugs_title: '📦 ওষুধ ইনভেন্টরি',
      med_paracetamol: 'প্যারাসিটামল 650mg (জন ঔষধি)',
      med_calcium: 'ক্যালসিয়াম + ভিটামিন D3 (জন ঔষধি)',
      med_ifa: 'আয়রন ও ফলিক অ্যাসিড (সরকারি স্বাস্থ্যকেন্দ্র)',
      med_amoxicillin: 'অ্যামোক্সিসিলিন 500mg (জন ঔষধি)',
      med_metformin: 'মেটফর্মিন 500mg (জন ঔষধি)',
      med_amlodipine: 'অ্যামলোডিপাইন 5mg (জন ঔষধি)',
      med_ors: 'ওআরএস স্যালাইন প্যাকেট',
      med_cetirizine: 'সেটিরিজিন 10mg (জন ঔষধি)',
      cat_fever: 'জ্বর ও ব্যথানাশক',
      cat_antibiotic: 'অ্যান্টিবায়োটিক সংক্রমণ',
      cat_diabetes: 'ডায়াবেটিস / সুগার',
      cat_bp: 'রক্তচাপ / প্রেসার',
      cat_dehydration: 'পানিশূন্যতা / ডায়রিয়া',
      cat_maternal: 'মাতৃ পুষ্টি'
    },

    kn: {
      consult_modal_title: 'ವೈದ್ಯಕೀಯ ಸಮಾಲೋಚನೆ & ಡಿಜಿಟಲ್ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್',
      consulting_label: 'ರೋಗಿ ಪರೀಕ್ಷೆ',
      complaint_label: 'ಮುಖ್ಯ ಸಮಸ್ಯೆ / ರೋಗಲಕ್ಷಣಗಳು',
      vitals_label: 'ವೈಟಲ್ಸ್',
      years_short: 'ವರ್ಷ',
      label_diagnosis: 'ರೋಗ ನಿರ್ಣಯ',
      label_primary_med: 'ಪ್ರಾಥಮಿಕ ಜೆನೆರಿಕ್ ಔಷಧಿ',
      label_secondary_med: 'ದ್ವಿತೀಯ ಜೆನೆರಿಕ್ ಔಷಧಿ',
      label_advice: 'ವೈದ್ಯರ ಸಲಹೆ ಮತ್ತು ಸೂಚನೆಗಳು',
      btn_generate_rx: '✓ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ರಚಿಸಿ',
      btn_cancel: 'ರದ್ದುಮಾಡಿ',
      default_diagnosis_fever: 'ತೀವ್ರ ವೈರಲ್ ಜ್ವರ',
      default_advice_fever: 'ಸಾಕಷ್ಟು ಕುದಿಸಿದ ನೀರನ್ನು ಕುಡಿಯಿರಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.',
      opt_para: 'ಪ್ಯಾರಸಿಟಮಾಲ್ 650mg (₹8 vs ₹34 ಡೋಲೋ)',
      opt_amox: 'ಅಮೋಕ್ಸಿಸಿಲಿನ್ 500mg (₹28 vs ₹110)',
      opt_met: 'ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500mg (₹12 vs ₹58)',
      opt_amlo: 'ಆಮ್ಲೋಡಿಪಿನ್ 5mg (₹6 vs ₹38)',
      opt_ors: 'ಒಆರ್‌ಎಸ್ ಪೌಡರ್ ಪ್ಯಾಕೆಟ್ (₹5 vs ₹24)',
      opt_cetz: 'ಸೆಟಿರಿಜಿನ್ 10mg (₹4 vs ₹22)',
      opt_vitc: 'ವಿಟಮಿನ್ ಸಿ + ಸತು (₹15 vs ₹75)',
      opt_ifa: 'ಐರನ್ & ಫೋಲಿಕ್ ಆಮ್ಲ (₹4 vs ₹32)',
      btn_read_aloud: 'ಓದಿ ಕೇಳಿ',
      btn_stop_audio: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
      no_patients_queue: 'ಸರತಿಯಲ್ಲಿ ರೋಗಿಗಳಿಲ್ಲ.',
      age_label: 'ವಯಸ್ಸು',
      btn_consult_prescribe: 'ಪರೀಕ್ಷೆ & ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್',
      no_rx_history: 'ಯಾವುದೇ ಇತ್ತೀಚಿನ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳಿಲ್ಲ.',
      doctor_label: 'ವೈದ್ಯರು',
      rx_digital_verified: 'ದೃಢೀಕರಿಸಿದ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್',
      rx_diagnosis: 'ರೋಗ ನಿರ್ಣಯ',
      rx_medicines: 'ಸೂಚಿಸಿದ ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು',
      rx_advice: 'ವೈದ್ಯರ ಸಲಹೆ',
      btn_print_rx: 'ಪ್ರಿಂಟ್ ಮಾಡಿ',
      app_title: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು',
      app_tagline: 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಜಾಲ',
      portal_welcome: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತುಗೆ ಸುಸ್ವಾಗತ',
      portal_subline: 'ಸೇವೆಗಳನ್ನು ಪಡೆಯಲು ಕೆಳಗೆ ನಿಮ್ಮ ಸಂಬಂಧಿತ ಪೋರ್ಟಲ್ ಆಯ್ಕೆಮಾಡಿ:',
      login_patient_title: 'ನಾಗರಿಕ / ರೋಗಿ ಪೋರ್ಟಲ್',
      login_patient_desc: 'ಡಿಜಿಟಲ್ ಆಭಾ ಕಾರ್ಡ್, 108 ತುರ್ತು ಸೇವೆ, ಜನ ಔಷಧಿ ಮಾತ್ರೆಗಳು & ಕುಟುಂಬ ಆರೋಗ್ಯ.',
      login_doctor_title: 'ವೈದ್ಯರ ಕ್ಲಿನಿಕಲ್ ಪೋರ್ಟಲ್',
      login_doctor_desc: 'ರೋಗಿಗಳ ಸರತಿ ಸಾಲು ನಿರ್ವಹಣೆ & ತಕ್ಷಣದ ಡಿಜಿಟಲ್ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್.',
      login_worker_title: 'ಆಶಾ ಕ್ಷೇತ್ರ ಪೋರ್ಟಲ್',
      login_worker_desc: 'ಗರ್ಭಿಣಿಯರ ದಾಖಲೆ, ಮಕ್ಕಳ ಲಸಿಕೆ & ಗ್ರಾಮ ಭೇಟಿಗಳು.',
      login_admin_title: 'ಆರೋಗ್ಯ ಆಡಳಿತ ಪೋರ್ಟಲ್',
      login_admin_desc: 'ಆಸ್ಪತ್ರೆ ಬೆಡ್ ಲಭ್ಯತೆ, ರಕ್ತನಿಧಿ & ಸಿಬ್ಬಂದಿ ಪಟ್ಟಿ.',
      btn_enter_portal: 'ಪ್ರವೇಶಿಸಿ',
      btn_quick_access: '⚡ ನೇರ ಪ್ರವೇಶ',
      btn_logout: '🚪 ಲಾಗ್ ಔಟ್ / ಬದಲಾಯಿಸಿ',
      logged_in_as: 'ಸಕ್ರಿಯ ಸೆಷನ್',
      role_patient: '🌾 ನಾಗರಿಕ',
      role_doctor: '🩺 ವೈದ್ಯರು',
      role_worker: '🤝 ಆಶಾ',
      role_admin: '👑 ಆಡಳಿತ',
      theme_classic: '🏛️ ಕ್ಲಾಸಿಕ್ (ಬಿಳಿ & ನೀಲಿ)',
      theme_black: '⬛ ಬ್ಲಾಕ್ (ಗ್ಲಾಸ್)',
      theme_navy: '🌊 ನೇವಿ ಬ್ಲೂ (ಗ್ಲಾಸ್)',
      btn_sos: '🚨 108 ತುರ್ತು',
      emergency_banner: '🚑 ತುರ್ತು 108 ಆಂಬ್ಯುಲೆನ್ಸ್ — ಕರೆ ಮಾಡಲು ಅಥವಾ ಜಿಪಿಎಸ್ ಕಳುಹಿಸಲು ಟ್ಯಾಪ್ ಮಾಡಿ',
      emergency_subline: 'ಹತ್ತಿರದ ಗ್ರಾಮೀಣ ತುರ್ತು ರವಾನೆ ಕೇಂದ್ರದೊಂದಿಗೆ ನೇರ ಸಂಪರ್ಕ',
      btn_call_108: '📞 ಕರೆ 108',
      btn_gps_sos: '📍 ಜಿಪಿಎಸ್ ಕಳುಹಿಸಿ',
      abha_title: '🆔 ಡಿಜಿಟಲ್ ಆಭಾ ಹೆಲ್ತ್ ಕಾರ್ಡ್',
      abha_desc: 'ನಿಮ್ಮ ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಗುರುತಿನ ಚೀಟಿ. ಉಚಿತ ಚಿಕಿತ್ಸೆಗಾಗಿ ಇಟ್ಟುಕೊಳ್ಳಿ.',
      abha_nha: 'ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಪ್ರಾಧಿಕಾರ (ABHA)',
      abha_gov: 'ಭಾರತ ಸರ್ಕಾರ',
      abha_active: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ',
      abha_qr: 'ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
      abha_number_label: 'ಆಭಾ ಸಂಖ್ಯೆ (14-ಅಂಕಿ)',
      abha_phone_label: 'ಲಿಂಕ್ ಆದ ಫೋನ್',
      btn_print_abha: '🖨️ ಆಭಾ ಕಾರ್ಡ್ ಪ್ರಿಂಟ್ ಮಾಡಿ',
      read_aloud: '🔊 ಓದಿ ಕೇಳಿ',
      triage_title: '🩺 ಲಕ್ಷಣ ಪರೀಕ್ಷೆ & ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ',
      triage_subtitle: 'ಸಮಸ್ಯೆಯನ್ನು ಆರಿಸಿ ತಕ್ಷಣದ ಸೂಕ್ತ ಸಲಹೆ ಪಡೆಯಿರಿ:',
      sym_fever: 'ತೀವ್ರ ಜ್ವರ',
      sym_snakebite: 'ಹಾವು ಕಡಿತ',
      sym_diarrhea: 'ಅತಿಸಾರ & ವಾಂತಿ',
      sym_pregnancy: 'ಹೆರಿಗೆ ನೋವು',
      sym_chestpain: 'ಎದೆ ನೋವು',
      sym_breathing: 'ಉಸಿರಾಟದ ತೊಂದರೆ',
      meds_title: '💊 ಜನ ಔಷಧಿ ಉಳಿತಾಯ ಯೋಜನೆ',
      meds_desc: 'ಜನ ಔಷಧಿಯೊಂದಿಗೆ 80% ವರೆಗೆ ಹಣ ಉಳಿಸಿ. ಸಮಾನ ಗುಣಮಟ್ಟ, ಕಡಿಮೆ ಬೆಲೆ.',
      dose_morning: '☀️ ಬೆಳಿಗ್ಗೆ',
      dose_noon: '🌤️ ಮಧ್ಯಾಹ್ನ',
      dose_night: '🌙 ರಾತ್ರಿ',
      dose_taken: '✓ ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ',
      saved_text: 'ಉಳಿತಾಯವಾಗಿದೆ',
      family_title: '👨‍👩‍👧 ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ',
      btn_add_family: '+ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ',
      hospitals_title: '🏥 ಸಮೀಪದ ಆಸ್ಪತ್ರೆ, ಬೆಡ್ & ರಕ್ತನಿಧಿ',
      blood_title: '🩸 ರಕ್ತದ ದಾಸ್ತಾನು ಲಭ್ಯತೆ (ಎಲ್ಲಾ ಗುಂಪುಗಳು)',
      gen_beds: 'ಸಾಮಾನ್ಯ ಬೆಡ್‌ಗಳು',
      icu_beds: 'ಐಸಿಯು ಬೆಡ್‌ಗಳು',
      oxy_beds: 'ಆಮ್ಲಜನಕ ಬೆಡ್‌ಗಳು',
      avail: 'ಲಭ್ಯವಿದೆ',
      in_stock: '✓ ಲಭ್ಯವಿದೆ',
      low_stock: '⚠️ ಕಡಿಮೆ ದಾಸ್ತಾನು',
      doc_queue_title: '📋 ರೋಗಿಗಳ ಸರತಿ ಸಾಲು',
      btn_add_walkin: '+ ರೋಗಿ ಸೇರಿಸಿ',
      doc_rx_title: '📝 ಇತ್ತೀಚಿನ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳು',
      asha_anc_title: '🤰 ಗರ್ಭಿಣಿಯರ ದಾಖಲೆ (ANC)',
      btn_add_anc: '+ ಗರ್ಭಿಣಿ ನೋಂದಣಿ',
      asha_uip_title: '💉 ಲಸಿಕೆ ದಾಖಲೆ (UIP)',
      asha_visits_title: '🏡 ಗ್ರಾಮ ಭೇಟಿಗಳು',
      admin_kpi_title: '📊 ಆರೋಗ್ಯ ಕಮಾಂಡ್ ಸೆಂಟರ್',
      kpi_staff: 'ಸಕ್ರಿಯ ಸಿಬ್ಬಂದಿ',
      kpi_queue: 'ಸರತಿ ಸಂಖ್ಯೆ',
      kpi_anc: 'ಗರ್ಭಿಣಿಯರು',
      kpi_beds: 'ಲಭ್ಯ ಬೆಡ್‌ಗಳು',
      admin_staff_title: '👥 ಆರೋಗ್ಯ ಸಿಬ್ಬಂದಿ ಪಟ್ಟಿ',
      admin_beds_title: '🏥 ಆಸ್ಪತ್ರೆ ಬೆಡ್ ಲಭ್ಯತೆ',
      admin_blood_title: '🩸 ರಕ್ತನಿಧಿ ನಿರ್ವಹಣೆ',
      admin_drugs_title: '📦 ಔಷಧಿ ದಾಸ್ತಾನು',
      med_paracetamol: 'ಪ್ಯಾರಸಿಟಮಾಲ್ 650mg (ಜನ ಔಷಧಿ)',
      med_calcium: 'ಕ್ಯಾಲ್ಸಿಯಂ + ವಿಟಮಿನ್ D3 (ಜನ ಔಷಧಿ)',
      med_ifa: 'ಐರನ್ & ಫೋಲಿಕ್ ಆಮ್ಲ (ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ)',
      med_amoxicillin: 'ಅಮೋಕ್ಸಿಸಿಲಿನ್ 500mg (ಜನ ಔಷಧಿ)',
      med_metformin: 'ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500mg (ಜನ ಔಷಧಿ)',
      med_amlodipine: 'ಆಮ್ಲೋಡಿಪಿನ್ 5mg (ಜನ ಔಷಧಿ)',
      med_ors: 'ಒಆರ್‌ಎಸ್ ಪೌಡರ್ ಪ್ಯಾಕೆಟ್',
      med_cetirizine: 'ಸೆಟಿರಿಜಿನ್ 10mg (ಜನ ಔಷಧಿ)',
      cat_fever: 'ಜ್ವರ & ನೋವು ನಿವಾರಕ',
      cat_antibiotic: 'ಪ್ರತಿಜೀವಕ ಸೋಂಕು',
      cat_diabetes: 'ಮಧುಮೇಹ / ಸಕ್ಕರೆ ಕಾಯಿಲೆ',
      cat_bp: 'ರಕ್ತದೊತ್ತಡ / ಬಿಪಿ',
      cat_dehydration: 'ನಿರ್ಜಲೀಕರಣ / ಅತಿಸಾರ',
      cat_maternal: 'ತಾಯಿಯ ಪೋಷಣೆ'
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
      return langDict[key] || (this.dict.en ? this.dict.en[key] : '') || fallback || key;
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

      // Re-render all views in the selected language
      if (typeof window.renderActivePortalView === 'function') {
        window.renderActivePortalView();
      }
      if (global.patientController) global.patientController.renderAll();
      if (global.doctorController) global.doctorController.init();
      if (global.workerController) global.workerController.renderAll();
      if (global.adminController) global.adminController.renderAll();

      // Update theme button text in new language
      const curTheme = document.body.getAttribute('data-theme') || 'classic';
      const themeBtn = document.getElementById('themeToggleBtn');
      if (themeBtn) {
        themeBtn.textContent = this.get('theme_' + curTheme);
      }
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
    if (global.aiHealthBot && typeof global.aiHealthBot.setLanguage === 'function') {
      global.aiHealthBot.setLanguage(lang);
    }
    const names = { en: 'English', hi: 'हिंदी', te: 'తెలుగు', ta: 'தமிழ்', mr: 'मराठी', bn: 'বাংলা', kn: 'ಕನ್ನಡ' };
    if (typeof window.toast === 'function') {
      window.toast('🌐 ' + (names[lang] || lang));
    }
  };

  const i18n = new I18nEngine();
  global.i18n = i18n;

  // Global Audio Assistant Controller (Start / Stop)
  global.isAudioPlaying = false;

  global.startReadAloud = function(customText) {
    if (!('speechSynthesis' in window)) {
      if (typeof window.toast === 'function') window.toast('Speech synthesis not supported on this device.');
      return;
    }

    window.speechSynthesis.cancel();

    let textToRead = customText;
    if (!textToRead) {
      // Default: Read current screen summary in active regional language
      const session = global.appStore ? global.appStore.getState().session : {};
      const role = session && session.isLoggedIn ? session.role : 'gateway';
      const lang = global.i18n ? global.i18n.currentLang : 'en';

      const screenSummaries = {
        en: {
          gateway: 'Welcome to Swasthya Setu Rural Healthcare Grid. Please select your role to log in: Citizen, Doctor, ASHA, or Admin.',
          patient: 'Citizen Hub: Your digital ABHA health card is active. 108 Emergency SOS and Jan Aushadhi generic medicines are available.',
          doctor: 'Doctor Clinic Desk: Teleconsultation OPD queue is ready with active patients waiting.',
          worker: 'ASHA Frontline Portal: High-risk pregnancy register and child immunization schedules are open.',
          admin: 'District Health Command Center: Real-time hospital beds, blood units, and staff are active.'
        },
        hi: {
          gateway: 'स्वास्थ्य सेतु ग्रामीण स्वास्थ्य ग्रिड में आपका स्वागत है। लॉगिन करने के लिए अपना पोर्टल चुनें: नागरिक, डॉक्टर, आशा या प्रशासन।',
          patient: 'नागरिक पोर्टल: आपका डिजिटल आभा कार्ड सक्रिय है। 108 आपातकालीन सेवा और जन औषधि दवाइयां उपलब्ध हैं।',
          doctor: 'चिकित्सक ओपीडी पोर्टल: मरीज कतार तैयार है और परामर्श के लिए उपलब्ध है।',
          worker: 'आशा दीदी फील्ड पोर्टल: गर्भवती महिला रजिस्टर और बाल टीकाकरण खुला है।',
          admin: 'जिला स्वास्थ्य प्रशासन: अस्पताल बेड, ब्लड बैंक और स्वास्थ्य कर्मी सक्रिय हैं।'
        },
        te: {
          gateway: 'స్వాస్థ్య సేతు గ్రామీణ ఆరోగ్య గ్రిడ్‌కు స్వాగతం. మీ పోర్టల్‌ను ఎంచుకోండి.',
          patient: 'పౌరుల పోర్టల్: మీ డిజిటల్ ఆభా హెల్త్ కార్డు సిద్ధంగా ఉంది. 108 ఎమర్జెన్సీ అందుబాటులో ఉంది.',
          doctor: 'వైద్యుల క్లినిక్: ఓపీడీ రోగుల క్యూ సిద్ధంగా ఉంది.',
          worker: 'ఆశా ఫ్రంట్‌లైన్ పోర్టల్: గర్భిణీల రికార్డు మరియు టీకాల వివరాలు ఉన్నాయి.',
          admin: 'ఆరోగ్య పరిపాలన: ఆసుపత్రి బెడ్లు మరియు బ్లడ్ బ్యాంక్ వివరాలు అందుబాటులో ఉన్నాయి.'
        },
        ta: {
          gateway: 'சுவஸ்த்யா சேது கிராமப்புற சுகாதார கட்டமைப்புக்கு நல்வரவு.',
          patient: 'நோயாளி போர்டல்: உங்கள் டிஜிட்டல் ஆபா அட்டை மற்றும் 108 அவசர உதவி தயாராக உள்ளது.',
          doctor: 'மருத்துவர் மருத்துவ போர்டல்: நோயாளி வரிசை தயாராக உள்ளது.',
          worker: 'ஆஷா களப்பணி போர்டல்: கர்ப்பிணி பெண்கள் மற்றும் தடுப்பூசி பதிவேடு தயாராக உள்ளது.',
          admin: 'சுகாதார நிர்வாகம்: மருத்துவமனை படுக்கை மற்றும் ரத்த வங்கி விவரங்கள் தயாராக உள்ளன.'
        },
        mr: {
          gateway: 'स्वास्थ्य सेतू ग्रामीण आरोग्य ग्रिड मध्ये आपले स्वागत आहे.',
          patient: 'नागरिक पोर्टल: आपले डिजिटल आभा कार्ड आणि १०८ रुग्णवाहिका सेवा उपलब्ध आहे.',
          doctor: 'डॉक्टर क्लिनिकल पोर्टल: ओपीडी रुग्ण रांग उपलब्ध आहे.',
          worker: 'आशा सेविका पोर्टल: गरोदर माता नोंदवही आणि बाल लसीकरण उपलब्ध आहे.',
          admin: 'आरोग्य प्रशासन: रुग्णालय बेड आणि रक्तपेढी साठा उपलब्ध आहे.'
        },
        bn: {
          gateway: 'স্বাস্থ্য সেতু গ্রামীণ স্বাস্থ্যসেবা গ্রিডে স্বাগতম।',
          patient: 'নাগরিক পোর্টাল: আপনার ডিজিটাল আভা কার্ড ও ১০৮ জরুরি সেবা সক্রিয়।',
          doctor: 'ডাক্তার ক্লিনিক্যাল পোর্টাল: ওপিডি রোগী তালিকা প্রস্তুত।',
          worker: 'আশা কর্মী পোর্টাল: গর্ভবতী মা ও শিশু টিকাদান রেকর্ড প্রস্তুত।',
          admin: 'স্বাস্থ্য প্রশাসন: হাসপাতালের বেড ও ব্লাড ব্যাংক তথ্য প্রস্তুত।'
        },
        kn: {
          gateway: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಜಾಲಕ್ಕೆ ಸುಸ್ವಾಗತ.',
          patient: 'ನಾಗರಿಕ ಪೋರ್ಟಲ್: ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಆಭಾ ಕಾರ್ಡ್ ಮತ್ತು 108 ತುರ್ತು ಸೇವೆ ಸಿದ್ಧವಾಗಿದೆ.',
          doctor: 'ವೈದ್ಯರ ಕ್ಲಿನಿಕ್: ರೋಗಿಗಳ ಸರತಿ ಸಾಲು ಸಿದ್ಧವಾಗಿದೆ.',
          worker: 'ಆಶಾ ಕ್ಷೇತ್ರ ಪೋರ್ಟಲ್: ಗರ್ಭಿಣಿಯರ ಮತ್ತು ಲಸಿಕೆ ದಾಖಲೆ ಸಿದ್ಧವಾಗಿದೆ.',
          admin: 'ಆರೋಗ್ಯ ಆಡಳಿತ: ಆಸ್ಪತ್ರೆ ಬೆಡ್ ಮತ್ತು ರಕ್ತನಿಧಿ ವಿವರಗಳು ಲಭ್ಯವಿದೆ.'
        }
      };

      const langMap = screenSummaries[lang] || screenSummaries.en;
      textToRead = langMap[role] || langMap.gateway || 'Swasthya Setu';
    }

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

    const utter = new SpeechSynthesisUtterance(textToRead);
    utter.lang = langLocales[lang] || 'en-IN';
    utter.rate = 0.90;
    utter.pitch = 1.0;

    utter.onstart = function() {
      global.isAudioPlaying = true;
      updateAudioButtonUI(true);
      if (typeof window.toast === 'function') {
        window.toast('🔊 ' + textToRead.slice(0, 35) + '...');
      }
    };

    utter.onend = function() {
      global.isAudioPlaying = false;
      updateAudioButtonUI(false);
    };

    utter.onerror = function() {
      global.isAudioPlaying = false;
      updateAudioButtonUI(false);
    };

    window.speechSynthesis.speak(utter);
  };

  global.stopReadAloud = function() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    global.isAudioPlaying = false;
    updateAudioButtonUI(false);
    if (typeof window.toast === 'function') {
      window.toast('⏹️ Audio Stopped');
    }
  };

  global.toggleReadAloud = function() {
    if (global.isAudioPlaying || (window.speechSynthesis && window.speechSynthesis.speaking)) {
      global.stopReadAloud();
    } else {
      global.startReadAloud();
    }
  };

  function updateAudioButtonUI(isPlaying) {
    const btn = document.getElementById('globalAudioToggleBtn');
    if (!btn) return;
    if (isPlaying) {
      btn.style.background = '#dc2626';
      btn.style.color = '#ffffff';
      btn.innerHTML = '<span>⏹️</span> <span data-i18n="btn_stop_audio">Stop Voice</span>';
    } else {
      btn.style.background = 'var(--glass-2)';
      btn.style.color = 'var(--ink)';
      btn.innerHTML = '<span>🔊</span> <span data-i18n="btn_read_aloud">Read Aloud</span>';
    }
    if (global.i18n) global.i18n.applyTranslations(global.i18n.currentLang);
  }


  
  global.localizeComplaintText = function(text, lang) {
    if (!text) return '';
    lang = lang || (global.i18n ? global.i18n.currentLang : 'en');
    if (lang === 'en') return text;

    const dict = {
      'High Fever & Body Ache for 3 Days': {
        hi: '3 दिनों से तेज बुखार और शरीर दर्द',
        te: '3 రోజులుగా తీవ్ర జ్వరం మరియు ఒంటి నొప్పులు',
        ta: '3 நாட்களாக கடுமையான காய்ச்சல் மற்றும் உடல் வலி',
        mr: '३ दिवसांपासून तीव्र ताप आणि अंगदुखी',
        bn: '৩ দিন ধরে উচ্চ জ্বর ও শরীর ব্যথা',
        kn: '3 ದಿನಗಳಿಂದ ತೀವ್ರ ಜ್ವರ ಮತ್ತು ಮೈಕೈ ನೋವು'
      },
      '2nd Trimester Routine Check & Mild Dizziness': {
        hi: 'द्वितीय तिमाही नियमित जांच व हल्का चक्कर',
        te: '2వ త్రైమాసిక సాధారణ తనిఖీ & స్వల్ప తలతిరుగుడు',
        ta: '2வது மூன்று மாத வழக்கமான பரிசோதனை & லேசான தலைசுற்றல்',
        mr: 'दुसऱ्या तिमाहीची नियमित तपासणी व हलकी चक्कर',
        bn: 'দ্বিতীয় ত্রৈমাসিক নিয়মিত পরীক্ষা ও হালকা মাথা ঘোরা',
        kn: '2 ನೇ ತ್ರೈಮಾಸಿಕದ ನಿಯಮಿತ ತಪಾಸಣೆ ಮತ್ತು ಲಘು ತಲೆತಿರುಗುವಿಕೆ'
      },
      'Chest Tightness & Breathlessness on Exertion': {
        hi: 'छाती में जकड़न व चलने पर सांस फूलना',
        te: 'ఛాతీలో బిగుతు & ఆయాసం',
        ta: 'நெஞ்சு இறுக்கம் & மூச்சுத்திணறல்',
        mr: 'छातीत भरून येणे आणि धाप लागणे',
        bn: 'বুকে টান ও হাঁপ ধরা',
        kn: 'ಎದೆ ಬಿಗಿತ ಮತ್ತು ಉಸಿರಾಟದ ತೊಂದರೆ'
      }
    };

    if (dict[text] && dict[text][lang]) return dict[text][lang];
    return global.localizeRxText ? global.localizeRxText(text, lang) : text;
  };

  global.localizeRxText = function(text, lang) {
    if (!text) return '';
    lang = lang || (global.i18n ? global.i18n.currentLang : 'en');
    if (lang === 'en') return text;

    const dict = {
      // Diagnoses
      
      'ANC Routine Checkup': {
        hi: 'नियमित प्रसवपूर्व जांच (ANC)',
        te: 'సాధారణ గర్భధారణ తనిఖీ (ANC)',
        ta: 'வழக்கமான கர்ப்பகால பரிசோதனை (ANC)',
        mr: 'नियमित प्रसूतीपूर्व तपासणी (ANC)',
        bn: 'নিয়মিত প্রসবপূর্ব পরীক্ষা (ANC)',
        kn: 'ನಿಯಮಿತ ಗರ್ಭಾವಸ್ಥೆಯ ತಪಾಸಣೆ (ANC)'
      },
      'Cardiac Evaluation': {
        hi: 'हृदय स्वास्थ्य मूल्यांकन',
        te: 'గుండె ఆరోగ్య పరీక్ష',
        ta: 'இதய நல பரிசோதனை',
        mr: 'हृदय तपासणी व मूल्यांकन',
        bn: 'হৃদযন্ত্র পরীক্ষা ও মূল্যায়ন',
        kn: 'ಹೃದಯ ಆರೋಗ್ಯ ಮೌಲ್ಯಮಾಪನ'
      },
      'Acute Viral Fever with Myalgia': {
        hi: 'तीव्र वायरल बुखार एवं शरीर दर्द',
        te: 'తీవ్రమైన వైరల్ జ్వరం మరియు ఒంటి నొప్పులు',
        ta: 'கடுமையான வைரஸ் காய்ச்சல் மற்றும் உடல் வலி',
        mr: 'तीव्र व्हायरल ताप आणि अंगदुखी',
        bn: 'তীব্র ভাইরাল জ্বর ও শরীর ব্যথা',
        kn: 'ತೀವ್ರ ವೈರಲ್ ಜ್ವರ ಮತ್ತು ಮೈಕೈ ನೋವು'
      },
      'Acute Viral Fever': {
        hi: 'तीव्र वायरल बुखार',
        te: 'తీవ్రమైన వైరల్ జ్వరం',
        ta: 'கடுமையான வைரஸ் காய்ச்சல்',
        mr: 'तीव्र व्हायरल ताप',
        bn: 'তীব্র ভাইরাল জ্বর',
        kn: 'ತೀವ್ರ ವೈರಲ್ ಜ್ವರ'
      },
      'Clinical Review': {
        hi: 'सामान्य स्वास्थ्य परीक्षण',
        te: 'సాధారణ ఆరోగ్య పరీక్ష',
        ta: 'பொது மருத்துவ பரிசோதனை',
        mr: 'सामान्य आरोग्य तपासणी',
        bn: 'সাধারণ স্বাস্থ্য পর্যালোচনা',
        kn: 'ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ'
      },
      'High Fever & Weakness': {
        hi: 'तेज बुखार और शारीरिक कमजोरी',
        te: 'తీవ్ర జ్వరం మరియు బలహీనత',
        ta: 'அதிக காய்ச்சல் மற்றும் சோர்வு',
        mr: 'तीव्र ताप आणि अशक्तपणा',
        bn: 'উচ্চ জ্বর ও দুর্বলতা',
        kn: 'ತೀವ್ರ ಜ್ವರ ಮತ್ತು ದೌರ್ಬಲ್ಯ'
      },
      'General Checkup': {
        hi: 'सामान्य स्वास्थ्य जांच',
        te: 'సాధారణ ఆరోగ్య తనిఖీ',
        ta: 'பொது உடற்பரிசோதனை',
        mr: 'सामान्य आरोग्य तपासणी',
        bn: 'সাধারণ স্বাস্থ্য পরীক্ষা',
        kn: 'ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ತಪಾಸಣೆ'
      },

      // Medicines
      'Paracetamol 650mg (Jan Aushadhi)': {
        hi: 'पैरासिटामोल 650mg (जन औषधि)',
        te: 'పారాసిటమాల్ 650mg (జన్ ఔషధి)',
        ta: 'பாராசிட்டமால் 650mg (ஜன் ஔஷதி)',
        mr: 'पॅरासिटामॉल 650mg (जन औषधी)',
        bn: 'প্যারাসিটামল 650mg (জন ঔষধি)',
        kn: 'ಪ್ಯಾರಸಿಟಮಾಲ್ 650mg (ಜನ ಔಷಧಿ)'
      },
      'Cetirizine 10mg (Jan Aushadhi)': {
        hi: 'सेट्रीजीन 10mg (जन औषधि)',
        te: 'సెటిరిజిన్ 10mg (జన్ ఔషధి)',
        ta: 'செட்ரிசின் 10mg (ஜன் ஔஷதி)',
        mr: 'सेट्रीझिन 10mg (जन औषधी)',
        bn: 'সেটিরিজিন 10mg (জন ঔষধি)',
        kn: 'ಸೆಟಿರಿಜಿನ್ 10mg (ಜನ ಔಷಧಿ)'
      },
      'ORS Sachet Powder': {
        hi: 'ओआरएस पाउडर पैकेट',
        te: 'ఓఆర్ఎస్ పౌడర్ ప్యాకెట్',
        ta: 'ஓஆர்எஸ் பொடி பாக்கெட்',
        mr: 'ओआरएस पावडर पॅकेट',
        bn: 'ওআরএস স্যালাইন প্যাকেট',
        kn: 'ಒಆರ್‌ಎಸ್ ಪೌಡರ್ ಪ್ಯಾಕೆಟ್'
      },
      'Amoxicillin 500mg': {
        hi: 'अमोक्सिसिलिन 500mg (जन औषधि)',
        te: 'అమోక్సిసిలిన్ 500mg (జన్ ఔషధి)',
        ta: 'அமோக்சிசிலின் 500mg (ஜன் ஔஷதி)',
        mr: 'अमोक्सिसिलिन 500mg (जन औषधी)',
        bn: 'অ্যামোক্সিসিলিন 500mg (জন ঔষধি)',
        kn: 'ಅಮೋಕ್ಸಿಸಿಲಿನ್ 500mg (ಜನ ಔಷಧಿ)'
      },
      'Metformin 500mg': {
        hi: 'मेटफॉर्मिन 500mg (जन औषधि)',
        te: 'మెట్‌ఫార్మిన్ 500mg (జన్ ఔషధి)',
        ta: 'மெட்பார்மின் 500mg (ஜன் ஔஷதி)',
        mr: 'मेटफॉर्मिन 500mg (जन औषधी)',
        bn: 'মেটফর্মিন 500mg (জন ঔষধি)',
        kn: 'ಮೆಟ್‌ಫಾರ್ಮಿನ್ 500mg (ಜನ ಔಷಧಿ)'
      },
      'Amlodipine 5mg': {
        hi: 'एम्लोडिपिन 5mg (जन औषधि)',
        te: 'ఆమ్లోడిపైన్ 5mg (జన్ ఔషధి)',
        ta: 'அம்லோடிபின் 5mg (ஜன் ஔஷதி)',
        mr: 'ॲम्लोडिपिन 5mg (जन औषधी)',
        bn: 'অ্যামলোডিপাইন 5mg (জন ঔষধি)',
        kn: 'ಆಮ್ಲೋಡಿಪಿನ್ 5mg (ಜನ ಔಷಧಿ)'
      },

      // Dosages
      '1 tab 3 times daily after food for 3 days': {
        hi: '1 गोली दिन में 3 बार भोजन के बाद (3 दिन)',
        te: '1 మాత్ర రోజుకు 3 సార్లు భోజనం తర్వాత (3 రోజులు)',
        ta: '1 மாத்திரை உணவுக்குப் பிறகு தினமும் 3 முறை (3 நாட்கள்)',
        mr: '1 गोळी जेवणानंतर दिवसातून ३ वेळा (३ दिवस)',
        bn: '১টি ট্যাবলেট খাবারের পর দিনে ৩ বার (৩ দিন)',
        kn: '1 ಮಾತ್ರೆ ಊಟದ ನಂತರ ದಿನಕ್ಕೆ 3 ಬಾರಿ (3 ದಿನಗಳು)'
      },
      '1 tab at night for 3 days': {
        hi: '1 गोली रात को सोते समय (3 दिन)',
        te: '1 మాత్ర రాత్రి నిద్రపోయే ముందు (3 రోజులు)',
        ta: '1 மாத்திரை இரவில் படுக்கும் முன் (3 நாட்கள்)',
        mr: '1 गोळी रात्री झोपताना (३ दिवस)',
        bn: '১টি ট্যাবলেট রাতে ঘুমানোর আগে (৩ দিন)',
        kn: '1 ಮಾತ್ರೆ ರಾತ್ರಿ ಮಲಗುವ ಮುನ್ನ (3 ದಿನಗಳು)'
      },
      '1 packet in 1 liter clean water, sip frequently': {
        hi: '1 पैकेट 1 लीटर स्वच्छ पानी में घोलकर घूंट-घूंट पिएं',
        te: '1 ప్యాకెట్ 1 లీటరు శుభ్రమైన నీటిలో కలిపి తరచుగా తాగండి',
        ta: '1 பாக்கெட் 1 லிட்டர் சுத்தமான நீரில் கலந்து அவ்வப்போது குடிக்கவும்',
        mr: '1 पाकीट 1 लिटर स्वच्छ पाण्यात मिसळून थोडे थोडे प्या',
        bn: '১ প্যাকেট ১ লিটার পরিষ্কার জলে গুলে ঘন ঘন পান করুন',
        kn: '1 ಪ್ಯಾಕೆಟ್ 1 ಲೀಟರ್ ಶುದ್ಧ ನೀರಿನಲ್ಲಿ ಬೆರೆಸಿ ಆಗಾಗ ಕುಡಿಯಿರಿ'
      },
      '1 tablet 3 times a day after meals': {
        hi: '1 गोली दिन में 3 बार भोजन के बाद',
        te: '1 మాత్ర రోజుకు 3 సార్లు భోజనం తర్వాత',
        ta: '1 மாத்திரை உணவுக்குப் பிறகு தினமும் 3 முறை',
        mr: '1 गोळी जेवणानंतर दिवसातून ३ वेळा',
        bn: '১টি ট্যাবলেট খাবারের পর দিনে ৩ বার',
        kn: '1 ಮಾತ್ರೆ ಊಟದ ನಂತರ ದಿನಕ್ಕೆ 3 ಬಾರಿ'
      },
      '1 tablet twice daily': {
        hi: '1 गोली दिन में 2 बार (सुबह-शाम)',
        te: '1 మాత్ర రోజుకు 2 సార్లు (ఉదయం-సాయంత్రం)',
        ta: '1 மாத்திரை தினமும் 2 முறை (காலை-இரவு)',
        mr: '1 गोळी दिवसातून २ वेळा (सकाळ-संध्याकाळ)',
        bn: '১টি ট্যাবলেট দিনে ২ বার (সকাল-রাত)',
        kn: '1 ಮಾತ್ರೆ ದಿನಕ್ಕೆ 2 ಬಾರಿ (ಬೆಳಿಗ್ಗೆ-ಸಂಜೆ)'
      },

      // Advice
      'Take clean boiled water, rest well. Report back if fever persists beyond 3 days.': {
        hi: 'उबला हुआ साफ पानी पिएं और पर्याप्त विश्राम करें। यदि बुखार 3 दिन से अधिक रहे तो पुनः जांच कराएं।',
        te: 'కాచి చల్లార్చిన నీటిని తాగండి, తగినంత విశ్రాంతి తీసుకోండి. జ్వరం 3 రోజులకు మించి ఉంటే తిరిగి రండి.',
        ta: 'சுத்தமான காய்ச்சிய நீரைக் குடிக்கவும், நன்றாக ஓய்வெடுக்கவும். காய்ச்சல் 3 நாட்களுக்கு மேல் நீடித்தால் மீண்டும் வரவும்.',
        mr: 'उकळलेले स्वच्छ पाणी प्या आणि विश्रांती घ्या. ३ दिवसांनंतरही ताप राहिल्यास पुन्हा भेटा.',
        bn: 'ফোটানো জল পান করুন এবং পর্যাপ্ত বিশ্রাম নিন। ৩ দিনের বেশি জ্বর থাকলে আবার ডাক্তার দেখান।',
        kn: 'ಕುದಿಸಿ ಆರಿಸಿದ ಶುದ್ಧ ನೀರನ್ನು ಕುಡಿಯಿರಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ. ಜ್ವರ 3 ದಿನಗಳಿಗಿಂತ ಹೆಚ್ಚಿದ್ದರೆ ಮತ್ತೆ ಭೇಟಿ ನೀಡಿ.'
      },
      'Drink plenty of clean boiled water. Rest well.': {
        hi: 'उबला हुआ साफ पानी पिएं और अच्छा विश्राम करें।',
        te: 'కాచి చల్లార్చిన నీరు ఎక్కువగా తాగండి, విశ్రాంతి తీసుకోండి.',
        ta: 'நிறைய காய்ச்சிய நீர் குடிக்கவும். நன்றாக ஓய்வெடுக்கவும்.',
        mr: 'उकळलेले पाणी भरपूर प्या आणि विश्रांती घ्या.',
        bn: 'প্রচুর ফোটানো জল পান করুন ও বিশ্রাম নিন।',
        kn: 'ಸಾಕಷ್ಟು ಕುದಿಸಿದ ನೀರನ್ನು ಕುಡಿಯಿರಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.'
      }
    };

    if (dict[text] && dict[text][lang]) {
      return dict[text][lang];
    }
    // Partial substring match fallback
    for (const k in dict) {
      if (text.includes(k) && dict[k][lang]) {
        return text.replace(k, dict[k][lang]);
      }
    }
    return text;
  };


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => i18n.init());
  } else {
    i18n.init();
  }

})(typeof window !== 'undefined' ? window : this);
