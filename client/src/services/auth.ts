import { api } from './api';
import type { User } from '../types';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post<{ data: AuthResponse }>('/auth/login', payload);
  return data.data;
}

export async function register(payload: { name: string; email: string; password: string; role?: string }) {
  const { data } = await api.post<{ data: AuthResponse }>('/auth/register', payload);
  return data.data;
}

export async function getMe() {
  const { data } = await api.get<{ data: { user: User } }>('/auth/me');
  return data.data.user;
}

export async function logout() {
  await api.post('/auth/logout');
}
