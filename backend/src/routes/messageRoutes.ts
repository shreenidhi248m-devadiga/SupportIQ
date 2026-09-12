import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/messageController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.post('/:ticketId', sendMessage);
router.get('/:ticketId', getMessages);

export default router;
