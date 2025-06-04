import { Router } from 'express';
import multer from 'multer';
import { UploadController } from '../controllers/UploadController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const uploadController = new UploadController();
const upload = multer();

router.post('/', authMiddleware, upload.single('file'), uploadController.upload);

export default router;
