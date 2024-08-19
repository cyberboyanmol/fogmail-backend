import { RedisService } from '@/infra/redis/redis.service';

export class InboxService {
  private readonly _redisDBService = RedisService;
  constructor() {
    this._redisDBService = new RedisService();
  }
}
