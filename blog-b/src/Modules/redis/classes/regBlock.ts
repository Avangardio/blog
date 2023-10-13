import RedisDBService from '@/Modules/redis/redisdb.service';
import Redis from 'ioredis';

export default class RegBlock {
  constructor(private readonly redis: Redis) {}
  setBlock(email: string) {
    return this.redis.setex(email, 15 * 6 * 10e4, 'true');
  }
  getBlock(email: string) {
    return this.redis.get(email);
  }
}
