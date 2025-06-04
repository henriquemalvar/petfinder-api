import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotificationService } from '../services/NotificationService';

export class NotificationController {
  private service: NotificationService;

  constructor() {
    this.service = new NotificationService();
  }

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body as { token: string };
      await this.service.registerToken(token, req.user.id);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };

  notifyNearby = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.body as { postId: string };
      await this.service.notifyNearbyUsers(postId);
      res.status(StatusCodes.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  };
}
