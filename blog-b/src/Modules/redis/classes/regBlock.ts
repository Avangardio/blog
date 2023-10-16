import RedisService from '@/Modules/redis/redis.service';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import {
  ActiveBlockError,
  DatabaseRedisError,
} from '@/Errors/redisErrors/redisErrors';
import {Injectable} from "@nestjs/common";
@Injectable()
export default class RegBlock {
  constructor(@InjectRedis() private readonly redis: Redis) {}
  setBlock(email: string) {
    //Ставим "блок" с временем жизни в 15 минут
    return this.redis.setex(email, 15 * 60, 'true').catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    });
  }
  getBlock(email: string): Promise<string | null> {
    //Получаем "блок"
    return this.redis.get(email).catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    });
  }

  async checkIfNotBlockExists(email: string) {
    //Получаем блок
    const activeBlock = await this.getBlock(email);
    //Если есть ячейка - выбрасываем ошибку
    if (activeBlock) throw new ActiveBlockError('ACTIVE_BLOCK');
    return true;
  }
}
