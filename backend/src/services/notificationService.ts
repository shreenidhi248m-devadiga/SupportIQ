import Notification, { INotification } from '../models/Notification';
import mongoose from 'mongoose';

export class NotificationService {
  static async createNotification(
    userId: string | mongoose.Types.ObjectId,
    title: string,
    message: string,
    type: 'ticket_created' | 'ticket_updated' | 'ai_response' | 'agent_escalation' | 'churn_alert' = 'ticket_created',
    ticketId?: string | mongoose.Types.ObjectId
  ): Promise<INotification> {
    const notification = new Notification({
      userId,
      ticketId,
      title,
      message,
      type,
      isRead: false,
    });

    return notification.save();
  }

  static async getUserNotifications(userId: string) {
    return Notification.find({ userId }).sort({ createdAt: -1 }).limit(50);
  }

  static async markAsRead(notificationId: string, userId: string) {
    return Notification.findOneAndUpdate(
      { _id: notificationId, userId },
      { isRead: true },
      { new: true }
    );
  }
}
