"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = (0, express_1.Router)();
// Protect all admin endpoints
router.use(authMiddleware_1.authenticateToken);
router.use(roleMiddleware_1.requireAdmin);
router.get('/analytics', adminController_1.getAdminAnalytics);
router.get('/tickets', adminController_1.getAllTickets);
router.get('/customers', adminController_1.getAllCustomers);
router.get('/customers/:customerId/intelligence', adminController_1.getCustomerIntelligence);
router.patch('/tickets/:ticketId/status', adminController_1.updateTicketStatus);
router.patch('/tickets/:ticketId/department', adminController_1.updateTicketStatus);
router.put('/tickets/:ticketId', adminController_1.updateTicketStatus);
router.get('/ai-overview', adminController_1.getSystemAIOverview);
exports.default = router;
