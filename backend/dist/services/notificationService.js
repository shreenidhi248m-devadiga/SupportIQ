"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
class NotificationService {
    static async createNotification(userId, title, message, type = 'ticket_created', ticketId) {
        const notification = new Notification_1.default({
            userId,
            ticketId,
            title,
            message,
            type,
            isRead: false,
        });
        return notification.save();
    }
    static async getUserNotifications(userId) {
        return Notification_1.default.find({ userId }).sort({ createdAt: -1 }).limit(50);
    }
    static async markAsRead(notificationId, userId) {
        return Notification_1.default.findOneAndUpdate({ _id: notificationId, userId }, { isRead: true }, { new: true });
    }
}
exports.NotificationService = NotificationService;
