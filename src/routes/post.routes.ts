import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';

const router = Router();
const postController = new PostController();

/**
 * @swagger
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Cria um novo post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - petId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cachorro para adoção"
 *               content:
 *                 type: string
 *                 example: "Cachorro muito dócil e brincalhão, procura um lar"
 *               petId:
 *                 type: string
 *                 example: "123e4567-e89b-12d3-a456-426614174000"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://exemplo.com/foto1.jpg"]
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, validate(createPostSchema), postController.create);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Lista todos os posts
 *     responses:
 *       200:
 *         description: Lista de posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   petId:
 *                     type: string
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', postController.findAll);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Busca um post pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get('/:id', postController.findById);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Atualiza um post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cachorro para adoção"
 *               content:
 *                 type: string
 *                 example: "Cachorro muito dócil e brincalhão, procura um lar"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://exemplo.com/foto1.jpg"]
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Post não encontrado
 */
router.put('/:id', authMiddleware, validate(updatePostSchema), postController.update);

/**
 * @swagger
 * /api/posts/{id}:
 *   patch:
 *     tags:
 *       - Posts
 *     summary: Atualiza parcialmente um post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Cachorro para adoção"
 *               content:
 *                 type: string
 *                 example: "Cachorro muito dócil e brincalhão, procura um lar"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://exemplo.com/foto1.jpg"]
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Post não encontrado
 */
router.patch('/:id', authMiddleware, validate(updatePostSchema), postController.patch);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Remove um post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Post removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Post não encontrado
 */
router.delete('/:id', authMiddleware, postController.delete);

/**
 * @swagger
 * /api/posts/user/{userId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Lista todos os posts de um usuário
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de posts do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   petId:
 *                     type: string
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:userId', postController.findByUserId);

/**
 * @swagger
 * /api/posts/pet/{petId}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Lista todos os posts de um pet
 *     parameters:
 *       - in: path
 *         name: petId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de posts do pet
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   petId:
 *                     type: string
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Pet não encontrado
 */
router.get('/pet/:petId', postController.findByPetId);

export default router; 