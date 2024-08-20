import BaseController from '@/lib/base.controller';
import LoggerFactory from '@/lib/new-logger';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { InboxService } from './services/inbox.service';
import { HttpStatusCode } from '@/enums';
import { RedisService } from '@/infra/redis/redis.service';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { redisdb } from '@/infra/redis/redis-client';
import { ConversationRepository } from '@/infra/prisma/repositories/conversation.repository';
import { ConversationService } from '../conversation/conversation.service';
import { CONVERSATIONS_PAGE_SIZE, REDIS_ENUM } from '@/utils';
import { InboxData } from '@/interfaces/inbox.interface';
import ApiError from '@/exceptions/http.exception';
export class InboxController extends BaseController {
  private readonly logger = LoggerFactory.createLogger(InboxController.name);
  private readonly inboxService: InboxService;
  private readonly conversationService: ConversationService;
  constructor(
    private readonly redisService: RedisService,
    private readonly conversationRepository: ConversationRepository,
  ) {
    super();
    this.logger.info('Inbox Controller initialized');
    this.inboxService = new InboxService(redisService);
    this.conversationService = new ConversationService(redisService, conversationRepository);
  }

  public getOrCreateInbox: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const { inbox, isNewInbox } = await this.inboxService.getOrCreateInbox(email);

      const statusCode = isNewInbox ? HttpStatusCode.CREATED : HttpStatusCode.OK;
      const message = isNewInbox ? 'Inbox created successfully' : 'Inbox retrieved successfully';

      this.send(res, inbox, message, statusCode);
    } catch (err) {
      next(err);
    }
  };

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
      this.send(res, { ...conversations }, 'InboxAllConversations');
    } catch (err) {
      next(err);
    }
  };
}
