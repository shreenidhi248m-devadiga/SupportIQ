import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';
import Ticket from '../models/Ticket';
import Message from '../models/Message';
import { TicketService } from '../services/ticketService';
import { sendSuccess, sendError } from '../utils/responseHandler';

const postMessageSchema = z.object({
  message: z.string().min(1, 'Message text is required'),
  messageType: z.enum(['text', 'voice', 'image', 'document']).default('text'),
});

export const sendMessage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role || 'customer';

    if (!userId) {
      sendError(res, 'Unauthorized', 401);
      return;
    }

    const parseResult = postMessageSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }

    const { message, messageType } = parseResult.data;

    const newMessage = await TicketService.addMessage(
      ticketId,
      userId,
      userRole,
      message,
      messageType
    );

    sendSuccess(res, 'Message sent successfully', newMessage, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Error sending message', 500);
  }
};

export const getMessages = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
      sendError(res, 'Ticket not found', 404);
      return;
    }

    // Verify ownership if user is customer
    if (req.user?.role === 'customer' && ticket.customerId.toString() !== req.user.id) {
      sendError(res, 'Access denied', 403);
      return;
    }

    const messages = await Message.find({ ticketId: ticket._id }).sort({ createdAt: 1 });
    sendSuccess(res, 'Conversation history retrieved', messages);
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching messages', 500);
  }
};
