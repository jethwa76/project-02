import { z } from 'zod';

export const itemQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().max(120).optional(),
    status: z.enum(['lead', 'qualified', 'proposal', 'won', 'lost']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    sortBy: z.enum(['createdAt', 'title', 'value', 'status', 'priority']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc')
  })
});

const itemBody = z.object({
  title: z.string().trim().min(2).max(120),
  company: z.string().trim().min(2).max(120),
  value: z.coerce.number().min(0),
  status: z.enum(['lead', 'qualified', 'proposal', 'won', 'lost']).default('lead'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  closeDate: z.coerce.date().optional(),
  tags: z.array(z.string().trim().min(1).max(30)).max(10).default([])
});

export const createItemSchema = z.object({ body: itemBody });
export const updateItemSchema = z.object({ body: itemBody.partial() });
export const idParamSchema = z.object({ params: z.object({ id: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid id') }) });
