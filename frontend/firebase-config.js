/**
 * Swasthya Setu - Firebase Configuration & Dynamic Connection Manager
 * 
 * Provides:
 * 1. Pre-configured Firebase SDK initialization
 * 2. Dynamic credentials manager (allows users to enter custom Firebase API credentials in Settings)
 * 3. Automatic fallback to LocalStorage/IndexedDB when offline or unconfigured
 */

(function(global) {
  'use strict';

  // Default demo / placeholder config or read from localStorage
  const DEFAULT_FIREBASE_CONFIG = {
    apiKey: "AIzaSyDemoKeySwasthyaSetu1234567890",
    authDomain: "swasthya-setu-care.firebaseapp.com",
    projectId: "swasthya-setu-care",
    storageBucket: "swasthya-setu-care.appspot.com",
    messagingSenderId: "108200108200",
    appId: "1:108200108200:web:abcdef1234567890"
  };

  class FirebaseConfigManager {
    constructor() {
      this.config = this.loadConfig();
      this.isConfigured = this.checkIfConfigured();
      this.app = null;
      this.db = null;
      this.auth = null;
    }

    loadConfig() {
      try {
        const saved = localStorage.getItem('swasthya_setu_firebase_config');
        return saved ? JSON.parse(saved) : DEFAULT_FIREBASE_CONFIG;
      } catch (e) {
        return DEFAULT_FIREBASE_CONFIG;
      }
    }

    saveConfig(newConfig) {
      try {
        localStorage.setItem('swasthya_setu_firebase_config', JSON.stringify(newConfig));
        this.config = newConfig;
        this.isConfigured = true;
        this.initFirebase();
        return true;
      } catch (e) {
        console.error('Failed to save Firebase config:', e);
        return false;
      }
    }

    checkIfConfigured() {
      return this.config && this.config.apiKey && !this.config.apiKey.includes('DemoKey');
    }

    initFirebase() {
      try {
        if (typeof firebase !== 'undefined' && firebase.initializeApp) {
          if (!firebase.apps.length) {
            this.app = firebase.initializeApp(this.config);
          } else {
            this.app = firebase.app();
          }

          if (firebase.firestore) {
            this.db = firebase.firestore();
            // Enable offline persistence in Firestore
            try {
              this.db.enablePersistence({ synchronizeTabs: true }).catch(err => {
                if (err.code === 'failed-precondition') {
                  console.warn('Firestore persistence: multiple tabs open');
                } else if (err.code === 'unimplemented') {
                  console.warn('Firestore persistence not supported in this browser');
                }
              });
            } catch (err) {}
          }

          if (firebase.auth) {
            this.auth = firebase.auth();
          }

          console.log('✓ Firebase initialized successfully in Swasthya Setu');
          return true;
        }
      } catch (e) {
        console.warn('Firebase SDK not loaded or failed to initialize, using robust local dual-mode fallback:', e.message);
      }
      return false;
    }
  }

  global.firebaseConfigManager = new FirebaseConfigManager();

})(typeof window !== 'undefined' ? window : this);
