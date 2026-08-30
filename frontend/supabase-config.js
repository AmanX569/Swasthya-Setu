/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE CONFIGURATION (supabase-config.js)
 * Connected to Live Supabase Project: bqtinztvktsosuypuifi
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_URL = 'swasthya_setu_supabase_url';
  const STORAGE_KEY_KEY = 'swasthya_setu_supabase_key';

  const PROJECT_URL = 'https://bqtinztvktsosuypuifi.supabase.co';
  const PROJECT_KEY = 'sb_publishable_TLWSYjSbIrgVfbt86PjgOQ_TaOyTtz4';

  const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
  const savedKey = localStorage.getItem(STORAGE_KEY_KEY);

  const supabaseConfigObj = {
    url: savedUrl || PROJECT_URL,
    anonKey: savedKey || PROJECT_KEY,

    isConfigured: function() {
      return Boolean(this.url && this.anonKey && this.anonKey.length > 10);
    },

    saveCredentials: function(url, anonKey) {
      this.url = (url || PROJECT_URL).trim();
      this.anonKey = (anonKey || PROJECT_KEY).trim();
      localStorage.setItem(STORAGE_KEY_URL, this.url);
      localStorage.setItem(STORAGE_KEY_KEY, this.anonKey);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    },

    clearCredentials: function() {
      this.url = PROJECT_URL;
      this.anonKey = PROJECT_KEY;
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_KEY);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    }
  };

  global.SUPABASE_CONFIG = supabaseConfigObj;
  global.supabaseConfig = supabaseConfigObj;

})(typeof window !== 'undefined' ? window : this);
