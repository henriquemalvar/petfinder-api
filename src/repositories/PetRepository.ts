import { PrismaClient } from '@prisma/client';
import { PetCreate, PetResponse } from '../types';
import { IRepository } from './interfaces/IRepository';

export class PetRepository implements IRepository<PetResponse> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<PetResponse[]> {
    const pets = await this.prisma.pet.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
    return pets as PetResponse[];
  }

  async findById(id: string): Promise<PetResponse | null> {
    const pet = await this.prisma.pet.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
    return pet as PetResponse | null;
  }

  async create(data: PetCreate): Promise<PetResponse> {
    const pet = await this.prisma.pet.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
    return pet as PetResponse;
  }

  async update(id: string, data: Partial<PetCreate>): Promise<PetResponse> {
    const pet = await this.prisma.pet.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
    return pet as PetResponse;
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
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            whatsapp: true,
            instagram: true,
            contactPreference: true,
            createdAt: true,
            updatedAt: true
          }
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
    return pets as PetResponse[];
  }
} 