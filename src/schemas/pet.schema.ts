import { z } from 'zod';

export const petGenderEnum = z.enum(['MALE', 'FEMALE']);
export const petSizeEnum = z.enum(['SMALL', 'MEDIUM', 'LARGE']);

export const createPetSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  type: z.string().min(2, 'Tipo deve ter no mínimo 2 caracteres'),
  breed: z.string().min(2, 'Raça deve ter no mínimo 2 caracteres'),
  age: z.string().min(1, 'Idade é obrigatória'),
  gender: petGenderEnum,
  size: petSizeEnum,
  image: z.string().url('URL inválida').optional(),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  castrated: z.boolean(),
  vaccinated: z.boolean(),
  location: z.string().min(2, 'Localização deve ter no mínimo 2 caracteres'),
  userId: z.string().uuid('ID de usuário inválido')
});

export const updatePetSchema = createPetSchema.partial();

export type CreatePetInput = z.infer<typeof createPetSchema>;
export type UpdatePetInput = z.infer<typeof updatePetSchema>; 