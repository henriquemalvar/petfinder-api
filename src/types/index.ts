import { PostStatus, PostType } from '@prisma/client';

export enum PetGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum PetSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE'
}

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  whatsapp: string | null;
  instagram: string | null;
  contactPreference: string | null;
  createdAt: Date;
  updatedAt: Date;
  pets?: Pet[];
  posts?: Post[];
};

export type Pet = {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: PetGender;
  size: PetSize;
  image: string | null;
  description: string;
  castrated: boolean;
  vaccinated: boolean;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
  posts?: Post[];
};

export type PetCreate = Omit<Pet, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'posts'> & {
  gender: PetGender;
  size: PetSize;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  petId: string;
  userId: string;
  type: PostType;
  location: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  pet?: Pet;
  user?: User;
};

// Tipos para criação
export type CreateUserDTO = Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'pets' | 'posts'>;
export interface CreatePetDTO {
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: PetGender;
  size: PetSize;
  image?: string;
  description: string;
  castrated: boolean;
  vaccinated: boolean;
  location: string;
  userId: string;
}
export type CreatePostDTO = Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'pet' | 'user'>;

// Tipos para atualização
export type UpdateUserDTO = Partial<CreateUserDTO>;
export interface UpdatePetDTO {
  name?: string;
  type?: string;
  breed?: string;
  age?: string;
  gender?: PetGender;
  size?: PetSize;
  image?: string;
  description?: string;
  castrated?: boolean;
  vaccinated?: boolean;
  location?: string;
}
export type UpdatePostDTO = Partial<CreatePostDTO>;

// Tipos para resposta (sem senha)
export type UserResponse = Omit<User, 'password'>;
export type PetResponse = Pet; 