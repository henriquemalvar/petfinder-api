import { Post, PrismaClient } from '@prisma/client';
import { CreatePostDTO } from '../types';
import { IRepository } from './interfaces/IRepository';

export class PostRepository implements IRepository<Post> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        pet: true,
        user: true
      }
    });
  }

  async findById(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        pet: true,
        user: true
      }
    });
  }

  async create(data: CreatePostDTO): Promise<Post> {
    return this.prisma.post.create({
      data,
      include: {
        pet: true,
        user: true
      }
    });
  }

  async update(id: string, data: Partial<CreatePostDTO>): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data,
      include: {
        pet: true,
        user: true
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: { id }
    });
  }

  async findByUserId(userId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { userId },
      include: {
        pet: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findByPetId(petId: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { petId },
      include: {
        pet: true,
        user: true
      }
    });
  }
} 