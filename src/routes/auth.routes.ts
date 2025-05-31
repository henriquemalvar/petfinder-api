import { RequestHandler, Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();
const authController = new AuthController();

// Rotas de autenticação
router.post('/login', authController.login as RequestHandler);
router.post('/register', authController.register as RequestHandler);

export default router; 