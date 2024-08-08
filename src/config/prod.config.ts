import { Config } from '@/interfaces';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });
const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [];

export const prodConfig: Config = {
  NODE_ENV: String(process.env.NODE_ENV || 'production'),
  POSTGRESQL_DB_URL: String(process.env.POSTGRESQL_DB_URL),
  REDIS_CACHE_DB_URL: String(process.env.REDIS_CACHE_DB_URL),
  REDIS_STORAGE_DB_URL: String(process.env.REDIS_STORAGE_DB_URL),

  server: {
    protocol: String(process.env.PROTOCOL) || 'https',
    host: String(process.env.HOST),
    port: Number(process.env.PORT) || 5000,
  },
  BACKEND_URL: String(process.env.BACKEND_URL),
  log: {
    format: 'tiny',
    level: 'info',
  },
  allowedOrigins: allowedOrigins,

  isDev: function () {
    return this.NODE_ENV === 'development';
  },
};
