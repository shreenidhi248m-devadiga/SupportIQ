import Ticket, { ITicket } from '../models/Ticket';
import Message from '../models/Message';
import AIAnalysis from '../models/AIAnalysis';
import { generateTicketId } from '../utils/generateTicketId';
import { AIService } from './aiService';
import { NotificationService } from './notificationService';
import mongoose from 'mongoose';

export class TicketService {
  static async createTicket(
    customerId: string,
    subject: string,
    description: string,
    inputType: 'text' | 'voice' | 'image' | 'document' = 'text'
  ) {
    // 1. Generate unique ticketId
    const ticketId = generateTicketId();

    // 2. Run AI pipeline analysis
    const aiResult = await AIService.analyzeInquiry(subject, description, inputType);

    // 3. Create Ticket Document
    const ticket = new Ticket({
      ticketId,
      customerId: new mongoose.Types.ObjectId(customerId),
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
    const aiAnalysis = new AIAnalysis({
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
    const customerMsg = new Message({
      ticketId: ticket._id,
      senderId: new mongoose.Types.ObjectId(customerId),
      senderRole: 'customer',
      message: description,
      messageType: inputType,
      isAIResponse: false,
    });
    await customerMsg.save();

    // 6. Store Initial AI Automated Response
    const aiMsg = new Message({
      ticketId: ticket._id,
      senderRole: 'ai',
      message: aiResult.aiResponse,
      messageType: 'text',
      isAIResponse: true,
    });
    await aiMsg.save();

    // 7. Trigger Customer Notification
    await NotificationService.createNotification(
      customerId,
      `Ticket #${ticketId} Created`,
      `Your support ticket regarding "${subject}" was routed to ${aiResult.department}.`,
      'ticket_created',
      ticket._id
    );

    return {
      ticket,
      aiAnalysis,
      aiResponse: aiResult.aiResponse,
    };
  }

  static async getCustomerTickets(customerId: string) {
    return Ticket.find({ customerId }).sort({ createdAt: -1 });
  }

  static async getTicketByTicketId(ticketId: string, customerId?: string) {
    const query: any = { ticketId };
    if (customerId) query.customerId = customerId;

    const ticket = await Ticket.findOne(query).populate('customerId', 'name email phone avatar');
    if (!ticket) return null;

    const messages = await Message.find({ ticketId: ticket._id }).sort({ createdAt: 1 });
    const aiAnalysis = await AIAnalysis.findOne({ ticketId: ticket._id });

    return {
      ticket,
      messages,
      aiAnalysis,
    };
  }

  static async addMessage(
    ticketIdStr: string,
    senderId: string,
    senderRole: 'customer' | 'admin',
    messageText: string,
    messageType: 'text' | 'voice' | 'image' | 'document' = 'text'
  ) {
    const ticket = await Ticket.findOne({ ticketId: ticketIdStr });
    if (!ticket) throw new Error('Ticket not found');

    const msg = new Message({
      ticketId: ticket._id,
      senderId: new mongoose.Types.ObjectId(senderId),
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

      await NotificationService.createNotification(
        ticket.customerId.toString(),
        `Agent Update on Ticket #${ticket.ticketId}`,
        `A support agent replied: "${messageText.substring(0, 50)}..."`,
        'agent_escalation',
        ticket._id
      );
    }

    return msg;
  }
}
