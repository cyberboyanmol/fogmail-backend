import { Router } from 'express';
import type { Route } from '@/interfaces';
import LoggerFactory from '@/lib/new-logger';
import { RedisService } from '@/infra/redis/redis.service';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { redisdb } from '@/infra/redis/redis-client';
import { ConversationController } from './conversation.controller';
import { ConversationRepository } from '@/infra/prisma/repositories/conversation.repository';
import validate from '@/middlewares/validation.middleware';
import { ConversationByIdDto } from './dtos/conversation-by-id.dto';

export class ConversationRoute implements Route {
  public readonly path = '/conversations';
  public readonly router: Router;
  private readonly conversationController: ConversationController;
  private readonly logger = LoggerFactory.createLogger(ConversationRoute.name);
  constructor() {
    this.router = Router();
    this.conversationController = this.createConversationController();
    this.initializeRoutes();
    this.logger.info('Conversation Module initialized');
  }
  private initializeRoutes() {
    this.router.get(
      `${this.path}/:conversationId/messages`,
      validate(ConversationByIdDto),
      this.conversationController.getConversationById,
    );
  }

  private createConversationController(): ConversationController {
    const redisService = new RedisService(redisdb);
    const conversationRepository = new ConversationRepository();
    return new ConversationController(redisService, conversationRepository);
  }
}
