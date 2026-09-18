import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';
import {
  getDeploymentStatus,
  getDeploymentHistory,
  getDeploymentReadiness,
  validateDeployment,
  deployToProduction,
  getSystemHealth
} from '../controllers/deploymentController';

const router = Router();

// Protect all deployment endpoints
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/status', getDeploymentStatus);
router.get('/history', getDeploymentHistory);
router.get('/readiness', getDeploymentReadiness);
router.post('/validate', validateDeployment);
router.post('/deploy', deployToProduction);
router.get('/system-health', getSystemHealth);

export default router;
