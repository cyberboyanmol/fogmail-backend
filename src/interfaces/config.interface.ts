export interface Config {
  NODE_ENV: string;
  POSTGRESQL_DB_URL: string;
  REDIS_DB_URL: string;
  REDIS_CACHE_DB_URL: string;
  REDIS_STORAGE_DB_URL: string;

  server: {
    protocol: string;
    host: string;
    port: number;
  };

  BACKEND_URL: string;
  log: {
    format: 'combined' | 'common' | 'dev' | 'short' | 'tiny';
    level: 'error' | 'warn' | 'info' | 'http' | 'debug';
  };
  allowedOrigins: Array<string>;
  DOMAIN_LISTS: Array<string>;
  isDev: () => boolean;
}
