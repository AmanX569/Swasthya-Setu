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
   * GET /api/ai/triage/conversations/:conversationId
   * Retrieve message history
   */
  router.get('/conversations/:conversationId', authenticateToken, async (req, res, next) => {
    try {
      const { conversationId } = req.params;
      const result = await triageService.getHistory(conversationId, req.user);
      return res.status(200).json(result);
    } catch (err) {
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
   * DELETE /api/ai/triage/conversations/:conversationId
   * Clear conversation history
   */
  router.delete('/conversations/:conversationId', authenticateToken, async (req, res, next) => {
    try {
      const { conversationId } = req.params;
      const result = await triageService.clearConversation(conversationId, req.user);
      return res.status(200).json(result);
    } catch (err) {
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

  return router;
}

module.exports = createAiTriageRouter;
