import { api } from './api';
import type { Item } from '../types';

export interface ItemFilters {
  page?: number;
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: string;
}

export async function fetchItems(filters: ItemFilters = {}) {
  const { data } = await api.get('/items', { params: filters });
  return data.data as { items: Item[]; pagination: { page: number; pages: number; total: number; limit: number } };
}

export async function createItem(payload: Partial<Item>) {
  const { data } = await api.post('/items', payload);
  return data.data.item as Item;
}

export async function updateItem(id: string, payload: Partial<Item>) {
  const { data } = await api.put(`/items/${id}`, payload);
  return data.data.item as Item;
}

export async function deleteItem(id: string) {
  await api.delete(`/items/${id}`);
}

export async function fetchItemStats() {
  const { data } = await api.get('/items/stats');
  return data.data;
}

export function exportItemsCsv() {
  window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/items/export/csv`;
}
