import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  ticketId?: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'ticket_created' | 'ticket_updated' | 'ai_response' | 'agent_escalation' | 'churn_alert';
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { 
      type: String, 
      enum: ['ticket_created', 'ticket_updated', 'ai_response', 'agent_escalation', 'churn_alert'], 
      default: 'ticket_created' 
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<INotification>('Notification', NotificationSchema);
