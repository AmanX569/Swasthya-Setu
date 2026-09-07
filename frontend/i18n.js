/**
 * =========================================================
 * SWASTHYA SETU - UNIVERSAL MULTILINGUAL TRANSLATION ENGINE (i18n.js)
 * 100% Comprehensive Vernacular Translation for All UI, Gateway & Cards
 * Supported Languages:
 *   - en: English
 *   - hi: हिंदी (Hindi)
 *   - te: తెలుగు (Telugu)
 *   - ta: தமிழ் (Tamil)
 *   - mr: मराठी (Marathi)
 *   - bn: বাংলা (Bengali)
 *   - kn: ಕನ್ನಡ (Kannada)
 * Features:
 *   - Full DOM Text-Node & Attribute Deep Walker (100% reversible, zero data loss)
 *   - Comprehensive Phrase Dictionary covering every page, modal & table
 *   - Vocabulary Word Replacement for compound clinical & administrative phrases
 *   - Reactive MutationObserver & Render Hooks for live dynamic content
 *   - 7-Language Native Speech Synthesis Audio Assistant
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_LANG = 'swasthya_setu_lang';

  // 1. LEGACY & CORE ATTRIBUTE KEY DICTIONARY
  const I18N_DICTIONARY = {
    en: {
      app_title: 'Swasthya Setu',
      app_tagline: 'Rural Healthcare Cloud Grid',
      portal_welcome: 'Welcome to Swasthya Setu',
      portal_subline: 'Select your respected healthcare role to authenticate with verified credentials:',
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
      hospitals_title: '🏥 Nearby Hospitals, Beds & Blood Bank',
      blood_title: '🩸 Blood Bank Stock Availability (All Groups)',
      gen_beds: 'General Beds',
      icu_beds: 'ICU Beds',
      oxy_beds: 'Oxygen Beds',
      avail: 'Available',
      in_stock: '✓ In Stock',
      low_stock: '⚠️ Low',
      doc_queue_title: '📋 Patient Consultation Queue',
      btn_add_walkin: '+ Add Patient',
      doc_rx_title: '📝 Recent Issued e-Prescriptions',
      asha_anc_title: '🤰 High-Risk Pregnancy Tracker (ANC)',
      btn_add_anc: '+ Register Mother',
      asha_uip_title: '💉 Child Universal Immunization (UIP)',
      asha_visits_title: '🏡 Village Daily Home Visits',
      admin_kpi_title: '📊 District Health Administration Command Center',
      kpi_staff: 'Active Staff',
      kpi_queue: 'OPD Queue Load',
      kpi_anc: 'High-Risk ANC',
      kpi_beds: 'Available Beds',
      admin_staff_title: '👥 Healthcare Staff Directory',
      admin_beds_title: '🏥 Hospital Bed & Oxygen Allocation',
      admin_blood_title: '🩸 Blood Bank Supply Chain',
      admin_drugs_title: '📦 Essential Drug Inventory',
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
      btn_print_rx: 'Print Rx'
    },
    hi: {
      app_title: 'स्वास्थ्य सेतु',
      app_tagline: 'ग्रामीण स्वास्थ्य क्लाउड ग्रिड',
      portal_welcome: 'स्वास्थ्य सेतु में आपका स्वागत है',
      portal_subline: 'सत्यापित क्रेडेंशियल्स के साथ प्रमाणित करने के लिए अपनी सम्मानित स्वास्थ्य सेवा भूमिका चुनें:',
      login_patient_title: 'नागरिक / मरीज पोर्टल',
      login_patient_desc: 'डिजिटल आभा कार्ड, 108 आपातकालीन एसओएस, जन औषधि जेनेरिक दवाइयां, लक्षण जांच और पारिवारिक स्वास्थ्य।',
      login_doctor_title: 'चिकित्सक क्लिनिकल पोर्टल',
      login_doctor_desc: 'टेलीकंसल्टेशन ओपीडी कतार, नैदानिक वाइटल्स समीक्षा और त्वरित डिजिटल ई-प्रिस्क्रिप्शन।',
      login_worker_title: 'आशा अग्रिम पंक्ति पोर्टल',
      login_worker_desc: 'मातृ एएनसी रजिस्टर, बाल सार्वभौमिक टीकाकरण (यूआईपी) और दैनिक ग्रामीण गृह भ्रमण।',
      login_admin_title: 'स्वास्थ्य प्रशासक पोर्टल',
      login_admin_desc: 'अस्पताल बिस्तर ग्रिड, ब्लड बैंक स्टॉक, स्वास्थ्य सेवा कर्मचारी रजिस्ट्री और दवा आपूर्ति प्रबंधन।',
      btn_enter_portal: 'पोर्टल में प्रवेश करें',
      btn_quick_access: '⚡ 1-टैप त्वरित प्रवेश',
      btn_logout: '🚪 लॉग आउट / पोर्टल बदलें',
      logged_in_as: 'सक्रिय सत्र',
      role_patient: '🌾 नागरिक',
      role_doctor: '🩺 चिकित्सक',
      role_worker: '🤝 आशा',
      role_admin: '👑 प्रशासक',
      theme_classic: '🏛️ क्लासिक (सफेद और नीला)',
      theme_black: '⬛ ब्लैक (ग्लास)',
      theme_navy: '🌊 नेवी (ग्लास)',
      btn_sos: '🚨 108 एसओएस',
      emergency_banner: '🚑 आपातकालीन 108 एम्बुलेंस एसओएस — कॉल करने या जीपीएस भेजने के लिए टैप करें',
      emergency_subline: 'निकटतम ग्रामीण आपातकालीन प्रेषण केंद्र से सीधा संपर्क',
      btn_call_108: '📞 108 पर कॉल करें',
      btn_gps_sos: '📍 जीपीएस एसओएस',
      abha_title: '🆔 डिजिटल आभा स्वास्थ्य कार्ड',
      abha_desc: 'आपका राष्ट्रीय स्वास्थ्य पहचान पत्र। निःशुल्क परामर्श और अस्पताल यात्राओं के लिए इसे संभाल कर रखें।',
      abha_nha: 'राष्ट्रीय स्वास्थ्य प्राधिकरण (ABHA)',
      abha_gov: 'भारत सरकार',
      abha_active: 'सत्यापित सक्रिय',
      abha_qr: 'क्यूआर स्कैन',
      abha_number_label: 'आभा संख्या (14-अंकीय)',
      abha_phone_label: 'लिंक किया गया फोन',
      btn_print_abha: '🖨️ आभा कार्ड प्रिंट / डाउनलोड करें',
      read_aloud: '🔊 आवाज़ में सुनें',
      triage_title: '🩺 दृश्य एआई लक्षण जांच',
      triage_subtitle: 'त्वरित प्राथमिक चिकित्सा और आपातकालीन सलाह के लिए अपने लक्षण पर टैप करें:',
      sym_fever: 'तेज़ बुखार',
      sym_snakebite: 'सर्पदंश',
      sym_diarrhea: 'दस्त और उल्टी',
      sym_pregnancy: 'गर्भावस्था प्रसव पीड़ा',
      sym_chestpain: 'सीने में दर्द',
      sym_breathing: 'सांस लेने में तकलीफ',
      meds_title: '💊 जन औषधि जेनेरिक दवा बचत',
      meds_desc: 'प्रधानमंत्री जन औषधि जेनेरिक दवाओं के साथ 80% तक की बचत करें।',
      dose_morning: '☀️ सुबह',
      dose_noon: '🌤️ दोपहर',
      dose_night: '🌙 रात',
      dose_taken: '✓ ले ली गई',
      saved_text: 'बचत हुई',
      family_title: '👨‍👩‍👧 पारिवारिक स्वास्थ्य मंडल',
      btn_add_family: '+ सदस्य जोड़ें',
      hospitals_title: '🏥 निकटवर्ती अस्पताल, बिस्तर और ब्लड बैंक',
      blood_title: '🩸 ब्लड बैंक स्टॉक उपलब्धता (सभी समूह)',
      gen_beds: 'सामान्य बिस्तर',
      icu_beds: 'आईसीयू बिस्तर',
      oxy_beds: 'ऑक्सीजन बिस्तर',
      avail: 'उपलब्ध',
      in_stock: '✓ उपलब्ध है',
      low_stock: '⚠️ कम स्टॉक',
      doc_queue_title: '📋 मरीज परामर्श कतार',
      btn_add_walkin: '+ मरीज जोड़ें',
      doc_rx_title: '📝 हाल ही में जारी ई-प्रिस्क्रिप्शन',
      asha_anc_title: '🤰 उच्च जोखिम गर्भावस्था ट्रैकर (ANC)',
      btn_add_anc: '+ गर्भवती माता पंजीकरण',
      asha_uip_title: '💉 सार्वभौमिक बाल टीकाकरण (UIP)',
      asha_visits_title: '🏡 ग्रामीण दैनिक गृह भ्रमण',
      admin_kpi_title: '📊 जिला स्वास्थ्य प्रशासन कमांड सेंटर',
      kpi_staff: 'सक्रिय कर्मचारी',
      kpi_queue: 'ओपीडी कतार लोड',
      kpi_anc: 'उच्च जोखिम एएनसी',
      kpi_beds: 'उपलब्ध बिस्तर',
      admin_staff_title: '👥 स्वास्थ्य सेवा कर्मचारी निर्देशिका',
      admin_beds_title: '🏥 अस्पताल बिस्तर और ऑक्सीजन प्रबंधन',
      admin_blood_title: '🩸 ब्लड बैंक आपूर्ति श्रृंखला',
      admin_drugs_title: '📦 आवश्यक दवा सूची',
      consult_modal_title: 'परामर्श और ई-प्रिस्क्रिप्शन',
      consulting_label: 'परामर्शदाता',
      complaint_label: 'मुख्य समस्या',
      vitals_label: 'वाइटल्स',
      years_short: 'वर्ष',
      label_diagnosis: 'नैदानिक निदान',
      label_primary_med: 'प्राथमिक जेनेरिक दवा',
      label_secondary_med: 'सहायक दवा',
      label_advice: 'चिकित्सक की सलाह व निर्देश',
      btn_generate_rx: '✓ ई-प्रिस्क्रिप्शन जारी करें',
      btn_cancel: 'रद्द करें',
      btn_read_aloud: 'आवाज़ में सुनें',
      btn_stop_audio: 'आवाज़ बंद करें',
      no_patients_queue: 'कतार में कोई मरीज प्रतीक्षारत नहीं है। ऊपर "+ मरीज जोड़ें" पर टैप करें।',
      age_label: 'आयु',
      btn_consult_prescribe: 'परामर्श दें और दवा लिखें',
      no_rx_history: 'हाल ही में कोई प्रिस्क्रिप्शन जारी नहीं किया गया।',
      doctor_label: 'चिकित्सक',
      rx_digital_verified: 'सत्यापित ई-प्रिस्क्रिप्शन',
      rx_diagnosis: 'नैदानिक निदान',
      rx_medicines: 'निर्धारित जेनेरिक दवाएं',
      rx_advice: 'चिकित्सक सलाह',
      btn_print_rx: 'प्रिस्क्रिप्शन प्रिंट करें'
    },
    te: {
      app_title: 'స్వాస్థ్య సేతు',
      app_tagline: 'గ్రామీణ ఆరోగ్య క్లౌడ్ గ్రిడ్',
      portal_welcome: 'స్వాస్థ్య సేతుకు స్వాగతం',
      portal_subline: 'ధృవీకరించబడిన ఆధారాలతో లాగిన్ అవ్వడానికి మీ ఆరోగ్య సంరక్షణ పాత్రను ఎంచుకోండి:',
      login_patient_title: 'పౌరుడు / రోగి పోర్టల్',
      login_patient_desc: 'డిజిటల్ ఆభా హెల్త్ కార్డ్, 108 ఎమర్జెన్సీ SOS, జన్ ఔషధి జెనరిక్ మందులు, లక్షణాల తనిఖీ & కుటుంబ ఆరోగ్యం.',
      login_doctor_title: 'వైద్యుల క్లినికల్ పోర్టల్',
      login_doctor_desc: 'టెలికన్సల్టేషన్ OPD క్యూ, రోగి వైటల్స్ సమీక్ష & తక్షణ డిజిటల్ ఇ-ప్రిస్క్రిప్షన్లు.',
      login_worker_title: 'ఆశా ఫ్రంట్‌లైన్ పోర్టల్',
      login_worker_desc: 'గర్భిణీల ANC రిజిస్టర్, పిల్లల టీకా రోస్టర్ (UIP) & గ్రామ గృహ సందర్శనలు.',
      login_admin_title: 'హెల్త్ అడ్మిన్ పోర్టల్',
      login_admin_desc: 'ఆసుపత్రి బెడ్‌ల లభ్యత, బ్లడ్ బ్యాంక్ నిల్వ, సిబ్బంది రిజిస్ట్రీ & ఔషధ సరఫరా నియంత్రణ.',
      btn_enter_portal: 'పోర్టల్ ప్రవేశించండి',
      btn_quick_access: '⚡ 1-ట్యాప్ శీఘ్ర లాగిన్',
      btn_logout: '🚪 లాగ్ అవుట్ / పోర్టల్ మార్చండి',
      logged_in_as: 'క్రియాశీల సెషన్',
      role_patient: '🌾 పౌరుడు',
      role_doctor: '🩺 వైద్యుడు',
      role_worker: '🤝 ఆశా',
      role_admin: '👑 నిర్వాహకుడు',
      theme_classic: '🏛️ క్లాసిక్ (తెలుపు & నీలం)',
      theme_black: '⬛ ప్యూర్ బ్లాక్ (గ్లాస్)',
      theme_navy: '🌊 డీప్ నేవీ (గ్లాస్)',
      btn_sos: '🚨 108 SOS',
      emergency_banner: '🚑 అత్యవసర 108 అంబులెన్స్ SOS — కాల్ చేయడానికి లేదా GPS పంపడానికి నొక్కండి',
      emergency_subline: 'సమీప గ్రామీణ ఎమర్జెన్సీ డిస్పాచ్ హబ్‌తో ప్రత్యక్ష అనుసంధానం',
      btn_call_108: '📞 108కి కాల్ చేయండి',
      btn_gps_sos: '📍 GPS SOS పంపండి',
      abha_title: '🆔 డిజిటల్ ఆభా హెల్త్ కార్డ్',
      abha_desc: 'మీ జాతీయ ఆరోగ్య గుర్తింపు కార్డు. ఉచిత వైద్యం కోసం దీనిని సిద్ధంగా ఉంచుకోండి.',
      abha_nha: 'నేషనల్ హెల్త్ అథారిటీ (ABHA)',
      abha_gov: 'భారత ప్రభుత్వం',
      abha_active: 'ధృవీకరించబడింది',
      abha_qr: 'QR స్కాన్',
      abha_number_label: 'ఆభా నంబర్ (14-అంకెలు)',
      abha_phone_label: 'లింక్ చేయబడిన ఫోన్',
      btn_print_abha: '🖨️ ఆభా కార్డ్ ప్రింట్ / డౌన్‌లోడ్',
      read_aloud: '🔊 వాయిస్ ద్వారా వినండి',
      triage_title: '🩺 విజువల్ AI లక్షణాల పరీక్ష',
      triage_subtitle: 'తక్షణ ప్రథమ చికిత్స మరియు అత్యవసర సలహా కోసం మీ లక్షణాన్ని ఎంచుకోండి:',
      sym_fever: 'తీవ్ర జ్వరం',
      sym_snakebite: 'పాము కాటు',
      sym_diarrhea: 'విరేచనాలు & వాంతులు',
      sym_pregnancy: 'ప్రసవ నొప్పులు',
      sym_chestpain: 'ఛాతీ నొప్పి',
      sym_breathing: 'శ్వాస తీసుకోవడంలో ఇబ్బంది',
      meds_title: '💊 జన్ ఔషధి జెనరిక్ మందుల పొదుపు',
      meds_desc: 'ప్రధాన మంత్రి జన్ ఔషధి ద్వారా 80% వరకు మందుల ఖర్చు ఆదా చేసుకోండి.',
      dose_morning: '☀️ ఉదయం',
      dose_noon: '🌤️ మధ్యాహ్నం',
      dose_night: '🌙 రాత్రి',
      dose_taken: '✓ వేసుకున్నారు',
      saved_text: 'ఆదా అయింది',
      family_title: '👨‍👩‍👧 కుటుంబ ఆరోగ్య వృత్తం',
      btn_add_family: '+ సభ్యుడిని చేర్చండి',
      hospitals_title: '🏥 సమీప ఆసుపత్రులు, బెడ్‌లు & బ్లడ్ బ్యాంక్',
      blood_title: '🩸 బ్లడ్ బ్యాంక్ నిల్వ (అన్ని గ్రూపులు)',
      gen_beds: 'సాధారణ బెడ్‌లు',
      icu_beds: 'ఐసియు బెడ్‌లు',
      oxy_beds: 'ఆక్సిజన్ బెడ్‌లు',
      avail: 'లభ్యత',
      in_stock: '✓ అందుబాటులో ఉంది',
      low_stock: '⚠️ తక్కువ నిల్వ',
      doc_queue_title: '📋 రోగుల సంప్రదింపుల క్యూ',
      btn_add_walkin: '+ రోగిని చేర్చండి',
      doc_rx_title: '📝 ఇటీవల జారీ చేసిన ఇ-ప్రిస్క్రిప్షన్లు',
      asha_anc_title: '🤰 గర్భిణీల హై-రిస్క్ ట్రాకర్ (ANC)',
      btn_add_anc: '+ గర్భిణీ నమోదు',
      asha_uip_title: '💉 సార్వత్రిక పిల్లల టీకాలు (UIP)',
      asha_visits_title: '🏡 గ్రామ రోజువారీ గృహ సందర్శనలు',
      admin_kpi_title: '📊 జిల్లా ఆరోగ్య కమాండ్ సెంటర్',
      kpi_staff: 'క్రియాశీల సిబ్బంది',
      kpi_queue: 'OPD క్యూ భారం',
      kpi_anc: 'హై-రిస్క్ ANC',
      kpi_beds: 'అందుబాటులో ఉన్న బెడ్‌లు',
      admin_staff_title: '👥 ఆరోగ్య సిబ్బంది డైరెక్టరీ',
      admin_beds_title: '🏥 ఆసుపత్రి బెడ్ & ఆక్సిజన్ కేటాయింపు',
      admin_blood_title: '🩸 బ్లడ్ బ్యాంక్ సరఫరా వ్యవస్థ',
      admin_drugs_title: '📦 అవసరమైన ఔషధాల నిల్వ',
      consult_modal_title: 'సంప్రదింపు & ఇ-ప్రిస్క్రిప్షన్',
      consulting_label: 'రోగి పేరు',
      complaint_label: 'ప్రధాన సమస్య',
      vitals_label: 'వైటల్స్',
      years_short: 'సంవత్సరాలు',
      label_diagnosis: 'క్లినికల్ నిర్ధారణ',
      label_primary_med: 'ప్రధాన జెనరిక్ ఔషధం',
      label_secondary_med: 'సహాయక ఔషధం',
      label_advice: 'వైద్యుల సలహా & సూచనలు',
      btn_generate_rx: '✓ ఇ-ప్రిస్క్రిప్షన్ జారీ చేయండి',
      btn_cancel: 'రద్దు చేయండి',
      btn_read_aloud: 'వాయిస్ ద్వారా వినండి',
      btn_stop_audio: 'వాయిస్ ఆపండి',
      no_patients_queue: 'క్యూలో రోగులు ఎవరూ వేచి లేరు. పైన "+ రోగిని చేర్చండి" నొక్కండి.',
      age_label: 'వయస్సు',
      btn_consult_prescribe: 'సంప్రదించి ప్రిస్క్రిప్షన్ రాయండి',
      no_rx_history: 'ఇటీవల ప్రిస్క్రిప్షన్‌లు ఏవీ జారీ చేయబడలేదు.',
      doctor_label: 'వైద్యుడు',
      rx_digital_verified: 'ధృవీకరించబడిన ఇ-ప్రిస్క్రిప్షన్',
      rx_diagnosis: 'క్లినికల్ నిర్ధారణ',
      rx_medicines: 'సూచించిన జెనరిక్ మందులు',
      rx_advice: 'వైద్యుల సలహా',
      btn_print_rx: 'ప్రిస్క్రిప్షన్ ప్రింట్'
    },
    ta: {
      app_title: 'ஸ்வாஸ்த்ய சேது',
      app_tagline: 'கிராமப்புற சுகாதார கிளவுட் கிரிட்',
      portal_welcome: 'ஸ்வாஸ்த்ய சேதுவிற்கு நல்வரவு',
      portal_subline: 'சரிபார்க்கப்பட்ட சான்றுகளுடன் உள்நுழைய உங்கள் சுகாதாரப் பணியைத் தேர்ந்தெடுக்கவும்:',
      login_patient_title: 'குடிமக்கள் / நோயாளி தளம்',
      login_patient_desc: 'டிஜிட்டல் ஆபா அட்டை, 108 அவசர உதவி, மலிவு விலை மக்கள் மருந்தகம், நோய் அறிகுறி பகுப்பாய்வு & குடும்ப நலம்.',
      login_doctor_title: 'மருத்துவர் பிரிவு',
      login_doctor_desc: 'தொலைமருத்துவ OPD வரிசை, உடல் குறிகாட்டிகள் ஆய்வு & உடனடி டிஜிட்டல் இ-மருந்துச் சீட்டுகள்.',
      login_worker_title: 'ஆஷா களப்பணியாளர் தளம்',
      login_worker_desc: 'கர்ப்பிணிகள் ANC பதிவேடு, குழந்தைகள் தடுப்பூசி திட்டம் (UIP) & தினசரி களப்பயணங்கள்.',
      login_admin_title: 'சுகாதார நிர்வாக போர்டல்',
      login_admin_desc: 'மருத்துவமனை படுக்கைகள், ரத்த வங்கி இருப்பு, பணியாளர்கள் பட்டியல் & மருந்து சரக்கு கட்டுப்பாடு.',
      btn_enter_portal: 'போர்ட்டலில் நுழையுங்கள்',
      btn_quick_access: '⚡ 1-தொடுதலில் விரைவு அணுகல்',
      btn_logout: '🚪 வெளியேறு / போர்ட்டலை மாற்று',
      logged_in_as: 'செயலில் உள்ள அமர்வு',
      role_patient: '🌾 குடிமகன்',
      role_doctor: '🩺 மருத்துவர்',
      role_worker: '🤝 ஆஷா',
      role_admin: '👑 நிர்வாகி',
      theme_classic: '🏛️ கிளாசிக் (வெள்ளை & நீலம்)',
      theme_black: '⬛ பியூர் பிளாக் (கிளாஸ்)',
      theme_navy: '🌊 டீப் நேவி (கிளாஸ்)',
      btn_sos: '🚨 108 அவசர உதவி',
      emergency_banner: '🚑 அவசர 108 ஆம்புலன்ஸ் SOS — அழைக்க அல்லது GPS அனுப்ப தொடவும்',
      emergency_subline: 'அருகிலுள்ள அவசர கட்டுப்பாட்டு மையத்துடன் நேரடி இணைப்பு',
      btn_call_108: '📞 108க்கு அழைக்கவும்',
      btn_gps_sos: '📍 GPS SOS அனுப்புக',
      abha_title: '🆔 டிஜிட்டல் ஆபா சுகாதார அட்டை',
      abha_desc: 'உங்கள் தேசிய சுகாதார அடையாள அட்டை. இலவச மருத்துவ சிகிச்சைக்கு இதை கையில் வைத்திருக்கவும்.',
      abha_nha: 'தேசிய சுகாதார ஆணையம் (ABHA)',
      abha_gov: 'இந்திய அரசு',
      abha_active: 'சரிபார்க்கப்பட்டது',
      abha_qr: 'QR ஸ்கேன்',
      abha_number_label: 'ஆபா எண் (14-இலக்கம்)',
      abha_phone_label: 'இணைக்கப்பட்ட கைபேசி',
      btn_print_abha: '🖨️ ஆபா அட்டையை அச்சிடுக / பதிவிறக்குக',
      read_aloud: '🔊 குரலில் கேட்கவும்',
      triage_title: '🩺 காட்சி AI நோய் அறிகுறி பகுப்பாய்வு',
      triage_subtitle: 'உடனடி முதலுதவி வழிகாட்டுதலுக்கு உங்கள் அறிகுறியைத் தொடவும்:',
      sym_fever: 'கடுமையான காய்ச்சல்',
      sym_snakebite: 'பாம்பு கடி',
      sym_diarrhea: 'வயிற்றுப்போக்கு & வாந்தி',
      sym_pregnancy: 'பிரசவ வலி',
      sym_chestpain: 'நெஞ்சு வலி',
      sym_breathing: 'சுவாசக் கோளாறு',
      meds_title: '💊 மக்கள் மருந்தக (ஜன் ஔஷதி) சேமிப்பு',
      meds_desc: 'மத்திய அரசின் மக்கள் மருந்தகம் மூலம் 80% வரை மருந்துச் செலவை மிச்சப்படுத்துங்கள்.',
      dose_morning: '☀️ காலை',
      dose_noon: '🌤️ மதியம்',
      dose_night: '🌙 இரவு',
      dose_taken: '✓ உட்கொள்ளப்பட்டது',
      saved_text: 'சேமிக்கப்பட்டது',
      family_title: '👨‍👩‍👧 குடும்ப சுகாதார வட்டம்',
      btn_add_family: '+ உறுப்பினரைச் சேர்க்கவும்',
      hospitals_title: '🏥 அருகிலுள்ள மருத்துவமனைகள், படுக்கைகள் & ரத்த வங்கி',
      blood_title: '🩸 ரத்த வங்கி இருப்பு (அனைத்து பிரிவுகளும்)',
      gen_beds: 'பொது படுக்கைகள்',
      icu_beds: 'ஐசியூ படுக்கைகள்',
      oxy_beds: 'ஆக்சிஜன் படுக்கைகள்',
      avail: 'இருப்பு',
      in_stock: '✓ இருப்பில் உள்ளது',
      low_stock: '⚠️ குறைந்த இருப்பு',
      doc_queue_title: '📋 நோயாளி ஆலோசனை வரிசை',
      btn_add_walkin: '+ நோயாளியைச் சேர்க்கவும்',
      doc_rx_title: '📝 சமீபத்தில் வழங்கப்பட்ட இ-மருந்துச் சீட்டுகள்',
      asha_anc_title: '🤰 அபாயகரமான கர்ப்பிணிகள் கண்காணிப்பு (ANC)',
      btn_add_anc: '+ கர்ப்பிணிப் பதிவு',
      asha_uip_title: '💉 குழந்தைகள் தடுப்பூசி திட்டம் (UIP)',
      asha_visits_title: '🏡 கிராம தினசரி களப்பயணங்கள்',
      admin_kpi_title: '📊 மாவட்ட சுகாதார கட்டுப்பாட்டு மையம்',
      kpi_staff: 'செயலில் உள்ள பணியாளர்கள்',
      kpi_queue: 'OPD வரிசை சுமை',
      kpi_anc: 'அபாயகரமான ANC',
      kpi_beds: 'கிடைக்கக்கூடிய படுக்கைகள்',
      admin_staff_title: '👥 சுகாதார பணியாளர் அடைவு',
      admin_beds_title: '🏥 படுக்கை & ஆக்சிஜன் ஒதுக்கீடு',
      admin_blood_title: '🩸 ரத்த வங்கி விநியோக சங்கிலி',
      admin_drugs_title: '📦 அத்தியாவசிய மருந்து சரக்கு',
      consult_modal_title: 'ஆலோசனை மற்றும் இ-மருந்துச் சீட்டு',
      consulting_label: 'நோயாளி',
      complaint_label: 'முக்கிய உடல்நலக் குறைபாடு',
      vitals_label: 'உடல் குறிகாட்டிகள்',
      years_short: 'வயது',
      label_diagnosis: 'மருத்துவப் பரிசோதனை முடிவு',
      label_primary_med: 'முக்கிய ஜெனரிக் மருந்து',
      label_secondary_med: 'துணை மருந்து',
      label_advice: 'மருத்துவர் அறிவுரை & வழிமுறைகள்',
      btn_generate_rx: '✓ இ-மருந்துச் சீட்டை உருவாக்குக',
      btn_cancel: 'ரத்து செய்க',
      btn_read_aloud: 'குரலில் கேட்கவும்',
      btn_stop_audio: 'குரலை நிறுத்துக',
      no_patients_queue: 'வரிசையில் நோயாளிகள் யாரும் இல்லை. மேலே உள்ள "+ நோயாளி சேர்க்க" பொத்தானைத் தொடவும்.',
      age_label: 'வயது',
      btn_consult_prescribe: 'ஆலோசனை வழங்கி மருந்து சீட்டு எழுதுக',
      no_rx_history: 'சமீபத்திய மருந்துச் சீட்டுகள் எதுவும் உருவாக்கப்படவில்லை.',
      doctor_label: 'மருத்துவர்',
      rx_digital_verified: 'சரிபார்க்கப்பட்ட இ-மருந்துச் சீட்டு',
      rx_diagnosis: 'நோய் கண்டறிதல்',
      rx_medicines: 'பரிந்துரைக்கப்பட்ட ஜெனரிக் மருந்துகள்',
      rx_advice: 'மருத்துவரின் ஆலோசனை',
      btn_print_rx: 'மருந்துச் சீட்டை அச்சிடுக'
    },
    mr: {
      app_title: 'स्वास्थ्य सेतू',
      app_tagline: 'ग्रामीण आरोग्य क्लाउड ग्रिड',
      portal_welcome: 'स्वास्थ्य सेतू मध्ये आपले स्वागत आहे',
      portal_subline: 'पडताळणी केलेल्या तपशीलांसह लॉग इन करण्यासाठी तुमची आरोग्य सेवा भूमिका निवडा:',
      login_patient_title: 'नागरिक / रुग्ण पोर्टल',
      login_patient_desc: 'डिजिटल आभा कार्ड, 108 आपत्कालीन रुग्णवाहिका SOS, जन औषधी जेनेरिक औषधे, लक्षण तपासणी आणि कौटुंबिक आरोग्य.',
      login_doctor_title: 'डॉक्टर क्लिनिकल पोर्टल',
      login_doctor_desc: 'टेलिकन्सल्टेशन ओपीडी रांग, रुग्णांच्या महत्त्वाच्या लक्षणांचे पुनरावलोकन आणि त्वरित ई-प्रिस्क्रिप्शन.',
      login_worker_title: 'आशा फ्रंटलाइन पोर्टल',
      login_worker_desc: 'माता एएनसी नोंदवही, बाल सार्वत्रिक लसीकरण (UIP) आणि दैनंदिन गाव भेटी.',
      login_admin_title: 'आरोग्य प्रशासन पोर्टल',
      login_admin_desc: 'रुग्णालय खाटा उपलब्धता, रक्तपेढी साठा, कर्मचारी नोंदवही आणि औषध पुरवठा नियंत्रण.',
      btn_enter_portal: 'पोर्टलमध्ये प्रवेश करा',
      btn_quick_access: '⚡ 1-टॅप त्वरित प्रवेश',
      btn_logout: '🚪 लॉग आउट / पोर्टल बदला',
      logged_in_as: 'सक्रिय सत्र',
      role_patient: '🌾 नागरिक',
      role_doctor: '🩺 डॉक्टर',
      role_worker: '🤝 आशा',
      role_admin: '👑 प्रशासक',
      theme_classic: '🏛️ क्लासिक (पांढरा आणि निळा)',
      theme_black: '⬛ प्युअर ब्लॅक (ग्लास)',
      theme_navy: '🌊 डीप नेव्ही (ग्लास)',
      btn_sos: '🚨 108 एसओएस',
      emergency_banner: '🚑 तातडीची 108 रुग्णवाहिका SOS — कॉल करण्यासाठी किंवा GPS पाठवण्यासाठी टॅप करा',
      emergency_subline: 'जवळच्या आपत्कालीन नियंत्रण केंद्राशी थेट संपर्क',
      btn_call_108: '📞 108 वर कॉल करा',
      btn_gps_sos: '📍 जीपीएस एसओएस',
      abha_title: '🆔 डिजिटल आभा आरोग्य कार्ड',
      abha_desc: 'तुमचे राष्ट्रीय आरोग्य ओळखपत्र. मोफत सल्ला व उपचारांसाठी ते जवळ ठेवा.',
      abha_nha: 'राष्ट्रीय आरोग्य प्राधिकरण (ABHA)',
      abha_gov: 'भारत सरकार',
      abha_active: 'पडताळणी झालेले',
      abha_qr: 'क्यूआर स्कॅन',
      abha_number_label: 'आभा क्रमांक (14-अंकी)',
      abha_phone_label: 'जोडलेला फोन',
      btn_print_abha: '🖨️ आभा कार्ड प्रिंट / डाउनलोड करा',
      read_aloud: '🔊 मोठ्याने ऐका',
      triage_title: '🩺 व्हिज्युअल AI लक्षण तपासणी',
      triage_subtitle: 'त्वरित प्रथमोपचार व मार्गदर्शनासाठी तुमच्या लक्षणावर टॅप करा:',
      sym_fever: 'तीव्र ताप',
      sym_snakebite: 'सर्पदंश',
      sym_diarrhea: 'उलट्या आणि जुलाब',
      sym_pregnancy: 'प्रसूती वेदना',
      sym_chestpain: 'छातीत दुखणे',
      sym_breathing: 'श्वास घेण्यास त्रास',
      meds_title: '💊 जन औषधी जेनेरिक औषध बचत',
      meds_desc: 'प्रधानमंत्री जन औषधी योजना द्वारे औषधांच्या खर्चावर 80% पर्यंत बचत करा.',
      dose_morning: '☀️ सकाळ',
      dose_noon: '🌤️ दुपार',
      dose_night: '🌙 रात्र',
      dose_taken: '✓ घेतले',
      saved_text: 'बचत झाली',
      family_title: '👨‍👩‍👧 कौटुंबिक आरोग्य मंडळ',
      btn_add_family: '+ सदस्य जोडा',
      hospitals_title: '🏥 जवळील रुग्णालये, खाटा आणि रक्तपेढी',
      blood_title: '🩸 रक्तपेढी साठा उपलब्धता (सर्व गट)',
      gen_beds: 'सर्वसाधारण खाटा',
      icu_beds: 'आयसीयू खाटा',
      oxy_beds: 'ऑक्सिजन खाटा',
      avail: 'उपलब्ध',
      in_stock: '✓ साठ्यात उपलब्ध',
      low_stock: '⚠️ कमी साठा',
      doc_queue_title: '📋 रुग्ण सल्लामसलत रांग',
      btn_add_walkin: '+ रुग्ण जोडा',
      doc_rx_title: '📝 नुकतेच जारी केलेले ई-प्रिस्क्रिप्शन',
      asha_anc_title: '🤰 माता उच्च-जोखीम गर्भधारणा ट्रॅकर (ANC)',
      btn_add_anc: '+ गरोदर मातेची नोंदणी',
      asha_uip_title: '💉 बाल सार्वत्रिक लसीकरण (UIP)',
      asha_visits_title: '🏡 गाव दैनंदिन घरभेटी',
      admin_kpi_title: '📊 जिल्हा आरोग्य प्रशासन कमांड सेंटर',
      kpi_staff: 'सक्रिय कर्मचारी',
      kpi_queue: 'ओपीडी रांग भार',
      kpi_anc: 'उच्च जोखीम ANC',
      kpi_beds: 'उपलब्ध खाटा',
      admin_staff_title: '👥 आरोग्य कर्मचारी निर्देशिका',
      admin_beds_title: '🏥 रुग्णालय खाटा आणि ऑक्सिजन व्यवस्थापन',
      admin_blood_title: '🩸 रक्तपेढी पुरवठा साखळी',
      admin_drugs_title: '📦 अत्यावश्यक औषध साठा',
      consult_modal_title: 'सल्लामसलत आणि ई-प्रिस्क्रिप्शन',
      consulting_label: 'रुग्ण',
      complaint_label: 'मुख्य तक्रार',
      vitals_label: 'महत्त्वाची लक्षणे',
      years_short: 'वर्षे',
      label_diagnosis: 'वैद्यकीय निदान',
      label_primary_med: 'प्राथमिक जेनेरिक औषध',
      label_secondary_med: 'दुय्यम औषध',
      label_advice: 'डॉक्टरांचा सल्ला आणि सूचना',
      btn_generate_rx: '✓ ई-प्रिस्क्रिप्शन तयार करा',
      btn_cancel: 'रद्द करा',
      btn_read_aloud: 'मोठ्याने ऐका',
      btn_stop_audio: 'आवाज थांबवा',
      no_patients_queue: 'रांगेत कोणतेही रुग्ण नाहीत. वर "+ रुग्ण जोडा" वर टॅप करा.',
      age_label: 'वय',
      btn_consult_prescribe: 'सल्ला द्या आणि औषधे लिहा',
      no_rx_history: 'अद्याप कोणतेही प्रिस्क्रिप्शन तयार केलेले नाही.',
      doctor_label: 'डॉक्टर',
      rx_digital_verified: 'पडताळणी झालेले ई-प्रिस्क्रिप्शन',
      rx_diagnosis: 'वैद्यकीय निदान',
      rx_medicines: 'दिलेली जेनेरिक औषधे',
      rx_advice: 'डॉक्टरांचा सल्ला',
      btn_print_rx: 'प्रिस्क्रिप्शन प्रिंट करा'
    },
    bn: {
      app_title: 'স্বাস্থ্য সেতু',
      app_tagline: 'গ্রামীণ স্বাস্থ্য ক্লাউড গ্রিড',
      portal_welcome: 'স্বাস্থ্য সেতুতে আপনাকে স্বাগতম',
      portal_subline: 'যাচাইকৃত তথ্যের মাধ্যমে প্রমাণীকরণের জন্য আপনার স্বাস্থ্যসেবা ভূমিকা নির্বাচন করুন:',
      login_patient_title: 'নাগরিক / রোগী পোর্টাল',
      login_patient_desc: 'ডিজিটাল আভা কার্ড, ১০৮ জরুরি অ্যাম্বুলেন্স এসওএস, জন ঔষধি জেনেরিক ওষুধ, লক্ষণ ট্রায়াজ ও পারিবারিক স্বাস্থ্য।',
      login_doctor_title: 'ডাক্তার ক্লিনিকাল পোর্টাল',
      login_doctor_desc: 'টেলিকনসাল্টেশন ওপিডি সারি, রোগীর ভাইটালস পর্যালোচনা এবং তাত্ক্ষণিক ডিজিটাল প্রেসক্রিপশন।',
      login_worker_title: 'আশা ফ্রন্টলাইন পোর্টাল',
      login_worker_desc: 'মাতৃ এএনসি রেজিস্টার, সার্বজনীন টিকাদান (UIP) এবং প্রতিদিনের গ্রাম পরিদর্শন।',
      login_admin_title: 'স্বাস্থ্য প্রশাসক পোর্টাল',
      login_admin_desc: 'হাসপাতালের শয্যা প্রাপ্যতা, ব্লাড ব্যাংক স্টক, স্বাস্থ্যকর্মী রেজিস্ট্রি এবং ওষুধ সরবরাহ নিয়ন্ত্রণ।',
      btn_enter_portal: 'পোর্টালে প্রবেশ করুন',
      btn_quick_access: '⚡ ১-ট্যাপ দ্রুত প্রবেশ',
      btn_logout: '🚪 লগ আউট / পোর্টাল পরিবর্তন',
      logged_in_as: 'সক্রিয় সেশন',
      role_patient: '🌾 নাগরিক',
      role_doctor: '🩺 ডাক্তার',
      role_worker: '🤝 আশা',
      role_admin: '👑 প্রশাসক',
      theme_classic: '🏛️ ক্লাসিক (সাদা ও নীল)',
      theme_black: '⬛ পিওর ব্ল্যাক (গ্লাস)',
      theme_navy: '🌊 ডিপ নেভি (গ্লাস)',
      btn_sos: '🚨 ১০৮ এসওএস',
      emergency_banner: '🚑 জরুরি ১০৮ অ্যাম্বুলেন্স SOS — কল করতে বা জিপিএস পাঠাতে আলতো চাপুন',
      emergency_subline: 'নিকটতম গ্রামীণ জরুরি নিয়ন্ত্রণ কেন্দ্রের সাথে সরাসরি যোগাযোগ',
      btn_call_108: '📞 ১০৮-এ কল করুন',
      btn_gps_sos: '📍 জিপিএস এসওএস',
      abha_title: '🆔 ডিজিটাল আভা হেলথ কার্ড',
      abha_desc: 'আপনার জাতীয় স্বাস্থ্য পরিচয়পত্র। বিনামূল্যে চিকিৎসা ও পরামর্শের জন্য এটি সাথে রাখুন।',
      abha_nha: 'জাতীয় স্বাস্থ্য কর্তৃপক্ষ (ABHA)',
      abha_gov: 'ভারত সরকার',
      abha_active: 'সক্রিয় যাচাইকৃত',
      abha_qr: 'কিউআর স্ক্যান',
      abha_number_label: 'আভা নম্বর (১৪-সংখ্যা)',
      abha_phone_label: 'সংযুক্ত ফোন',
      btn_print_abha: '🖨️ আভা কার্ড প্রিন্ট / ডাউনলোড করুন',
      read_aloud: '🔊 ভয়েস শুনুন',
      triage_title: '🩺 ভিজ্যুয়াল এআই লক্ষণ ট্রায়াজ',
      triage_subtitle: 'তাত্ক্ষণিক প্রাথমিক চিকিৎসা ও নির্দেশনার জন্য আপনার লক্ষণে আলতো চাপুন:',
      sym_fever: 'তীব্র জ্বর',
      sym_snakebite: 'সাপের কামড়',
      sym_diarrhea: 'ডায়রিয়া ও বমি',
      sym_pregnancy: 'প্রসবকালীন যন্ত্রণা',
      sym_chestpain: 'বুকে ব্যথা',
      sym_breathing: 'শ্বাসকষ্ট',
      meds_title: '💊 জন ঔষধি জেনেরিক ওষুধের সাশ্রয়',
      meds_desc: 'প্রধানমন্ত্রী জন ঔষধির মাধ্যমে ওষুধের খরচে ৮০% পর্যন্ত সাশ্রয় করুন।',
      dose_morning: '☀️ সকাল',
      dose_noon: '🌤️ দুপুর',
      dose_night: '🌙 রাত',
      dose_taken: '✓ নেওয়া হয়েছে',
      saved_text: 'সাশ্রয় হয়েছে',
      family_title: '👨‍👩‍👧 পারিবারিক স্বাস্থ্য মণ্ডল',
      btn_add_family: '+ সদস্য যোগ করুন',
      hospitals_title: '🏥 নিকটবর্তী হাসপাতাল, শয্যা ও ব্লাড ব্যাংক',
      blood_title: '🩸 ব্লাড ব্যাংক স্টক প্রাপ্যতা (সমস্ত গ্রুপ)',
      gen_beds: 'সাধারণ শয্যা',
      icu_beds: 'আইসিইউ শয্যা',
      oxy_beds: 'অক্সিজেন শয্যা',
      avail: 'উপলব্ধ',
      in_stock: '✓ স্টকে আছে',
      low_stock: '⚠️ কম স্টক',
      doc_queue_title: '📋 রোগী পরামর্শের সারি',
      btn_add_walkin: '+ রোগী যোগ করুন',
      doc_rx_title: '📝 সম্প্রতি জারি করা ই-প্রেসক্রিপশন',
      asha_anc_title: '🤰 উচ্চ-ঝুঁকিপূর্ণ গর্ভাবস্থা ট্র্যাকার (ANC)',
      btn_add_anc: '+ গর্ভবতী মা নিবন্ধন',
      asha_uip_title: '💉 শিশুদের সার্বজনীন টিকাদান (UIP)',
      asha_visits_title: '🏡 প্রতিদিনের গ্রাম পরিদর্শন',
      admin_kpi_title: '📊 জেলা স্বাস্থ্য প্রশাসন কমান্ড সেন্টার',
      kpi_staff: 'সক্রিয় কর্মী',
      kpi_queue: 'ওপিডি সারি চাপ',
      kpi_anc: 'উচ্চ ঝুঁকি এএনসি',
      kpi_beds: 'উপলব্ধ শয্যা',
      admin_staff_title: '👥 স্বাস্থ্যসেবা কর্মী নির্দেশিকা',
      admin_beds_title: '🏥 হাসপাতালের শয্যা ও অক্সিজেন বরাদ্দ',
      admin_blood_title: '🩸 ব্লাড ব্যাংক সরবরাহ ব্যবস্থা',
      admin_drugs_title: '📦 প্রয়োজনীয় ওষুধের স্টক',
      consult_modal_title: 'পরামর্শ এবং ই-প্রেসক্রিপশন',
      consulting_label: 'রোগী',
      complaint_label: 'প্রধান সমস্যা',
      vitals_label: 'ভাইটালস',
      years_short: 'বছর',
      label_diagnosis: 'ক্লিনিকাল রোগ নির্ণয়',
      label_primary_med: 'প্রধান জেনেরিক ওষুধ',
      label_secondary_med: 'সহায়ক ওষুধ',
      label_advice: 'ডাক্তারের পরামর্শ ও নির্দেশনা',
      btn_generate_rx: '✓ ই-প্রেসক্রিপশন তৈরি করুন',
      btn_cancel: 'বাতিল করুন',
      btn_read_aloud: 'ভয়েস শুনুন',
      btn_stop_audio: 'ভয়েস বন্ধ করুন',
      no_patients_queue: 'সারিতে কোনো রোগী অপেক্ষা করছে না। উপরে "+ রোগী যোগ করুন" এ আলতো চাপুন।',
      age_label: 'বয়স',
      btn_consult_prescribe: 'পরামর্শ দিন ও প্রেসক্রিপশন লিখুন',
      no_rx_history: 'সম্প্রতি কোনো প্রেসক্রিপশন তৈরি করা হয়নি।',
      doctor_label: 'ডাক্তার',
      rx_digital_verified: 'যাচাইকৃত ডিজিটাল প্রেসক্রিপশন',
      rx_diagnosis: 'রোগ নির্ণয়',
      rx_medicines: 'নির্ধারিত জেনেরিক ওষুধ',
      rx_advice: 'ডাক্তারের পরামর্শ',
      btn_print_rx: 'প্রেসক্রিপশন প্রিন্ট করুন'
    },
    kn: {
      app_title: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು',
      app_tagline: 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಕ್ಲೌಡ್ ಗ್ರಿಡ್',
      portal_welcome: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತುವಿಗೆ ಸುಸ್ವಾಗತ',
      portal_subline: 'ದೃಢೀಕರಿಸಿದ ವಿವರಗಳೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
      login_patient_title: 'ನಾಗರಿಕ / ರೋಗಿ ಪೋರ್ಟಲ್',
      login_patient_desc: 'ಡಿಜಿಟಲ್ ಆಭಾ ಕಾರ್ಡ್, 108 ತುರ್ತು SOS, ಜನೌಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು, ಲಕ್ಷಣ ಪರೀಕ್ಷೆ & ಕುಟುಂಬದ ಆರೋಗ್ಯ.',
      login_doctor_title: 'ವೈದ್ಯರ ಕ್ಲಿನಿಕಲ್ ಪೋರ್ಟಲ್',
      login_doctor_desc: 'ಟೆಲಿಸಮಾಲೋಚನೆ OPD ಸರತಿ, ರೋಗಿಯ ಜೀವರಕ್ಷಣಾ ಲಕ್ಷಣಗಳ ಪರಿಶೀಲನೆ ಮತ್ತು ತಕ್ಷಣದ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್.',
      login_worker_title: 'ಆಶಾ ಮುಂಚೂಣಿ ಪೋರ್ಟಲ್',
      login_worker_desc: 'ಗರ್ಭಿಣಿಯರ ANC ನೋಂದಣಿ, ಮಕ್ಕಳ ಸಾರ್ವತ್ರಿಕ ಲಸಿಕಾ ವೇಳಾಪಟ್ಟಿ (UIP) ಮತ್ತು ದೈನಂದಿನ ಮನೆ ಭೇಟಿಗಳು.',
      login_admin_title: 'ಆರೋಗ್ಯ ಆಡಳಿತ ಪೋರ್ಟಲ್',
      login_admin_desc: 'ಆಸ್ಪತ್ರೆ ಬೆಡ್ ಲಭ್ಯತೆ, ರಕ್ತನಿಧಿ ದಾಸ್ತಾನು, ಸಿಬ್ಬಂದಿ ವಿವರ ಮತ್ತು ಔಷಧಿ ಪೂರೈಕೆ ನಿಯಂತ್ರಣ.',
      btn_enter_portal: 'ಪೋರ್ಟಲ್‌ಗೆ ಪ್ರವೇಶಿಸಿ',
      btn_quick_access: '⚡ 1-ಸ್ಪರ್ಶದ ಶೀಘ್ರ ಪ್ರವೇಶ',
      btn_logout: '🚪 ಲಾಗ್ ಔಟ್ / ಪೋರ್ಟಲ್ ಬದಲಾಯಿಸಿ',
      logged_in_as: 'ಸಕ್ರಿಯ ಅವಧಿ',
      role_patient: '🌾 ನಾಗರಿಕ',
      role_doctor: '🩺 ವೈದ್ಯರು',
      role_worker: '🤝 ಆಶಾ',
      role_admin: '👑 ಆಡಳಿತಾಧಿಕಾರಿ',
      theme_classic: '🏛️ ಕ್ಲಾಸಿಕ್ (ಬಿಳಿ & ನೀಲಿ)',
      theme_black: '⬛ ಪ್ಯೂರ್ ಬ್ಲ್ಯಾಕ್ (ಗ್ಲಾಸ್)',
      theme_navy: '🌊 ಡೀಪ್ ನೇವಿ (ಗ್ಲಾಸ್)',
      btn_sos: '🚨 108 ತುರ್ತು ಸೇವೆ',
      emergency_banner: '🚑 ತುರ್ತು 108 ಆಂಬ್ಯುಲೆನ್ಸ್ SOS — ಕರೆ ಮಾಡಲು ಅಥವಾ GPS ಕಳುಹಿಸಲು ಸ್ಪರ್ಶಿಸಿ',
      emergency_subline: 'ಹತ್ತಿರದ ತುರ್ತು ಕಂಟ್ರೋಲ್ ರೂಂಗೆ ನೇರ ಸಂಪರ್ಕ',
      btn_call_108: '📞 108ಕ್ಕೆ ಕರೆ ಮಾಡಿ',
      btn_gps_sos: '📍 GPS SOS ಕಳುಹಿಸಿ',
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
      consult_modal_title: 'ಸಮಾಲೋಚನೆ ಮತ್ತು ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್',
      consulting_label: 'ರೋಗಿ',
      complaint_label: 'ಮುಖ್ಯ ದೂರು',
      vitals_label: 'ಜೀವರಕ್ಷಣಾ ಲಕ್ಷಣಗಳು',
      years_short: 'ವರ್ಷ',
      label_diagnosis: 'ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ',
      label_primary_med: 'ಮುಖ್ಯ ಜೆನೆರಿಕ್ ಔಷಧಿ',
      label_secondary_med: 'ಸಹಾಯಕ ಔಷಧಿ',
      label_advice: 'ವೈದ್ಯರ ಸಲಹೆ & ಸೂಚನೆಗಳು',
      btn_generate_rx: '✓ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ರಚಿಸಿ',
      btn_cancel: 'ರದ್ದುಮಾಡಿ',
      btn_read_aloud: 'ಓದಿ ಕೇಳಿ',
      btn_stop_audio: 'ಧ್ವನಿ ನಿಲ್ಲಿಸಿ',
      no_patients_queue: 'ಸರತಿಯಲ್ಲಿ ಯಾವುದೇ ರೋಗಿಗಳು ಕಾಯುತ್ತಿಲ್ಲ. ಮೇಲೆ "+ ರೋಗಿ ಸೇರಿಸಿ" ನಮೂದಿಸಿ.',
      age_label: 'ವಯಸ್ಸು',
      btn_consult_prescribe: 'ಸಮಾಲೋಚಿಸಿ ಮತ್ತು ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ನೀಡಿ',
      no_rx_history: 'ಯಾವುದೇ ಇತ್ತೀಚಿನ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳು ರಚನೆಯಾಗಿಲ್ಲ.',
      doctor_label: 'ವೈದ್ಯರು',
      rx_digital_verified: 'ದೃಢೀಕೃತ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್',
      rx_diagnosis: 'ರೋಗನಿರ್ಣಯ',
      rx_medicines: 'ಸೂಚಿಸಲಾದ ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು',
      rx_advice: 'ವೈದ್ಯರ ಸಲಹೆ',
      btn_print_rx: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪ್ರಿಂಟ್'
    }
  };

  // 2. EXHAUSTIVE DIRECT PHRASE TRANSLATION MAP (FOR ALL FULL SENTENCES & BUTTONS)
  // Maps normalized English strings directly to the target language translation
  const PHRASE_TRANSLATIONS = {
    // --- SHORTHAND UI PHRASES ---
    "ASHA Field Tracker": {"hi":"आशा फील्ड ट्रैकर","te":"ఆశా ఫీల్డ్ ట్రాకర్","ta":"ஆஷா கள கண்காணிப்பாளர்","mr":"आशा फील्ड ट्रॅकर","bn":"আশা ফিল্ড ট্র্যাকার","kn":"ಆಶಾ ಕ್ಷೇತ್ರ ಟ್ರ್ಯಾಕರ್"},
    "Talk to Health AI": {"hi":"स्वास्थ्य एआई से बात करें","te":"హెల్త్ AI తో మాట్లాడండి","ta":"சுகாதார AI உடன் பேசுங்கள்","mr":"आरोग्य AI शी बोला","bn":"স্বাস্থ্য এআইয়ের সাথে কথা বলুন","kn":"ಆರೋಗ್ಯ AI ಜೊತೆ ಮಾತನಾಡಿ"},
    "Video Consultation": {"hi":"वीडियो परामर्श","te":"వీడియో సంప్రదింపులు","ta":"வீடியோ ஆலோசனை","mr":"व्हिडिओ सल्लामसलत","bn":"ভিডিও পরামর্শ","kn":"ವೀಡಿಯೊ ಸಮಾಲೋಚನೆ"},
    "Enter Mobile Number": {"hi":"मोबाइल नंबर दर्ज करें","te":"మొబైల్ నంబర్ నమోదు చేయండి","ta":"கைபேசி எண்ணை உள்ளிடவும்","mr":"मोबाइल क्रमांक प्रविष्ट करा","bn":"মোবাইল নম্বর লিখুন","kn":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ"},
    "Enter Password": {"hi":"पासवर्ड दर्ज करें","te":"పాస్‌వర్డ్ నమోదు చేయండి","ta":"கடவுச்சொல்லை உள்ளிடவும்","mr":"पासवर्ड प्रविष्ट करा","bn":"পাসওয়ার্ড লিখুন","kn":"ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ"},
    "Login Securely": {"hi":"सुरक्षित लॉगिन करें","te":"సురಕ್ಷితంగా లాగిన్ అవ్వండి","ta":"பாதுகாப்பாக உள்நுழைக","mr":"सुरक्षित लॉग इन करा","bn":"নিরাপদে লগইন করুন","kn":"ಸುರಕ್ಷಿತವಾಗಿ ಲಾಗಿನ್ ಆಗಿ"},
    "History": {"hi":"इतिहास","te":"చరిత్ర","ta":"வரலாறு","mr":"इतिहास","bn":"ইতিহাস","kn":"ಇತಿಹಾಸ"},
    "Clear": {"hi":"साफ़ करें","te":"క్లియర్ చేయండి","ta":"அழிக்கவும்","mr":"साफ करा","bn":"মুছে ফেলুন","kn":"ತೆರವುಗೊಳಿಸಿ"},
    "Minimize": {"hi":"छोटा करें","te":"తగ్గించండి","ta":"சுருக்குக","mr":"लहान करा","bn":"ছোট করুন","kn":"ಕಿರಿದಾಗಿಸಿ"},
    "Expand": {"hi":"विस्तार करें","te":"విస్తరించండి","ta":"விரிவாக்குக","mr":"विस्तृत करा","bn":"বড় করুন","kn":"ವಿಸ್ತರಿಸಿ"},
    "No past consultations recorded yet.": {"hi":"अभी तक कोई परामर्श रिकॉर्ड नहीं है।","te":"ఇంతవరకు ఎటువంటి సంప్రదింపులు నమోదు కాలేదు.","ta":"இதுவரை எந்த ஆலோசனையும் பதிவு செய்யப்படவில்லை.","mr":"अद्याप कोणताही सल्ला नोंदवलेला नाही.","bn":"এখনও পর্যন্ত কোনো পরামর্শের রেকর্ড নেই।","kn":"ಇದುವರೆಗೆ ಯಾವುದೇ ಸಮಾಲೋಚನೆ ದಾಖಲಾಗಿಲ್ಲ."},

    // --- EXPANDED HIGH-ACCURACY VERNACULAR DICTIONARY (HOME, PORTAL, OPD, ASHA, ADMIN) ---
    "Swasthya Setu · Rural Healthcare Grid": {"hi":"स्वास्थ्य सेतु • ग्रामीण स्वास्थ्य क्लाउड ग्रिड","te":"స్వాస్థ್ಯ సేతు • గ్రామీణ ఆరోగ్య క్లೌడ్ గ్రిడ్","ta":"ஸ்வாஸ்த்ய சேது • கிராமப்புற சுகாதார கட்டமைப்பு","mr":"स्वास्थ्य सेतू • ग्रामीण आरोग्य क्लाउड ग्रिड","bn":"স্বাস্থ্য সেতু • গ্রামীণ স্বাস্থ্য ক্লাউড গ্রিড","kn":"ಸ್ವಾಸ್ಥ್ಯ ಸೇತು • ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಕ್ಲೌಡ್ ಗ್ರಿಡ್"},
    "स्वास्थ्य • सुरक्षा • सेवा (Swasthya • Suraksha • Seva)": {"hi":"स्वास्थ्य • सुरक्षा • सेवा","te":"ఆరోగ్యం • భద్రత • సేవ (స్వాస్థ్య • సురక్ష • సేవ)","ta":"சுகாதாரம் • பாதுகாப்பு • சேவை (ஸ்வாஸ்த்ய • சுரக்ஷா • சேவா)","mr":"आरोग्य • सुरक्षा • सेवा (स्वास्थ्य • सुरक्षा • सेवा)","bn":"স্বাস্থ্য • সুরক্ষা • সেবা (স্বাস্থ্যা • সুরক্ষা • সেবা)","kn":"ಆರೋಗ್ಯ • ರಕ್ಷಣೆ • ಸೇವೆ (ಸ್ವಾಸ್ಥ್ಯ • ಸುರಕ್ಷಾ • ಸೇವಾ)"},
    "ASHA Frontline Workers": {"hi":"आशा अग्रिम पंक्ति कार्यकर्ता","te":"ఆశా ఫ్రంట్‌లైన్ కార్యకర్తలు","ta":"ஆஷா களப்பணியாளர்கள்","mr":"आशा फ्रंटलाइन कार्यकर्त्या","bn":"আশা ফ্রন্টলাইন কর্মী","kn":"ಆಶಾ ಮುಂಚೂಣಿ ಕಾರ್ಯಕರ್ತೆಯರು"},
    ", and": {"hi":", और","te":", మరియు","ta":", மற்றும்","mr":", आणि","bn":", এবং","kn":", ಮತ್ತು"},
    "into a transparent, real-time healthcare continuum.": {"hi":"को एक पारदर्शी, वास्तविक समय स्वास्थ्य सेवा निरंतरता में।","te":"ఒక పారదర్శక, రియల్-టైమ్ ఆరోగ్య వ్యవస్థగా.","ta":"ஒரு வெளிப்படையான, நிகழ்நேர சுகாதார சங்கிலியாக.","mr":"एका पारदर्शक, थेट वेळेतील आरोग्य व्यवस्थेमध्ये.","bn":"একটি স্বচ্ছ, রিয়েল-টাইম স্বাস্থ্যসেবা প্রক্রিয়ায়।","kn":"ಒಂದು ಪಾರದರ್ಶಕ, ನೈಜ-ಸಮಯದ ಆರೋಗ್ಯ ಜಾಲವಾಗಿ."},
    "पोर्टल में प्रवेश करें": {"hi":"पोर्टल में प्रवेश करें","te":"పోర్టల్‌లోకి ప్రవేశించండి","ta":"போர்ட்டலில் நுழைக","mr":"पोर्टलमध्ये प्रवेश करा","bn":"পোর্টালে প্রবেশ করুন","kn":"ಪೋರ್ಟಲ್‌ಗೆ ಪ್ರವೇಶಿಸಿ"},
    "How It Works & User Guide": {"hi":"यह कैसे काम करता है और उपयोगकर्ता गाइड","te":"ఇది ఎలా పనిచేస్తుంది & యూజర్ గైడ్","ta":"இது எவ்வாறு செயல்படுகிறது & பயனர் வழிகாட்டி","mr":"हे कसे कार्य करते आणि वापरकर्ता मार्गदर्शक","bn":"এটি কিভাবে কাজ করে এবং ব্যবহারকারী গাইড","kn":"ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ & ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ"},
    "ASHA": {"hi":"आशा","te":"ఆశా","ta":"ஆஷா","mr":"आशा","bn":"আশা","kn":"ಆಶಾ"},
    "Universal Access with Mobile Number, Password / PIN or SMS OTP": {"hi":"मोबाइल नंबर, पासवर्ड / पिन या एसएमएस ओटीपी के साथ सार्वभौमिक पहुंच","te":"మొబైల్ నంబర్, పాస్‌వర్డ్ / పిన్ లేదా SMS OTP ద్వారా సార్వత్రిక ప్రవేశం","ta":"கைபேசி எண், கடவுச்சொல் / பின் அல்லது SMS OTP உடன் பொதுவான அணுகல்","mr":"मोबाइल क्रमांक, पासवर्ड / पिन किंवा एसएमएस ओटीपी द्वारे सार्वत्रिक प्रवेश","bn":"মোবাইল নম্বর, পাসওয়ার্ড / পিন বা এসএমএস ওটিপি সহ সর্বজনীন প্রবেশাধিকার","kn":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ, ಪಾಸ್‌ವರ್ಡ್ / ಪಿನ್ ಅಥವಾ SMS OTP ಮೂಲಕ ಸಾರ್ವತ್ರಿಕ ಪ್ರವೇಶ"},
    "Mobile Number (SMS OTP) *": {"hi":"मोबाइल नंबर (एसएमएस ओटीपी) *","te":"మొబైల్ నంబర్ (SMS OTP) *","ta":"கைபேசி எண் (SMS OTP) *","mr":"मोबाइल क्रमांक (एसएमएस ओटीपी) *","bn":"মোবাইল নম্বর (এসএমএস ওটিপি) *","kn":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (SMS OTP) *"},
    "Know your password or PIN? Login with Password instead": {"hi":"अपना पासवर्ड या पिन जानते हैं? इसके बजाय पासवर्ड से लॉगिन करें","te":"మీ పాస్‌వర్డ్ లేదా పిన్ తెలుసా? బదులుగా పాస్‌వర్డ్‌తో లాగిన్ అవ్వండి","ta":"உங்கள் கடவுச்சொல் அல்லது பின் தெரியுமா? பதிலாக கடவுச்சொல் மூலம் உள்நுழைக","mr":"तुमचा पासवर्ड किंवा पिन माहित आहे? त्याऐवजी पासवर्डने लॉगिन करा","bn":"আপনার পাসওয়ার্ড বা পিন মনে আছে? পরিবর্তে পাসওয়ার্ড দিয়ে লগইন করুন","kn":"ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಪಿನ್ ತಿಳಿದಿದೆಯೇ? ಬದಲಿಗೆ ಪಾಸ್‌ವರ್ಡ್ ಮೂಲಕ ಲಾಗಿನ್ ಆಗಿ"},
    "SMS OTP Sent To": {"hi":"एसएमएस ओटीपी भेजा गया:","te":"SMS OTP పంపబడింది:","ta":"SMS OTP அனுப்பப்பட்டது:","mr":"एसएमएस ओटीपी पाठवला गेला:","bn":"এসএমএস ওটিপি পাঠানো হয়েছে:","kn":"SMS OTP ಕಳುಹಿಸಲಾಗಿದೆ:"},
    "Change Number": {"hi":"नंबर बदलें","te":"నంబర్ మార్చండి","ta":"எண்ணை மாற்றுக","mr":"क्रमांक बदला","bn":"নম্বর পরিবর্তন করুন","kn":"ಸಂಖ್ಯೆ ಬದಲಾಯಿಸಿ"},
    "Enter 6-Digit SMS Verification PIN *": {"hi":"6-अंकीय एसएमएस सत्यापन पिन दर्ज करें *","te":"6-అంకెల SMS ధృవీకరణ పిన్ నమోదు చేయండి *","ta":"6-இலக்க SMS சரிபார்ப்பு பின்னை உள்ளிடவும் *","mr":"6-अंकी एसएमएस पडताळणी पिन प्रविष्ट करा *","bn":"৬-সংখ্যার এসএমএস যাচাইকরণ পিন লিখুন *","kn":"6-ಅಂಕಿಯ SMS ಪರಿಶೀಲನಾ ಪಿನ್ ನಮೂದಿಸಿ *"},
    "Auto-advances as you type. Universal test PIN:": {"hi":"टाइप करते ही आगे बढ़ता है। सार्वभौमिक परीक्षण पिन:","te":"మీరు టైప్ చేస్తున్నప్పుడు ఆటో-ముందుకు సాగుతుంది. యూనివర్సల్ టెస్ట్ పిన్:","ta":"தட்டச்சு செய்யும்போது தானாக முன்னேறும். பொதுவான சோதனை பின்:","mr":"टाइप करताना आपोआप पुढे जाते. सार्वत्रिक चाचणी पिन:","bn":"টাইপ করার সাথে সাথে স্বয়ংক্রিয়ভাবে এগোয়। সর্বজনীন পরীক্ষার পিন:","kn":"ಟೈಪ್ ಮಾಡುತ್ತಿದ್ದಂತೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮುಂದುವರಿಯುತ್ತದೆ. ಪರೀಕ್ಷಾ ಪಿನ್:"},
    "Resend OTP SMS in 30s": {"hi":"30 सेकंड में ओटीपी पुनः भेजें","te":"30 సెకన్లలో OTP మళ్లీ పంపండి","ta":"30 வினாடிகளில் OTP மீண்டும் அனுப்பவும்","mr":"30 सेकंदात ओटीपी पुन्हा पाठवा","bn":"৩০ সেকেন্ডে পুনরায় ওটিপি পাঠান","kn":"30 ಸೆಕೆಂಡುಗಳಲ್ಲಿ OTP ಮತ್ತೆ ಕಳುಹಿಸಿ"},
    "Clinical Password / Security PIN *": {"hi":"क्लिनिकल पासवर्ड / सुरक्षा पिन *","te":"క్లినికల్ పాస్‌వర్డ్ / సెక్యూరిటీ పిన్ *","ta":"மருத்துவ கடவுச்சொல் / பாதுகாப்பு பின் *","mr":"क्लिनिकल पासवर्ड / सुरक्षा पिन *","bn":"ক্লিনিকাল পাসওয়ার্ড / সুরক্ষা পিন *","kn":"ಕ್ಲಿನಿಕಲ್ ಪಾಸ್‌ವರ್ಡ್ / ಭದ್ರತಾ ಪಿನ್ *"},
    "Authenticate & Enter OPD Queue": {"hi":"प्रमाणित करें और ओपीडी कतार में प्रवेश करें","te":"ధృవీకరించి OPD క్యూలోకి ప్రవేశించండి","ta":"சரிபார்த்து OPD வரிசையில் நுழையவும்","mr":"प्रमाणीकरण करा आणि ओपीडी रांगेत प्रवेश करा","bn":"যাচাই করুন এবং ওপিডি সারিতে প্রবেশ করুন","kn":"ದೃಢೀಕರಿಸಿ OPD ಸರತಿಗೆ ಪ್ರವೇಶಿಸಿ"},
    "ASHA & ANM Frontline Login": {"hi":"आशा और एएनएम अग्रिम पंक्ति लॉगिन","te":"ఆశా & ANM ఫ్రంట్‌లైన్ లాగిన్","ta":"ஆஷா & ஏஎன்எம் களப்பணியாளர் உள்நுழைவு","mr":"आशा आणि एएनएम फ्रंटलाइन लॉगिन","bn":"আশা ও এএনএম ফ্রন্টলাইন লগইন","kn":"ಆಶಾ & ಎಎನ್‌ಎಂ ಮುಂಚೂಣಿ ಲಾಗಿನ್"},
    "Sector Passcode / Security PIN *": {"hi":"सेक्टर पासकोड / सुरक्षा पिन *","te":"సెక్టార్ పాస్‌కోడ్ / సెక్యూరిటీ పిన్ *","ta":"துறை கடவுக்குறியீடு / பாதுகாப்பு பின் *","mr":"सेक्टर पासकोड / सुरक्षा पिन *","bn":"সেক্টর পাসকোড / সুরক্ষা পিন *","kn":"ವಲಯ ಪಾಸ್‌ಕೋಡ್ / ಭದ್ರತಾ ಪಿನ್ *"},
    "Verify & Access Maternal Register": {"hi":"सत्यापित करें और मातृ रजिस्टर तक पहुंचें","te":"ధృవీకరించి గర్భిణీల రిజిస్టర్‌ను చూడండి","ta":"சரிபார்த்து தாய்மை பதிவேட்டை அணுகவும்","mr":"पडताळणी करा आणि माता रजिस्टर पहा","bn":"যাচাই করুন এবং মাতৃ রেজিস্টার অ্যাক্সেস করুন","kn":"ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಗರ್ಭಿಣಿಯರ ದಾಖಲೆ ಪ್ರವೇಶಿಸಿ"},
    "Quick Demo Login (Judge & Evaluator Mode)": {"hi":"त्वरित डेमो लॉगिन (मूल्यांकनकर्ता मोड)","te":"త్వరిత డెమో లాగిన్ (జడ్జి & మూల్యాంకన మోడ్)","ta":"விரைவு டெமோ உள்நுழைவு (மதிப்பீட்டாளர் பயன்முறை)","mr":"द्रुत डेमो लॉगिन (मूल्यांकनकर्ता मोड)","bn":"দ্রুত ডেমো লগইন (মূল্যায়নকারী মোড)","kn":"ತ್ವರಿತ ಡೆಮೊ ಲಾಗಿನ್ (ಮೌಲ್ಯಮಾಪಕ ಮೋಡ್)"},
    "One-click authentication into pre-provisioned role portals without typing credentials:": {"hi":"क्रेडेंशियल टाइप किए बिना पूर्व-निर्धारित भूमिका पोर्टलों में एक-क्लिक प्रमाणीकरण:","te":"రుజువులు టైప్ చేయకుండా ముందే కేటాయించిన పోర్టల్‌లలోకి ఒకే క్లిక్‌తో లాగిన్ అవ్వండి:","ta":"சான்றுகளை உள்ளிடாமல் முன் அமைக்கப்பட்ட போர்ட்டல்களில் ஒரே கிளிக்கில் உள்நுழைக:","mr":"माहिती न भरता एका क्लिकवर पूर्व-व्यवस्था केलेल्या पोर्टलमध्ये प्रवेश करा:","bn":"তথ্য টাইপ না করে পূর্বনির্ধারিত পোর্টালগুলিতে এক ক্লিকে লগইন করুন:","kn":"ವಿವರಗಳನ್ನು ಟೈಪ್ ಮಾಡದೆ ಪೂರ್ವನಿಯೋಜಿತ ಪೋರ್ಟಲ್‌ಗಳಿಗೆ ಒಂದೇ ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಪ್ರವೇಶಿಸಿ:"},
    "District Health Administration": {"hi":"जिला स्वास्थ्य प्रशासन","te":"జిల్లా ఆరోగ్య పరిపాలన","ta":"மாவட்ட சுகாதார நிர்வாகம்","mr":"जिल्हा आरोग्य प्रशासन","bn":"জেলা স্বাস্থ্য প্রশাসন","kn":"ಜಿಲ್ಲಾ ಆರೋಗ್ಯ ಆಡಳಿತ"},
    "Authorize Command Center": {"hi":"कमांड सेंटर अधिकृत करें","te":"కమాండ్ సెంటర్‌ను అనుమతించండి","ta":"கட்டளை மையத்தை அங்கீகரிக்கவும்","mr":"कमांड सेंटर अधिकृत करा","bn":"কমান্ড সেন্টার অনুমোদন করুন","kn":"ಕಮಾಂಡ್ ಸೆಂಟರ್ ದೃಢೀಕರಿಸಿ"},
    "New User? Register & Create ABHA / Healthcare Account": {"hi":"नया उपयोगकर्ता? पंजीकरण करें और आभा / स्वास्थ्य खाता बनाएं","te":"కొత్త వినియోగదారుడా? నమోదు చేసుకోండి & ఆభా ఖాతాను సృష్టించండి","ta":"புதிய பயனரா? பதிவு செய்து ஆபா / சுகாதார கணக்கை உருவாக்கவும்","mr":"नवीन वापरकर्ता? नोंदणी करा आणि आभा / आरोग्य खाते तयार करा","bn":"নতুন ব্যবহারকারী? নিবন্ধন করুন এবং আভা / স্বাস্থ্য অ্যাকাউন্ট তৈরি করুন","kn":"ಹೊಸ ಬಳಕೆದಾರರೇ? ನೋಂದಾಯಿಸಿ ಮತ್ತು ಆಭಾ / ಆರೋಗ್ಯ ಖಾತೆ ರಚಿಸಿ"},
    "≤ 25 km Max Range": {"hi":"≤ 25 किमी अधिकतम दूरी","te":"≤ 25 కి.మీ గరిష్ట పరిధి","ta":"≤ 25 கி.மீ அதிகபட்ச வரம்பு","mr":"≤ 25 किमी कमाल अंतर","bn":"≤ ২৫ কিমি সর্বোচ্চ দূরত্ব","kn":"≤ 25 ಕಿ.ಮೀ ಗರಿಷ್ಠ ವ್ಯಾಪ್ತಿ"},
    "Real-time GPS distance calculation, live ICU/Oxygen bed tracking & Google Maps navigation": {"hi":"वास्तविक समय जीपीएस दूरी गणना, लाइव आईसीयू/ऑक्सीजन बिस्तर ट्रैकिंग और गूगल मैप्स नेविगेशन","te":"రియల్ టైమ్ GPS దూరం లెక్కింపు, లైవ్ ICU/ఆక్సిజన్ బెడ్ ట్రాకింగ్ & గూగుల్ మ్యాప్స్ నావిగేషన్","ta":"நிகழ்நேர GPS தூர கணக்கீடு, நேரலை ICU/ஆக்சிஜன் படுக்கை கண்காணிப்பு & கூகுள் மேப்ஸ் வழிசெலுத்தல்","mr":"थेट जीपीएस अंतर गणना, थेट आयसीयू/ऑक्सिजन खाटा ट्रॅकिंग आणि गुगल मॅप्स नेव्हिगेशन","bn":"রিয়েল-টাইম জিপিএস দূরত্ব গণনা, লাইভ আইসিইউ/অক্সিজেন শয্যা ট্র্যাকিং এবং গুগল ম্যাপস নেভিগেশন","kn":"ನೈಜ-ಸಮಯದ GPS ದೂರ ಲೆಕ್ಕಾಚಾರ, ಲೈವ್ ICU/ಆಮ್ಲಜನಕ ಬೆಡ್ ಟ್ರ್ಯಾಕಿಂಗ್ & ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್ ಸಂಚಾರ"},
    "Verified Facilities Tracked (Within 25 km Max) · Bed Grid Minimized": {"hi":"सत्यापित सुविधाएं ट्रैक की गईं (अधिकतम 25 किमी के भीतर) • बिस्तर ग्रिड न्यूनतम","te":"ధృవీకరించబడిన ఆసుపత్రులు (గరిష్టంగా 25 కి.మీ పరిధిలో) • బెడ్ గ్రిడ్ తగ్గించబడింది","ta":"சரிபார்க்கப்பட்ட வசதிகள் (அதிகபட்சம் 25 கி.மீக்குள்) • படுக்கை கட்டமைப்பு சுருக்கப்பட்டது","mr":"पडताळणी केलेल्या सुविधा (कमाल २५ किमी अंतर्गत) • बेड ग्रिड लहान केले","bn":"যাচাইকৃত স্বাস্থ্যকেন্দ্র (সর্বোচ্চ ২৫ কিমির মধ্যে) • বেড গ্রিড সংক্ষেপিত","kn":"ದೃಢೀಕೃತ ಸೌಲಭ್ಯಗಳು (ಗರಿಷ್ಠ 25 ಕಿ.ಮೀ ಒಳಗೆ) • ಬೆಡ್ ಮಾಹಿತಿ ಕಿರಿದಾಗಿದೆ"},
    "Nearest Facility:": {"hi":"निकटतम स्वास्थ्य केंद्र:","te":"సమీప ఆరోగ్య కేంద్రం:","ta":"அருகிலுள்ள மருத்துவ மையம்:","mr":"जवळचे आरोग्य केंद्र:","bn":"নিকটতম স্বাস্থ্যকেন্দ্র:","kn":"ಹತ್ತಿರದ ಆರೋಗ್ಯ ಕೇಂದ್ರ:"},
    "Kondapalli PHC": {"hi":"कोंडापल्ली पीएचसी","te":"కొండపల్లి PHC","ta":"கொண்டபல்லி ஆரம்ப சுகாதார நிலையம்","mr":"कोंडापल्ली पीएचसी","bn":"কোন্ডাপল্লী পিএইচসি","kn":"ಕೊಂಡಪಲ್ಲಿ ಪಿಎಚ್‌ಸಿ"},
    "Live Cloud Synced": {"hi":"लाइव क्लाउड सिंक","te":"లైవ్ క్లౌడ్ సింక్ చేయబడింది","ta":"நேரலை கிளவுட் ஒத்திசைவு","mr":"थेट क्लाउड सिंक","bn":"লাইভ ক্লাউড সিঙ্ক","kn":"ಲೈವ್ ಕ್ಲೌಡ್ ಸಿಂಕ್"},
    "Teleconsultation Video Call History": {"hi":"टेलीकंसल्टेशन वीडियो कॉल इतिहास","te":"టెలికన్సల్టేషన్ వీడియో కాల్ చరిత్ర","ta":"தொலைமருத்துவ வீடியோ அழைப்பு வரலாறு","mr":"टेलिकन्सल्टेशन व्हिडिओ कॉल इतिहास","bn":"টেলিকনসাল্টেশন ভিডিও কল ইতিহাস","kn":"ಟೆಲಿಸಮಾಲೋಚನೆ ವೀಡಿಯೊ ಕರೆ ಇತಿಹಾಸ"},
    "Past doctor video consultations, call durations & linked e-prescriptions": {"hi":"पिछली डॉक्टर वीडियो कॉल, कॉल अवधि और जुड़े हुए ई-प्रिस्क्रिप्शन","te":"గత వైద్యుల వీడియో సంప్రదింపులు, కాల్ సమయం & ఇ-ప్రిస్క్రిప్షన్లు","ta":"கடந்த மருத்துவர் வீடியோ ஆலோசனைகள், அழைப்பு கால அளவு & இணைக்கப்பட்ட இ-மருந்துச் சீட்டுகள்","mr":"मागील डॉक्टर व्हिडिओ कॉल, कॉल कालावधी आणि जोडलेले ई-प्रिस्क्रिप्शन","bn":"পূর্ববর্তী ডাক্তার ভিডিও কল, কলের সময়কাল এবং সংযুক্ত ই-প্রেসক্রিপশন","kn":"ಹಿಂದಿನ ವೈದ್ಯರ ವೀಡಿಯೊ ಸಮಾಲೋಚನೆಗಳು, ಕರೆ ಅವಧಿ ಮತ್ತು ಲಿಂಕ್ ಮಾಡಲಾದ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳು"},
    "PMBJP Jan Aushadhi generic medicines save up to 80% on everyday healthcare costs.": {"hi":"पीएमबीजेपी जन औषधि जेनेरिक दवाएं दैनिक स्वास्थ्य लागत पर 80% तक बचाती हैं।","te":"PMBJP జన్ ఔషధి జెనరిక్ మందులు రోజువారీ ఆరోగ్య ఖర్చులపై 80% వరకు ఆదా చేస్తాయి.","ta":"மக்கள் மருந்தக ஜன் ஔஷதி பொது மருந்துகள் அன்றாட மருத்துவச் செலவில் 80% வரை சேமிக்கின்றன.","mr":"पीएमबीजेपी जन औषधी जेनेरिक औषधे दैनंदिन आरोग्य खर्चावर ८०% पर्यंत बचत करतात.","bn":"পিএমবিজিপি জন ঔষধি জেনেরিক ওষুধ প্রতিদিনের স্বাস্থ্য খরচে ৮০% পর্যন্ত সাশ্রয় করে।","kn":"ಪಿಎಂಬಿಜೆಪಿ ಜನೌಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು ದೈನಂದಿನ ಆರೋಗ್ಯ ವೆಚ್ಚದಲ್ಲಿ 80% ರಷ್ಟು ಉಳಿಸುತ್ತವೆ."},
    "Family Health Circle": {"hi":"पारिवारिक स्वास्थ्य मंडल","te":"కుటుంబ ఆరోగ్య వృత్తం","ta":"குடும்ப சுகாதார வட்டம்","mr":"कौटुंबिक आरोग्य मंडळ","bn":"পারিবারিক স্বাস্থ্য মণ্ডল","kn":"ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ"},
    "OPD Clinical Teleconsultation Desk": {"hi":"ओपीडी क्लिनिकल टेलीकंसल्टेशन डेस्क","te":"OPD క్లినికల్ టెలికన్సల్టేషన్ డెస్క్","ta":"OPD மருத்துவ தொலைஆலோசனை மையம்","mr":"ओपीडी क्लिनिकल टेलिकन्सल्टेशन डेस्क","bn":"ওপিডি ক্লিনিকাল টেলিকনসাল্টেশন ডেস্ক","kn":"OPD ಕ್ಲಿನಿಕಲ್ ಟೆಲಿಸಮಾಲೋಚನೆ ಡೆಸ್ಕ್"},
    "National Rural Telemedicine Network · e-Sanjeevani Clinical HUD": {"hi":"राष्ट्रीय ग्रामीण टेलीमेडिसिन नेटवर्क • ई-संजीवनी क्लिनिकल एचयूडी","te":"జాతీయ గ్రామీణ టెలిమెడిసిన్ నెట్‌వర్క్ • ఈ-సంజీవని క్లినికల్ HUD","ta":"தேசிய கிராமப்புற தொலைமருத்துவ கட்டமைப்பு • இ-சஞ்சீவனி மருத்துவ HUD","mr":"राष्ट्रीय ग्रामीण टेलिमेडिसिन नेटवर्क • ई-संजीवनी क्लिनिकल एचयूडी","bn":"জাতীয় গ্রামীণ টেলিমেডিসিন নেটওয়ার্ক • ই-সঞ্জীবনী ক্লিনিকাল HUD","kn":"ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಟೆಲಿಸಮಾಲೋಚನೆ ಜಾಲ • ಇ-ಸಂಜೀವನಿ ಕ್ಲಿನಿಕಲ್ HUD"},
    "Live Teleconsultation & OPD Queue": {"hi":"लाइव टेलीकंसल्टेशन और ओपीडी कतार","te":"లైవ్ టెలికన్సల్టేషన్ & OPD క్యూ","ta":"நேரலை தொலைமருத்துவம் & OPD வரிசை","mr":"थेट टेलिकन्सल्टेशन आणि ओपीडी रांग","bn":"লাইভ টেলিকনসাল্টেশন ও ওপিডি সারি","kn":"ಲೈವ್ ಟೆಲಿಸಮಾಲೋಚನೆ & OPD ಸರತಿ"},
    "Token": {"hi":"टोकन","te":"టోకెన్","ta":"டோக்கன்","mr":"टोकन","bn":"টোকেন","kn":"ಟೋಕನ್"},
    "Recorded Vitals": {"hi":"दर्ज वाइटल्स","te":"నమోదైన వైటల్స్","ta":"பதிவுசெய்யப்பட்ட முக்கிய அளவீடுகள்","mr":"नोंदवलेली महत्त्वाची लक्षणे","bn":"রেকর্ডকৃত ভাইটালস","kn":"ದಾಖಲಾದ ಜೀವರಕ್ಷಣಾ ಲಕ್ಷಣಗಳು"},
    "Triage": {"hi":"ट्राइएज","te":"ట్రయాజ్","ta":"ட்ரையrecord (முன்னுரிமை)","mr":"ट्राइएज (प्राधान्य)","bn":"ট্রায়াজ","kn":"ಟ್ರಯಾಜ್ (ಆದ್ಯತೆ)"},
    "Queue Time": {"hi":"कतार समय","te":"క్యూ సమయం","ta":"வரிசை நேரம்","mr":"रांगेची वेळ","bn":"সারির সময়","kn":"ಸರತಿಯ ಸಮಯ"},
    "Action": {"hi":"कार्रवाई","te":"చర్య","ta":"செயல்","mr":"कृती","bn":"পদক্ষেপ","kn":"ಕ್ರಮ"},
    "Clinical Protocols & Standard Treatment Guidelines (NHM)": {"hi":"क्लिनिकल प्रोटोकॉल और मानक उपचार दिशानिर्देश (NHM)","te":"క్లినికల్ ప్రోటోకాల్స్ & ప్రామాణిక చికిత్స మార్గదర్శకాలు (NHM)","ta":"மருத்துவ நெறிமுறைகள் மற்றும் நிலையான சிகிச்சை வழிகாட்டுதல்கள் (NHM)","mr":"क्लिनिकल प्रोटोकॉल आणि मानक उपचार मार्गदर्शक तत्त्वे (NHM)","bn":"ক্লিনিকাল প্রোটোকল এবং স্ট্যান্ডার্ড চিকিৎসা নির্দেশিকা (NHM)","kn":"ಕ್ಲಿನಿಕಲ್ ಶಿಷ್ಟಾಚಾರಗಳು & ಪ್ರಮಾಣಿತ ಚಿಕಿತ್ಸಾ ಮಾರ್ಗಸೂಚಿಗಳು (NHM)"},
    "Instant differential diagnosis, recommended lab investigations & PMBJP generic formulations": {"hi":"त्वरित अंतर निदान, अनुशंसित प्रयोगशाला परीक्षण और पीएमबीजेपी जेनेरिक दवाएं","te":"తక్షణ రోగనిర్ధారణ, సిఫార్సు చేసిన ల్యాబ్ పరీక్షలు & PMBJP జెనరిక్ మందులు","ta":"உடனடி நோய் கண்டறிதல், பரிந்துரைக்கப்பட்ட ஆய்வக சோதனைகள் & ஜன் ஔஷதி மருந்துகள்","mr":"त्वरित रोगनिदान, शिफारस केलेल्या प्रयोगशाळा चाचण्या आणि पीएमबीजेपी जेनेरिक औषधे","bn":"তাত্ক্ষণিক ডিফারেনশিয়াল রোগ নির্ণয়, প্রস্তাবিত ল্যাব পরীক্ষা ও জেনেরিক ওষুধ","kn":"ತಕ್ಷಣದ ರೋಗನಿರ್ಣಯ, ಶಿಫಾರಸು ಮಾಡಿದ ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಗಳು & PMBJP ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು"},
    "Issued e-Prescriptions History": {"hi":"जारी किए गए ई-प्रिस्क्रिप्शन इतिहास","te":"జారీ చేసిన ఇ-ప్రిస్క్రిప్షన్ల చరిత్ర","ta":"வழங்கப்பட்ட இ-மருந்துச் சீட்டு வரலாறு","mr":"जारी केलेल्या ई-प्रिस्क्रिप्शनचा इतिहास","bn":"প্রদত্ত ই-প্রেসক্রিপশন ইতিহাস","kn":"ನೀಡಲಾದ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಇತಿಹಾಸ"},
    "Telemedicine Video Consultation Logs": {"hi":"टेलीमेडिसिन वीडियो परामर्श लॉग","te":"టెలిమెడిసిన్ వీడియో సంప్రదింపుల లాగ్‌లు","ta":"தொலைமருத்துவ வீடியோ ஆலோசனை பதிவுகள்","mr":"टेलिमेडिसिन व्हिडिओ सल्लामसलत नोंदी","bn":"টেলিমেডিসিন ভিডিও পরামর্শ লগ","kn":"ಟೆಲಿಮೆಡಿಸಿನ್ ವೀಡಿಯೊ ಸಮಾಲೋಚನಾ ದಾಖಲೆಗಳು"},
    "Maternal ANC Register, UIP Child Immunization & Village Home Visits": {"hi":"मातृ एएनसी रजिस्टर, यूआईपी बाल टीकाकरण और ग्रामीण गृह भ्रमण","te":"గర్భిణీల ANC రిజిస్టర్, పిల్లల UIP టీకాలు & గ్రామ గృహ సందర్శనలు","ta":"தாய்மை ANC பதிவேடு, UIP குழந்தை தடுப்பூசி & கிராம வீட்டுப் பார்வைகள்","mr":"माता एएनसी रजिस्टर, यूआयपी बाल लसीकरण आणि गाव घरभेटी","bn":"মাতৃ এএনসি রেজিস্টার, ইউআইপি শিশু টিকাদান ও গ্রাম পরিদর্শন","kn":"ಗರ್ಭಿಣಿಯರ ANC ದಾಖಲೆ, UIP ಮಕ್ಕಳ ಲಸಿಕೆ & ಗ್ರಾಮ ಗೃಹ ಭೇಟಿಗಳು"},
    "High-Risk Pregnancy (ANC) Register": {"hi":"उच्च जोखिम गर्भावस्था (ANC) रजिस्टर","te":"హై-రిస్క్ గర్భధారణ (ANC) రిజిస్టర్","ta":"அதிக ஆபத்துள்ள கர்ப்பம் (ANC) பதிவேடு","mr":"उच्च जोखीम गर्भधारणा (ANC) रजिस्टर","bn":"উচ্চ ঝুঁকিপূর্ণ গর্ভাবস্থা (ANC) রেজিস্টার","kn":"ಹೆಚ್ಚಿನ ಅಪಾಯದ ಗರ್ಭಾವಸ್ಥೆ (ANC) ದಾಖಲೆ"},
    "Husband / Guardian": {"hi":"पति / अभिभावक","te":"భర్త / సంరక్షకుడు","ta":"கணவர் / பாதுகாவலர்","mr":"पती / पालक","bn":"স্বামী / অভিভাবক","kn":"ಪತಿ / ಪೋಷಕರು"},
    "Village / Ward": {"hi":"गांव / वार्ड","te":"గ్రామం / వార్డు","ta":"கிராமம் / வார்டு","mr":"गाव / प्रभाग","bn":"গ্রাম / ওয়ার্ড","kn":"ಗ್ರಾಮ / ವಾರ್ಡ್"},
    "Weeks / EDD": {"hi":"सप्ताह / प्रसव अनुमानित तिथि (EDD)","te":"వారాలు / ప్రసవ అంచనా తేదీ (EDD)","ta":"வாரங்கள் / பிரசவ தேதி (EDD)","mr":"आठवडे / प्रसूतीची तारीख (EDD)","bn":"সপ্তাহ / প্রসবের সম্ভাব্য তারিখ (EDD)","kn":"ವಾರಗಳು / ಹೆರಿಗೆ ನಿರೀಕ್ಷಿತ ದಿನಾಂಕ (EDD)"},
    "Vitals (BP & Hb)": {"hi":"वाइटल्स (बीपी और हीमोग्लोबिन)","te":"వైటల్స్ (BP & హిమోగ్లోబిన్)","ta":"முக்கிய அளவீடுகள் (BP & Hb)","mr":"लक्षणे (बीपी आणि हिमोग्लोबिन)","bn":"ভাইটালস (বিপি ও হিমোগ্লোবিন)","kn":"ಜೀವರಕ್ಷಣಾ ಲಕ್ಷಣಗಳು (BP & Hb)"},
    "Risk Classification": {"hi":"जोखिम वर्गीकरण","te":"ప్రమాద వర్గీకరణ","ta":"ஆபத்து வகைப்பாடு","mr":"जोखीम वर्गीकरण","bn":"ঝুঁকি শ্রেণীকরণ","kn":"ಅಪಾಯ ವರ್ಗೀಕರಣ"},
    "Next Scheduled Visit": {"hi":"अगली निर्धारित भेंट","te":"తదుపరి షెడ్యూల్ చేసిన సందర్శన","ta":"அடுத்த திட்டமிடப்பட்ட வருகை","mr":"पुढील नियोजित भेट","bn":"পরবর্তী নির্ধারিত পরিদর্শন","kn":"ಮುಂದಿನ ನಿಗದಿತ ಭೇಟಿ"},
    "Child Immunization (UIP) Tracker": {"hi":"बाल टीकाकरण (UIP) ट्रैकर","te":"పిల్లల టీకా (UIP) ట్రాకర్","ta":"குழந்தை தடுப்பூசி (UIP) கண்காணிப்பாளர்","mr":"बाल लसीकरण (UIP) ट्रॅकर","bn":"শিশু টিকাদান (UIP) ট্র্যাকার","kn":"ಮಕ್ಕಳ ಲಸಿಕೆ (UIP) ಟ್ರ್ಯಾಕರ್"},
    "+ Add Vaccine": {"hi":"+ टीका जोड़ें","te":"+ టీకా జోడించండి","ta":"+ தடுப்பூசி சேர்க்க","mr":"+ लस जोडा","bn":"+ টিকা যোগ করুন","kn":"+ ಲಸಿಕೆ ಸೇರಿಸಿ"},
    "Child Name": {"hi":"बच्चे का नाम","te":"పిల్లల పేరు","ta":"குழந்தையின் பெயர்","mr":"मुलाचे नाव","bn":"শিশুর নাম","kn":"ಮಗುವಿನ ಹೆಸರು"},
    "Parent / Guardian": {"hi":"माता-पिता / अभिभावक","te":"తల్లిదండ్రులు / సంరక్షకుడు","ta":"பெற்றோர் / பாதுகாவலர்","mr":"पालक / संरक्षक","bn":"পিতা-মাতা / অভিভাবক","kn":"ಪೋಷಕರು / ರಕ್ಷಕರು"},
    "Last Vaccine": {"hi":"अंतिम टीका","te":"చివరి టీకా","ta":"கடைசி தடுப்பூசி","mr":"शेवटची लस","bn":"সর্বশেষ টিকা","kn":"ಕೊನೆಯ ಲಸಿಕೆ"},
    "ASHA Frontline Field Data Master Registry": {"hi":"आशा अग्रिम पंक्ति फील्ड डेटा मास्टर रजिस्ट्री","te":"ఆశా ఫ్రంట్‌లైన్ ఫీల్డ్ డేటా మాస్టర్ రిజిస్ట్రీ","ta":"ஆஷா களப்பணி தரவு முதன்மை பதிவேடு","mr":"आशा फ्रंटलाइन फील्ड डेटा मास्टर नोंदवही","bn":"আশা ফ্রন্টলাইন ফিল্ড ডেটা মাস্টার রেজিস্ট্রি","kn":"ಆಶಾ ಮುಂಚೂಣಿ ಕ್ಷೇತ್ರ ಮಾಹಿತಿ ಮುಖ್ಯ ದಾಖಲಾತಿ"},
    "ABHA Health ID": {"hi":"आभा स्वास्थ्य आईडी","te":"ఆభా హెల్త్ ID","ta":"ஆபா சுகாதார ஐடி","mr":"आभा आरोग्य आयडी","bn":"আভা হেলথ আইডি","kn":"ಆಭಾ ಹೆಲ್ತ್ ಐಡಿ"},
    "Contact Phone": {"hi":"संपर्क फोन","te":"సంప్రదింపు ఫోన్","ta":"தொடர்பு தொலைபேசி","mr":"संपर्क फोन","bn":"যোগাযোগের ফোন","kn":"ಸಂಪರ್ಕ ಫೋನ್"},
    "Connect village beneficiaries and high-risk mothers directly to on-duty doctors": {"hi":"ग्रामीण लाभार्थियों और उच्च जोखिम वाली माताओं को सीधे ड्यूटी पर मौजूद डॉक्टरों से जोड़ें","te":"గ్రామ లబ్ధిదారులను మరియు గర్భిణులను నేరుగా డ్యూటీ వైద్యులతో కనెక్ట్ చేయండి","ta":"கிராமப்புற பயனாளிகள் மற்றும் தாய்மார்களை நேரடியாக மருத்துவர்களுடன் இணைக்கவும்","mr":"गाव लाभार्थी आणि मातांना थेट डॉक्टरांशी जोडा","bn":"গ্রামীণ সুবিধাভোগী এবং মায়েদের সরাসরি কর্মরত চিকিৎসকদের সাথে সংযুক্ত করুন","kn":"ಗ್ರಾಮದ ಫಲಾನುಭವಿಗಳು ಮತ್ತು ಗರ್ಭಿಣಿಯರನ್ನು ಕರ್ತವ್ಯದಲ್ಲಿರುವ ವೈದ್ಯರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕಿಸಿ"},
    "Daily Village Home Visit Planner": {"hi":"दैनिक ग्रामीण गृह भ्रमण योजनाकार","te":"రోజువారీ గ్రామ గృహ సందర్శన ప్రణాళిక","ta":"தினசரி கிராம வீட்டுப் பார்வை திட்டமிடுபவர்","mr":"दैनंदिन गाव घरभेट नियोजक","bn":"দৈনিক গ্রাম পরিদর্শন পরিকল্পনাকারী","kn":"ದೈನಂದಿನ ಗ್ರಾಮ ಗೃಹ ಭೇಟಿ ಯೋಜಕ"},
    "+ Add Visit": {"hi":"+ भेंट जोड़ें","te":"+ సందర్శన జోడించండి","ta":"+ வருகை சேர்க்க","mr":"+ भेट जोडा","bn":"+ পরিদর্শন যোগ করুন","kn":"+ ಭೇಟಿ ಸೇರಿಸಿ"},
    "District Health Officer Command Center": {"hi":"जिला स्वास्थ्य अधिकारी कमांड सेंटर","te":"జిల్లా వైద్యాధికారి కమాండ్ సెంటర్","ta":"மாவட்ட சுகாதார அலுவலர் கட்டளை மையம்","mr":"जिल्हा आरोग्य अधिकारी कमांड सेंटर","bn":"জেলা স্বাস্থ্য কর্মকর্তা কমান্ড সেন্টার","kn":"ಜಿಲ್ಲಾ ಆರೋಗ್ಯಾಧಿಕಾರಿ ಕಮಾಂಡ್ ಸೆಂಟರ್"},
    "Staff Directory & Medical Officer Roster": {"hi":"कर्मचारी निर्देशिका और चिकित्सा अधिकारी रोस्टर","te":"సిబ్బంది డైరెక్టరీ & వైద్యాధికారుల రోస్టర్","ta":"பணியாளர் விபரம் & மருத்துவ அதிகாரிகள் பட்டியல்","mr":"कर्मचारी निर्देशिका आणि वैद्यकीय अधिकारी रोस्टर","bn":"কর্মী ডিরেক্টরি এবং মেডিকেল অফিসার রোস্টার","kn":"ಸಿಬ್ಬಂದಿ ವಿವರ ಮತ್ತು ವೈದ್ಯಾಧಿಕಾರಿಗಳ ಪಟ್ಟಿ"},
    "+ Provision New Staff": {"hi":"+ नया कर्मचारी जोड़ें","te":"+ కొత్త సిಬ್ಬందిని చేర్చండి","ta":"+ புதிய பணியாளரை நியமிக்கவும்","mr":"+ नवीन कर्मचारी जोडा","bn":"+ নতুন কর্মী যুক্ত করুন","kn":"+ ಹೊಸ ಸಿಬ್ಬಂದಿ ನೇಮಿಸಿ"},
    "Name & Registration": {"hi":"नाम और पंजीकरण","te":"పేరు & రిజిస్ట్రేషన్","ta":"பெயர் & பதிவு எண்","mr":"नाव आणि नोंदणी","bn":"নাম ও নিবন্ধন","kn":"ಹೆಸರು ಮತ್ತು ನೋಂದಣಿ"},
    "Location": {"hi":"स्थान","te":"ప్రాంతం","ta":"இடம்","mr":"स्थान","bn":"অবস্থান","kn":"ಸ್ಥಳ"},
    "Mobile": {"hi":"मोबाइल","te":"మొబైల్","ta":"கைபேசி","mr":"मोबाइल","bn":"মোবাইল","kn":"ಮೊಬೈಲ್"},
    "Jan Aushadhi Generic Medicine Inventory": {"hi":"जन औषधि जेनेरिक दवा इन्वेंट्री","te":"జన్ ఔషధి జెనరిక్ మందుల నిల్వ","ta":"ஜன் ஔஷதி பொது மருந்துகள் இருப்பு","mr":"जन औषधी जेनेरिक औषध साठा","bn":"জন ঔষধি জেনেরিক ওষুধের তালিকা","kn":"ಜನೌಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿ ದಾಸ್ತಾನು"},
    "+ Add Medicine": {"hi":"+ दवा जोड़ें","te":"+ మందు జోడించండి","ta":"+ மருந்து சேர்க்க","mr":"+ औषध जोडा","bn":"+ ওষুধ যোগ করুন","kn":"+ ಔಷಧಿ ಸೇರಿಸಿ"},
    "Medicine Name & ID": {"hi":"दवा का नाम और आईडी","te":"మందు పేరు & ID","ta":"மருந்து பெயர் & ஐடி","mr":"औषधाचे नाव आणि आयडी","bn":"ওষুধের নাম ও আইডি","kn":"ಔಷಧಿಯ ಹೆಸರು ಮತ್ತು ಐಡಿ"},
    "Category": {"hi":"श्रेणी","te":"వర్గం","ta":"பிரிவு","mr":"श्रेणी","bn":"বিভাগ","kn":"ವರ್ಗ"},
    "Jan Aushadhi Price": {"hi":"जन औषधि मूल्य","te":"జన్ ఔషధి ధర","ta":"ஜன் ஔஷதி விலை","mr":"जन औषधी किंमत","bn":"জন ঔষধি মূল্য","kn":"ಜನೌಷಧಿ ಬೆಲೆ"},
    "Market Brand Price": {"hi":"बाजार ब्रांड मूल्य","te":"మార్కెట్ బ్రాండ్ ధర","ta":"சந்தை பிராண்ட் விலை","mr":"बाजारातील ब्रँड किंमत","bn":"বাজারের ব্র্যান্ডের মূল্য","kn":"ಮಾರುಕಟ್ಟೆ ಬ್ರ್ಯಾಂಡ್ ಬೆಲೆ"},
    "Add Family Member": {"hi":"परिवार का सदस्य जोड़ें","te":"కుటుంబ సభ్యుడిని చేర్చండి","ta":"குடும்ப உறுப்பினரை சேர்க்க","mr":"कुटुंबातील सदस्य जोडा","bn":"পরিবারের সদস্য যোগ করুন","kn":"ಕುಟುಂಬದ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ"},
    "Full Name *": {"hi":"पूरा नाम *","te":"పూర్తి పేరు *","ta":"முழு பெயர் *","mr":"पूर्ण नाव *","bn":"সম্পূর্ণ নাম *","kn":"ಪೂರ್ಣ ಹೆಸರು *"},
    "Relation *": {"hi":"संबंध *","te":"సంబంధం *","ta":"உறவுமுறை *","mr":"नाते *","bn":"সম্পর্ক *","kn":"ಸಂಬಂಧ *"},
    "Other (अन्य)": {"hi":"अन्य","te":"ఇతర (Other)","ta":"மற்றவை (Other)","mr":"इतर (Other)","bn":"অন্যান্য (Other)","kn":"ಇತರೆ (Other)"},
    "Save Member": {"hi":"सदस्य सहेजें","te":"సభ్యుడిని సేవ్ చేయండి","ta":"உறுப்பினரைச் சேமிக்கவும்","mr":"सदस्य जतन करा","bn":"সদস্য সংরক্ষণ করুন","kn":"ಸದಸ್ಯರನ್ನು ಉಳಿಸಿ"},
    "Chief Complaint *": {"hi":"मुख्य समस्या / लक्षण *","te":"ప్రధాన సమస్య / లక్షణాలు *","ta":"முக்கிய பிரச்சனை *","mr":"मुख्य तक्रार *","bn":"প্রধান অভিযোগ / লক্ষণ *","kn":"ಮುಖ್ಯ ದೂರು / ತೊಂದರೆ *"},
    "Temperature": {"hi":"तापमान","te":"ఉష్ణోగ్రత","ta":"உடல் வெப்பநிலை","mr":"तापमान","bn":"তাপমাত্রা","kn":"ತಾಪಮಾನ"},
    "Green (Routine)": {"hi":"हरा (सामान्य)","te":"ఆకుపచ్చ (సాధారణ)","ta":"பச்சை (வழக்கமானது)","mr":"हिरवा (नेहमीचे)","bn":"সবুজ (সাধারণ)","kn":"ಹಸಿರು (ಸಾಮಾನ್ಯ)"},
    "Yellow (Urgent)": {"hi":"पीला (जरूरी)","te":"పసుపు (అత్యవసరం)","ta":"மஞ்சள் (அவசரம்)","mr":"पिवळा (तातडीचे)","bn":"হলুদ (জরুরি)","kn":"ಹಳದಿ (ತುರ್ತು)"},
    "Admit to OPD": {"hi":"ओपीडी में भर्ती करें","te":"OPD లోకి చేర్చండి","ta":"OPD இல் அனுமதிக்கவும்","mr":"ओपीडीमध्ये दाखल करा","bn":"ওপিডিতে ভর্তি করুন","kn":"OPD ಗೆ ದಾಖಲಿಸಿ"},
    "Recorded Chief Complaint:": {"hi":"दर्ज मुख्य समस्या:","te":"నమోదైన ప్రధాన సమస్య:","ta":"பதிவுசெய்யப்பட்ட முக்கிய பிரச்சனை:","mr":"नोंदवलेली मुख्य तक्रार:","bn":"রেকর্ডকৃত প্রধান অভিযোগ:","kn":"ದಾಖಲಾದ ಮುಖ್ಯ ದೂರು:"},
    "Clinical Diagnosis *": {"hi":"नैदानिक निदान *","te":"క్లినికల్ రోగనిర్ధారణ *","ta":"மருத்துவ நோய் கண்டறிதல் *","mr":"वैद्यकीय निदान *","bn":"ক্লিনিকাল রোগ নির্ণয় *","kn":"ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ *"},
    "Jan Aushadhi Generic Medicine 1 *": {"hi":"जन औषधि जेनेरिक दवा 1 *","te":"జన్ ఔషధి జెనరిక్ మందు 1 *","ta":"ஜன் ஔஷதி பொது மருந்து 1 *","mr":"जन औषधी जेनेरिक औषध १ *","bn":"জন ঔষধি জেনেরিক ওষুধ ১ *","kn":"ಜನೌಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿ 1 *"},
    "Jan Aushadhi Generic Medicine 2": {"hi":"जन औषधि जेनेरिक दवा 2","te":"జన్ ఔషధి జెనరిక్ మందు 2","ta":"ஜன் ஔஷதி பொது மருந்து 2","mr":"जन औषधी जेनेरिक औषध २","bn":"জন ঔষধি জেনেরিক ওষুধ ২","kn":"ಜನೌಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿ 2"},
    "Issue e-Prescription": {"hi":"ई-प्रिस्क्रिप्शन जारी करें","te":"ఇ-ప్రిస్క్రిప్షన్ జారీ చేయండి","ta":"இ-மருந்துச் சீட்டை வழங்கவும்","mr":"ई-प्रिस्क्रिप्शन जारी करा","bn":"ই-প্রেসক্রিপশন জারি করুন","kn":"ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ನೀಡಿ"},
    "Husband Name": {"hi":"पति का नाम","te":"భర్త పేరు","ta":"கணவர் பெயர்","mr":"पतीचे नाव","bn":"স্বামীর নাম","kn":"ಗಂಡನ ಹೆಸರು"},
    "Gestational Weeks *": {"hi":"गर्भधारण के सप्ताह *","te":"గర్భధారణ వారాలు *","ta":"கர்ப்ப கால வாரங்கள் *","mr":"गर्भधारणेचे आठवडे *","bn":"গর্ভধারণের সপ্তাহ *","kn":"ಗರ್ಭಾವಸ್ಥೆಯ ವಾರಗಳು *"},
    "Hemoglobin (Hb)": {"hi":"हीमोग्लोबिन (Hb)","te":"హిమోగ్లోబిన్ (Hb)","ta":"ஹீமோகுளோபின் (Hb)","mr":"हिमोग्लोबिन (Hb)","bn":"হিমোগ্লোবিন (Hb)","kn":"ಹಿಮೋಗ್ಲೋಬಿನ್ (Hb)"},
    "Risk Category": {"hi":"जोखिम श्रेणी","te":"ప్రమాద వర్గం","ta":"ஆபத்து பிரிவு","mr":"जोखीम श्रेणी","bn":"ঝুঁকির শ্রেণী","kn":"ಅಪಾಯ ವರ್ಗ"},
    "Save to Register": {"hi":"रजिस्टर में सहेजें","te":"రిజిస్టర్‌లో సేవ్ చేయండి","ta":"பதிவேட்டில் சேமிக்கவும்","mr":"नोंदवहीत जतन करा","bn":"রেজিস্টারে সংরক্ষণ করুন","kn":"ದಾಖಲೆಗೆ ಉಳಿಸಿ"},
    "Add Child Immunization Record (UIP)": {"hi":"बाल टीकाकरण रिकॉर्ड जोड़ें (UIP)","te":"పిల్లల టీకా రికార్డును చేర్చండి (UIP)","ta":"குழந்தை தடுப்பூசி பதிவைச் சேர்க்க (UIP)","mr":"बाल लसीकरण नोंद जोडा (UIP)","bn":"শিশু টিকাদান রেকর্ড যোগ করুন (UIP)","kn":"ಮಕ್ಕಳ ಲಸಿಕೆ ದಾಖಲೆ ಸೇರಿಸಿ (UIP)"},
    "Child Full Name *": {"hi":"बच्चे का पूरा नाम *","te":"పిల్లల పూర్తి పేరు *","ta":"குழந்தையின் முழுப் பெயர் *","mr":"मुलाचे पूर्ण नाव *","bn":"শিশুর সম্পূর্ণ নাম *","kn":"ಮಗುವಿನ ಪೂರ್ಣ ಹೆಸರು *"},
    "Parent Name *": {"hi":"माता/पिता का नाम *","te":"తల్లిదండ్రుల పేరు *","ta":"பெற்றோர் பெயர் *","mr":"पालकांचे नाव *","bn":"পিতা-মাতার নাম *","kn":"ಪೋಷಕರ ಹೆಸರು *"},
    "Date of Birth *": {"hi":"जन्म तिथि *","te":"పుట్టిన తేదీ *","ta":"பிறந்த தேதி *","mr":"जन्मतारीख *","bn":"জন্ম তারিখ *","kn":"ಹುಟ್ಟಿದ ದಿನಾಂಕ *"},
    "Administered Vaccine Dosage *": {"hi":"दी गई वैक्सीन खुराक *","te":"ఇచ్చిన టీకా మోతాదు *","ta":"வழங்கப்பட்ட தடுப்பூசி அளவு *","mr":"दिलेली लस मात्रा *","bn":"প্রদত্ত টিকার ডোজ *","kn":"ನೀಡಲಾದ ಲಸಿಕೆಯ ಪ್ರಮಾಣ *"},
    "Save Vaccine Record": {"hi":"टीकाकरण रिकॉर्ड सहेजें","te":"టీకా రికార్డును సేవ్ చేయండి","ta":"தடுப்பூசி பதிவைச் சேமிக்கவும்","mr":"लसीकरण नोंद जतन करा","bn":"টিকাদান রেকর্ড সংরক্ষণ করুন","kn":"ಲಸಿಕೆ ದಾಖಲೆ ಉಳಿಸಿ"},
    "Schedule Village Home Visit": {"hi":"ग्रामीण गृह भ्रमण निर्धारित करें","te":"గ్రామ గృహ సందర్శనను షెడ్యూల్ చేయండి","ta":"கிராம வீட்டுப் பார்வையைத் திட்டமிடுங்கள்","mr":"गाव घरभेट नियोजित करा","bn":"গ্রাম পরিদর্শন নির্ধারণ করুন","kn":"ಗ್ರಾಮ ಗೃಹ ಭೇಟಿ ನಿಗದಿಪಡಿಸಿ"},
    "Household Address / Resident *": {"hi":"घर का पता / निवासी *","te":"ఇంటి చిరునామా / నివాసి *","ta":"வீட்டு முகவரி / வசிப்பவர் *","mr":"घराचा पत्ता / रहिवासी *","bn":"বাড়ির ঠিকানা / বাসিন্দা *","kn":"ಮನೆಯ ವಿಳಾಸ / ನಿವಾಸಿ *"},
    "Family Members Count": {"hi":"परिवार के सदस्यों की संख्या","te":"కుటుంబ సభ్యుల సంఖ్య","ta":"குடும்ப உறுப்பினர்களின் எண்ணிக்கை","mr":"कुटुंबातील सदस्यांची संख्या","bn":"পরিবারের সদস্য সংখ্যা","kn":"ಕುಟುಂಬದ ಸದಸ್ಯರ ಸಂಖ್ಯೆ"},
    "Priority Level": {"hi":"प्राथमिकता स्तर","te":"ప్రాధాన్యత స్థాయి","ta":"முன்னுரிமை நிலை","mr":"प्राधान्य पातळी","bn":"অগ্রাধিকার স্তর","kn":"ಆದ್ಯತೆಯ ಮಟ್ಟ"},
    "Routine Check": {"hi":"नियमित जांच","te":"సాధారణ తనిಖీ","ta":"வழக்கமான பரிசோதனை","mr":"नियमित तपासणी","bn":"নিয়মিত পরীক্ষা","kn":"ನಿಯಮಿತ ತಪಾಸಣೆ"},
    "ANC Follow-up": {"hi":"एएनसी फॉलो-अप","te":"ANC తదుపరి పరీక్ష","ta":"ANC பின்தொடர்தல்","mr":"एएनसी पाठपुरावा","bn":"এএনসি ফলো-আপ","kn":"ANC ಮುಂದಿನ ತಪಾಸಣೆ"},
    "High-Risk Pregnancy": {"hi":"उच्च जोखिम वाली गर्भावस्था","te":"హై-రిస్క్ గర్భధారణ","ta":"அதிக ஆபத்துள்ள கர்ப்பம்","mr":"उच्च जोखीम गर्भधारणा","bn":"উচ্চ ঝুঁকিপূর্ণ গর্ভাবস্থা","kn":"ಹೆಚ್ಚಿನ ಅಪಾಯದ ಗರ್ಭಾವಸ್ಥೆ"},
    "NCD Diabetes/BP": {"hi":"एनसीडी मधुमेह / बीपी","te":"NCD మధుమేహం / BP","ta":"நீரிழிவு / இரத்த அழுத்தம்","mr":"मधुमेह / बीपी","bn":"এনসিডি ডায়াবেটিস / বিপি","kn":"ಮಧುಮೇಹ / ರಕ್ತದೊತ್ತಡ"},
    "Field Task Description *": {"hi":"फील्ड कार्य विवरण *","te":"క్షేత్రస్థాయి పని వివరాలు *","ta":"களப்பணி விளக்கம் *","mr":"फील्ड कामाचे वर्णन *","bn":"কাজের বিবরণ *","kn":"ಕಾರ್ಯಕ್ಷೇತ್ರದ ವಿವರಣೆ *"},
    "Schedule Visit": {"hi":"भ्रमण निर्धारित करें","te":"సందర్శనను షెడ్యూల్ చేయండి","ta":"வருகையை திட்டமிடுக","mr":"भेट नियोजित करा","bn":"পরিদর্শন নির্ধারণ করুন","kn":"ಭೇಟಿ ನಿಗದಿಪಡಿಸಿ"},
    "Add Generic Medicine to Jan Aushadhi Catalog": {"hi":"जन औषधि सूची में जेनेरिक दवा जोड़ें","te":"జన్ ఔషధి కేటలాగ్‌కు జెనరిక్ మందును చేర్చండి","ta":"மக்கள் மருந்தக பட்டியலில் பொது மருந்தை சேர்க்க","mr":"जन औषधी सूचीमध्ये औषध जोडा","bn":"জন ঔষধি তালিকায় জেনেরিক ওষুধ যুক্ত করুন","kn":"ಜನೌಷಧಿ ಪಟ್ಟಿಗೆ ಜೆನೆರಿಕ್ ಔಷಧಿ ಸೇರಿಸಿ"},
    "Medicine Name & Strength *": {"hi":"दवा का नाम और मात्रा *","te":"మందు పేరు & సామర్థ్యం *","ta":"மருந்து பெயர் & வீரியம் *","mr":"औषधाचे नाव आणि प्रमाण *","bn":"ওষুধের নাম ও শক্তি *","kn":"ಔಷಧಿಯ ಹೆಸರು ಮತ್ತು ಸಾಮರ್ಥ್ಯ *"},
    "Therapeutic Category": {"hi":"उपचारात्मक श्रेणी","te":"చికిత్సా వర్గం","ta":"சிகிச்சை வகை","mr":"उपचारात्मक वर्ग","bn":"চিকিৎসা বিভাগ","kn":"ಚಿಕಿತ್ಸಾ ವರ್ಗ"},
    "Jan Aushadhi Price (₹) *": {"hi":"जन औषधि मूल्य (₹) *","te":"జన్ ఔషధి ధర (₹) *","ta":"ஜன் ஔஷதி விலை (₹) *","mr":"जन औषधी किंमत (₹) *","bn":"জন ঔষধি মূল্য (₹) *","kn":"ಜನೌಷಧಿ ಬೆಲೆ (₹) *"},
    "Brand Market Price (₹)": {"hi":"बाजार ब्रांड मूल्य (₹)","te":"మార్కెట్ బ్రాండ్ ధర (₹)","ta":"சந்தை விலை (₹)","mr":"बाजारातील ब्रँड किंमत (₹)","bn":"বাজারের দাম (₹)","kn":"ಮಾರುಕಟ್ಟೆ ಬೆಲೆ (₹)"},
    "Add to Catalog": {"hi":"कैटलॉग में जोड़ें","te":"కేటలాగ్‌కు జోడించండి","ta":"பட்டியலில் சேர்க்கவும்","mr":"सूचीमध्ये जोडा","bn":"তালিকায় যুক্ত করুন","kn":"ಪಟ್ಟಿಗೆ ಸೇರಿಸಿ"},
    "National Digital Health Mission (ABDM) ABHA Card Creation": {"hi":"राष्ट्रीय डिजिटल स्वास्थ्य मिशन (ABDM) आभा कार्ड निर्माण","te":"జాతీయ డిజిటల్ హెల్త్ మిషన్ (ABDM) ఆభా కార్డ్ సృష్టి","ta":"தேசிய டிஜிட்டல் சுகாதார இயக்கம் (ABDM) ஆபா அட்டை உருவாக்கம்","mr":"राष्ट्रीय डिजिटल आरोग्य अभियान (ABDM) आभा कार्ड निर्मिती","bn":"জাতীয় ডিজিটাল স্বাস্থ্য মিশন (ABDM) আভা কার্ড তৈরি","kn":"ರಾಷ್ಟ್ರೀಯ ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ಮಿಷನ್ (ABDM) ಆಭಾ ಕಾರ್ಡ್ ರಚನೆ"},
    "Full Name (मरीज का नाम) *": {"hi":"पूरा नाम (मरीज का नाम) *","te":"పూర్తి పేరు (రోగి పేరు) *","ta":"முழு பெயர் (நோயாளி பெயர்) *","mr":"पूर्ण नाव (रुग्णाचे नाव) *","bn":"সম্পূর্ণ নাম (রোগীর নাম) *","kn":"ಪೂರ್ಣ ಹೆಸರು (ರೋಗಿಯ ಹೆಸರು) *"},
    "Mobile Number (मोबाइल नं.) *": {"hi":"मोबाइल नंबर (मोबाइल नं.) *","te":"మొబైల్ నంబర్ *","ta":"கைபேசி எண் *","mr":"मोबाइल क्रमांक *","bn":"মোবাইল নম্বর *","kn":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *"},
    "Village / Sub-Centre Ward (ग्राम / वार्ड) *": {"hi":"गांव / उप-केंद्र वार्ड (ग्राम / वार्ड) *","te":"గ్రామం / ఉప కేంద్ర వార్డు *","ta":"கிராமம் / துணை சுகாதார நிலைய வார்டு *","mr":"गाव / उपकेंद्र प्रभाग *","bn":"গ্রাম / উপকেন্দ্র ওয়ার্ড *","kn":"ಗ್ರಾಮ / ಉಪಕೇಂದ್ರ ವಾರ್ಡ್ *"},
    "Create Account Password or Security PIN *": {"hi":"खाता पासवर्ड या सुरक्षा पिन बनाएं *","te":"ఖాతా పాస్‌వర్డ్ లేదా సెక్యూరిటీ పిన్‌ను సృష్టించండి *","ta":"கணக்கு கடவுச்சொல் அல்லது பாதுகாப்பு பின்னை உருவாக்கவும் *","mr":"खाते पासवर्ड किंवा सुरक्षा पिन तयार करा *","bn":"অ্যাকাউন্ট পাসওয়ার্ড বা সুরক্ষা পিন তৈরি করুন *","kn":"ಖಾತೆ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಭದ್ರತಾ ಪಿನ್ ರಚಿಸಿ *"},
    "An official": {"hi":"एक आधिकारिक","te":"ఒక అధికారిక","ta":"ஒரு அதிகாரப்பூர்வ","mr":"एक अधिकृत","bn":"একটি অফিসিয়াল","kn":"ಒಂದು ಅಧಿಕೃತ"},
    "14-digit Ayushman Bharat ABHA Health Card": {"hi":"14-अंकीय आयुष्मान भारत आभा स्वास्थ्य कार्ड","te":"14-అంకెల ఆయుష్మాన్ భారత్ ఆభా హెల్త్ కార్డ్","ta":"14-இலக்க ஆயுஷ்மான் பாரத் ஆபா சுகாதார அட்டை","mr":"14-अंकी आयुष्मान भारत आभा आरोग्य कार्ड","bn":"14-সংখ্যার আয়ুষ্মান ভারত আভা হেলথ কার্ড","kn":"14-ಅಂಕಿಯ ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಆಭಾ ಆರೋಗ್ಯ ಕಾರ್ಡ್"},
    "will be generated automatically and saved to your cloud profile.": {"hi":"स्वचालित रूप से उत्पन्न होगा और आपके क्लाउड प्रोफाइल में सहेजा जाएगा।","te":"ఆటోమేటిక్‌గా రూపొందించబడి మీ ప్రొఫైల్‌లో సేవ్ చేయబడుతుంది.","ta":"தானாக உருவாக்கப்பட்டு உங்கள் கிளவுட் சுயவிவரத்தில் சேமிக்கப்படும்.","mr":"आपोआप तयार होऊन तुमच्या प्रोफाइलमध्ये जतन केले जाईल.","bn":"স্বয়ংক্রিয়ভাবে তৈরি হবে এবং আপনার ক্লাউড প্রোফাইলে সংরক্ষিত হবে।","kn":"ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚನೆಯಾಗಿ ನಿಮ್ಮ ಪ್ರೊಫೈಲ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗುತ್ತದೆ."},
    "Register & Generate ABHA Card": {"hi":"पंजीकरण करें और आभा कार्ड बनाएं","te":"నమోదు చేసుకోండి & ఆభా కార్డును పొందండి","ta":"பதிவு செய்து ஆபா அட்டையை உருவாக்கவும்","mr":"नोंदणी करा आणि आभा कार्ड तयार करा","bn":"নিবন্ধন করুন এবং আভা কার্ড তৈরি করুন","kn":"ನೋಂದಾಯಿಸಿ ಮತ್ತು ಆಭಾ ಕಾರ್ಡ್ ಪಡೆಯಿರಿ"},
    "Multiple Portals Found": {"hi":"एकाधिक पोर्टल मिले","te":"బహుళ పోర్టల్‌లు కనుగొనబడ్డాయి","ta":"பல போர்ட்டல்கள் கண்டறியப்பட்டன","mr":"अनेक पोर्टल सापडले","bn":"একাধিক পোর্টাল পাওয়া গেছে","kn":"ಹಲವಾರು ಪೋರ್ಟಲ್‌ಗಳು ಕಂಡುಬಂದಿವೆ"},
    "Your mobile number is registered for multiple healthcare roles. Select which portal you wish to enter:": {"hi":"आपका मोबाइल नंबर कई स्वास्थ्य सेवा भूमिकाओं के लिए पंजीकृत है। चुनें कि आप किस पोर्टल में प्रवेश करना चाहते हैं:","te":"మీ మొబైల్ నంబర్ బహుళ పాత్రల కోసం నమోదు చేయబడింది. మీరు ఏ పోర్టల్‌లోకి ప్రవేశించాలనుకుంటున్నారో ఎంచుకోండి:","ta":"உங்கள் கைபேசி எண் பல பணிகளுக்கு பதிவு செய்யப்பட்டுள்ளது. நீங்கள் நுழைய விரும்பும் போர்ட்டலைத் தேர்ந்தெடுக்கவும்:","mr":"तुमचा मोबाईल क्रमांक अनेक भूमिकांसाठी नोंदणीकृत आहे. तुम्हाला कोणत्या पोर्टलमध्ये प्रवेश करायचा आहे ते निवडा:","bn":"আপনার মোবাইল নম্বরটি একাধিক ভূমিকার জন্য নিবন্ধিত। আপনি কোন পোর্টালে প্রবেশ করতে চান তা নির্বাচন করুন:","kn":"ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಹಲವು ಪಾತ್ರಗಳಿಗೆ ನೋಂದಾಯಿಸಲಾಗಿದೆ. ನೀವು ಪ್ರವೇಶಿಸಲು ಬಯಸುವ ಪೋರ್ಟಲ್ ಆಯ್ಕೆಮಾಡಿ:"},
    "Provision Healthcare Personnel": {"hi":"स्वास्थ्य कर्मियों की नियुक्ति / प्रावधान","te":"ఆరోగ్య కార్యకర్తల నియామకం","ta":"சுகாதாரப் பணியாளர்களை நியமிக்கவும்","mr":"आरोग्य कर्मचाऱ्यांची नियुक्ती","bn":"স্বাস্থ্যকর্মী নিয়োগ","kn":"ಆರೋಗ್ಯ ಸಿಬ್ಬಂದಿ ನಿಯೋಜನೆ"},
    "Select Role *": {"hi":"भूमिका चुनें *","te":"పాత్రను ఎంచుకోండి *","ta":"பணியைத் தேர்ந்தெடுக்கவும் *","mr":"भूमिका निवडा *","bn":"ভূমিকা নির্বাচন করুন *","kn":"ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ *"},
    "Health Administrator (District HQ)": {"hi":"स्वास्थ्य प्रशासक (जिला मुख्यालय)","te":"ఆరోగ్య నిర్వాహకుడు (జిల్లా ప్రధాన కార్యాలయం)","ta":"சுகாதார நிர்வாகி (மாவட்ட தலைமையகம்)","mr":"आरोग्य प्रशासक (जिल्हा मुख्यालय)","bn":"স্বাস্থ্য প্রশাসক (জেলা সদর)","kn":"ಆರೋಗ್ಯ ಆಡಳಿತಾಧಿಕಾರಿ (ಜಿಲ್ಲಾ ಕೇಂದ್ರ)"},
    "Official Mobile Number *": {"hi":"आधिकारिक मोबाइल नंबर *","te":"అధికారిక మొబైల్ నంబర్ *","ta":"அதிகாரப்பூர்வ கைபேசி எண் *","mr":"अधिकृत मोबाइल क्रमांक *","bn":"অফিসিয়াল মোবাইল নম্বর *","kn":"ಅಧಿಕೃತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *"},
    "License / Registration ID *": {"hi":"लाइसेंस / पंजीकरण आईडी *","te":"లైసెన్స్ / రిజిస్ట్రేషన్ ID *","ta":"உரிமம் / பதிவு ஐடி *","mr":"परवाना / नोंदणी आयडी *","bn":"লাইসেন্স / নিবন্ধন আইডি *","kn":"ಪರವಾನಗಿ / ನೋಂದಣಿ ಐಡಿ *"},
    "Set Initial Temporary Password / PIN *": {"hi":"प्रारंभिक अस्थायी पासवर्ड / पिन सेट करें *","te":"ప్రారంభ తాత్కాలిక పాస్‌వర్డ్ / పిన్ సెట్ చేయండి *","ta":"ஆரம்ப தற்காலிக கடவுச்சொல் / பின்னை அமைக்கவும் *","mr":"सुरुवातीचा तात्पुरता पासवर्ड / पिन सेट करा *","bn":"প্রাথমিক অস্থায়ী পাসওয়ার্ড / পিন সেট করুন *","kn":"ಆರಂಭಿಕ ತಾತ್ಕಾಲಿಕ ಪಾಸ್‌ವರ್ಡ್ / ಪಿನ್ ಹೊಂದಿಸಿ *"},
    "Staff member can change this to a private password upon logging in.": {"hi":"कर्मचारी सदस्य लॉगिन करने पर इसे निजी पासवर्ड में बदल सकते हैं।","te":"సిబ్బంది లాగిన్ అయిన తర్వాత దీనిని ప్రైవేట్ పాస్‌వర్డ్‌గా మార్చుకోవచ్చు.","ta":"பணியாளர் உள்நுழைந்த பிறகு இதை தனிப்பட்ட கடவுச்சொல்லாக மாற்றலாம்.","mr":"कर्मचारी लॉग इन केल्यानंतर हा पासवर्ड बदलू शकतात.","bn":"কর্মী লগইন করার পর এটি ব্যক্তিগত পাসওয়ার্ডে পরিবর্তন করতে পারেন।","kn":"ಸಿಬ್ಬಂದಿ ಲಾಗಿನ್ ಆದ ನಂತರ ಇದನ್ನು ಖಾಸಗಿ ಪಾಸ್‌ವರ್ಡ್ ಆಗಿ ಬದಲಾಯಿಸಬಹುದು."},
    "Provision & Save to Cloud": {"hi":"प्रावधान करें और क्लाउड में सहेजें","te":"నియమించి క్లౌడ్‌లో సేవ్ చేయండి","ta":"நியமித்து கிளவுடில் சேமிக்கவும்","mr":"नियुक्ती करा आणि क्लाउडवर जतन करा","bn":"নিয়োগ করুন এবং ক্লাউডে সংরক্ষণ করুন","kn":"ನಿಯೋಜಿಸಿ ಮತ್ತು ಕ್ಲೌಡ್‌ನಲ್ಲಿ ಉಳಿಸಿ"},
    "Change Account Password": {"hi":"खाता पासवर्ड बदलें","te":"ఖాతా పాస్‌వర్డ్ మార్చండి","ta":"கணக்கு கடவுச்சொல்லை மாற்றுக","mr":"खाते पासवर्ड बदला","bn":"অ্যাকাউন্ট পাসওয়ার্ড পরিবর্তন করুন","kn":"ಖಾತೆ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ"},
    "Update your private security credentials": {"hi":"अपने निजी सुरक्षा क्रेडेंशियल अपडेट करें","te":"మీ ప్రైవేట్ భద్రతా వివరాలను నవీకరించండి","ta":"உங்கள் தனிப்பட்ட பாதுகாப்பு சான்றுகளை புதுப்பிக்கவும்","mr":"तुमचे वैयक्तिक सुरक्षा तपशील अद्ययावत करा","bn":"আপনার ব্যক্তিগত নিরাপত্তা তথ্য আপডেট করুন","kn":"ನಿಮ್ಮ ಖಾಸಗಿ ಭದ್ರತಾ ವಿವರಗಳನ್ನು ನವೀಕರಿಸಿ"},
    "New Password / PIN *": {"hi":"नया पासवर्ड / पिन *","te":"కొత్త పాస్‌వర్డ్ / పిన్ *","ta":"புதிய கடவுச்சொல் / பின் *","mr":"नवीन पासवर्ड / पिन *","bn":"নতুন পাসওয়ার্ড / পিন *","kn":"ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ / ಪಿನ್ *"},
    "Confirm New Password *": {"hi":"नए पासवर्ड की पुष्टि करें *","te":"కొత్త పాస్‌వర్డ్‌ను నిర్ధారించండి *","ta":"புதிய கடவுச்சொல்லை உறுதிப்படுத்தவும் *","mr":"नवीन पासवर्डची पुष्टी करा *","bn":"নতুন পাসওয়ার্ড নিশ্চিত করুন *","kn":"ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ *"},
    "Update Password": {"hi":"पासवर्ड अपडेट करें","te":"పాస్‌వర్డ్‌ను నవీకరించండి","ta":"கடவுச்சொல்லைப் புதுப்பிக்கவும்","mr":"पासवर्ड अद्यतन करा","bn":"পাসওয়ার্ড আপডেট করুন","kn":"ಪಾಸ್‌ವರ್ಡ್ ನವೀಕರಿಸಿ"},
    "ABHA Creation & Direct Teleconsultation OPD Dispatch": {"hi":"आभा निर्माण और प्रत्यक्ष टेलीकंसल्टेशन ओपीडी प्रेषण","te":"ఆభా సృష్టి & ప్రత్యక్ష టెలికన్సల్టేషన్ OPD పంపకం","ta":"ஆபா உருவாக்கம் & நேரடி தொலைமருத்துவ OPD பரிந்துரை","mr":"आभा निर्मिती आणि थेट टेलिकन्सल्टेशन ओपीडी पाठवणे","bn":"আভা তৈরি এবং সরাসরি ওপিডি টেলিমেডিসিন প্রেরণ","kn":"ಆಭಾ ರಚನೆ & ನೇರ ಟೆಲಿಸಮಾಲೋಚನೆ OPD ರವಾನೆ"},
    "Mobile Number *": {"hi":"मोबाइल नंबर *","te":"మొబైల్ నంబర్ *","ta":"கைபேசி எண் *","mr":"मोबाइल क्रमांक *","bn":"মোবাইল নম্বর *","kn":"ಮೊಬೈಲ್ ಸಂಖ್ಯೆ *"},
    "Village / Ward Address *": {"hi":"गांव / वार्ड का पता *","te":"గ్రామం / వార్డు చిరునామా *","ta":"கிராமம் / வார்டு முகவரி *","mr":"गाव / प्रभाग पत्ता *","bn":"গ্রাম / ওয়ার্ডের ঠিকানা *","kn":"ಗ್ರಾಮ / ವಾರ್ಡ್ ವಿಳಾಸ *"},
    "BP Recorded": {"hi":"दर्ज बीपी","te":"నమోదైన BP","ta":"பதிவுசெய்யப்பட்ட BP","mr":"नोंदवलेला बीपी","bn":"রেকর্ডকৃত বিপি","kn":"ದಾಖಲಾದ BP"},
    "Temp": {"hi":"तापमान","te":"ఉష్ణోగ్రత","ta":"வெப்பநிலை","mr":"तापमान","bn":"তাপমাত্রা","kn":"ತಾಪಮಾನ"},
    "Triage Priority": {"hi":"ट्राइएज प्राथमिकता","te":"ట్రయాజ్ ప్రాధాన్యత","ta":"முன்னுரிமை நிலை","mr":"प्राधान्य पातळी","bn":"ট্রায়াজ অগ্রাধিকার","kn":"ಆದ್ಯತೆಯ ಮಟ್ಟ"},
    "Immediate Connection with Registered Medical Officer": {"hi":"पंजीकृत चिकित्सा अधिकारी के साथ तत्काल संपर्क","te":"వైద్యాధికారితో తక్షణ సంప్రదింపులు","ta":"மருத்துவ அதிகாரியுடன் உடனடி இணைப்பு","mr":"नोंदणीकृत वैद्यकीय अधिकाऱ्याशी त्वरित संपर्क","bn":"চিকিৎসকের সাথে তাত্ক্ষণিক সংযোগ","kn":"ನೋಂದಾಯಿತ ವೈದ್ಯಾಧಿಕಾರಿಯೊಂದಿಗೆ ತಕ್ಷಣದ ಸಂಪರ್ಕ"},
    "Describe Your Symptoms / Problem *": {"hi":"अपने लक्षण / समस्या का वर्णन करें *","te":"మీ లక్షణాలు / సమస్యను వివరించండి *","ta":"உங்கள் அறிகுறிகள் / பிரச்சனையை விவரிக்கவும் *","mr":"तुमची लक्षणे / समस्येचे वर्णन करा *","bn":"আপনার লক্ষণ / সমস্যা বর্ণনা করুন *","kn":"ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳು / ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ *"},
    "Duration of Illness": {"hi":"बीमारी की अवधि","te":"అనారోగ్య సమయం","ta":"நோயின் கால அளவு","mr":"आजाराचा कालावधी","bn":"অসুস্থতার সময়কাল","kn":"ಅನಾರೋಗ್ಯದ ಅವಧಿ"},
    "Urgency Level": {"hi":"तात्कालिकता स्तर","te":"అత్యవసర స్థాయి","ta":"அவசர நிலை","mr":"तातडीची पातळी","bn":"জরুরিতা স্তর","kn":"ತುರ್ತು ಮಟ್ಟ"},
    "Moderate / Uncomfortable": {"hi":"मध्यम / असहज","te":"మధ్యస్థం / అసౌకర్యం","ta":"மிதமான / அசௌகரியம்","mr":"मध्यम / अस्वस्थ","bn":"মাঝারি / অস্বস্তিকর","kn":"ಮಧ್ಯಮ / ಅಹಿತಕರ"},
    "Body Temperature (Optional)": {"hi":"शरीर का तापमान (वैकल्पिक)","te":"శరీర ఉష్ణోగ్రత (ఐచ్ఛికం)","ta":"உடல் வெப்பநிலை (விருப்பத்தேர்வு)","mr":"शरीराचे तापमान (पर्यायी)","bn":"শরীরের তাপমাত্রা (ঐচ্ছিক)","kn":"ದೇಹದ ತಾಪಮಾನ (ಐಚ್ಛಿಕ)"},
    "Swasthya Setu User Guide & Help Center": {"hi":"स्वास्थ्य सेतु उपयोगकर्ता गाइड और सहायता केंद्र","te":"స్వాస్థ್ಯ సేతు యూజర్ గైడ్ & సహాయ కేంద్రం","ta":"ஸ்வாஸ்த்ய சேது பயனர் கையேடு & உதவி மையம்","mr":"स्वास्थ्य सेतू वापरकर्ता मार्गदर्शक आणि मदत केंद्र","bn":"স্বাস্থ্য সেতু ব্যবহারকারী নির্দেশিকা ও সহায়তা কেন্দ্র","kn":"ಸ್ವಾಸ್ಥ್ಯ ಸೇತು ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಸಹಾಯ ಕೇಂದ್ರ"},
    "Role Tutorials, Step-by-Step Instructions & FAQs": {"hi":"भूमिका ट्यूटोरियल, चरण-दर-चरण निर्देश और अक्सर पूछे जाने वाले प्रश्न","te":"పాత్ర శిక్షణలు, దశలవారీ సూచనలు & సాధారణ ప్రశ్నలు","ta":"பணி பயிற்சிகள், படிப்படியான வழிமுறைகள் & அடிக்கடி கேட்கப்படும் கேள்விகள்","mr":"भूमिका ट्यूटोरियल, टप्प्याटप्प्याने सूचना आणि सामान्य प्रश्न","bn":"ভূমিকা টিউটোরিয়াল, ধাপে ধাপে নির্দেশাবলী এবং সাধারণ জিজ্ঞাসা","kn":"ಪಾತ್ರ ಮಾರ್ಗದರ್ಶಿ, ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳು & ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು"},
    "Request Teleconsultation": {"hi":"टेलीकंसल्टेशन का अनुरोध करें","te":"టెలికన్సల్టేషన్ అభ్యర్థించండి","ta":"தொலைமருத்துவத்தை கோருங்கள்","mr":"टेलिकन्सल्टेशनची विनंती करा","bn":"টেলিকনসাল্টেশনের অনুরোধ করুন","kn":"ಟೆಲಿಸಮಾಲೋಚನೆ ವಿನಂತಿಸಿ"},
    "Delete Prescriptions": {"hi":"प्रिस्क्रिप्शन हटाएं","te":"ప్రిస్క్రిప్షన్ తొలగించండి","ta":"மருந்துச் சீட்டை நீக்கு","mr":"प्रिस्क्रिप्शन हटवा","bn":"প্রেসক্রিপশন মুছুন","kn":"ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಅಳಿಸಿ"},
    "Manage OPD Queue": {"hi":"ओपीडी कतार का प्रबंधन करें","te":"OPD క్యూని నిర్వహించండి","ta":"OPD வரிசையை நிர்வகிக்கவும்","mr":"ओपीडी रांगेचे व्यवस्थापन करा","bn":"ওপিডি সারি পরিচালনা করুন","kn":"OPD ಸರತಿ ನಿರ್ವಹಿಸಿ"},
    "Conduct Consultation": {"hi":"परामर्श आयोजित करें","te":"సంప్రదింపులు జరపండి","ta":"ஆலோசனை நடத்துங்கள்","mr":"सल्लामसलत करा","bn":"পরামর্শ পরিচালনা করুন","kn":"ಸಮಾಲೋಚನೆ ನಡೆಸಿ"},
    "Instant Queue Removal": {"hi":"कतार से तत्काल निष्कासन","te":"క్యూ నుండి తక్షణమే తొలగించడం","ta":"வரிசையிலிருந்து உடனடி நீக்கம்","mr":"रांगेतून त्वरित काढणे","bn":"সারি থেকে তাত্ক্ষণিক অপসারণ","kn":"ಸರತಿಯಿಂದ ತಕ್ಷಣದ ತೆರವು"},
    "Dynamic PDF Export": {"hi":"डायनामिक पीडीएफ निर्यात","te":"డైనమిక్ PDF ఎగుమతి","ta":"பிடிஎஃப் ஏற்றுமதி","mr":"डायनॅमिक पीडीएफ निर्यात","bn":"ডায়নামিক পিডিএফ রপ্তানি","kn":"ಡೈನಾಮಿಕ್ PDF ರಫ್ತು"},
    "Register & Refer Patients": {"hi":"मरीजों का पंजीकरण और रेफर करें","te":"రోగులను నమోదు చేసి రిఫర్ చేయండి","ta":"நோயாளிகளைப் பதிவு செய்து பரிந்துரைக்கவும்","mr":"रुग्णांची नोंदणी आणि संदर्भ द्या","bn":"রোগীদের নিবন্ধন ও রেফার করুন","kn":"ರೋಗಿಗಳನ್ನು ನೋಂದಾಯಿಸಿ ಮತ್ತು ಶಿಫಾರಸು ಮಾಡಿ"},
    "Maternal ANC Care": {"hi":"मातृ एएनसी देखभाल","te":"గర్భిణీల ANC సంరక్షణ","ta":"தாய்மை ANC பராமரிப்பு","mr":"माता एएनसी काळजी","bn":"মাতৃ এএনসি যত্ন","kn":"ಗರ್ಭಿಣಿಯರ ANC ಆರೈಕೆ"},
    "Child UIP Immunization": {"hi":"बाल यूआईपी टीकाकरण","te":"పిల్లల UIP టీకాలు","ta":"குழந்தை UIP தடுப்பூசி","mr":"बाल यूआयपी लसीकरण","bn":"শিশু ইউআইপি টিকাদান","kn":"ಮಕ್ಕಳ UIP ಲಸಿಕೆ"},
    "Master Field Registry": {"hi":"मास्टर फील्ड रजिस्ट्री","te":"మాస్టర్ ఫీల్డ్ రిజిస్ట్రీ","ta":"முதன்மை களப் பதிவேடு","mr":"मास्टर फील्ड नोंदवही","bn":"মাস্টার ফিল্ড রেজিস্ট্রি","kn":"ಮುಖ್ಯ ಕ್ಷೇತ್ರ ದಾಖಲಾತಿ"},
    "District Health Administrator Guide": {"hi":"जिला स्वास्थ्य प्रशासक गाइड","te":"జిల్లా ఆరోగ్య నిర్వాహకుల గైడ్","ta":"மாவட்ட சுகாதார நிர்வாகி வழிகாட்டி","mr":"जिल्हा आरोग्य प्रशासक मार्गदर्शक","bn":"জেলা স্বাস্থ্য প্রশাসক গাইড","kn":"ಜಿಲ್ಲಾ ಆರೋಗ್ಯ ಆಡಳಿತಾಧಿಕಾರಿ ಮಾರ್ಗದರ್ಶಿ"},
    "Provision Staff": {"hi":"कर्मचारियों की नियुक्ति","te":"సిబ్బంది నియామకం","ta":"பணியாளர்களை நியமிக்கவும்","mr":"कर्मचाऱ्यांची तरतूद","bn":"কর্মী নিয়োগ","kn":"ಸಿಬ್ಬಂದಿ ನಿಯೋಜನೆ"},
    "Live Staff Removal": {"hi":"कर्मचारी निष्कासन","te":"సిబ్బందిని తొలగించడం","ta":"பணியாளரை நீக்குதல்","mr":"कर्मचारी काढणे","bn":"কর্মী অপসারণ","kn":"ಸಿಬ್ಬಂದಿ ತೆಗೆದುಹಾಕುವುದು"},
    "Frequently Asked Questions (FAQ)": {"hi":"अक्सर पूछे जाने वाले प्रश्न (FAQ)","te":"తరచుగా అడిగే ప్రశ్నలు (FAQ)","ta":"அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQ)","mr":"वारंवार विचारले जाणारे प्रश्न (FAQ)","bn":"সাধারণ জিজ্ঞাসা (FAQ)","kn":"ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು (FAQ)"},
    "How do I create or find my 14-digit ABHA Card?": {"hi":"मैं अपना 14-अंकीय आभा कार्ड कैसे बनाऊं या प्राप्त करूं?","te":"నా 14-అంకెల ఆభా కార్డును ఎలా సృష్టించాలి లేదా కనుగొనాలి?","ta":"எனது 14-இலக்க ஆபா அட்டையை எவ்வாறு உருவாக்குவது அல்லது கண்டுபிடிப்பது?","mr":"मी माझे १४-अंकी आभा कार्ड कसे तयार करू किंवा शोधू?","bn":"আমি কিভাবে আমার ১৪-সংখ্যার আভা কার্ড তৈরি বা খুঁজে পাব?","kn":"ನನ್ನ 14-ಅಂಕಿಯ ಆಭಾ ಕಾರ್ಡ್ ಅನ್ನು ಹೇಗೆ ರಚಿಸುವುದು ಅಥವಾ ಕಂಡುಹಿಡಿಯುವುದು?"},
    "Can I log in using my mobile number?": {"hi":"क्या मैं अपने मोबाइल नंबर का उपयोग करके लॉगिन कर सकता हूँ?","te":"నేను నా మొబైల్ నంబర్‌తో లాగిన్ అవ్వవచ్చా?","ta":"எனது கைபேசி எண்ணைப் பயன்படுத்தி உள்நுழைய முடியுமா?","mr":"मी माझ्या मोबाइल क्रमांकाने लॉग इन करू शकतो का?","bn":"আমি কি আমার মোবাইল নম্বর ব্যবহার করে লগইন করতে পারি?","kn":"ನನ್ನ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಿ ನಾನು ಲಾಗಿನ್ ಆಗಬಹುದೇ?"},
    "Yes! All roles (Citizens, Doctors, ASHA workers, and Admins) can log in using their 10-digit registered mobile number along with their private password. If you have multiple roles, a role selection menu will appear.": {"hi":"हाँ! सभी भूमिकाएँ (नागरिक, डॉक्टर, आशा कार्यकर्ता और प्रशासक) अपने 10-अंकीय पंजीकृत मोबाइल नंबर और पासवर्ड के साथ लॉगिन कर सकते हैं।","te":"అవును! అన్ని పాత్రలు (పౌరులు, వైద్యులు, ఆశా కార్యకర్తలు మరియు నిర్వాహకులు) తమ 10-అంకెల మొబైల్ నంబర్ మరియు పాస్‌వర్డ్‌తో లాగిన్ అవ్వవచ్చు.","ta":"ஆம்! அனைத்து பொறுப்புகளும் (குடிமக்கள், மருத்துவர்கள், ஆஷா பணியாளர்கள், நிர்வாகிகள்) தங்கள் 10-இலக்க கைபேசி எண் மற்றும் கடவுச்சொல் மூலம் உள்நுழையலாம்.","mr":"होय! सर्व भूमिका (नागरिक, डॉक्टर, आशा कार्यकर्त्या आणि प्रशासक) त्यांच्या १०-अंकी नोंदणीकृत मोबाइल क्रमांकाने लॉग इन करू शकतात.","bn":"হ্যাঁ! সমস্ত ভূমিকা (নাগরিক, ডাক্তার, আশা কর্মী এবং প্রশাসক) তাদের ১০-সংখ্যার নিবন্ধিত মোবাইল নম্বর এবং পাসওয়ার্ড দিয়ে লগইন করতে পারেন।","kn":"ಹೌದು! ಎಲ್ಲಾ ಪಾತ್ರಗಳು (ನಾಗರಿಕರು, ವೈದ್ಯರು, ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರು ಮತ್ತು ನಿರ್ವಾಹಕರು) ತಮ್ಮ 10-ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಮತ್ತು ಪಾಸ್‌ವರ್ಡ್ ಬಳಸಿ ಲಾಗಿನ್ ಆಗಬಹುದು."},
    "How does live cloud synchronization work?": {"hi":"लाइव क्लाउड सिंक्रोनाइज़ेशन कैसे काम करता है?","te":"లైవ్ క్లౌడ్ సింక్రొనైజేషన్ ఎలా పనిచేస్తుంది?","ta":"நேரலை கிளவுட் ஒத்திசைவு எவ்வாறு செயல்படுகிறது?","mr":"थेट क्लाउड सिंक्रोनाइझेशन कसे कार्य करते?","bn":"লাইভ ক্লাউড সিঙ্ক্রোনাইজেশন কিভাবে কাজ করে?","kn":"ಲೈವ್ ಕ್ಲೌಡ್ ಸಿಂಕ್ರೊನೈಸೇಶನ್ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?"},
    "Swasthya Setu is connected directly to Supabase PostgreSQL with real-time WebSockets. Any prescription issued, bed updated, or referral sent syncs instantly across all devices.": {"hi":"स्वास्थ्य सेतु रीयल-टाइम वेबसॉकेट्स के साथ सीधे जुड़ा हुआ है। जारी किया गया प्रिस्क्रिप्शन, बिस्तर अपडेट या भेजा गया रेफरल सभी उपकरणों पर तुरंत सिंक हो जाता है।","te":"స్వాస్థ్య సేతు రియల్-టైమ్ వెబ్‌సాకెట్‌లతో నేరుగా అనుసంధానించబడింది. జారీ చేయబడిన ప్రిస్క్రిప్షన్ లేదా అప్‌డేట్‌లు తక్షణమే అన్ని పరికరాల్లో సింక్ అవుతాయి.","ta":"ஸ்வாஸ்த்ய சேது நிகழ்நேர வெப்சாக்கெட்டுகளுடன் நேரடியாக இணைக்கப்பட்டுள்ளது. பரிந்துரைக்கப்பட்ட எந்த மருந்துச் சீட்டும் உடனடியாக அனைத்து சாதனங்களிலும் ஒத்திசைக்கப்படுகிறது.","mr":"स्वास्थ्य सेतू थेट रीअल-टाइम वेबसॉकेट्सने जोडलेला आहे. दिलेले कोणतेही प्रिस्क्रिप्शन किंवा माहिती सर्व उपकरणांवर त्वरित सिंक होते.","bn":"স্বাস্থ্য সেতু রিয়েল-টাইম ওয়েবসকেটের সাথে সরাসরি সংযুক্ত। যেকোনো প্রেসক্রিপশন বা আপডেট সমস্ত ডিভাইসে তাত্ক্ষণিকভাবে সিঙ্ক হয়।","kn":"ಸ್ವಾಸ್ಥ್ಯ ಸೇತು ನೈಜ-ಸಮಯದ ವೆಬ್‌ಸಾಕೆಟ್‌ಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕ ಹೊಂದಿದೆ. ನೀಡಲಾದ ಯಾವುದೇ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ತಕ್ಷಣವೇ ಎಲ್ಲಾ ಸಾಧನಗಳಲ್ಲಿ ಸಿಂಕ್ ಆಗುತ್ತದೆ."},
    "Got It, Close Guide": {"hi":"समझ गया, गाइड बंद करें","te":"అర్థమైంది, గైడ్‌ను మూసివేయండి","ta":"புரிந்தது, வழிகாட்டியை மூடவும்","mr":"समजले, मार्गदर्शक बंद करा","bn":"বুঝেছি, গাইড বন্ধ করুন","kn":"ಅರ್ಥವಾಯಿತು, ಗೈಡ್ ಮುಚ್ಚಿ"},
    "Connect Village Beneficiary to Medical Officer": {"hi":"ग्रामीण लाभार्थी को चिकित्सा अधिकारी से जोड़ें","te":"గ్రామ లబ్ధిదారుడిని వైద్యాధికారితో అనుసంధానించండి","ta":"கிராமப்புற பயனாளியை மருத்துவ அதிகாரியுடன் இணைக்கவும்","mr":"गाव लाभार्थ्याला वैद्यकीय अधिकाऱ्याशी जोडा","bn":"গ্রামীণ সুবিধাভোগীকে চিকিৎসকের সাথে যুক্ত করুন","kn":"ಗ್ರಾಮದ ಫಲಾನುಭವಿಯನ್ನು ವೈದ್ಯಾಧಿಕಾರಿಗೆ ಸಂಪರ್ಕಿಸಿ"},
    "Select Available Medical Officer *": {"hi":"उपलब्ध चिकित्सा अधिकारी चुनें *","te":"అందుబాటులో ఉన్న వైద్యాధికారిని ఎంచుకోండి *","ta":"இருப்பில் உள்ள மருத்துவ அதிகாரியைத் தேர்ந்தெடுக்கவும் *","mr":"उपलब्ध वैद्यकीय अधिकारी निवडा *","bn":"উপলব্ধ মেডিকেল অফিসার নির্বাচন করুন *","kn":"ಲಭ್ಯವಿರುವ ವೈದ್ಯಾಧಿಕಾರಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ *"},
    "Chief Reason / Symptoms *": {"hi":"मुख्य कारण / लक्षण *","te":"ప్రధాన కారణం / లక్షణాలు *","ta":"முக்கிய காரணம் / அறிகுறிகள் *","mr":"मुख्य कारण / लक्षणे *","bn":"প্রধান কারণ / লক্ষণ *","kn":"ಮುಖ್ಯ ಕಾರಣ / ರೋಗಲಕ್ಷಣಗಳು *"},
    "Dispatching SMS OTP...": {"hi":"एसएमएस ओटीपी भेजा जा रहा है...","te":"SMS OTP పంపుతోంది...","ta":"SMS OTP அனுப்பப்படுகிறது...","mr":"एसएमएस ओटीपी पाठवत आहे...","bn":"এসএমএস ওটিপি পাঠানো হচ্ছে...","kn":"SMS OTP ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ..."},
    "Verifying OTP PIN...": {"hi":"ओटीपी पिन सत्यापित किया जा रहा है...","te":"OTP పిన్ ధృవీకరిస్తోంది...","ta":"OTP பின் சரிபார்க்கப்படுகிறது...","mr":"ओटीपी पिन पडताळत आहे...","bn":"ওটিপি পিন যাচাই করা হচ্ছে...","kn":"OTP ಪಿನ್ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..."},
    "Choose Workspace Theme": {"hi":"कार्यक्षेत्र थीम चुनें","te":"వర్క్‌స్పేస్ థీమ్‌ను ఎంచుకోండి","ta":"பணியிட தீமைத் தேர்ந்தெடுக்கவும்","mr":"कार्यक्षेत्र थीम निवडा","bn":"ওয়ার্কস্পেস থিম নির্বাচন করুন","kn":"ಕಾರ್ಯಕ್ಷೇತ್ರದ ಥೀಮ್ ಆಯ್ಕೆಮಾಡಿ"},
    "Select your preferred clinical environment & visual palette": {"hi":"अपना पसंदीदा क्लिनिकल वातावरण और दृश्य पैलेट चुनें","te":"మీకు ఇష్టమైన క్లినికల్ వాతావరణం మరియు రంగులను ఎంచుకోండి","ta":"உங்களுக்கு விருப்பமான மருத்துவ சூழல் மற்றும் வண்ணங்களைத் தேர்ந்தெடுக்கவும்","mr":"तुमचे पसंतीचे क्लिनिकल वातावरण आणि रंग निवडा","bn":"আপনার পছন্দের পরিবেশ এবং রঙের প্যালেট নির্বাচন করুন","kn":"ನಿಮ್ಮ ಆದ್ಯತೆಯ ಕ್ಲಿನಿಕಲ್ ಪರಿಸರ ಮತ್ತು ಬಣ್ಣಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ"},
    "Classic Healthcare (White & Blue)": {"hi":"क्लासिक हेल्थकेयर (सफेद और नीला)","te":"క్లాసిక్ హెల్త్‌కేర్ (తెలుపు & నీలం)","ta":"கிளாசிக் ஹெல்த்கேர் (வெள்ளை மற்றும் நீலம்)","mr":"क्लासिक हेल्थकेअर (पांढरा आणि निळा)","bn":"ক্লাসিক হেলথকেয়ার (সাদা ও নীল)","kn":"ಕ್ಲಾಸಿಕ್ ಹೆಲ್ತ್‌ಕೇರ್ (ಬಿಳಿ & ನೀಲಿ)"},
    "Daylight clinical clarity, soft mesh gradients & clean typography": {"hi":"दिन के उजाले जैसी स्पष्टता, कोमल ग्रेडिएंट और स्वच्छ टाइपोग्राफी","te":"పగటిపూట స్పష్టత, మృదువైన రంగులు & స్పష్టమైన అక్షరాలు","ta":"பகலொளி மருத்துவ தெளிவு மற்றும் நேர்த்தியான எழுத்துரு","mr":"दिवसाची स्पष्टता, मऊ ग्रेडियंट्स आणि स्वच्छ अक्षरे","bn":"দিনের আলোর মতো স্বচ্ছতা மற்றும் পরিচ্ছন্ন লেখা","kn":"ಹಗಲಿನ ಸ್ಪಷ್ಟತೆ, ಮೃದುವಾದ ಗ್ರೇಡಿಯಂಟ್ ಮತ್ತು ಸ್ಪಷ್ಟ ಮುದ್ರಣ"},
    "Midnight Clinical (Deep Navy Glass)": {"hi":"मिडनाइट क्लिनिकल (डीप नेवी ग्लास)","te":"మిడ్‌నైట్ క్లినికల్ (డీప్ నేవీ గ్లాస్)","ta":"மிட்நைட் கிளினிக்கல் (ஆழ்ந்த நேவி கிளாஸ்)","mr":"मिडनाइट क्लिनिकल (डीप नेव्ही ग्लास)","bn":"মিডনাইট ক্লিনিকাল (ডিপ নেভি গ্লাস)","kn":"ಮಿಡ್‌ನೈಟ್ ಕ್ಲಿನಿಕಲ್ (ಡೀಪ್ ನೇವಿ ಗ್ಲಾಸ್)"},
    "Deep sapphire crystal glass with luminous neon accents": {"hi":"चमकदार नीयन लहजे के साथ गहरा नीलमणि क्रिस्टल ग्लास","te":"ప్రకాశవంతమైన నియాన్ రంగులతో కూడిన నీలమణి క్రిస్టల్ గ్లాస్","ta":"ஒளிரும் நியான் சிறப்பம்சங்களுடன் கூடிய ஆழ்ந்த படிக கண்ணாடி","mr":"चमकदार निऑन रंगांसह गडद नीलम क्रिस्टल ग्लास","bn":"উজ্জ্বল নিয়ন সহ গভীর নীল ক্রিস্টাল গ্লাস","kn":"ಪ್ರಕಾಶಮಾನವಾದ ನಿಯಾನ್ ಬಣ್ಣಗಳೊಂದಿಗೆ ಆಳವಾದ ನೀಲಮಣಿ ಗ್ಲಾಸ್"},
    "AMOLED Dark (Pure Pitch Black)": {"hi":"एमोलेड डार्क (प्योर पिच ब्लैक)","te":"AMOLED డార్క్ (ప్యూర్ బ్లాక్)","ta":"AMOLED டார்க் (முழு கருப்பு)","mr":"AMOLED डार्क (गडद काळा)","bn":"অ্যামোলেড ডার্ক (পিওর ব্ল্যাক)","kn":"AMOLED ಡಾರ್ಕ್ (ಪ್ಯೂರ್ ಬ್ಲ್ಯಾಕ್)"},
    "100% true black for battery saving & high-efficiency displays": {"hi":"बैटरी की बचत और उच्च दक्षता वाले डिस्प्ले के लिए 100% ट्रू ब्लैक","te":"బ్యాటరీ ఆదా మరియు అధిక సామర్థ్యం గల డిస్‌ప్లేల కోసం 100% నిజమైన నలుపు","ta":"பேட்டரி சேமிப்பு மற்றும் உயர் செயல்திறன் காட்சிகளுக்கான 100% உண்மை கருப்பு","mr":"बॅटरी बचत आणि उच्च कार्यक्षमतेच्या डिस्प्लेसाठी १००% खरा काळा","bn":"ব্যাটারি সাশ্রয় এবং উচ্চ-দক্ষ ডিসপ্লের জন্য ১০০% ট্রু ব্ল্যাক","kn":"ಬ್ಯಾಟರಿ ಉಳಿತಾಯ ಮತ್ತು ಹೆಚ್ಚಿನ ದಕ್ಷತೆಯ ಡಿಸ್ಪ್ಲೇಗಳಿಗಾಗಿ 100% ಕಪ್ಪು"},
    "Done": {"hi":"हो गया","te":"పూర్తయింది","ta":"முடிந்தது","mr":"पूर्ण झाले","bn":"সম্পন্ন","kn":"ಆಗಿದೆ"},
    "AI": {"hi":"एआई","te":"AI","ta":"AI","mr":"AI","bn":"এআই","kn":"AI"},
    "Assistant": {"hi":"सहायक","te":"సహాయకుడు","ta":"உதவியாளர்","mr":"सहाय्यक","bn":"সহকারী","kn":"ಸಹಾಯಕ"},
    "Swasthya AI Assistant": {"hi":"स्वास्थ्य एआई सहायक","te":"స్వాస్థ్య AI సహాయకుడు","ta":"ஸ்வாஸ்த்ய AI உதவியாளர்","mr":"स्वास्थ्य AI सहाय्यक","bn":"স্বাস্থ্য এআই সহকারী","kn":"ಸ್ವಾಸ್ಥ್ಯ AI ಸಹಾಯಕ"},
    "Clinical Intelligence · Gemini & ChatGPT Core": {"hi":"क्लिनिकल इंटेलिजेंस • जेमिनी और चैटजीपीटी कोर","te":"క్లినికల్ ఇంటెలిజెన్స్ • జెమినీ & ChatGPT కోర్","ta":"மருத்துவ நுண்ணறிவு • ஜெமினி மற்றும் ChatGPT","mr":"क्लिनिकल इंटेलिजन्स • जेमिनी आणि चॅटजीपीटी","bn":"ক্লিনিকাল ইন্টেলিজেন্স • জেমিনি এবং চ্যাটজিপিটি","kn":"ಕ್ಲಿನಿಕಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ • ಜೆಮಿನಿ & ChatGPT ಕೋರ್"},
    "Check Symptoms": {"hi":"लक्षण जांचें","te":"లక్షణాలు తనిఖీ చేయండి","ta":"அறிகுறிகளைச் சரிபார்க்கவும்","mr":"लक्षणे तपासा","bn":"লক্ষণ পরীক্ষা করুন","kn":"ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ"},
    "Generic Meds": {"hi":"जेनेरिक दवाएं","te":"జెనరిక్ మందులు","ta":"பொது மருந்துகள்","mr":"जेनेरिक औषधे","bn":"জেনেরিক ওষুধ","kn":"ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು"},
    "AI Intelligence Settings": {"hi":"एआई इंटेलिजेंस सेटिंग्स","te":"AI ఇంటెలిజెన్స్ సెట్టింగ్‌లు","ta":"AI நுண்ணறிவு அமைப்புகள்","mr":"AI बुद्धिमत्ता सेटिंग्ज","bn":"এআই ইন্টেলিজেন্স সেটিংস","kn":"AI ಇಂಟೆಲಿಜೆನ್ಸ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳು"},
    "Swasthya AI is equipped with an": {"hi":"स्वास्थ्य एआई सुसज्जित है:","te":"స్వాస్థ్య AI దీనితో అమర్చబడింది:","ta":"ஸ்வாஸ்த்ய AI இதில் பொருத்தப்பட்டுள்ளது:","mr":"स्वास्थ्य AI सुसज्ज आहे:","bn":"স্বাস্থ্য এআই সজ্জিত:","kn":"ಸ್ವಾಸ್ಥ್ಯ AI ಇದರೊಂದಿಗೆ ಸಜ್ಜುಗೊಂಡಿದೆ:"},
    "Onboard Clinical Medical Model": {"hi":"ऑनबोर्ड क्लिनिकल मेडिकल मॉडल","te":"ఆన్‌బోర్డ్ క్లినికల్ మెడికల్ మోడల్","ta":"உள்ளமைக்கப்பட்ட மருத்துவ மாதிரி","mr":"ऑनबोर्ड क्लिनिकल मेडिकल मॉडेल","bn":"অনবোর্ড ক্লিনিকাল মেডিকেল মডেল","kn":"ಆನ್‌ಬೋರ್ಡ್ ಕ್ಲಿನಿಕಲ್ ವೈದ್ಯಕೀಯ ಮಾದರಿ"},
    "that runs instantly with zero configuration. You can also connect a": {"hi":"जो बिना किसी कॉन्फ़िगरेशन के तुरंत चलता है। आप कनेक्ट भी कर सकते हैं:","te":"ఇది ఎటువంటి కాన్ఫిగరేషన్ లేకుండా తక్షణమే పనిచేస్తుంది. మీరు అనుసంధానించవచ్చు:","ta":"எந்த கட்டமைப்புமின்றி உடனடியாக இயங்குகிறது. நீங்கள் இணைக்கலாம்:","mr":"जे कोणत्याही मांडणीशिवाय त्वरित चालते. तुम्ही जोडू शकता:","bn":"যা কোনো কনফিগারেশন ছাড়াই তাত্ক্ষণিকভাবে চলে। আপনি যুক্ত করতে পারেন:","kn":"ಯಾವುದೇ ಸಂರಚನೆಯಿಲ್ಲದೆ ತಕ್ಷಣ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ. ನೀವು ಸಂಪರ್ಕಿಸಬಹುದು:"},
    "Google Gemini API Key": {"hi":"गूगल जेमिनी एपीआई कुंजी","te":"గూగుల్ జెమినీ API కీ","ta":"கூகுள் ஜெமினி API விசை","mr":"गुगल जेमिनी API की","bn":"গুগল জেমিনি এপিআই কি","kn":"ಗೂಗಲ್ ಜೆಮಿನಿ API ಕೀ"},
    "for cloud LLM reasoning.": {"hi":"क्लाउड एलएलएम तर्क के लिए।","te":"క్లౌడ్ LLM విశ్లేషణ కోసం.","ta":"கிளவுட் LLM பகுப்பாய்விற்கு.","mr":"क्लाउड LLM विश्लेषणासाठी.","bn":"ক্লাউড এলএলএম বিশ্লেষণের জন্য।","kn":"ಕ್ಲೌಡ್ LLM ವಿಶ್ಲೇಷಣೆಗಾಗಿ."},
    "Google Gemini API Key (Optional):": {"hi":"गूगल जेमिनी एपीआई कुंजी (वैकल्पिक):","te":"గూగుల్ జెమినీ API కీ (ఐచ్ఛికం):","ta":"கூகுள் ஜெமினி API விசை (விருப்பத்தேர்வு):","mr":"गुगल जेमिनी API की (पर्यायी):","bn":"গুগল জেমিনি এপিআই কি (ঐচ্ছিক):","kn":"ಗೂಗಲ್ ಜೆಮಿನಿ API ಕೀ (ಐಚ್ಛಿಕ):"},
    "Get your free key at": {"hi":"अपनी निःशुल्क कुंजी प्राप्त करें:","te":"మీ ఉచిత కీని ఇక్కడ పొందండి:","ta":"உங்கள் இலவச விசையை இங்கே பெறவும்:","mr":"तुमची मोफत की येथे मिळवा:","bn":"আপনার বিনামূল্যের কি পান:","kn":"ನಿಮ್ಮ ಉಚಿತ ಕೀಲಿಯನ್ನು ಇಲ್ಲಿ ಪಡೆಯಿರಿ:"},
    "Save Settings": {"hi":"सेटिंग्स सहेजें","te":"సెట్టింగ్‌లను సేవ్ చేయండి","ta":"அமைப்புகளைச் சேமிக்கவும்","mr":"सेटिंग्ज जतन करा","bn":"সেটিংস সংরক্ষণ করুন","kn":"ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ"},
    "Enter clinical password (e.g. doc@123 or 1234)": {"hi":"क्लिनिकल पासवर्ड दर्ज करें (उदा. doc@123 या 1234)","te":"క్లినికల్ పాస్‌వర్డ్ నమోదు చేయండి (ఉదా. doc@123 లేదా 1234)","ta":"மருத்துவ கடவுச்சொல்லை உள்ளிடவும் (எ.கா. doc@123 அல்லது 1234)","mr":"क्लिनिकल पासवर्ड प्रविष्ट करा (उदा. doc@123 किंवा 1234)","bn":"ক্লিনিকাল পাসওয়ার্ড লিখুন (যেমন doc@123 বা 1234)","kn":"ಕ್ಲಿನಿಕಲ್ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ (ಉದಾ. doc@123 ಅಥವಾ 1234)"},
    "Enter sector passcode (e.g. asha@123 or 1234)": {"hi":"सेक्टर पासकोड दर्ज करें (उदा. asha@123 या 1234)","te":"సెక్టార్ పాస్‌కోడ్ నమోదు చేయండి (ఉదా. asha@123 లేదా 1234)","ta":"துறை கடவுக்குறியீட்டை உள்ளிடவும் (எ.கா. asha@123 அல்லது 1234)","mr":"सेक्टर पासकोड प्रविष्ट करा (उदा. asha@123 किंवा 1234)","bn":"সেক্টর পাসকোড লিখুন (যেমন asha@123 বা 1234)","kn":"ವಲಯ ಪಾಸ್‌ಕೋಡ್ ನಮೂದಿಸಿ (ಉದಾ. asha@123 ಅಥವಾ 1234)"},
    "Enter master passcode (e.g. Aman@123)": {"hi":"मास्टर पासकोड दर्ज करें (उदा. Aman@123)","te":"మాస్టర్ పాస్‌కోడ్ నమోదు చేయండి (ఉదా. Aman@123)","ta":"முதன்மை கடவுக்குறியீட்டை உள்ளிடவும் (எ.கா. Aman@123)","mr":"मास्टर पासकोड प्रविष्ट करा (उदा. Aman@123)","bn":"মাস্টার পাসকোড লিখুন (যেমন Aman@123)","kn":"ಮಾಸ್ಟರ್ ಪಾಸ್‌ಕೋಡ್ ನಮೂದಿಸಿ (ಉದಾ. Aman@123)"},
    "Create your private password or PIN": {"hi":"अपना निजी पासवर्ड या पिन बनाएं","te":"మీ ప్రైవేట్ పాస్‌వర్డ్ లేదా పిన్‌ను సృష్టించండి","ta":"உங்கள் தனிப்பட்ட கடவுச்சொல் அல்லது பின்னை உருவாக்கவும்","mr":"तुमचा खाजगी पासवर्ड किंवा पिन तयार करा","bn":"আপনার ব্যক্তিগত পাসওয়ার্ড বা পিন তৈরি করুন","kn":"ನಿಮ್ಮ ಖಾಸಗಿ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಭದ್ರತಾ ಪಿನ್ ರಚಿಸಿ"},
    "Enter new private password": {"hi":"नया निजी पासवर्ड दर्ज करें","te":"కొత్త ప్రైవేట్ పాస్‌వర్డ్ నమోదు చేయండి","ta":"புதிய கடவுச்சொல்லை உள்ளிடவும்","mr":"नवीन खाजगी पासवर्ड प्रविष्ट करा","bn":"নতুন ব্যক্তিগত পাসওয়ার্ড লিখুন","kn":"ಹೊಸ ಖಾಸಗಿ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ"},
    "Re-enter new password": {"hi":"नया पासवर्ड पुनः दर्ज करें","te":"కొత్త పాస్‌వర్డ్‌ను మళ్లీ నమోదు చేయండి","ta":"புதிய கடவுச்சொல்லை மீண்டும் உள்ளிடவும்","mr":"नवीन पासवर्ड पुन्हा प्रविष्ट करा","bn":"নতুন পাসওয়ার্ড পুনরায় লিখুন","kn":"ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಅನ್ನು ಮತ್ತೆ ನಮೂದಿಸಿ"},

    // Top Bar & Global
    'Swasthya Setu': { hi: 'स्वास्थ्य सेतु', te: 'స్వాస్థ್ಯ సేతు', ta: 'ஸ்வாஸ்த்ய சேது', mr: 'स्वास्थ्य सेतू', bn: 'স্বাস্থ্য সেতু', kn: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು' },
    'RURAL HEALTHCARE CLOUD GRID': { hi: 'ग्रामीण स्वास्थ्य क्लाउड ग्रिड', te: 'గ్రామీణ ఆరోగ్య క్లౌడ్ గ్రిడ్', ta: 'கிராமப்புற சுகாதார கிளவுட் கிரிட்', mr: 'ग्रामीण आरोग्य क्लाउड ग्रिड', bn: 'গ্রামীণ স্বাস্থ্য ক্লাউড গ্রিড', kn: 'ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಕ್ಲೌಡ್ ಗ್ರಿಡ್' },
    'Theme': { hi: 'थीम', te: 'థీమ్', ta: 'தீம்', mr: 'थीम', bn: 'থিম', kn: 'ಥೀಮ್' },
    '108 SOS': { hi: '108 आपातकालीन सेवा', te: '108 అత్యవసర సేవ', ta: '108 அவசர சேவை', mr: '108 आपत्कालीन सेवा', bn: '১০৮ জরুরি সেবা', kn: '108 ತುರ್ತು ಸೇವೆ' },
    'Active Session': { hi: 'सक्रिय सत्र', te: 'క్రియాశీల సెషన్', ta: 'செயலில் உள்ள அமர்வு', mr: 'सक्रिय सत्र', bn: 'সক্রিয় সেশন', kn: 'ಸಕ್ರಿಯ ಅವಧಿ' },

    // Left Drawer
    'NAVIGATION & TOOLS': { hi: 'नेविगेशन और उपकरण', te: 'నావిగేషన్ & సాధనాలు', ta: 'வழிசெலுத்தல் மற்றும் கருவிகள்', mr: 'नेव्हिगेशन आणि साधने', bn: 'নেভিগেশন এবং সরঞ্জাম', kn: 'ನ್ಯಾವಿಗೇಷನ್ ಮತ್ತು ಉಪಕರಣಗಳು' },
    'Online Mode': { hi: 'ऑनलाइन मोड', te: 'ఆన్‌లైన్ మోడ్', ta: 'ஆன்லைன் பயன்முறை', mr: 'ऑनलाइन मोड', bn: 'অনলাইন মোড', kn: 'ಆನ್‌ಲೈನ್ ಮೋಡ್' },
    'Cloud Synced': { hi: 'क्लाउड सिंक हुआ', te: 'క్లౌడ్ సింక్ చేయబడింది', ta: 'கிளவுட் ஒத்திசைக்கப்பட்டது', mr: 'क्लाउड सिंक झाले', bn: 'ক্লাউড সিঙ্ক হয়েছে', kn: 'ಕ್ಲೌಡ್ ಸಿಂಕ್ ಆಗಿದೆ' },
    'Navigation & Settings': { hi: 'नेविगेशन और सेटिंग्स', te: 'నావిగేషన్ & సెట్టింగ్‌లు', ta: 'வழிசெலுத்தல் மற்றும் அமைப்புகள்', mr: 'नेव्हिगेशन आणि सेटिंग्ज', bn: 'নেভিগেশন এবং সেটিংস', kn: 'ನ್ಯಾವಿಗೇಷನ್ ಮತ್ತು ಸೆಟ್ಟಿಂಗ್‌ಗಳು' },
    'Home Dashboard': { hi: 'होम डैशबोर्ड', te: 'హోమ్ డ్యాష్‌బోర్డ్', ta: 'முகப்பு டாஷ்போர்டு', mr: 'मुख्य डॅशबोर्ड', bn: 'হোম ড্যাশবোর্ড', kn: 'ಮುಖಪುಟ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' },
    'Change Password': { hi: 'पासवर्ड बदलें', te: 'పాస్‌వర్డ్ మార్చండి', ta: 'கடவுச்சொல்லை மாற்றுக', mr: 'पासवर्ड बदला', bn: 'পাসওয়ার্ড পরিবর্তন করুন', kn: 'ಪಾಸ್‌ವರ್ಡ್ ಬದಲಾಯಿಸಿ' },
    'User Guide & Manual': { hi: 'उपयोगकर्ता गाइड और नियमावली', te: 'వినియోగదారు గైడ్ & మాన్యువల్', ta: 'பயனர் கையேடு மற்றும் கையேடு', mr: 'वापरकर्ता मार्गदर्शक आणि पुस्तिका', bn: 'ব্যবহারকারী গাইড ও ম্যানুয়াল', kn: 'ಬಳಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ಕೈಪಿಡಿ' },
    'Voice Read Aloud': { hi: 'आवाज़ में सुनें', te: 'వాయిస్ ద్వారా వినండి', ta: 'குரலில் கேட்கவும்', mr: 'मोठ्याने ऐका', bn: 'ভয়েস শুনুন', kn: 'ಧ್ವನಿ ಮೂಲಕ ಆಲಿಸಿ' },
    'Stop Voice': { hi: 'आवाज़ बंद करें', te: 'వాయిస్ ఆపండి', ta: 'குரலை நிறுத்துக', mr: 'आवाज थांबवा', bn: 'ভয়েস বন্ধ করুন', kn: 'ಧ್ವನಿಯನ್ನು ನಿಲ್ಲಿಸಿ' },
    'Switch Color Theme': { hi: 'रंग थीम बदलें', te: 'రంగు థీమ్ మార్చండి', ta: 'வண்ண தீமை மாற்றுக', mr: 'रंग थीम बदला', bn: 'রঙের থিম পরিবর্তন করুন', kn: 'ಬಣ್ಣದ ಥೀಮ್ ಬದಲಾಯಿಸಿ' },
    'Log Out / Change Portal': { hi: 'लॉग आउट / पोर्टल बदलें', te: 'లాగ్ అవుట్ / పోర్టల్ మార్చండి', ta: 'வெளியேறு / போர்ட்டலை மாற்று', mr: 'लॉग आउट / पोर्टल बदला', bn: 'লগ আউট / পোর্টাল পরিবর্তন', kn: 'ಲಾಗ್ ಔಟ್ / ಪೋರ್ಟಲ್ ಬದಲಾಯಿಸಿ' },
    '108 Emergency SOS': { hi: '108 आपातकालीन एसओएस', te: '108 అత్యవసర SOS', ta: '108 அவசர உதவி SOS', mr: '108 आपत्कालीन एसओएस', bn: '১০৮ জরুরি এসওএস', kn: '108 ತುರ್ತು SOS' },
    'Ayushman Bharat Digital Gateway': { hi: 'आयुष्मान भारत डिजिटल गेटवे', te: 'ఆయుష్మాన్ భారత్ డిజిటల్ గేట్‌వే', ta: 'ஆயுஷ்மான் பாரத் டிஜிட்டல் நுழைவாயில்', mr: 'आयुष्मान भारत डिजिटल गेटवे', bn: 'আয়ুষ্মান ভারত ডিজিটাল গেটওয়ে', kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಡಿಜಿಟಲ್ ಹೆಬ್ಬಾಗಿಲು' },
    'National Rural Telemedicine Grid v2.4': { hi: 'राष्ट्रीय ग्रामीण टेलीमेडिसिन ग्रिड v2.4', te: 'జాతీయ గ్రామీణ టెలిమెడిసిన్ గ్రిడ్ v2.4', ta: 'தேசிய கிராமப்புற தொலைமருத்துவ கட்டமைப்பு v2.4', mr: 'राष्ट्रीय ग्रामीण टेलिमेडिसिन ग्रिड v2.4', bn: 'জাতীয় গ্রামীণ টেলিমেডিসিন গ্রিড v2.4', kn: 'ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಟೆಲಿಸಮಾಲೋಚನೆ ಜಾಲ v2.4' },

    // Home Page
    'AYUSHMAN BHARAT DIGITAL MISSION (ABDM) · NATIONAL RURAL GRID': { hi: 'आयुष्मान भारत डिजिटल मिशन (ABDM) • राष्ट्रीय ग्रामीण ग्रिड', te: 'ఆయుష్మాన్ భారత్ డిజిటల్ మిషన్ (ABDM) • జాతీయ గ్రామీణ గ్రిడ్', ta: 'ஆயுஷ்மான் பாரத் டிஜிட்டல் மிஷன் (ABDM) • தேசிய கிராமப்புற கட்டமைப்பு', mr: 'आयुष्मान भारत डिजिटल मिशन (ABDM) • राष्ट्रीय ग्रामीण ग्रिड', bn: 'আয়ুষ্মান ভারত ডিজিটাল মিশন (ABDM) • জাতীয় গ্রামীণ গ্রিড', kn: 'ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಡಿಜಿಟಲ್ ಮಿಷನ್ (ABDM) • ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಗ್ರಿಡ್' },
    'Bridging Rural India to Modern Healthcare': { hi: 'ग्रामीण भारत को आधुनिक स्वास्थ्य सेवाओं से जोड़ना', te: 'గ్రామీణ భారతదేశాన్ని ఆధునిక ఆరోగ్య సంరక్షణకు అనుసంధానించడం', ta: 'கிராமப்புற இந்தியாவை நவீன சுகாதாரத்துடன் இணைத்தல்', mr: 'ग्रामीण भारताला आधुनिक आरोग्य सेवेशी जोडणे', bn: 'গ্রামীণ ভারতকে আধুনিক স্বাস্থ্যসেবার সাথে সংযুক্ত করা', kn: 'ಗ್ರಾಮೀಣ ಭಾರತವನ್ನು ಆಧುನಿಕ ಆರೋಗ್ಯ ರಕ್ಷಣೆಗೆ ಜೋಡಿಸುವುದು' },
    'Unified digital health architecture connecting': { hi: 'जोड़ने वाला एकीकृत डिजिटल स्वास्थ्य ढांचा:', te: 'అనుసంధానించే సమగ్ర డిజిటಲ್ ఆరోగ్య వేదిక:', ta: 'இணைக்கும் ஒருங்கிணைந்த டிஜிட்டல் சுகாதார கட்டமைப்பு:', mr: 'जोडणारी एकात्मिक डिजिटल आरोग्य व्यवस्था:', bn: 'সংযুক্ত করার সমন্বিত ডিজিটাল স্বাস্থ্য ব্যবস্থা:', kn: 'ಜೋಡಿಸುವ ಸಮಗ್ರ ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ವ್ಯವಸ್ಥೆ:' },
    'Citizens': { hi: 'नागरिकों', te: 'పౌరులు', ta: 'குடிமக்கள்', mr: 'नागरिक', bn: 'নাগরিক', kn: 'ನಾಗರಿಕರು' },
    'Medical Officers': { hi: 'चिकित्सा अधिकारियों', te: 'వైద్యాధికారులు', ta: 'மருத்துவ அதிகாரிகள்', mr: 'वैद्यकीय अधिकारी', bn: 'মেডিকেল অফিসার', kn: 'ವೈದ್ಯಾಧಿಕಾರಿಗಳು' },
    'Frontline ASHA Workers': { hi: 'अग्रिम पंक्ति की आशा कार्यकर्ताओं', te: 'ఆశా కార్యకర్తలు', ta: 'ஆஷா களப்பணியாளர்கள்', mr: 'आशा कार्यकर्त्या', bn: 'আশা কর্মী', kn: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆಯರು' },
    'District Hospitals': { hi: 'जिला अस्पतालों', te: 'జిల్లా ఆసుపత్రులు', ta: 'மாவட்ட மருத்துவமனைகள்', mr: 'जिल्हा रुग्णालये', bn: 'জেলা হাসপাতাল', kn: 'ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗಳು' },
    'in real time. Built for Bharat with zero lag, instant audio triage, ABDM compliance, and full multilingual offline accessibility.': { hi: 'को वास्तविक समय में। भारत के लिए शून्य रुकावट, त्वरित ऑडियो ट्राइएज, एबीडीएम अनुपालन और पूर्ण ऑफ़लाइन पहुंच के साथ निर्मित।', te: 'రియల్ టైమ్‌లో. ఎలాంటి ఆలస్యం లేకుండా గ్రామీణ భారతదేశం కోసం రూపొందించబడింది.', ta: 'நிகழ்நேரத்தில். கிராமப்புற இந்தியாவுக்காக அதிவேகமாகவும் முழுமையாக அணுகக்கூடிய வகையிலும் உருவாக்கப்பட்டது.', mr: 'थेट वेळेत. भारतासाठी कोणत्याही विलंबाशिवाय आणि संपूर्ण ऑफलाइन उपलब्धतेसह निर्मित.', bn: 'রিয়েল-টাইমে। ভারতের জন্য কোনো বিলম্ব ছাড়াই সম্পূর্ণ অফলাইন অ্যাক্সেসিবিলিটি সহ তৈরি।', kn: 'ನೈಜ ಸಮಯದಲ್ಲಿ. ಯಾವುದೇ ವಿಳಂಬವಿಲ್ಲದೆ ಗ್ರಾಮೀಣ ಭಾರತಕ್ಕಾಗಿ ವಿಶೇಷವಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.' },
    'Get Started': { hi: 'शुरू करें', te: 'ప్రారంಭించండి', ta: 'தொடங்குங்கள்', mr: 'सुरू करा', bn: 'শুরু করুন', kn: 'ಪ್ರಾರಂಭಿಸಿ' },
    'Unified Digital Healthcare Ecosystem': { hi: 'एकीकृत डिजिटल स्वास्थ्य पारिस्थितिकी तंत्र', te: 'సమగ్ర డిజిటల్ హెల్త్‌కేర్ పర్యావరణ వ్యవస్థ', ta: 'ஒருங்கிணைந்த டிஜிட்டல் சுகாதார சூழல்', mr: 'एकात्मिक डिजिटल आरोग्य परिसंस्था', bn: 'সমন্বিত ডিজিটাল স্বাস্থ্যসেবা ইকোসিস্টেম', kn: 'ಸಮಗ್ರ ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ಪರಿಸರ ವ್ಯವಸ್ಥೆ' },
    'Designed specifically for rural health sub-centres, primary health centres (PHC), and community health clinics.': { hi: 'ग्रामीण स्वास्थ्य उप-केंद्रों, प्राथमिक स्वास्थ्य केंद्रों (PHC) और सामुदायिक स्वास्थ्य क्लीनिकों के लिए विशेष रूप से डिज़ाइन किया गया।', te: 'ప్రాథమిక ఆరోగ్య కేంద్రాలు (PHC) మరియు గ్రామీణ క్లినిక్‌ల కోసం ప్రత్యేకంగా రూపొందించబడింది.', ta: 'கிராமப்புற ஆரம்ப சுகாதார நிலையங்களுக்காக (PHC) சிறப்பாக வடிவமைக்கப்பட்டது.', mr: 'ग्रामीण आरोग्य उपकेंद्रे आणि प्राथमिक आरोग्य केंद्रांसाठी (PHC) विशेष रचना.', bn: 'গ্রামীণ স্বাস্থ্য উপকেন্দ্র এবং প্রাথমিক স্বাস্থ্য কেন্দ্রের জন্য বিশেষভাবে তৈরি।', kn: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳು (PHC) ಮತ್ತು ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಉಪಕೇಂದ್ರಗಳಿಗಾಗಿ ವಿಶೇಷವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.' },
    'Citizen Health Lockers & ABHA': { hi: 'नागरिक स्वास्थ्य लॉकर और आभा', te: 'పౌర ఆరోగ్య లాకర్లు & ఆభా', ta: 'குடிமக்கள் சுகாதார லாக்கர் மற்றும் ஆபா', mr: 'नागरिक आरोग्य लॉकर आणि आभा', bn: 'নাগরিক স্বাস্থ্য লকার এবং আভা', kn: 'ನಾಗರಿಕ ಆರೋಗ್ಯ ಲಾಕರ್ ಮತ್ತು ಆಭಾ' },
    'Self-register for 14-digit ABDM ABHA health cards, family health tracking, AI visual symptom triage, and medical records.': { hi: '14-अंकीय आभा स्वास्थ्य कार्ड, पारिवारिक स्वास्थ्य ट्रैकिंग, एआई लक्षण जांच और मेडिकल रिकॉर्ड के लिए स्व-पंजीकरण करें।', te: '14-అంకెల ఆభా హెల్త్ కార్డ్, కుటుంబ ఆరోగ్య పర్యవేక్షణ, AI లక్షణ పరీక్ష మరియు వైద్య రికార్డుల కోసం నమోదు చేసుకోండి.', ta: '14-இலக்க ஆபா சுகாதார அட்டை, குடும்ப சுகாதார கண்காணிப்பு, AI நோய் அறிகுறி பகுப்பாய்வு மற்றும் மருத்துவ பதிவுகள்.', mr: '14-अंकी आभा आरोग्य कार्ड, कौटुंबिक आरोग्य ट्रॅकिंग, AI लक्षण तपासणी आणि वैद्यकीय नोंदींसाठी नोंदणी करा.', bn: '14-সংখ্যার আভা হেলথ কার্ড, পারিবারিক স্বাস্থ্য ট্র্যাকিং, এআই লক্ষণ ট্রায়াজ এবং মেডিকেল রেকর্ডের জন্য স্ব-নিবন্ধন করুন।', kn: '14-ಅಂಕಿಯ ಆಭಾ ಆರೋಗ್ಯ ಕಾರ್ಡ್, ಕುಟುಂಬದ ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ, AI ರೋಗಲಕ್ಷಣ ಪರೀಕ್ಷೆ ಮತ್ತು ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳಿಗಾಗಿ ಸ್ವಯಂ-ನೋಂದಾಯಿಸಿ.' },
    'OPD Teleconsultation & e-Prescriptions': { hi: 'ओपीडी टेलीकंसल्टेशन और ई-प्रिस्क्रिप्शन', te: 'OPD టెలికన్సల్టేషన్ & ఇ-ప్రిస్క్రిప్షన్లు', ta: 'OPD தொலைமருத்துவம் மற்றும் இ-மருந்துச் சீட்டு', mr: 'OPD टेलिकन्सल्टेशन आणि ई-प्रिस्क्रिप्शन', bn: 'ওপিডি টেলিকনসাল্টেশন এবং ই-প্রেসক্রিপশন', kn: 'OPD ಟೆಲಿಸಮಾಲೋಚನೆ & ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್' },
    'Connect with verified Medical Officers via live queue. Receive official Government e-Prescriptions with downloadable ABDM PDF.': { hi: 'लाइव कतार के माध्यम से सत्यापित चिकित्सा अधिकारियों से जुड़ें। डाउनलोड करने योग्य आधिकारिक ई-प्रिस्क्रिप्शन प्राप्त करें।', te: 'లైవ్ క్యూ ద్వారా ధృవీకరించబడిన వైద్యులతో కనెక్ట్ అవ్వండి. డౌన్‌లోడ్ చేయగల అధికారిక ఇ-ప్రిస్క్రిప్షన్ పొందండి.', ta: 'நேரலை வரிசை மூலம் மருத்துவ அதிகாரிகளுடன் இணையுங்கள். பதிவிறக்கம் செய்யக்கூடிய அதிகாரப்பூர்வ இ-மருந்துச்சீட்டைப் பெறுங்கள்.', mr: 'थेट रांगेद्वारे पडताळणी झालेल्या वैद्यकीय अधिकाऱ्यांशी संपर्क साधा. डाऊनलोड करण्यायोग्य अधिकृत ई-प्रिस्क्रिप्शन मिळवा.', bn: 'লাইভ সারির মাধ্যমে যাচাইকৃত মেডিকেল অফিসারদের সাথে সংযুক্ত হন। ডাউনলোডযোগ্য অফিসিয়াল ই-প্রেসক্রিপশন পান।', kn: 'ಲೈವ್ ಸರತಿ ಮೂಲಕ ದೃಢೀಕೃತ ವೈದ್ಯಾಧಿಕಾರಿಗಳೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ. ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದಾದ ಅಧಿಕೃತ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪಡೆಯಿರಿ.' },
    'ASHA & ANM Frontline Field Hub': { hi: 'आशा और एएनएम अग्रिम पंक्ति फील्ड हब', te: 'ఆశా & ANM ఫ్రంట్‌లైన్ ఫీల్డ్ హబ్', ta: 'ஆஷா மற்றும் ஏஎன்எம் களப்பணி மையம்', mr: 'आशा आणि एएनएम फ्रंटलाइन फील्ड हब', bn: 'আশা ও এএনএম ফ্রন্টলাইন ফিল্ড হাব', kn: 'ಆಶಾ ಮತ್ತು ಎಎನ್‌ಎಂ ಮುಂಚೂಣಿ ಕಾರ್ಯಕ್ಷೇತ್ರ ಕೇಂದ್ರ' },
    'Maternal ANC tracking, child UIP immunization rosters, daily village home visit planners, and direct patient-to-doctor referrals.': { hi: 'मातृ एएनसी ट्रैकिंग, बाल यूआईपी टीकाकरण रोस्टर, दैनिक ग्रामीण गृह भ्रमण योजनाकार और सीधे डॉक्टर रेफरल।', te: 'గర్భిణీల ANC ట్రాకింగ్, పిల్లల UIP టీకా జాబితా, రోజువారీ గ్రామ గృహ సందర్శనలు మరియు డాక్టర్ రిఫరల్స్.', ta: 'கர்ப்பிணி தாய்மார்கள் கண்காணிப்பு, குழந்தை தடுப்பூசி பட்டியல், தினசரி கிராம களப்பயணங்கள் மற்றும் நேரடி பரிந்துரைகள்.', mr: 'माता एएनसी ट्रॅकिंग, बाल यूआयपी लसीकरण यादी, दैनंदिन गाव भेट नियोजक आणि थेट डॉक्टर संदर्भ.', bn: 'মাতৃ এএনসি ট্র্যাকিং, শিশুদের টিকাদান তালিকা, প্রতিদিনের গ্রাম পরিদর্শন এবং সরাসরি ডাক্তার রেফারেল।', kn: 'ಗರ್ಭಿಣಿಯರ ANC ಟ್ರ್ಯಾಕಿಂಗ್, ಮಕ್ಕಳ ಲಸಿಕಾ ವೇಳಾಪಟ್ಟಿ, ದೈನಂದಿನ ಗ್ರಾಮ ಗೃಹ ಭೇಟಿಗಳು ಮತ್ತು ನೇರ ವೈದ್ಯಕೀಯ ಶಿಫಾರಸುಗಳು.' },
    'Live Hospital Bed & Oxygen Grid': { hi: 'लाइव अस्पताल बिस्तर और ऑक्सीजन ग्रिड', te: 'లైవ్ ఆసుపత్రి బెడ్ & ఆక్సిజన్ గ్రిడ్', ta: 'நேரலை மருத்துவமனை படுக்கை மற்றும் ஆக்சிஜன் கட்டமைப்பு', mr: 'थेट रुग्णालय खाटा आणि ऑक्सिजन ग्रिड', bn: 'লাইভ হাসপাতাল বেড ও অক্সিজেন গ্রিড', kn: 'ಲೈವ್ ಆಸ್ಪತ್ರೆ ಬೆಡ್ & ಆಮ್ಲಜನಕ ಗ್ರಿಡ್' },
    'Real-time transparency of general beds, ICU beds, oxygen units, and emergency doctor availability across district healthcare facilities.': { hi: 'जिला स्वास्थ्य सुविधाओं में सामान्य बिस्तर, आईसीयू बिस्तर, ऑक्सीजन इकाइयों और आपातकालीन डॉक्टर उपलब्धता की वास्तविक समय में जानकारी।', te: 'జిల్లా ఆసుపత్రులలో సాధారణ బెడ్‌లు, ఐసియు బెడ్‌లు, ఆక్సిజన్ యూనిట్లు మరియు అత్యవసర వైద్యుల లభ్యత వివరాలు.', ta: 'பொது படுக்கைகள், அவசர சிகிச்சைப் பிரிவு படுக்கைகள், ஆக்சிஜன் மற்றும் அவசர மருத்துவர் இருப்பு குறித்த நிகழ்நேர வெளிப்படைத்தன்மை.', mr: 'जिल्हा रुग्णालयांमधील सर्वसाधारण खाटा, आयसीयू खाटा, ऑक्सिजन युनिट्स आणि आपत्कालीन डॉक्टर उपलब्धतेची थेट माहिती.', bn: 'জেলা স্বাস্থ্যসেবা কেন্দ্রগুলিতে সাধারণ শয্যা, আইসিইউ শয্যা, অক্সিজেন এবং জরুরি ডাক্তারের উপস্থিতির রিয়েল-টাইম তথ্য।', kn: 'ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಸಾಮಾನ್ಯ ಬೆಡ್‌ಗಳು, ಐಸಿಯು ಬೆಡ್‌ಗಳು, ಆಮ್ಲಜನಕ ಘಟಕಗಳು ಮತ್ತು ತುರ್ತು ವೈದ್ಯರ ಲಭ್ಯತೆಯ ನೈಜ ಸಮಯದ ವಿವರಗಳು.' },
    'PMBJP Jan Aushadhi Savings': { hi: 'प्रधानमंत्री जन औषधि बचत योजना', te: 'PMBJP జన్ ఔషధి పొదుపు పథకం', ta: 'பிரதான் மந்திரி மக்கள் மருந்தகம் (ஜன் ஔஷதி)', mr: 'पंतप्रधान जन औषधी बचत योजना', bn: 'পিএমবিজিপি জন ঔষধি সঞ্চয় প্রকল্প', kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಜನೌಷಧಿ ಉಳಿತಾಯ ಯೋಜನೆ' },
    'Access affordable generic formulations saving rural families up to 80% on everyday prescription drug costs.': { hi: 'सस्ती जेनेरिक दवाइयां प्राप्त करें जो ग्रामीण परिवारों को दवाओं के खर्च पर 80% तक की बचत कराती हैं।', te: 'గ్రామీణ కుటుంబాలకు మందుల ఖర్చుపై 80% వరకు ఆదా చేసే సరసమైన జెనరిక్ మందులను పొందండి.', ta: 'தினசரி மருந்துச் செலவில் கிராமப்புற குடும்பங்களுக்கு 80% வரை சேமிப்பை வழங்கும் குறைந்த விலை தரமான மருந்துகள்.', mr: 'ग्रामीण कुटुंबांना औषध खर्चावर 80% पर्यंत बचत देणारी परवडणारी जेनेरिक औषधे मिळवा.', bn: 'সাশ্রয়ী মূল্যের জেনেরিক ওষুধ যা গ্রামীণ পরিবারগুলির ওষুধের খরচে 80% পর্যন্ত সাশ্রয় করে।', kn: 'ದೈನಂದಿನ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಔಷಧಿಗಳ ವೆಚ್ಚದಲ್ಲಿ ಗ್ರಾಮೀಣ ಕುಟುಂಬಗಳಿಗೆ 80% ರಷ್ಟು ಉಳಿತಾಯ ನೀಡುವ ಜೆನೆರಿಕ್ ಔಷಧಿಗಳು.' },
    '24x7 108 Rural Emergency SOS': { hi: '24x7 108 ग्रामीण आपातकालीन एसओएस', te: '24x7 108 గ్రామీణ అత్యవసర SOS', ta: '24x7 108 கிராமப்புற அவசர உதவி SOS', mr: '24x7 108 ग्रामीण आपत्कालीन एसओएस', bn: '24x7 ১০৮ গ্রামীণ জরুরি এসওএস', kn: '24x7 108 ಗ್ರಾಮೀಣ ತುರ್ತು SOS' },
    'One-touch instant ambulance dispatch with direct emergency telephone telemetry to rural medical response units.': { hi: 'ग्रामीण चिकित्सा प्रतिक्रिया इकाइयों को सीधे आपातकालीन टेलीफोन टेलीमेट्री के साथ एक-टच त्वरित एम्बुलेंस प्रेषण।', te: 'గ్రామీణ వైద్య బృందాలకు నేరుగా అత్యవసర సందేశంతో ఒకే ట్యాప్‌తో అంబులెన్స్ సేవలు.', ta: 'கிராமப்புற மருத்துவ அவசர பிரிவுகளுக்கு நேரடி தொலைபேசி அழைப்புடன் ஒரே தொடுதலில் அவசர ஆம்புலன்ஸ் சேவை.', mr: 'ग्रामीण वैद्यकीय प्रतिसाद पथकांशी थेट संपर्कासह एका स्पर्शात रुग्णवाहिका सेवा.', bn: 'গ্রামীণ মেডিকেল রেসপন্স ইউনিটের সাথে সরাসরি জরুরি টেলিফোনের মাধ্যমে এক-স্পর্শে তাত্ক্ষণিক অ্যাম্বুলেন্স প্রেরণ।', kn: 'ಗ್ರಾಮೀಣ ವೈದ್ಯಕೀಯ ತುರ್ತು ಘಟಕಗಳಿಗೆ ನೇರ ದೂರವಾಣಿ ಸಂಪರ್ಕದೊಂದಿಗೆ ಒಂದೇ ಸ್ಪರ್ಶದಲ್ಲಿ ತುರ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್ ಸೇವೆ.' },

    // Login Portal
    'NATIONAL HEALTH AUTHORITY · AYUSHMAN BHARAT DIGITAL GATEWAY': { hi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण • आयुष्मान भारत डिजिटल गेटवे', te: 'జాతీయ ఆరోగ్య ప్రాధికార సంస్థ • ఆయుష్మాన్ భారత్ డిజిటల్ గేట్‌వే', ta: 'தேசிய சுகாதார ஆணையம் • ஆயுஷ்மான் பாரத் டிஜிட்டல் நுழைவாயில்', mr: 'राष्ट्रीय आरोग्य प्राधिकरण • आयुष्मान भारत डिजिटल गेटवे', bn: 'জাতীয় স্বাস্থ্য কর্তৃপক্ষ • আয়ুষ্মান ভারত ডিজিটাল গেটওয়ে', kn: 'ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಪ್ರಾಧಿಕಾರ • ಆಯುಷ್ಮಾನ್ ಭಾರತ್ ಡಿಜಿಟಲ್ ಗೇಟ್‌ವೇ' },
    'Welcome to Swasthya Setu': { hi: 'स्वास्थ्य सेतु में आपका स्वागत है', te: 'స్వాస్థ్య సేతుకు స్వాగతం', ta: 'ஸ்வாஸ்த்ய சேதுவிற்கு நல்வரவு', mr: 'स्वास्थ्य सेतू मध्ये आपले स्वागत आहे', bn: 'স্বাস্থ্য সেতুতে আপনাকে স্বাগতম', kn: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತುವಿಗೆ ಸುಸ್ವಾಗತ' },
    'Select your respected healthcare role to authenticate with verified credentials:': { hi: 'सत्यापित क्रेडेंशियल्स के साथ प्रमाणित करने के लिए अपनी सम्मानित स्वास्थ्य सेवा भूमिका चुनें:', te: 'ధృవీకరించబడిన ఆధారాలతో లాగిన్ అవ్వడానికి మీ ఆరోగ్య సంరక్షణ పాత్రను ఎంచుకోండి:', ta: 'சரிபார்க்கப்பட்ட சான்றுகளுடன் உள்நுழைய உங்கள் சுகாதாரப் பணியைத் தேர்ந்தெடுக்கவும்:', mr: 'पडताळणी केलेल्या तपशीलांसह लॉग इन करण्यासाठी तुमची आरोग्य सेवा भूमिका निवडा:', bn: 'যাচাইকৃত তথ্যের মাধ্যমে প্রমাণীকরণের জন্য আপনার স্বাস্থ্যসেবা ভূমিকা নির্বাচন করুন:', kn: 'ದೃಢೀಕರಿಸಿದ ವಿವರಗಳೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಲು ನಿಮ್ಮ ಆರೋಗ್ಯ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ:' },
    'Citizen / Patient': { hi: 'नागरिक / मरीज', te: 'పౌరుడు / రోగి', ta: 'குடிமகன் / நோயாளி', mr: 'नागरिक / रुग्ण', bn: 'নাগরিক / রোগী', kn: 'ನಾಗರಿಕ / ರೋಗಿ' },
    'Doctor / Medical': { hi: 'चिकित्सक / डॉक्टर', te: 'వైద్యుడు / డాక్టర్', ta: 'மருத்துவர்', mr: 'डॉक्टर / वैद्यकीय', bn: 'ডাক্তার / চিকিৎসক', kn: 'ವೈದ್ಯರು / ಡಾಕ್ಟರ್' },
    'ASHA / ANM Worker': { hi: 'आशा / एएनएम कार्यकर्ता', te: 'ఆశా / ANM కార్యకర్త', ta: 'ஆஷா / ஏஎன்எம் பணியாளர்', mr: 'आशा / एएनएम कार्यकर्त्या', bn: 'আশা / এএনএম কর্মী', kn: 'ಆಶಾ / ಎಎನ್‌ಎಂ ಕಾರ್ಯಕರ್ತೆ' },
    'District Admin': { hi: 'जिला प्रशासक', te: 'జిల్లా నిర్వాహకుడు', ta: 'மாவட்ட நிர்வாகி', mr: 'जिल्हा प्रशासक', bn: 'জেলা প্রশাসক', kn: 'ಜಿಲ್ಲಾ ಆಡಳಿತಾಧಿಕಾರಿ' },
    'CITIZEN & PATIENT SECURE ACCESS': { hi: 'नागरिक और मरीज सुरक्षित प्रवेश', te: 'పౌరులు & రోగుల భద్రతా లాగిన్', ta: 'குடிமக்கள் மற்றும் நோயாளிகளுக்கான பாதுகாப்பான அணுகல்', mr: 'नागरिक आणि रुग्ण सुरक्षित प्रवेश', bn: 'নাগরিক ও রোগীদের নিরাপদ প্রবেশাধিকার', kn: 'ನಾಗರಿಕರು ಮತ್ತು ರೋಗಿಗಳ ಸುರಕ್ಷಿತ ಪ್ರವೇಶ' },
    'Official Digital Health Gateway for Citizens & Families across Rural India': { hi: 'ग्रामीण भारत के नागरिकों और परिवारों के लिए आधिकारिक डिजिटल स्वास्थ्य गेटवे', te: 'గ్రామీణ భారతదేశంలోని పౌరులు మరియు కుటుంబాల కోసం అధికారిక డిజిటల్ ఆరోగ్య వేదిక', ta: 'கிராமப்புற இந்திய குடிமக்கள் மற்றும் குடும்பங்களுக்கான அதிகாரப்பூர்வ டிஜிட்டல் சுகாதார தளம்', mr: 'ग्रामीण भारतातील नागरिक आणि कुटुंबांसाठी अधिकृत डिजिटल आरोग्य गेटवे', bn: 'গ্রামীণ ভারতের নাগরিক ও পরিবারের জন্য অফিসিয়াল ডিজিটাল স্বাস্থ্য গেটওয়ে', kn: 'ಗ್ರಾಮೀಣ ಭಾರತದ ನಾಗರಿಕರು ಮತ್ತು ಕುಟುಂಬಗಳಿಗಾಗಿ ಅಧಿಕೃತ ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ಹೆಬ್ಬಾಗಿಲು' },
    'Mobile & Password / PIN': { hi: 'मोबाइल और पासवर्ड / पिन', te: 'మొబైల్ & పాస్‌వర్డ్ / పిన్', ta: 'கைபேசி எண் மற்றும் கடவுச்சொல் / பின்', mr: 'मोबाइल आणि पासवर्ड / पिन', bn: 'মোবাইল ও পাসওয়ার্ড / পিন', kn: 'ಮೊಬೈಲ್ & ಪಾಸ್‌ವರ್ಡ್ / ಪಿನ್' },
    'Mobile SMS OTP': { hi: 'मोबाइल एसएमएस ओटीपी', te: 'మొబైల్ SMS OTP', ta: 'கைபேசி SMS OTP', mr: 'मोबाइल एसएमएस ओटीपी', bn: 'মোবাইল এসএমএস ওটিপি', kn: 'ಮೊಬೈಲ್ SMS OTP' },
    'Registered Mobile Number or 14-Digit ABHA ID *': { hi: 'पंजीकृत मोबाइल नंबर या 14-अंकीय आभा आईडी *', te: 'నమోదిత మొబైల్ నంబర్ లేదా 14-అంకెల ఆభా ID *', ta: 'பதிவுசெய்யப்பட்ட கைபேசி எண் அல்லது 14-இலக்க ஆபா ஐடி *', mr: 'नोंदणीकृत मोबाइल क्रमांक किंवा 14-अंकी आभा आयडी *', bn: 'নিবন্ধিত মোবাইল নম্বর বা 14-সংখ্যার আভা আইডি *', kn: 'ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಅಥವಾ 14-ಅಂಕಿಯ ಆಭಾ ಐಡಿ *' },
    'Account Password or Security PIN *': { hi: 'खाता पासवर्ड या सुरक्षा पिन *', te: 'ఖాతా పాస్‌వర్డ్ లేదా సెక్యూరిటీ పిన్ *', ta: 'கணக்கு கடவுச்சொல் அல்லது பாதுகாப்பு பின் *', mr: 'खाते पासवर्ड किंवा सुरक्षा पिन *', bn: 'অ্যাকাউন্ট পাসওয়ার্ড বা সুরক্ষা পিন *', kn: 'ಖಾತೆ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಭದ್ರತಾ ಪಿನ್ *' },
    'Default test PIN:': { hi: 'डिफ़ॉल्ट परीक्षण पिन:', te: 'డిఫాల్ట్ టెస్ట్ పిన్:', ta: 'இயல்புநிலை சோதனை பின்:', mr: 'डीफॉल्ट चाचणी पिन:', bn: 'ডিফল্ট টেস্ট পিন:', kn: 'ಡೀಫಾಲ್ಟ್ ಪರೀಕ್ಷಾ ಪಿನ್:' },
    'Enter your password or 4-digit PIN': { hi: 'अपना पासवर्ड या 4-अंकीय पिन दर्ज करें', te: 'మీ పాస్‌వర్డ్ లేదా 4-అంకెల పిన్ నమోదు చేయండి', ta: 'உங்கள் கடவுச்சொல் அல்லது 4-இலக்க பின்னை உள்ளிடவும்', mr: 'तुमचा पासवर्ड किंवा 4-अंकी पिन प्रविष्ट करा', bn: 'আপনার পাসওয়ার্ড বা ৪-সংখ্যার পিন লিখুন', kn: 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ 4-ಅಂಕಿಯ ಪಿನ್ ನಮೂದಿಸಿ' },
    'Verify & Enter Citizen Portal': { hi: 'सत्यापित करें और नागरिक पोर्टल में प्रवेश करें', te: 'ధృవీకరించి సిటిజన్ పోర్టల్‌లోకి ప్రవేశించండి', ta: 'சரிபார்த்து குடிமக்கள் போர்ட்டலில் நுழையவும்', mr: 'पडताळणी करा आणि नागरिक पोर्टलमध्ये प्रवेश करा', bn: 'যাচাই করুন এবং সিটিজেন পোর্টালে প্রবেশ করুন', kn: 'ದೃಢೀಕರಿಸಿ ನಾಗರಿಕ ಪೋರ್ಟಲ್‌ಗೆ ಪ್ರವೇಶಿಸಿ' },
    'Prefer SMS OTP? Click to verify via Mobile OTP instead': { hi: 'एसएमएस ओटीपी पसंद करते हैं? इसके बजाय मोबाइल ओटीपी से सत्यापित करने के लिए क्लिक करें', te: 'SMS OTP కావాలా? మొబైల్ OTP ద్వారా ధృవీకరించడానికి ఇక్కడ క్లిక్ చేయండి', ta: 'SMS OTP விரும்புகிறீர்களா? கைபேசி OTP மூலம் சரிபார்க்க இங்கே கிளிக் செய்யவும்', mr: 'एसएमएस ओटीपी हवा आहे? त्याऐवजी मोबाइल ओटीपी द्वारे पडताळणी करण्यासाठी येथे क्लिक करा', bn: 'এসএমএস ওটিপি চান? পরিবর্তে মোবাইল ওটিপির মাধ্যমে যাচাই করতে ক্লিক করুন', kn: 'SMS OTP ಬಯಸುವಿರಾ? ಬದಲಿಗೆ ಮೊಬೈಲ್ OTP ಮೂಲಕ ಪರಿಶೀಲಿಸಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ' },
    'Send OTP via SMS': { hi: 'एसएमएस के माध्यम से ओटीपी भेजें', te: 'SMS ద్వారా OTP పంపండి', ta: 'SMS மூலம் OTP அனுப்புக', mr: 'एसएमएस द्वारे ओटीपी पाठवा', bn: 'এসএমএসের মাধ্যমে ওটিপি পাঠান', kn: 'SMS ಮೂಲಕ OTP ಕಳುಹಿಸಿ' },
    'Enter 6-Digit One-Time PIN': { hi: '6-अंकीय वन-टाइम पिन दर्ज करें', te: '6-అంకెల OTP పిన్ నమోదు చేయండి', ta: '6-இலக்க ஒருமுறை பின்னை உள்ளிடவும்', mr: '6-अंकी वन-टाइम पिन प्रविष्ट करा', bn: '৬-সংখ্যার ওটিপি পিন লিখুন', kn: '6-ಅಂಕಿಯ ಏಕಕಾಲಿಕ ಪಿನ್ ನಮೂದಿಸಿ' },
    'Verify & Authenticate': { hi: 'सत्यापित और प्रमाणित करें', te: 'ధృవీకరించి లాగిన్ అవ్వండి', ta: 'சரிபார்த்து உள்நுழைக', mr: 'पडताळणी आणि प्रमाणीकरण करा', bn: 'যাচাই ও প্রমাণীকরণ করুন', kn: 'ಪರಿಶೀಲಿಸಿ ಮತ್ತು ದೃಢೀಕರಿಸಿ' },
    'Resend OTP in': { hi: 'ओटीपी पुनः भेजें:', te: 'మరలా OTP పంపండి:', ta: 'மீண்டும் OTP அனுப்புக:', mr: 'ओटीपी पुन्हा पाठवा:', bn: 'পুনরায় ওটিপি পাঠান:', kn: 'ಮತ್ತೆ OTP ಕಳುಹಿಸಿ:' },
    'Resend OTP': { hi: 'ओटीपी पुनः भेजें', te: 'OTP మళ్లీ పంపండి', ta: 'மீண்டும் OTP அனுப்பு', mr: 'ओटीपी पुन्हा पाठवा', bn: 'পুনরায় ওটিপি পাঠান', kn: 'ಮತ್ತೆ OTP ಕಳುಹಿಸಿ' },
    'Change Mobile Number': { hi: 'मोबाइल नंबर बदलें', te: 'మొబైల్ నంబర్ మార్చండి', ta: 'கைபேசி எண்ணை மாற்றுக', mr: 'मोबाइल क्रमांक बदला', bn: 'মোবাইল নম্বর পরিবর্তন করুন', kn: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಬದಲಾಯಿಸಿ' },
    'Doctor ID / Registered Mobile': { hi: 'डॉक्टर आईडी / पंजीकृत मोबाइल', te: 'డాక్టర్ ID / నమోదిత మొబైల్', ta: 'மருத்துவர் ஐடி / பதிவுசெய்த கைபேசி', mr: 'डॉक्टर आयडी / नोंदणीकृत मोबाइल', bn: 'ডাক্তার আইডি / নিবন্ধিত মোবাইল', kn: 'ವೈದ್ಯರ ಐಡಿ / ನೋಂದಾಯಿತ ಮೊಬೈಲ್' },
    'ASHA Worker ID / Mobile': { hi: 'आशा कार्यकर्ता आईडी / मोबाइल', te: 'ఆశా కార్యకర్త ID / మొబైల్', ta: 'ஆஷா பணியாளர் ஐடி / கைபேசி', mr: 'आशा कार्यकर्त्या आयडी / mobile', bn: 'আশা কর্মী আইডি / মোবাইল', kn: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆ ಐಡಿ / ಮೊಬೈಲ್' },
    'Admin ID / Official Mobile': { hi: 'व्यवस्थापक आईडी / आधिकारिक मोबाइल', te: 'అడ్మిన్ ID / అధికారిక మొబైల్', ta: 'நிர்வாகி ஐடி / அதிகாரப்பூர்வ கைபேசி', mr: 'प्रशासक आयडी / अधिकृत mobile', bn: 'অ্যাডমিন আইডি / অফিশিয়াল মোবাইল', kn: 'ನಿರ್ವಾಹಕ ಐಡಿ / ಅಧಿಕೃತ ಮೊಬೈಲ್' },
    'Enter Official Password': { hi: 'आधिकारिक पासवर्ड दर्ज करें', te: 'అధికారిక పాస్‌వర్డ్ నమోదు చేయండి', ta: 'அதிகாரப்பூர்வ கடவுச்சொல்லை உள்ளிடவும்', mr: 'अधिकृत पासवर्ड प्रविष्ट करा', bn: 'অফিসিয়াল পাসওয়ার্ড লিখুন', kn: 'ಅಧಿಕೃತ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ' },
    'Enter Security Passcode': { hi: 'सुरक्षा पासकोड दर्ज करें', te: 'సెక్యూరిటీ పాస్‌కోడ్ నమోదు చేయండి', ta: 'பாதுகாப்பு கடவுக்குறியீட்டை உள்ளிடவும்', mr: 'सुरक्षा पासकोड प्रविष्ट करा', bn: 'সুরক্ষা পাসকোড লিখুন', kn: 'ಭದ್ರತಾ ಪಾಸ್‌ಕೋಡ್ ನಮೂದಿಸಿ' },
    'Authenticate & Enter Clinical Desk': { hi: 'प्रमाणित करें और क्लिनिकल डेस्क में प्रवेश करें', te: 'ధృవీకరించి క్లినికల్ డెస్క్‌లోకి ప్రవేశించండి', ta: 'சரிபார்த்து மருத்துவப் பிரிவுக்குள் நுழைக', mr: 'प्रमाणीकरण करा आणि क्लिनिकल डेस्कमध्ये प्रवेश करा', bn: 'প্রমাণীকরণ করুন এবং ক্লিনিকাল ডেস্কে প্রবেশ করুন', kn: 'ದೃಢೀಕರಿಸಿ ಕ್ಲಿನಿಕಲ್ ಡೆಸ್ಕ್‌ಗೆ ಪ್ರವೇಶಿಸಿ' },
    'Authenticate & Enter Field Hub': { hi: 'प्रमाणित करें और फील्ड हब में प्रवेश करें', te: 'ధృవీకరించి ఫీల్డ్ హబ్‌లోకి ప్రవేశించండి', ta: 'சரிபார்த்து களப்பணி மையத்திற்குள் நுழைக', mr: 'प्रमाणीकरण करा आणि फील्ड हबमध्ये प्रवेश करा', bn: 'প্রমাণীকরণ করুন এবং ফিল্ড হাবে প্রবেশ করুন', kn: 'ದೃಢೀಕರಿಸಿ ಫೀಲ್ಡ್ ಹಬ್‌ಗೆ ಪ್ರವೇಶಿಸಿ' },
    'Authenticate & Enter Command Center': { hi: 'प्रमाणित करें और कमांड सेंटर में प्रवेश करें', te: 'ధృవీకరించి కమాండ్ సెంటర్‌లోకి ప్రవేశించండి', ta: 'சரிபார்த்து கட்டுப்பாட்டு மையத்திற்குள் நுழைக', mr: 'प्रमाणीकरण करा आणि कमांड सेंटरमध्ये प्रवेश करा', bn: 'প্রমাণীকরণ করুন এবং কমান্ড সেন্টারে প্রবেশ করুন', kn: 'ದೃಢೀಕರಿಸಿ ಕಮಾಂಡ್ ಸೆಂಟರ್‌ಗೆ ಪ್ರವೇಶಿಸಿ' },

    // Citizen Portal
    'Need Doctor Consultation?': { hi: 'डॉक्टर परामर्श की आवश्यकता है?', te: 'డాక్టర్ సంప్రదింపులు కావాలా?', ta: 'மருத்துவர் ஆலோசனை தேவையா?', mr: 'डॉक्टरांच्या सल्ल्याची गरज आहे का?', bn: 'ডাক্তারের পরামর্শ প্রয়োজন?', kn: 'ವೈದ್ಯರ ಸಮಾಲೋಚನೆ ಬೇಕೇ?' },
    'Directly select a registered doctor, describe your illness, and join the digital OPD queue instantly.': { hi: 'सीधे पंजीकृत चिकित्सक का चयन करें, अपनी बीमारी बताएं और तुरंत डिजिटल ओपीडी कतार में शामिल हों।', te: 'నమోదిత వైద్యుడిని ఎంచుకోండి, మీ అనారోగ్యాన్ని వివరించండి మరియు డిజిటల్ OPD క్యూలో చేరండి.', ta: 'பதிவுசெய்யப்பட்ட மருத்துவரைத் தேர்ந்தெடுத்து, உங்கள் உடல்நலக் குறையை விவரித்து, உடனடியாக டிஜிட்டல் OPD வரிசையில் இணையுங்கள்.', mr: 'नोंदणीकृत डॉक्टरांची निवड करा, तुमचा आजार सांगा आणि लगेच डिजिटल ओपीडी रांगेत सामील व्हा.', bn: 'নিবন্ধিত ডাক্তার নির্বাচন করুন, আপনার অসুস্থতার বিবরণ দিন এবং তাৎক্ষণিক ডিজিটাল ওপিডি লাইনে যোগ দিন।', kn: 'ನೋಂದಾಯಿತ ವೈದ್ಯರನ್ನು ಆಯ್ಕೆಮಾಡಿ, ನಿಮ್ಮ ಅನಾರೋಗ್ಯವನ್ನು ವಿವರಿಸಿ ಮತ್ತು ಡಿಜಿಟಲ್ OPD ಸರದಿಗೆ ಸೇರಿಕೊಳ್ಳಿ.' },
    'Live Video Call Doctor': { hi: 'लाइव वीडियो कॉल डॉक्टर', te: 'లైవ్ వీడియో కాల్ డాక్టర్', ta: 'நேரலை வீடியோ அழைப்பு மருத்துவர்', mr: 'थेट व्हिडिओ कॉल डॉक्टर', bn: 'লাইভ ভিডিও কল ডাক্তার', kn: 'ಲೈವ್ ವಿಡಿಯೋ ಕರೆ ವೈದ್ಯರು' },
    '+ Request OPD Queue': { hi: '+ ओपीडी कतार का अनुरोध करें', te: '+ OPD క్యూ కోసం అభ్యర్థించండి', ta: '+ OPD வரிசைக்கு விண்ணப்பிக்கவும்', mr: '+ ओपीडी रांगेची विनंती करा', bn: '+ ওপিডি সারির অনুরোধ করুন', kn: '+ OPD ಸರತಿ ಕೋರಿಕೆ' },
    'Nearby Hospitals & Emergency Beds (Live GPS Range)': { hi: 'निकटवर्ती अस्पताल और आपातकालीन बिस्तर (लाइव जीपीएस)', te: 'సమీప ఆసుపత్రులు & అత్యవసర బెడ్‌లు (లైవ్ GPS)', ta: 'அருகிலுள்ள மருத்துவமனைகள் மற்றும் அவசர படுக்கைகள் (GPS)', mr: 'जवळपासची रुग्णालये आणि आपत्कालीन खाटा (थेट GPS)', bn: 'নিকটবর্তী হাসপাতাল ও জরুরি বেড (লাইভ জিপিএস)', kn: 'ಸಮೀಪದ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ತುರ್ತು ಬೆಡ್‌ಗಳು (ಲೈವ್ GPS)' },
    'Verified district hospital bed availability, intensive care units (ICU), oxygen beds and round-the-clock doctors within 25 km max.': { hi: '25 किमी के दायरे में जिला अस्पताल के बिस्तर, आईसीयू, ऑक्सीजन बिस्तर और 24 घंटे डॉक्टर की उपलब्धता।', te: '25 కిమీ పరిధిలో జిల్లా ఆసుపత్రి బెడ్‌లు, ఐసియు, ఆక్సిజన్ బెడ్‌లు మరియు వైద్యుల లభ్యత.', ta: '25 கிமீ சுற்றளவில் மாவட்ட மருத்துவமனை படுக்கைகள், ஐசியூ, ஆக்சிஜன் படுக்கைகள் மற்றும் 24 மணி நேர மருத்துவர் இருப்பு.', mr: '25 किमी च्या आत जिल्हा रुग्णालयातील खाटा, आयसीयू, ऑक्सिजन खाटा आणि 24 तास डॉक्टर उपलब्धता.', bn: 'সর্বোচ্চ 25 কিমি মধ্যে জেলা হাসপাতালের বেড, আইসিইউ, অক্সিজেন বেড এবং সার্বক্ষণিক ডাক্তারের প্রাপ্যতা।', kn: 'ಗರಿಷ್ಠ 25 ಕಿಮೀ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ ಬೆಡ್‌ಗಳು, ಐಸಿಯು, ಆಮ್ಲಜನಕ ಬೆಡ್‌ಗಳು ಮತ್ತು 24 ಗಂಟೆಗಳ ವೈದ್ಯರ ಲಭ್ಯತೆ.' },
    'All Facilities': { hi: 'सभी सुविधाएं', te: 'అన్ని సదుపಾಯాలు', ta: 'அனைத்து வசதிகள்', mr: 'सर्व सुविधा', bn: 'সমস্ত সুবিধা', kn: 'ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು' },
    'Primary Health Centre (PHC)': { hi: 'प्राथमिक स्वास्थ्य केंद्र (PHC)', te: 'ప్రాథమిక ఆరోగ్య కేంద్రం (PHC)', ta: 'ஆரம்ப சுகாதார நிலையம் (PHC)', mr: 'प्राथमिक आरोग्य केंद्र (PHC)', bn: 'প্রাথমিক স্বাস্থ্য কেন্দ্র (PHC)', kn: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ (PHC)' },
    'Community Health Centre (CHC)': { hi: 'सामुदायिक स्वास्थ्य केंद्र (CHC)', te: 'కమ్యూనిటీ ఆరోగ్య కేంద్రం (CHC)', ta: 'சமூக சுகாதார மையம் (CHC)', mr: 'सामुदायिक आरोग्य केंद्र (CHC)', bn: 'কমিউনিটি স্বাস্থ্য কেন্দ্র (CHC)', kn: 'ಸಾಮುದಾಯಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ (CHC)' },
    'District Hospital': { hi: 'जिला अस्पताल', te: 'జిల్లా ఆసుపత్రి', ta: 'மாவட்ட மருத்துவமனை', mr: 'जिल्हा रुग्णालय', bn: 'জেলা হাসপাতাল', kn: 'ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆ' },
    'Sub-Centre': { hi: 'उप-केंद्र', te: 'ఉప-కేంద్రం', ta: 'துணை மையம்', mr: 'उप-केंद्र', bn: 'উপ-কেন্দ্র', kn: 'ಉಪ-ಕೇಂದ್ರ' },
    'General Beds': { hi: 'सामान्य बिस्तर', te: 'సాధారణ బెడ్‌లు', ta: 'பொது படுக்கைகள்', mr: 'सर्वसाधारण खाटा', bn: 'সাধারণ বেড', kn: 'ಸಾಮಾನ್ಯ ಬೆಡ್‌ಗಳು' },
    'ICU Beds': { hi: 'आईसीयू बिस्तर', te: 'ఐసియు బెడ్‌లు', ta: 'ஐசியூ படுக்கைகள்', mr: 'आयसीयू खाटा', bn: 'আইসিইউ বেড', kn: 'ಐಸಿಯು ಬೆಡ್‌ಗಳು' },
    'Oxygen Beds': { hi: 'ऑक्सीजन बिस्तर', te: 'ఆక్సిజన్ బెడ్‌లు', ta: 'ஆக்சிஜன் படுக்கைகள்', mr: 'ऑक्सिजन खाटा', bn: 'অক্সিজেন বেড', kn: 'ಆಮ್ಲಜನಕ ಬೆಡ್‌ಗಳು' },
    'Doctor on Duty:': { hi: 'ड्यूटी पर डॉक्टर:', te: 'డ్యూటీ డాక్టర్:', ta: 'பணியில் உள்ள மருத்துவர்:', mr: 'कर्तव्यावर असलेले डॉक्टर:', bn: 'অন-ডিউটি ডাক্তার:', kn: 'ಕರ್ತವ್ಯದಲ್ಲಿರುವ ವೈದ್ಯರು:' },
    'Call Hospital': { hi: 'अस्पताल को कॉल करें', te: 'ఆసుపత్రికి కాల్ చేయండి', ta: 'மருத்துவமனைக்கு அழைக்கவும்', mr: 'रुग्णालयाला कॉल करा', bn: 'হাসপাতালে কল করুন', kn: 'ಆಸ್ಪತ್ರೆಗೆ ಕರೆ ಮಾಡಿ' },
    'Directions (GPS)': { hi: 'दिशा-निर्देश (GPS)', te: 'రూట్ మ్యాప్ (GPS)', ta: 'வழிசெலுத்தல் (GPS)', mr: 'दिशा (GPS)', bn: 'দিকনির্দেশ (জিপিএস)', kn: 'ದಾರಿ ನಕ್ಷೆ (GPS)' },
    'Live Blood Bank Stock (All Groups)': { hi: 'लाइव ब्लड बैंक स्टॉक (सभी समूह)', te: 'లైవ్ బ్లడ్ బ్యాంక్ నిల్వ (అన్ని గ్రూపులు)', ta: 'ரத்த வங்கி நேரலை இருப்பு (அனைத்து பிரிவுகளும்)', mr: 'थेट रक्तपेढी साठा (सर्व गट)', bn: 'লাইভ ব্লাড ব্যাংক স্টক (সমস্ত গ্রুপ)', kn: 'ಲೈವ್ ರಕ್ತನಿಧಿ ದಾಸ್ತಾನು (ಎಲ್ಲಾ ಗುಂಪುಗಳು)' },
    'Units Available': { hi: 'उपलब्ध इकाइयां', te: 'యూనిట్లు అందుబాటులో ఉన్నాయి', ta: 'யூனிட்டுகள் உள்ளன', mr: 'उपलब्ध युनिट्स', bn: 'উপলব্ধ ইউনিট', kn: 'ಲಭ್ಯವಿರುವ ಯೂನಿಟ್‌ಗಳು' },
    'In Stock': { hi: 'उपलब्ध है', te: 'స్టాక్‌లో ఉంది', ta: 'இருப்பில் உள்ளது', mr: 'साठ्यात उपलब्ध', bn: 'স্টকে আছে', kn: 'ದಾಸ್ತಾನು ಇದೆ' },
    'Low Stock': { hi: 'कम स्टॉक', te: 'తక్కువ స్టాక్', ta: 'குறைந்த இருப்பு', mr: 'कमी साठा', bn: 'কম স্টক', kn: 'ಕಡಿಮೆ ದಾಸ್ತಾನು' },
    'Family Health Circle': { hi: 'पारिवारिक स्वास्थ्य मंडल', te: 'కుటుంబ ఆరోగ్య వృత్తం', ta: 'குடும்ப சுகாதார வட்டம்', mr: 'कौटुंबिक आरोग्य मंडळ', bn: 'পারিবারিক স্বাস্থ্য মণ্ডল', kn: 'ಕುಟುಂಬ ಆರೋಗ್ಯ ವೃತ್ತ' },
    'Manage health IDs and medical records for your dependents': { hi: 'अपने आश्रितों के स्वास्थ्य आईडी और मेडिकल रिकॉर्ड प्रबंधित करें', te: 'మీ కుటుంబ సభ్యుల ఆరోగ్య IDలు మరియు వైద్య రికార్డులను నిర్వహించండి', ta: 'உங்கள் குடும்பத்தினரின் சுகாதார ஐடிகள் மற்றும் மருத்துவ பதிவுகளை நிர்வகிக்கவும்', mr: 'तुमच्या अवलंबितांचे आरोग्य आयडी आणि वैद्यकीय नोंदी व्यवस्थापित करा', bn: 'আপনার পরিবারের সদস্যদের স্বাস্থ্য আইডি এবং মেডিকেল রেকর্ড পরিচালনা করুন', kn: 'ನಿಮ್ಮ ಅವಲಂಬಿತರ ಆರೋಗ್ಯ ಐಡಿಗಳು ಮತ್ತು ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ' },
    '+ Add Family Member': { hi: '+ परिवार का सदस्य जोड़ें', te: '+ కుటుంబ సభ్యుడిని చేర్చండి', ta: '+ குடும்ப உறுப்பினரைச் சேர்க்கவும்', mr: '+ कुटुंब सदस्य जोडा', bn: '+ পরিবারের সদস্য যোগ করুন', kn: '+ ಕುಟುಂಬ ಸದಸ್ಯರನ್ನು ಸೇರಿಸಿ' },
    'Digital ABHA Health Card': { hi: 'डिजिटल आभा स्वास्थ्य कार्ड', te: 'డిజిಟಲ್ ಆభా హెల్త్ కార్డ్', ta: 'டிஜிட்டல் ஆபா சுகாதார அட்டை', mr: 'डिजिटल आभा आरोग्य कार्ड', bn: 'ডিজিটাল আভা হেলথ কার্ড', kn: 'ಡಿಜಿಟಲ್ ಆಭಾ ಆರೋಗ್ಯ ಕಾರ್ಡ್' },
    'Print / Download ABHA Card': { hi: 'आभा कार्ड प्रिंट / डाउनलोड करें', te: 'ఆభా కార్డ్ ప్రింట్ / డౌన్‌లోడ్ చేసుకోండి', ta: 'ஆபா அட்டையை அச்சிடுக / பதிவிறக்குக', mr: 'आभा कार्ड प्रिंट / डाउनलोड करा', bn: 'আভা কার্ড প্রিন্ট / ডাউনলোড করুন', kn: 'ಆಭಾ ಕಾರ್ಡ್ ಪ್ರಿಂಟ್ / ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' },
    'Visual AI Symptom Triage': { hi: 'दृश्य एआई लक्षण जांच', te: 'విజువల్ AI లక్షణాల పరీక్ష', ta: 'காட்சி AI நோய் அறிகுறி பகுப்பாய்வு', mr: 'व्हिज्युअल AI लक्षण तपासणी', bn: 'ভিজ্যুয়াল এআই লক্ষণ ট্রায়াজ', kn: 'ದೃಶ್ಯ AI ಲಕ್ಷಣ ಪರೀಕ್ಷೆ' },
    'Tap your symptom for instant first-aid guidance & emergency advice:': { hi: 'त्वरित प्राथमिक चिकित्सा और आपातकालीन सलाह के लिए अपने लक्षण पर टैप करें:', te: 'తక్షణ ప్రథమ చికిత్స మరియు అత్యవసర సలహా కోసం మీ లక్షణాన్ని ఎంచుకోండి:', ta: 'உடனடி முதலுதவி வழிகாட்டுதல் மற்றும் அவசர ஆலோசனைக்கு உங்கள் அறிகுறியைத் தொடவும்:', mr: 'त्वरित प्रथमोपचार आणि आपत्कालीन सल्ल्यासाठी तुमच्या लक्षणावर टॅप करा:', bn: 'তাত্ক্ষণিক প্রাথমিক চিকিৎসা ও জরুরি পরামর্শের জন্য আপনার লক্ষণে আলতো চাপুন:', kn: 'ತಕ್ಷಣದ ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ತುರ್ತು ಸಲಹೆಗಾಗಿ ರೋಗಲಕ್ಷಣವನ್ನು ಆರಿಸಿ:' },
    'Jan Aushadhi Generic Medicine Savings': { hi: 'जन औषधि जेनेरिक दवा बचत', te: 'జన్ ఔషధి జెనరిక్ మందుల పొదుపు', ta: 'மக்கள் மருந்தகம் (ஜன் ஔஷதி) மருந்து சேமிப்பு', mr: 'जन औषधी जेनेरिक औषध बचत', bn: 'জন ঔষধি জেনেরিক ওষুধের সাশ্রয়', kn: 'ಜನೌಷಧಿ ಜೆನೆರಿಕ್ ಔಷಧಿ ಉಳಿತಾಯ' },
    'Telemedicine Video Consultation History': { hi: 'टेलीमेडिसिन वीडियो परामर्श इतिहास', te: 'టెలిమెడిసిన్ వీడియో కన్సల్టేషన్ హిస్టరీ', ta: 'தொலைமருத்துவ வீடியோ ஆலோசனை வரலாறு', mr: 'टेलिमेडिसिन व्हिडिओ सल्लामसलत इतिहास', bn: 'টেলিমেডিসিন ভিডিও পরামর্শের ইতিহাস', kn: 'ಟೆಲಿಮೆಡಿಸಿನ್ ವಿಡಿಯೋ ಸಮಾಲೋಚನೆ ಇತಿಹಾಸ' },

    // Doctor Portal
    'Doctor OPD Teleconsultation Desk': { hi: 'चिकित्सक ओपीडी टेलीकंसल्टेशन डेस्क', te: 'డాక్టర్ OPD టెలికన్సల్టేషన్ డెస్క్', ta: 'மருத்துவர் OPD தொலைமருத்துவ பிரிவு', mr: 'डॉक्टर ओपीडी टेलिकन्सल्टेशन डेस्क', bn: 'ডাক্তার ওপিডি টেলিকনসাল্টেশন ডেস্ক', kn: 'ವೈದ್ಯರ OPD ಟೆಲಿಸಮಾಲೋಚನೆ ಡೆಸ್ಕ್' },
    'Patient Consultation Queue': { hi: 'मरीज परामर्श कतार', te: 'రోగుల సంప్రదింపుల క్యూ', ta: 'நோயாளி ஆலோசனை வரிசை', mr: 'रुग्ण सल्लामसलत रांग', bn: 'রোগী পরামর্শের সারি', kn: 'ರೋಗಿಗಳ ಸಮಾಲೋಚನಾ ಸರತಿ' },
    '+ Add Walk-in Patient': { hi: '+ वॉक-इन मरीज जोड़ें', te: '+ రోగిని చేర్చండి', ta: '+ புதிய நோயாளியைச் சேர்க்கவும்', mr: '+ थेट रुग्ण जोडा', bn: '+ ওয়াক-ইন রোগী যোগ করুন', kn: '+ ನೇರ ರೋಗಿಯನ್ನು ಸೇರಿಸಿ' },
    'Chief Complaint': { hi: 'मुख्य शिकायत', te: 'ప్రధాన సమస్య', ta: 'முக்கிய உடல்நலக் குறைபாடு', mr: 'मुख्य तक्रार', bn: 'প্রধান সমস্যা', kn: 'ಮುಖ್ಯ ದೂರು' },
    'Vitals': { hi: 'वाइटल्स', te: 'వైటల్స్', ta: 'உடல் குறிகாட்டிகள்', mr: 'महत्त्वाची लक्षणे', bn: 'ভাইটালস', kn: 'ಜೀವ ಲಕ್ಷಣಗಳು' },
    'Start Video Call': { hi: 'वीडियो कॉल शुरू करें', te: 'వీడియో కాల్ ప్రారంభించండి', ta: 'வீடியோ அழைப்பைத் தொடங்கு', mr: 'व्हिडिओ कॉल सुरू करा', bn: 'ভিডিও কল শুরু করুন', kn: 'ವಿಡಿಯೋ ಕರೆ ಪ್ರಾರಂಭಿಸಿ' },
    'Consult & Prescribe': { hi: 'परामर्श दें और दवा लिखें', te: 'సంప్రదించి ప్రిస్క్రిప్షన్ రాయండి', ta: 'ஆலோசனை வழங்கி மருந்து சீட்டு எழுதுக', mr: 'सल्ला द्या आणि औषधे लिहा', bn: 'পরামর্শ দিন ও প্রেসক্রিপশন লিখুন', kn: 'ಸಮಾಲೋಚಿಸಿ ಮತ್ತು ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ನೀಡಿ' },
    'Recent Issued e-Prescriptions': { hi: 'हाल ही में जारी किए गए ई-प्रिस्क्रिप्शन', te: 'ఇటీవల జారీ చేసిన ఇ-ప్రిస్క్రిప్షన్లు', ta: 'சமீபத்தில் வழங்கப்பட்ட இ-மருந்துச் சீட்டுகள்', mr: 'नुकतेच जारी केलेले ई-प्रिस्क्रिप्शन', bn: 'সম্প্রতি জারি করা ই-প্রেসক্রিপশন', kn: 'ಇತ್ತೀಚೆಗೆ ನೀಡಲಾದ ಇ-ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳು' },
    'Print Rx (PDF)': { hi: 'प्रिस्क्रिप्शन प्रिंट करें (PDF)', te: 'ప్రిస్క్రిప్షన్ ప్రింట్ చేయండి (PDF)', ta: 'மருந்துச் சீட்டை அச்சிடுக (PDF)', mr: 'प्रिस्क्रिप्शन प्रिंट करा (PDF)', bn: 'প্রেসক্রিপশন প্রিন্ট করুন (PDF)', kn: 'ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಪ್ರಿಂಟ್ ಮಾಡಿ (PDF)' },

    // ASHA Portal
    'ASHA & ANM Frontline Field Portal': { hi: 'आशा और एएनएम अग्रिम पंक्ति फील्ड पोर्टल', te: 'ఆశా & ANM ఫ్రంట్‌లైన్ ఫీల్డ్ పోర్టల్', ta: 'ஆஷா மற்றும் ஏஎன்எம் களப்பணி தளம்', mr: 'आशा आणि एएनएम फ्रंटलाइन फील्ड पोर्टल', bn: 'আশা ও এএনএম ফ্রন্টলাইন ফিল্ড পোর্টাল', kn: 'ಆಶಾ ಮತ್ತು ಎಎನ್‌ಎಂ ಮುಂಚೂಣಿ ಕಾರ್ಯಕ್ಷೇತ್ರ ಪೋರ್ಟಲ್' },
    'Maternal High-Risk Pregnancy Tracker (ANC)': { hi: 'मातृ उच्च जोखिम गर्भावस्था ट्रैकर (ANC)', te: 'గర్భిణీల హై-రిస్క్ పర్యవేక్షణ (ANC)', ta: 'அபாயகரமான கர்ப்பிணி பெண்கள் கண்காணிப்பு (ANC)', mr: 'माता उच्च-जोखीम गर्भधारणा ट्रॅकर (ANC)', bn: 'উচ্চ-ঝুঁকিপূর্ণ গর্ভাবস্থা ট্র্যাকার (ANC)', kn: 'ತಾಯಂದಿರ ಅಧಿಕ ಅಪಾಯದ ಗರ್ಭಾವಸ್ಥೆ ಟ್ರ್ಯಾಕರ್ (ANC)' },
    '+ Register Pregnant Mother': { hi: '+ गर्भवती माता का पंजीकरण करें', te: '+ గర్భిణీ నమోదు', ta: '+ கர்ப்பிணித் தாயை பதிவு செய்க', mr: '+ गरोदर मातेची नोंदणी करा', bn: '+ গর্ভবতী মা নিবন্ধন করুন', kn: '+ ಗರ್ಭಿಣಿ ತಾಯಿಯನ್ನು ನೋಂದಾಯಿಸಿ' },
    'Universal Child Immunization (UIP)': { hi: 'सार्वभौमिक बाल टीकाकरण (UIP)', te: 'ಸಾರ್ವತ್ರಿಕ పిల్లల టీకాలు (UIP)', ta: 'குழந்தைகளுக்கான முழுமையான தடுப்பூசி (UIP)', mr: 'सार्वत्रिक बाल लसीकरण (UIP)', bn: 'সার্বজনীন শিশু টিকাদান (UIP)', kn: 'ಸಾರ್ವತ್ರಿಕ ಮಕ್ಕಳ ಲಸಿಕಾಕರಣ (UIP)' },
    'Village Daily Home Visit Planner': { hi: 'ग्रामीण दैनिक गृह भ्रमण योजनाकार', te: 'గ్రామ రోజువారీ గృహ సందర్శన ప్రణాళిక', ta: 'தினசரி கிராம களப்பயண திட்டமிடுபவர்', mr: 'गाव दैनंदिन घरभेट नियोजक', bn: 'গ্রামের দৈনন্দিন হোম ভিজিট প্ল্যানার', kn: 'ಗ್ರಾಮ ದೈನಂದಿನ ಮನೆ ಭೇಟಿ ಯೋಜಕ' },

    // Admin Portal
    'District Health Administration Command Center': { hi: 'जिला स्वास्थ्य प्रशासन कमांड सेंटर', te: 'జిల్లా ఆరోగ్య పరిపాలనా కమాండ్ సెంటర్', ta: 'மாவட்ட சுகாதார நிர்வாக கட்டுப்பாட்டு மையம்', mr: 'जिल्हा आरोग्य प्रशासन कमांड सेंटर', bn: 'জেলা স্বাস্থ্য প্রশাসন কমান্ড সেন্টার', kn: 'ಜಿಲ್ಲಾ ಆರೋಗ್ಯ ಆಡಳಿತ ಕಮಾಂಡ್ ಸೆಂಟರ್' },
    'District Healthcare Staff Directory': { hi: 'जिला स्वास्थ्य सेवा कर्मचारी निर्देशिका', te: 'జిల్లా ఆరోగ్య సిబ్బంది డైరెక్టరీ', ta: 'மாவட்ட சுகாதார பணியாளர் அடைவு', mr: 'जिल्हा आरोग्य कर्मचारी निर्देशिका', bn: 'জেলা স্বাস্থ্যসেবা কর্মী নির্দেশিকা', kn: 'ಜಿಲ್ಲಾ ಆರೋಗ್ಯ ಸಿಬ್ಬಂದಿ ವಿವರ' },
    '+ Add Verified Healthcare Staff': { hi: '+ सत्यापित स्वास्थ्य सेवा कर्मचारी जोड़ें', te: '+ సిబ్బందిని చేర్చండి', ta: '+ சுகாதார பணியாளரைச் சேர்க்கவும்', mr: '+ पडताळणी झालेले कर्मचारी जोडा', bn: '+ স্বাস্থ্যসেবা কর্মী যোগ করুন', kn: '+ ದೃಢೀಕೃತ ಆರೋಗ್ಯ ಸಿಬ್ಬಂದಿ ಸೇರಿಸಿ' },
    'Hospital Bed & Emergency Oxygen Management': { hi: 'अस्पताल बिस्तर और आपातकालीन ऑक्सीजन प्रबंधन', te: 'ఆసుపత్రి బెడ్ & ఆక్సిజన్ నిర్వహణ', ta: 'மருத்துவமனை படுக்கை மற்றும் அவசர ஆக்சிஜன் மேலாண்மை', mr: 'रुग्णालय खाटा आणि ऑक्सिजन व्यवस्थापन', bn: 'হাসপাতাল শয্যা ও জরুরি অক্সিজেন ব্যবস্থাপনা', kn: 'ಆಸ್ಪತ್ರೆ ಬೆಡ್ & ತುರ್ತು ಆಮ್ಲಜನಕ ನಿರ್ವಹಣೆ' },
    'District Blood Bank Supply Chain': { hi: 'जिला रक्त बैंक आपूर्ति श्रृंखला', te: 'జిల్లా బ్లడ్ బ్యాంక్ సరఫరా వ్యవస్థ', ta: 'மாவட்ட ரத்த வங்கி விநியோக சங்கிலி', mr: 'जिल्हा रक्तपेढी पुरवठा साखळी', bn: 'জেলা ব্লাড ব্যাংক সরবরাহ ব্যবস্থা', kn: 'ಜಿಲ್ಲಾ ರಕ್ತನಿಧಿ ಪೂರೈಕೆ ಜಾಲ' },
    'Essential Drug Inventory & Jan Aushadhi Buffer': { hi: 'आवश्यक दवा सूची और जन औषधि बफर स्टॉक', te: 'అవసరమైన ఔషధాల నిల్వ & జన్ ఔషధి బఫర్', ta: 'அத்தியாவசிய மருந்து இருப்பு மற்றும் மக்கள் மருந்தக சேமிப்பு', mr: 'अत्यावश्यक औषध साठा आणि जन औषधी बफर', bn: 'প্রয়োজনীয় ওষুধের মজুদ ও জন ঔষধি বাফার', kn: 'ಅಗತ್ಯ ಔಷಧಿ ದಾಸ್ತಾನು ಮತ್ತು ಜನೌಷಧಿ ಬಫರ್' },

    // Modals & Action Controls
    'Start Doctor Video Teleconsultation': { hi: 'डॉक्टर वीडियो टेलीकंसल्टेशन शुरू करें', te: 'డాక్టర్ వీడియో టెలికన్సల్టేషన్ ప్రారంభించండి', ta: 'மருத்துவர் வீடியோ ஆலோசனையைத் தொடங்குங்கள்', mr: 'डॉक्टर व्हिडिओ टेलिकन्सल्टेशन सुरू करा', bn: 'ডাক্তার ভিডিও পরামর্শ শুরু করুন', kn: 'ವೈದ್ಯರ ವಿಡಿಯೋ ಟೆಲಿಸಮಾಲೋಚನೆ ಪ್ರಾರಂಭಿಸಿ' },
    'Select Available Medical Officer / Specialist *': { hi: 'उपलब्ध चिकित्सा अधिकारी / विशेषज्ञ चुनें *', te: 'అందుబాటులో ఉన్న వైద్యుడిని ఎంచుకోండి *', ta: 'மருத்துவ அதிகாரியைத் தேர்ந்தெடுக்கவும் *', mr: 'उपलब्ध वैद्यकीय अधिकारी / तज्ज्ञ निवडा *', bn: 'উপলব্ধ মেডিকেল অফিসার নির্বাচন করুন *', kn: 'ಲಭ್ಯವಿರುವ ವೈದ್ಯಾಧಿಕಾರಿ / ತಜ್ಞರನ್ನು ಆಯ್ಕೆಮಾಡಿ *' },
    'Consulting For (Family Member or Self) *': { hi: 'परामर्श किसके लिए (परिवार का सदस्य या स्वयं) *', te: 'ఎవరి కోసం సంప్రదిస్తున్నారు (కుటుంబ సభ్యుడు లేదా స్వయంగా) *', ta: 'யாருக்காக ஆலோசனை (குடும்ப உறுப்பினர் அல்லது சுயமாக) *', mr: 'कोणासाठी सल्ला (कुटुंब सदस्य किंवा स्वतः) *', bn: 'কার জন্য পরামর্শ (পরিবারের সদস্য বা নিজে) *', kn: 'ಯಾರಿಗಾಗಿ ಸಮಾಲೋಚನೆ (ಕುಟುಂಬ ಸದಸ್ಯ ಅಥವಾ ಸ್ವತಃ) *' },
    'Chief Symptoms / Complaint *': { hi: 'मुख्य लक्षण / समस्या *', te: 'ప్రధాన లక్షణాలు / సమస్య *', ta: 'முக்கிய அறிகுறிகள் / குறைபாடு *', mr: 'मुख्य लक्षणे / तक्रार *', bn: 'প্রধান লক্ষণ / সমস্যা *', kn: 'ಮುಖ್ಯ ಲಕ್ಷಣಗಳು / ದೂರು *' },
    'Connect Live Video Call': { hi: 'लाइव वीडियो कॉल कनेक्ट करें', te: 'లైవ్ వీడియో కాల్ ప్రారంభించండి', ta: 'நேரலை வீடியோ அழைப்பை இணைக்கவும்', mr: 'थेट व्हिडिओ कॉल कनेक्ट करा', bn: 'লাইভ ভিডিও কল সংযোগ করুন', kn: 'ಲೈವ್ ವಿಡಿಯೋ ಕರೆ ಸಂಪರ್ಕಿಸಿ' },
    'Cancel': { hi: 'रद्द करें', te: 'రద్దు చేయండి', ta: 'ரத்து செய்க', mr: 'रद्द करा', bn: 'বাতিল করুন', kn: 'ರದ್ದುಮಾಡಿ' },
    'Submit': { hi: 'जमा करें', te: 'సమర్పించండి', ta: 'சமர்ப்பிக்கவும்', mr: 'प्रस्तुत करा', bn: 'জমা দিন', kn: 'ಸಲ್ಲಿಸಿ' },
    'Save': { hi: 'सहेजें', te: 'భద్రపరచండి', ta: 'சேமிக்கவும்', mr: 'जतन करा', bn: 'সংরক্ষণ করুন', kn: 'ಉಳಿಸಿ' },
    'Close': { hi: 'बंद करें', te: 'మూసివేయండి', ta: 'மூடுக', mr: 'बंद करा', bn: 'বন্ধ করুন', kn: 'ಮುಚ್ಚಿ' },
    'Consultation Live · Audio & Video Connected': { hi: 'परामर्श लाइव है • ऑडियो और वीडियो कनेक्टेड', te: 'కన్సల్టేషన్ లైవ్‌లో ఉంది • ఆడియో మరియు వీడియో కనెక్ట్ చేయబడింది', ta: 'ஆலோசனை நேரலையில் உள்ளது • ஆடியோ மற்றும் வீடியோ இணைக்கப்பட்டுள்ளது', mr: 'सल्लामसलत थेट सुरू आहे • ऑडिओ आणि व्हिडिओ जोडलेले', bn: 'পরামর্শ লাইভ চলছে • অডিও এবং ভিডিও সংযুক্ত', kn: 'ಸಮಾಲೋಚನೆ ಲೈವ್ ಆಗಿದೆ • ಆಡಿಯೋ ಮತ್ತು ವಿಡಿಯೋ ಸಂಪರ್ಕಗೊಂಡಿದೆ' },
    'Government Primary Health Centre · Telemedicine OPD': { hi: 'सरकारी प्राथमिक स्वास्थ्य केंद्र • टेलीमेडिसिन ओपीडी', te: 'ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రం • టెలిమెడిసిన్ OPD', ta: 'அரசு ஆரம்ப சுகாதார நிலையம் • தொலைமருத்துவ OPD', mr: 'शासकीय प्राथमिक आरोग्य केंद्र • टेलिमेडिसिन ओपीडी', bn: 'সরকারি প্রাথমিক স্বাস্থ্য কেন্দ্র • টেলিমেডিসিন ওপিডি', kn: 'ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ • ಟೆಲಿಮೆಡಿಸಿನ್ OPD' },
    'National Rural Telemedicine Grid · Kondapalli': { hi: 'राष्ट्रीय ग्रामीण टेलीमेडिसिन ग्रिड • कोंडापल्ली', te: 'జాతీయ గ్రామీణ టెలిమెడిసిన్ గ్రిడ్ • కొండపల్లి', ta: 'தேசிய கிராமப்புற தொலைமருத்துவ கட்டமைப்பு • கொண்டபள்ளி', mr: 'राष्ट्रीय ग्रामीण टेलिमेडिसिन ग्रिड • कोंडापल्ली', bn: 'জাতীয় গ্রামীণ টেলিমেডিসিন গ্রিড • কোন্ডাপল্লী', kn: 'ರಾಷ್ಟ್ರೀಯ ಗ್ರಾಮೀಣ ಟೆಲಿಮೆಡಿಸಿನ್ ಗ್ರಿಡ್ • ಕೊಂಡಪಲ್ಲಿ' },

    // AI Health Assistant Bot
    'Swasthya Setu AI Medical Assistant': { hi: 'स्वास्थ्य सेतु एआई चिकित्सा सहायक', te: 'స్వాస్థ్య సేతు AI వైద్య సహాయకుడు', ta: 'ஸ்வாஸ்த்ய சேது AI மருத்துவ உதவியாளர்', mr: 'स्वास्थ्य सेतू AI वैद्यकीय सहाय्यक', bn: 'স্বাস্থ্য সেতু এআই মেডিকেল সহকারী', kn: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು AI ವೈದ್ಯಕೀಯ ಸಹಾಯಕ' },
    'Ask any health question, symptom inquiry, or medical guidance': { hi: 'कोई भी स्वास्थ्य प्रश्न, लक्षण पूछताछ या चिकित्सा सलाह पूछें', te: 'ఏదైనా ఆరోగ్య ప్రశ్న, లక్షణాలు లేదా వైద్య సలహాను అడగండి', ta: 'சுகாதார கேள்வி, நோய் அறிகுறிகள் அல்லது மருத்துவ ஆலோசனைகளைக் கேளுங்கள்', mr: 'कोणताही आरोग्य प्रश्न, लक्षणे किंवा वैद्यकीय सल्ला विचारा', bn: 'যেকোনো স্বাস্থ্য প্রশ্ন, লক্ষণ বা চিকিৎসা পরামর্শ জিজ্ঞাসা করুন', kn: 'ಯಾವುದೇ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆ, ರೋಗಲಕ್ಷಣ ಅಥವಾ ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ ಕೇಳಿ' },
    'Type your health question...': { hi: 'अपना स्वास्थ्य प्रश्न लिखें...', te: 'మీ ఆరోగ్య ప్రశ్నను టైప్ చేయండి...', ta: 'உங்கள் சுகாதார கேள்வியை தட்டச்சு செய்யவும்...', mr: 'तुमचा आरोग्य प्रश्न टाईप करा...', bn: 'আপনার স্বাস্থ্য প্রশ্ন টাইপ করুন...', kn: 'ನಿಮ್ಮ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...' },
    'Disclaimer: Educational and triage guidance only. Consult a doctor for emergencies.': { hi: 'अस्वीकरण: केवल शैक्षणिक और प्राथमिक मार्गदर्शन। आपातकाल के लिए डॉक्टर से परामर्श लें।', te: 'గమనిక: కేవలం ప్రాథమిక మార్గదర్శకత్వం కొరకు మాత్రమే. అత్యవసర పరిస్థితుల్లో వైద్యుడిని సంప్రదించండి.', ta: 'பொறுப்புத் துறப்பு: கல்வி மற்றும் முதலுதவி வழிகாட்டலுக்கு மட்டுமே. அவசரநிலைக்கு மருத்துவரை அணுகவும்.', mr: 'अस्वीकरण: केवळ शैक्षणिक आणि प्राथमिक मार्गदर्शनासाठी. आपत्कालीन परिस्थितीत डॉक्टरांचा सल्ला घ्या.', bn: 'দাবিত্যাগ: শুধুমাত্র শিক্ষামূলক ও ট্রায়াজ নির্দেশনার জন্য। জরুরি পরিস্থিতিতে ডাক্তারের পরামর্শ নিন।', kn: 'ಹಕ್ಕುತ್ಯಾಗ: ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಪ್ರಥಮ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ. ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.' }
  };

  // 3. VOCABULARY WORD-LEVEL REPLACEMENT DICTIONARY (FOR COMPOUND STRINGS)
  const VOCAB_TRANSLATIONS = {
    'Hospital': { hi: 'अस्पताल', te: 'ఆసుపత్రి', ta: 'மருத்துவமனை', mr: 'रुग्णालय', bn: 'হাসপাতাল', kn: 'ಆಸ್ಪತ್ರೆ' },
    'Beds': { hi: 'बिस्तर', te: 'బెడ్‌లు', ta: 'படுக்கைகள்', mr: 'खाटा', bn: 'শয্যা', kn: 'ಬೆಡ್‌ಗಳು' },
    'Doctor': { hi: 'चिकित्सक', te: 'వైద్యుడు', ta: 'மருத்துவர்', mr: 'डॉक्टर', bn: 'ডাক্তার', kn: 'ವೈದ್ಯರು' },
    'Patient': { hi: 'मरीज', te: 'రోగి', ta: 'நோயாளி', mr: 'रुग्ण', bn: 'রোগী', kn: 'ರೋಗಿ' },
    'Citizen': { hi: 'नागरिक', te: 'పౌరుడు', ta: 'குடிமகன்', mr: 'नागरिक', bn: 'নাগরিক', kn: 'ನಾಗರಿಕ' },
    'Worker': { hi: 'कार्यकर्ता', te: 'కార్యకర్త', ta: 'பணியாளர்', mr: 'कार्यकर्ती', bn: 'কর্মী', kn: 'ಕಾರ್ಯಕರ್ತೆ' },
    'Admin': { hi: 'व्यवस्थापक', te: 'నిర్వాహకుడు', ta: 'நிர்வாகி', mr: 'प्रशासक', bn: 'প্রশাসক', kn: 'ಆಡಳಿತಾಧಿಕಾರಿ' },
    'Emergency': { hi: 'आपातकालीन', te: 'అత్యవసర', ta: 'அவசர', mr: 'आपत्कालीन', bn: 'জরুরি', kn: 'ತುರ್ತು' },
    'Blood': { hi: 'रक्त', te: 'రక్తం', ta: 'ரத்தம்', mr: 'रक्त', bn: 'রক্ত', kn: 'ರಕ್ತ' },
    'Stock': { hi: 'स्टॉक', te: 'నిల్వ', ta: 'இருப்பு', mr: 'साठा', bn: 'মজুদ', kn: 'ದಾಸ್ತಾನು' },
    'Status': { hi: 'स्थिति', te: 'స్థితి', ta: 'நிலை', mr: 'स्थिती', bn: 'অবস্থা', kn: 'ಸ್ಥಿತಿ' },
    'Active': { hi: 'सक्रिय', te: 'క్రియాశీల', ta: 'செயலில்', mr: 'सक्रिय', bn: 'সক্রিয়', kn: 'ಸಕ್ರಿಯ' },
    'Waiting': { hi: 'प्रतीक्षारत', te: 'వేచి ఉన్నారు', ta: 'காத்திருக்கிறது', mr: 'प्रतीक्षेत', bn: 'অপেক্ষমাণ', kn: 'ಕಾಯುತ್ತಿದ್ದಾರೆ' },
    'Completed': { hi: 'पूर्ण हुआ', te: 'పూర్తయింది', ta: 'முடிந்தது', mr: 'पूर्ण झाले', bn: 'সম্পন্ন', kn: 'ಪೂರ್ಣಗೊಂಡಿದೆ' },
    'Normal': { hi: 'सामान्य', te: 'సాధారణ', ta: 'வழக்கமான', mr: 'सामान्य', bn: 'স্বাভাবিক', kn: 'ಸಾಮಾನ್ಯ' },
    'High Risk': { hi: 'उच्च जोखिम', te: 'హై రిస్క్', ta: 'அதிக ஆபத்து', mr: 'उच्च जोखीम', bn: 'উচ্চ ঝুঁকি', kn: 'ಹೆಚ್ಚಿನ ಅಪಾಯ' },
    'Age': { hi: 'आयु', te: 'వయస్సు', ta: 'வயது', mr: 'वय', bn: 'বয়স', kn: 'ವಯಸ್ಸು' },
    'Gender': { hi: 'लिंग', te: 'లింగం', ta: 'பாலினம்', mr: 'लिंग', bn: 'লিঙ্গ', kn: 'ಲಿಂಗ' },
    'Male': { hi: 'पुरुष', te: 'పురుషుడు', ta: 'ஆண்', mr: 'पुरुष', bn: 'পুরুষ', kn: 'ಪುರುಷ' },
    'Female': { hi: 'महिला', te: 'స్త్రీ', ta: 'பெண்', mr: 'स्त्री', bn: 'মহিলা', kn: 'ಮಹಿಳೆ' },
    'Self': { hi: 'स्वयं', te: 'స్వయంగా', ta: 'சுயமாக', mr: 'स्वतः', bn: 'নিজে', kn: 'ಸ್ವತಃ' },
    'Spouse': { hi: 'पति/पत्नी', te: 'జీవిత భాగస్వామి', ta: 'மனைவி/கணவர்', mr: 'पती/पत्नी', bn: 'স্বামী/স্ত্রী', kn: 'ಪತಿ/ಪತ್ನಿ' },
    'Son': { hi: 'पुत्र', te: 'కుమారుడు', ta: 'மகன்', mr: 'मुलगा', bn: 'ছেলে', kn: 'ಮಗ' },
    'Daughter': { hi: 'पुत्री', te: 'కుమార్తె', ta: 'மகள்', mr: 'मुलगी', bn: 'মেয়ে', kn: 'ಮಗಳು' },
    'Mother': { hi: 'माता', te: 'తల్లి', ta: 'தாய்', mr: 'आई', bn: 'মা', kn: 'ತಾಯಿ' },
    'Father': { hi: 'पिता', te: 'తండ్రి', ta: 'தந்தை', mr: 'वडील', bn: 'বাবা', kn: 'ತಂದೆ' },
    'Morning': { hi: 'सुबह', te: 'ఉదయం', ta: 'காலை', mr: 'सकाळ', bn: 'সকাল', kn: 'ಬೆಳಿಗ್ಗೆ' },
    'Noon': { hi: 'दोपहर', te: 'మధ్యాహ్నం', ta: 'மதியம்', mr: 'दुपार', bn: 'দুপুর', kn: 'ಮಧ್ಯಾಹ್ನ' },
    'Night': { hi: 'रात', te: 'రాత్రి', ta: 'இரவு', mr: 'रात्र', bn: 'রাত', kn: 'ರಾತ್ರಿ' },
    'Taken': { hi: 'ले ली', te: 'తీసుకున్నారు', ta: 'உட்கொள்ளப்பட்டது', mr: 'घेतले', bn: 'নেওয়া হয়েছে', kn: 'ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ' },
    'Due': { hi: 'बाकी', te: 'బాకీ ఉంది', ta: 'நிலுவை', mr: 'बाकी', bn: 'বাকি', kn: 'ಬಾಕಿ' },
    'Print': { hi: 'प्रिंट करें', te: 'ప్రింట్ చేయండి', ta: 'அச்சிடுக', mr: 'प्रिंट करा', bn: 'প্রিন্ট করুন', kn: 'ಪ್ರಿಂಟ್ ಮಾಡಿ' },
    'Download': { hi: 'डाउनलोड करें', te: 'డౌన్‌లోడ్ చేయండి', ta: 'பதிவிறக்குக', mr: 'डाउनलोड करा', bn: 'ডাউনলোড করুন', kn: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' },
    'Search': { hi: 'खोजें', te: 'శోధించండి', ta: 'தேடுக', mr: 'शोधा', bn: 'অনুসন্ধান করুন', kn: 'ಹುಡುಕಿ' },
    'Filter': { hi: 'फ़िल्टर करें', te: 'ఫిల్టర్ చేయండి', ta: 'வடிகட்டுக', mr: 'फिल्टर करा', bn: 'ফিল্টার করুন', kn: 'ಫಿಲ್ಟರ್ ಮಾಡಿ' }
  };

  // 4. MULTILINGUAL TRANSLATION ENGINE CLASS
  class I18nEngine {
    constructor() {
      this.currentLang = localStorage.getItem(STORAGE_KEY_LANG) || 'en';
      this.dict = I18N_DICTIONARY;
      this.phraseMap = PHRASE_TRANSLATIONS;
      this.vocabMap = VOCAB_TRANSLATIONS;
      this.observer = null;
      this.isTranslating = false;
    }

    init() {
      this.setLanguage(this.currentLang);
      this.initMutationObserver();
    }

    get(key, fallback = '') {
      const langDict = this.dict[this.currentLang] || this.dict.en;
      return langDict[key] || (this.dict.en ? this.dict.en[key] : '') || fallback || key;
    }

    // TRANSLATE ANY TEXT ARBITRARILY
    translateText(text, targetLang) {
      if (!text || typeof text !== 'string') return text;
      if (targetLang === 'en') return text;

      const trimmed = text.trim();
      if (!trimmed || trimmed.length <= 1) return text;
      // Do not translate pure numbers, timestamps or punctuation
      if (/^[0-9s:,.-/\#+°%@()!]+$/.test(trimmed)) return text;

      // Extract leading emoji/icon/symbol (e.g. 🌾, 🩺, 🚨, ✓, ➕, 💊)
      const emojiMatch = text.match(/^([\p{Extended_Pictographic}\p{Emoji_Presentation}\s•·✓✕⏱️🎙️🔊🔍📷]+)(.*)$/u);
      let prefix = '';
      let coreText = trimmed;

      if (emojiMatch) {
        prefix = emojiMatch[1];
        coreText = emojiMatch[2].trim();
      }

      if (!coreText) return text;

      // 1. Exact phrase match
      if (this.phraseMap[coreText] && this.phraseMap[coreText][targetLang]) {
        return prefix + this.phraseMap[coreText][targetLang];
      }

      // 2. Case-insensitive phrase match
      const lowerCore = coreText.toLowerCase();
      for (const phrase in this.phraseMap) {
        if (phrase.toLowerCase() === lowerCore && this.phraseMap[phrase][targetLang]) {
          return prefix + this.phraseMap[phrase][targetLang];
        }
      }

      // 3. Dictionary key lookup
      for (const key in this.dict.en) {
        if (this.dict.en[key] && this.dict.en[key].toLowerCase() === lowerCore) {
          const trans = (this.dict[targetLang] && this.dict[targetLang][key]) ? this.dict[targetLang][key] : null;
          if (trans) return prefix + trans;
        }
      }

      // 4. Vocabulary replacement for compound clinical phrases
      let replaced = coreText;
      let hasRepl = false;
      for (const word in this.vocabMap) {
        if (this.vocabMap[word][targetLang]) {
          const reg = new RegExp('\\b' + word + '\\b', 'gi');
          if (reg.test(replaced)) {
            replaced = replaced.replace(reg, this.vocabMap[word][targetLang]);
            hasRepl = true;
          }
        }
      }
      if (hasRepl) return prefix + replaced;

      return text;
    }

    setLanguage(lang) {
      if (!this.dict[lang]) lang = 'en';
      this.currentLang = lang;
      localStorage.setItem(STORAGE_KEY_LANG, lang);

      if (global.appStore) {
        global.appStore.setLanguage(lang);
      }

      // Sync language selector dropdowns
      document.querySelectorAll('#langSelect, .lang-select').forEach(sel => {
        sel.value = lang;
      });

      // Apply universal deep DOM translation
      this.applyTranslations(lang);
      this.applyDeepDomTranslation(lang);

      // Trigger active views to refresh localized components
      if (typeof window.renderActivePortalView === 'function') {
        try { window.renderActivePortalView(); } catch (e) {}
      }
      if (global.patientController && typeof global.patientController.renderAll === 'function') {
        try { global.patientController.renderAll(); } catch (e) {}
      }
      if (global.doctorController && typeof global.doctorController.init === 'function') {
        try { global.doctorController.init(); } catch (e) {}
      }
      if (global.workerController && typeof global.workerController.renderAll === 'function') {
        try { global.workerController.renderAll(); } catch (e) {}
      }
      if (global.adminController && typeof global.adminController.renderAll === 'function') {
        try { global.adminController.renderAll(); } catch (e) {}
      }

      // Second translation pass after controller DOM render
      setTimeout(() => {
        this.applyDeepDomTranslation(lang);
      }, 100);

      // Theme toggle button localization
      const curTheme = (document.body && document.body.getAttribute('data-theme')) || 'classic';
      const themeBtn = document.getElementById('themeToggleBtn');
      if (themeBtn) {
        themeBtn.textContent = this.get('theme_' + curTheme);
      }
      const navThemeText = document.getElementById('navThemeText');
      if (navThemeText) {
        navThemeText.textContent = this.translateText('Theme', lang);
      }
    }

    // LEGACY DATA-I18N APPLIER
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

    // UNIVERSAL DEEP DOM TRANSLATION WALKER (100% REVERSIBLE, ZERO DATA LOSS)
    applyDeepDomTranslation(lang) {
      if (typeof document === 'undefined' || !document.body) return;
      if (this.isTranslating) return;
      this.isTranslating = true;

      try {
        const ignoredTags = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'CODE', 'PRE']);

        // 1. Text Node Walker
        const walker = document.createTreeWalker(
          document.body,
          NodeFilter.SHOW_TEXT,
          {
            acceptNode: (node) => {
              if (!node.parentElement) return NodeFilter.FILTER_REJECT;
              const parentTag = node.parentElement.tagName;
              if (ignoredTags.has(parentTag)) return NodeFilter.FILTER_REJECT;
              // Ignore language selector options themselves
              if (node.parentElement.closest('#langSelect, .lang-select')) return NodeFilter.FILTER_REJECT;
              // Ignore user input fields
              if (node.parentElement.tagName === 'INPUT' || node.parentElement.isContentEditable) return NodeFilter.FILTER_REJECT;

              const val = node.nodeValue.trim();
              if (!val || val.length <= 1) return NodeFilter.FILTER_REJECT;
              if (/^[0-9s:,.-/\#+°%@()!]+$/.test(val)) return NodeFilter.FILTER_REJECT;
              return NodeFilter.FILTER_ACCEPT;
            }
          },
          false
        );

        const nodesToTranslate = [];
        let currentNode;
        while ((currentNode = walker.nextNode())) {
          nodesToTranslate.push(currentNode);
        }

        nodesToTranslate.forEach(node => {
          // Cache original text node string on first encounter
          if (node._origText === undefined) {
            node._origText = node.nodeValue;
          }

          if (lang === 'en') {
            if (node._origText !== undefined && node.nodeValue !== node._origText) {
              node.nodeValue = node._origText;
            }
          } else {
            const original = node._origText || node.nodeValue;
            const translated = this.translateText(original, lang);
            if (translated && translated !== node.nodeValue) {
              node.nodeValue = translated;
            }
          }
        });

        // 2. Input Placeholders
        document.querySelectorAll('input[placeholder]').forEach(input => {
          if (input.closest('#langSelect')) return;
          if (input._origPlaceholder === undefined) {
            input._origPlaceholder = input.getAttribute('placeholder');
          }
          if (lang === 'en') {
            if (input._origPlaceholder !== undefined) {
              input.setAttribute('placeholder', input._origPlaceholder);
            }
          } else {
            const orig = input._origPlaceholder || input.getAttribute('placeholder');
            const trans = this.translateText(orig, lang);
            if (trans) input.setAttribute('placeholder', trans);
          }
        });

        // 3. Option elements inside Selects (excluding langSelect)
        document.querySelectorAll('select:not(#langSelect) option').forEach(opt => {
          if (opt._origText === undefined) {
            opt._origText = opt.textContent;
          }
          if (lang === 'en') {
            if (opt._origText !== undefined) opt.textContent = opt._origText;
          } else {
            const orig = opt._origText || opt.textContent;
            const trans = this.translateText(orig, lang);
            if (trans) opt.textContent = trans;
          }
        });

      } catch (err) {
        console.warn('[i18n] Deep DOM translation notice:', err);
      } finally {
        this.isTranslating = false;
      }
    }

    // MUTATION OBSERVER TO CATCH DYNAMIC CARDS (HOSPITAL, CONSULT QUEUE, PRESCRIPTIONS)
    initMutationObserver() {
      if (typeof MutationObserver === 'undefined' || typeof document === 'undefined' || !document.body) return;
      if (this.observer) return;

      let debounceTimer = null;
      this.observer = new MutationObserver((mutations) => {
        if (this.currentLang === 'en') return;
        let shouldTranslate = false;
        for (let i = 0; i < mutations.length; i++) {
          if (mutations[i].addedNodes && mutations[i].addedNodes.length > 0) {
            shouldTranslate = true;
            break;
          }
        }
        if (shouldTranslate) {
          if (debounceTimer) clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => {
            this.applyDeepDomTranslation(this.currentLang);
          }, 60);
        }
      });

      this.observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  // 5. GLOBAL SPEECH SYNTHESIS ASSISTANT IN ALL 7 LANGUAGES
  global.speakText = function(text) {
    if (!('speechSynthesis' in window)) {
      if (typeof window.toast === 'function') window.toast('Speech synthesis not supported on this browser.');
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
      window.toast('🔊 ' + text.slice(0, 45) + '...');
    }
  };

  global.onLanguageChange = function(lang) {
    if (!global.i18n) return;
    global.i18n.setLanguage(lang);
    if (global.aiHealthBot && typeof global.aiHealthBot.setLanguage === 'function') {
      global.aiHealthBot.setLanguage(lang);
    }
    const names = {
      en: 'English (English)',
      hi: 'हिंदी (Hindi)',
      te: 'తెలుగు (Telugu)',
      ta: 'தமிழ் (Tamil)',
      mr: 'मराठी (Marathi)',
      bn: 'বাংলা (Bengali)',
      kn: 'ಕನ್ನಡ (Kannada)'
    };
    if (typeof window.toast === 'function') {
      window.toast('🌐 ' + (names[lang] || lang));
    }
  };

  const i18n = new I18nEngine();
  global.i18n = i18n;
  global.I18N_DICTIONARY = I18N_DICTIONARY;
  global.PHRASE_TRANSLATIONS = PHRASE_TRANSLATIONS;
  global.VOCAB_TRANSLATIONS = VOCAB_TRANSLATIONS;
  global.I18nEngine = I18nEngine;

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
      const session = global.appStore ? global.appStore.getState().session : {};
      const role = session && session.isLoggedIn ? session.role : 'gateway';
      const lang = global.i18n ? global.i18n.currentLang : 'en';

      const screenSummaries = {
        en: {
          gateway: 'Welcome to Swasthya Setu Rural Healthcare Grid. Please select your role to log in: Citizen, Doctor, ASHA, or Admin.',
          patient: 'Citizen Hub: Your digital ABHA health card is active. 108 Emergency SOS and Jan Aushadhi generic medicines are available.',
          doctor: 'Doctor Clinic Desk: Teleconsultation OPD queue is ready with active patients waiting.',
          worker: 'ASHA Frontline Portal: High-risk pregnancy register and child immunization schedules are open.',
          admin: 'District Command Center: Hospital bed allocation and blood bank supplies are online.'
        },
        hi: {
          gateway: 'स्वास्थ्य सेतु ग्रामीण स्वास्थ्य ग्रिड में आपका स्वागत है। कृपया लॉगिन करने के लिए अपनी भूमिका चुनें: नागरिक, चिकित्सक, आशा, या व्यवस्थापक।',
          patient: 'नागरिक हब: आपका डिजिटल आभा स्वास्थ्य कार्ड सक्रिय है। 108 आपातकालीन सेवा और जन औषधि दवाइयां उपलब्ध हैं।',
          doctor: 'चिकित्सक क्लिनिक डेस्क: टेलीकंसल्टेशन ओपीडी कतार तैयार है और मरीज प्रतीक्षारत हैं।',
          worker: 'आशा अग्रिम पंक्ति पोर्टल: उच्च जोखिम गर्भावस्था रजिस्टर और बाल टीकाकरण कार्यक्रम खुले हैं।',
          admin: 'जिला कमान केंद्र: अस्पताल बिस्तर आवंटन और ब्लड बैंक आपूर्ति ऑनलाइन है।'
        },
        te: {
          gateway: 'స్వాస్థ్య సేతు గ్రామీణ హెల్త్‌కేర్ గ్రిడ్‌కు స్వాగతం. దయచేసి లాగిన్ అవ్వడానికి మీ పాత్రను ఎంచుకోండి: పౌరుడు, వైద్యుడు, ఆశా, లేదా నిర్వాహకుడు.',
          patient: 'సిటిజన్ హబ్: మీ డిజిటಲ್ ఆభా హెల్త్ కార్డ్ సక్రియంగా ఉంది. 108 అత్యవసర సేవ మరియు జన్ ఔషధి మందులు అందుబాటులో ఉన్నాయి.',
          doctor: 'డాక్టర్ క్లినిక్ డెస్క్: టెలికన్సల్టేషన్ OPD క్యూ సిద్ధంగా ఉంది.',
          worker: 'ఆశా ఫ్రంట్‌లైన్ పోర్టల్: గర్భిణీల రికార్డు మరియు పిల్లల టీకా షెడ్యూల్ తెరిచి ఉన్నాయి.',
          admin: 'జిల్లా కమాండ్ సెంటర్: ఆసుపత్రి బెడ్ కేటాయింపు మరియు బ్లడ్ బ్యాంక్ సరఫరా ఆన్‌లైన్‌లో ఉన్నాయి.'
        },
        ta: {
          gateway: 'ஸ்வாஸ்த்ய சேது கிராமப்புற சுகாதார தளத்திற்கு நல்வரவு. உள்நுழைய உங்கள் பணியைத் தேர்ந்தெடுக்கவும்: குடிமகன், மருத்துவர், ஆஷா அல்லது நிர்வாகி.',
          patient: 'குடிமக்கள் தளம்: உங்கள் டிஜிட்டல் ஆபா அட்டை செயலில் உள்ளது. 108 அவசர உதவி மற்றும் மக்கள் மருந்தகம் தயாராக உள்ளது.',
          doctor: 'மருத்துவர் பிரிவு: தொலைமருத்துவ OPD வரிசை தயாராக உள்ளது.',
          worker: 'ஆஷா களப்பணி தளம்: கர்ப்பிணிகள் கண்காணிப்பு மற்றும் குழந்தைகள் தடுப்பூசி பதிவேடு திறக்கப்பட்டுள்ளது.',
          admin: 'மாவட்ட கட்டுப்பாட்டு மையம்: மருத்துவமனை படுக்கைகள் மற்றும் ரத்த வங்கி ஆன்லைனில் உள்ளன.'
        },
        mr: {
          gateway: 'स्वास्थ्य सेतू ग्रामीण आरोग्य ग्रिडमध्ये आपले स्वागत आहे. कृपया लॉगिन करण्यासाठी आपली भूमिका निवडा: नागरिक, डॉक्टर, आशा किंवा प्रशासक.',
          patient: 'नागरिक केंद्र: तुमचे डिजिटल आभा आरोग्य कार्ड सक्रिय आहे. 108 आपत्कालीन सेवा आणि जन औषधी उपलब्ध आहेत.',
          doctor: 'डॉक्टर क्लिनिक डेस्क: टेलिकन्सल्टेशन ओपीडी रांग सज्ज आहे.',
          worker: 'आशा फ्रंटलाइन पोर्टल: गरोदर मातांची नोंदवही आणि बाल लसीकरण वेळापत्रक उघडे आहे.',
          admin: 'जिल्हा कमांड सेंटर: रुग्णालय खाटा वाटप आणि रक्तपेढी साठा ऑनलाइन आहे.'
        },
        bn: {
          gateway: 'স্বাস্থ্য সেতু গ্রামীণ স্বাস্থ্য গ্রিডে স্বাগতম। লগ ইন করতে আপনার ভূমিকা নির্বাচন করুন: নাগরিক, ডাক্তার, আশা, বা প্রশাসক।',
          patient: 'নাগরিক কেন্দ্র: আপনার ডিজিটাল আভা স্বাস্থ্য কার্ড সক্রিয়। ১০৮ জরুরি অ্যাম্বুলেন্স এবং জন ঔষধি উপলব্ধ।',
          doctor: 'ডাক্তার ওপিডি ডেস্ক: টেলিকনসাল্টেশন ওপিডি সারি প্রস্তুত রয়েছে।',
          worker: 'আশা ফ্রন্টলাইন পোর্টাল: উচ্চ-ঝুঁকিপূর্ণ গর্ভাবস্থা এবং টিকাদান সময়সূচী খোলা আছে।',
          admin: 'জেলা কমান্ড সেন্টার: হাসপাতালের শয্যা বরাদ্দ এবং রক্ত ব্যাঙ্ক অনলাইন আছে।'
        },
        kn: {
          gateway: 'ಸ್ವಾಸ್ಥ್ಯ ಸೇತು ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ಜಾಲಕ್ಕೆ ಸುಸ್ವಾಗತ. ಲಾಗಿನ್ ಮಾಡಲು ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ: ನಾಗರಿಕ, ವೈದ್ಯರು, ಆಶಾ ಅಥವಾ ಆಡಳಿತಾಧಿಕಾರಿ.',
          patient: 'ನಾಗರಿಕ ಕೇಂದ್ರ: ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಆಭಾ ಹೆಲ್ತ್ ಕಾರ್ಡ್ ಸಕ್ರಿಯವಾಗಿದೆ. 108 ತುರ್ತು ಸೇವೆ ಮತ್ತು ಜನೌಷಧಿ ಲಭ್ಯವಿದೆ.',
          doctor: 'ವೈದ್ಯರ ಕ್ಲಿನಿಕ್ ಡೆಸ್ಕ್: ಟೆಲಿಸಮಾಲೋಚನೆ OPD ಸರತಿ ಸಿದ್ಧವಾಗಿದೆ.',
          worker: 'ಆಶಾ ಮುಂಚೂಣಿ ಪೋರ್ಟಲ್: ಗರ್ಭಿಣಿಯರ ದಾಖಲೆ ಮತ್ತು ಲಸಿಕಾ ವೇಳಾಪಟ್ಟಿ ತೆರೆದಿದೆ.',
          admin: 'ಜಿಲ್ಲಾ ಕಮಾಂಡ್ ಸೆಂಟರ್: ಆಸ್ಪತ್ರೆ ಬೆಡ್ ಹಂಚಿಕೆ ಮತ್ತು ರಕ್ತನಿಧಿ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿದೆ.'
        }
      };

      const langMap = screenSummaries[lang] || screenSummaries.en;
      textToRead = langMap[role] || langMap.gateway;
    }

    const readBtn = document.getElementById('btnVoiceRead');
    if (readBtn) {
      readBtn.innerHTML = '⏹️ ' + (global.i18n ? global.i18n.get('btn_stop_audio', 'Stop Voice') : 'Stop Voice');
      readBtn.style.background = '#dc2626';
      readBtn.style.color = '#ffffff';
    }
    global.isAudioPlaying = true;

    global.speakText(textToRead);

    const checkAudioEnd = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(checkAudioEnd);
        global.stopReadAloud();
      }
    }, 400);
  };

  global.stopReadAloud = function() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    global.isAudioPlaying = false;
    const readBtn = document.getElementById('btnVoiceRead');
    if (readBtn) {
      readBtn.innerHTML = '🔊 ' + (global.i18n ? global.i18n.get('btn_read_aloud', 'Read Aloud') : 'Read Aloud');
      readBtn.style.background = '';
      readBtn.style.color = '';
    }
  };

  global.toggleReadAloud = function() {
    if (global.isAudioPlaying) {
      global.stopReadAloud();
    } else {
      global.startReadAloud();
    }
  };

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => i18n.init());
    } else {
      i18n.init();
    }
  }

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
