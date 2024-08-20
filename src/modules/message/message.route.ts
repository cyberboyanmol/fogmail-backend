import { Router } from 'express';
import type { Route } from '@/interfaces';
import LoggerFactory from '@/lib/new-logger';
import { RedisService } from '@/infra/redis/redis.service';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { redisdb } from '@/infra/redis/redis-client';
import validate from '@/middlewares/validation.middleware';
import { MessageRepository } from '@/infra/prisma/repositories/message.repository';
import { MessageController } from './message.controller';
import { messageByIdDto } from './dtos/get-message-by-Id.dto';

export class MessageRoute implements Route {
  public readonly path = '/messages';
  public readonly router: Router;
  private readonly messageController: MessageController;
  private readonly logger = LoggerFactory.createLogger(MessageRoute.name);
  constructor() {
    this.router = Router();
    this.messageController = this.createMessageController();
    this.initializeRoutes();
    this.logger.info('Message Module initialized');
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/:messageId`, validate(messageByIdDto), this.messageController.getMessageById);
  }

  private createMessageController(): MessageController {
    const messageRepository = new MessageRepository();
    return new MessageController(messageRepository);
  }
}
