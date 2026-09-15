import api from './api';
import { User, NotificationItem, ApiResponse } from '../types';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/users/profile');
    return response.data.data;
  },

  updateProfile: async (data: { name?: string; phone?: string; avatar?: string }): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/users/profile', data);
    return response.data.data;
  },

  getNotifications: async (): Promise<NotificationItem[]> => {
    const response = await api.get<ApiResponse<NotificationItem[]>>('/users/notifications');
    return response.data.data;
  },
};

export default userApi;