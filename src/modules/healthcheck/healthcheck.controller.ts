import LoggerFactory from '@/lib/new-logger';
import { application, NextFunction, Request, RequestHandler, Response } from 'express';
import { HealthCheckService } from './healthcheck.service';
import BaseController from '@/lib/base.controller';

export class HealthCheckController extends BaseController {
  private logger = LoggerFactory.createLogger(HealthCheckController.name);
  constructor() {
    super();
    this.logger.info('Healthcheck Controller initialized');
  }
  public healthCheck: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const healthData = {
        application: HealthCheckService.getApplicationHealth(),
        system: HealthCheckService.getSystemHealth(),
        timestamp: Date.now(),
      };
      this.send(res, healthData, 'FOGMAIL BACKEND SERVICE IS HEALTHY ✅ 🚀.');
    } catch (err) {
      next(err);
    }
  };
}
