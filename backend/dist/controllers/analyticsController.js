"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChurnAnalytics = exports.getSentimentAnalytics = exports.getDashboardAnalytics = void 0;
const Ticket_1 = __importDefault(require("../models/Ticket"));
const AIAnalysis_1 = __importDefault(require("../models/AIAnalysis"));
const User_1 = __importDefault(require("../models/User"));
const responseHandler_1 = require("../utils/responseHandler");
const getDashboardAnalytics = async (req, res) => {
    try {
        const totalTickets = await Ticket_1.default.countDocuments();
        const resolved = await Ticket_1.default.countDocuments({ status: { $in: ['resolved', 'closed'] } });
        const pending = await Ticket_1.default.countDocuments({ status: { $in: ['open', 'in_progress', 'waiting_for_customer'] } });
        const totalCustomers = await User_1.default.countDocuments({ role: 'customer' });
        const resolutionRate = totalTickets > 0 ? ((resolved / totalTickets) * 100).toFixed(1) + '%' : '0%';
        (0, responseHandler_1.sendSuccess)(res, 'Dashboard analytics retrieved', {
            totalTickets,
            resolved,
            pending,
            totalCustomers,
            resolutionRate,
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error fetching analytics', 500);
    }
};
exports.getDashboardAnalytics = getDashboardAnalytics;
const getSentimentAnalytics = async (req, res) => {
    try {
        const sentimentCounts = await Ticket_1.default.aggregate([
            { $group: { _id: '$sentiment', count: { $sum: 1 } } },
        ]);
        const formatted = {};
        sentimentCounts.forEach((item) => {
            formatted[item._id || 'Neutral'] = item.count;
        });
        (0, responseHandler_1.sendSuccess)(res, 'Sentiment analytics retrieved', {
            sentiments: formatted,
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error fetching sentiment analytics', 500);
    }
};
exports.getSentimentAnalytics = getSentimentAnalytics;
const getChurnAnalytics = async (req, res) => {
    try {
        const lowRisk = await AIAnalysis_1.default.countDocuments({ churnScore: { $lt: 0.3 } });
        const mediumRisk = await AIAnalysis_1.default.countDocuments({ churnScore: { $gte: 0.3, $lt: 0.6 } });
        const highRisk = await AIAnalysis_1.default.countDocuments({ churnScore: { $gte: 0.6 } });
        const highRiskTickets = await AIAnalysis_1.default.find({ churnScore: { $gte: 0.6 } })
            .populate('ticketId')
            .limit(10);
        (0, responseHandler_1.sendSuccess)(res, 'Churn risk analytics retrieved', {
            distribution: {
                lowRisk,
                mediumRisk,
                highRisk,
            },
            highRiskTickets,
        });
    }
    catch (error) {
        (0, responseHandler_1.sendError)(res, error.message || 'Error fetching churn analytics', 500);
    }
};
exports.getChurnAnalytics = getChurnAnalytics;
