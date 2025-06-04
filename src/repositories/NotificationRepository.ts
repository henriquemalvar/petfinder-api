import { Notification, PrismaClient } from '@prisma/client';
import { IRepository } from './interfaces/IRepository';

export class NotificationRepository implements IRepository<Notification> {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(data: Partial<Notification>): Promise<Notification> {
    return this.prisma.notification.create({
      data: data as Notification,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async findAll(): Promise<Notification[]> {
    return this.prisma.notification.findMany();
  }

  async update(id: string, data: Partial<Notification>): Promise<Notification> {
    return this.prisma.notification.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notification.delete({
      where: { id },
    });
  }
}
