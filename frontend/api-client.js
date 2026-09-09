/**
 * =========================================================
 * SWASTHYA SETU — CLIENT-SIDE API CLIENT (SwasthyaAPIClient)
 * Central HTTP Gateway to Backend Identity & ABDM/UIDAI Services
 * =========================================================
 */

(function () {
  'use strict';

  class SwasthyaAPIClient {
    constructor(options = {}) {
      // Determine base URL: environment or localhost:5000 / relative /api
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      this.baseUrl = options.baseUrl || (isLocalhost ? 'http://localhost:5000/api' : '/api');
      this.tokenKey = 'swasthya_auth_token';
      this.token = localStorage.getItem(this.tokenKey) || null;
    }

    setToken(token) {
      this.token = token;
      if (token) {
        localStorage.setItem(this.tokenKey, token);
      } else {
        localStorage.removeItem(this.tokenKey);
      }
    }

    getToken() {
      if (!this.token) {
        this.token = localStorage.getItem(this.tokenKey);
      }
      return this.token;
    }

    clearToken() {
      this.token = null;
      localStorage.removeItem(this.tokenKey);
    }

    async _request(endpoint, options = {}) {
      const url = `${this.baseUrl}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      };

      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const fetchOptions = {
        ...options,
        headers
      };

      if (options.body && typeof options.body === 'object') {
        fetchOptions.body = JSON.stringify(options.body);
      }

      try {
        const response = await fetch(url, fetchOptions);
        let data = null;
        const text = await response.text();
        
        try {
          data = text ? JSON.parse(text) : {};
        } catch (jsonErr) {
          if (!response.ok) {
            console.warn(`[APIClient] Server returned non-JSON error (${response.status}):`, text.slice(0, 150));
            throw new Error(`Server temporarily unavailable (${response.status}). Please check Vercel environment variables or try again.`);
          }
          data = { success: true, message: text };
        }

        if (!response.ok) {
          throw new Error((data && data.error) || `HTTP error ${response.status}`);
        }

        return data;
      } catch (err) {
        // Enhance network errors
        if (err.name === 'TypeError' && err.message.includes('fetch')) {
          console.warn(`[APIClient] Backend unreachable at ${url}. Operating with client-side fallback.`);
          throw new Error('Backend server is currently offline. Running in local resilient mode.');
        }
        throw err;
      }
    }

    /* =========================================================
     * AUTHENTICATION ENDPOINTS
     * ========================================================= */

    async register(patientData) {
      const res = await this._request('/auth/register', {
        method: 'POST',
        body: patientData
      });
      if (res.token) {
        this.setToken(res.token);
      }
      return res;
    }

    async login(identifier, password) {
      const res = await this._request('/auth/login', {
        method: 'POST',
        body: { identifier, password }
      });
      if (res.token) {
        this.setToken(res.token);
      }
      return res;
    }

    async requestOtp(mobile, purpose = 'MOBILE_VERIFICATION') {
      return this.sendOtp(mobile, purpose);
    }

    async sendOtp(mobile, purpose = 'MOBILE_VERIFICATION') {
      return this._request('/auth/mobile/send-otp', {
        method: 'POST',
        body: { mobile, purpose }
      });
    }

    async verifyOtp(mobile, otp, challengeId = null, purpose = 'MOBILE_VERIFICATION') {
      return this._request('/auth/mobile/verify-otp', {
        method: 'POST',
        body: { mobile, otp, challengeId, purpose }
      });
    }

    async resendOtp(challengeId, mobile) {
      return this._request('/auth/mobile/resend-otp', {
        method: 'POST',
        body: { challengeId, mobile }
      });
    }

    async forgotPasswordSendOtp(identifier) {
      return this._request('/auth/forgot-password/send-otp', {
        method: 'POST',
        body: { identifier }
      });
    }

    async forgotPasswordVerifyOtp(mobile, otp, challengeId) {
      return this._request('/auth/forgot-password/verify-otp', {
        method: 'POST',
        body: { mobile, otp, challengeId }
      });
    }

    async resetPassword(resetToken, newPassword) {
      return this._request('/auth/forgot-password/reset', {
        method: 'POST',
        body: { resetToken, newPassword }
      });
    }

    /* =========================================================
     * PATIENT PROFILE & ADDRESS ENDPOINTS
     * ========================================================= */

    async getPatientProfile() {
      return this._request('/patients/me', {
        method: 'GET'
      });
    }

    async updateAddress(addressData) {
      return this._request('/patients/me/address', {
        method: 'PATCH',
        body: addressData
      });
    }

    /* =========================================================
     * IDENTITY VERIFICATION & LINKING ENDPOINTS
     * ========================================================= */

    async verifyMobile() {
      return this._request('/identity/verify-mobile', {
        method: 'POST'
      });
    }

    async confirmMobile(otp) {
      return this._request('/identity/confirm-mobile', {
        method: 'POST',
        body: { otp }
      });
    }

    async initiateABHA(abhaIdentifier) {
      return this._request('/identity/initiate-abha', {
        method: 'POST',
        body: { abhaIdentifier }
      });
    }

    async verifyABHA(txnId, otp) {
      return this._request('/identity/verify-abha', {
        method: 'POST',
        body: { txnId, otp }
      });
    }

    async initiateAadhaar(aadhaarNumber, consentGranted = true) {
      return this._request('/identity/initiate-aadhaar', {
        method: 'POST',
        body: { aadhaarNumber, consentGranted }
      });
    }

    async verifyAadhaar(txnId, otp) {
      return this._request('/identity/verify-aadhaar', {
        method: 'POST',
        body: { txnId, otp }
      });
    }

    /* =========================================================
     * PATIENT PROFILE & ADDRESS
     * ========================================================= */

    async getProfile() {
      return this._request('/patients/me', {
        method: 'GET'
      });
    }

    async updateAddress(addressData) {
      return this._request('/patients/me/address', {
        method: 'PATCH',
        body: addressData
      });
    }
  }

  // Expose globally to window
  window.SwasthyaAPIClient = SwasthyaAPIClient;
  window.swasthyaAPI = new SwasthyaAPIClient();
})();
