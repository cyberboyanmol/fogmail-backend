import { App } from '@/app';
import { getConfig } from './config';
import { HealthCheckRoute } from './modules/healthcheck/controllers/healthcheck.route';
import LoggerFactory from './lib/new-logger';

const app = new App([new HealthCheckRoute()]);
let server: any;
const logger = LoggerFactory.createLogger();
async function startServer() {
  try {
    if (getConfig().NODE_ENV) {
      logger.info('Config Module Initialized');
    }
    server = app.listen();
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }
}

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

startServer();

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  exitHandler();
});

process.on('SIGINT', () => {
  logger.info('SIGINT received');
  exitHandler();
});
