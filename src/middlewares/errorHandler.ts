import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.message,
      details: error.details
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      res.status(StatusCodes.CONFLICT).json({
        status: 'error',
        message: 'Já existe um registro com este valor único'
      });
      return;
    }

    if (error.code === 'P2025') {
      res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Registro não encontrado'
      });
      return;
    }
  }

  console.error(error);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Erro interno do servidor'
  });
}; 