import { supabase } from '../config/supabase';

export class UploadService {
  private bucket: string;

  constructor() {
    this.bucket = process.env.SUPABASE_BUCKET || 'images';
    console.log('Bucket configurado:', this.bucket);
    console.log('Supabase URL:', process.env.SUPABASE_URL);
    console.log('Supabase Key disponível:', !!process.env.SUPABASE_ANON_KEY);
  }

  async uploadImage(file: Express.Multer.File): Promise<string | null> {
    console.log('Iniciando upload de imagem...');
    console.log('Nome do arquivo:', file.originalname);
    console.log('Tipo do arquivo:', file.mimetype);
    console.log('Tamanho do arquivo:', file.size);

    const filePath = `${Date.now()}-${file.originalname}`;
    console.log('Caminho do arquivo:', filePath);

    try {
      console.log('Tentando fazer upload para o Supabase...');
      const { error, data } = await supabase.storage.from(this.bucket).upload(filePath, file.buffer, {
        contentType: file.mimetype
      });

      if (error) {
        console.error('Erro detalhado do Supabase:', {
          message: error.message,
          name: error.name
        });
        return null;
      }

      console.log('Upload realizado com sucesso!');
      const { data: urlData } = supabase.storage.from(this.bucket).getPublicUrl(filePath);
      console.log('URL pública gerada:', urlData.publicUrl);
      
      return urlData.publicUrl;
    } catch (error) {
      console.error('Erro durante o processo de upload:', error);
      return null;
    }
  }
}
