import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO, UpdateUserDTO, UserResponse } from '../types';

export class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async findAll(): Promise<UserResponse[]> {
    const users = await this.repository.findAll();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async create(data: CreateUserDTO): Promise<UserResponse> {
    const userExists = await this.repository.findByEmail(data.email);

    if (userExists) {
      throw new AppError('Email já está em uso', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.repository.create({
      ...data,
      password: hashedPassword
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findById(id: string): Promise<UserResponse> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserResponse> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    if (data.email) {
      const userWithEmail = await this.repository.findByEmail(data.email);
      if (userWithEmail && userWithEmail.id !== id) {
        throw new AppError('Email já está em uso', StatusCodes.CONFLICT);
      }
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.repository.update(id, data);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', StatusCodes.NOT_FOUND);
    }

    await this.repository.delete(id);
  }
} 