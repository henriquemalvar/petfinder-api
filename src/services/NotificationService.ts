import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import { NotificationTokenRepository } from '../repositories/NotificationTokenRepository';

export class NotificationService {
  private prisma: PrismaClient;
  private tokenRepo: NotificationTokenRepository;

  constructor() {
    this.prisma = new PrismaClient();
    this.tokenRepo = new NotificationTokenRepository();
  }

  async registerToken(token: string, userId: string) {
    await this.tokenRepo.upsert(token, userId);
  }

  private getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async notifyNearbyUsers(postId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true
      }
    });

    if (!post || post.user.latitude == null || post.user.longitude == null) {
      return;
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: { not: post.userId },
        latitude: { not: null },
        longitude: { not: null }
      }
    });

    const nearbyUserIds = users
      .filter(u =>
        this.getDistanceKm(
          post.user.latitude!,
          post.user.longitude!,
          u.latitude!,
          u.longitude!
        ) <= 10
      )
      .map(u => u.id);

    if (!nearbyUserIds.length) return;

    const tokens = await this.tokenRepo.findByUserIds(nearbyUserIds);

    const messages = tokens.map(t => ({ to: t.token, sound: 'default', body: 'Há um novo post perto de você!' }));

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messages)
    });
  }
}
