import { StatusCodes } from 'http-status-codes';
import { supabase } from '../config/supabase';
import { AppError } from '../errors/AppError';

export class UploadService {
  private bucket: string;

  constructor() {
    this.bucket = process.env.SUPABASE_BUCKET || 'images';
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const filePath = `${Date.now()}-${file.originalname}`;
    const { error } = await supabase.storage.from(this.bucket).upload(filePath, file.buffer, {
      contentType: file.mimetype
    });

    if (error) {
      throw new AppError('Erro ao fazer upload da imagem', StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const { data } = supabase.storage.from(this.bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }
}
