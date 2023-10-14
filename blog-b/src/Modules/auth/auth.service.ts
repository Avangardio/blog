import { Injectable } from '@nestjs/common';
import RedisService from '@/Modules/redis/redis.service';
import PostgresService from '@/Modules/postgres/postgres.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly postgresService: PostgresService,
  ) {}
  async registrationStart(body: IRegistrationBody) {
    const { email, name, password, language } = body;

    //ШАГ 1: Проверка на уже наличие пользователя в постгресе ИЛИ блока на регистрацию в редисе, если есть - внутри функций выбросится ошибка
    const [noUser, notBlocked] = await Promise.all([
      this.postgresService.userRepo.userNotExistsByEmail(email),
      this.redisService.regBlock.checkIfNotBlockExists(email),
    ]);
    return 'z'
  }
}
