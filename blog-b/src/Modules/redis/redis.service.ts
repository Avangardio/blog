import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import RegBlock from '@/Modules/redis/classes/regBlock';

export default class RedisService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    public readonly regBlock: RegBlock,
  ) {}
}
