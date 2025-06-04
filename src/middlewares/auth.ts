import { PrismaClient } from '@prisma/client';
import { USER_SELECT } from '../constants/prismaSelect';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { UserResponse } from '../types';
import { prisma } from '../config/prisma';


interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> | void => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token não fornecido' });
    return;
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as TokenPayload;
    
    prisma.user.findUnique({
      where: { id: data.id },
      select: USER_SELECT
    }).then(user => {
      if (!user) {
        res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Usuário não encontrado' });
        return;
      }

      req.user = user as UserResponse;
      next();
    }).catch(() => {
      res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido' });
    });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido' });
  }
}; 