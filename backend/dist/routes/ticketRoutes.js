"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
const messageController_1 = require("../controllers/messageController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticateToken);
// Customer Ticket Operations
router.post('/', roleMiddleware_1.requireCustomer, uploadMiddleware_1.upload.single('attachment'), ticketController_1.createTicket);
router.get('/my-tickets', roleMiddleware_1.requireCustomer, ticketController_1.getMyTickets);
router.get('/:ticketId', ticketController_1.getTicketDetails);
// Messages Routes
router.post('/:ticketId/messages', messageController_1.sendMessage);
router.get('/:ticketId/messages', messageController_1.getMessages);
exports.default = router;
