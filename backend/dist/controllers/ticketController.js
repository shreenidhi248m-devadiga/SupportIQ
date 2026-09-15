"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketDetails = exports.getMyTickets = exports.createTicket = void 0;
const zod_1 = require("zod");
const ticketService_1 = require("../services/ticketService");
const Attachment_1 = __importDefault(require("../models/Attachment"));
const responseHandler_1 = require("../utils/responseHandler");
const createTicketSchema = zod_1.z.object({
    subject: zod_1.z.string().min(3, 'Subject must be at least 3 characters'),
    description: zod_1.z.string().min(5, 'Description must be at least 5 characters'),
    inputType: zod_1.z.enum(['text', 'voice', 'image', 'document']).default('text'),
});
const createTicket = async (req, res) => {
    try {
        const customerId = req.user?.id;
        if (!customerId) {
            (0, responseHandler_1.sendError)(res, 'Unauthorized', 401);
            return;
        }
        const parseResult = createTicketSchema.safeParse(req.body);
        if (!parseResult.success) {
            (0, responseHandler_1.sendError)(res, parseResult.error.errors[0].message, 400);
            return;
        }
        const { subject, description, inputType } = parseResult.data;
        const result = await ticketService_1.TicketService.createTicket(customerId, subject, description, inputType);
        // Process attached file if present
        if (req.file) {
            const attachment = new Attachment_1.default({
                ticketId: result.ticket._id,
                uploadedBy: customerId,
                fileName: req.file.originalname,
                fileType: req.file.mimetype,
                filePath: req.file.path,
                fileSize: req.file.size,
                extractedText: `Simulated extracted text from file: ${req.file.originalname}`,
            });
            await attachment.save();
        }
        (0, responseHandler_1.sendSuccess)(res, 'Ticket created and analyzed successfully', {
            ticketId: result.ticket.ticketId,
            status: result.ticket.status,
            department: result.ticket.department,
            priority: result.ticket.priority,
            sentiment: result.ticket.sentiment,
            aiResponse: result.aiResponse,
            aiAnalysis: result.aiAnalysis,
        }, 201);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error creating ticket', 500);
    }
};
exports.createTicket = createTicket;
const getMyTickets = async (req, res) => {
    try {
        const customerId = req.user?.id;
        if (!customerId) {
            (0, responseHandler_1.sendError)(res, 'Unauthorized', 401);
            return;
        }
        const tickets = await ticketService_1.TicketService.getCustomerTickets(customerId);
        (0, responseHandler_1.sendSuccess)(res, 'Customer tickets retrieved', tickets);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error retrieving tickets', 500);
    }
};
exports.getMyTickets = getMyTickets;
const getTicketDetails = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const customerId = req.user?.role === 'admin' ? undefined : req.user?.id;
        const details = await ticketService_1.TicketService.getTicketByTicketId(ticketId, customerId);
        if (!details) {
            (0, responseHandler_1.sendError)(res, 'Ticket not found or unauthorized', 404);
            return;
        }
        (0, responseHandler_1.sendSuccess)(res, 'Ticket details retrieved', details);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error fetching ticket details', 500);
    }
};
exports.getTicketDetails = getTicketDetails;
