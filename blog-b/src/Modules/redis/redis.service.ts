import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import RegBlock from '@/Modules/redis/classes/regBlock';
import RegRequestData from '@/Modules/redis/classes/regRequestData';

export default class RedisService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    public readonly regBlock: RegBlock,
    public readonly regRequestData: RegRequestData,
  ) {}
}
