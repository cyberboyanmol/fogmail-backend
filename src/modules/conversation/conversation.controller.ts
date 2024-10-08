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
import { ConversationService } from './conversation.service';

export class ConversationController extends BaseController {
  private readonly logger = LoggerFactory.createLogger(ConversationController.name);
  private readonly conversationService: ConversationService;

  constructor(
    private readonly redisService: RedisService,
    private readonly conversationRepository: ConversationRepository,
  ) {
    super();
    this.conversationService = new ConversationService(redisService, conversationRepository);
    this.logger.info('Conversation Controller initialized');
  }

  public getConversationById: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { conversationId } = req.params;
      const conversationWithMessage = await this.conversationService.getConversationById(conversationId);
      this.send(res, { conversation: conversationWithMessage }, 'get conversation with message');
    } catch (err) {
      next(err);
    }
  };
}
