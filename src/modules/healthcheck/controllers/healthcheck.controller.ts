import LoggerFactory from '@/lib/new-logger';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export class HealthCheckController {
  private logger = LoggerFactory.createLogger(HealthCheckController.name);
  constructor() {
    this.logger.info('Controller initialized');
  }
  public healthCheck: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('FOGMAIL BACKEND SERVICE IS HEALTHY ✅ 🚀.');
    } catch (err) {
      next(err);
    }
  };
}
