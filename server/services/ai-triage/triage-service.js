/**
 * =============================================================================
 * SWASTHYA SETU — AI HEALTHCARE TRIAGE SERVICE
 * Orchestration, Safety Guardrails, Session Management, Cost & Privacy Controls
 * =============================================================================
 */

'use strict';

const { SafetyEngine } = require('./safety-engine');
const { createAIProvider, SandboxHealthProvider } = require('./provider');
const TriageStorage = require('./storage');

class TriageService {
  constructor(supabaseClient, config, auditService = null) {
    this.config = config;
    this.auditService = auditService;
    this.storage = new TriageStorage(supabaseClient);
    this.provider = createAIProvider(config);
  }

  getProvider() {
    if (this.config && this.config.ai && this.config.ai.mockMode === true) {
      return new SandboxHealthProvider();
    }
    return this.provider || createAIProvider(this.config);
  }

  /**
   * Main entrypoint for processing a patient's triage message
   */
  async processMessage({ message, conversationId = null, language = 'en', patientContext = {}, user = null }) {
    // 1. Patient identity (authenticated or guest session)
    let patientId;
    if (user && (user.id || user.patient_id)) {
      patientId = user.patient_id || user.id;
    } else {
      // Support guest citizen sessions without requiring prior login/profile completion
      patientId = conversationId ? `guest_${conversationId}` : `guest_${Date.now().toString(36)}`;
      user = { id: patientId, patient_id: patientId, role: 'guest', name: 'Guest Citizen' };
    }

    // 2. Input validation
    if (!message || typeof message !== 'string' || !message.trim()) {
      const err = new Error('Message cannot be empty');
      err.code = 'INVALID_INPUT';
      err.statusCode = 400;
      throw err;
    }

    if (message.length > 4000) {
      const err = new Error('Message exceeds maximum limit of 4000 characters. Please shorten your message and try again.');
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

    // 8. AI Provider Inference (or Immediate Deterministic Emergency Override)
    let triageResult = null;

    if (emergencyCheck.isEmergency) {
      const emergencyNotice = SafetyEngine.getEmergencyNotice(emergencyCheck.match, language);
      triageResult = {
        triageLevel: 'EMERGENCY',
        summary: `Immediate emergency red-flag detected: ${emergencyCheck.match.title}`,
        possibleCauses: ['Acute cardiovascular, neurological, or trauma emergency'],
        followUpQuestions: [],
        recommendedActions: [
          '🚨 Call 108 (National Ambulance) or 112 immediately without delay.',
          'Keep the patient sitting or half-reclined (do not let them exert or walk).',
          'Loosen tight clothing around neck and waist.',
          'Do not give anything to eat or drink if consciousness is altered.'
        ],
        redFlags: [emergencyCheck.match.reason],
        specialist: 'Emergency Department / Trauma & Critical Care ICU',
        emergencyNotice: emergencyNotice,
        disclaimer: SafetyEngine.getDisclaimer(language),
        message: `### 🚨 Critical Urgency: Emergency Care Required\n\n${emergencyNotice}\n\n**👨‍⚕️ Facility to Rush To:** Nearest Government Hospital, CHC, or Emergency Department.`
      };
    } else {
      try {
        triageResult = await this.getProvider().generateTriage({
          message: sanitized,
          history: recentHistory,
          patientContext: safeContext,
          language: ['hi', 'te', 'en'].includes(language) ? language : 'en',
          emergencyMatch: null
        });
      } catch (err) {
        console.error('[TriageService] AI Provider error:', err.message);

        if (this.config.ai && this.config.ai.mockMode === true) {
          // Explicit development mock mode only
          triageResult = {
            triageLevel: 'MODERATE',
            summary: 'Clinical triage guidance generated under development mock mode.',
            possibleCauses: ['Symptom evaluation under mock mode'],
            followUpQuestions: ['How long have you experienced these symptoms?'],
            recommendedActions: ['Rest, stay hydrated, and observe vital signs.'],
            redFlags: ['Sudden worsening of symptoms or high fever'],
            specialist: 'General Physician / Primary Health Centre (PHC)',
            emergencyNotice: null,
            disclaimer: SafetyEngine.getDisclaimer(language),
            message: '### 🩺 Health Guidance (Development Mock Mode)\n\nPlease rest and observe your symptoms. Consult your local doctor.'
          };
        } else {
          // Production: Do not silently fallback to fake AI
          throw err;
        }
      }
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
