import { getConfig } from '@/config';
import { RedisClient } from './dal.redis';

// Creating Redis clients for different URLs
const redisdb = RedisClient.getInstance(getConfig().REDIS_DB_URL, 'REDIS_DB');

export { redisdb };
