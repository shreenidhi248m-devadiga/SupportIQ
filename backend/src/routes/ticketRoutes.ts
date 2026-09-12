import { Router } from 'express';
import { createTicket, getMyTickets, getTicketDetails } from '../controllers/ticketController';
import { sendMessage, getMessages } from '../controllers/messageController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireCustomer } from '../middleware/roleMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = Router();

router.use(authenticateToken);

// Customer Ticket Operations
router.post('/', requireCustomer, upload.single('attachment'), createTicket);
router.get('/my-tickets', requireCustomer, getMyTickets);
router.get('/:ticketId', getTicketDetails);

// Messages Routes
router.post('/:ticketId/messages', sendMessage);
router.get('/:ticketId/messages', getMessages);

export default router;
