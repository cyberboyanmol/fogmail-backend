import winston from 'winston';
import { getConfig } from '@/config';

const config = getConfig();

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
} as const;

type LogLevel = keyof typeof levels;

const colors: Record<LogLevel, string> = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} [${info.level}] ${info.context}: ${info.message}`),
);

const transports = [new winston.transports.Console()];

const defaultLogger = winston.createLogger({
  level: config.log.level as LogLevel,
  levels,
  format,
  transports,
});

type LogMethod = (message: string, ...meta: any[]) => void;

type Logger = Record<LogLevel, LogMethod>;

class LoggerFactory {
  static createLogger(context?: string): Logger {
    const childLogger = defaultLogger.child({ context: context || 'Global' });
    const wrappedLogger: Partial<Logger> = {};
    (Object.keys(levels) as LogLevel[]).forEach((level) => {
      wrappedLogger[level] = (message: string, ...meta: any[]) => {
        childLogger[level](message, ...meta);
      };
    });

    return wrappedLogger as Logger;
  }
}

export default LoggerFactory;
