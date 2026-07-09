import { api } from './api';
import type { User } from '../types';

export async function fetchAnalytics() {
  const { data } = await api.get('/analytics/dashboard');
  return data.data as {
    users: number;
    records: number;
    statusBreakdown: Array<{ _id: string; count: number; value: number }>;
    monthly: Array<{ _id: { month: number; year: number }; count: number; value: number }>;
  };
}

export async function fetchUsers(search = '') {
  const { data } = await api.get('/users', { params: { search } });
  return data.data.users as User[];
}

export async function fetchActivity() {
  const { data } = await api.get('/users/activity');
  return data.data.activity as Array<{ _id: string; action: string; createdAt: string; actor?: User }>;
}
