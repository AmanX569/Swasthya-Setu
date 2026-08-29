/**
 * =========================================================
 * SWASTHYA SETU - SUPABASE CONFIGURATION (supabase-config.js)
 * Connected to Live Supabase Project: alevajxfkvnhuicfmpgr
 * =========================================================
 */

(function(global) {
  'use strict';

  const STORAGE_KEY_URL = 'swasthya_setu_supabase_url';
  const STORAGE_KEY_KEY = 'swasthya_setu_supabase_key';

  const PROJECT_URL = 'https://alevajxfkvnhuicfmpgr.supabase.co';
  const PROJECT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsZXZhanhma3ZuaHVpY2ZtcGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NTUxOTAsImV4cCI6MjEwMzMzMTE5MH0.nls7NGKh6NerDWym47ucxyLj7sCaAHxve_bNqr_ACP0';

  const savedUrl = localStorage.getItem(STORAGE_KEY_URL);
  const savedKey = localStorage.getItem(STORAGE_KEY_KEY);

  global.SUPABASE_CONFIG = {
    url: savedUrl || PROJECT_URL,
    anonKey: savedKey || PROJECT_ANON_KEY,

    isConfigured: function() {
      return Boolean(this.url && this.anonKey && this.anonKey.length > 20);
    },

    saveCredentials: function(url, anonKey) {
      this.url = (url || PROJECT_URL).trim();
      this.anonKey = (anonKey || PROJECT_ANON_KEY).trim();
      localStorage.setItem(STORAGE_KEY_URL, this.url);
      localStorage.setItem(STORAGE_KEY_KEY, this.anonKey);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    },

    clearCredentials: function() {
      this.url = PROJECT_URL;
      this.anonKey = PROJECT_ANON_KEY;
      localStorage.removeItem(STORAGE_KEY_URL);
      localStorage.removeItem(STORAGE_KEY_KEY);
      if (global.supabaseService) {
        global.supabaseService.init();
      }
    }
  };

})(typeof window !== 'undefined' ? window : this);
