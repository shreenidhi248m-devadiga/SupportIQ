import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Ticket from '../models/Ticket';
import AIAnalysis from '../models/AIAnalysis';
import User from '../models/User';
import { sendSuccess, sendError } from '../utils/responseHandler';

export const getDashboardAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const resolved = await Ticket.countDocuments({ status: { $in: ['resolved', 'closed'] } });
    const pending = await Ticket.countDocuments({ status: { $in: ['open', 'in_progress', 'waiting_for_customer'] } });
    const totalCustomers = await User.countDocuments({ role: 'customer' });

    const resolutionRate = totalTickets > 0 ? ((resolved / totalTickets) * 100).toFixed(1) + '%' : '0%';

    sendSuccess(res, 'Dashboard analytics retrieved', {
      totalTickets,
      resolved,
      pending,
      totalCustomers,
      resolutionRate,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching analytics', 500);
  }
};

export const getSentimentAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const sentimentCounts = await Ticket.aggregate([
      { $group: { _id: '$sentiment', count: { $sum: 1 } } },
    ]);

    const formatted: Record<string, number> = {};
    sentimentCounts.forEach((item) => {
      formatted[item._id || 'Neutral'] = item.count;
    });

    sendSuccess(res, 'Sentiment analytics retrieved', {
      sentiments: formatted,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching sentiment analytics', 500);
  }
};

export const getChurnAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const lowRisk = await AIAnalysis.countDocuments({ churnScore: { $lt: 0.3 } });
    const mediumRisk = await AIAnalysis.countDocuments({ churnScore: { $gte: 0.3, $lt: 0.6 } });
    const highRisk = await AIAnalysis.countDocuments({ churnScore: { $gte: 0.6 } });

    const highRiskTickets = await AIAnalysis.find({ churnScore: { $gte: 0.6 } })
      .populate('ticketId')
      .limit(10);

    sendSuccess(res, 'Churn risk analytics retrieved', {
      distribution: {
        lowRisk,
        mediumRisk,
        highRisk,
      },
      highRiskTickets,
    });
  } catch (error: any) {
    sendError(res, error.message || 'Error fetching churn analytics', 500);
  }
};
