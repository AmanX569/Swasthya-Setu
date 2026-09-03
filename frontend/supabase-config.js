/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE CONFIGURATION (supabase-config.js)
 * Secured configuration via environment variables & build flags
 * =========================================================
 */

(function(global) {
  'use strict';

  // Fallback defaults for static deployment
  const DEFAULT_URL = 'https://bqtinztvktsosuypuifi.supabase.co';
  const DEFAULT_ANON_KEY = 'sb_publishable_TLWSYjSbIrgVfbt86PjgOQ_TaOyTtz4';

  // Read from environment variables (Vite / Vercel build or window injection)
  let envUrl = '';
  let envKey = '';

  try {
    const metaEnv = new Function('return typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : null;')();
    if (metaEnv) {
      envUrl = metaEnv.VITE_SUPABASE_URL || '';
      envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';
    }
  } catch (e) {}

  if (!envUrl && typeof process !== 'undefined' && process.env) {
    envUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
    envKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';
  }

  if (!envUrl && typeof window !== 'undefined') {
    envUrl = window.VITE_SUPABASE_URL || window.SUPABASE_URL || '';
    envKey = window.VITE_SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY || '';
  }

  // Cleanup legacy localStorage credentials if any were saved by old UI modal
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('swasthya_setu_supabase_url');
      localStorage.removeItem('swasthya_setu_supabase_key');
    }
  } catch (e) {}

  const supabaseConfigObj = {
    url: (envUrl || DEFAULT_URL).trim(),
    anonKey: (envKey || DEFAULT_ANON_KEY).trim(),

    isConfigured: function() {
      return Boolean(this.url && this.anonKey && this.anonKey.length > 10);
    }
  };

  global.SUPABASE_CONFIG = supabaseConfigObj;
  global.supabaseConfig = supabaseConfigObj;

})(typeof window !== 'undefined' ? window : this);
