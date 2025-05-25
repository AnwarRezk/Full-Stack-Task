import axios from 'axios';
import type { SignInFormData, AuthResponse, SignUpFormData } from '../types/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  signUp: async (data: SignUpFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/sign-up', data);
    return response.data;
  },

  signIn: async (data: SignInFormData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/sign-in', data);
    return response.data;
  },

  signOut: async (): Promise<{ success: boolean; message: string }> => {
    const response = await api.post<{ success: boolean; message: string }>('/auth/sign-out');
    return response.data;
  },

  getProfile: async (): Promise<{
    _id: string;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getWelcomeMessage: async (): Promise<{
    message: string;
    status: string;
  }> => {
    const response = await api.get('/');
    return response.data;
  },
};

export default api; 