"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Message_1 = __importDefault(require("../models/Message"));
const AIAnalysis_1 = __importDefault(require("../models/AIAnalysis"));
const generateTicketId_1 = require("../utils/generateTicketId");
const aiService_1 = require("./aiService");
const notificationService_1 = require("./notificationService");
const mongoose_1 = __importDefault(require("mongoose"));
class TicketService {
    static async createTicket(customerId, subject, description, inputType = 'text') {
        // 1. Generate unique ticketId
        const ticketId = (0, generateTicketId_1.generateTicketId)();
        // 2. Run AI pipeline analysis
        const aiResult = await aiService_1.AIService.analyzeInquiry(subject, description, inputType);
        // 3. Create Ticket Document
        const ticket = new Ticket_1.default({
            ticketId,
            customerId: new mongoose_1.default.Types.ObjectId(customerId),
            subject,
            description,
            inputType,
            category: aiResult.category,
            department: aiResult.department,
            priority: aiResult.priority,
            status: 'open',
            sentiment: aiResult.sentiment,
            aiConfidence: aiResult.confidence,
            assignedTo: 'Unassigned',
        });
        await ticket.save();
        // 4. Create AI Analysis Record
        const aiAnalysis = new AIAnalysis_1.default({
            ticketId: ticket._id,
            intent: aiResult.intent,
            category: aiResult.category,
            department: aiResult.department,
            sentiment: aiResult.sentiment,
            sentimentScore: aiResult.sentimentScore,
            priority: aiResult.priority,
            confidence: aiResult.confidence,
            aiResponse: aiResult.aiResponse,
            churnScore: aiResult.churnScore,
        });
        await aiAnalysis.save();
        // 5. Store Customer Initial Message
        const customerMsg = new Message_1.default({
            ticketId: ticket._id,
            senderId: new mongoose_1.default.Types.ObjectId(customerId),
            senderRole: 'customer',
            message: description,
            messageType: inputType,
            isAIResponse: false,
        });
        await customerMsg.save();
        // 6. Store Initial AI Automated Response
        const aiMsg = new Message_1.default({
            ticketId: ticket._id,
            senderRole: 'ai',
            message: aiResult.aiResponse,
            messageType: 'text',
            isAIResponse: true,
        });
        await aiMsg.save();
        // 7. Trigger Customer Notification
        await notificationService_1.NotificationService.createNotification(customerId, `Ticket #${ticketId} Created`, `Your support ticket regarding "${subject}" was routed to ${aiResult.department}.`, 'ticket_created', ticket._id);
        return {
            ticket,
            aiAnalysis,
            aiResponse: aiResult.aiResponse,
        };
    }
    static async getCustomerTickets(customerId) {
        return Ticket_1.default.find({ customerId }).sort({ createdAt: -1 });
    }
    static async getTicketByTicketId(ticketId, customerId) {
        const query = { ticketId };
        if (customerId)
            query.customerId = customerId;
        const ticket = await Ticket_1.default.findOne(query).populate('customerId', 'name email phone avatar');
        if (!ticket)
            return null;
        const messages = await Message_1.default.find({ ticketId: ticket._id }).sort({ createdAt: 1 });
        const aiAnalysis = await AIAnalysis_1.default.findOne({ ticketId: ticket._id });
        return {
            ticket,
            messages,
            aiAnalysis,
        };
    }
    static async addMessage(ticketIdStr, senderId, senderRole, messageText, messageType = 'text') {
        const ticket = await Ticket_1.default.findOne({ ticketId: ticketIdStr });
        if (!ticket)
            throw new Error('Ticket not found');
        const msg = new Message_1.default({
            ticketId: ticket._id,
            senderId: new mongoose_1.default.Types.ObjectId(senderId),
            senderRole,
            message: messageText,
            messageType,
            isAIResponse: false,
        });
        await msg.save();
        // Update ticket timestamps & status if admin responds
        if (senderRole === 'admin') {
            ticket.status = 'in_progress';
            await ticket.save();
            await notificationService_1.NotificationService.createNotification(ticket.customerId.toString(), `Agent Update on Ticket #${ticket.ticketId}`, `A support agent replied: "${messageText.substring(0, 50)}..."`, 'agent_escalation', ticket._id);
        }
        return msg;
    }
}
exports.TicketService = TicketService;
