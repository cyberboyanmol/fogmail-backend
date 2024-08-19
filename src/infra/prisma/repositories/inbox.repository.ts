import { Conversation } from '@prisma/client';
import prisma from '../prisma-client';
export class InboxRepository {
  private readonly prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }

  async find(data: Partial<Conversation>) {
    return this.prisma.emailInbox.findMany({
      where: { username: data.emailusername },
      select: {
        conversations: {
          select: {
            subject: true,
            messages: {
              select: {
                fromAddress: true,
              },
            },
          },
        },
      },
    });
  }
}
