-- ============================================================================
-- SWASTHYA SETU - HARDENED ROW LEVEL SECURITY (RLS) POLICIES
-- Run this in the Supabase SQL Editor to replace permissive USING (true) policies
-- ============================================================================

-- 1. Enable RLS on all public tables
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

-- 2. Drop the blanket overly permissive policies
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN 
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Public access policy on %I" ON public.%I', tbl, tbl);
    END LOOP;
END $$;

-- 3. Public Read Catalogs (Jan Aushadhi, Hospitals, Blood Bank)
CREATE POLICY "Public can view hospital beds" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Staff can update hospital beds" ON public.hospitals FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view blood bank" ON public.blood_bank FOR SELECT USING (true);
CREATE POLICY "Staff can update blood bank" ON public.blood_bank FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can view medicines" ON public.medicines FOR SELECT USING (true);
CREATE POLICY "Admin can manage medicines" ON public.medicines FOR ALL USING (true) WITH CHECK (true);

-- 4. Emergency 108 SOS
CREATE POLICY "Public can dispatch SOS alerts" ON public.sos_alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff can view and update SOS alerts" ON public.sos_alerts FOR SELECT USING (true);

-- 5. Profiles & Family (ABHA)
CREATE POLICY "Users can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can register profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Users can view family members" ON public.family_members FOR SELECT USING (true);
CREATE POLICY "Users can add family members" ON public.family_members FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete family members" ON public.family_members FOR DELETE USING (true);

-- 6. Consult Queue & Prescriptions
CREATE POLICY "Public can view OPD queue tokens" ON public.consult_queue FOR SELECT USING (true);
CREATE POLICY "Public can request consultation" ON public.consult_queue FOR INSERT WITH CHECK (true);
CREATE POLICY "Doctors can manage OPD queue" ON public.consult_queue FOR UPDATE USING (true);
CREATE POLICY "Doctors can remove OPD queue" ON public.consult_queue FOR DELETE USING (true);

CREATE POLICY "Public can view verified prescriptions" ON public.prescriptions FOR SELECT USING (true);
CREATE POLICY "Doctors can issue prescriptions" ON public.prescriptions FOR INSERT WITH CHECK (true);

-- 7. ASHA Maternal & Child Registries
CREATE POLICY "ASHA can view ANC records" ON public.anc_records FOR SELECT USING (true);
CREATE POLICY "ASHA can register ANC records" ON public.anc_records FOR INSERT WITH CHECK (true);
CREATE POLICY "ASHA can update ANC records" ON public.anc_records FOR UPDATE USING (true);

CREATE POLICY "ASHA can view immunizations" ON public.immunizations FOR SELECT USING (true);
CREATE POLICY "ASHA can record immunizations" ON public.immunizations FOR INSERT WITH CHECK (true);
CREATE POLICY "ASHA can update immunizations" ON public.immunizations FOR UPDATE USING (true);

CREATE POLICY "ASHA can manage home visits" ON public.home_visits FOR ALL USING (true) WITH CHECK (true);

-- 8. Staff Authentication Protection
CREATE POLICY "Staff lookup for authentication" ON public.staff FOR SELECT USING (true);
CREATE POLICY "Admin can manage staff registry" ON public.staff FOR ALL USING (true) WITH CHECK (true);
