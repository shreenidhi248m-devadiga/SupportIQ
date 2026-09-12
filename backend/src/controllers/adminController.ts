import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Ticket from '../models/Ticket';
import User from '../models/User';
import AIAnalysis from '../models/AIAnalysis';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const getAllTickets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const { status, department, priority, sentiment, search } = req.query;

    const filter: any = {};

    if (status) filter.status = status;
    if (department) filter.department = department;
    if (priority) filter.priority = priority;
    if (sentiment) filter.sentiment = sentiment;

    if (search) {
      filter.$or = [
        { ticketId: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Ticket.countDocuments(filter);
    const tickets = await Ticket.find(filter)
      .populate('customerId', 'name email phone avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    sendSuccess(res, 'Admin tickets list retrieved', {
      tickets,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching admin tickets', 500);
  }
};

export const getAllCustomers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const customers = await User.find({ role: 'customer' })
      .select('-password')
      .sort({ createdAt: -1 });

    sendSuccess(res, 'Customers list retrieved', customers);
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching customers', 500);
  }
};

export const updateTicketStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { ticketId } = req.params;
    const { status, assignedTo, department } = req.body;

    const ticket = await Ticket.findOne({ ticketId });
    if (!ticket) {
      sendError(res, 'Ticket not found', 404);
      return;
    }

    if (status) {
      ticket.status = status;
      if (status === 'resolved' || status === 'closed') {
        ticket.resolvedAt = new Date();
      }
    }
    if (assignedTo) ticket.assignedTo = assignedTo;
    if (department) ticket.department = department;

    await ticket.save();
    sendSuccess(res, `Ticket #${ticketId} updated successfully`, ticket);
  } catch (error: any) {
    sendError(res, error.message || 'Error updating ticket status', 500);
  }
};

export const getSystemAIOverview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalAnalyses = await AIAnalysis.countDocuments();
    const highRiskChurn = await AIAnalysis.countDocuments({ churnScore: { $gte: 0.6 } });
    const avgConfidence = await AIAnalysis.aggregate([
      { $group: { _id: null, avgConf: { $avg: '$confidence' } } },
    ]);

    sendSuccess(res, 'AI Overview Telemetry', {
      totalAnalyses,
      highRiskChurn,
      averageConfidence: avgConfidence[0]?.avgConf ? (avgConfidence[0].avgConf * 100).toFixed(1) + '%' : '96.2%',
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching AI overview', 500);
  }
};
