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

  public getConversations: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;
      let page = Number(req.query.page);
      let pageSize = Number(req.query.pageSize);

      page = isNaN(page) || page < 1 ? 1 : page;
      pageSize =
        isNaN(pageSize) || pageSize < 1 ? CONVERSATIONS_PAGE_SIZE : Math.min(pageSize, CONVERSATIONS_PAGE_SIZE);

      const isInboxExist = await this.redisService.get<InboxData>(REDIS_ENUM.USERNAME_INBOX, username);
      if (!isInboxExist?.username) {
        throw new ApiError(HttpStatusCode.NOT_FOUND, `Inbox Not found.`);
      }

      const conversations = await this.conversationService.getConversations({ username, page, pageSize });
      this.send(res, { ...conversations }, 'getConversations');
    } catch (err) {
      next(err);
    }
  };
}
