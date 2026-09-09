/**
 * ============================================================================
 * SWASTHYA SETU - MSG91 INTEGRATION & OTP AUTOMATED TEST SUITE
 * ============================================================================
 */

const assert = require('assert');
const { normalizeIndianMobile } = require('../utils/phone');
const Msg91Client = require('../integrations/sms/msg91-client');
const Msg91OtpProvider = require('../integrations/sms/msg91-provider');
const SandboxSMSProvider = require('../integrations/sms/sandbox-provider');
const SMSService = require('../integrations/sms/index');
const OTPService = require('../services/otp-service');

let passedTests = 0;
let totalTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
  }
}

async function testAsync(name, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(err);
  }
}

function createMockSupabase() {
  const table = [];
  return {
    _table: table,
    from: (tableName) => {
      let filters = [];
      let pendingUpdate = null;

      const chain = {
        select: (cols) => chain,
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
        gt: (col, val) => {
          filters.push((r) => r[col] > val);
          return chain;
        },
        order: (col, opts) => chain,
        limit: (n) => chain,
        single: async () => {
          const matched = table.filter(r => filters.every(f => f(r)));
          if (matched.length === 0) return { data: null, error: { message: 'Not found' } };
          if (pendingUpdate) {
            Object.assign(matched[0], pendingUpdate);
          }
          return { data: matched[0], error: null };
        },
        maybeSingle: async () => {
          const matched = table.filter(r => filters.every(f => f(r)));
          if (matched.length === 0) return { data: null, error: null };
          if (pendingUpdate) {
            Object.assign(matched[0], pendingUpdate);
          }
          return { data: matched[0], error: null };
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
}

console.log('\n======================================================');
console.log('🧪 RUNNING SWASTHYA SETU MSG91 & OTP TEST SUITE');
console.log('======================================================\n');

// -------------------------------------------------------------
// 1. Phone Normalization Tests
// -------------------------------------------------------------
console.log('--- 1. Phone Normalization (normalizeIndianMobile) ---');

test('Normalizes standard 10-digit mobile number', () => {
  const result = normalizeIndianMobile('9876543210');
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.national, '9876543210');
  assert.strictEqual(result.msg91, '919876543210');
  assert.strictEqual(result.e164, '+919876543210');
  assert.strictEqual(result.masked, '******3210');
});

test('Normalizes +91 prefixed mobile with spaces and dashes', () => {
  const result = normalizeIndianMobile('+91 98765-43210');
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.national, '9876543210');
  assert.strictEqual(result.msg91, '919876543210');
});

test('Normalizes 91 prefixed mobile without plus', () => {
  const result = normalizeIndianMobile('919876543210');
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.national, '9876543210');
  assert.strictEqual(result.msg91, '919876543210');
});

test('Normalizes leading 0 formatted mobile', () => {
  const result = normalizeIndianMobile('09876543210');
  assert.strictEqual(result.valid, true);
  assert.strictEqual(result.national, '9876543210');
  assert.strictEqual(result.msg91, '919876543210');
});

test('Rejects invalid numbers starting with 0-5', () => {
  const r1 = normalizeIndianMobile('1234567890');
  assert.strictEqual(r1.valid, false);
  assert(r1.error.includes('must start with 6, 7, 8, or 9'));

  const r2 = normalizeIndianMobile('5555555555');
  assert.strictEqual(r2.valid, false);
  assert(r2.error.includes('must start with 6, 7, 8, or 9'));
});

test('Rejects numbers with incorrect length', () => {
  const r1 = normalizeIndianMobile('98765');
  assert.strictEqual(r1.valid, false);
  assert(r1.error.includes('valid 10-digit'));

  const r2 = normalizeIndianMobile('987654321012345');
  assert.strictEqual(r2.valid, false);
  assert(r2.error.includes('valid 10-digit'));

  const r3 = normalizeIndianMobile('');
  assert.strictEqual(r3.valid, false);
});

// -------------------------------------------------------------
// 2. MSG91 Client Unit Tests
// -------------------------------------------------------------
console.log('\n--- 2. MSG91 Client & Provider Tests ---');

test('Client constructor sets configuration correctly', () => {
  const client = new Msg91Client({
    authKey: 'test_auth_key_123',
    templateId: 'tpl_otp_001',
    timeoutMs: 9000
  });
  assert.strictEqual(client.authKey, 'test_auth_key_123');
  assert.strictEqual(client.templateId, 'tpl_otp_001');
  assert.strictEqual(client.timeoutMs, 9000);
});

test('Client constructor fails loud when authKey is missing', () => {
  assert.throws(
    () => new Msg91Client({ authKey: '' }),
    /Msg91Client initialization failed: authKey is required/
  );
});

(async () => {
  await testAsync('Msg91OtpProvider normalizes phone before calling client', async () => {
    let capturedMobile = null;
    const mockClient = {
      sendOtp: async (args) => {
        capturedMobile = args.mobile;
        return { success: true, messageId: 'msg_123', provider: 'msg91' };
      },
      verifyOtp: async () => ({ success: true }),
      retryOtp: async () => ({ success: true })
    };

    const provider = new Msg91OtpProvider({ authKey: 'dummy_key', templateId: 'dummy_tpl' });
    provider.client = mockClient;

    const res = await provider.sendOtp('9876543210');
    assert.strictEqual(capturedMobile, '919876543210');
    assert.strictEqual(res.success, true);
  });

  await testAsync('Msg91Client parses successful send response', async () => {
    const originalFetch = global.fetch;
    global.fetch = async (url, options) => {
      assert(url.includes('api/v5/otp'));
      assert.strictEqual(options.method, 'POST');
      assert.strictEqual(options.headers['authkey'], 'valid_key');
      return {
        ok: true,
        status: 200,
        json: async () => ({ type: 'success', message: 'OTP sent successfully', request_id: 'req_9988' })
      };
    };

    try {
      const client = new Msg91Client({ authKey: 'valid_key', templateId: 'tpl_123' });
      const res = await client.sendOtp({ mobile: '919876543210' });
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.providerRequestId, 'req_9988');
    } finally {
      global.fetch = originalFetch;
    }
  });

  await testAsync('Msg91Client parses successful verify response', async () => {
    const originalFetch = global.fetch;
    global.fetch = async (url, options) => {
      assert(url.includes('api/v5/otp/verify'));
      assert(url.includes('otp=654321'));
      assert(url.includes('mobile=919876543210'));
      assert.strictEqual(options.method, 'GET');
      assert.strictEqual(options.headers['authkey'], 'valid_key');
      return {
        ok: true,
        status: 200,
        json: async () => ({ type: 'success', message: 'OTP verified success' })
      };
    };

    try {
      const client = new Msg91Client({ authKey: 'valid_key' });
      const res = await client.verifyOtp({ mobile: '919876543210', otp: '654321' });
      assert.strictEqual(res.success, true);
    } finally {
      global.fetch = originalFetch;
    }
  });

  await testAsync('Msg91Client parses verification failure with safe error mapping', async () => {
    const originalFetch = global.fetch;
    global.fetch = async () => ({
      ok: false,
      status: 400,
      json: async () => ({ type: 'error', message: 'OTP not match' })
    });

    try {
      const client = new Msg91Client({ authKey: 'valid_key' });
      const res = await client.verifyOtp({ mobile: '919876543210', otp: '111111' });
      assert.strictEqual(res.success, false);
      assert.strictEqual(res.error, 'Incorrect OTP. Please check and try again.');
    } finally {
      global.fetch = originalFetch;
    }
  });

  // -------------------------------------------------------------
  // 3. SMS Factory & Fail-Loud Policy
  // -------------------------------------------------------------
  console.log('\n--- 3. SMSService Factory & Fail-Loud Policy ---');

  test('SMSService throws loud error in production when MSG91 credentials missing', () => {
    const origEnv = process.env.NODE_ENV;
    const origProv = process.env.OTP_PROVIDER;
    const origKey = process.env.MSG91_AUTH_KEY;
    const origTpl = process.env.MSG91_OTP_TEMPLATE_ID;

    try {
      process.env.NODE_ENV = 'production';
      process.env.OTP_PROVIDER = 'msg91';
      delete process.env.MSG91_AUTH_KEY;
      delete process.env.MSG91_OTP_TEMPLATE_ID;

      assert.throws(
        () => new SMSService({
          sms: { provider: 'msg91', msg91: { authKey: '', templateId: '' } }
        }),
        /MSG91 provider requires/
      );
    } finally {
      process.env.NODE_ENV = origEnv;
      process.env.OTP_PROVIDER = origProv;
      if (origKey) process.env.MSG91_AUTH_KEY = origKey;
      if (origTpl) process.env.MSG91_OTP_TEMPLATE_ID = origTpl;
    }
  });

  test('SMSService instantiates SandboxSMSProvider when provider is sandbox', () => {
    const svc = new SMSService({ sms: { provider: 'sandbox' } });
    assert.strictEqual(svc.providerType, 'sandbox');
  });

  // -------------------------------------------------------------
  // 4. OtpService State Machine & Challenge Lifecycle
  // -------------------------------------------------------------
  console.log('\n--- 4. OtpService State Machine & Security Lifecycle ---');

  await testAsync('OTPService dispatches challenge and enforces 60s cooldown', async () => {
    const mockSupabase = createMockSupabase();
    const sandbox = new SandboxSMSProvider();
    const otpService = new OTPService(mockSupabase, sandbox, 'development');

    const sendRes1 = await otpService.generateAndSend('9876543210', 'MOBILE_VERIFICATION');

    assert.strictEqual(sendRes1.success, true);
    assert(sendRes1.challengeId.startsWith('CHAL-'));
    assert.strictEqual(sendRes1.cooldownSeconds, 60);

    // Immediate re-send must be blocked by cooldown
    const sendRes2 = await otpService.generateAndSend('9876543210', 'MOBILE_VERIFICATION');
    assert.strictEqual(sendRes2.success, false);
    assert(sendRes2.error.includes('Please wait'));
  });

  await testAsync('OTPService verifies OTP and prevents replay attacks', async () => {
    const mockSupabase = createMockSupabase();
    const sandbox = new SandboxSMSProvider();
    const otpService = new OTPService(mockSupabase, sandbox, 'development');

    const sendRes = await otpService.generateAndSend('9876543211', 'MOBILE_VERIFICATION');

    // Test with wrong OTP
    const wrongRes = await otpService.verify('9876543211', '000000', sendRes.challengeId, 'MOBILE_VERIFICATION');
    assert.strictEqual(wrongRes.success, false);

    // Test with correct OTP (Sandbox accepts 123456)
    const verifyRes = await otpService.verify('9876543211', '123456', sendRes.challengeId, 'MOBILE_VERIFICATION');
    assert.strictEqual(verifyRes.success, true);
    assert.strictEqual(verifyRes.verified, true);

    // Replay attack: verify again with same challenge
    const replayRes = await otpService.verify('9876543211', '123456', sendRes.challengeId, 'MOBILE_VERIFICATION');
    assert.strictEqual(replayRes.success, false);
    assert(replayRes.error.includes('already been completed') || replayRes.error.includes('Invalid'));
  });

  await testAsync('OTPService handles Password Recovery single-use reset token', async () => {
    const mockSupabase = createMockSupabase();
    const sandbox = new SandboxSMSProvider();
    const otpService = new OTPService(mockSupabase, sandbox, 'development');

    const sendRes = await otpService.generateAndSend('9876543212', 'PASSWORD_RESET');

    const verifyRes = await otpService.verify('9876543212', '123456', sendRes.challengeId, 'PASSWORD_RESET');

    assert.strictEqual(verifyRes.success, true);
    assert(verifyRes.resetToken && verifyRes.resetToken.startsWith('RST-'));

    // Validate and consume the reset token
    const tokenRecord = await otpService.validateAndConsumeResetToken(verifyRes.resetToken);
    assert.strictEqual(tokenRecord.valid, true);
    assert.strictEqual(tokenRecord.mobile, '9876543212');

    // Attempt to consume the reset token a second time (MUST FAIL)
    const secondConsume = await otpService.validateAndConsumeResetToken(verifyRes.resetToken);
    assert.strictEqual(secondConsume.valid, false);
    assert(secondConsume.error.includes('already been used') || secondConsume.error.includes('invalid'));
  });

  // -------------------------------------------------------------
  // Test Results Summary
  // -------------------------------------------------------------
  console.log('\n======================================================');
  console.log(`🏁 TEST RESULTS: ${passedTests} / ${totalTests} PASSED`);
  if (passedTests === totalTests) {
    console.log('🎉 ALL 17 TESTS PASSED SUCCESSFULLY!');
  } else {
    console.error(`⚠️ ${totalTests - passedTests} TESTS FAILED!`);
    process.exitCode = 1;
  }
  console.log('======================================================\n');
})();
