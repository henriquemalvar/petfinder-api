import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UploadService } from '../services/UploadService';

export class UploadController {
  private uploadService: UploadService;

  constructor() {
    this.uploadService = new UploadService();
  }

  upload = async (req: Request & { file?: Express.Multer.File }, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Arquivo não enviado' });
        return;
      }

      const url = await this.uploadService.uploadImage(req.file);

      if (!url) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao fazer upload do arquivo' });
        return;
      }

      res.status(StatusCodes.CREATED).json({ url });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro interno do servidor' });
    }
  };
}
