import { Post } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { PostRepository } from '../repositories/PostRepository';
import { CreatePostDTO, UpdatePostDTO } from '../types';

export class PostService {
  private repository: PostRepository;

  constructor() {
    this.repository = new PostRepository();
  }

  async findAll(): Promise<Post[]> {
    return this.repository.findAll();
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
    return this.repository.findByUserId(userId);
  }

  async findByPetId(petId: string): Promise<Post[]> {
    return this.repository.findByPetId(petId);
  }
} 