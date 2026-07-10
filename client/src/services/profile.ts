import { api } from './api';
import type { User } from '../types';

export async function getProfile() {
  const { data } = await api.get<{ data: { user: User } }>('/profile');
  return data.data.user;
}

export async function updateProfile(payload: { name?: string; email?: string }) {
  const { data } = await api.put<{ data: { user: User } }>('/profile', payload);
  return data.data.user;
}

export async function changePassword(payload: { currentPassword: string; newPassword: string }) {
  const { data } = await api.put<{ success: boolean; message: string }>('/profile/password', payload);
  return data;
}

export async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append('avatar', file);
  const { data } = await api.post<{ data: { user: User } }>('/profile/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data.data.user;
}
