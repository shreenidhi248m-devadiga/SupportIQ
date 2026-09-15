import api from './api';
import { Ticket, User, AdminAnalytics, CustomerIntelligence, ApiResponse } from '../types';

export interface AdminTicketsResponseData {
  tickets: Ticket[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const adminApi = {
  getAnalytics: async (): Promise<AdminAnalytics> => {
    const response = await api.get<ApiResponse<AdminAnalytics>>('/admin/analytics');
    return response.data.data;
  },

  getAllTickets: async (params?: {
    status?: string;
    department?: string;
    priority?: string;
    sentiment?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<AdminTicketsResponseData> => {
    const response = await api.get<ApiResponse<AdminTicketsResponseData>>('/admin/tickets', { params });
    return response.data.data;
  },

  updateTicketStatus: async (
    ticketId: string,
    data: { status?: string; department?: string; assignedTo?: string; priority?: string }
  ): Promise<Ticket> => {
    const response = await api.put<ApiResponse<Ticket>>(`/admin/tickets/${ticketId}`, data);
    return response.data.data;
  },

  getAllCustomers: async (): Promise<User[]> => {
    const response = await api.get<ApiResponse<User[]>>('/admin/customers');
    return response.data.data;
  },

  getCustomerIntelligence: async (customerId: string): Promise<CustomerIntelligence> => {
    const response = await api.get<ApiResponse<CustomerIntelligence>>(`/admin/customers/${customerId}/intelligence`);
    return response.data.data;
  },
};

export default adminApi;