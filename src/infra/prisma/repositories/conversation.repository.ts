import { Conversation } from '@prisma/client';
import prisma from '../prisma-client';
export class ConversationRepository {
  private readonly prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }

  async find(data: Partial<Conversation>, options?: { skip?: number; take?: number }) {
    return this.prisma.conversation.findMany({
      where: { emailusername: data.emailusername },
      select: {
        subject: true,
        messages: {
          select: {
            fromAddress: true,
            createdAt: true,
            status: true,
            toList: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
        id: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip: options?.skip,
      take: options?.take,
    });
  }

  async count(data: Partial<Conversation>) {
    return this.prisma.conversation.count({
      where: { emailusername: data.emailusername },
    });
  }
}
