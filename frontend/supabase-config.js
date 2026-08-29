/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE CONFIGURATION (supabase-config.js)
 * Pre-configured for instant out-of-the-box local or cloud Supabase
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_URL = 'swasthya_setu_supabase_url';
  const STORAGE_KEY_KEY = 'swasthya_setu_supabase_key';

  const DEFAULT_LOCAL_URL = 'http://localhost:54321';
  const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.swasthya-setu-local-key';

  const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
  const savedKey = localStorage.getItem(STORAGE_KEY_KEY);

  global.SUPABASE_CONFIG = {
    url: savedUrl || DEFAULT_LOCAL_URL,
    anonKey: savedKey || DEFAULT_ANON_KEY,

    isConfigured: function() {
      return Boolean(this.url && this.anonKey);
    },

    saveCredentials: function(url, anonKey) {
      this.url = (url || '').trim();
      this.anonKey = (anonKey || '').trim();
      localStorage.setItem(STORAGE_KEY_URL, this.url);
      localStorage.setItem(STORAGE_KEY_KEY, this.anonKey);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    },

    clearCredentials: function() {
      this.url = DEFAULT_LOCAL_URL;
      this.anonKey = DEFAULT_ANON_KEY;
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_KEY);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    }
  };

})(typeof window !== 'undefined' ? window : this);
