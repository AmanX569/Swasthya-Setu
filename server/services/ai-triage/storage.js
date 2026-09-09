/**
 * =============================================================================
 * SWASTHYA SETU — AI TRIAGE CONVERSATION & MESSAGE STORAGE
 * Persists to Supabase with automatic in-memory fallback for resilient offline mode
 * =============================================================================
 */

'use strict';

const crypto = require('crypto');

class TriageStorage {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
    // In-memory resilient storage
    this.memoryConversations = new Map();
    this.memoryMessages = new Map();
  }

  /**
   * Generates a UUID
   */
  generateId() {
    return crypto.randomUUID ? crypto.randomUUID() : ('conv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9));
  }

  /**
   * Retrieves or creates a conversation for a specific patient
   */
  async getOrCreateConversation(conversationId, patientId, title = 'Health Triage Session') {
    const cid = conversationId || this.generateId();

    // Check memory first
    if (this.memoryConversations.has(cid)) {
      const conv = this.memoryConversations.get(cid);
      // Ownership check
      if (conv.patient_id !== patientId) {
        throw new Error('UNAUTHORIZED_CONVERSATION_ACCESS');
      }
      return conv;
    }

    // Attempt Supabase fetch
    if (this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from('ai_triage_conversations')
          .select('*')
          .eq('id', cid)
          .single();

        if (data && !error) {
          if (data.patient_id !== patientId) {
            throw new Error('UNAUTHORIZED_CONVERSATION_ACCESS');
          }
          this.memoryConversations.set(cid, data);
          return data;
        }
      } catch (err) {
        if (err.message === 'UNAUTHORIZED_CONVERSATION_ACCESS') throw err;
        // Table might not exist yet, fallback silently
      }
    }

    // Create new conversation
    const newConv = {
      id: cid,
      patient_id: patientId,
      title: title.slice(0, 100),
      urgency_level: 'LOW',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.memoryConversations.set(cid, newConv);

    const isGuest = String(patientId).startsWith('guest_');
    if (this.supabase && !isGuest) {
      try {
        await this.supabase
          .from('ai_triage_conversations')
          .insert(newConv);
      } catch (err) {
        // Continue with memory store
      }
    }

    return newConv;
  }

  /**
   * Appends a message to the conversation
   */
  async appendMessage({ conversationId, patientId, sender, content, structuredPayload = null, triageLevel = 'LOW' }) {
    await this.getOrCreateConversation(conversationId, patientId);

    const msg = {
      id: this.generateId(),
      conversation_id: conversationId,
      sender,
      content,
      structured_payload: structuredPayload,
      triage_level: triageLevel,
      created_at: new Date().toISOString()
    };

    if (!this.memoryMessages.has(conversationId)) {
      this.memoryMessages.set(conversationId, []);
    }
    this.memoryMessages.get(conversationId).push(msg);

    // Update conversation state in memory
    const conv = this.memoryConversations.get(conversationId);
    if (conv) {
      conv.urgency_level = triageLevel;
      conv.updated_at = msg.created_at;
    }

    // Persist to Supabase if available (authenticated patients only)
    const isGuest = String(patientId).startsWith('guest_');
    if (this.supabase && !isGuest) {
      try {
        await this.supabase.from('ai_triage_messages').insert({
          id: msg.id,
          conversation_id: msg.conversation_id,
          sender: msg.sender,
          content: msg.content,
          structured_payload: msg.structured_payload,
          triage_level: msg.triage_level,
          created_at: msg.created_at
        });

        await this.supabase.from('ai_triage_conversations')
          .update({ urgency_level: triageLevel, updated_at: msg.created_at })
          .eq('id', conversationId);
      } catch (err) {
        // Memory fallback is sufficient
      }
    }

    return msg;
  }

  /**
   * Retrieves message history for a conversation
   */
  async getMessages(conversationId, patientId, limit = 10) {
    await this.getOrCreateConversation(conversationId, patientId);

    const msgs = this.memoryMessages.get(conversationId) || [];
    return msgs.slice(-limit);
  }

  /**
   * Clears a conversation
   */
  async clearConversation(conversationId, patientId) {
    await this.getOrCreateConversation(conversationId, patientId);
    this.memoryMessages.delete(conversationId);

    if (this.supabase) {
      try {
        await this.supabase.from('ai_triage_messages').delete().eq('conversation_id', conversationId);
      } catch (e) {}
    }
    return true;
  }
}

module.exports = TriageStorage;
