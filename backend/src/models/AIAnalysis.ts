import mongoose, { Schema, Document } from 'mongoose';

export interface IAIAnalysis extends Document {
  ticketId: mongoose.Types.ObjectId;
  intent: string;
  category: string;
  department: string;
  sentiment: string;
  sentimentScore: number;
  priority: string;
  confidence: number;
  aiResponse: string;
  churnScore: number;
  analyzedAt: Date;
}

const AIAnalysisSchema: Schema = new Schema(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true, unique: true, index: true },
    intent: { type: String, required: true },
    category: { type: String, required: true },
    department: { type: String, required: true },
    sentiment: { type: String, required: true },
    sentimentScore: { type: Number, required: true },
    priority: { type: String, required: true },
    confidence: { type: Number, required: true, default: 0.95 },
    aiResponse: { type: String, required: true },
    churnScore: { type: Number, required: true, default: 0.15 },
    analyzedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export default mongoose.model<IAIAnalysis>('AIAnalysis', AIAnalysisSchema);
