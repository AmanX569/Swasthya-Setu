-- =========================================================
-- SWASTHYA SETU — AI HEALTHCARE TRIAGE DATABASE SCHEMA
-- Conversations, Messages, and Row-Level Security Policies
-- =========================================================

CREATE TABLE IF NOT EXISTS public.ai_triage_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id TEXT NOT NULL,
    title VARCHAR(120) DEFAULT 'Healthcare Triage Session',
    urgency_level VARCHAR(20) DEFAULT 'LOW', -- 'LOW', 'MODERATE', 'URGENT', 'EMERGENCY'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_triage_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.ai_triage_conversations(id) ON DELETE CASCADE,
    sender VARCHAR(20) NOT NULL, -- 'patient', 'assistant', 'system'
    content TEXT NOT NULL,
    structured_payload JSONB,
    triage_level VARCHAR(20) DEFAULT 'LOW',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_ai_triage_conv_patient ON public.ai_triage_conversations(patient_id);
CREATE INDEX IF NOT EXISTS idx_ai_triage_msg_conv ON public.ai_triage_messages(conversation_id);

-- Row Level Security
ALTER TABLE public.ai_triage_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_triage_messages ENABLE ROW LEVEL SECURITY;

-- Patients can view and manage their own conversations
CREATE POLICY ai_triage_conv_patient_policy ON public.ai_triage_conversations
    FOR ALL
    USING (patient_id = auth.uid()::text OR patient_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Patients can view and create messages in their own conversations
CREATE POLICY ai_triage_msg_patient_policy ON public.ai_triage_messages
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.ai_triage_conversations c
            WHERE c.id = ai_triage_messages.conversation_id
            AND (c.patient_id = auth.uid()::text OR c.patient_id = current_setting('request.jwt.claims', true)::json->>'sub')
        )
    );
