import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';

const router = Router();
const postController = new PostController();

// Rotas de post

router.post('/', authMiddleware, validate(createPostSchema), postController.create);
router.get('/', postController.findAll);
router.get('/:id', postController.findById);
router.put('/:id', authMiddleware, validate(updatePostSchema), postController.update);
router.patch('/:id', authMiddleware, validate(updatePostSchema), postController.patch);
router.delete('/:id', authMiddleware, postController.delete);
router.get('/user/:userId', postController.findByUserId);
router.get('/pet/:petId', postController.findByPetId);

export default router; 