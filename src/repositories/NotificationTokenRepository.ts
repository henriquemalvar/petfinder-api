import { PrismaClient, NotificationToken } from '@prisma/client';

export class NotificationTokenRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async upsert(token: string, userId: string): Promise<NotificationToken> {
    const existing = await this.prisma.notificationToken.findUnique({
      where: { token }
    });

    if (existing) {
      return this.prisma.notificationToken.update({
        where: { token },
        data: { userId }
      });
    }

    return this.prisma.notificationToken.create({
      data: { token, userId }
    });
  }

  async findByUserIds(userIds: string[]): Promise<NotificationToken[]> {
    return this.prisma.notificationToken.findMany({
      where: { userId: { in: userIds } }
    });
  }
}
