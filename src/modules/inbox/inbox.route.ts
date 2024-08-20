import { Router } from 'express';
import type { Route } from '@/interfaces';
import LoggerFactory from '@/lib/new-logger';
import { InboxController } from './inbox.controller';
import { RedisService } from '@/infra/redis/redis.service';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { redisdb } from '@/infra/redis/redis-client';
import { ConversationController } from '../conversation/conversation.controller';
import { ConversationRepository } from '@/infra/prisma/repositories/conversation.repository';
import validate from '@/middlewares/validation.middleware';
import { inboxConversationDto } from './dtos/inbox-conversation.dto';

export class InboxRoute implements Route {
  public readonly path = '/inbox';
  public readonly router: Router;
  private readonly logger = LoggerFactory.createLogger('InboxRouter');
  private readonly inboxController: InboxController;
  constructor() {
    this.router = Router();
    this.inboxController = this.createInboxController();
    this.initializeRoutes();
    this.logger.info('Inbox Module initialized');
  }
  private initializeRoutes() {
    this.router.post(`${this.path}`, this.inboxController.getOrCreateInbox);
    this.router.get(
      `${this.path}/:username/conversations`,
      validate(inboxConversationDto),
      this.inboxController.getConversations,
    );
  }

  private createInboxController(): InboxController {
    const redisService = new RedisService(redisdb);
    const conversationRepository = new ConversationRepository();
    return new InboxController(redisService, conversationRepository);
  }
}
