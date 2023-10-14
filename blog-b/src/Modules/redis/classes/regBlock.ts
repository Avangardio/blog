import RedisService from '@/Modules/redis/redis.service';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  ActiveBlockError,
  DatabaseRedisError,
} from '@/Errors/redisErrors/redisErrors';

export default class RegBlock {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  setBlock(email: string) {
    return this.redis.setex(email, 15 * 60, 'true');
  }
  getBlock(email: string): Promise<string | null> {
    return this.redis.get(email).catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    });
  }

  async checkIfNotBlockExists(email: string) {
    const activeBlock = await this.getBlock(email);
    if (activeBlock) throw new ActiveBlockError('ACTIVE_BLOCK');
    return true;
  }
}
