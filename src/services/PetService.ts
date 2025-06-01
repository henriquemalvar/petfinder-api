import { PrismaClient } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { PetRepository } from '../repositories/PetRepository';
import { CreatePetDTO, PetCreate, PetResponse, UpdatePetDTO } from '../types';

export class PetService {
  private repository: PetRepository;
  private prisma: PrismaClient;

  constructor() {
    this.repository = new PetRepository();
    this.prisma = new PrismaClient();
  }

  async findAll(): Promise<PetResponse[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<PetResponse> {
    const pet = await this.repository.findById(id);

    if (!pet) {
      throw new AppError('Pet não encontrado', StatusCodes.NOT_FOUND);
    }

    return pet;
  }

  async create(data: CreatePetDTO): Promise<PetResponse> {
    return this.repository.create(data as PetCreate);
  }

  async update(id: string, data: UpdatePetDTO): Promise<PetResponse> {
    const pet = await this.repository.findById(id);

    if (!pet) {
      throw new AppError('Pet não encontrado', StatusCodes.NOT_FOUND);
    }

    return this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const pet = await this.repository.findById(id);

    if (!pet) {
      throw new AppError('Pet não encontrado', StatusCodes.NOT_FOUND);
    }

    await this.repository.delete(id);
  }

  async findByUserId(userId: string): Promise<PetResponse[]> {
    // Verifica se o usuário existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new AppError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    return this.repository.findByUserId(userId);
  }
} 