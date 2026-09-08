/**
 * =========================================================
 * SWASTHYA SETU — SANDBOX SMS PROVIDER
 * Safe offline / developer SMS gateway simulator
 * =========================================================
 */

'use strict';

class SandboxSMSProvider {
  constructor() {
    this.name = 'Sandbox (Console Emulator)';
  }

  /**
   * Dispatches simulated SMS to console without external network calls
   * @param {string} mobile - 10-digit mobile
   * @param {string} message - Message text containing OTP
   */
  async send(mobile, message) {
    const timestamp = new Date().toISOString();
    const messageId = `SM-SANDBOX-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    console.log('\n======================================================');
    console.log(`[SANDBOX SMS GATEWAY] Dispatch Event: ${timestamp}`);
    console.log(`To: +91-${mobile}`);
    console.log(`Message ID: ${messageId}`);
    console.log(`Content: "${message}"`);
    console.log('[SANDBOX ONLY] No real carrier SMS dispatched. Test code printed above.');
    console.log('======================================================\n');

    return {
      success: true,
      messageId,
      provider: 'sandbox',
      to: `+91${mobile}`,
      timestamp
    };
  }
}

module.exports = SandboxSMSProvider;
