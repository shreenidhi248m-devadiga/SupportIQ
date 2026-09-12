import { Router } from 'express';
import { analyzeText, getTicketAIAnalysis } from '../controllers/aiController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Public / Demo AI text analysis endpoint
router.post('/analyze', analyzeText);

// Protected ticket AI analysis details
router.get('/ticket/:ticketId', authenticateToken, getTicketAIAnalysis);

export default router;
