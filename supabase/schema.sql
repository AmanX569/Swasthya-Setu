-- ============================================================================
-- SWASTHYA SETU (स्वास्थ्य सेतु) - SUPABASE POSTGRESQL DATABASE SCHEMA
-- Rural Healthcare Access & Quality Network Architecture
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. USER PROFILES (Citizen & Staff Profiles)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    abha_id VARCHAR(30) UNIQUE,
    phone VARCHAR(15),
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    village VARCHAR(150),
    blood_group VARCHAR(10),
    role VARCHAR(20) NOT NULL DEFAULT 'patient', -- 'patient', 'doctor', 'worker', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 2. HEALTHCARE STAFF REGISTRY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'doctor', 'worker', 'admin'
    phone VARCHAR(15) NOT NULL,
    location VARCHAR(150),
    reg_no VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    password_hash VARCHAR(100) DEFAULT 'doc@123',
    pin VARCHAR(10) DEFAULT '1234',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 3. FAMILY MEMBERS (Citizen Health Circle)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    relation VARCHAR(50) NOT NULL,
    age INT,
    gender VARCHAR(10),
    abha_id VARCHAR(30),
    status VARCHAR(50) DEFAULT 'Healthy',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 4. TELECONSULTATION OPD QUEUE (Doctor Clinical Portal)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.consult_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token VARCHAR(20) NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    complaint TEXT NOT NULL,
    bp VARCHAR(20) DEFAULT '120/80',
    spo2 VARCHAR(10) DEFAULT '98%',
    temp VARCHAR(15) DEFAULT '98.6°F',
    pulse VARCHAR(15) DEFAULT '78 bpm',
    triage VARCHAR(20) DEFAULT 'Green', -- 'Red', 'Yellow', 'Green'
    queue_time VARCHAR(20) DEFAULT '10:00 AM',
    status VARCHAR(30) DEFAULT 'Waiting', -- 'Waiting', 'In Consult', 'Completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 5. VERIFIED CLINICAL E-PRESCRIPTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token VARCHAR(20),
    patient_name VARCHAR(100) NOT NULL,
    doctor_name VARCHAR(100) NOT NULL,
    rx_date DATE DEFAULT CURRENT_DATE NOT NULL,
    diagnosis TEXT NOT NULL,
    medicines JSONB NOT NULL DEFAULT '[]'::jsonb,
    advice TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 6. DAILY JAN AUSHADHI MEDICATION ADHERENCE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.daily_medications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    dose VARCHAR(50) NOT NULL,
    saving VARCHAR(50),
    morning BOOLEAN DEFAULT true,
    noon BOOLEAN DEFAULT false,
    night BOOLEAN DEFAULT true,
    taken_morning BOOLEAN DEFAULT false,
    taken_noon BOOLEAN DEFAULT false,
    taken_night BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 7. ASHA MATERNAL HIGH-RISK REGISTER (ANC)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.anc_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    mother_name VARCHAR(100) NOT NULL,
    husband_name VARCHAR(100),
    age INT DEFAULT 24,
    village VARCHAR(150) NOT NULL,
    weeks INT NOT NULL,
    edd DATE NOT NULL,
    bp VARCHAR(20) DEFAULT '110/70',
    hb VARCHAR(20) DEFAULT '11.2 g/dL',
    ifa_count INT DEFAULT 90,
    risk_level VARCHAR(100) DEFAULT 'Normal',
    next_visit DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 8. UNIVERSAL IMMUNIZATION PROGRAMME (UIP CHILD TRACKER)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.immunizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_name VARCHAR(100) NOT NULL,
    parent_name VARCHAR(100),
    dob DATE NOT NULL,
    gender VARCHAR(10),
    village VARCHAR(150),
    last_vaccine VARCHAR(100),
    next_due VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Up to Date',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 9. ASHA DAILY VILLAGE HOME VISITS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.home_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    household VARCHAR(150) NOT NULL,
    members INT DEFAULT 4,
    priority VARCHAR(100) DEFAULT 'Routine Check',
    task TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'Pending', -- 'Pending', 'Completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 10. LIVE HOSPITAL BED & OXYGEN GRID
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'PHC', 'CHC', 'District Hospital'
    distance VARCHAR(20),
    total_beds INT NOT NULL DEFAULT 20,
    gen_beds_avail INT NOT NULL DEFAULT 8,
    icu_beds_avail INT NOT NULL DEFAULT 2,
    oxygen_beds_avail INT NOT NULL DEFAULT 6,
    doctor_on_duty VARCHAR(100),
    phone VARCHAR(30),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 11. LIVE BLOOD BANK STOCK (8 GROUPS)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.blood_bank (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blood_group VARCHAR(10) UNIQUE NOT NULL,
    units_available INT NOT NULL DEFAULT 10,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 12. JAN AUSHADHI GENERIC DRUG INVENTORY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.medicines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    stock INT NOT NULL DEFAULT 100,
    unit VARCHAR(30) DEFAULT 'Tablets',
    generic_price NUMERIC(8, 2) NOT NULL,
    brand_price NUMERIC(8, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'In Stock',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 13. 108 EMERGENCY AMBULANCE SOS ALERTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.sos_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    village VARCHAR(150),
    abha_id VARCHAR(30),
    status VARCHAR(50) DEFAULT 'Dispatched',
    dispatched_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consult_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anc_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.immunizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sos_alerts ENABLE ROW LEVEL SECURITY;

-- Allow public read & write for seamless prototype & evaluation access
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Public access policy on %I" ON public.%I', tbl, tbl);
        EXECUTE format('CREATE POLICY "Public access policy on %I" ON public.%I FOR ALL USING (true) WITH CHECK (true)', tbl, tbl);
    END LOOP;
END $$;

-- ============================================================================
-- REALTIME SUBSCRIPTIONS REPLICATION
-- ============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.consult_queue;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hospitals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.blood_bank;
ALTER PUBLICATION supabase_realtime ADD TABLE public.prescriptions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.anc_records;
ALTER PUBLICATION supabase_realtime ADD TABLE public.sos_alerts;
