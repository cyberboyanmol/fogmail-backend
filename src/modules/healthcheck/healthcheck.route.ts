import { Router } from 'express';
import type { Route } from '@/interfaces';
import { HealthCheckController } from './healthcheck.controller';
import logger from '@/lib/logger';
import LoggerFactory from '@/lib/new-logger';

export class HealthCheckRoute implements Route {
  public readonly path = '/healthcheck';
  public router = Router();
  public HealthCheckController = new HealthCheckController();
  private logger = LoggerFactory.createLogger('HeathRouter');
  constructor() {
    this.initializeRoutes();
    this.logger.info('HealthCheck Module initialized');
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.HealthCheckController.healthCheck);
  }
}
