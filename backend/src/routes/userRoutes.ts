import { Router } from 'express';
import { getProfile, updateProfile, getNotifications, changePassword } from '../controllers/userController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);
router.get('/notifications', getNotifications);

export default router;
