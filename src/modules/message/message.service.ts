import { HttpStatusCode } from '@/enums';
import ApiError from '@/exceptions/http.exception';
import { ConversationRepository } from '@/infra/prisma/repositories/conversation.repository';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { MessageRepository } from '@/infra/prisma/repositories/message.repository';
import { RedisService } from '@/infra/redis/redis.service';
import { ConversationResponse } from '@/interfaces/conversation.interface';
import { InboxData, InboxResult } from '@/interfaces/inbox.interface';
import { MessageOptions } from '@/interfaces/message.interface';
import { CONVERSATIONS_PAGE_SIZE as MAX_PAGE_SIZE, REDIS_ENUM } from '@/utils';
import { Conversation, Message } from '@prisma/client';
import crypto from 'crypto';
import { json } from 'express';

export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  public async getMessageById(messageId: string, options: MessageOptions) {
    const message = await this.messageRepository.findById({ id: messageId }, options);
    if (!message) {
      throw new ApiError(HttpStatusCode.NOT_FOUND, 'Message not found');
    }
    return message;
  }
}
