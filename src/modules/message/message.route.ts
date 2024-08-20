import { Router } from 'express';
import type { Route } from '@/interfaces';
import LoggerFactory from '@/lib/new-logger';
import { RedisService } from '@/infra/redis/redis.service';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { redisdb } from '@/infra/redis/redis-client';
import validate from '@/middlewares/validation.middleware';

export class MessageRoute implements Route {
  public readonly path = '/messages';
  public readonly router: Router;
  private readonly logger = LoggerFactory.createLogger('ConversationRouter');
  constructor() {
    this.router = Router();
    this.initializeRoutes();
    this.logger.info('Conversation Module initialized');
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/:messageId`);
  }

  //   private createConversationController(): ConversationController {
  //     const redisService = new RedisService(redisdb);
  //     const conversationRepository = new ConversationRepository();
  //     return new ConversationController(redisService, conversationRepository);
  //   }
}
