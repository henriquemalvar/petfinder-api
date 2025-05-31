import cors from 'cors';
import dotenv from 'dotenv';
import express, { ErrorRequestHandler, Request, RequestHandler, Response } from 'express';
import morgan from 'morgan';
import routes from './routes';

// Configuração das variáveis de ambiente
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rotas públicas
app.get('/health', ((req: Request, res: Response) => {
  res.json({ status: 'ok' });
}) as RequestHandler);

// Rotas da API
app.use('/api', routes);

// Tratamento de erros
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
};

app.use(errorHandler);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
