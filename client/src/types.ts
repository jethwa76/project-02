export type Role = 'admin' | 'user';
export type Status = 'lead' | 'qualified' | 'proposal' | 'won' | 'lost';
export type Priority = 'low' | 'medium' | 'high';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Item {
  _id: string;
  title: string;
  company: string;
  value: number;
  status: Status;
  priority: Priority;
  closeDate?: string;
  tags: string[];
  owner: User;
  createdAt: string;
}
