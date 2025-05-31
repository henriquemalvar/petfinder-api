import { Router } from 'express';
import { PostController } from '../controllers/PostController';

const router = Router();
const postController = new PostController();

// Rotas de post

router.post('/', postController.create);
router.get('/', postController.findAll);
router.get('/:id', postController.findById);
router.put('/:id', postController.update);
router.patch('/:id', postController.patch);
router.delete('/:id', postController.delete);
router.get('/user/:userId', postController.findByUserId);
router.get('/pet/:petId', postController.findByPetId);

export default router; 