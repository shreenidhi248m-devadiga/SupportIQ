import api from './api';
import { User } from '../types';

export interface AuthResponseData {
  token: string;
  user: User;
}

export interface GenericAuthResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const authApi = {
  loginCustomer: async (email: string, password: string): Promise<AuthResponseData> => {
    const response = await api.post('/auth/login', { email, password });
    const resData = response.data;
    return {
      token: resData.token || resData.data?.token,
      user: resData.user || resData.data?.user,
    };
  },

  loginAdmin: async (email: string, password: string): Promise<AuthResponseData> => {
    const response = await api.post('/auth/admin-login', { email, password });
    const resData = response.data;
    return {
      token: resData.token || resData.data?.token,
      user: resData.user || resData.data?.user,
    };
  },

  registerCustomer: async (data: { name: string; email: string; password: string; phone?: string }): Promise<AuthResponseData> => {
    const response = await api.post('/auth/register', data);
    const resData = response.data;
    return {
      token: resData.token || resData.data?.token,
      user: resData.user || resData.data?.user,
    };
  },

  forgotPassword: async (email: string): Promise<GenericAuthResponse> => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (data: { email?: string; token?: string; newPassword: string }): Promise<GenericAuthResponse> => {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  verifyEmail: async (data: { email?: string; token?: string }): Promise<GenericAuthResponse> => {
    const response = await api.post('/auth/verify-email', data);
    return response.data;
  },
};

export default authApi;
