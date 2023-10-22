import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import {
  DatabaseRedisError,
  InvalidRequestError,
  NotMatchingError,
} from '@/Errors/redisErrors/redisErrors';
import { Injectable } from '@nestjs/common';
import { RequestEntity } from '@/DTO/redisEntities/redisEntities';

@Injectable()
export default class RegRequestData {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setRequestData<T extends RequestEntity>(requestId: string, body: T) {
    //Определяем тип реквеста
    //создаем транзакцию
    const pipeline = this.redis.pipeline();
    //создаем хэш
    pipeline.hset(requestId, body);
    //и даем ему время жизни в сутки
    pipeline.expire(requestId, 3600 * 24);
    //отправляем трназакцию
    return await pipeline.exec().catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    });
  }

  async checkRequestData<T extends RequestEntity>(
    requestId: string,
    requestEmailCode: string,
    requestType?: T['requestType'],
  ) {
    //пытаемся получить данные по айди токена
    const redisData = (await this.redis.hgetall(requestId).catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    })) as unknown as T;
    //Если нет данных - ошибку выкидываем, если нет типа реквеста - не проверяем на соответствие
    if (
      !Object.keys(redisData).length ||
      (requestType && redisData.requestType !== requestType)
    )
      throw new InvalidRequestError('INV_REQUEST');
    //Если все же есть - проверяем с базой
    if (requestEmailCode !== redisData.emailCode)
      throw new NotMatchingError('INV_CODE');
    //Если все корректно - возвращаем данные
    return redisData;
  }

  async deleteRequest(requestId: string[]) {
    return Promise.all(
      requestId.map((request) => this.redis.del(request)),
    ).catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    });
  }
}
