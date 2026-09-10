/**
 * =============================================================================
 * SWASTHYA SETU — AI TRIAGE API ROUTES
 * POST /api/ai/triage/chat
 * GET  /api/ai/triage/conversations/:conversationId
 * DELETE /api/ai/triage/conversations/:conversationId
 * =============================================================================
 */

'use strict';

const express = require('express');
const { authenticateToken, optionalAuthenticateToken } = require('../middleware/auth');
const { aiTriageRateLimit } = require('../middleware/rate-limit');

function createAiTriageRouter(services) {
  const router = express.Router();
  const triageService = services.triageService;

  /**
   * POST /api/ai/triage/chat
   * Core triage assessment endpoint (supports authenticated patients & guest citizens)
   */
  router.post('/chat', optionalAuthenticateToken, aiTriageRateLimit, async (req, res, next) => {
    try {
      const { message, conversationId, language, patientContext } = req.body || {};

      const result = await triageService.processMessage({
        message,
        conversationId,
        language,
        patientContext,
        user: req.user
      });

      return res.status(200).json(result);
    } catch (err) {
      if (err.statusCode) {
        return res.status(err.statusCode).json({
          success: false,
          error: err.message,
          code: err.code || 'TRIAGE_ERROR'
        });
      }
      if (err.message === 'UNAUTHORIZED_CONVERSATION_ACCESS') {
        return res.status(403).json({
          success: false,
          error: 'You are not authorized to access this conversation',
          code: 'FORBIDDEN'
        });
      }
      next(err);
    }
  });

  /**
   * POST /api/ai/triage/conversations
   * Creates a brand new conversation owned by the authenticated user
   */
  router.post('/conversations', optionalAuthenticateToken, async (req, res, next) => {
    try {
      const { title } = req.body || {};
      const result = await triageService.createConversation(req.user, title);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

  /**
   * GET /api/ai/triage/conversations
   * Lists all conversations owned strictly by the authenticated user
   */
  router.get('/conversations', optionalAuthenticateToken, async (req, res, next) => {
    try {
      const result = await triageService.listConversations(req.user);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  });

  /**
   * GET /api/ai/triage/conversations/:conversationId
   * Retrieve message history (strictly verifies user ownership)
   */
  router.get('/conversations/:conversationId', optionalAuthenticateToken, async (req, res, next) => {
    try {
      const { conversationId } = req.params;
      const result = await triageService.getHistory(conversationId, req.user);
      return res.status(200).json(result);
    } catch (err) {
      if (err.message === 'UNAUTHORIZED_CONVERSATION_ACCESS' || err.code === 'FORBIDDEN' || err.statusCode === 403) {
        return res.status(403).json({
          success: false,
          error: 'You are not authorized to access this conversation',
          code: 'FORBIDDEN'
        });
      }
      if (err.statusCode === 404 || err.code === 'NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: 'Conversation not found',
          code: 'NOT_FOUND'
        });
      }
      next(err);
    }
  });

  /**
   * DELETE /api/ai/triage/conversations/:conversationId
   * Atomically clear/delete conversation history (strictly verifies user ownership)
   */
  router.delete('/conversations/:conversationId', optionalAuthenticateToken, async (req, res, next) => {
    try {
      const { conversationId } = req.params;
      const result = await triageService.clearConversation(conversationId, req.user);
      return res.status(200).json(result);
    } catch (err) {
      if (err.message === 'UNAUTHORIZED_CONVERSATION_ACCESS' || err.code === 'FORBIDDEN' || err.statusCode === 403) {
        return res.status(403).json({
          success: false,
          error: 'You are not authorized to delete this conversation',
          code: 'FORBIDDEN'
        });
      }
      if (err.statusCode === 404 || err.code === 'NOT_FOUND') {
        return res.status(404).json({
          success: false,
          error: 'Conversation not found',
          code: 'NOT_FOUND'
        });
      }
      next(err);
    }
  });

  return router;
}

module.exports = createAiTriageRouter;
