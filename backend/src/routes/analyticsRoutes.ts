import { Router } from 'express';
import {
  getDashboardAnalytics,
  getSentimentAnalytics,
  getChurnAnalytics,
} from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';

const router = Router();

router.use(authenticateToken);
router.use(requireAdmin);

router.get('/dashboard', getDashboardAnalytics);
router.get('/sentiment', getSentimentAnalytics);
router.get('/churn', getChurnAnalytics);

export default router;
