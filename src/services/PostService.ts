import { Post, PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { PostRepository } from '../repositories/PostRepository';
import { CreatePostDTO, PostFilters, UpdatePostDTO } from '../types';
import { prisma } from '../config/prisma';

export class PostService {
  private repository: PostRepository;
  private prisma: PrismaClient;

  constructor() {
    this.repository = new PostRepository();
    this.prisma = prisma;
  }

  async findAll(): Promise<Post[]> {
    return this.repository.findAll();
  }

  async findAllWithFilters(filters: PostFilters) {
    return this.repository.findAllWithFilters(filters);
  }

  async findById(id: string): Promise<Post> {
    const post = await this.repository.findById(id);

    if (!post) {
      throw new AppError('Post não encontrado', StatusCodes.NOT_FOUND);
    }

    return post;
  }

  async create(data: CreatePostDTO): Promise<Post> {
    return this.repository.create(data);
  }

  async update(id: string, data: UpdatePostDTO): Promise<Post> {
    const post = await this.repository.findById(id);

    if (!post) {
      throw new AppError('Post não encontrado', StatusCodes.NOT_FOUND);
    }

    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const post = await this.repository.findById(id);

    if (!post) {
      throw new AppError('Post não encontrado', StatusCodes.NOT_FOUND);
    }

    await this.repository.delete(id);
  }

  async findByUserId(userId: string): Promise<Post[]> {
    // Verifica se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    // Busca os posts ordenados por data de criação (mais recentes primeiro)
    return this.repository.findByUserId(userId);
  }

  async findByPetId(petId: string): Promise<Post[]> {
    return this.repository.findByPetId(petId);
  }
} 