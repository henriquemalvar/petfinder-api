import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
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
      res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pets = await this.petService.findAll();
      res.status(StatusCodes.OK).json(pets);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const pet = await this.petService.findById(id);
      res.status(StatusCodes.OK).json(pet);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const petData: UpdatePetDTO = req.body;
      const pet = await this.petService.update(id, petData);
      res.status(StatusCodes.OK).json(pet);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
  };

  patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const petData: Partial<UpdatePetDTO> = req.body;
      const pet = await this.petService.update(id, petData);
      res.status(StatusCodes.OK).json(pet);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.petService.delete(id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const pets = await this.petService.findByUserId(userId);
      res.status(StatusCodes.OK).json(pets);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : error });
    }
  };
} 