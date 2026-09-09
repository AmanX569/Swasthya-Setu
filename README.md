# Swasthya Setu (स्वास्थ्य सेतु)
### Rural Care Access & Quality Network · Unified Healthcare Platform

Swasthya Setu is a comprehensive community healthcare and emergency response platform built for rural and semi-urban ecosystems, aligned with Ayushman Bharat (ABDM/ABHA), e-Sanjeevani Telemedicine, PMBJP Jan Aushadhi, and India's 108 Emergency Service.

---

## Portals Included:
1. **Patient Portal**:
   - 108 Emergency Response & Live Tracking HUD (Driver Ravi Shankar, UP 20 G 1082, ETA countdown, onboard equipment, rural landmark transmitter)
   - Gemini 3.7 Flash AI Clinical Self-Triage (Emergency Red, Urgent Yellow, Routine Green)
   - AI Prescription OCR Scanner & Jan Aushadhi Savings Calculator (80%+ Generic Savings)
   - Daily Medication Checklist (Morning/Afternoon/Evening/Night)
   - Live Hospital Capacity & ICU Bed Availability Tracker
   - Multi-Member Family Profile Switcher & Pilot Village Switcher
   - Triple Themes (Emerald Night, Midnight OLED, Daylight Light)
2. **Field Worker (ASHA / Frontline Staff) Portal**:
   - Frontline Worker Dashboard (385 patients, 8 home visits, 6 high-risk ANC, 9 due immunizations)
   - High-Risk Pregnancy (ANC) Tracker & UIP Child Immunization Registry
   - Daily Home Visit Street Routing & Frontline Vital Entry
   - Offline-First Local Sync Queue (AES-256 encrypted on-device buffer)
3. **Doctor Portal & Clinical Telemedicine Suite**:
   - Clinical Overview & Live Queue
   - Pre-Consultation Patient Summary with ASHA-recorded vitals
   - Longitudinal EMR with structured intake note taking
   - Live Teleconsultation HUD (WebRTC simulation, 2G audio mode, PiP camera, translator bridge)
   - Smart "Pan Pusheddy" e-Prescription Generator with digital signature seal
   - In-Consult Emergency Escalation & Hospital Bed (ICU/Oxygen) Reservation
4. **Admin Command Center**:
   - Executive KPIs & Alert Feed
   - Staff & User Management (Doctors, Workers, Patients, Admins)
   - Doctor Credential Approvals (MCI/NMC License)
   - Field Worker Geographic Routing (District -> Block -> Village -> PHC)
   - Disease Surveillance Outbreak Heatmap (5 rural zones)
   - Rural Drug Supply Tracker, Bed Grid, and Blood Bank 8-Group Monitoring
## Authentication Architecture

Swasthya Setu uses a dual-layer security architecture tailored for rural and national compliance:
- **Citizen / Patient Login**: Password/PIN-first authentication (`Mobile / ABHA ID + Password/PIN -> Patient Dashboard`). Does **not** require OTP for everyday sign-in, preventing unnecessary SMS fatigue.
- **Mobile Number Verification**: Initiated from the Patient Dashboard (`Verify Mobile Number`) via real MSG91 SMS OTP to bind the mobile identity to the ABDM health registry.
- **Account Recovery (Forgot Password)**: Multi-step challenge-response flow (`Identifier -> SMS OTP Challenge -> Opaque Single-Use Reset Token -> Set New Password -> Sign In`).
- **Staff / Clinician Authentication**: Role-based access control (RBAC) with PIN authentication and administrative credential verification.

---

## MSG91 Real SMS OTP Integration

Swasthya Setu connects directly to **MSG91's official V5 OTP API** through the secure Express backend (`/api/auth/mobile/*` and `/api/auth/forgot-password/*`), ensuring client secrets never touch browser memory.

### Architecture

```
Browser / Client (Vue/HTML)
       ↓  (HTTPS POST /api/auth/mobile/send-otp)
Swasthya Setu Backend (Express / Vercel Serverless)
       ↓  (HTTPS POST https://control.msg91.com/api/v5/otp with authkey header)
MSG91 V5 Gateway & Telecom Operator DLT
       ↓  (Real SMS Carrier Delivery)
Citizen Handset (Indian SIM +91)
```

### Security & Compliance Guarantees:
1. **Zero Client-Side Secrets**: `MSG91_AUTH_KEY` is strictly server-side. No `NEXT_PUBLIC_` prefixes or frontend leakage.
2. **Serverless Stateless Challenges**: Uses cryptographically secure `challenge_id` tracking in PostgreSQL/Supabase (`otp_verifications` table). Fully compatible with Vercel serverless functions without in-memory state loss.
3. **TRAI / DLT Compliance**: Standardized for Indian Telecom Regulatory Authority requirements.
4. **Cooldown & Rate Limiting**: Enforces a 60-second cooldown per mobile number and hourly dispatch limits.
5. **Enumeration Defense**: Forgot Password endpoint responds identically regardless of whether the account exists.
6. **Replay & Injection Prevention**: Opaque single-use cryptographic reset tokens (`RST-...`) hashed via SHA-256 and consumed atomically.

---

## MSG91 Production Setup & Deployment Guide

To send real SMS OTPs to Indian mobile numbers in production, complete the following steps:

### 1. MSG91 & TRAI DLT Registration
1. **DLT Registration**: Register your entity on any Indian telecom DLT portal (Jio, Airtel, Vodafone-Idea, BSNL, or PingConnect).
2. **Header (Sender ID)**: Obtain approval for your 6-character Header (e.g., `SWSTHU`).
3. **Template Approval**: Register an OTP message template. Example:
   ```text
   Your Swasthya Setu verification code is ##OTP##. Valid for 5 minutes. Do not share this with anyone.
   ```
4. **MSG91 Dashboard**:
   - Go to [control.msg91.com](https://control.msg91.com).
   - Under **OTP**, create a new widget / template and link your approved DLT Entity ID, Sender ID, and Template ID.
   - Copy the generated **Template ID** and your account **Auth Key**.

### 2. Environment Variables (Vercel & Backend)
Configure the following environment variables in your server `.env` or Vercel Project Settings:

```bash
# SMS Gateway Provider ('msg91' for live production, 'sandbox' for offline local dev)
OTP_PROVIDER=msg91

# MSG91 Credentials (Keep Secret!)
MSG91_AUTH_KEY=your_msg91_auth_key_here
MSG91_OTP_TEMPLATE_ID=your_approved_template_id_here
MSG91_OTP_LENGTH=6
MSG91_OTP_EXPIRY_MINUTES=5
MSG91_BASE_URL=https://control.msg91.com

# Database (Supabase PostgreSQL)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# JWT & Node Environment
JWT_SECRET=your_super_secure_random_jwt_secret
NODE_ENV=production
```

### 3. Database Migration
Run the OTP verification migration in your Supabase SQL Editor:
`supabase/migrations/20260909_otp_verifications.sql`

This sets up:
- The `otp_verifications` table with indexes for `challenge_id`, `mobile`, and `reset_token_hash`.
- RLS policies protecting patient data.
- Automated cleanup of expired sessions.

### 4. Verification Checklist
- [x] Canonical phone normalization (`+91`, `91`, leading `0`, 10-digit formats).
- [x] Fail-loud policy enabled: if `OTP_PROVIDER=msg91` and keys are missing, server fails loudly rather than falling back silently.
- [x] 60-second cooldown countdown and resend button state machine.
- [x] Automated test suite: run `node server/tests/msg91.test.js` (17/17 tests passing).

---

## How to Run Locally

1. **Install Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Run Backend**:
   ```bash
   node server/app.js
   ```

3. **Rebundle Frontend (if modifying sources)**:
   ```bash
   node bundle.js
   ```

4. **Run Test Suite**:
   ```bash
   node server/tests/msg91.test.js
   ```

