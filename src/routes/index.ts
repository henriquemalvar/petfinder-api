import { RequestHandler, Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

// Rotas públicas
router.use('/auth', authRoutes);

// Rotas protegidas
router.use('/users', authMiddleware as RequestHandler, userRoutes);

export default router; 