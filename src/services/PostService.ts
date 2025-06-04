import { Post } from '@prisma/client';
import { prisma } from '../config/prisma';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { PostRepository } from '../repositories/PostRepository';
import { CreatePostDTO, PostFilters, UpdatePostDTO } from '../types';
import { NotificationService } from './NotificationService';

export class PostService {
  private repository: PostRepository;
  private notificationService: NotificationService;

  constructor() {
    this.repository = new PostRepository();
    this.notificationService = new NotificationService();
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
    const post = await this.repository.create(data);
    await this.notificationService.notifyNearbyUsers(post);
    return post;
  }

  async update(id: string, data: UpdatePostDTO): Promise<Post> {
    const post = await this.repository.findById(id);

    if (!post) {
      throw new AppError('Post não encontrado', StatusCodes.NOT_FOUND);
    }

    const updated = await this.repository.update(id, data);
    await this.notificationService.notifyNearbyUsers(updated);
    return updated;
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
    const user = await prisma.user.findUnique({
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