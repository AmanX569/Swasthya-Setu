-- ====================================================================
-- SWASTHYA SETU — OTP VERIFICATIONS & CHALLENGE LIFECYCLE SCHEMA
-- Supporting Real MSG91 SMS OTP, Challenge-Response & Rate Limiting
-- ====================================================================

-- 1. Create otp_verifications table for serverless-safe state tracking
CREATE TABLE IF NOT EXISTS otp_verifications (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id        VARCHAR(64) UNIQUE NOT NULL,
  patient_id          VARCHAR(20),
  mobile              VARCHAR(15) NOT NULL, -- Canonical 10-digit Indian mobile
  purpose             VARCHAR(40) NOT NULL, -- 'MOBILE_VERIFICATION', 'PASSWORD_RESET', 'REGISTRATION'
  provider            VARCHAR(20) NOT NULL DEFAULT 'msg91',
  provider_request_id VARCHAR(100),
  status              VARCHAR(20) NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'VERIFIED', 'EXPIRED', 'FAILED', 'BLOCKED'
  attempt_count       INT NOT NULL DEFAULT 0,
  max_attempts        INT NOT NULL DEFAULT 5,
  send_count          INT NOT NULL DEFAULT 1,
  max_sends           INT NOT NULL DEFAULT 5,
  last_sent_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  cooldown_until      TIMESTAMPTZ NOT NULL,
  verified_at         TIMESTAMPTZ,
  expires_at          TIMESTAMPTZ NOT NULL,
  reset_token_hash    VARCHAR(200),
  reset_token_expires TIMESTAMPTZ,
  reset_used          BOOLEAN DEFAULT false,
  request_ip          VARCHAR(45),
  metadata            JSONB DEFAULT '{}'::jsonb,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookup by challenge_id
CREATE INDEX IF NOT EXISTS idx_otp_verifications_challenge ON otp_verifications(challenge_id);

-- Index for rate limit checking by mobile and timestamp
CREATE INDEX IF NOT EXISTS idx_otp_verifications_mobile_created ON otp_verifications(mobile, created_at);

-- Index for active reset token lookup
CREATE INDEX IF NOT EXISTS idx_otp_verifications_reset_token ON otp_verifications(reset_token_hash) WHERE reset_used = false;

-- RLS: Only service_role can access otp_verifications
ALTER TABLE otp_verifications ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'otp_verifications' AND policyname = 'service_role_otp_verifications'
  ) THEN
    CREATE POLICY service_role_otp_verifications ON otp_verifications
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
