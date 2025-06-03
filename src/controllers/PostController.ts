import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PostService } from '../services/PostService';
import { CreatePostDTO, PostFilters, UpdatePostDTO } from '../types';

export class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postData: CreatePostDTO = {
        ...req.body,
        userId: req.user.id
      };
      const post = await this.postService.create(postData);
      res.status(StatusCodes.CREATED).json(post);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.findAll();
      res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      next(error);
    }
  };

  findAllWithFilters = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filters: PostFilters = {
        type: req.query.type as any,
        status: req.query.status as any,
        location: req.query.location as string,
        petType: req.query.petType as string,
        petGender: req.query.petGender as any,
        petSize: req.query.petSize as any,
        userId: req.query.userId as string,
        search: req.query.search as string,
        page: req.query.page ? Number(req.query.page) : undefined,
        limit: req.query.limit ? Number(req.query.limit) : undefined
      };

      const result = await this.postService.findAllWithFilters(filters);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const post = await this.postService.findById(id);
      res.status(StatusCodes.OK).json(post);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const postData: UpdatePostDTO = req.body;
      const post = await this.postService.update(id, postData);
      res.status(StatusCodes.OK).json(post);
    } catch (error) {
      next(error);
    }
  };

  patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const postData: Partial<UpdatePostDTO> = req.body;
      const post = await this.postService.update(id, postData);
      res.status(StatusCodes.OK).json(post);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.postService.delete(id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };

  findByUserId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const posts = await this.postService.findByUserId(userId);
      res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      next(error);
    }
  };

  findByPetId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { petId } = req.params;
      const posts = await this.postService.findByPetId(petId);
      res.status(StatusCodes.OK).json(posts);
    } catch (error) {
      next(error);
    }
  };
} 