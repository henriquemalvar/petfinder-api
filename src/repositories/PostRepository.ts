import { Post, PrismaClient } from '@prisma/client';
import { CreatePostDTO, PostFilters, UpdatePostDTO } from '../types';
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
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true
          }
        }
      }
    });
  }

  async findById(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        pet: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true
          }
        }
      }
    });
  }

  async create(data: CreatePostDTO): Promise<Post> {
    return this.prisma.post.create({
      data,
      include: {
        pet: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true
          }
        }
      }
    });
  }

  async findAllWithFilters(filters: PostFilters) {
    const {
      type,
      status,
      location,
      petType,
      petGender,
      petSize,
      userId,
      search,
      page = 1,
      limit = 10
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = {
      ...(type && { type }),
      ...(status && { status }),
      ...(location && { location: { contains: location, mode: 'insensitive' } }),
      ...(userId && { userId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(petType && { pet: { type: petType } }),
      ...(petGender && { pet: { gender: petGender } }),
      ...(petSize && { pet: { size: petSize } })
    };

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          pet: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
              whatsapp: true,
              instagram: true,
              contactPreference: true
            }
          }
        }
      }),
      this.prisma.post.count({ where })
    ]);

    return {
      posts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async update(id: string, data: UpdatePostDTO): Promise<Post> {
    return this.prisma.post.update({
      where: { id },
      data,
      include: {
        pet: true,
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true
          }
        }
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
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true
          }
        }
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
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true
          }
        }
      }
    });
  }
} 