/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE CONFIGURATION (supabase-config.js)
 * Configure your Supabase Project URL and Public Anon Key
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_URL = 'swasthya_setu_supabase_url';
  const STORAGE_KEY_KEY = 'swasthya_setu_supabase_key';

  // Default / Demo Supabase configuration (Can be updated via UI modal or localStorage)
  const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
  const savedKey = localStorage.getItem(STORAGE_KEY_KEY);

  global.SUPABASE_CONFIG = {
    url: savedUrl || '',
    anonKey: savedKey || '',

    isConfigured: function() {
      return Boolean(this.url && this.anonKey && this.url.startsWith('https://'));
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
      this.url = '';
      this.anonKey = '';
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_KEY);
      if (global.supabaseService) {
        global.supabaseService.client = null;
      }
    }
  };

})(typeof window !== 'undefined' ? window : this);
