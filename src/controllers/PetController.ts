import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import { PetService } from '../services/PetService';
import { CreatePetDTO, UpdatePetDTO } from '../types';

export class PetController {
  private petService: PetService;

  constructor() {
    this.petService = new PetService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const petData: CreatePetDTO = {
        ...req.body,
        userId: req.user.id
      };
      const pet = await this.petService.create(petData);
      res.status(StatusCodes.CREATED).json(pet);
    } catch (error) {
      next(error);
      return;
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pets = await this.petService.findAll();
      res.status(StatusCodes.OK).json(pets);
    } catch (error) {
      next(error);
      return;
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const pet = await this.petService.findById(id);
      res.status(StatusCodes.OK).json(pet);
    } catch (error) {
      next(error);
      return;
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const petData: UpdatePetDTO = req.body;
      const pet = await this.petService.update(id, petData);
      res.status(StatusCodes.OK).json(pet);
    } catch (error) {
      next(error);
      return;
    }
  };

  patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const petData: Partial<UpdatePetDTO> = req.body;
      const pet = await this.petService.update(id, petData);
      res.status(StatusCodes.OK).json(pet);
    } catch (error) {
      next(error);
      return;
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.petService.delete(id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
      return;
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      
      // Verifica se o usuário está tentando acessar seus próprios pets
      if (userId !== req.user.id) {
        throw new AppError('Não autorizado a acessar pets de outro usuário', StatusCodes.FORBIDDEN);
      }

      const pets = await this.petService.findByUserId(userId);
      res.status(StatusCodes.OK).json(pets);
    } catch (error) {
      next(error);
      return;
    }
  };
}
