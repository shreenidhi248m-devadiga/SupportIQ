import mongoose, { Schema, Document } from 'mongoose';

export interface IAttachment extends Document {
  ticketId: mongoose.Types.ObjectId;
  uploadedBy: mongoose.Types.ObjectId;
  fileName: string;
  fileType: string;
  filePath: string;
  fileSize: number;
  extractedText?: string;
  createdAt: Date;
}

const AttachmentSchema: Schema = new Schema(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket', required: true, index: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    filePath: { type: String, required: true },
    fileSize: { type: Number, required: true },
    extractedText: { type: String, default: '' },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IAttachment>('Attachment', AttachmentSchema);
