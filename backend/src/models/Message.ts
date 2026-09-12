import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  ticketId: mongoose.Types.ObjectId;
  senderId?: mongoose.Types.ObjectId;
  senderRole: 'customer' | 'admin' | 'ai';
  message: string;
  messageType: 'text' | 'voice' | 'image' | 'document';
  isAIResponse: boolean;
  createdAt: Date;
}

const MessageSchema: Schema = new Schema(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true, index: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' },
    senderRole: { type: String, enum: ['customer', 'admin', 'ai'], required: true },
    message: { type: String, required: true },
    messageType: { type: String, enum: ['text', 'voice', 'image', 'document'], default: 'text' },
    isAIResponse: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
