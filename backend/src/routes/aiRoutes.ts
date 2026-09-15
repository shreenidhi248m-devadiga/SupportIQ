import { Router } from 'express';
import {
  analyzeText,
  analyzeVoice,
  analyzeImage,
  analyzeDocument,
  getTicketAIAnalysis,
} from '../controllers/aiController';
import { authenticateToken } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

// Public / Demo AI endpoints
router.post('/analyze', analyzeText);
router.post('/analyze-text', analyzeText);
router.post('/analyze-voice', upload.single('attachment'), analyzeVoice);
router.post('/analyze-image', upload.single('attachment'), analyzeImage);
router.post('/analyze-document', upload.single('attachment'), analyzeDocument);

// Protected ticket AI analysis details
router.get('/ticket/:ticketId', authenticateToken, getTicketAIAnalysis);

export default router;