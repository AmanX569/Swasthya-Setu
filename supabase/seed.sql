-- ============================================================================
-- SWASTHYA SETU - IDEMPOTENT REALISTIC DEMO SEED DATASET FOR SUPABASE
-- Real Indian Rural Healthcare Demographics & Clinical Records
-- Safe to re-run multiple times without generating duplicate rows.
-- ============================================================================

-- Ensure unique constraint indexes exist for clean idempotency
CREATE UNIQUE INDEX IF NOT EXISTS idx_consult_queue_token ON public.consult_queue(token);
CREATE UNIQUE INDEX IF NOT EXISTS idx_hospitals_name ON public.hospitals(name);
CREATE UNIQUE INDEX IF NOT EXISTS idx_anc_records_unique ON public.anc_records(mother_name, village);
CREATE UNIQUE INDEX IF NOT EXISTS idx_immunizations_unique ON public.immunizations(child_name, village);
CREATE UNIQUE INDEX IF NOT EXISTS idx_medicines_name ON public.medicines(name);
CREATE UNIQUE INDEX IF NOT EXISTS idx_prescriptions_token ON public.prescriptions(token);
CREATE UNIQUE INDEX IF NOT EXISTS idx_home_visits_household ON public.home_visits(household);

-- ----------------------------------------------------------------------------
-- 1. DEMO PATIENT PROFILE (ABHA Citizen)
-- ----------------------------------------------------------------------------
INSERT INTO public.profiles (id, abha_id, phone, name, age, gender, village, blood_group, role)
VALUES 
  ('a1b2c3d4-0001-4000-8000-000000000001', '14-8921-4402-9912', '9876543210', 'Ramesh Kumar', 38, 'Male', 'Kondapalli Sub-Centre, Ward 4', 'O+', 'patient')
ON CONFLICT (abha_id) DO UPDATE SET
  phone = EXCLUDED.phone,
  name = EXCLUDED.name,
  village = EXCLUDED.village,
  blood_group = EXCLUDED.blood_group;

-- ----------------------------------------------------------------------------
-- 2. HEALTHCARE STAFF REGISTRY (Doctor, ASHA Lead, ANM, Admin)
-- ----------------------------------------------------------------------------
INSERT INTO public.staff (staff_code, name, role, phone, location, reg_no, status, password_hash, pin)
VALUES
  ('DOC-101', 'Dr. Priya Sharma, MBBS, MD', 'doctor', '9811122233', 'Kondapalli PHC', 'MCI-AP-48912', 'Active Online', 'doc@123', '1234'),
  ('DOC-102', 'Dr. Rajesh Verma, MBBS', 'doctor', '9822233344', 'Ibrahimpatnam CHC', 'MCI-AP-31209', 'In Teleconsult', 'doc@123', '1234'),
  ('ASH-201', 'Lakshmi Didi (ASHA Lead)', 'worker', '9833344455', 'Sector 4, Kondapalli', 'ASHA-AP-094', 'On Home Visits', 'asha@123', '1234'),
  ('ASH-202', 'Anitha Rao (ANM)', 'worker', '9844455566', 'Sub-Centre 2', 'ANM-AP-118', 'At Vaccine Camp', 'asha@123', '1234'),
  ('ADM-001', 'S. K. Nambiar (District Officer)', 'admin', '9855566677', 'District HQ, Vijayawada', 'DHO-AP-001', 'System Active', 'admin@123', '1234')
ON CONFLICT (staff_code) DO UPDATE SET
  name = EXCLUDED.name,
  location = EXCLUDED.location,
  phone = EXCLUDED.phone,
  status = EXCLUDED.status;

-- ----------------------------------------------------------------------------
-- 3. CITIZEN FAMILY MEMBERS
-- ----------------------------------------------------------------------------
INSERT INTO public.family_members (patient_id, name, relation, age, gender, abha_id, status)
VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Ramesh Kumar', 'Self', 38, 'Male', '14-8921-4402-9912', 'Healthy'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Sunita Devi', 'Spouse', 34, 'Female', '14-3819-5510-7734', 'ANC Due'),
  ('a1b2c3d4-0001-4000-8000-000000000001', 'Aarav Kumar', 'Son', 6, 'Male', '14-9912-1102-3345', 'UIP Immunized')
ON CONFLICT DO NOTHING;

-- ----------------------------------------------------------------------------
-- 4. 5 OPD TELECONSULTATION QUEUE ENTRIES (Green / Yellow / Red Triage Mix)
-- ----------------------------------------------------------------------------
INSERT INTO public.consult_queue (token, patient_name, age, gender, complaint, bp, spo2, temp, pulse, triage, queue_time, status)
VALUES
  ('T-01', 'Ramesh Kumar', 38, 'M', 'High Fever & Body Ache for 3 Days', '120/80', '98%', '101.4°F', '88 bpm', 'Yellow', '10:15 AM', 'Waiting'),
  ('T-02', 'Sunita Devi', 34, 'F', '2nd Trimester Routine Check & Mild Dizziness', '110/70', '99%', '98.6°F', '76 bpm', 'Green', '10:30 AM', 'Waiting'),
  ('T-03', 'Gopal Raju', 52, 'M', 'Chest Tightness & Breathlessness on Exertion', '150/95', '94%', '99.1°F', '104 bpm', 'Red', '10:45 AM', 'Waiting'),
  ('T-04', 'Fatima Bi', 46, 'F', 'Diabetic Foot Ulcer & Spiking Blood Sugar', '140/90', '97%', '99.8°F', '92 bpm', 'Red', '11:00 AM', 'Waiting'),
  ('T-05', 'Aarav Patel', 7, 'M', 'Persistent Allergic Cough & Runny Nose', '105/68', '99%', '98.8°F', '82 bpm', 'Green', '11:15 AM', 'Waiting')
ON CONFLICT (token) DO UPDATE SET
  patient_name = EXCLUDED.patient_name,
  complaint = EXCLUDED.complaint,
  triage = EXCLUDED.triage,
  status = EXCLUDED.status;

-- ----------------------------------------------------------------------------
-- 5. VERIFIED CLINICAL E-PRESCRIPTION
-- ----------------------------------------------------------------------------
INSERT INTO public.prescriptions (token, patient_name, doctor_name, rx_date, diagnosis, medicines, advice)
VALUES
  ('T-01', 'Ramesh Kumar', 'Dr. Priya Sharma, MBBS, MD', CURRENT_DATE, 'Acute Viral Fever with Myalgia', '[
    {"name": "Paracetamol 650mg (Jan Aushadhi)", "dosage": "1 tab 3 times daily after food for 3 days", "timing": "1-1-1", "genericPrice": 8, "brandPrice": 34},
    {"name": "Cetirizine 10mg (Jan Aushadhi)", "dosage": "1 tab at night for 3 days", "timing": "0-0-1", "genericPrice": 4, "brandPrice": 22},
    {"name": "ORS Sachet Powder", "dosage": "1 packet in 1 liter clean water, sip frequently", "timing": "SOS", "genericPrice": 5, "brandPrice": 24}
  ]'::jsonb, 'Take clean boiled water, rest well. Report back if fever persists beyond 3 days.')
ON CONFLICT (token) DO UPDATE SET
  diagnosis = EXCLUDED.diagnosis,
  medicines = EXCLUDED.medicines,
  advice = EXCLUDED.advice;

-- ----------------------------------------------------------------------------
-- 6. MATERNAL HIGH-RISK REGISTER (ANC - 3 Records with Varied Risk Levels)
-- ----------------------------------------------------------------------------
INSERT INTO public.anc_records (mother_name, husband_name, age, village, weeks, edd, bp, hb, ifa_count, risk_level, next_visit)
VALUES
  ('Sunita Devi', 'Ramesh Kumar', 34, 'Kondapalli Ward 4', 24, CURRENT_DATE + INTERVAL '110 days', '110/70', '11.2 g/dL', 90, 'Normal', CURRENT_DATE + INTERVAL '14 days'),
  ('Kavitha M.', 'Srinivas M.', 22, 'Kondapalli Ward 2', 32, CURRENT_DATE + INTERVAL '56 days', '142/94', '9.1 g/dL', 60, 'High Risk (Hypertension)', CURRENT_DATE + INTERVAL '4 days'),
  ('Meena Bai', 'Suresh Rathod', 28, 'Gollapudi Thanda', 18, CURRENT_DATE + INTERVAL '154 days', '100/60', '7.8 g/dL', 30, 'High Risk (Severe Anemia)', CURRENT_DATE + INTERVAL '7 days')
ON CONFLICT (mother_name, village) DO UPDATE SET
  weeks = EXCLUDED.weeks,
  bp = EXCLUDED.bp,
  hb = EXCLUDED.hb,
  risk_level = EXCLUDED.risk_level,
  next_visit = EXCLUDED.next_visit;

-- ----------------------------------------------------------------------------
-- 7. UNIVERSAL IMMUNIZATION PROGRAMME (UIP Child Records at Different Stages)
-- ----------------------------------------------------------------------------
INSERT INTO public.immunizations (child_name, parent_name, dob, gender, village, last_vaccine, next_due, status)
VALUES
  ('Aarav Kumar', 'Ramesh Kumar', '2020-04-10', 'Male', 'Kondapalli Ward 4', 'OPV Booster + DPT 2nd Booster', 'Completed Core UIP', 'Up to Date'),
  ('Baby of Kavitha', 'Kavitha M.', '2026-02-15', 'Female', 'Kondapalli Ward 2', 'Pentavalent 3 + IPV', 'MR 1st Dose (9 Months)', 'Due in Oct'),
  ('Baby Ananya', 'Meena Bai', '2026-07-20', 'Female', 'Gollapudi Thanda', 'BCG, OPV-0, Hep-B Birth Dose', 'Pentavalent 1 + Rotavirus (6 Weeks)', 'Due in Sep')
ON CONFLICT (child_name, village) DO UPDATE SET
  last_vaccine = EXCLUDED.last_vaccine,
  next_due = EXCLUDED.next_due,
  status = EXCLUDED.status;

-- ----------------------------------------------------------------------------
-- 8. HOSPITAL BED & OXYGEN AVAILABILITY (3 Facilities)
-- ----------------------------------------------------------------------------
INSERT INTO public.hospitals (name, type, distance, total_beds, gen_beds_avail, icu_beds_avail, oxygen_beds_avail, doctor_on_duty, phone)
VALUES
  ('Kondapalli Primary Health Centre (PHC)', 'PHC', '1.2 km', 20, 8, 2, 6, 'Dr. Priya Sharma', '0866-281001'),
  ('Ibrahimpatnam Community Health Centre (CHC)', 'CHC', '6.5 km', 60, 18, 5, 14, 'Dr. Rajesh Verma', '0866-282002'),
  ('Government General Hospital (GGH), Vijayawada', 'District Hospital', '16.0 km', 500, 74, 12, 45, 'Emergency Trauma Team', '0866-257000')
ON CONFLICT (name) DO UPDATE SET
  gen_beds_avail = EXCLUDED.gen_beds_avail,
  icu_beds_avail = EXCLUDED.icu_beds_avail,
  oxygen_beds_avail = EXCLUDED.oxygen_beds_avail,
  doctor_on_duty = EXCLUDED.doctor_on_duty;

-- ----------------------------------------------------------------------------
-- 9. LIVE BLOOD BANK STOCK (All 8 Blood Groups with Varied Units)
-- ----------------------------------------------------------------------------
INSERT INTO public.blood_bank (blood_group, units_available)
VALUES
  ('A+', 14), ('A-', 4), ('B+', 22), ('B-', 6),
  ('O+', 31), ('O-', 8), ('AB+', 11), ('AB-', 3)
ON CONFLICT (blood_group) DO UPDATE SET units_available = EXCLUDED.units_available;

-- ----------------------------------------------------------------------------
-- 10. JAN AUSHADHI GENERIC MEDICINE CATALOG (Price Comparison Dataset)
-- ----------------------------------------------------------------------------
INSERT INTO public.medicines (name, category, stock, unit, generic_price, brand_price, status)
VALUES
  ('Paracetamol 650mg', 'Fever & Pain Relief', 450, 'Tablets', 8.00, 34.00, 'In Stock'),
  ('Amoxicillin 500mg', 'Antibiotic Infection', 220, 'Capsules', 28.00, 110.00, 'In Stock'),
  ('Metformin 500mg', 'Diabetes / Blood Sugar', 380, 'Tablets', 12.00, 58.00, 'In Stock'),
  ('Amlodipine 5mg', 'Hypertension / BP', 190, 'Tablets', 6.00, 38.00, 'In Stock'),
  ('ORS Powder Sachets', 'Dehydration / Diarrhea', 500, 'Packets', 5.00, 24.00, 'In Stock'),
  ('Iron & Folic Acid (IFA)', 'Maternal Nutrition', 650, 'Tablets', 4.00, 32.00, 'In Stock'),
  ('Azithromycin 500mg', 'Broad Spectrum Antibiotic', 175, 'Tablets', 42.00, 145.00, 'In Stock')
ON CONFLICT (name) DO UPDATE SET
  generic_price = EXCLUDED.generic_price,
  brand_price = EXCLUDED.brand_price,
  stock = EXCLUDED.stock,
  status = EXCLUDED.status;

-- ----------------------------------------------------------------------------
-- 11. ASHA DAILY VILLAGE HOME VISITS
-- ----------------------------------------------------------------------------
INSERT INTO public.home_visits (household, members, priority, task, status)
VALUES
  ('House #42, Ramesh Kumar', 3, 'ANC Follow-up', 'Check IFA intake & BP measurement', 'Completed'),
  ('House #58, Kavitha M.', 4, 'High-Risk Pregnancy', 'Review CHC referral slip & BP monitor', 'Pending'),
  ('House #71, Ramu Elder', 2, 'NCD Diabetes/BP', 'Glucometer test & Metformin stock check', 'Pending')
ON CONFLICT (household) DO UPDATE SET
  status = EXCLUDED.status,
  task = EXCLUDED.task;
