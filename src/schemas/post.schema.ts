import { z } from 'zod';

export const postTypeEnum = z.enum(['LOST', 'FOUND', 'ADOPTION']);
export const postStatusEnum = z.enum(['ACTIVE', 'RESOLVED', 'CANCELED']);

export const createPostSchema = z.object({
  petId: z.string().uuid('ID de pet inválido'),
  userId: z.string().uuid('ID de usuário inválido'),
  type: postTypeEnum,
  location: z.string().min(2, 'Localização deve ter no mínimo 2 caracteres'),
  status: postStatusEnum
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>; 