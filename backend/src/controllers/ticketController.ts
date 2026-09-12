import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/authMiddleware';
import { TicketService } from '../services/ticketService';
import Attachment from '../models/Attachment';
import { sendSuccess, sendError } from '../utils/responseHandler';

const createTicketSchema = z.object({
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  description: z.string().min(5, 'Description must be at least 5 characters'),
  inputType: z.enum(['text', 'voice', 'image', 'document']).default('text'),
});

export const createTicket = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const customerId = req.user?.id;
    if (!customerId) {
      sendError(res, 'Unauthorized', 401);
      return;
    }

    const parseResult = createTicketSchema.safeParse(req.body);
    if (!parseResult.success) {
      sendError(res, parseResult.error.errors[0].message, 400);
      return;
    }

    const { subject, description, inputType } = parseResult.data;

    const result = await TicketService.createTicket(customerId, subject, description, inputType);

    // Process attached file if present
    if (req.file) {
      const attachment = new Attachment({
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

    sendSuccess(res, 'Ticket created and analyzed successfully', {
      ticketId: result.ticket.ticketId,
      status: result.ticket.status,
      department: result.ticket.department,
      priority: result.ticket.priority,
      sentiment: result.ticket.sentiment,
      aiResponse: result.aiResponse,
      aiAnalysis: result.aiAnalysis,
    }, 201);
  } catch (error: any) {
    sendError(res, error.message || 'Error creating ticket', 500);
  }
};

export const getMyTickets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const customerId = req.user?.id;
    if (!customerId) {
      sendError(res, 'Unauthorized', 401);
      return;
    }

    const tickets = await TicketService.getCustomerTickets(customerId);
    sendSuccess(res, 'Customer tickets retrieved', tickets);
  } catch (error: any) {
    sendError(res, error.message || 'Error retrieving tickets', 500);
  }
};

export const getTicketDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;
    const customerId = req.user?.role === 'admin' ? undefined : req.user?.id;

    const details = await TicketService.getTicketByTicketId(ticketId, customerId);
    if (!details) {
      sendError(res, 'Ticket not found or unauthorized', 404);
      return;
    }

    sendSuccess(res, 'Ticket details retrieved', details);
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching ticket details', 500);
  }
};
