import mongoose from 'mongoose';
import { connectDatabase } from './config/database';
import User from './models/User';
import Ticket from './models/Ticket';
import Message from './models/Message';
import AIAnalysis from './models/AIAnalysis';
import { AuthService } from './services/authService';
import { generateTicketId } from './utils/generateTicketId';
import { logger } from './utils/logger';

const seedDatabase = async () => {
  try {
    await connectDatabase();
    logger.info('Starting SupportIQ Database Seed...');

    // 1. Seed Admin User
    const adminEmail = 'admin@supportiq.com';
    let adminUser = await User.findOne({ email: adminEmail });

    if (!adminUser) {
      const hashedPassword = await AuthService.hashPassword('Admin@123456');
      adminUser = new User({
        name: 'SupportIQ Admin Lead',
        email: adminEmail,
        password: hashedPassword,
        phone: '+1 (555) 908-2026',
        role: 'admin',
        isActive: true,
      });
      await adminUser.save();
      logger.info('Admin user created: admin@supportiq.com / Admin@123456');
    } else {
      logger.info('Admin user already exists: admin@supportiq.com');
    }

    // 2. Seed Customer User
    const customerEmail = 'john.doe@example.com';
    let customerUser = await User.findOne({ email: customerEmail });

    if (!customerUser) {
      const hashedPassword = await AuthService.hashPassword('Customer@123456');
      customerUser = new User({
        name: 'John Doe',
        email: customerEmail,
        password: hashedPassword,
        phone: '+1 (555) 123-4567',
        role: 'customer',
        isActive: true,
      });
      await customerUser.save();
      logger.info('Customer user created: john.doe@example.com / Customer@123456');
    } else {
      logger.info('Customer user already exists: john.doe@example.com');
    }

    // 3. Seed Sample Ticket & AI Analysis if no tickets exist
    const ticketCount = await Ticket.countDocuments();
    if (ticketCount === 0 && customerUser) {
      const ticketId = generateTicketId();

      const sampleTicket = new Ticket({
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

      const sampleAnalysis = new AIAnalysis({
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

      const sampleMsg1 = new Message({
        ticketId: sampleTicket._id,
        senderId: customerUser._id,
        senderRole: 'customer',
        message: 'My car met with an accident and I want to claim insurance.',
        messageType: 'image',
        isAIResponse: false,
      });
      await sampleMsg1.save();

      const sampleMsg2 = new Message({
        ticketId: sampleTicket._id,
        senderRole: 'ai',
        message: 'SupportIQ AI: Ticket #TK-84920 routed to Claims Department.',
        messageType: 'text',
        isAIResponse: true,
      });
      await sampleMsg2.save();

      logger.info(`Sample Ticket #${ticketId} & AI Telemetry seeded.`);
    }

    logger.info('SupportIQ Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();