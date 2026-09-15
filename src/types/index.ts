export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone?: string;
  avatar?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  totalTickets?: number;
  openTickets?: number;
  resolvedTickets?: number;
  sentiment?: string;
  churnScore?: number;
  riskLevel?: 'Low' | 'Medium' | 'High';
}

export interface Ticket {
  _id: string;
  ticketId: string;
  customerId: User | string;
  subject: string;
  description: string;
  inputType: 'text' | 'voice' | 'image' | 'document';
  category: string;
  department: 'Claims' | 'Billing' | 'Technical Support' | 'Account Security' | 'General Support';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'waiting_for_customer' | 'resolved' | 'closed';
  sentiment: string;
  aiConfidence?: number;
  assignedTo?: string;
  createdAt: string;
  updatedAt?: string;
  resolvedAt?: string;
}

export interface Message {
  _id: string;
  ticketId: string;
  senderId?: User | string;
  senderRole: 'customer' | 'admin' | 'ai';
  message: string;
  messageType: 'text' | 'voice' | 'image' | 'document';
  isAIResponse: boolean;
  createdAt: string;
}

export interface AIAnalysis {
  _id?: string;
  ticketId?: string;
  intent: string;
  category: string;
  department: 'Claims' | 'Billing' | 'Technical Support' | 'Account Security' | 'General Support';
  sentiment: string;
  sentimentScore: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  aiResponse: string;
  churnScore: number;
  transcribedText?: string;
  extractedText?: string;
}

export interface NotificationItem {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'ticket_update' | 'ai_alert' | 'system';
  isRead: boolean;
  createdAt: string;
}

export interface AdminAnalytics {
  totalCustomers: number;
  totalTickets: number;
  openTickets: number;
  resolvedTickets: number;
  pendingTickets: number;
  resolutionRate: string;
  aiResolutionRate: string;
  ticketsByDepartment: Record<string, number>;
  ticketsByPriority: Record<string, number>;
  sentimentDistribution: Record<string, number>;
  ticketTrends: Array<{ day: string; tickets: number }>;
}

export interface CustomerIntelligence {
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    createdAt?: string;
  };
  activity: {
    totalTickets: number;
    openTickets: number;
    resolvedTickets: number;
    complaintFrequency: string;
    resolutionTimeAvg: string;
    churnScore: number;
    riskLevel: 'Low' | 'Medium' | 'High';
  };
  ticketHistory: Ticket[];
  sentimentHistory: Array<{
    date: string;
    sentiment: string;
    priority: string;
    subject: string;
  }>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}