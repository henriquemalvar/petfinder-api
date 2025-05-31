import * as bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../config/jwt';
import { AppError } from '../errors/AppError';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserDTO } from '../types';

interface AuthDTO {
  email: string;
  password: string;
}

export class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  async authenticate({ email, password }: AuthDTO) {
    try {
      const user = await this.repository.findByEmail(email);

      if (!user) {
        throw new AppError('Email ou senha inválidos', StatusCodes.UNAUTHORIZED);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError('Email ou senha inválidos', StatusCodes.UNAUTHORIZED);
      }

      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(userWithoutPassword);

      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Erro ao autenticar usuário', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async register(data: CreateUserDTO) {
    try {
      const userExists = await this.repository.findByEmail(data.email);

      if (userExists) {
        throw new AppError('Email já está em uso', StatusCodes.CONFLICT);
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await this.repository.create({
        ...data,
        password: hashedPassword
      });

      const { password: _, ...userWithoutPassword } = user;
      const token = generateToken(userWithoutPassword);

      return {
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Erro ao registrar usuário', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
} 