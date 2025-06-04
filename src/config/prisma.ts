import { PrismaClient } from '@prisma/client';

// Export a single PrismaClient instance to be shared across the app
export const prisma = new PrismaClient();
