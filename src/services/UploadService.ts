import { cloudinary } from '../config/cloudinary';

export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string | null> {
    console.log('Iniciando upload de imagem...');
    console.log('Nome do arquivo:', file.originalname);
    console.log('Tipo do arquivo:', file.mimetype);
    console.log('Tamanho do arquivo:', file.size);

    try {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'petfinder',
        resource_type: 'auto'
      });

      console.log('Upload realizado com sucesso!');
      return result.secure_url;
    } catch (error) {
      console.error('Erro durante o processo de upload:', error);
      return null;
    }
  }
}
