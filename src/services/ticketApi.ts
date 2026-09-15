import api from './api';
import { Ticket, Message, AIAnalysis, ApiResponse } from '../types';

export interface CreateTicketResponseData {
  ticketId: string;
  status: string;
  department: string;
  priority: string;
  sentiment: string;
  aiResponse: string;
  aiAnalysis: AIAnalysis;
}

export interface TicketDetailsResponseData {
  ticket: Ticket;
  aiAnalysis: AIAnalysis;
  attachments: any[];
  messages: Message[];
}

export const ticketApi = {
  createTicket: async (formData: FormData): Promise<CreateTicketResponseData> => {
    const response = await api.post<ApiResponse<CreateTicketResponseData>>('/tickets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  getMyTickets: async (): Promise<Ticket[]> => {
    const response = await api.get<ApiResponse<Ticket[]>>('/tickets/my-tickets');
    return response.data.data;
  },

  getTicket: async (ticketId: string): Promise<TicketDetailsResponseData> => {
    const response = await api.get<ApiResponse<TicketDetailsResponseData>>(`/tickets/${ticketId}`);
    return response.data.data;
  },

  sendMessage: async (ticketId: string, message: string, messageType: string = 'text'): Promise<Message> => {
    const response = await api.post<ApiResponse<Message>>(`/tickets/${ticketId}/messages`, {
      message,
      messageType,
    });
    return response.data.data;
  },

  getMessages: async (ticketId: string): Promise<Message[]> => {
    const response = await api.get<ApiResponse<Message[]>>(`/tickets/${ticketId}/messages`);
    return response.data.data;
  },
};

export default ticketApi;