import { Router } from 'express';
import { PetController } from '../controllers/PetController';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createPetSchema, updatePetSchema } from '../schemas/pet.schema';

const router = Router();
const petController = new PetController();

// Rotas de pet

router.post('/', authMiddleware, validate(createPetSchema), petController.create);
router.get('/', petController.findAll);
router.get('/:id', petController.findById);
router.put('/:id', authMiddleware, validate(updatePetSchema), petController.update);
router.patch('/:id', authMiddleware, validate(updatePetSchema), petController.patch);
router.delete('/:id', authMiddleware, petController.delete);
router.get('/user/:userId', petController.findByUserId);

export default router; 