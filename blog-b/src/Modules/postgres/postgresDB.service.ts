import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import RegBlock from "@/Modules/redis/classes/regBlock";

export default class PostgresDBService {
  readonly regBlock: RegBlock;
  constructor(@InjectRedis() private readonly redis: Redis) {
    this.regBlock = new RegBlock(redis);
  }

  async set() {
    return await this.redis.setex('key', 20, 'z');
  }
  async get() {
    return await this.redis.get('key');
  }
}
