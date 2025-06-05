import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UploadService } from '../services/UploadService';

export class UploadController {
  private uploadService: UploadService;

  constructor() {
    console.log('Inicializando UploadController...');
    this.uploadService = new UploadService();
  }

  upload = async (req: Request & { file?: Express.Multer.File }, res: Response, next: NextFunction) => {
    console.log('Recebendo requisição de upload...');
    console.log('Headers:', req.headers);
    console.log('File:', req.file ? {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'Nenhum arquivo recebido');

    try {
      if (!req.file) {
        console.log('Erro: Arquivo não enviado');
        res.status(StatusCodes.BAD_REQUEST).json({ error: 'Arquivo não enviado' });
        return;
      }

      console.log('Iniciando processo de upload...');
      const url = await this.uploadService.uploadImage(req.file);
      
      if (!url) {
        console.log('Upload falhou, retornando null');
        res.status(StatusCodes.OK).json({ url: null });
        return;
      }

      console.log('Upload concluído com sucesso!');
      res.status(StatusCodes.CREATED).json({ url });
    } catch (error) {
      console.error('Erro no controlador de upload:', error);
      res.status(StatusCodes.OK).json({ url: null });
    }
  };
}
