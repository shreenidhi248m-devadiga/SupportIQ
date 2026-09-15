"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTicketAIAnalysis = exports.analyzeDocument = exports.analyzeImage = exports.analyzeVoice = exports.analyzeText = void 0;
const aiService_1 = require("../services/aiService");
const AIAnalysis_1 = __importDefault(require("../models/AIAnalysis"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const responseHandler_1 = require("../utils/responseHandler");
const analyzeText = async (req, res) => {
    try {
        const subject = req.body.subject || 'Customer Inquiry';
        const description = req.body.text || req.body.description;
        if (!description) {
            (0, responseHandler_1.sendError)(res, 'Text or description is required for AI analysis', 400);
            return;
        }
        const analysis = await aiService_1.AIService.analyzeInquiry(subject, description, 'text');
        (0, responseHandler_1.sendSuccess)(res, 'AI Analysis generated successfully', analysis);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error generating AI analysis', 500);
    }
};
exports.analyzeText = analyzeText;
const analyzeVoice = async (req, res) => {
    try {
        const file = req.file;
        const textPrompt = req.body.text || req.body.description || (file ? `Voice message recording: ${file.originalname}` : '');
        if (!file && !textPrompt) {
            (0, responseHandler_1.sendError)(res, 'Audio file or voice transcript is required', 400);
            return;
        }
        const simulatedTranscript = textPrompt || `Audio recording parsed: Customer reported vehicle accident and billing dispute.`;
        const analysis = await aiService_1.AIService.analyzeInquiry('Voice Support Inquiry', simulatedTranscript, 'voice');
        (0, responseHandler_1.sendSuccess)(res, 'Voice AI Analysis complete', {
            transcribedText: simulatedTranscript,
            audioFileName: file ? file.originalname : 'recorded_audio.webm',
            ...analysis,
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error processing voice AI request', 500);
    }
};
exports.analyzeVoice = analyzeVoice;
const analyzeImage = async (req, res) => {
    try {
        const file = req.file;
        const description = req.body.description || (file ? `Image uploaded: ${file.originalname}` : '');
        if (!file && !description) {
            (0, responseHandler_1.sendError)(res, 'Image file or description is required', 400);
            return;
        }
        const simulatedOcrText = description || `Computer Vision scan of image (${file?.originalname}): Front bumper collision damage detected on vehicle.`;
        const analysis = await aiService_1.AIService.analyzeInquiry('Image Inspection Claim', simulatedOcrText, 'image');
        (0, responseHandler_1.sendSuccess)(res, 'Image Vision AI Analysis complete', {
            extractedText: simulatedOcrText,
            imageFileName: file ? file.originalname : 'uploaded_image.png',
            ...analysis,
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error processing image AI request', 500);
    }
};
exports.analyzeImage = analyzeImage;
const analyzeDocument = async (req, res) => {
    try {
        const file = req.file;
        const description = req.body.description || (file ? `Document uploaded: ${file.originalname}` : '');
        if (!file && !description) {
            (0, responseHandler_1.sendError)(res, 'Document file or description is required', 400);
            return;
        }
        const simulatedDocText = description || `Document Intelligence extracted text from ${file?.originalname}: Policy #POL-99201 insurance claim policy details and repair estimate.`;
        const analysis = await aiService_1.AIService.analyzeInquiry('Document Analysis Request', simulatedDocText, 'document');
        (0, responseHandler_1.sendSuccess)(res, 'Document AI Analysis complete', {
            extractedText: simulatedDocText,
            docFileName: file ? file.originalname : 'uploaded_document.pdf',
            ...analysis,
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error processing document AI request', 500);
    }
};
exports.analyzeDocument = analyzeDocument;
const getTicketAIAnalysis = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await Ticket_1.default.findOne({ ticketId });
        if (!ticket) {
            (0, responseHandler_1.sendError)(res, 'Ticket not found', 404);
            return;
        }
        const aiAnalysis = await AIAnalysis_1.default.findOne({ ticketId: ticket._id });
        if (!aiAnalysis) {
            (0, responseHandler_1.sendError)(res, 'AI Analysis not found for this ticket', 404);
            return;
        }
        (0, responseHandler_1.sendSuccess)(res, 'AI Analysis retrieved', aiAnalysis);
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error retrieving AI analysis', 500);
    }
};
exports.getTicketAIAnalysis = getTicketAIAnalysis;
