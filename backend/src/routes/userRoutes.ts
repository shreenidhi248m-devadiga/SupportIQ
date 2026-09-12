import { Router } from 'express';
import { getProfile, updateProfile, getNotifications } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/notifications', getNotifications);

export default router;
