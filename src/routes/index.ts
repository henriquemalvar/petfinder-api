import { RequestHandler, Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import authRoutes from './auth.routes';
import notificationRoutes from './notification.routes';
import petRoutes from './pet.routes';
import postRoutes from './post.routes';
import uploadRoutes from './upload.routes';
import userRoutes from './user.routes';

const router = Router();

// Rotas públicas
router.use('/auth', authRoutes);

// Rotas protegidas
router.use('/users', authMiddleware as RequestHandler, userRoutes);
router.use('/pets', authMiddleware as RequestHandler, petRoutes);
router.use('/posts', authMiddleware as RequestHandler, postRoutes);
router.use('/notifications', authMiddleware as RequestHandler, notificationRoutes);
router.use('/uploads', authMiddleware as RequestHandler, uploadRoutes);

export default router; 
