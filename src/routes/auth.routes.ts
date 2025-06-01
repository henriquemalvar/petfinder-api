import { RequestHandler, Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middlewares/validate';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();
const authController = new AuthController();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Realiza o login do usuário
 *     description: Autentica um usuário com email e senha
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validate(loginSchema), authController.login as RequestHandler);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Autenticação
 *     summary: Registra um novo usuário
 *     description: Cria uma nova conta de usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@email.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               whatsapp:
 *                 type: string
 *                 example: "11999999999"
 *               instagram:
 *                 type: string
 *                 example: "@joaosilva"
 *               contactPreference:
 *                 type: string
 *                 enum: [WHATSAPP, INSTAGRAM]
 *                 example: "WHATSAPP"
 *               avatar:
 *                 type: string
 *                 example: "https://exemplo.com/avatar.jpg"
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                 token:
 *                   type: string
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Email já está em uso
 */
router.post('/register', validate(registerSchema), authController.register as RequestHandler);

export default router; 