import { Router } from 'express';
import { upload } from '../config/cloudinary';
import { UploadController } from '../controllers/UploadController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const uploadController = new UploadController();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     tags:
 *       - Upload
 *     summary: Faz upload de um arquivo
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Arquivo enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "https://exemplo.com/arquivo.jpg"
 *       400:
 *         description: Arquivo não enviado
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, upload.single('file'), uploadController.upload);

export default router;
