import { Post, PostType, PrismaClient, User } from '@prisma/client';
import { NotificationRepository } from '../repositories/NotificationRepository';

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export class NotificationService {
  private prisma: PrismaClient;
  private repository: NotificationRepository;

  constructor() {
    this.prisma = new PrismaClient();
    this.repository = new NotificationRepository();
  }

  async notifyNearbyUsers(post: Post): Promise<void> {
    if (post.type !== PostType.LOST && post.type !== PostType.FOUND) {
      return;
    }

    const author = await this.prisma.user.findUnique({ where: { id: post.userId } });
    if (!author || author.latitude == null || author.longitude == null) {
      return;
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: { not: post.userId },
        latitude: { not: null },
        longitude: { not: null }
      }
    });

    for (const user of users) {
      if (user.latitude == null || user.longitude == null) continue;
      const distance = haversineDistance(author.latitude, author.longitude, user.latitude, user.longitude);
      if (distance <= 10) {
        await this.repository.create({
          userId: user.id,
          postId: post.id,
          message: `Novo post de ${post.type === PostType.LOST ? 'pet perdido' : 'pet encontrado'} próximo a você`
        });
      }
    }
  }
}
