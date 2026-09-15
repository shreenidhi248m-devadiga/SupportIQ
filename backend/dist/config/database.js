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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.runAutoSeed = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
const User_1 = __importDefault(require("../models/User"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Message_1 = __importDefault(require("../models/Message"));
const AIAnalysis_1 = __importDefault(require("../models/AIAnalysis"));
const authService_1 = require("../services/authService");
const generateTicketId_1 = require("../utils/generateTicketId");
const runAutoSeed = async () => {
    try {
        const userCount = await User_1.default.countDocuments();
        if (userCount === 0) {
            logger_1.logger.info('Auto-seeding initial SupportIQ accounts...');
            const adminPassword = await authService_1.AuthService.hashPassword('Admin@123456');
            const adminUser = new User_1.default({
                name: 'SupportIQ Admin Lead',
                email: 'admin@supportiq.com',
                password: adminPassword,
                phone: '+1 (555) 908-2026',
                role: 'admin',
                isActive: true,
            });
            await adminUser.save();
            const customerPassword = await authService_1.AuthService.hashPassword('Customer@123456');
            const customerUser = new User_1.default({
                name: 'John Doe',
                email: 'john.doe@example.com',
                password: customerPassword,
                phone: '+1 (555) 123-4567',
                role: 'customer',
                isActive: true,
            });
            await customerUser.save();
            const ticketId = (0, generateTicketId_1.generateTicketId)();
            const sampleTicket = new Ticket_1.default({
                ticketId,
                customerId: customerUser._id,
                subject: 'Vehicle Accident Insurance Claim Request',
                description: 'My car met with an accident and I want to claim insurance. Front bumper damage photo attached.',
                inputType: 'image',
                category: 'Claims',
                department: 'Claims',
                priority: 'high',
                status: 'open',
                sentiment: 'Frustrated / High Urgency',
                aiConfidence: 0.98,
                assignedTo: 'Sarah Jenkins (Claims Lead)',
            });
            await sampleTicket.save();
            const sampleAnalysis = new AIAnalysis_1.default({
                ticketId: sampleTicket._id,
                intent: 'Accident Insurance Claim',
                category: 'Claims',
                department: 'Claims',
                sentiment: 'Frustrated / High Urgency',
                sentimentScore: -0.85,
                priority: 'high',
                confidence: 0.98,
                aiResponse: 'SupportIQ AI: Your accident claim request has been routed to Claims Dept with High Priority.',
                churnScore: 0.72,
            });
            await sampleAnalysis.save();
            const sampleMsg1 = new Message_1.default({
                ticketId: sampleTicket._id,
                senderId: customerUser._id,
                senderRole: 'customer',
                message: 'My car met with an accident and I want to claim insurance.',
                messageType: 'image',
                isAIResponse: false,
            });
            await sampleMsg1.save();
            const sampleMsg2 = new Message_1.default({
                ticketId: sampleTicket._id,
                senderRole: 'ai',
                message: 'SupportIQ AI: Ticket #' + ticketId + ' routed to Claims Department.',
                messageType: 'text',
                isAIResponse: true,
            });
            await sampleMsg2.save();
            logger_1.logger.info('Auto-seeding complete! Admin: admin@supportiq.com / Admin@123456 | Customer: john.doe@example.com / Customer@123456');
        }
    }
    catch (err) {
        logger_1.logger.error('Auto seed error:', err);
    }
};
exports.runAutoSeed = runAutoSeed;
const connectDatabase = async () => {
    try {
        const conn = await mongoose_1.default.connect(env_1.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 3000,
        });
        logger_1.logger.info(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
        await (0, exports.runAutoSeed)();
    }
    catch (error) {
        logger_1.logger.warn('Local MongoDB daemon not detected at ' + env_1.env.MONGODB_URI + '. Initializing MongoMemoryServer fallback...');
        try {
            const { MongoMemoryServer } = await Promise.resolve().then(() => __importStar(require('mongodb-memory-server')));
            const mongod = await MongoMemoryServer.create();
            const uri = mongod.getUri();
            const conn = await mongoose_1.default.connect(uri);
            logger_1.logger.info(`MongoMemoryServer Connected: ${conn.connection.host} / ${conn.connection.name}`);
            await (0, exports.runAutoSeed)();
        }
        catch (memErr) {
            logger_1.logger.error('Error connecting to MongoDB & MongoMemoryServer:', memErr);
            process.exit(1);
        }
    }
};
exports.connectDatabase = connectDatabase;
