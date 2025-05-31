import * as jwt from 'jsonwebtoken';
import { UserResponse } from '../types';

export const generateToken = (user: UserResponse): string => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET || 'default_secret',
    { expiresIn: '7d' }
  );
}; 