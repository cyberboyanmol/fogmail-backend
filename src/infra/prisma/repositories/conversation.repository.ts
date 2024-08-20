import { Conversation } from '@prisma/client';
import prisma from '../prisma-client';
export class ConversationRepository {
  private readonly prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }

  async find(data: Partial<Conversation>, options?: { skip?: number; take?: number }) {
    return this.prisma.conversation.findMany({
      where: { username: data.username },
      select: {
        subject: true,
        messages: {
          select: {
            fromAddress: true,
            date: true,
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
      where: { username: data.username },
    });
  }

  async findById(conversationId: string) {
    return this.prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      select: {
        subject: true,
        id: true,
        messages: {
          select: {
            id: true,
            fromAddress: {
              select: {
                name: true,
                address: true,
              },
            },
            createdAt: true,
            status: true,
            size: true,
            toList: {
              select: {
                name: true,
                address: true,
              },
            },
            ccList: {
              select: {
                name: true,
                address: true,
              },
            },
            bccList: {
              select: {
                name: true,
                address: true,
              },
            },
            attachments: true,
            text: true,
            textAsHtml: true,
            html: true,
            inReplyTo: true,
            references: true,
            date: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  }
}
