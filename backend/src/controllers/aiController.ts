import { Request, Response } from 'express';
import { AIService } from '../services/aiService';
import AIAnalysis from '../models/AIAnalysis';
import Ticket from '../models/Ticket';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const analyzeText = async (req: Request, res: Response): Promise<void> => {
  try {
    const subject = req.body.subject || 'Customer Inquiry';
    const description = req.body.text || req.body.description;

    if (!description) {
      sendError(res, 'Text or description is required for AI analysis', 400);
      return;
    }

    const analysis = await AIService.analyzeInquiry(subject, description, 'text');
    sendSuccess(res, 'AI Analysis generated successfully', analysis);
  } catch (error: any) {
    sendError(res, error.message || 'Error generating AI analysis', 500);
  }
};

export const analyzeVoice = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const textPrompt = req.body.text || req.body.description || (file ? `Voice message recording: ${file.originalname}` : '');

    if (!file && !textPrompt) {
      sendError(res, 'Audio file or voice transcript is required', 400);
      return;
    }

    const simulatedTranscript = textPrompt || `Audio recording parsed: Customer reported vehicle accident and billing dispute.`;
    const analysis = await AIService.analyzeInquiry('Voice Support Inquiry', simulatedTranscript, 'voice');

    sendSuccess(res, 'Voice AI Analysis complete', {
      transcribedText: simulatedTranscript,
      audioFileName: file ? file.originalname : 'recorded_audio.webm',
      ...analysis,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error processing voice AI request', 500);
  }
};

export const analyzeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const description = req.body.description || (file ? `Image uploaded: ${file.originalname}` : '');

    if (!file && !description) {
      sendError(res, 'Image file or description is required', 400);
      return;
    }

    const simulatedOcrText = description || `Computer Vision scan of image (${file?.originalname}): Front bumper collision damage detected on vehicle.`;
    const analysis = await AIService.analyzeInquiry('Image Inspection Claim', simulatedOcrText, 'image');

    sendSuccess(res, 'Image Vision AI Analysis complete', {
      extractedText: simulatedOcrText,
      imageFileName: file ? file.originalname : 'uploaded_image.png',
      ...analysis,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error processing image AI request', 500);
  }
};

export const analyzeDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    const description = req.body.description || (file ? `Document uploaded: ${file.originalname}` : '');

    if (!file && !description) {
      sendError(res, 'Document file or description is required', 400);
      return;
    }

    const simulatedDocText = description || `Document Intelligence extracted text from ${file?.originalname}: Policy #POL-99201 insurance claim policy details and repair estimate.`;
    const analysis = await AIService.analyzeInquiry('Document Analysis Request', simulatedDocText, 'document');

    sendSuccess(res, 'Document AI Analysis complete', {
      extractedText: simulatedDocText,
      docFileName: file ? file.originalname : 'uploaded_document.pdf',
      ...analysis,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error processing document AI request', 500);
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