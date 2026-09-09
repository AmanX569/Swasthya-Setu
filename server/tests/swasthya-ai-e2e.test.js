/**
 * End-to-End Test for Swasthya AI Health Triage
 */
'use strict';

const assert = require('assert');
const http = require('http');
const express = require('express');
const config = require('../config');
const TriageService = require('../services/ai-triage/triage-service');
const createAiTriageRouter = require('../routes/ai-triage');

async function runE2ETest() {
  console.log('--- RUNNING SWASTHYA AI END-TO-END HTTP INTEGRATION TEST ---');
  
  const triageService = new TriageService(null, config);
  const app = express();
  app.use(express.json());
  app.use('/api/ai/triage', createAiTriageRouter({ triageService }));

  const server = app.listen(0);
  const port = server.address().port;
  console.log('Test server listening on port', port);

  try {
    // 1. Test first turn as guest
    console.log('[E2E 1] Sending Turn 1 (Fever query) as Guest Citizen...');
    const postData1 = JSON.stringify({
      message: 'I have a mild fever since yesterday and slight sore throat',
      language: 'en'
    });

    const res1 = await makeRequest(port, '/api/ai/triage/chat', postData1);
    assert.strictEqual(res1.status, 200, 'HTTP status must be 200');
    assert.strictEqual(res1.body.success, true, 'Response success must be true');
    assert(res1.body.conversationId, 'Must return conversationId');
    assert(res1.body.message, 'Must return message');
    assert(res1.body.triageLevel, 'Must return triageLevel');
    assert(Array.isArray(res1.body.followUpQuestions), 'Must return followUpQuestions array');
    console.log('✓ Turn 1 Success! Triage Level:', res1.body.triageLevel);
    console.log('  Conversation ID:', res1.body.conversationId);

    // 2. Test second turn preserving conversationId
    console.log('[E2E 2] Sending Turn 2 preserving conversationId...');
    const convId = res1.body.conversationId;
    const postData2 = JSON.stringify({
      conversationId: convId,
      message: 'My temperature was 100.4 F and it started after rain',
      language: 'en'
    });

    const res2 = await makeRequest(port, '/api/ai/triage/chat', postData2);
    assert.strictEqual(res2.status, 200);
    assert.strictEqual(res2.body.success, true);
    assert.strictEqual(res2.body.conversationId, convId, 'Must maintain identical conversationId');
    console.log('✓ Turn 2 Success! Context preserved across turns.');

    // 3. Test Emergency Override via HTTP
    console.log('[E2E 3] Testing Chest Pain Emergency Override via HTTP...');
    const emergencyData = JSON.stringify({
      message: 'Severe crushing chest pain radiating to left arm and jaw',
      language: 'en'
    });
    const res3 = await makeRequest(port, '/api/ai/triage/chat', emergencyData);
    assert.strictEqual(res3.status, 200);
    assert.strictEqual(res3.body.triageLevel, 'EMERGENCY');
    assert(res3.body.emergencyNotice && res3.body.emergencyNotice.includes('108'), 'Must include 108 emergency notice');
    console.log('✓ Turn 3 Emergency Override Success! 108 Ambulance alert active.');

    // 4. Test Invalid empty input
    console.log('[E2E 4] Testing Empty message handling...');
    const emptyData = JSON.stringify({ message: '   ' });
    const res4 = await makeRequest(port, '/api/ai/triage/chat', emptyData);
    assert.strictEqual(res4.status, 400, 'Empty message must return 400 Bad Request');
    console.log('✓ Empty message correctly rejected with 400.');

    console.log('\n======================================================');
    console.log('✅ ALL SWASTHYA AI E2E INTEGRATION TESTS PASSED!');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

function makeRequest(port, path, data, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: port,
      path: path,
      method: 'POST',
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }, headers)
    }, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(raw) });
        } catch (e) {
          resolve({ status: res.statusCode, body: raw });
        }
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

runE2ETest().catch(err => {
  console.error('❌ E2E TEST FAILED:', err);
  process.exit(1);
});
