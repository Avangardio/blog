import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { BcryptFuncError } from '@/Errors/bcryptErrors/bcryptErrors';
import {RegistrationBodyDto, SetRegistrationDto} from '@/Modules/redis/Types/auth';
import { DatabaseRedisError } from '@/Errors/redisErrors/redisErrors';
import hashPasswordWithSalt from "@/Utils/password/hashPassword";

export default class RegRequestData {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async setRegRequestData(requestId: string, body: SetRegistrationDto) {
    //отправляем хэш с данными из тела запроса + дату регистрации с временем жизни
    //создаем транзакцию
    const pipeline = this.redis.pipeline();
    //создаем хэш и даем ему время жизни в сутки
    pipeline.hset(requestId, body);
    pipeline.expire(requestId, 3600 * 24);
    //отправляем трназакцию
    return await pipeline.exec().catch(() => {
      throw new DatabaseRedisError('REDIS_ERROR');
    });
  }
}
