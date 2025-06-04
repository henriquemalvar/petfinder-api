import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UploadService } from '../services/UploadService';

export class UploadController {
  private uploadService: UploadService;

  constructor() {
    this.uploadService = new UploadService();
  }

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Arquivo não enviado' });
      }

      const url = await this.uploadService.uploadImage(req.file);
      res.status(StatusCodes.CREATED).json({ url });
    } catch (error) {
      next(error);
    }
  };
}
