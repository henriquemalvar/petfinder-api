import { Router } from 'express';
import { PetController } from '../controllers/PetController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
const petController = new PetController();

// Rotas de pet

router.post('/', petController.create);
router.get('/', petController.findAll);
router.get('/:id', petController.findById);
router.put('/:id', petController.update);
router.patch('/:id', petController.patch);
router.delete('/:id', petController.delete);
router.get('/user/:userId', petController.findByUserId);

export default router; 