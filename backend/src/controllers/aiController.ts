import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import AIAnalysis from '../models/AIAnalysis';
import Ticket from '../models/Ticket';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const analyzeText = async (req: Request, res: Response): Promise<void> => {
  try {
    const { subject, description, inputType } = req.body;

    if (!subject || !description) {
      sendError(res, 'Subject and description are required for AI analysis', 400);
      return;
    }

    const analysis = await AIService.analyzeInquiry(subject, description, inputType || 'text');
    sendSuccess(res, 'AI Analysis generated successfully', analysis);
  } catch (error: any) {
    sendError(res, error.message || 'Error generating AI analysis', 500);
  }
};

export const getTicketAIAnalysis = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
      sendError(res, 'Ticket not found', 404);
      return;
    }

    const aiAnalysis = await AIAnalysis.findOne({ ticketId: ticket._id });
    if (!aiAnalysis) {
      sendError(res, 'AI Analysis not found for this ticket', 404);
      return;
    }

    sendSuccess(res, 'AI Analysis retrieved', aiAnalysis);
  } catch (error: any) {
    sendError(res, error.message || 'Error retrieving AI analysis', 500);
  }
};
