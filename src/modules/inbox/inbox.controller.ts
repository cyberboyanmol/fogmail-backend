import BaseController from '@/lib/base.controller';
import LoggerFactory from '@/lib/new-logger';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { InboxService } from './services/inbox.service';
import { HttpStatusCode } from '@/enums';
import { RedisService } from '@/infra/redis/redis.service';
import { InboxRepository } from '@/infra/prisma/repositories/inbox.repository';
import { redisdb } from '@/infra/redis/redis-client';

export class InboxController extends BaseController {
  private readonly logger = LoggerFactory.createLogger(InboxController.name);
  private readonly inboxService: InboxService;

  constructor(private readonly redisService: RedisService) {
    super();
    this.logger.info('Inbox Controller initialized');
    this.inboxService = new InboxService(redisService);
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
}
