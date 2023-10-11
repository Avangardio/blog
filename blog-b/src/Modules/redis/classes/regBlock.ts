import RedisDBService from '@/Modules/redis/redisdb.service';
import Redis from 'ioredis';

export default class RegBlock {
  constructor(private readonly redis: Redis) {}
  async setBlock(email: string) {
    return await this.redis.setex(email, 15 * 6 * 10e4, 'true');
  }
  async getBlock(email: string) {
      return await this.redis.get(email);

  }
}
