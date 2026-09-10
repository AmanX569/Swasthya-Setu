/**
 * =============================================================================
 * SWASTHYA SETU — AI CHAT PRIVACY & RBAC ISOLATION TEST SUITE
 * Validates:
 * 1. Cross-user isolation (Patient A vs Patient B, Doctors, ASHA, Admins)
 * 2. Anti-IDOR: Rejects unauthorized conversation access and message injection with 403
 * 3. List conversations: Users only see their own conversations
 * 4. New Chat: Clean context creation scoped to authenticated user
 * 5. Clear Chat: Atomic deletion of current conversation by owner only; rejects cross-user deletes
 * 6. Live AI triage integrity: Verifies triage flow continues to work seamlessly
 * =============================================================================
 */

'use strict';

const http = require('http');
const assert = require('assert');
const { app } = require('../app');
const { generateToken } = require('../middleware/auth');

function makeRequest(port, method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const postData = body ? JSON.stringify(body) : '';
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    if (postData) {
      reqHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request({
      hostname: '127.0.0.1',
      port,
      path,
      method,
      headers: reqHeaders,
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, headers: res.headers, body: json, raw: data });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: null, raw: data });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (postData) req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('\n======================================================');
  console.log(' SWASTHYA SETU — AI CHAT PRIVACY & RBAC TEST SUITE');
  console.log('======================================================\n');

  const server = http.createServer(app);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  console.log(`[Test Server] Listening on http://127.0.0.1:${port}\n`);

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      process.stdout.write(`  • ${name} ... `);
      await fn();
      console.log('✅ PASSED');
      passed++;
    } catch (err) {
      console.log('❌ FAILED');
      console.error(`    Error: ${err.message}`);
      failed++;
    }
  }

  // Setup test tokens
  const patientAToken = generateToken({ id: 'USR-PAT-001', role: 'patient', name: 'Ramesh Kumar' });
  const patientBToken = generateToken({ id: 'USR-PAT-002', role: 'patient', name: 'Suresh Verma' });
  const doctorToken   = generateToken({ id: 'DOC-101', role: 'doctor', name: 'Dr. Priya Sharma' });
  const ashaToken     = generateToken({ id: 'ASH-201', role: 'worker', name: 'Lakshmi Didi' });
  const adminToken    = generateToken({ id: 'ADM-7856', role: 'admin', name: 'Aman Yadav' });

  let conversationA = null;
  let conversationB = null;

  try {
    // -------------------------------------------------------------------------
    // TEST 1: Patient A creates a new conversation
    // -------------------------------------------------------------------------
    await test('Patient A can create a private conversation context', async () => {
      const res = await makeRequest(port, 'POST', '/api/ai/triage/conversations', {
        title: 'Patient A Initial Consultation'
      }, {
        'Authorization': `Bearer ${patientAToken}`
      });

      assert.strictEqual(res.status, 201, `Expected 201, got ${res.status}`);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.conversation && res.body.conversation.id);
      assert.strictEqual(res.body.conversation.owner_user_id, 'USR-PAT-001');
      conversationA = res.body.conversation.id;
    });

    // -------------------------------------------------------------------------
    // TEST 2: Patient A sends a message in conversation A
    // -------------------------------------------------------------------------
    await test('Patient A can send a message and receive real triage response', async () => {
      const res = await makeRequest(port, 'POST', '/api/ai/triage/chat', {
        conversationId: conversationA,
        message: 'hi, I have had a mild headache since morning'
      }, {
        'Authorization': `Bearer ${patientAToken}`
      });

      assert.strictEqual(res.status, 200, `Expected 200, got ${res.status}`);
      assert.strictEqual(res.body.success, true);
      assert.ok(res.body.reply || res.body.message, 'Expected AI reply');
      assert.strictEqual(res.body.conversationId, conversationA);
    });

    // -------------------------------------------------------------------------
    // TEST 3: Patient A retrieves own conversation history
    // -------------------------------------------------------------------------
    await test('Patient A can retrieve own conversation history (200 OK)', async () => {
      const res = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${patientAToken}`
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.ok(Array.isArray(res.body.messages));
      assert.ok(res.body.messages.length >= 2, 'Expected at least user and assistant message');
    });

    // -------------------------------------------------------------------------
    // TEST 4: Anti-IDOR - Patient B cannot access Patient A conversation
    // -------------------------------------------------------------------------
    await test('Anti-IDOR: Patient B cannot access Patient A conversation (403 Forbidden)', async () => {
      const res = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${patientBToken}`
      });

      assert.strictEqual(res.status, 403, `Expected 403 Forbidden, got ${res.status}`);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.code === 'FORBIDDEN' || res.body.code === 'UNAUTHORIZED_CONVERSATION_ACCESS');
    });

    // -------------------------------------------------------------------------
    // TEST 5: Privacy - Doctor cannot access Patient A private AI conversation
    // -------------------------------------------------------------------------
    await test('Privacy: Doctor cannot access Patient A conversation (403 Forbidden)', async () => {
      const res = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${doctorToken}`
      });

      assert.strictEqual(res.status, 403, `Expected 403 Forbidden, got ${res.status}`);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.code === 'FORBIDDEN' || res.body.code === 'UNAUTHORIZED_CONVERSATION_ACCESS');
    });

    // -------------------------------------------------------------------------
    // TEST 6: Privacy - ASHA worker cannot access Patient A conversation
    // -------------------------------------------------------------------------
    await test('Privacy: ASHA worker cannot access Patient A conversation (403 Forbidden)', async () => {
      const res = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${ashaToken}`
      });

      assert.strictEqual(res.status, 403, `Expected 403 Forbidden, got ${res.status}`);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.code === 'FORBIDDEN' || res.body.code === 'UNAUTHORIZED_CONVERSATION_ACCESS');
    });

    // -------------------------------------------------------------------------
    // TEST 7: Privacy - Admin cannot access Patient A private AI conversation
    // -------------------------------------------------------------------------
    await test('Privacy: Admin cannot access Patient A conversation (403 Forbidden)', async () => {
      const res = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${adminToken}`
      });

      assert.strictEqual(res.status, 403, `Expected 403 Forbidden, got ${res.status}`);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.code === 'FORBIDDEN' || res.body.code === 'UNAUTHORIZED_CONVERSATION_ACCESS');
    });

    // -------------------------------------------------------------------------
    // TEST 8: Anti-Injection - Patient B cannot post messages to Patient A conversation
    // -------------------------------------------------------------------------
    await test('Anti-Injection: Patient B cannot send messages to Patient A conversation (403 Forbidden)', async () => {
      const res = await makeRequest(port, 'POST', '/api/ai/triage/chat', {
        conversationId: conversationA,
        message: 'Malicious injected message from Patient B'
      }, {
        'Authorization': `Bearer ${patientBToken}`
      });

      assert.strictEqual(res.status, 403, `Expected 403 Forbidden, got ${res.status}`);
      assert.strictEqual(res.body.success, false);
      assert.ok(res.body.code === 'FORBIDDEN' || res.body.code === 'UNAUTHORIZED_CONVERSATION_ACCESS');
    });

    // -------------------------------------------------------------------------
    // TEST 9: Header-based session auth privacy verification
    // -------------------------------------------------------------------------
    await test('Header-based session auth enforces strict isolation between users', async () => {
      // Patient A using headers
      const resA = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'x-swasthya-user-id': 'USR-PAT-001',
        'x-swasthya-user-role': 'patient'
      });
      assert.strictEqual(resA.status, 200);

      // Doctor using headers attempting to access Patient A conversation
      const resDoc = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'x-swasthya-user-id': 'DOC-101',
        'x-swasthya-user-role': 'doctor'
      });
      assert.strictEqual(resDoc.status, 403);
    });

    // -------------------------------------------------------------------------
    // TEST 10: Conversation listing is strictly user-scoped
    // -------------------------------------------------------------------------
    await test('Conversation list endpoint returns only current user conversations', async () => {
      // Patient B creates own conversation
      const resB = await makeRequest(port, 'POST', '/api/ai/triage/conversations', {
        title: 'Patient B Checkup'
      }, {
        'Authorization': `Bearer ${patientBToken}`
      });
      assert.strictEqual(resB.status, 201);
      conversationB = resB.body.conversation.id;

      // Patient A lists conversations
      const listA = await makeRequest(port, 'GET', '/api/ai/triage/conversations', null, {
        'Authorization': `Bearer ${patientAToken}`
      });
      assert.strictEqual(listA.status, 200);
      assert.ok(listA.body.conversations.some(c => c.id === conversationA));
      assert.ok(!listA.body.conversations.some(c => c.id === conversationB), 'Patient A must NOT see conversation B');

      // Doctor lists conversations
      const listDoc = await makeRequest(port, 'GET', '/api/ai/triage/conversations', null, {
        'Authorization': `Bearer ${doctorToken}`
      });
      assert.strictEqual(listDoc.status, 200);
      assert.ok(!listDoc.body.conversations.some(c => c.id === conversationA), 'Doctor must NOT see Patient A conversation');
      assert.ok(!listDoc.body.conversations.some(c => c.id === conversationB), 'Doctor must NOT see Patient B conversation');
    });

    // -------------------------------------------------------------------------
    // TEST 11: Clear Chat - Cross-user deletion is forbidden
    // -------------------------------------------------------------------------
    await test('Anti-Deletion: Patient B cannot delete Patient A conversation (403 Forbidden)', async () => {
      const res = await makeRequest(port, 'DELETE', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${patientBToken}`
      });

      assert.strictEqual(res.status, 403);
      assert.ok(res.body.code === 'FORBIDDEN' || res.body.code === 'UNAUTHORIZED_CONVERSATION_ACCESS');
    });

    // -------------------------------------------------------------------------
    // TEST 12: Clear Chat - Owner can delete own conversation atomically
    // -------------------------------------------------------------------------
    await test('Owner can delete own conversation atomically (200 OK & messages cleared)', async () => {
      const res = await makeRequest(port, 'DELETE', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${patientAToken}`
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);

      // Verify conversation A is now gone
      const getRes = await makeRequest(port, 'GET', `/api/ai/triage/conversations/${conversationA}`, null, {
        'Authorization': `Bearer ${patientAToken}`
      });
      assert.strictEqual(getRes.status, 404);
    });

    // -------------------------------------------------------------------------
    // TEST 13: Emergency override remains deterministic and immediate
    // -------------------------------------------------------------------------
    await test('Clinical Safety: Emergency red-flag triggers immediate RED emergency triage', async () => {
      const res = await makeRequest(port, 'POST', '/api/ai/triage/chat', {
        message: 'Severe crushing chest pain radiating to my left arm, sweating heavily'
      }, {
        'Authorization': `Bearer ${patientBToken}`
      });

      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.success, true);
      assert.strictEqual(res.body.triageLevel, 'EMERGENCY');
      const text = res.body.reply || res.body.message || (res.body.emergencyNotice || '');
      assert.ok(text.includes('108') || text.includes('EMERGENCY') || text.includes('immediate') || text.includes('Critical'));
    });

  } finally {
    server.close();
  }

  console.log('\n======================================================');
  console.log(` RESULTS: ${passed} Passed, ${failed} Failed`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test runner fatal error:', err);
  process.exit(1);
});
