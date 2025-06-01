import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    avatar: z.string().url('URL inválida').optional(),
    whatsapp: z.string().optional(),
    instagram: z.string().optional(),
    contactPreference: z.string().optional()
  })
});

export const updateUserSchema = createUserSchema.partial();

export const userIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID de usuário inválido')
  })
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body']; 