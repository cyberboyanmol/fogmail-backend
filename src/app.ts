import cors from 'cors';
import express from 'express';
import helmet, { xssFilter } from 'helmet';
import cookieParser from 'cookie-parser';
import { Config, Route } from '@/interfaces';
import http, { Server } from 'http';
import { getConfig } from '@/config';
import { globalConstants } from '@/utils';
import logger from '@/lib/logger';
import morgan from '@/lib/morgan';

export class App {
  public app: express.Application;
  public port: number;
  public config: Config;
  public env: string;
  public server: Server;
  public protocol: string;

  constructor(routes: Route[]) {
    this.config = getConfig();
    this.app = express();
    this.server = http.createServer(this.app);
    this.env = this.config.NODE_ENV;
    this.port = this.config.server.port;
    this.protocol = this.config.server.protocol;
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeRouteFallback();
    this.disableSettings();
  }

  private initializeMiddleware() {
    if (getConfig().NODE_ENV !== 'test') {
      this.app.use(morgan.successHandler);
      this.app.use(morgan.errorHandler);
    }
    this.app.use(helmet());

    this.app.use(
      cors({
        origin: getConfig().allowedOrigins,
        credentials: true,
      }),
    );
    this.app.use(express.json({ limit: '20mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(xssFilter());
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  private disableSettings(): void {
    this.app.disable('x-powered-by');
  }

  private initializeRouteFallback() {
    this.app.use((req, res) => {
      res.status(globalConstants.httpStatus.NOT_FOUND.code).json({
        status: globalConstants.status.failed,
        message: `Cannot ${req.method} ${req.url}`,
        error: globalConstants.httpStatus.NOT_FOUND.name,
        statusCode: globalConstants.httpStatus.NOT_FOUND.code,
      });
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server listening on ${this.config.server.protocol}://${this.config.server.host}:${this.port}`);
    });
  }

  public getApp() {
    return this.app;
  }
}
