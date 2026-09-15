"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessages = exports.sendMessage = void 0;
const zod_1 = require("zod");
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Message_1 = __importDefault(require("../models/Message"));
const ticketService_1 = require("../services/ticketService");
const responseHandler_1 = require("../utils/responseHandler");
const postMessageSchema = zod_1.z.object({
    message: zod_1.z.string().min(1, 'Message text is required'),
    messageType: zod_1.z.enum(['text', 'voice', 'image', 'document']).default('text'),
});
const sendMessage = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const userId = req.user?.id;
        const userRole = req.user?.role || 'customer';
        if (!userId) {
            (0, responseHandler_1.sendError)(res, 'Unauthorized', 401);
            return;
        }
        const parseResult = postMessageSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { message, messageType } = parseResult.data;
        const newMessage = await ticketService_1.TicketService.addMessage(ticketId, userId, userRole, message, messageType);
        (0, responseHandler_1.sendSuccess)(res, 'Message sent successfully', newMessage, 201);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error sending message', 500);
    }
};
exports.sendMessage = sendMessage;
const getMessages = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket_1.default.findOne({ ticketId });
        if (!ticket) {
            (0, responseHandler_1.sendError)(res, 'Ticket not found', 404);
            return;
        }
        // Verify ownership if user is customer
        if (req.user?.role === 'customer' && ticket.customerId.toString() !== req.user.id) {
            (0, responseHandler_1.sendError)(res, 'Access denied', 403);
            return;
        }
        const messages = await Message_1.default.find({ ticketId: ticket._id }).sort({ createdAt: 1 });
        (0, responseHandler_1.sendSuccess)(res, 'Conversation history retrieved', messages);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error fetching messages', 500);
    }
};
exports.getMessages = getMessages;
