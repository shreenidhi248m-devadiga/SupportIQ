import { Router } from 'express';
import {
  getAllTickets,
  getAllCustomers,
  updateTicketStatus,
  getSystemAIOverview,
} from '../controllers/adminController';
import { authenticateToken } from '../middleware/authMiddleware';
import { requireAdmin } from '../middleware/roleMiddleware';

const router = Router();

// Protect all admin endpoints
router.use(authenticateToken);
router.use(requireAdmin);

router.get('/tickets', getAllTickets);
router.get('/customers', getAllCustomers);
router.patch('/tickets/:ticketId/status', updateTicketStatus);
router.patch('/tickets/:ticketId/department', updateTicketStatus);
router.get('/ai-overview', getSystemAIOverview);

export default router;
