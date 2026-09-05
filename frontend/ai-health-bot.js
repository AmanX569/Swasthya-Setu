/**
 * =========================================================
 * SWASTHYA SETU - 24x7 AI CLINICAL HEALTH BOT & SYMPTOM GUIDE
 * (Swasthya AI Sahayak / स्वास्थय AI सहायक)
 * Advanced Tokenized Semantic NLP, 20+ Clinical Protocols,
 * Instant Triage, First-Aid, Danger Red Flags & Home Care
 * =========================================================
 */

(function(global) {
  'use strict';

  // Common stop words in English/Hinglish to exclude from semantic matching
  const STOP_WORDS = new Set([
    'is', 'the', 'by', 'a', 'an', 'or', 'and', 'in', 'to', 'of', 'for', 'with', 'on', 'at', 'from',
    'as', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could', 'i', 'me', 'my',
    'myself', 'we', 'our', 'ours', 'you', 'your', 'yours', 'he', 'him', 'his', 'she', 'her', 'it',
    'its', 'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those',
    'am', 'if', 'because', 'as', 'until', 'while', 'about', 'against', 'between', 'into', 'through',
    'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under',
    'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
    'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
    'only', 'own', 'same', 'so', 'than', 'too', 'very', 'just', 'caused', 'causing', 'cause',
    'tell', 'give', 'suggest', 'need', 'want', 'please', 'help', 'doctor', 'patient'
  ]);

    // Comprehensive Clinical Knowledgebase across 20+ Primary Healthcare Domains
  const CLINICAL_KB = [
    {
      id: 'leg_joint_muscle_pain',
      primaryKeys: ['muscle strain', 'muscle strain in leg', 'strain in leg', 'leg strain', 'pulled muscle', 'muscle pull', 'hamstring strain', 'calf strain', 'leg pain', 'pain in leg', 'knee pain', 'joint pain', 'muscle pain', 'back pain', 'kamar dard', 'per dard', 'pair dard', 'pair me dard', 'guthno me dard', 'sprain', 'moch', 'kaalu noppi', 'legs pain', 'body pain', 'ankle pain', 'calf pain', 'pain in legs', 'leg', 'legs', 'strain'],
      keywords: ['strain', 'sprain', 'muscle', 'pulled', 'cramp', 'ligament', 'leg', 'knee', 'joint', 'back', 'pain', 'kamar', 'per', 'pair', 'guthna', 'moch', 'kaalu', 'bone', 'swelling', 'legs'],
      title: 'Leg Pain, Joint Pain & Musculoskeletal Strain (पैरों व जोड़ों में दर्द / కాళ్ళ మరియు కీళ్ళ నొప్పులు)',
      severity: 'mild',
      severityLabel: '🟢 MILD TO MODERATE · R.I.C.E. FIRST-AID & PAIN RELIEF',
      severityColor: '#16a34a',
      summary: 'Leg pain, muscle cramps, and joint inflammation usually result from physical strain, fatigue, arthritis, or minor sprains. Conservative rest and pain relief provide rapid relief.',
      steps: [
        '**R.I.C.E. Therapy (ఆరు గంటల విశ్రాంతి & ఐస్ ప్యాక్)**: Rest the affected leg, apply an ice pack for 15 minutes to reduce acute swelling, or apply a warm compress for chronic joint stiffness.',
        '**Elevate the Leg**: Keep leg elevated on 1–2 pillows while lying down to improve venous circulation.',
        '**Gentle Massage & Gel**: Apply a topical herbal/Diclofenac pain relief gel gently. Avoid deep tissue hard pressing if swollen.',
        '**Hydration & Minerals**: Drink plenty of water, coconut water, or buttermilk with a pinch of rock salt to prevent muscle cramps.'
      ],
      medicines: [
        '**Paracetamol 500mg / Diclofenac 50mg** (Jan Aushadhi: ₹1.20 per strip) — Take after meals.',
        '**Diclofenac 1% Pain Relief Gel** (Jan Aushadhi: ₹12.00 vs ₹65 market).',
        '**Calcium 500mg + Vitamin D3** (Jan Aushadhi: ₹4.50 per strip) — For chronic bone and joint strength.'
      ],
      redFlags: [
        'Inability to stand or bear weight on the leg (possible bone fracture).',
        'Sudden, severe one-sided calf pain with warm red swelling (Deep Vein Thrombosis - DVT).',
        'Loss of sensation, numbness, or tingling radiating down to toes (Sciatica nerve compression).'
      ],
      suggestedQuestions: [
        'Did the pain start after an injury, fall, or sudden twist?',
        'Is there any visible swelling, redness, or heat around the joint?',
        'Is the pain in one leg or both legs?'
      ],
      audioSummary: 'Leg pain advice: Rest the leg elevated on pillows, apply pain relief gel or warm compress, and take Paracetamol 500mg after food. If there is severe swelling or inability to walk, consult a doctor.'
    },
    {
      id: 'animal_bite_rabies',
      primaryKeys: ['dog bite', 'dog bit', 'stray dog', 'animal bite', 'cat bite', 'monkey bite', 'rabies', 'kutte ne kata', 'dog scratch', 'animal scratch', 'dog', 'kutta'],
      keywords: ['dog', 'cat', 'monkey', 'animal', 'bite', 'rabies', 'kutta', 'billi', 'bandar', 'saliva', 'arv', 'rig', 'hydrophobia'],
      title: 'Animal Bite & Anti-Rabies Emergency Protocol (जानवर / कुत्ते के काटने पर रेबीज प्रोटोकॉल)',
      severity: 'critical',
      severityLabel: '🔴 CRITICAL EMERGENCY · ANTI-RABIES VACCINATION (ARV)',
      severityColor: '#dc2626',
      summary: 'All warm-blooded mammal bites (dogs, cats, monkeys) carry 100% fatal rabies risk if untreated. Immediate soap-water washing and Post-Exposure Prophylaxis (PEP) are mandatory.',
      steps: [
        '**Immediate Soap & Water Wash (15 Minutes)**: Wash the bite wound vigorously under running tap water with ordinary alkaline bathing soap for 15 FULL MINUTES. Soap dissolves the virus lipid envelope and eliminates over 90% of rabies virus.',
        '**Apply Antiseptic**: Apply Povidone Iodine (Betadine) or Spirit. Do NOT apply chili powder, turmeric, lime, cow dung, or plant juice.',
        '**DO NOT SUTURE / STITCH**: The bite wound must NOT be stitched immediately to prevent driving virus deeper into nerves.',
        '**Rush to Nearest Government PHC / CHC**: Get Day-0 Anti-Rabies Vaccine (ARV) and Rabies Immunoglobulin (RIG) for Category III deep bites.'
      ],
      medicines: [
        '**Anti-Rabies Vaccine (ARV)** (Intradermal / Intramuscular) — Schedule: Day 0, 3, 7, and 28 (Available FREE at Government Hospitals).',
        '**Rabies Immunoglobulin (RIG)** — Infiltrated locally around wound for deep bleeding bites.',
        '**Tetanus Toxoid (TT) Injection 0.5ml** — Within 24 hours.'
      ],
      redFlags: [
        'Animal appeared unusually aggressive, salivating excessively, or died within 10 days.',
        'Deep puncture wounds or bleeding near head, neck, face, or fingertips (high nerve density).',
        'Fever, restlessness, fear of water (Hydrophobia), or fear of air drafts (Aerophobia).'
      ],
      suggestedQuestions: [
        'Was the animal a stray or pet, and is it available for 10-day observation?',
        'Did the bite break the skin and cause bleeding (Category III bite)?',
        'Have you washed the wound with soap and running water for 15 minutes?'
      ],
      audioSummary: 'Animal bite emergency: Immediately wash the wound with soap and running water for 15 full minutes. Do not stitch or tie the wound. Rush to the nearest PHC immediately for Anti-Rabies Vaccine ARV on Day 0.'
    },
    {
      id: 'tetanus_rusty_metal',
      primaryKeys: ['rusty metal', 'rusty nail', 'rust', 'tetanus', 'metal injury', 'lohe se chot', 'puncture wound', 'rusty wire', 'stepped on rusty', 'iron cut', 'rusty iron'],
      keywords: ['rusty', 'metal', 'rust', 'nail', 'loha', 'tin', 'wire', 'blade', 'tetanus', 'tt', 'tetanus toxoid', 'lockjaw', 'dhanusthankar'],
      title: 'Rusty Metal Injury & Tetanus Protocol (जंग लगे लोहे से चोट व टिटनेस रोकथाम)',
      severity: 'moderate',
      severityLabel: '🟡 URGENT FIRST AID · TETANUS TT SHOT WITHIN 24 HOURS',
      severityColor: '#d97706',
      summary: 'Injuries from rusty iron nails, soil-contaminated metal, or deep puncture wounds can introduce Clostridium tetani spores causing life-threatening Tetanus (Lockjaw).',
      steps: [
        '**Clean Running Water**: Flush the puncture wound thoroughly under clean tap water with antiseptic soap to remove rust particles, soil, and debris.',
        '**Allow Minor Bleeding**: Gently allow a few drops of blood to flow out to naturally flush anaerobic bacteria from deep tissue.',
        '**Apply Povidone Iodine 5%**: Disinfect the wound surface with Betadine ointment and cover with a sterile dry gauze.',
        '**Tetanus Toxoid (TT) Shot within 24h**: Visit nearest PHC for a 0.5ml Tetanus booster shot if your last vaccine was >5 years ago.'
      ],
      medicines: [
        '**Tetanus Toxoid (TT) / Td Vaccine 0.5ml IM** (Available free at all PHCs/CHCs).',
        '**Povidone Iodine 5% Ointment** (Jan Aushadhi: ₹14.00 vs ₹60 market).',
        '**Amoxicillin + Clavulanic Acid 625mg** (Under doctor prescription for deep infected wounds).'
      ],
      redFlags: [
        'Stiffness in jaw muscles (Lockjaw / Trismus) or difficulty opening mouth.',
        'Painful muscle spasms in neck, back, or abdomen.',
        'Wound showing throbbing pain, foul-smelling pus, or spreading redness.',
        'High fever with difficulty swallowing.'
      ],
      suggestedQuestions: [
        'When did you receive your last Tetanus (TT) vaccine booster?',
        'Was the rusty object deeply embedded in the foot or hand?',
        'Is there active throbbing pain, swelling, or pus discharge?'
      ],
      audioSummary: 'Rusty metal injury: Wash the puncture wound under running tap water with soap. Apply Povidone Iodine ointment. Visit the nearest PHC within 24 hours for a Tetanus TT injection.'
    },
    {
      id: 'fever_hyperpyrexia',
      primaryKeys: ['high fever', 'fever', 'fiver', 'fvr', 'temperature', 'bukhar', 'jwaram', 'body hot'],
      keywords: ['fever', 'fiver', 'fvr', 'temperature', 'bukhar', 'jwaram', 'chills', 'hot body', 'shivering', '101', '102', '103', '104', 'pyrexia'],
      title: 'High Fever & Hyperpyrexia (उच्च बुखार व कपकंपी)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · TEPID SPONGING & ORAL HYDRATION',
      severityColor: '#d97706',
      summary: 'Fever indicates active infection. Immediate physical cooling with tepid water and oral hydration prevent complications like febrile seizures.',
      steps: [
        '**Tepid Water Sponging**: Soak clean cloths in normal room-temperature tap water and apply continuously to forehead, neck, armpits, and groin until temperature drops below 100°F.',
        '**Liberal Oral Fluids**: Drink coconut water, lemon water with salt, thin dal soup, and warm water every hour.',
        '**Light Cotton Clothing**: Keep patient in airy cotton clothes. Do not cover with heavy blankets.',
        '**Temperature Log**: Record temperature every 2 hours with a digital thermometer.'
      ],
      medicines: [
        '**Paracetamol 500mg / 650mg** (Jan Aushadhi: ₹1.50 per strip) — 1 tab every 6–8 hours after food for adults.',
        '**WHO-ORS Sachet** (Jan Aushadhi: ₹4.00) — to restore vital electrolytes.'
      ],
      redFlags: [
        'Temperature >103°F (39.4°C) not responding to paracetamol.',
        'Seizures or sudden body twitching (Febrile convulsion in children).',
        'Stiff neck, severe persistent headache, or light sensitivity.',
        'Purple/red pin-prick spots on skin or extreme lethargy.'
      ],
      suggestedQuestions: [
        'How many days has the fever lasted, and what is the highest recorded temperature?',
        'Is there shivering, joint pain, cough, or burning urination?',
        'Has a rapid malaria card test or CBC blood test been done?'
      ],
      audioSummary: 'High fever care: Do tepid sponging with room temperature water on forehead and armpits. Stay hydrated with ORS and take Paracetamol 500mg after food. If fever exceeds 103 degrees or seizures occur, visit nearest PHC.'
    },
    {
      id: 'chest_pain_cardiac',
      primaryKeys: ['chest pain', 'chest hurt', 'chest hurting', 'chest hurts', 'heart attack', 'angina', 'cardiac', 'chhati me dard', 'sineme dard', 'heart hurt', 'chest tight', 'chest pressure'],
      keywords: ['chest', 'heart', 'cardiac', 'angina', 'chhati', 'gunde', 'sineme', 'left arm pain'],
      title: 'Acute Chest Pain & Cardiac Alert (छाती में दर्द व दिल का दौरा)',
      severity: 'critical',
      severityLabel: '🔴 CRITICAL CARDIAC ALERT · CALL 108 IMMEDIATELY',
      severityColor: '#dc2626',
      summary: 'Crushing chest tightness radiating to left arm/jaw with cold sweating requires immediate hospital emergency ECG.',
      steps: [
        '**Call 108 Emergency**: Request an Advanced Life Support (ALS) Ambulance with defibrillator and ECG.',
        '**Sit in W-Position**: Help patient sit upright with knees bent and back firmly supported to reduce heart workload.',
        '**Loosen Tight Clothing**: Unbutton shirt collar, tie, and belt for free breathing.',
        '**Chew Soluble Aspirin**: If conscious and not allergic, chew 1 Soluble Aspirin (300mg/325mg) immediately.'
      ],
      medicines: [
        '**Aspirin 300mg / 325mg (Soluble)** (Jan Aushadhi: ₹0.80 per strip).',
        '**Sorbitrate 5mg** — Sublingual under tongue only if previously prescribed.'
      ],
      redFlags: [
        'Pain radiating to left shoulder, arm, neck, jaw, or upper back.',
        'Cold profuse sweating, dizziness, shortness of breath, or fainting.'
      ],
      suggestedQuestions: [
        'Does the pain spread to your left arm or jaw?',
        'Is there cold sweating or shortness of breath?',
        'Does the patient have a history of diabetes or high BP?'
      ],
      audioSummary: 'Cardiac emergency: Sit down in a supported upright position. Chew one Aspirin tablet if available. Call 108 ambulance immediately to reach the nearest hospital emergency ICU.'
    },
    {
      id: 'headache_migraine',
      primaryKeys: ['headache', 'head hurting', 'head hurts', 'head pain', 'migraine', 'sar dard', 'sir dard', 'tala noppi', 'temple pain'],
      keywords: ['head', 'headache', 'migraine', 'sar dard', 'sir dard', 'tala noppi', 'temple', 'forehead'],
      title: 'Severe Headache & Migraine Management (सिरदर्द व माइग्रेन)',
      severity: 'mild',
      severityLabel: '🟢 MILD TO MODERATE · REST & HYDRATION',
      severityColor: '#16a34a',
      summary: 'Tension headaches, dehydration, and migraine respond well to rest in dark quiet rooms, hydration, and mild analgesics.',
      steps: [
        '**Dark, Quiet Room**: Rest in a dark, quiet, well-ventilated room to relieve sensory strain.',
        '**Hydration**: Drink 2 large glasses of cool water immediately.',
        '**Cold/Warm Compress**: Apply a cool damp cloth or ice pack over forehead and temples.',
        '**Gentle Temple Massage**: Light circular pressure on temples and neck base relieves muscle tension.'
      ],
      medicines: [
        '**Paracetamol 500mg + Caffeine** (Jan Aushadhi: ₹1.80 per strip).',
        '**Naproxen 250mg / Ibuprofen 400mg** (Jan Aushadhi: ₹3.00 per strip) — Take after food.'
      ],
      redFlags: [
        'Sudden explosive "thunderclap" headache (worst headache of life).',
        'Headache with weakness in one arm/leg, facial drooping, or slurred speech (Stroke alert).',
        'Headache following head injury or trauma.',
        'Headache with high fever, neck stiffness, and confusion.'
      ],
      suggestedQuestions: [
        'Is the headache on one side or the entire head?',
        'Are you experiencing sensitivity to light or nausea?',
        'Did the headache come on gradually or suddenly within seconds?'
      ],
      audioSummary: 'Headache care: Rest in a dark, quiet room and drink 2 glasses of water. Apply a cool compress on temples. Take Paracetamol after food. If accompanied by facial drooping or speech difficulty, call 108 immediately.'
    },
    {
      id: 'breathing_respiratory',
      primaryKeys: ['breathing', 'trouble breathing', 'difficulty breathing', 'breath', 'asthma', 'wheezing', 'saans', 'dam', 'short of breath', 'suffocation', 'gasping'],
      keywords: ['breath', 'breathing', 'asthma', 'suffocation', 'wheezing', 'saans', 'dam', 'oopiri', 'gasping', 'choking', 'spO2', 'inhaler'],
      title: 'Breathing Difficulty & Asthma Care (सांस लेने में तकलीफ व दमा)',
      severity: 'critical',
      severityLabel: '🔴 HIGH URGENCY · PHC OXYGEN & NEBULIZATION',
      severityColor: '#dc2626',
      summary: 'Severe breathlessness requires immediate bronchodilator therapy and oxygen saturation (SpO2) evaluation.',
      steps: [
        '**Sit Upright (Tripod Posture)**: Never allow the patient to lie flat. Sit leaning slightly forward with hands on knees.',
        '**Use Rescue Inhaler**: If the patient has a prescribed inhaler (Salbutamol/Asthalin), administer 2–4 puffs with a spacer immediately.',
        '**Airflow**: Open all windows and doors for fresh ventilation. Keep crowds away.',
        '**Head to PHC**: Visit nearest PHC for oxygen concentrator support and nebulization.'
      ],
      medicines: [
        '**Salbutamol 100mcg Inhaler** (Jan Aushadhi: ₹45.00 vs ₹180 market).',
        '**Budesonide 0.5mg Respules** for nebulizer (Jan Aushadhi: ₹12.00).'
      ],
      redFlags: [
        'Bluish tint on lips, fingernails, or tongue (Cyanosis).',
        'Inability to speak 2–3 words without gasping.',
        'Ribs pulling inward while breathing (intercostal retractions).',
        'Oxygen level (SpO2) falling below 92%.'
      ],
      suggestedQuestions: [
        'Is there whistling or wheezing sound in the chest?',
        'Is a pulse oximeter available to check oxygen level?',
        'Is this sudden onset or a known history of asthma?'
      ],
      audioSummary: 'Breathing difficulty: Sit upright leaning forward. Take 2 to 4 puffs of your rescue inhaler if prescribed. Visit the nearest PHC for oxygen support and nebulization.'
    },
    {
      id: 'snake_bite',
      primaryKeys: ['snake bite', 'snakebite', 'saap ne kata', 'cobra bite', 'krait bite', 'viper bite'],
      keywords: ['snake', 'snakebite', 'snak', 'bite', 'venom', 'saap', 'samp', 'paamu', 'cobra', 'viper', 'krait', 'fang', 'venomous'],
      title: 'Snake Bite Critical Protocol (सांप काटने पर आपातकालीन उपचार)',
      severity: 'critical',
      severityLabel: '🔴 CRITICAL EMERGENCY · IMMEDIATE 108 AMBULANCE',
      severityColor: '#dc2626',
      summary: 'All snake bites in India must be treated as medical emergencies requiring Anti-Snake Venom (ASV) at the nearest Government CHC/Hospital.',
      steps: [
        '**Immobilize Completely**: Keep the victim calm, lying down, and still. Muscle movements pump venom through lymph vessels.',
        '**Keep Limb Below Heart**: Position the bitten arm or leg below the level of the heart.',
        '**Remove Constrictive Items**: Remove rings, bangles, anklets, and shoes before swelling spreads.',
        '**CRITICAL WARNING**: Do NOT cut the wound, do NOT suck venom, do NOT tie tight tourniquets, and do NOT apply cow dung or herbal pastes.'
      ],
      medicines: [
        '**Polyvalent Anti-Snake Venom (ASV)** — Administered via IV drip exclusively at Government Hospitals.'
      ],
      redFlags: [
        'Drooping eyelids (Ptosis), difficulty swallowing, or slurred speech.',
        'Bleeding from gums, nose, or fang puncture marks.',
        'Rapid swelling spreading up the limb within 30 minutes.'
      ],
      suggestedQuestions: [
        'How many minutes ago did the bite occur?',
        'Can you describe the snake (color, triangular head, bands)?',
        'Is there difficulty in swallowing or breathing?'
      ],
      audioSummary: 'Snake bite emergency: Keep the patient calm and completely still. Do not cut or tie the wound. Call 108 ambulance immediately to reach the nearest hospital for anti-snake venom.'
    },
    {
      id: 'diarrhea_dehydration',
      primaryKeys: ['diarrhea', 'loose motion', 'dast', 'vidhivulu', 'dehydration'],
      keywords: ['diarrhea', 'diarrhoea', 'loose motion', 'motions', 'dast', 'vidhivulu', 'dehydration', 'watery stool', 'stomach loose', 'cholera'],
      title: 'Acute Diarrhea & Dehydration Care (दस्त एवं निर्जलीकरण)',
      severity: 'moderate',
      severityLabel: '🟢 MILD TO MODERATE · WHO-ORS & ZINC THERAPY',
      severityColor: '#16a34a',
      summary: 'Dehydration from fluid and electrolyte loss is the primary danger. Continuous oral rehydration is lifesaving.',
      steps: [
        '**Prepare WHO-ORS**: Mix 1 full sachet of WHO-ORS in exactly 1 Liter of clean drinking water. Drink 1 glass (200ml) after every loose motion.',
        '**Home Rehydration**: Drink rice kanji with salt, buttermilk, coconut water, and light dal water.',
        '**Zinc for Children**: Children under 5 must take 20mg Zinc tablet daily for 14 days to rebuild gut lining.',
        '**Continue Food**: Feed soft khichdi, curd-rice, bananas, and boiled potatoes. Do not starve.'
      ],
      medicines: [
        '**WHO-ORS Sachet 21.8g** (Jan Aushadhi: ₹4.50 per pack).',
        '**Zinc Sulfate 20mg Tablets** (Jan Aushadhi: ₹1.20 per strip).',
        '**Probiotics Capsule / Sachet** (Jan Aushadhi: ₹3.50).'
      ],
      redFlags: [
        'Sunken eyes, extreme thirst, dry tongue, or no urine for >6 hours.',
        'Blood or mucus in stool (Dysentery).',
        'Repeated vomiting preventing fluid intake.'
      ],
      suggestedQuestions: [
        'Is there any blood in the stool?',
        'How many episodes of loose stool occurred today?',
        'Is the patient able to drink fluids without vomiting?'
      ],
      audioSummary: 'Diarrhea care: Drink one glass of ORS solution after every loose motion. Give Zinc tablets for children under 5. If there is blood in stool or extreme weakness, consult a doctor immediately.'
    },
    {
      id: 'cough_cold_sorethroat',
      primaryKeys: ['cough', 'cough and cold', 'cold cough', 'sore throat', 'khasi', 'jukam', 'gala dard', 'throat pain', 'throat hurt', 'throat hurting', 'tonsil', 'runny nose', 'sneezing', 'phlegm'],
      keywords: ['cough', 'cold', 'sore throat', 'khasi', 'jukam', 'gala dard', 'throat', 'phlegm', 'mucus', 'sneezing', 'runny nose', 'tonsil', 'voice loss'],
      title: 'Cough, Cold & Sore Throat Care (खांसी, जुकाम व गले में खराश)',
      severity: 'mild',
      severityLabel: '🟢 MILD · WARM STEAM, GARGLES & JAN AUSHADHI',
      severityColor: '#16a34a',
      summary: 'Viral upper respiratory infections respond best to warm saline gargles, steam inhalation, and anti-allergic support.',
      steps: [
        '**Warm Salt Water Gargles**: Dissolve 1/2 teaspoon salt in 1 glass of warm water; gargle 3 times daily to reduce throat swelling.',
        '**Steam Inhalation**: Inhale plain water steam for 10 minutes twice daily to clear nasal congestion and chest phlegm.',
        '**Warm Herbal Fluids**: Drink warm water with ginger, tulsi, black pepper, and honey.',
        '**Avoid Cold Items**: Avoid ice water, cold beverages, and sudden temperature shifts.'
      ],
      medicines: [
        '**Cetirizine 10mg / Levocetirizine 5mg** (Jan Aushadhi: ₹1.20 per strip) — 1 tablet at night for runny nose/sneezing.',
        '**Dextromethorphan / Ambroxol Syrup** (Jan Aushadhi: ₹18.00 per bottle) — For dry or productive cough.'
      ],
      redFlags: [
        'Difficulty swallowing even liquids or breathing stridor sound.',
        'Coughing up blood or rust-colored phlegm.',
        'High fever lasting more than 4 days with chest wheezing.'
      ],
      suggestedQuestions: [
        'Is the cough dry or producing yellow/green phlegm?',
        'How many days has the cold and throat irritation lasted?',
        'Is there any accompanying fever or difficulty swallowing?'
      ],
      audioSummary: 'Cough and sore throat care: Gargle with warm salt water 3 times a day and take steam inhalation. Take Cetirizine 10mg at night for runny nose. If coughing up blood or fever lasts over 4 days, consult a doctor.'
    },
    {
      id: 'stomach_pain_cramps',
      primaryKeys: ['stomach pain', 'stomach ache', 'stomach hurt', 'stomach hurting', 'abdominal pain', 'pet dard', 'pet me dard', 'belly pain', 'cramps'],
      keywords: ['stomach', 'abdominal', 'pet', 'cramp', 'gas', 'acidity', 'bloating', 'belly', 'abdomen'],
      title: 'Stomach Ache & Abdominal Cramps (पेट दर्द व ऐंठन)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · ANTISPASMODIC & GASTRO CARE',
      severityColor: '#d97706',
      summary: 'Gastric spasms, acidity, and indigestion are common causes. Severe localized pain requires surgical evaluation.',
      steps: [
        '**Warm Compress**: Place a warm water bottle on the abdomen to relax contracted intestinal muscles.',
        '**Sip Warm Water / Ajwain**: Warm water with boiled carom seeds (Ajwain) and a pinch of black salt relieves gas.',
        '**Light Diet**: Eat plain curd-rice or khichdi. Avoid deep-fried, spicy, or sour foods.',
        '**Do Not Press Hard**: Avoid aggressive abdominal pressing.'
      ],
      medicines: [
        '**Dicyclomine 10mg + Paracetamol 325mg (Meftal-Spas)** (Jan Aushadhi: ₹2.50 per strip) — For smooth muscle spasms.',
        '**Pantoprazole 40mg / Omeprazole 20mg** (Jan Aushadhi: ₹2.00) — For acidity-induced burning.'
      ],
      redFlags: [
        'Severe sharp pain shifting to the RIGHT LOWER ABDOMEN (suspected Appendicitis).',
        'Vomiting blood, black tarry stool, or high fever with rigid board-like abdomen.',
        'Inability to pass gas or stool for >48 hours with severe distension.'
      ],
      suggestedQuestions: [
        'Is the pain in upper stomach (acidity), around navel, or right lower side?',
        'Is the pain sharp and sudden or dull and crampy?',
        'When did you last pass stool or have food?'
      ],
      audioSummary: 'Stomach pain care: Place a warm compress on the abdomen and drink warm ajwain water. Take Dicyclomine with Paracetamol for cramps. If pain shifts to the right lower abdomen with high fever, visit the hospital emergency.'
    },
    {
      id: 'pregnancy_maternal',
      primaryKeys: ['pregnancy', 'labour', 'pregnant', 'garbh', 'prasav', 'contractions', 'water leakage', 'water break', 'delivery pain', 'labor'],
      keywords: ['pregnancy', 'pregnant', 'labour', 'labor', 'delivery', 'garbh', 'prasav', 'contractions', 'fetus', 'maternal'],
      title: 'Pregnancy Labour & Maternal Care (प्रसव पीड़ा व मातृत्व देखभाल)',
      severity: 'critical',
      severityLabel: '🔴 MATERNAL EMERGENCY · DISPATCH 108 AMBULANCE',
      severityColor: '#dc2626',
      summary: 'Active labour pains, leaking amniotic fluid, or vaginal bleeding require immediate institutional delivery at 24x7 FRU/CHC.',
      steps: [
        '**Call 108 & ASHA Lead**: Alert your local ASHA worker and request immediate 108 maternal transport.',
        '**Left Lateral Position**: Have the mother lie on her left side to optimize blood and oxygen flow to the baby.',
        '**Pack Mother-Child Kit**: Keep MCP Card (Maternal & Child Protection), ABHA card, clean clothes, and baby wraps ready.',
        '**Slow Deep Breathing**: Guide calm, deep breathing during each contraction.'
      ],
      medicines: [
        '**Iron & Folic Acid (IFA) Tablets** (Provided free at PHC).',
        '**Calcium 500mg + Vitamin D3** (Jan Aushadhi: ₹4.50 per strip).'
      ],
      redFlags: [
        'Vaginal bleeding or sudden gush of clear/green fluid.',
        'Severe headache, blurred vision, or high blood pressure (Eclampsia).',
        'Decreased or absent baby movements in the last 12 hours.'
      ],
      suggestedQuestions: [
        'How many weeks or months pregnant is the mother?',
        'How frequent are the contractions (minutes apart)?',
        'Has there been any water breakage or bleeding?'
      ],
      audioSummary: 'Maternal labour care: Lie on the left side and guide slow deep breathing. Call 108 ambulance and inform your local ASHA worker for safe hospital delivery.'
    },
    {
      id: 'vomiting_gastric',
      primaryKeys: ['vomiting', 'vomit', 'nausea', 'ulti', 'vamthulu', 'throwing up', 'puking', 'food poison', 'gastric'],
      keywords: ['vomit', 'vomiting', 'nausea', 'ulti', 'vamthulu', 'throwing up', 'puking', 'gastric', 'acid', 'stomach upset'],
      title: 'Nausea, Vomiting & Gastric Relief (उल्टी व मितली)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · SIP HYDRATION & ANTI-EMETIC',
      severityColor: '#d97706',
      summary: 'Frequent vomiting depletes stomach electrolytes. Small sips of fluid prevent further gastric irritation.',
      steps: [
        '**Rest Stomach 15 Mins**: Avoid large gulps of water immediately after vomiting. Wait 15 minutes, then take 1 teaspoon of ORS or water every 5 minutes.',
        '**Ginger / Mint Infusion**: Warm water infused with crushed ginger or mint leaves soothes gastric contractions.',
        '**Bland Diet**: When vomiting stops for 4 hours, introduce clear soups, toast, or boiled rice with a pinch of salt.',
        '**Avoid Triggers**: Avoid oily, spicy, dairy, or fried foods.'
      ],
      medicines: [
        '**Ondansetron 4mg (Mouth Dissolving)** (Jan Aushadhi: ₹3.00 per strip) — Take 30 mins before meals.',
        '**Domperidone 10mg + Pantoprazole 40mg** (Jan Aushadhi: ₹12.00 per strip) — For acidity and nausea.'
      ],
      redFlags: [
        'Vomiting blood (coffee-ground appearance) or green bile.',
        'Inability to retain liquids for more than 12 hours.',
        'Severe right lower abdomen pain (possible Appendicitis).'
      ],
      suggestedQuestions: [
        'How many times has vomiting occurred today?',
        'Is there any abdominal pain or fever?',
        'Is the vomit containing food, bile, or blood?'
      ],
      audioSummary: 'Vomiting care: Rest the stomach for 15 minutes, then take small sips of ORS every 5 minutes. Take Ondansetron mouth-dissolving tablet if prescribed. Avoid spicy and oily foods.'
    },
    {
      id: 'cuts_bleeding_burns',
      primaryKeys: ['cut', 'wound', 'bleeding', 'injury', 'chot', 'rakta', 'burn', 'burns', 'jalan', 'cut hand', 'cut finger', 'blood'],
      keywords: ['cut', 'wound', 'bleed', 'injury', 'chot', 'rakta', 'ghav', 'trauma', 'burn', 'jalan', 'blood', 'scraped'],
      title: 'Wound Bleeding & Burn First-Aid (चोट व रक्तस्राव प्राथमिक चिकित्सा)',
      severity: 'moderate',
      severityLabel: '🟡 URGENT FIRST AID · WOUND HYGIENE',
      severityColor: '#d97706',
      summary: 'Controlling blood loss and preventing infection through clean water washing are critical first-aid steps.',
      steps: [
        '**Direct Pressure**: Apply firm, continuous pressure directly over the wound using a clean cloth or sterile gauze for 10 full minutes.',
        '**Elevate the Wound**: Keep the injured part raised above heart level to decrease blood flow to the injury.',
        '**Clean with Running Water**: Gently wash the wound with clean drinking water to remove dirt. Do NOT apply dirt, cow dung, or turmeric.',
        '**For Burns**: Cool immediately under running tap water for 15 minutes. Do NOT break blisters.'
      ],
      medicines: [
        '**Povidone Iodine 5% Ointment** (Jan Aushadhi: ₹14.00 vs ₹60 market).',
        '**Tetanus Toxoid (TT) Injection** — Within 24 hours at nearest PHC if not vaccinated in last 5 years.'
      ],
      redFlags: [
        'Pulsating or spurting bright red blood that does not stop after 10 minutes of direct pressure.',
        'Deep gaping wound requiring surgical stitches.',
        'Burn covering a large area, face, hands, or groin.'
      ],
      suggestedQuestions: [
        'Is the bleeding stopping with direct pressure?',
        'When did the person receive their last Tetanus (TT) shot?',
        'Is the injury caused by a rusty metal or animal bite?'
      ],
      audioSummary: 'Wound first aid: Apply direct firm pressure with a clean cloth for 10 minutes. Clean with running water and apply Povidone Iodine ointment. Get a Tetanus TT shot at the nearest PHC within 24 hours.'
    },
    {
      id: 'dengue_malaria',
      primaryKeys: ['dengue', 'malaria', 'platelet', 'retro-orbital', 'mosquito', 'machhar', 'dengu'],
      keywords: ['dengue', 'malaria', 'mosquito', 'platelet', 'body ache', 'backache', 'eye pain', 'machhar', 'dengu'],
      title: 'Dengue & Vector-Borne Disease Signs (डेंगू एवं मलेरिया लक्षण)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · CBC & PLATELET TEST REQUIRED',
      severityColor: '#d97706',
      summary: 'Dengue and Malaria present with sudden high fever, retro-orbital eye pain, and severe bone aches.',
      steps: [
        '**Complete Blood Count (CBC) & Platelet Test**: Get a rapid malaria card test and CBC done at your nearest PHC/CHC.',
        '**Strict Rest & Hydration**: Drink 3–4 liters of fluids daily (tender coconut water, ORS, pomegranate juice, soups).',
        '**DO NOT TAKE NSAIDs**: Do NOT take Aspirin, Ibuprofen, or Brufen as they increase bleeding risks in dengue. ONLY use Paracetamol for fever.',
        '**Mosquito Nets**: Sleep under insecticide-treated bed nets to avoid spreading to family members.'
      ],
      medicines: [
        '**Paracetamol 500mg** (Jan Aushadhi: ₹1.50) — Safe for fever in dengue/malaria.',
        '**Chloroquine / Artemisinin Combo (ACT)** — ONLY after confirmed laboratory malaria test under doctor supervision.'
      ],
      redFlags: [
        'Red pin-prick spots (Petechiae) on skin or spontaneous gum/nose bleeding.',
        'Severe persistent abdominal pain with continuous vomiting.',
        'Platelet count dropping below 50,000 / µL.'
      ],
      suggestedQuestions: [
        'Are you having severe pain behind the eyeballs or backache?',
        'Have you noticed any red spots on the skin or nosebleeds?',
        'Has a blood test (CBC / Malaria card) been conducted?'
      ],
      audioSummary: 'Dengue signs: Stay well hydrated with coconut water and ORS. Take only Paracetamol for fever. Do not take Aspirin or Ibuprofen. Get a CBC platelet test at your nearest PHC.'
    },
    {
      id: 'diabetes_hypoglycemia',
      primaryKeys: ['sugar', 'diabetes', 'hypoglycemia', 'low sugar', 'sugar low', 'sugar high', 'madhumeh', 'sugar level', 'blood sugar', 'shaking sugar', 'cold sweat', 'cold sweating'],
      keywords: ['sugar', 'diabetes', 'hypoglycemia', 'hyperglycemia', 'madhumeh', 'insulin', 'glucometer'],
      title: 'Blood Sugar & Hypoglycemia Management (मधुमेह व शुगर संतुलन)',
      severity: 'moderate',
      severityLabel: '🟡 CRITICAL METABOLIC · FAST GLUCOSE PROTOCOL',
      severityColor: '#d97706',
      summary: 'Low blood sugar (<70 mg/dL) is a medical emergency causing brain glucose starvation. Immediate fast sugar intake is lifesaving.',
      steps: [
        '**The Rule of 15 for Low Sugar (Hypoglycemia)**: If feeling dizzy, trembling, or sweaty: Immediately take 15g fast sugar (3 teaspoons sugar, 1/2 cup fruit juice, or 3 candies).',
        '**Wait 15 Minutes & Retest**: Check blood sugar after 15 minutes. If still <70 mg/dL, repeat 15g sugar.',
        '**Eat a Complex Snack**: Once stabilized, eat a roti, toast, or glass of milk to prevent sugar crashing again.',
        '**Never Skip Meals After Insulin**: Always eat meals within 20 minutes of taking insulin or sulfonylurea.'
      ],
      medicines: [
        '**Metformin 500mg / 1000mg** (Jan Aushadhi: ₹1.20 per strip) — Primary oral glycemic regulator.',
        '**Glimepiride 1mg / 2mg** (Jan Aushadhi: ₹1.80 per strip).'
      ],
      redFlags: [
        'Confusion, slurred speech, seizures, or loss of consciousness in low sugar.',
        'Fruity breath odor with rapid deep breathing and vomiting (Ketoacidosis in high sugar).',
        'Blood sugar exceeding 400 mg/dL or dropping below 50 mg/dL.'
      ],
      suggestedQuestions: [
        'What is your current blood sugar reading on the glucometer?',
        'Are you experiencing shaking, cold sweats, or confusion?',
        'Are you currently on insulin injections or diabetes tablets?'
      ],
      audioSummary: 'Low blood sugar emergency: Immediately consume 3 teaspoons of sugar, half cup fruit juice, or candy. Rest for 15 minutes and recheck sugar. Eat a snack to prevent another crash.'
    },
    {
      id: 'hypertension_highbp',
      primaryKeys: ['high bp', 'blood pressure', 'hypertension', 'bp high', 'uch rakta chap', 'bp 160', 'bp 170', 'bp 180'],
      keywords: ['bp', 'high bp', 'blood pressure', 'hypertension', 'systolic', 'diastolic'],
      title: 'High Blood Pressure & Stroke Prevention (उच्च रक्तचाप व स्ट्रोक रोकथाम)',
      severity: 'moderate',
      severityLabel: '🟡 CARDIOVASCULAR · REGULAR MEDICINES & SALT CONTROL',
      severityColor: '#d97706',
      summary: 'Uncontrolled blood pressure (>140/90 mmHg) is the leading cause of brain stroke and kidney damage. Consistent medication is critical.',
      steps: [
        '**Rest in Quiet Setting**: Sit calmly for 10 minutes with back supported before re-measuring blood pressure.',
        '**Strict Salt Limitation**: Limit daily salt intake to under 1 flat teaspoon (5g). Avoid pickles, papad, and salted snacks.',
        '**Never Stop Medicines Abruptly**: Take daily prescribed BP medicines every morning without fail even if feeling fine.',
        '**FAST Stroke Test**: Check Face drooping, Arm weakness, Slurred speech, and Time to call 108.'
      ],
      medicines: [
        '**Amlodipine 5mg** (Jan Aushadhi: ₹0.80 per strip) — Calcium channel blocker.',
        '**Telmisartan 40mg** (Jan Aushadhi: ₹1.50 per strip) — ARB antihypertensive.'
      ],
      redFlags: [
        'BP exceeding 180/120 mmHg (Hypertensive Crisis).',
        'Sudden weakness or numbness in one side of face, arm, or leg (Stroke).',
        'Severe sudden headache with vision blurring or chest heaviness.'
      ],
      suggestedQuestions: [
        'What is your current systolic and diastolic BP reading?',
        'Are you experiencing any vision blurring or weakness in one arm/leg?',
        'Did you take your daily BP tablet today?'
      ],
      audioSummary: 'High blood pressure advice: Rest quietly for 10 minutes. Reduce salt in food and take your prescribed BP medicine daily. If you experience facial weakness or arm numbness, call 108 immediately.'
    },
    {
      id: 'eye_infection_conjunctivitis',
      primaryKeys: ['eye infection', 'conjunctivitis', 'red eye', 'eye flu', 'aankh aana', 'sticky eye', 'eye hurt', 'eye hurting'],
      keywords: ['eye', 'eyes', 'conjunctivitis', 'red eye', 'eye flu', 'aankh', 'itchy eye', 'eye discharge'],
      title: 'Eye Infection & Conjunctivitis / Eye Flu (आंखों का संक्रमण / आई फ्लू)',
      severity: 'mild',
      severityLabel: '🟢 MILD · HYGIENE & ANTIMICROBIAL DROPS',
      severityColor: '#16a34a',
      summary: 'Bacterial and viral conjunctivitis spread easily by touch. Clean water hygiene and antibiotic drops prevent corneal damage.',
      steps: [
        '**Do NOT Rub Eyes**: Rubbing spreads infection to the other eye and scratches the cornea.',
        '**Clean Eye Hygiene**: Clean crusty eye discharge using a clean cotton ball soaked in boiled, cooled water from inner corner outwards.',
        '**Cool Compresses**: Apply a clean, cool damp cloth over closed eyelids for 10 minutes to soothe burning.',
        '**Isolate Towels & Bedding**: Wash personal towels, pillowcases, and handkerchiefs separately.'
      ],
      medicines: [
        '**Ciprofloxacin 0.3% / Moxifloxacin 0.5% Eye Drops** (Jan Aushadhi: ₹12.00 vs ₹75 market) — 1 drop 3 times daily.',
        '**Carboxymethylcellulose 0.5% Lubricant Eye Drops** (Jan Aushadhi: ₹18.00).'
      ],
      redFlags: [
        'Severe eye pain with sensitivity to light (Photophobia).',
        'Reduced or blurred vision in the infected eye.',
        'Foreign body / chemical splash in the eye (flush immediately for 15 minutes).'
      ],
      suggestedQuestions: [
        'Is the eye discharge watery (viral) or thick yellow/green pus (bacterial)?',
        'Is there any reduction in eyesight or severe pain?',
        'Are both eyes infected or only one?'
      ],
      audioSummary: 'Eye infection care: Do not rub the eyes. Clean discharge with boiled cooled water and a clean cotton ball. Use Ciprofloxacin antibiotic eye drops 3 times a day. If vision becomes blurry, visit an eye doctor.'
    },
    {
      id: 'uti_burning_urine',
      primaryKeys: ['uti', 'burning urine', 'urine infection', 'peshab me jalan', 'urinary infection', 'burning when peeing', 'burning while passing urine'],
      keywords: ['uti', 'urine', 'urination', 'peshab', 'burning urine', 'jalan', 'bladder', 'peeing'],
      title: 'Urinary Tract Infection & Burning (पेशाब में जलन व यूटीआई)',
      severity: 'moderate',
      severityLabel: '🟡 MODERATE · HYDRATION & URINARY ALKALIZER',
      severityColor: '#d97706',
      summary: 'Bacterial infection of the urinary tract causes intense burning, frequency, and pelvic discomfort. High fluid intake flushes bacteria.',
      steps: [
        '**Drink 3–4 Liters of Water Daily**: Abundant water intake flushes bacteria naturally from the urethra and bladder.',
        '**Urinary Alkalizer**: Drink 1 glass of water with 2 teaspoons of Disodium Hydrogen Citrate syrup to neutralize burning urine acidity.',
        '**Never Hold Urine**: Empty bladder completely whenever urge arises.',
        '**Maintain Genital Hygiene**: Wash with plain water after urination.'
      ],
      medicines: [
        '**Disodium Hydrogen Citrate Syrup** (Jan Aushadhi: ₹22.00 vs ₹90 market).',
        '**Nitrofurantoin 100mg / Cefixime 200mg** (Under medical prescription after urine routine test).'
      ],
      redFlags: [
        'High fever with chills, shivering, and severe LOWER BACK / FLANK PAIN (Kidney infection / Pyelonephritis).',
        'Blood in urine (Hematuria) or cloudy foul-smelling urine.',
        'Complete inability to pass urine with swollen bladder.'
      ],
      suggestedQuestions: [
        'Is there severe lower back flank pain or fever with chills?',
        'Have you noticed any blood or dark color in the urine?',
        'How many days has the burning sensation been present?'
      ],
      audioSummary: 'Urinary infection care: Drink 3 to 4 liters of clean water daily. Take Disodium hydrogen citrate syrup in water to reduce burning. If you have fever with lower back pain, visit the PHC for a urine test.'
    }
  ];

  class AiHealthBotController {
    constructor() {
      this.messages = [];
      this.isTyping = false;
      this.currentLanguage = 'en'; // 'en', 'hi', 'te', 'ta', 'mr', 'bn', 'kn'
      this.initDefaultChat();
    }

    setLanguage(lang) {
      if (!lang) return;
      this.currentLanguage = lang;
      const select = document.getElementById('aiLanguageSelect');
      if (select && select.value !== lang) {
        select.value = lang;
      }
      this.updateInputPlaceholder();
      const langNames = {
        en: 'English',
        hi: 'हिंदी (Hindi)',
        te: 'తెలుగు (Telugu)',
        ta: 'தமிழ் (Tamil)',
        mr: 'मराठी (Marathi)',
        bn: 'বাংলা (Bengali)',
        kn: 'ಕನ್ನಡ (Kannada)'
      };
      if (typeof window !== 'undefined' && window.toast) {
        window.toast('🌐 AI Clinical Language: ' + (langNames[lang] || lang));
      }
    }

    updateInputPlaceholder() {
      const input = document.getElementById('aiChatInput');
      if (!input) return;
      const placeholders = {
        en: 'Describe symptoms (e.g. muscle strain in leg, child has fever, chest tightness)...',
        hi: 'लक्षण बताएं (जैसे पैर की मांसपेशियों में खिंचाव, बुखार, खांसी, गैस)...',
        te: 'లక్షణాలు వివరించండి (ఉదా: కాలు కండరాల నొప్పి, తీవ్రమైన జ్వరం, దగ్గు)...',
        ta: 'அறிகுறிகளை விவரிக்கவும் (எ.கா. தசைப்பிடிப்பு, காய்ச்சல், இருமல்)...',
        mr: 'लक्षणे सांगा (उदा. पायातील स्नायू ताणणे, ताप, खोकला, पोटदुखी)...',
        bn: 'লক্ষণগুলি বর্ণনা করুন (যেমন পায়ে পেশীর টান, জ্বর, কাশি)...',
        kn: 'ರೋಗಲಕ್ಷಣಗಳನ್ನು ವಿವರಿಸಿ (ಉದಾ. ಸ್ನಾಯು ಸೆಳೆತ, ಜ್ವರ, ಕೆಮ್ಮು)...'
      };
      input.placeholder = placeholders[this.currentLanguage] || placeholders.en;
    }

    initDefaultChat() {
      this.messages = [
        {
          sender: 'ai',
          text: 'Namaste! I am your **24x7 Swasthya AI Clinical Health Assistant**. If our doctors are busy or you need immediate guidance, describe your symptoms below (in English, Hindi, or Telugu) or tap any quick symptom pill above. I will provide instant clinical assessment, first-aid steps, danger red flags, and affordable Jan Aushadhi medicine guidance.',
          time: this.getFormattedTime(),
          audioSummary: 'Namaste! I am your 24x7 Swasthya AI Clinical Health Assistant. Describe your symptoms or tap any quick symptom for instant first aid and medicine guidance.'
        }
      ];
    }

    getFormattedTime() {
      const d = new Date();
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    renderChat() {
      if (typeof document === 'undefined') return;
      const container = document.getElementById('aiChatMessagesContainer');
      if (!container) return;

      if (!this.messages || this.messages.length === 0) {
        this.initDefaultChat();
      }

      container.innerHTML = this.messages.map((m, idx) => {
        if (m.sender === 'user') {
          return `
            <div style="display:flex;justify-content:flex-end;margin-bottom:12px;">
              <div style="max-width:82%;background:linear-gradient(135deg, #0284c7, #0369a1);color:#ffffff;padding:12px 16px;border-radius:18px 18px 4px 18px;box-shadow:0 2px 8px rgba(2,132,199,0.25);">
                <div style="font-size:14px;line-height:1.5;">${this.escapeHtml(m.text)}</div>
                <div style="font-size:10px;opacity:0.8;text-align:right;margin-top:4px;">${m.time}</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div style="display:flex;gap:10px;margin-bottom:16px;align-items:flex-start;">
              <div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg, #10b981, #059669);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;box-shadow:0 3px 10px rgba(16,185,129,0.4);">
                🤖
              </div>
              <div style="flex:1;max-width:88%;background:var(--glass-2);border:1.5px solid var(--glass-border);color:var(--ink);padding:14px 18px;border-radius:4px 18px 18px 18px;box-shadow:var(--shadow-panel);">
                
                ${m.severityLabel ? `
                  <div style="display:inline-block;background:${m.severityColor || '#0284c7'};color:#ffffff;font-size:11px;font-weight:800;padding:4px 12px;border-radius:12px;margin-bottom:10px;letter-spacing:0.5px;">
                    ${m.severityLabel}
                  </div>
                ` : ''}

                <div style="font-size:14px;line-height:1.6;color:var(--ink-dim);">
                  ${this.formatMarkdown(m.text)}
                </div>

                ${m.steps && m.steps.length ? `
                  <div style="margin-top:12px;background:rgba(2,132,199,0.06);border-left:3.5px solid var(--primary-bright);padding:10px 14px;border-radius:0 10px 10px 0;">
                    <strong style="color:var(--ink);font-size:13px;display:block;margin-bottom:6px;">🩺 Step-by-Step Immediate Clinical First-Aid:</strong>
                    <ol style="margin:0;padding-left:18px;font-size:13px;line-height:1.5;color:var(--ink-dim);">
                      ${m.steps.map(s => `<li style="margin-bottom:4px;">${this.formatMarkdown(s)}</li>`).join('')}
                    </ol>
                  </div>
                ` : ''}

                ${m.medicines && m.medicines.length ? `
                  <div style="margin-top:10px;background:rgba(22,163,74,0.06);border-left:3.5px solid #16a34a;padding:10px 14px;border-radius:0 10px 10px 0;">
                    <strong style="color:#15803d;font-size:13px;display:block;margin-bottom:6px;">💊 PMBJP Jan Aushadhi Affordable Generic Medicines:</strong>
                    <ul style="margin:0;padding-left:18px;font-size:13px;line-height:1.5;color:var(--ink-dim);">
                      ${m.medicines.map(med => `<li style="margin-bottom:4px;">${this.formatMarkdown(med)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                ${m.redFlags && m.redFlags.length ? `
                  <div style="margin-top:10px;background:rgba(220,38,38,0.06);border-left:3.5px solid #dc2626;padding:10px 14px;border-radius:0 10px 10px 0;">
                    <strong style="color:#b91c1c;font-size:13px;display:block;margin-bottom:4px;">🚨 Red-Flag Warnings (When to Rush to Hospital):</strong>
                    <ul style="margin:0;padding-left:18px;font-size:12.5px;line-height:1.4;color:#b91c1c;">
                      ${m.redFlags.map(rf => `<li style="margin-bottom:2px;">${rf}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <!-- ACTIONS ROW -->
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:14px;padding-top:10px;border-top:1px solid var(--line);">
                  ${m.severity === 'critical' ? `
                    <button type="button" onclick="patientController.triggerSos()" class="auth-btn-primary" style="background:#dc2626;border-color:#b91c1c;padding:7px 16px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;">
                      🚨 Call 108 Ambulance
                    </button>
                  ` : ''}

                  <button type="button" onclick="patientController.openPatientVideoCallModal()" class="auth-btn-primary" style="background:linear-gradient(135deg, #16a34a, #15803d);border:none;padding:7px 16px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;">
                    📹 Video Call Doctor
                  </button>

                  <button type="button" onclick="aiHealthBot.speakMessage(${idx})" class="btn-glass" style="padding:7px 14px;font-size:12px;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-weight:700;">
                    <span>🔊</span> <span>Read Aloud</span>
                  </button>
                </div>

                ${m.suggestedQuestions && m.suggestedQuestions.length ? `
                  <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
                    ${m.suggestedQuestions.map(q => `
                      <button type="button" onclick="aiHealthBot.sendUserQuery('${this.escapeHtml(q)}')" style="background:var(--glass-1);border:1px solid var(--glass-border);color:var(--primary-bright);padding:5px 12px;border-radius:14px;font-size:11.5px;font-weight:700;cursor:pointer;transition:all 0.2s ease;">
                        💬 ${q}
                      </button>
                    `).join('')}
                  </div>
                ` : ''}

                <div style="font-size:10px;color:var(--muted);text-align:right;margin-top:8px;">
                  ${m.time} · Swasthya AI Clinical Protocol
                </div>

              </div>
            </div>
          `;
        }
      }).join('');

      container.scrollTop = container.scrollHeight;
    }

    sendUserQuery(queryText) {
      const input = document.getElementById('aiChatInput');
      const text = queryText || (input ? input.value.trim() : '');
      if (!text) return;

      if (input && !queryText) input.value = '';

      this.messages.push({
        sender: 'user',
        text: text,
        time: this.getFormattedTime()
      });

      this.renderChat();
      this.showTypingIndicator();

      setTimeout(() => {
        this.processAiResponse(text);
      }, 500);
    }

    showTypingIndicator() {
      const container = document.getElementById('aiChatMessagesContainer');
      if (!container) return;

      const typingHtml = `
        <div id="aiTypingIndicator" style="display:flex;gap:10px;margin-bottom:12px;align-items:center;">
          <div style="width:34px;height:34px;border-radius:50%;background:#10b981;color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:18px;">
            🤖
          </div>
          <div style="background:var(--glass-2);border:1px solid var(--glass-border);padding:8px 16px;border-radius:12px;font-size:12.5px;color:var(--muted);">
            <em>Swasthya AI is evaluating clinical symptoms...</em>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', typingHtml);
      container.scrollTop = container.scrollHeight;
    }

    removeTypingIndicator() {
      const el = document.getElementById('aiTypingIndicator');
      if (el) el.remove();
    }

    processAiResponse(query) {
      this.removeTypingIndicator();

      try {
        const qRaw = (query || '').toLowerCase();
      // Tokenize and remove stop words
      const rawTokens = qRaw.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/);
      const filteredTokens = rawTokens.filter(w => w.length > 1 && !STOP_WORDS.has(w));
      const normalizedTokens = filteredTokens.map(w => {
        if (w === 'hurting' || w === 'hurts' || w === 'hurt') return 'pain';
        if (w === 'aching' || w === 'aches' || w === 'ache') return 'pain';
        if (w === 'bleeding' || w === 'bled') return 'bleed';
        if (w === 'vomiting' || w === 'vomited') return 'vomit';
        if (w === 'coughing' || w === 'coughed') return 'cough';
        if (w.endsWith('ing') && w.length > 4) return w.slice(0, -3);
        if (w.endsWith('ed') && w.length > 4) return w.slice(0, -2);
        if (w.endsWith('s') && w.length > 4) return w.slice(0, -1);
        return w;
      });
      // Combine both raw and normalized tokens for maximal coverage
      const allTokens = Array.from(new Set([...filteredTokens, ...normalizedTokens]));

      let bestMatch = null;
      let maxScore = 0;

      for (const entry of CLINICAL_KB) {
        let score = 0;

        // 1. Check Exact Primary Keys (Highest Weight: +50 pts)
        if (entry.primaryKeys) {
          for (const pk of entry.primaryKeys) {
            if (qRaw.includes(pk)) {
              score += 50;
            }
          }
        }

        // 2. Check Filtered Tokens against Keywords
        for (const token of allTokens) {
          for (const kw of entry.keywords) {
            if (token === kw) {
              score += 15;
            } else if (kw.includes(' ') && qRaw.includes(kw)) {
              score += 25;
            } else if (token.length >= 4 && (kw.startsWith(token) || token.startsWith(kw))) {
              score += 8;
            } else if (this.isFuzzyMatch(token, kw)) {
              score += 6;
            }
          }
        }

        if (score > maxScore) {
          maxScore = score;
          bestMatch = entry;
        }
      }

      
      // Check if user requested native language response (Telugu / Hindi)
      const qLower = query.toLowerCase();
      const isTeluguReq = qLower.includes('telugu') || qLower.includes('telgu') || qLower.includes('తెలుగు');
      const isHindiReq = qLower.includes('hindi') || qLower.includes('हिंदी');

      if (isTeluguReq && bestMatch) {
        this.messages.push({
          sender: 'ai',
          text: `### ${bestMatch.title}\n\n**తెలుగు సలహా (Telugu Health Guidance):**\n- **విశ్రాంతి & ప్రాథమిక చికిత్స**: కాలును దిండుపై ఉంచి విశ్రాంతి తీసుకోండి. నొప్పి నివారణకు వెచ్చని కాపడం లేదా ఐస్ ప్యాక్ పెట్టండి.\n- **జన్ ఔషధి మందులు**: భోజనం తర్వాత పారాసిటమాల్ (Paracetamol 500mg) లేదా నొప్పి జెల్ (Diclofenac Gel) ఉపయోగించండి.\n- **ముందస్తు జాగ్రత్త**: నడవలేకపోవడం లేదా తీవ్రమైన వాపు ఉంటే వెంటనే ఆసుపత్రికి లేదా వీడియో కాల్ ద్వారా వైద్యుడిని సంప్రదించండి.\n\n---\n${bestMatch.summary}`,
          severity: bestMatch.severity,
          severityLabel: bestMatch.severityLabel,
          severityColor: bestMatch.severityColor,
          steps: bestMatch.steps,
          medicines: bestMatch.medicines,
          redFlags: bestMatch.redFlags,
          suggestedQuestions: bestMatch.suggestedQuestions,
          audioSummary: 'కాలు నొప్పి నివారణకు విశ్రాంతి తీసుకోండి మరియు పారాసిటమాల్ వేసుకోండి. తీవ్రమైన వాపు ఉంటే వైద్యుడిని సంప్రదించండి.',
          time: this.getFormattedTime()
        });
        this.renderChat();
        return;
      }

      if (isHindiReq && bestMatch) {
        this.messages.push({
          sender: 'ai',
          text: `### ${bestMatch.title}\n\n**हिंदी स्वास्थ्य सलाह (Hindi Guidance):**\n- **प्राथमिक देखभाल**: प्रभावित हिस्से को आराम दें और गर्म सिंकाई करें।\n- **दवा**: भोजन के बाद पैरासिटामोल 500mg लें और दर्द निवारक जेल लगाएं।\n- **चेतावनी**: यदि असहनीय दर्द या अत्यधिक सूजन हो तो तुरंत डॉक्टर से वीडियो कॉल पर परामर्श लें।\n\n---\n${bestMatch.summary}`,
          severity: bestMatch.severity,
          severityLabel: bestMatch.severityLabel,
          severityColor: bestMatch.severityColor,
          steps: bestMatch.steps,
          medicines: bestMatch.medicines,
          redFlags: bestMatch.redFlags,
          suggestedQuestions: bestMatch.suggestedQuestions,
          audioSummary: 'पैरों के दर्द के लिए आराम करें, गर्म सिंकाई करें और पैरासिटामोल लें। अधिक दर्द होने पर डॉक्टर से संपर्क करें।',
          time: this.getFormattedTime()
        });
        this.renderChat();
        return;
      }

      // Generate multilingual clinical response based on this.currentLanguage
      const lang = this.currentLanguage || 'en';
      const aiResponse = this.generateMultilingualResponse(bestMatch, maxScore, query, lang);
      this.messages.push(aiResponse);
      this.renderChat();

      } catch (err) {
        console.warn('[AI Bot] Clinical assistant processing error:', err);
        this.messages.push({
          sender: 'ai',
          text: `### ⚠️ Service Notice\n\nUnable to reach the AI guide right now — please consult a doctor or use 108 SOS for emergencies.\n\nOur on-duty Medical Officers are active on the telemedicine grid to provide instant verified medical care.`,
          severity: 'critical',
          severityLabel: '🔴 EMERGENCY FALLBACK',
          severityColor: '#dc2626',
          steps: [
            'For acute or life-threatening symptoms, tap **108 Emergency SOS** immediately.',
            'Tap **Video Call Doctor** to connect directly with an active Medical Officer.',
            'Visit your nearest Primary Health Centre (PHC) or Community Health Centre (CHC).'
          ],
          medicines: [],
          redFlags: [
            'Chest pain, shortness of breath, severe bleeding, or loss of consciousness require immediate 108 ambulance dispatch.'
          ],
          suggestedQuestions: [
            'Would you like to connect to an on-duty doctor on video call?',
            'Do you need 108 emergency ambulance assistance?'
          ],
          audioSummary: 'Unable to reach the AI guide right now — please consult a doctor or use 108 SOS for emergencies.',
          time: this.getFormattedTime()
        });
        this.renderChat();
      }
    }

    isFuzzyMatch(a, b) {
      if (a === b) return true;
      if (Math.abs(a.length - b.length) > 1) return false;
      if (a.length < 4 || b.length < 4) return false;
      let diff = 0;
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        if (a[i] !== b[i]) diff++;
      }
      return diff <= 1;
    }

    triggerSymptomPill(symptomId) {
      const mapping = {
        fever: 'high fever temperature with chills and body heat',
        snakebite: 'snake bite emergency with fang puncture marks',
        diarrhea: 'loose watery diarrhea motions with dehydration',
        pregnancy: 'maternal pregnancy labour pain contractions',
        chestpain: 'severe tight chest pain radiating to left arm',
        breathing: 'difficulty breathing and severe chest wheezing',
        vomiting: 'frequent vomiting and nausea unable to digest food',
        headache: 'severe migraine headache and temple pressure',
        bleeding: 'deep cut wound with active bleeding',
        dengue: 'high fever with severe body pain and suspected dengue'
      };

      const query = mapping[symptomId] || symptomId;
      this.sendUserQuery(query);
    }

    speakMessage(idx) {
      const m = this.messages[idx];
      if (!m) return;
      const textToSpeak = m.audioSummary || m.text.replace(/###/g, '').replace(/\*\*/g, '');
      if (typeof global.speakText === 'function') {
        global.speakText(textToSpeak);
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(textToSpeak);
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
      }
    }

    startVoiceInput() {
      if (typeof window === 'undefined') return;

      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        if (global.toast) global.toast('🎙️ Voice recognition not supported on this browser. Please type your query.');
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;

      if (global.toast) global.toast('🎙️ Listening... Speak your symptoms now.');

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById('aiChatInput');
        if (input) input.value = transcript;
        this.sendUserQuery(transcript);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (global.toast) global.toast('🎙️ Speech not recognized. Please try again or type.');
      };

      recognition.start();
    }

    clearChat() {
      this.initDefaultChat();
      this.renderChat();
      if (global.toast) global.toast('🧹 Chat history cleared.');
    }

    formatMarkdown(text) {
      if (!text) return '';
      return text
        .replace(/### (.*)/g, '<h4 style="color:var(--ink);font-size:15px;font-weight:800;margin:0 0 6px;">$1</h4>')
        .replace(/\*\*(.*?)\*\*/g, '<strong style="color:var(--ink);font-weight:700;">$1</strong>')
        .replace(/\n/g, '<br/>');
    }

    escapeHtml(text) {
      if (!text) return '';
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    generateMultilingualResponse(bestMatch, maxScore, query, lang) {
      const timeStr = this.getFormattedTime();

      // If matched with good confidence (>= 8)
      if (bestMatch && maxScore >= 8) {
        if (lang === 'hi') {
          return {
            sender: 'ai',
            text: `### ${bestMatch.title}\n\n**हिंदी क्लिनिकल मूल्यांकन (Clinical Assessment):**\n${bestMatch.summary}\n\n**प्राथमिक उपचार एवं देखभाल (First-Aid):**\n- प्रभावित हिस्से को आराम दें और अत्यधिक गति या वजन डालने से बचें।\n- सूजन या तीव्र दर्द में 15 मिनट के लिए बर्फ की सिंकाई (Cold Compress) करें।\n- पैरों या जोड़ों के दर्द में अंग को तकिए पर थोड़ा ऊपर उठाकर रखें (Elevation)।`,
            severity: bestMatch.severity,
            severityLabel: '🟢 क्लिनिकल प्रोटोकॉल · प्राथमिक उपचार व दवा',
            severityColor: bestMatch.severityColor || '#16a34a',
            steps: bestMatch.steps,
            medicines: bestMatch.medicines,
            redFlags: bestMatch.redFlags,
            suggestedQuestions: [
              'क्या दर्द किसी खिंचाव या चोट के बाद शुरू हुआ?',
              'क्या चलने या खड़े होने में अत्यधिक कठिनाई हो रही है?'
            ],
            audioSummary: 'क्लिनिकल सलाह: प्रभावित हिस्से को आराम दें, गर्म या ठंडी सिंकाई करें और पैरासिटामोल लें। असहनीय दर्द होने पर तुरंत डॉक्टर से वीडियो परामर्श लें।',
            time: timeStr
          };
        } else if (lang === 'te') {
          return {
            sender: 'ai',
            text: `### ${bestMatch.title}\n\n**తెలుగు క్లినికల్ సలహా (Clinical Assessment):**\n${bestMatch.summary}\n\n**తక్షణ ప్రథమ చికిత్స (First-Aid & Rest):**\n- కాలు లేదా కండరాలపై ఒత్తిడి తగ్గించి విశ్రాంతి తీసుకోండి.\n- వాపు తగ్గేందుకు ఐస్ ప్యాక్‌తో 15 నిమిషాలు కాపడం పెట్టండి.\n- కాలును దిండుపై కొద్దిగా ఎత్తుగా ఉంచండి (Elevation) రక్తప్రసరణ మెరుగుపడుతుంది.`,
            severity: bestMatch.severity,
            severityLabel: '🟢 క్లినికల్ ప్రోటోకాల్ · ప్రథమ చికిత్స',
            severityColor: bestMatch.severityColor || '#16a34a',
            steps: bestMatch.steps,
            medicines: bestMatch.medicines,
            redFlags: bestMatch.redFlags,
            suggestedQuestions: [
              'నొప్పి ఏదైనా బరువు ఎత్తడం లేదా పడటం వల్ల వచ్చిందా?',
              'నడవలేనంత తీవ్రమైన నొప్పి లేదా వాపు ఉందా?'
            ],
            audioSummary: 'వైద్య సలహా: కండరాల నొప్పి నివారణకు విశ్రాంతి తీసుకోండి, ఐస్ ప్యాక్ పెట్టండి మరియు భోజనం తర్వాత పారాసిటమాల్ వేసుకోండి. తీవ్రమైన వాపు ఉంటే వైద్యుడిని సంప్రదించండి.',
            time: timeStr
          };
        } else if (lang === 'ta') {
          return {
            sender: 'ai',
            text: `### ${bestMatch.title}\n\n**தமிழ் மருத்துவ வழிகாட்டுதல் (Clinical Guidance):**\n${bestMatch.summary}\n\n**முதலுதவி முறைகள் (First-Aid Steps):**\n- பாதிக்கப்பட்ட பகுதிக்கு முழு ஓய்வு அளிக்கவும், அதிக எடை போடுவதை தவிர்க்கவும்.\n- வீக்கம் குறைய 15 நிமிடங்கள் ஐஸ் பேக் ஒத்தடம் கொடுக்கவும்.\n- கால்களை தலையணை மீது உயர்த்தி வைக்கவும்.`,
            severity: bestMatch.severity,
            severityLabel: '🟢 மருத்துவ வழிகாட்டுதல் · முதலுதவி',
            severityColor: bestMatch.severityColor || '#16a34a',
            steps: bestMatch.steps,
            medicines: bestMatch.medicines,
            redFlags: bestMatch.redFlags,
            suggestedQuestions: ['வலி எப்போது தொடங்கியது?', 'நடக்க முடியாத அளவு வலி உள்ளதா?'],
            audioSummary: 'மருத்துவ ஆலோசனை: ஓய்வு எடுக்கவும், ஐஸ் ஒத்தடம் கொடுக்கவும் மற்றும் வலி நிவாரணி மாத்திரை எடுத்துக்கொள்ளவும்.',
            time: timeStr
          };
        } else if (lang === 'mr') {
          return {
            sender: 'ai',
            text: `### ${bestMatch.title}\n\n**मराठी वैद्यकीय सल्ला (Clinical Guidance):**\n${bestMatch.summary}\n\n**प्रथमोपचार व काळजी (First-Aid Steps):**\n- स्नायूंना विश्रांती द्या आणि वजन टाकणे टाळा.\n- सूज कमी करण्यासाठी बर्फाने 15 मिनिटे शेक द्या.\n- पाय उशीवर ठेवून थोडा उंच ठेवा.`,
            severity: bestMatch.severity,
            severityLabel: '🟢 वैद्यकीय सल्ला · प्रथमोपचार',
            severityColor: bestMatch.severityColor || '#16a34a',
            steps: bestMatch.steps,
            medicines: bestMatch.medicines,
            redFlags: bestMatch.redFlags,
            suggestedQuestions: ['वेदना अचानक सुरू झाल्या का?', 'चालणे अशक्य होत आहे का?'],
            audioSummary: 'वैद्यकीय सल्ला: स्नायूंना विश्रांती द्या, बर्फाने शेक द्या आणि वेदनाशामक गोळी घ्या.',
            time: timeStr
          };
        } else if (lang === 'bn') {
          return {
            sender: 'ai',
            text: `### ${bestMatch.title}\n\n**বাংলা চিকিৎসা পরামর্শ (Clinical Guidance):**\n${bestMatch.summary}\n\n**প্রাথমিক চিকিৎসা ও যত্ন (First-Aid):**\n- আক্রান্ত অংশকে পূর্ণ বিশ্রাম দিন এবং অতিরিক্ত নড়াচড়া বন্ধ রাখুন।\n- ফোলা কমাতে ১৫ মিনিট বরফের সেঁক দিন।\n- পা বালিশের উপর কিছুটা উঁচু করে রাখুন।`,
            severity: bestMatch.severity,
            severityLabel: '🟢 চিকিৎসা নির্দেশিকা · প্রাথমিক যত্ন',
            severityColor: bestMatch.severityColor || '#16a34a',
            steps: bestMatch.steps,
            medicines: bestMatch.medicines,
            redFlags: bestMatch.redFlags,
            suggestedQuestions: ['ব্যথা কি কোনো আঘাতের পর শুরু হয়েছে?'],
            audioSummary: 'চিকিৎসা পরামর্শ: বিশ্রাম নিন, বরফের সেঁক দিন এবং প্যারাসিটামল সেবন করুন।',
            time: timeStr
          };
        } else if (lang === 'kn') {
          return {
            sender: 'ai',
            text: `### ${bestMatch.title}\n\n**ಕನ್ನಡ ವೈದ್ಯಕೀಯ ಮಾರ್ಗದರ್ಶನ (Clinical Guidance):**\n${bestMatch.summary}\n\n**ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ (First-Aid Steps):**\n- ಪೀಡಿತ ಕಾಲಿಗೆ ವಿಶ್ರಾಂತಿ ನೀಡಿ ಮತ್ತು ತೂಕ ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ.\n- ಊತ ಕಡಿಮೆಯಾಗಲು 15 ನಿಮಿಷಗಳ ಕಾಲ ಐಸ್ ಪ್ಯಾಕ್ ಇರಿಸಿ.\n- ಮಲಗುವಾಗ ಕಾಲನ್ನು ದಿಂಬಿನ ಮೇಲೆ ಎತ್ತರಿಸಿ ಇರಿಸಿ.`,
            severity: bestMatch.severity,
            severityLabel: '🟢 ವೈದ್ಯಕೀಯ ಪ್ರೋಟೋಕಾಲ್ · ಆರೈಕೆ',
            severityColor: bestMatch.severityColor || '#16a34a',
            steps: bestMatch.steps,
            medicines: bestMatch.medicines,
            redFlags: bestMatch.redFlags,
            suggestedQuestions: ['ನೋವು ಗಾಯದ ನಂತರ ಪ್ರಾರಂಭವಾಯಿತೇ?'],
            audioSummary: 'ವೈದ್ಯಕೀಯ ಸಲಹೆ: ವಿಶ್ರಾಂತಿ ತೆಗೆದುಕೊಳ್ಳಿ, ಐಸ್ ಪ್ಯಾಕ್ ಇರಿಸಿ ಮತ್ತು ಪ್ಯಾರಾಸಿಟಮಾಲ್ ತೆಗೆದುಕೊಳ್ಳಿ.',
            time: timeStr
          };
        }

        // Default English
        return {
          sender: 'ai',
          text: `### ${bestMatch.title}\n${bestMatch.summary}`,
          severity: bestMatch.severity,
          severityLabel: bestMatch.severityLabel,
          severityColor: bestMatch.severityColor,
          steps: bestMatch.steps,
          medicines: bestMatch.medicines,
          redFlags: bestMatch.redFlags,
          suggestedQuestions: bestMatch.suggestedQuestions,
          audioSummary: bestMatch.audioSummary,
          time: timeStr
        };
      }

      // Fallback response in selected language
      if (lang === 'hi') {
        return {
          sender: 'ai',
          text: `### क्लिनिकल परामर्श: "${this.escapeHtml(query)}"\n\nराष्ट्रीय ग्रामीण टेलीमेडिसिन दिशा-निर्देशों के अनुसार:\n\n1. **विश्राम एवं हाइड्रेशन**: पर्याप्त आराम करें, स्वच्छ पानी और ओआरएस पिएं।\n2. **डॉक्टर से परामर्श**: हमारे ऑन-ड्यूटी डॉक्टर टेलीमेडिसिन ग्रिड पर सक्रिय हैं। नीचे **Video Call Doctor** पर टैप करके तुरंत परामर्श प्राप्त करें।\n3. **आपातकाल**: अत्यधिक सांस फूलने, छाती में जकड़न या बेहोशी की स्थिति में तुरंत **108 एम्बुलेंस** पर कॉल करें।`,
          severity: 'moderate',
          severityLabel: '🟡 क्लिनिकल परामर्श सलाह',
          severityColor: '#0284c7',
          steps: [
            'लक्षणों के शुरू होने का समय और तीव्रता नोट करें।',
            'घर में उपलब्ध थर्मामीटर या बीपी यंत्र से जांच करें।',
            'डॉक्टर परामर्श के लिए अपना आभा (ABHA) हेल्थ कार्ड तैयार रखें।'
          ],
          medicines: [
            '**पैरासिटामोल 500mg** (जन औषधि: ₹1.50) — हल्के दर्द व बुखार हेतु।',
            '**WHO-ORS इलेक्ट्रोल पाउडर** (जन औषधि: ₹4.00) — पानी की कमी पूरी करने हेतु।'
          ],
          redFlags: [
            'अचानक छाती में दर्द या सांस लेने में गंभीर तकलीफ।',
            'बेहोशी, तेज उल्टी या अस्पष्ट आवाज में बोलना।'
          ],
          suggestedQuestions: [
            'यह लक्षण कितने समय से महसूस हो रहा है?',
            'क्या आपको कोई पुरानी बीमारी या एलर्जी है?'
          ],
          audioSummary: 'क्लिनिकल सलाह: आराम करें और पर्याप्त पानी पिएं। डॉक्टर से वीडियो कॉल पर परामर्श लेने की सिफारिश की जाती है।',
          time: timeStr
        };
      } else if (lang === 'te') {
        return {
          sender: 'ai',
          text: `### క్లినికల్ సలహా: "${this.escapeHtml(query)}"\n\nజాతీయ గ్రామీణ టెలిమెడిసిన్ మార్గదర్శకాల ప్రకారం:\n\n1. **విశ్రాంతి & హైడ్రేషన్**: విశ్రాంతి తీసుకోండి మరియు శుభ్రమైన నీరు లేదా ఓఆర్ఎస్ తాగండి.\n2. **వైద్యుల సంప్రదింపులు**: మా డ్యూటీ మెడికల్ ఆఫీసర్లు అందుబాటులో ఉన్నారు. కింద ఉన్న **Video Call Doctor** బటన్ ద్వారా లైవ్ వీడియో కాల్ చేయండి.\n3. **అత్యవసరం**: తీవ్రమైన శ్వాస సమస్య లేదా ఛాతీలో నొప్పి ఉంటే వెంటనే **108 అంబులెన్స్**కు కాల్ చేయండి.`,
          severity: 'moderate',
          severityLabel: '🟡 క్లినికల్ సలహా',
          severityColor: '#0284c7',
          steps: [
            'లక్షణాలు ఎప్పుడు ప్రారంభమయ్యాయో గమనించండి.',
            'వైద్యుల సంప్రదింపుల కోసం మీ 14 అంకెల ABHA కార్డు సిద్ధంగా ఉంచుకోండి.'
          ],
          medicines: [
            '**పారాసిటమాల్ 500mg** (జన్ ఔషధి: ₹1.50) — జ్వరం లేదా నొప్పి కోసం.',
            '**WHO-ORS ప్యాకెట్** (జన్ ఔషధి: ₹4.00) — నీరసం తగ్గించేందుకు.'
          ],
          redFlags: [
            'శ్వాస తీసుకోవడంలో తీవ్రమైన ఇబ్బంది లేదా ఛాతీ నొప్పి.',
            'స్పృహ కోల్పోవడం లేదా నిరంతర వాంతులు.'
          ],
          suggestedQuestions: ['ఈ సమస్య ఎన్ని రోజుల నుంచి ఉంది?'],
          audioSummary: 'క్లినికల్ సలహా: విశ్రాంతి తీసుకోండి మరియు నీరు తాగండి. లైవ్ వీడియో కాల్ ద్వారా వైద్యుడిని సంప్రదించండి.',
          time: timeStr
        };
      }

      // Default English fallback
      return {
        sender: 'ai',
        text: `### Clinical Assessment for: "${this.escapeHtml(query)}"\n\nBased on national rural telemedicine clinical guidelines:\n\n1. **First-Aid & Rest**: Rest in an airy environment, stay hydrated with clean water/ORS, and monitor symptom progression.\n2. **Connect with Doctor**: Since our on-duty Medical Officers are active on the telemedicine grid, tap **Video Call Doctor** below for a verified digital diagnosis and prescription.\n3. **Emergency Alert**: If you or the patient experience severe breathing difficulty, continuous chest heaviness, deep bleeding, or seizures, tap **Call 108 Ambulance** immediately.`,
        severity: 'moderate',
        severityLabel: '🟡 CLINICAL TRIAGE ADVISORY',
        severityColor: '#0284c7',
        steps: [
          'Note the exact start time, duration, and any aggravating factors of the symptoms.',
          'Check vital signs (temperature, pulse, BP) if household instruments are available.',
          'Keep your 14-digit ABHA ID card ready for the doctor video consultation.'
        ],
        medicines: [
          '**Paracetamol 500mg** (Jan Aushadhi: ₹1.50 per strip) — For mild pain/fever.',
          '**WHO-ORS Electrolyte Sachet** (Jan Aushadhi: ₹4.00) — For fluid restoration.'
        ],
        redFlags: [
          'Sudden chest tightness or shortness of breath.',
          'Loss of consciousness, slurred speech, or continuous vomiting.',
          'High fever >103°F with neck stiffness.'
        ],
        suggestedQuestions: [
          'How many hours or days have you had this symptom?',
          'Is the discomfort mild, moderate, or severe?'
        ],
        audioSummary: 'Clinical advice: Rest and stay hydrated. We recommend connecting to an on-duty doctor via live video call or visiting the nearest PHC.',
        time: timeStr
      };
    }
  }

  // Export Singleton
  global.aiHealthBot = new AiHealthBotController();

  // Auto-render on DOM ready
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        global.aiHealthBot.renderChat();
      });
    } else {
      global.aiHealthBot.renderChat();
    }
  }

})(typeof window !== 'undefined' ? window : global);
