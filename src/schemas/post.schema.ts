import { z } from 'zod';

export const postTypeEnum = z.enum(['LOST', 'FOUND', 'ADOPTION']);
export const postStatusEnum = z.enum(['ACTIVE', 'RESOLVED', 'CANCELED']);

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
    content: z.string().min(10, 'Conteúdo deve ter no mínimo 10 caracteres'),
    petId: z.string().uuid('ID de pet inválido'),
    type: postTypeEnum,
    location: z.string().min(2, 'Localização deve ter no mínimo 2 caracteres'),
    status: postStatusEnum
  })
});

export const updatePostSchema = createPostSchema.partial();

export const postIdParamSchema = z.object({
  params: z.object({
    id: z.string().uuid('ID de post inválido')
  })
});

export const userIdParamSchema = z.object({
  params: z.object({
    userId: z.string().uuid('ID de usuário inválido')
  })
});

export const petIdParamSchema = z.object({
  params: z.object({
    petId: z.string().uuid('ID de pet inválido')
  })
});

export type CreatePostInput = z.infer<typeof createPostSchema>['body'];
export type UpdatePostInput = z.infer<typeof updatePostSchema>['body']; 