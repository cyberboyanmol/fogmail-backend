import { Conversation, Message } from '@prisma/client';
import prisma from '../prisma-client';
import { MessageOptions } from '@/interfaces/message.interface';
export class MessageRepository {
  private readonly prisma = prisma;
  constructor() {
    this.prisma = prisma;
  }

  async findById(data: Partial<Message>, options: MessageOptions) {
    return this.prisma.message.findUnique({
      where: {
        id: data.id,
      },
      select: {
        ...options,
      },
    });
  }
}
