import { Router } from 'express';
import type { Route } from '@/interfaces';
import logger from '@/lib/logger';
import LoggerFactory from '@/lib/new-logger';
import { InboxController } from './inbox.controller';

export class InboxRoute implements Route {
  public readonly path = '/inbox';
  public router = Router();
  public inboxController = new InboxController();
  private logger = LoggerFactory.createLogger('InboxRouter');
  constructor() {
    this.initializeRoutes();
    this.logger.info('Inbox Module initialized');
  }
  private initializeRoutes() {
    this.router.post(`${this.path}`, this.inboxController.getOrCreateInbox);
  }
}
