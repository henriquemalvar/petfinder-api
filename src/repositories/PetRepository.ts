import { Pet, PrismaClient } from '@prisma/client';
import { PetCreate, PetResponse } from '../types';
import { IRepository } from './interfaces/IRepository';

export class PetRepository implements IRepository<Pet> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<PetResponse[]> {
    return this.prisma.pet.findMany({
      include: {
        user: true
      }
    });
  }

  async findById(id: string): Promise<PetResponse | null> {
    return this.prisma.pet.findUnique({
      where: { id },
      include: {
        user: true
      }
    });
  }

  async create(data: PetCreate): Promise<PetResponse> {
    return this.prisma.pet.create({
      data,
      include: {
        user: true
      }
    });
  }

  async update(id: string, data: Partial<PetCreate>): Promise<PetResponse> {
    return this.prisma.pet.update({
      where: { id },
      data,
      include: {
        user: true
      }
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pet.delete({
      where: { id }
    });
  }

  async findByUserId(userId: string): Promise<PetResponse[]> {
    return this.prisma.pet.findMany({
      where: { userId },
      include: {
        user: true
      }
    });
  }
} 