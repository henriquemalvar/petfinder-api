import { Router } from 'express';
import { PetController } from '../controllers/PetController';
import { authMiddleware } from '../middlewares/auth';
import { validate } from '../middlewares/validate';
import { createPetSchema, updatePetSchema, userIdParamSchema } from '../schemas/pet.schema';

const router = Router();
const petController = new PetController();

/**
 * @swagger
 * /api/pets:
 *   post:
 *     tags:
 *       - Pets
 *     summary: Cria um novo pet
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - breed
 *               - age
 *               - description
 *               - gender
 *               - size
 *               - castrated
 *               - vaccinated
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rex
 *               type:
 *                 type: string
 *                 enum: [DOG, CAT]
 *                 example: "DOG"
 *               breed:
 *                 type: string
 *                 example: "Labrador"
 *               age:
 *                 type: string
 *                 example: "2"
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE]
 *                 example: "MALE"
 *               size:
 *                 type: string
 *                 enum: [SMALL, MEDIUM, LARGE]
 *                 example: "MEDIUM"
 *               image:
 *                 type: string
 *                 format: uri
 *                 example: "https://exemplo.com/foto.jpg"
 *               description:
 *                 type: string
 *                 example: "Cachorro muito dócil e brincalhão"
 *               castrated:
 *                 type: boolean
 *                 example: true
 *               vaccinated:
 *                 type: boolean
 *                 example: true
 *               latitude:
 *                 type: number
 *                 minimum: -90
 *                 maximum: 90
 *                 example: -23.550520
 *               longitude:
 *                 type: number
 *                 minimum: -180
 *                 maximum: 180
 *                 example: -46.633308
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', authMiddleware, validate(createPetSchema), petController.create);

/**
 * @swagger
 * /api/pets:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Lista todos os pets
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [DOG, CAT]
 *                   breed:
 *                     type: string
 *                   age:
 *                     type: number
 *                   description:
 *                     type: string
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *       401:
 *         description: Não autorizado
 */
router.get('/', authMiddleware, petController.findAll);

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Busca um pet pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet encontrado
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pet não encontrado
 */
router.get('/:id', authMiddleware, petController.findById);

/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     tags:
 *       - Pets
 *     summary: Atualiza um pet
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
 *               name:
 *                 type: string
 *                 example: Rex
 *               type:
 *                 type: string
 *                 enum: [DOG, CAT]
 *                 example: "DOG"
 *               breed:
 *                 type: string
 *                 example: "Labrador"
 *               age:
 *                 type: number
 *                 example: 2
 *               description:
 *                 type: string
 *                 example: "Cachorro muito dócil e brincalhão"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://exemplo.com/foto1.jpg"]
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pet não encontrado
 */
router.put('/:id', authMiddleware, validate(updatePetSchema), petController.update);

/**
 * @swagger
 * /api/pets/{id}:
 *   patch:
 *     tags:
 *       - Pets
 *     summary: Atualiza parcialmente um pet
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
 *               name:
 *                 type: string
 *                 example: Rex
 *               type:
 *                 type: string
 *                 enum: [DOG, CAT]
 *                 example: "DOG"
 *               breed:
 *                 type: string
 *                 example: "Labrador"
 *               age:
 *                 type: number
 *                 example: 2
 *               description:
 *                 type: string
 *                 example: "Cachorro muito dócil e brincalhão"
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://exemplo.com/foto1.jpg"]
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pet não encontrado
 */
router.patch('/:id', authMiddleware, validate(updatePetSchema), petController.patch);

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     tags:
 *       - Pets
 *     summary: Remove um pet
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
 *         description: Pet removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Pet não encontrado
 */
router.delete('/:id', authMiddleware, petController.delete);

/**
 * @swagger
 * /api/pets/user/{userId}:
 *   get:
 *     tags:
 *       - Pets
 *     summary: Lista todos os pets de um usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do usuário (formato UUID)
 *     responses:
 *       200:
 *         description: Lista de pets do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   type:
 *                     type: string
 *                     enum: [DOG, CAT]
 *                   breed:
 *                     type: string
 *                   age:
 *                     type: number
 *                   description:
 *                     type: string
 *                   photos:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: Requisição inválida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: ID de usuário inválido
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Token não fornecido
 *       403:
 *         description: Acesso negado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Não autorizado a acessar pets de outro usuário
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuário não encontrado
 */
router.get('/user/:userId', authMiddleware, validate(userIdParamSchema), petController.findByUserId);

export default router; 