import { Injectable } from '@nestjs/common';
import RedisService from '@/Modules/redis/redis.service';
import PostgresService from '@/Modules/postgres/postgres.service';

import hashPasswordWithSalt from '@/Utils/password/hashPassword';
import generateToken from '@/Utils/generateToken';
import generateEmailCode from '@/Utils/generateEmailCode';
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import {
  ConfirmationBodyDto,
  ConfirmationOutputDto,
} from '@/DTO/auth/confirmation';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    public readonly postgresService: PostgresService,
  ) {}
  async registration(
    body: RegistrationBodyDto,
  ): Promise<RegistrationOutputDto> {
    const { email, name, password, language } = body;

    //ШАГ 1: Проверка на уже наличие пользователя в постгресе ИЛИ блока на регистрацию в редисе, если есть - внутри функций выбросится ошибка
    await Promise.all([
      this.postgresService.auth.userRepo.userNotExistsByEmail(email),
      this.redisService.regBlock.checkIfNotBlockExists(email),
    ]);

    //Шаг 2: если есть разрешение - хэшшируем пароль
    const hashedPassword = await hashPasswordWithSalt(password);
    //Шаг 3: генерируем код доступа для пользователя для дальнейшей регистрации и код для отправки на имейл
    const [token, emailCode] = [generateToken(10), generateEmailCode(6)];
    //Шаг 4: записываем временные данные в редис на сутки
    await this.redisService.regRequestData.setRegRequestData(token, {
      email,
      name,
      password: hashedPassword,
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

  async confirmation(
    body: ConfirmationBodyDto,
  ): Promise<ConfirmationOutputDto> {
    const { emailCode, confirmationToken } = body;
    //Шаг 1: проверяем, есть ли такой токен и правильно прислали нам код
    const redisData = await this.redisService.regRequestData.checkRequestData(
      confirmationToken,
      emailCode,
    );
    //Шаг 2: Всё прошло без ошибок, нужно внести данные в базу данных users, ошибки обработаются если будут проблемы
    const registeredUser = await this.postgresService.auth.userRepo.setNewUser(
      redisData,
    );
    //Шаг 3: удаляем блок и реквест из редиса, не ждем завершения для оптимизации
    this.redisService.regRequestData.deleteRequestAndBlock(
      confirmationToken,
      registeredUser.email,
    );
    //Возвращаем объект успешного завершения и юзернейм
    return {
      code: 201,
      message: 'CONFIRMATION_SUCCESS',
      isSucceed: true,
      payload: {
        username: registeredUser.username,
      },
    };
  }
}
