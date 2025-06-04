import { NotificationToken } from '@prisma/client';
import { prisma } from '../config/prisma';

export class NotificationTokenRepository {

  constructor() {
    // Using the shared Prisma instance
  }

  async upsert(token: string, userId: string): Promise<NotificationToken> {
    const existing = await prisma.notificationToken.findUnique({
      where: { token }
    });

    if (existing) {
      return prisma.notificationToken.update({
        where: { token },
        data: { userId }
      });
    }

    return prisma.notificationToken.create({
      data: { token, userId }
    });
  }

  async findByUserIds(userIds: string[]): Promise<NotificationToken[]> {
    return prisma.notificationToken.findMany({
      where: { userId: { in: userIds } }
    });
  }
}
