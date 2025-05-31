import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { UserResponse } from '../types';
const prisma = new PrismaClient();

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token não fornecido' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as TokenPayload;
    
    const user = await prisma.user.findUnique({
      where: { id: data.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        whatsapp: true,
        instagram: true,
        contactPreference: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Usuário não encontrado' });
    }

    req.user = user as UserResponse;
    return next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token inválido' });
  }
}; 