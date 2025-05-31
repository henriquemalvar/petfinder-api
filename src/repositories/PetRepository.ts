import { Pet, PrismaClient } from '@prisma/client';
import { PetCreate } from '../types';
import { IRepository } from './interfaces/IRepository';

export class PetRepository implements IRepository<Pet> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<Pet[]> {
    return this.prisma.pet.findMany();
  }

  async findById(id: string): Promise<Pet | null> {
    return this.prisma.pet.findUnique({
      where: { id }
    });
  }

  async create(data: PetCreate): Promise<Pet> {
    return this.prisma.pet.create({
      data
    });
  }

  async update(id: string, data: Partial<PetCreate>): Promise<Pet> {
    return this.prisma.pet.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.pet.delete({
      where: { id }
    });
  }

  async findByUserId(userId: string): Promise<Pet[]> {
    return this.prisma.pet.findMany({
      where: { userId }
    });
  }
} 