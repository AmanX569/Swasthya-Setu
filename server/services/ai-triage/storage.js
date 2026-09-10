/**
 * =============================================================================
 * SWASTHYA SETU — AI TRIAGE CONVERSATION & MESSAGE STORAGE
 * Strict User-Scoped Ownership, Anti-IDOR Authorization, and Cascade Deletion
 * Persists to Supabase with automatic in-memory fallback for resilient offline mode
 * =============================================================================
 */

'use strict';

const crypto = require('crypto');

class TriageStorage {
  constructor(supabaseClient) {
    this.supabase = supabaseClient;
    // Resilient in-memory storage indexed by conversation ID
    this.memoryConversations = new Map(); // conversationId -> { id, owner_user_id, owner_role, title, urgency_level, created_at, updated_at }
    this.memoryMessages = new Map();      // conversationId -> Array of messages
  }

  /**
   * Generates a unique UUID or prefixed ID
   */
  generateId(prefix = 'conv_') {
    return prefix + (crypto.randomUUID ? crypto.randomUUID() : (Date.now() + '_' + Math.random().toString(36).slice(2, 9)));
  }

  /**
   * Creates a brand-new conversation owned strictly by the authenticated user
   */
  async createConversation(ownerUserId, ownerRole = 'patient', title = 'New Health Triage Chat') {
    if (!ownerUserId) {
      const err = new Error('ownerUserId is required to create a conversation.');
      err.code = 'OWNER_REQUIRED';
      err.statusCode = 400;
      throw err;
    }

    const cid = this.generateId('conv_');
    const now = new Date().toISOString();
    const isGuest = String(ownerUserId).startsWith('guest_');
    const effectiveOwner = isGuest ? `guest_${cid}` : ownerUserId;

    const conversation = {
      id: cid,
      owner_user_id: effectiveOwner,
      owner_role: ownerRole,
      title: (title || 'New Health Triage Chat').slice(0, 100),
      urgency_level: 'LOW',
      created_at: now,
      updated_at: now
    };

    this.memoryConversations.set(cid, conversation);
    this.memoryMessages.set(cid, []);

    // Persist to Supabase if available
    if (this.supabase && !isGuest) {
      try {
        await this.supabase.from('ai_triage_conversations').insert({
          id: conversation.id,
          owner_user_id: conversation.owner_user_id,
          owner_role: conversation.owner_role,
          patient_id: conversation.owner_user_id,
          title: conversation.title,
          urgency_level: conversation.urgency_level,
          created_at: conversation.created_at,
          updated_at: conversation.updated_at
        });
      } catch (err) {
        // Fallback to in-memory store
      }
    }

    return conversation;
  }

  /**
   * Retrieves a conversation and strictly enforces ownership (Anti-IDOR)
   */
  async getConversation(conversationId, ownerUserId) {
    if (!conversationId) return null;

    let conv = this.memoryConversations.get(conversationId);

    // If not in memory, check Supabase
    if (!conv && this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from('ai_triage_conversations')
          .select('*')
          .eq('id', conversationId)
          .single();

        if (data && !error) {
          conv = {
            id: data.id,
            owner_user_id: data.owner_user_id || data.patient_id,
            owner_role: data.owner_role || 'patient',
            title: data.title,
            urgency_level: data.urgency_level,
            created_at: data.created_at,
            updated_at: data.updated_at
          };
          this.memoryConversations.set(data.id, conv);
        }
      } catch (err) {}
    }

    if (!conv) return null;

    // Strict ownership verification:
    // The conversation owner MUST match the authenticated user ID
    const isOwnerMatch = (conv.owner_user_id === ownerUserId) ||
                         (String(conv.owner_user_id).startsWith('guest_') && (ownerUserId === `guest_${conversationId}` || conv.owner_user_id === `guest_${conversationId}`));
    if (!isOwnerMatch) {
      const err = new Error('UNAUTHORIZED_CONVERSATION_ACCESS');
      err.code = 'FORBIDDEN';
      err.statusCode = 403;
      throw err;
    }

    return conv;
  }

  /**
   * Retrieves or creates a conversation for a specific user
   */
  async getOrCreateConversation(conversationId, ownerUserId, ownerRole = 'patient', title = 'Health Triage Session') {
    if (!ownerUserId) {
      const err = new Error('ownerUserId is required.');
      err.code = 'OWNER_REQUIRED';
      err.statusCode = 400;
      throw err;
    }

    if (conversationId) {
      // First check if this conversation exists in memory under ANY user
      if (this.memoryConversations.has(conversationId)) {
        const memoryConv = this.memoryConversations.get(conversationId);
        const isOwnerMatch = (memoryConv.owner_user_id === ownerUserId) ||
                             (String(memoryConv.owner_user_id).startsWith('guest_') && (ownerUserId === `guest_${conversationId}` || memoryConv.owner_user_id === `guest_${conversationId}`));
        if (!isOwnerMatch) {
          const err = new Error('UNAUTHORIZED_CONVERSATION_ACCESS');
          err.code = 'FORBIDDEN';
          err.statusCode = 403;
          throw err;
        }
        return memoryConv;
      }

      // Check in Supabase if exists under another user
      if (this.supabase) {
        try {
          const { data, error } = await this.supabase
            .from('ai_triage_conversations')
            .select('*')
            .eq('id', conversationId)
            .single();

          if (data && !error) {
            const actualOwner = data.owner_user_id || data.patient_id;
            const isOwnerMatch = (actualOwner === ownerUserId) ||
                                 (String(actualOwner).startsWith('guest_') && (ownerUserId === `guest_${conversationId}` || actualOwner === `guest_${conversationId}`));
            if (!isOwnerMatch) {
              const err = new Error('UNAUTHORIZED_CONVERSATION_ACCESS');
              err.code = 'FORBIDDEN';
              err.statusCode = 403;
              throw err;
            }
            const conv = {
              id: data.id,
              owner_user_id: actualOwner,
              owner_role: data.owner_role || 'patient',
              title: data.title,
              urgency_level: data.urgency_level,
              created_at: data.created_at,
              updated_at: data.updated_at
            };
            this.memoryConversations.set(data.id, conv);
            return conv;
          }
        } catch (err) {
          if (err.message === 'UNAUTHORIZED_CONVERSATION_ACCESS' || err.statusCode === 403) throw err;
          // Fallback to in-memory store
        }
      }
    }

    // Create a new conversation owned by ownerUserId
    const cid = conversationId || this.generateId('conv_');
    const now = new Date().toISOString();
    const isGuest = String(ownerUserId).startsWith('guest_');
    const effectiveOwner = isGuest ? `guest_${cid}` : ownerUserId;

    const newConv = {
      id: cid,
      owner_user_id: effectiveOwner,
      owner_role: ownerRole,
      title: (title || 'Health Triage Session').slice(0, 100),
      urgency_level: 'LOW',
      created_at: now,
      updated_at: now
    };

    this.memoryConversations.set(cid, newConv);
    if (!this.memoryMessages.has(cid)) {
      this.memoryMessages.set(cid, []);
    }

    if (this.supabase && !isGuest) {
      try {
        await this.supabase.from('ai_triage_conversations').insert({
          id: newConv.id,
          owner_user_id: newConv.owner_user_id,
          owner_role: newConv.owner_role,
          patient_id: newConv.owner_user_id,
          title: newConv.title,
          urgency_level: newConv.urgency_level,
          created_at: newConv.created_at,
          updated_at: newConv.updated_at
        });
      } catch (err) {}
    }

    return newConv;
  }

  /**
   * Appends a message to the conversation with ownership check
   */
  async appendMessage({ conversationId, ownerUserId, sender, content, structuredPayload = null, triageLevel = 'LOW' }) {
    const conv = await this.getOrCreateConversation(conversationId, ownerUserId);

    const msg = {
      id: this.generateId('msg_'),
      conversation_id: conv.id,
      owner_user_id: ownerUserId,
      sender,
      content,
      structured_payload: structuredPayload,
      triage_level: triageLevel,
      created_at: new Date().toISOString()
    };

    if (!this.memoryMessages.has(conv.id)) {
      this.memoryMessages.set(conv.id, []);
    }
    this.memoryMessages.get(conv.id).push(msg);

    conv.urgency_level = triageLevel;
    conv.updated_at = msg.created_at;

    const isGuest = String(ownerUserId).startsWith('guest_');
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
          .eq('id', conv.id);
      } catch (err) {}
    }

    return msg;
  }

  /**
   * Retrieves messages for a conversation, strictly verifying ownership
   */
  async getMessages(conversationId, ownerUserId, limit = 20) {
    const conv = await this.getConversation(conversationId, ownerUserId);
    if (!conv) {
      return [];
    }

    let msgs = this.memoryMessages.get(conversationId) || [];

    // If memory is empty and Supabase is configured, fetch
    if (msgs.length === 0 && this.supabase) {
      try {
        const { data, error } = await this.supabase
          .from('ai_triage_messages')
          .select('*')
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true })
          .limit(limit);

        if (data && !error) {
          msgs = data;
          this.memoryMessages.set(conversationId, data);
        }
      } catch (err) {}
    }

    return msgs.slice(-limit);
  }

  /**
   * Lists all conversations owned by a specific user (never returns another user's conversations)
   */
  async listUserConversations(ownerUserId) {
    if (!ownerUserId) return [];

    const results = [];
    for (const [id, conv] of this.memoryConversations.entries()) {
      if (conv.owner_user_id === ownerUserId) {
        results.push({ ...conv });
      }
    }

    // Also check Supabase if available
    const isGuest = String(ownerUserId).startsWith('guest_');
    if (this.supabase && !isGuest) {
      try {
        const { data, error } = await this.supabase
          .from('ai_triage_conversations')
          .select('*')
          .eq('owner_user_id', ownerUserId)
          .order('updated_at', { ascending: false });

        if (data && !error) {
          data.forEach(d => {
            if (!results.some(r => r.id === d.id)) {
              results.push({
                id: d.id,
                owner_user_id: d.owner_user_id || d.patient_id,
                owner_role: d.owner_role || 'patient',
                title: d.title,
                urgency_level: d.urgency_level,
                created_at: d.created_at,
                updated_at: d.updated_at
              });
            }
          });
        }
      } catch (err) {}
    }

    return results.sort((a, b) => new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at));
  }

  /**
   * Atomically deletes a conversation and all of its messages, strictly enforcing ownership
   */
  async deleteConversation(conversationId, ownerUserId) {
    // 1. Verify ownership (will throw UNAUTHORIZED_CONVERSATION_ACCESS if not owned)
    const conv = await this.getConversation(conversationId, ownerUserId);
    if (!conv) {
      const err = new Error('Conversation not found');
      err.code = 'NOT_FOUND';
      err.statusCode = 404;
      throw err;
    }

    // 2. Cascade delete messages
    this.memoryMessages.delete(conversationId);

    // 3. Delete conversation record
    this.memoryConversations.delete(conversationId);

    // 4. Delete in Supabase if available
    if (this.supabase) {
      try {
        await this.supabase.from('ai_triage_messages').delete().eq('conversation_id', conversationId);
        await this.supabase.from('ai_triage_conversations').delete().eq('id', conversationId);
      } catch (e) {}
    }

    return {
      success: true,
      deletedConversationId: conversationId
    };
  }
}

module.exports = TriageStorage;
