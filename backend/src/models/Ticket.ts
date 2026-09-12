import mongoose, { Schema, Document } from 'mongoose';

export type InputType = 'text' | 'voice' | 'image' | 'document';
export type TicketStatus = 'open' | 'in_progress' | 'waiting_for_customer' | 'resolved' | 'closed';
export type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';
export type DepartmentName = 'Billing' | 'Technical Support' | 'Claims' | 'General Support' | 'Account' | 'Other';

export interface ITicket extends Document {
  ticketId: string;
  customerId: mongoose.Types.ObjectId;
  subject: string;
  description: string;
  inputType: InputType;
  category: string;
  department: DepartmentName;
  priority: PriorityLevel;
  status: TicketStatus;
  sentiment: string;
  aiConfidence: number;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

const TicketSchema: Schema = new Schema(
  {
    ticketId: { type: String, required: true, unique: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    inputType: { 
      type: String, 
      enum: ['text', 'voice', 'image', 'document'], 
      default: 'text' 
    },
    category: { type: String, default: 'General Support' },
    department: { 
      type: String, 
      enum: ['Billing', 'Technical Support', 'Claims', 'General Support', 'Account', 'Other'], 
      default: 'General Support',
      index: true 
    },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high', 'critical'], 
      default: 'medium',
      index: true 
    },
    status: { 
      type: String, 
      enum: ['open', 'in_progress', 'waiting_for_customer', 'resolved', 'closed'], 
      default: 'open',
      index: true 
    },
    sentiment: { type: String, default: 'Neutral' },
    aiConfidence: { type: Number, default: 0.95 },
    assignedTo: { type: String, default: 'Unassigned' },
    resolvedAt: { type: Date },
  },
  { timestamps: true }
);

// Indexes
TicketSchema.index({ createdAt: -1 });
TicketSchema.index({ customerId: 1, status: 1 });

export default mongoose.model<ITicket>('Ticket', TicketSchema);
