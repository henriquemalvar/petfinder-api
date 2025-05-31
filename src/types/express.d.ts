import { UserResponse } from './index';

declare global {
  namespace Express {
    interface Request {
      user: UserResponse;
    }
  }
} 