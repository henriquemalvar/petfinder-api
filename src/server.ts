import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { swaggerDocs, swaggerSetup } from './config/swagger';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

// Configuração das variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Documentação Swagger
app.use('/api-docs', swaggerSetup, swaggerDocs);

// Rota de health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Rotas da API
app.use('/api', routes);

// Tratamento de erros
app.use(errorHandler);

export { app };
