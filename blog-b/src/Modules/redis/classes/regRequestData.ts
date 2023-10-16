import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { BcryptFuncError } from '@/Errors/bcryptErrors/bcryptErrors';
import {
  DatabaseRedisError,
  InvalidRequestError,
  NotMatchingError,
} from '@/Errors/redisErrors/redisErrors';
import hashPasswordWithSalt from '@/Utils/password/hashPassword';
import { Injectable } from '@nestjs/common';
import { SetRegistrationDto } from '@/DTO/auth/registration';
import { ConfirmationBodyDto } from '@/DTO/auth/confirmation';
import { ConfirmationEntityDto } from '@/DTO/redisEntities/redisEntities';
@Injectable()
export default class RegRequestData {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setRegRequestData(requestId: string, body: SetRegistrationDto) {
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
  async checkRequestData(requestId: string, requestEmailCode: string) {
    //пытаемся получить данные по айди токена
    const redisData = (await this.redis.hgetall(requestId).catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    })) as unknown as ConfirmationEntityDto;
    //Если нет данных - ошибку выкидываем
    if (!Object.keys(redisData).length)
      throw new InvalidRequestError('INV_REQUEST');
    //Если все же есть - проверяем с базой
    if (requestEmailCode !== redisData.emailCode)
      throw new NotMatchingError('INV_CODE');
    //Если все корректно - возвращаем данные
    return redisData;
  }
  async deleteRequestAndBlock(requestId: string, email: string) {
    return Promise.all([
      this.redis.del(requestId),
      this.redis.del(email),
    ]).catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    });
  }
}
