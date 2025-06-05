import { PetGender, PetSize, PostStatus, PostType } from '@prisma/client';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  whatsapp: string | null;
  instagram: string | null;
  contactPreference: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  updatedAt: Date;
  pets?: Pet[];
  posts?: Post[];
  tokens?: NotificationToken[];
  notifications?: Notification[];
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
  latitude: number | null;
  longitude: number | null;
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
  status: PostStatus;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  updatedAt: Date;
  pet?: Pet;
  user?: User;
  notifications?: Notification[];
};

// Tipos para criação
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  whatsapp?: string;
  instagram?: string;
  contactPreference?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

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
  latitude?: number;
  longitude?: number;
  userId: string;
}

export interface CreatePostDTO {
  title: string;
  content: string;
  petId: string;
  userId: string;
  type: PostType;
  location: string;
  status?: PostStatus;
}

// Tipos para atualização
export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  whatsapp?: string;
  instagram?: string;
  contactPreference?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
}

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
  latitude?: number;
  longitude?: number;
}

export interface UpdatePostDTO {
  title?: string;
  content?: string;
  type?: PostType;
  location?: string;
  status?: PostStatus;
}

// Tipos para resposta (sem senha)
export type UserResponse = Omit<User, 'password'>;
export type PetResponse = Omit<Pet, 'user' | 'posts'> & {
  user: Pick<User, 'id' | 'name' | 'email' | 'avatar' | 'whatsapp' | 'instagram' | 'contactPreference' | 'createdAt' | 'updatedAt'>;
  posts: Pick<Post, 'id' | 'createdAt' | 'updatedAt' | 'type' | 'status' | 'title' | 'content' | 'petId' | 'userId'>[];
};

// Tipos para filtros
export interface PostFilters {
  type?: PostType;
  status?: PostStatus;
  location?: string;
  petType?: string;
  petGender?: string;
  petSize?: string;
  userId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export type Notification = {
  id: string;
  userId: string;
  postId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  user?: User;
  post?: Post;
};

export type NotificationToken = {
  id: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
};
