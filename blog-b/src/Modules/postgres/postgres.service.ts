import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import RegBlock from '@/Modules/redis/classes/regBlock';
import UserRepo from '@/Modules/postgres/repositories/userRepo';

export default class PostgresService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    public readonly userRepo: UserRepo,
  ) {}
}
