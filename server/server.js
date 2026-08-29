/**
 * =========================================================
 * SWASTHYA SETU - NODE.JS & SUPABASE BACKEND SERVER
 * =========================================================
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  console.log('✓ Connected to Supabase PostgreSQL at:', SUPABASE_URL);
} else {
  console.info('⚠️ Supabase credentials not set in .env. Server running in proxy/health mode.');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    supabaseConnected: Boolean(supabase)
  });
});

// API Routes
app.get('/api/doctor/queue', async (req, res) => {
  if (!supabase) return res.json({ success: true, data: [] });
  const { data, error } = await supabase.from('consult_queue').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

app.post('/api/doctor/prescribe', async (req, res) => {
  if (!supabase) return res.json({ success: true, message: 'Saved locally' });
  const { data, error } = await supabase.from('prescriptions').insert([req.body]);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

app.get('/api/admin/hospitals', async (req, res) => {
  if (!supabase) return res.json({ success: true, data: [] });
  const { data, error } = await supabase.from('hospitals').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true, data });
});

app.listen(PORT, () => {
  console.log(`🚀 Swasthya Setu Backend Server running on http://localhost:${PORT}`);
});
