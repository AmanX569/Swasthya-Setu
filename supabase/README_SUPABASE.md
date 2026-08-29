# ⚡ Supabase Setup Guide for Swasthya Setu

Follow these 3 quick steps to connect your own Supabase project:

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com/](https://supabase.com/) and sign in.
2. Click **"New Project"**, enter project name (e.g. `swasthya-setu`) and choose a database password.

---

### Step 2: Run Database Schema & Seed Data
1. In your Supabase Dashboard, navigate to the **SQL Editor** (icon on the left menu).
2. Copy all code from `supabase/schema.sql` and click **Run**.
3. Copy all code from `supabase/seed.sql` and click **Run**.
*(All 12 tables, Row Level Security policies, and Indian rural health seed datasets are now live!)*

---

### Step 3: Connect to Swasthya Setu Frontend
1. In Supabase Dashboard, go to **Project Settings** (gear icon) $\rightarrow$ **API**.
2. Copy your **Project URL** and **Anon Public API Key**.
3. In Swasthya Setu, click **⚙️ Supabase Settings** in the top navigation bar and paste your URL & Key.
*(Or edit `frontend/supabase-config.js` directly)*.

---

### 🚀 Realtime Live Synchronization:
Once connected, open two browser tabs side-by-side:
- Any patient added in Doctor Queue from Tab 1 will instantly appear on Tab 2 in real-time via WebSockets!
- Any hospital bed update will sync live across all connected devices!
