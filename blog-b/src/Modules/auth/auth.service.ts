import { Injectable } from '@nestjs/common';
import RedisService from '@/Modules/redis/redis.service';
import PostgresService from '@/Modules/postgres/postgres.service';
import { RegistrationBodyDto } from '@/Modules/auth/Types/auth';
import hashPasswordWithSalt from '@/Utils/password/hashPassword';
import generateToken from '@/Utils/generateToken';
import generateEmailCode from '@/Utils/generateEmailCode';
import { RegistrationOutputDto } from '@/Modules/redis/Types/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly postgresService: PostgresService,
  ) {}
  async registrationStart(
    body: RegistrationBodyDto,
  ): Promise<RegistrationOutputDto> {
    const { email, name, password, language } = body;

    //ШАГ 1: Проверка на уже наличие пользователя в постгресе ИЛИ блока на регистрацию в редисе, если есть - внутри функций выбросится ошибка
    const [noUser, notBlocked] = await Promise.all([
      this.postgresService.userRepo.userNotExistsByEmail(email),
      this.redisService.regBlock.checkIfNotBlockExists(email),
    ]);
    //Шаг 2: если есть разрешение - хэшшируем пароль
    const hashedPassword = hashPasswordWithSalt(password);
    //Шаг 3: генерируем код доступа для пользователя для дальнейшей регистрации и код для отправки на имейл
    const [token, emailCode] = [generateToken(10), generateEmailCode(6)];
    //Шаг 4: записываем временные данные в редис на сутки
    await this.redisService.regRequestData.setRegRequestData(token, {
      email,
      name,
      password,
      language,
      emailCode,
    });
    //Шаг 5: Устанавливаем блок на 15 минут посредством ячейки в редисе с ttl
    await this.redisService.regBlock.setBlock(email);
    //Возвращаем объект успешного прохождения начала регистрации
    return {
      code: 201,
      message: 'REG_SUCCESS',
      isSucceed: true,
      payload: {
        confirmationToken: token,
      },
    };
  }
}
