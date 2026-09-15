import mongoose from 'mongoose';
import { env } from './env';
import { logger } from '../utils/logger';
import User from '../models/User';
import Ticket from '../models/Ticket';
import Message from '../models/Message';
import AIAnalysis from '../models/AIAnalysis';
import { AuthService } from '../services/authService';
import { generateTicketId } from '../utils/generateTicketId';

export const runAutoSeed = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      logger.info('Auto-seeding initial SupportIQ accounts...');
      
      const adminPassword = await AuthService.hashPassword('Admin@123456');
      const adminUser = new User({
        name: 'SupportIQ Admin Lead',
        email: 'admin@supportiq.com',
        password: adminPassword,
        phone: '+1 (555) 908-2026',
        role: 'admin',
        isActive: true,
      });
      await adminUser.save();

      const customerPassword = await AuthService.hashPassword('Customer@123456');
      const customerUser = new User({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: customerPassword,
        phone: '+1 (555) 123-4567',
        role: 'customer',
        isActive: true,
      });
      await customerUser.save();

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
        message: 'SupportIQ AI: Ticket #' + ticketId + ' routed to Claims Department.',
        messageType: 'text',
        isAIResponse: true,
      });
      await sampleMsg2.save();

      logger.info('Auto-seeding complete! Admin: admin@supportiq.com / Admin@123456 | Customer: john.doe@example.com / Customer@123456');
    }
  } catch (err) {
    logger.error('Auto seed error:', err);
  }
};

export const connectDatabase = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    logger.info(`MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
    await runAutoSeed();
  } catch (error) {
    logger.warn('Local MongoDB daemon not detected at ' + env.MONGODB_URI + '. Initializing MongoMemoryServer fallback...');
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      const conn = await mongoose.connect(uri);
      logger.info(`MongoMemoryServer Connected: ${conn.connection.host} / ${conn.connection.name}`);
      await runAutoSeed();
    } catch (memErr) {
      logger.error('Error connecting to MongoDB & MongoMemoryServer:', memErr);
      process.exit(1);
    }
  }
};