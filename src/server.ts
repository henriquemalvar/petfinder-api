import cors from 'cors';
import dotenv from 'dotenv';
import express, { ErrorRequestHandler, Request, Response } from 'express';
import morgan from 'morgan';
import { swaggerDocs, swaggerSetup } from './config/swagger';
import routes from './routes';

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
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
};

app.use(errorHandler);

export { app };
