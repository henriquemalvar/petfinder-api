import { PrismaClient } from '@prisma/client';
import { prisma } from '../config/prisma';
import { USER_SELECT } from '../constants/prismaSelect';
import { PetCreate, PetResponse } from '../types';
import { IRepository } from './interfaces/IRepository';

export class PetRepository implements IRepository<PetResponse> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  async findAll(): Promise<PetResponse[]> {
    const pets = await this.prisma.pet.findMany({
      include: {
        user: {
          select: USER_SELECT
        },
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    return pets;
  }

  async findById(id: string): Promise<PetResponse | null> {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        user: {
          select: USER_SELECT
        },
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    return pet;
  }

  async create(data: PetCreate): Promise<PetResponse> {
    const pet = await this.prisma.pet.create({
      data,
      include: {
        user: {
          select: USER_SELECT
        },
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    return pet;
  }

  async update(id: string, data: Partial<PetCreate>): Promise<PetResponse> {
    const pet = await this.prisma.pet.update({
      where: { id },
      data,
      include: {
        user: {
          select: USER_SELECT
        },
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    return pet;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pet.delete({
      where: { id }
    });
  }

  async findByUserId(userId: string): Promise<PetResponse[]> {
    const pets = await this.prisma.pet.findMany({
      where: { userId },
      include: {
        user: {
          select: USER_SELECT
        },
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    return pets;
  }
} 