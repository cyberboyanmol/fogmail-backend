import LoggerFactory from '@/lib/new-logger';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class InboxController {
  private logger = LoggerFactory.createLogger(InboxController.name);
  constructor() {
    this.logger.info('Inbox Controller initialized');
  }
  public InboxHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Firstly check whether the inbox for username is already exists.
      //
    } catch (err) {
      next(err);
    }
  };
}
