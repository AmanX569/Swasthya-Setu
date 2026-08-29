/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE CONFIGURATION (supabase-config.js)
 * Pre-configured with your Supabase Project
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_URL = 'swasthya_setu_supabase_url';
  const STORAGE_KEY_KEY = 'swasthya_setu_supabase_key';

  // Your Supabase Project URL
  const PROJECT_URL = 'https://alevajxfkvnhuicfmpgr.supabase.co';

  const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
  const savedKey = localStorage.getItem(STORAGE_KEY_KEY);

  global.SUPABASE_CONFIG = {
    url: savedUrl || PROJECT_URL,
    anonKey: savedKey || '',

    isConfigured: function() {
      return Boolean(this.url && this.anonKey && this.anonKey.length > 20);
    },

    saveCredentials: function(url, anonKey) {
      this.url = (url || PROJECT_URL).trim();
      this.anonKey = (anonKey || '').trim();
      localStorage.setItem(STORAGE_KEY_URL, this.url);
      localStorage.setItem(STORAGE_KEY_KEY, this.anonKey);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    },

    clearCredentials: function() {
      this.url = PROJECT_URL;
      this.anonKey = '';
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_KEY);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    }
  };

})(typeof window !== 'undefined' ? window : this);
