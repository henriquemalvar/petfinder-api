import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres')
  })
});

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    whatsapp: z.string().optional(),
    instagram: z.string().optional(),
    contactPreference: z.enum(['WHATSAPP', 'INSTAGRAM']).optional(),
    avatar: z.string().optional()
  })
}); 