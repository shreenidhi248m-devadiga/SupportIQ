"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const TicketSchema = new mongoose_1.Schema({
    ticketId: { type: String, required: true, unique: true, index: true },
    customerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
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
}, { timestamps: true });
// Indexes
TicketSchema.index({ createdAt: -1 });
TicketSchema.index({ customerId: 1, status: 1 });
exports.default = mongoose_1.default.model('Ticket', TicketSchema);
