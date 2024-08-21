import BaseController from '@/lib/base.controller';
import LoggerFactory from '@/lib/new-logger';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpStatusCode } from '@/enums';
import { RedisService } from '@/infra/redis/redis.service';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { redisdb } from '@/infra/redis/redis-client';
import { CONVERSATIONS_PAGE_SIZE, REDIS_ENUM } from '@/utils';
import { InboxData } from '@/interfaces/inbox.interface';
import ApiError from '@/exceptions/http.exception';
import { ConversationRepository } from '@/infra/prisma/repositories/conversation.repository';
import { MessageRepository } from '@/infra/prisma/repositories/message.repository';
import { MessageService } from './message.service';
import { MessageOptions } from '@/interfaces/message.interface';

export class MessageController extends BaseController {
  private readonly logger = LoggerFactory.createLogger(MessageController.name);
  private readonly messageService: MessageService;

  constructor(private readonly messageRepository: MessageRepository) {
    super();
    this.messageService = new MessageService(messageRepository);
    this.logger.info('Message Controller initialized');
  }

  public getMessageById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { messageId } = req.params;
      let query = req.query as MessageOptions;
      const validQuery = Object.fromEntries(Object.entries(query).filter(([key, value]) => value === true));

      const message = await this.messageService.getMessageById(messageId, { ...validQuery });
      this.send(res, { ...message }, 'get Message by id');
    } catch (err) {
      next(err);
    }
  };
}
