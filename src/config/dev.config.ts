import dotenv from 'dotenv';
import { Config } from '@/interfaces';
import LoggerFactory from '@/lib/new-logger';
dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];
export const devConfig: Config = {
  NODE_ENV: String(process.env.NODE_ENV || 'development'),
  POSTGRESQL_DB_URL: String(process.env.POSTGRESQL_DB_URL),
  REDIS_DB_URL: String(process.env.REDIS_DB_URL),
  REDIS_CACHE_DB_URL: String(process.env.REDIS_CACHE_DB_URL),
  REDIS_STORAGE_DB_URL: String(process.env.REDIS_STORAGE_DB_URL),
  server: {
    protocol: String(process.env.PROTOCOL) || 'http',
    host: String(process.env.HOST) || 'localhost',
    port: Number(process.env.PORT) || 8080,
  },
  BACKEND_URL: String(process.env.BACKEND_URL),
  log: {
    format: 'dev',
    level: 'debug',
  },
  allowedOrigins: allowedOrigins,

  isDev: function () {
    return this.NODE_ENV === 'development';
  },
};
