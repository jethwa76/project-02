import { z } from 'zod';

const email = z.string().trim().email().max(120).toLowerCase();
const password = z.string().min(8).max(72).regex(/[A-Z]/, 'Password must include an uppercase letter').regex(/[0-9]/, 'Password must include a number');

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(80),
    email,
    password,
    role: z.enum(['user', 'admin']).optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email,
    password: z.string().min(1).max(72)
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(20).optional()
  })
});
