/**
 * =============================================================================
 * SWASTHYA SETU — AI HEALTHCARE TRIAGE SERVICE
 * Orchestration, Safety Guardrails, Session Management, Cost & Privacy Controls
 * =============================================================================
 */

'use strict';

const { SafetyEngine } = require('./safety-engine');
const { createAIProvider } = require('./provider');
const TriageStorage = require('./storage');

class TriageService {
  constructor(supabaseClient, config, auditService = null) {
    this.config = config;
    this.auditService = auditService;
    this.storage = new TriageStorage(supabaseClient);
    this.provider = createAIProvider(config);
  }

  /**
   * Main entrypoint for processing a patient's triage message
   */
  async processMessage({ message, conversationId = null, language = 'en', patientContext = {}, user }) {
    // 1. Authorization check
    if (!user || (!user.id && !user.patient_id)) {
      const err = new Error('Patient authentication required');
      err.code = 'UNAUTHORIZED';
      err.statusCode = 401;
      throw err;
    }

    const patientId = user.patient_id || user.id;

    // 2. Input validation
    if (!message || typeof message !== 'string' || !message.trim()) {
      const err = new Error('Message cannot be empty');
      err.code = 'INVALID_INPUT';
      err.statusCode = 400;
      throw err;
    }

    if (message.length > 1000) {
      const err = new Error('Message exceeds maximum limit of 1000 characters');
      err.code = 'MESSAGE_TOO_LONG';
      err.statusCode = 400;
      throw err;
    }

    // 3. Sanitization & Prompt Injection Neutralization
    const { sanitized, injectionDetected } = SafetyEngine.sanitizeInput(message);
    if (!sanitized) {
      const err = new Error('Message contains invalid or empty characters');
      err.code = 'INVALID_INPUT';
      err.statusCode = 400;
      throw err;
    }

    // 4. Deterministic Emergency Red Flag Detection
    const emergencyCheck = SafetyEngine.checkEmergencyRedFlags(sanitized);

    // 5. Session & Storage Preparation
    const conv = await this.storage.getOrCreateConversation(conversationId, patientId, sanitized.slice(0, 50));
    const activeConvId = conv.id;

    // Store incoming user message
    await this.storage.appendMessage({
      conversationId: activeConvId,
      patientId,
      sender: 'patient',
      content: sanitized
    });

    // 6. Safe Context Filtering (Strictly no Aadhaar/ABHA tokens/full phone)
    const safeContext = {
      age: patientContext.age || user.age || null,
      gender: patientContext.gender || user.gender || null,
      chronicConditions: Array.isArray(patientContext.chronicConditions) ? patientContext.chronicConditions : []
    };

    // 7. Retrieve recent history for context
    const recentHistory = await this.storage.getMessages(activeConvId, patientId, 6);

    // 8. AI Provider Inference (with automatic Sandbox fallback inside provider)
    let triageResult = null;
    try {
      triageResult = await this.provider.generateTriage({
        message: sanitized,
        history: recentHistory,
        patientContext: safeContext,
        language: ['hi', 'te', 'en'].includes(language) ? language : 'en',
        emergencyMatch: emergencyCheck.isEmergency ? emergencyCheck.match : null
      });
    } catch (err) {
      console.warn('[TriageService] Inference exception, using safety engine fallback:', err.message);
      // Fallback
      triageResult = {
        triageLevel: emergencyCheck.isEmergency ? 'EMERGENCY' : 'MODERATE',
        summary: 'Clinical triage guidance generated under resilient fallback mode.',
        possibleCauses: ['Symptom evaluation requires clinical observation'],
        followUpQuestions: ['How long have you felt this symptom?'],
        recommendedActions: ['Rest, stay hydrated, and observe vital signs.'],
        redFlags: ['Sudden worsening of symptoms or high fever'],
        specialist: 'General Physician / Community Health Centre (CHC)',
        emergencyNotice: emergencyCheck.isEmergency ? SafetyEngine.getEmergencyNotice(emergencyCheck.match, language) : null,
        disclaimer: SafetyEngine.getDisclaimer(language),
        message: '### 🩺 Health Guidance\n\nPlease rest and observe your symptoms. If severe, consult your local doctor.'
      };
    }

    // 9. Post-Inference Guardrails & Deterministic Emergency Enforcement
    if (emergencyCheck.isEmergency) {
      triageResult.triageLevel = 'EMERGENCY';
      triageResult.emergencyNotice = SafetyEngine.getEmergencyNotice(emergencyCheck.match, language);
    }

    triageResult.disclaimer = SafetyEngine.getDisclaimer(language);
    triageResult.message = SafetyEngine.enforceResponseGuardrails(triageResult.message);

    // 10. Persist Assistant Response
    await this.storage.appendMessage({
      conversationId: activeConvId,
      patientId,
      sender: 'assistant',
      content: triageResult.message,
      structuredPayload: triageResult,
      triageLevel: triageResult.triageLevel
    });

    // 11. Optional Audit Log (authenticated patients only)
    if (this.auditService && !user.isGuest) {
      try {
        await this.auditService.log({
          actor_id: patientId,
          actor_type: 'patient',
          action: 'AI_TRIAGE_QUERY',
          resource_type: 'ai_triage',
          resource_id: activeConvId,
          details: {
            triageLevel: triageResult.triageLevel,
            isEmergency: emergencyCheck.isEmergency,
            injectionDetected
          }
        });
      } catch (e) {}
    }

    return {
      success: true,
      conversationId: activeConvId,
      ...triageResult
    };
  }

  /**
   * Retrieves message history for a conversation with authorization
   */
  async getHistory(conversationId, user) {
    if (!user || (!user.id && !user.patient_id)) {
      const err = new Error('Authentication required');
      err.code = 'UNAUTHORIZED';
      err.statusCode = 401;
      throw err;
    }
    const patientId = user.patient_id || user.id;
    const messages = await this.storage.getMessages(conversationId, patientId, 20);
    return {
      success: true,
      conversationId,
      messages
    };
  }

  /**
   * Clears conversation history
   */
  async clearConversation(conversationId, user) {
    if (!user || (!user.id && !user.patient_id)) {
      const err = new Error('Authentication required');
      err.code = 'UNAUTHORIZED';
      err.statusCode = 401;
      throw err;
    }
    const patientId = user.patient_id || user.id;
    await this.storage.clearConversation(conversationId, patientId);
    return {
      success: true,
      message: 'Conversation cleared successfully'
    };
  }
}

module.exports = TriageService;
