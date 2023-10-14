import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

export default class RequestData {
  constructor(@InjectRedis() private readonly redis: Redis) {}




}
