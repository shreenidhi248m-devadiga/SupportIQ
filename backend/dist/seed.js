"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./config/database");
const User_1 = __importDefault(require("./models/User"));
const Ticket_1 = __importDefault(require("./models/Ticket"));
const Message_1 = __importDefault(require("./models/Message"));
const AIAnalysis_1 = __importDefault(require("./models/AIAnalysis"));
const authService_1 = require("./services/authService");
const generateTicketId_1 = require("./utils/generateTicketId");
const logger_1 = require("./utils/logger");
const seedDatabase = async () => {
    try {
        await (0, database_1.connectDatabase)();
        logger_1.logger.info('Starting SupportIQ Database Seed...');
        // 1. Seed Admin User
        const adminEmail = 'admin@supportiq.com';
        let adminUser = await User_1.default.findOne({ email: adminEmail });
        if (!adminUser) {
            const hashedPassword = await authService_1.AuthService.hashPassword('Admin@123456');
            adminUser = new User_1.default({
                name: 'SupportIQ Admin Lead',
                email: adminEmail,
                password: hashedPassword,
                phone: '+1 (555) 908-2026',
                role: 'admin',
                isActive: true,
            });
            await adminUser.save();
            logger_1.logger.info('Admin user created: admin@supportiq.com / Admin@123456');
        }
        else {
            logger_1.logger.info('Admin user already exists: admin@supportiq.com');
        }
        // 2. Seed Customer User
        const customerEmail = 'john.doe@example.com';
        let customerUser = await User_1.default.findOne({ email: customerEmail });
        if (!customerUser) {
            const hashedPassword = await authService_1.AuthService.hashPassword('Customer@123456');
            customerUser = new User_1.default({
                name: 'John Doe',
                email: customerEmail,
                password: hashedPassword,
                phone: '+1 (555) 123-4567',
                role: 'customer',
                isActive: true,
            });
            await customerUser.save();
            logger_1.logger.info('Customer user created: john.doe@example.com / Customer@123456');
        }
        else {
            logger_1.logger.info('Customer user already exists: john.doe@example.com');
        }
        // 3. Seed Sample Ticket & AI Analysis if no tickets exist
        const ticketCount = await Ticket_1.default.countDocuments();
        if (ticketCount === 0 && customerUser) {
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
                message: 'SupportIQ AI: Ticket #TK-84920 routed to Claims Department.',
                messageType: 'text',
                isAIResponse: true,
            });
            await sampleMsg2.save();
            logger_1.logger.info(`Sample Ticket #${ticketId} & AI Telemetry seeded.`);
        }
        logger_1.logger.info('SupportIQ Database Seeding Complete!');
        process.exit(0);
    }
    catch (error) {
        logger_1.logger.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedDatabase();
