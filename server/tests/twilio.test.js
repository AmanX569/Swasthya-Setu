/**
 * =========================================================
 * SWASTHYA SETU — TWILIO SMS & OTP INTEGRATION TEST SUITE
 * =========================================================
 */

'use strict';

const assert = require('assert');
const TwilioSMSProvider = require('../integrations/sms/twilio-provider');
const SMSService = require('../integrations/sms');
const OTPService = require('../services/otp-service');

let passedTests = 0;
let totalTests = 0;

function it(name, fn) {
  totalTests++;
  try {
    const result = fn();
    if (result && typeof result.then === 'function') {
      return result.then(() => {
        passedTests++;
        console.log(`  ✓ ${name}`);
      }).catch(err => {
        console.error(`  ✗ ${name}`);
        console.error(`    ${err.message}`);
        throw err;
      });
    } else {
      passedTests++;
      console.log(`  ✓ ${name}`);
    }
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    ${err.message}`);
    throw err;
  }
}

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 RUNNING SWASTHYA SETU TWILIO SMS & OTP TEST SUITE');
  console.log('======================================================\n');

  // -----------------------------------------------------------------
  // 1. Provider Initialization & Validation
  // -----------------------------------------------------------------
  console.log('--- 1. Constructor Validation ---');

  it('Fails loudly when Account SID or Auth Token is missing', () => {
    assert.throws(
      () => new TwilioSMSProvider({ accountSid: '', authToken: 'sec' }),
      /TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required/
    );
    assert.throws(
      () => new TwilioSMSProvider({ accountSid: 'AC123', authToken: '' }),
      /TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required/
    );
  });

  it('Fails loudly when neither TWILIO_PHONE_NUMBER nor TWILIO_VERIFY_SERVICE_SID is provided', () => {
    assert.throws(
      () => new TwilioSMSProvider({ accountSid: 'AC123', authToken: 'token123' }),
      /Either TWILIO_PHONE_NUMBER or TWILIO_VERIFY_SERVICE_SID must be provided/
    );
  });

  it('Instantiates successfully with standard Messages API configuration', () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_TEST_ACCOUNT_SID',
      authToken: 'test_auth_token_secret',
      fromNumber: '+12055550199'
    });
    assert.strictEqual(provider.accountSid, 'AC_TEST_ACCOUNT_SID');
    assert.strictEqual(provider.fromNumber, '+12055550199');
    assert.strictEqual(provider.verifyServiceSid, '');
    assert.strictEqual(provider.name, 'Twilio SMS Gateway');
  });

  it('Instantiates successfully with Twilio Verify Service SID', () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_TEST_ACCOUNT_SID',
      authToken: 'test_auth_token_secret',
      verifyServiceSid: 'VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    });
    assert.strictEqual(provider.verifyServiceSid, 'VAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  });

  // -----------------------------------------------------------------
  // 2. Phone Formatting & Basic Auth
  // -----------------------------------------------------------------
  console.log('\n--- 2. Phone Formatting & Basic Auth ---');

  it('Normalizes Indian 10-digit mobile numbers to E.164 (+91...) format', () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC123',
      authToken: 'token123',
      fromNumber: '+12055550199'
    });

    assert.strictEqual(provider.toE164('9876543210'), '+919876543210');
    assert.strictEqual(provider.toE164('+919876543210'), '+919876543210');
    assert.strictEqual(provider.toE164('09876543210'), '+919876543210');
    assert.strictEqual(provider.toE164('+14155552671'), '+14155552671');
  });

  it('Generates RFC-compliant HTTP Basic Auth authorization header', () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_MOCK_USER',
      authToken: 'SECRET_PASS_123',
      fromNumber: '+12055550199'
    });

    const header = provider._getAuthHeader();
    const expectedBase64 = Buffer.from('AC_MOCK_USER:SECRET_PASS_123').toString('base64');
    assert.strictEqual(header, `Basic ${expectedBase64}`);
  });

  // -----------------------------------------------------------------
  // 3. Twilio Messages API OTP Lifecycle
  // -----------------------------------------------------------------
  console.log('\n--- 3. Twilio Messages API OTP Lifecycle ---');

  await it('Dispatches OTP via mock Twilio fetch and stores hash challenge', async () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_TEST_ACCOUNT',
      authToken: 'test_auth_secret_9999',
      fromNumber: '+12055550199'
    });

    let interceptedUrl = null;
    let interceptedBody = null;

    // Mock provider's internal HTTP requester
    provider._request = async (url, body) => {
      interceptedUrl = url;
      interceptedBody = body;
      return {
        sid: 'SM_TEST_MESSAGE_SID_001',
        status: 'queued',
        to: body.To
      };
    };

    const sendRes = await provider.sendOtp('9876543210', { otp: '654321' });

    assert.strictEqual(sendRes.success, true);
    assert.strictEqual(sendRes.providerRequestId, 'SM_TEST_MESSAGE_SID_001');
    assert.strictEqual(sendRes.provider, 'twilio');
    assert(interceptedUrl.includes('/Accounts/AC_TEST_ACCOUNT/Messages.json'));
    assert.strictEqual(interceptedBody.To, '+919876543210');
    assert.strictEqual(interceptedBody.From, '+12055550199');
    assert(interceptedBody.Body.includes('654321'));

    // Verify correct OTP
    const verifySuccess = await provider.verifyOtp('9876543210', '654321');
    assert.strictEqual(verifySuccess.success, true);
    assert.strictEqual(verifySuccess.message, 'OTP verified successfully.');

    // Verify replay is rejected
    const replayRes = await provider.verifyOtp('9876543210', '654321');
    assert.strictEqual(replayRes.success, false);
    assert(replayRes.error.includes('expired or session not found'));
  });

  await it('Enforces max attempt limits and protects against brute-force attacks', async () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_TEST_ACCOUNT',
      authToken: 'test_auth_secret_9999',
      fromNumber: '+12055550199'
    });

    provider._request = async () => ({ sid: 'SM_BRUTE_FORCE_TEST', status: 'queued' });

    await provider.sendOtp('9876543211', { otp: '112233' });

    // Attempt 1: wrong OTP
    const att1 = await provider.verifyOtp('9876543211', '000000');
    assert.strictEqual(att1.success, false);
    assert.strictEqual(att1.remainingAttempts, 4);

    // Attempt 2: wrong OTP
    const att2 = await provider.verifyOtp('9876543211', '000001');
    assert.strictEqual(att2.success, false);
    assert.strictEqual(att2.remainingAttempts, 3);

    // Subsequent failures until exhausted
    await provider.verifyOtp('9876543211', '000002');
    await provider.verifyOtp('9876543211', '000003');
    const att5 = await provider.verifyOtp('9876543211', '000004');
    assert.strictEqual(att5.remainingAttempts, 0);

    // After 5 failed attempts, challenge must be invalidated even if correct OTP is provided
    const att6 = await provider.verifyOtp('9876543211', '112233');
    assert.strictEqual(att6.success, false);
    assert(att6.error.includes('Maximum verification attempts exceeded'));
  });

  await it('Dispatches emergency SOS text via Twilio send()', async () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_TEST_ACCOUNT',
      authToken: 'test_auth_secret_9999',
      fromNumber: '+12055550199'
    });

    let sentBody = null;
    provider._request = async (url, body) => {
      sentBody = body;
      return { sid: 'SM_SOS_DISPATCH_999', status: 'delivered' };
    };

    const sosMessage = 'EMERGENCY 108 SOS ALERT: Patient at Latitude 28.61, Longitude 77.20 requires immediate medical assistance.';
    const res = await provider.send('9876543210', sosMessage);

    assert.strictEqual(res.success, true);
    assert.strictEqual(res.messageId, 'SM_SOS_DISPATCH_999');
    assert.strictEqual(sentBody.To, '+919876543210');
    assert.strictEqual(sentBody.Body, sosMessage);
  });

  // -----------------------------------------------------------------
  // 4. Twilio Verify API Lifecycle
  // -----------------------------------------------------------------
  console.log('\n--- 4. Twilio Verify API Lifecycle ---');

  await it('Dispatches verification request via Twilio Verify v2 API', async () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_VERIFY_ACCOUNT',
      authToken: 'verify_token_secret',
      verifyServiceSid: 'VA1234567890abcdef1234567890abcdef'
    });

    let verifyUrl = null;
    let verifyBody = null;
    provider._request = async (url, body) => {
      verifyUrl = url;
      verifyBody = body;
      return { sid: 'VE_VERIFY_TXN_001', status: 'pending' };
    };

    const sendRes = await provider.sendOtp('9876543212');
    assert.strictEqual(sendRes.success, true);
    assert.strictEqual(sendRes.provider, 'twilio-verify');
    assert(verifyUrl.includes('/v2/Services/VA1234567890abcdef1234567890abcdef/Verifications'));
    assert.strictEqual(verifyBody.To, '+919876543212');
    assert.strictEqual(verifyBody.Channel, 'sms');
  });

  await it('Checks OTP verification status against Twilio Verify v2 API', async () => {
    const provider = new TwilioSMSProvider({
      accountSid: 'AC_VERIFY_ACCOUNT',
      authToken: 'verify_token_secret',
      verifyServiceSid: 'VA1234567890abcdef1234567890abcdef'
    });

    // Mock successful verification
    provider._request = async (url, body) => {
      if (body.Code === '998877') {
        return { status: 'approved', to: body.To };
      }
      return { status: 'canceled', to: body.To };
    };

    const failCheck = await provider.verifyOtp('9876543212', '000000');
    assert.strictEqual(failCheck.success, false);

    const passCheck = await provider.verifyOtp('9876543212', '998877');
    assert.strictEqual(passCheck.success, true);
    assert.strictEqual(passCheck.provider, 'twilio-verify');
  });

  // -----------------------------------------------------------------
  // 5. SMSService Factory & Production Protection
  // -----------------------------------------------------------------
  console.log('\n--- 5. SMSService Integration & Production Safety ---');

  it('SMSService instantiates TwilioSMSProvider when OTP_PROVIDER=twilio', () => {
    const sms = new SMSService({
      env: 'development',
      sms: {
        provider: 'twilio',
        twilio: {
          accountSid: 'AC_TEST_SID',
          authToken: 'test_token',
          fromNumber: '+12055550199'
        }
      }
    });

    assert.strictEqual(sms.providerType, 'twilio');
    assert.strictEqual(sms.provider instanceof TwilioSMSProvider, true);
  });

  it('SMSService throws loud error in production when Twilio configuration is missing', () => {
    assert.throws(() => {
      new SMSService({
        env: 'production',
        sms: {
          provider: 'twilio',
          twilio: {
            accountSid: '',
            authToken: ''
          }
        }
      });
    }, /TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required/);
  });

  // -----------------------------------------------------------------
  // 6. OtpService Challenge State Machine with Twilio
  // -----------------------------------------------------------------
  console.log('\n--- 6. OtpService Integration with Twilio ---');

  await it('OtpService executes complete send & verify cycle with Twilio provider', async () => {
    const table = [];
    const mockSupabase = {
      _table: table,
      from: (tableName) => {
        let filters = [];
        let pendingUpdate = null;

        const chain = {
          select: () => chain,
          insert: async (row) => {
            const inserted = { id: 'row_' + (table.length + 1), ...row, created_at: new Date().toISOString() };
            table.push(inserted);
            return { data: inserted, error: null };
          },
          update: (updates) => {
            pendingUpdate = updates;
            return chain;
          },
          eq: (col, val) => {
            filters.push((r) => r[col] === val);
            return chain;
          },
          gte: (col, val) => {
            filters.push((r) => r[col] >= val);
            return chain;
          },
          order: () => chain,
          limit: () => chain,
          maybeSingle: async () => {
            const matched = table.filter(r => filters.every(f => f(r)));
            return { data: matched[0] || null, error: null };
          },
          then: (resolve) => {
            let matched = table.filter(r => filters.every(f => f(r)));
            if (pendingUpdate) {
              matched.forEach(r => Object.assign(r, pendingUpdate));
            }
            resolve({ data: matched, error: null });
          }
        };
        return chain;
      }
    };

    const twilioProvider = new TwilioSMSProvider({
      accountSid: 'AC_TEST_OTP_SERVICE',
      authToken: 'test_otp_secret_token',
      fromNumber: '+12055550199'
    });

    let sentOtpCode = null;
    twilioProvider._request = async (url, body) => {
      const match = body.Body.match(/\b\d{6}\b/);
      if (match) sentOtpCode = match[0];
      return { sid: 'SM_OTPSERVICE_TEST', status: 'queued' };
    };

    const smsService = {
      providerType: 'twilio',
      sendOtp: (m, o) => twilioProvider.sendOtp(m, o),
      verifyOtp: (m, o) => twilioProvider.verifyOtp(m, o),
      retryOtp: (m, o) => twilioProvider.retryOtp(m, o)
    };

    const otpService = new OTPService(mockSupabase, smsService, 'development');

    // 1. Generate & Send
    const sendResult = await otpService.generateAndSend('9876543210', 'PASSWORD_RESET');
    assert.strictEqual(sendResult.success, true);
    assert(sendResult.challengeId.startsWith('CHAL-'));
    assert(sentOtpCode, 'Generated OTP code must have been sent via Twilio');

    // 2. Verify with incorrect code
    const wrongVerify = await otpService.verify('9876543210', '000000', sendResult.challengeId, 'PASSWORD_RESET');
    assert.strictEqual(wrongVerify.success, false);
    assert(wrongVerify.error.includes('Incorrect OTP'));

    // 3. Verify with correct code
    const correctVerify = await otpService.verify('9876543210', sentOtpCode, sendResult.challengeId, 'PASSWORD_RESET');
    assert.strictEqual(correctVerify.success, true);
    assert.strictEqual(correctVerify.verified, true);
    assert(correctVerify.resetToken.startsWith('RST-'), 'Single-use reset token must be generated');
  });

  console.log('\n======================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} / ${totalTests} PASSED`);
  if (passedTests === totalTests) {
    console.log('🎉 ALL TWILIO INTEGRATION TESTS PASSED SUCCESSFULLY!');
  }
  console.log('======================================================\n');
}

runTests().catch(err => {
  console.error('\n❌ TWILIO TEST SUITE FAILED:', err);
  process.exit(1);
});
