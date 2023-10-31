import { Injectable } from '@nestjs/common';
import RedisService from '@/Modules/redis/redis.service';
import PostgresService from '@/Modules/postgres/postgres.service';
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import hashPasswordWithSalt from '@/Utils/password/hashPassword';
import generateToken from '@/Utils/generateToken';
import generateEmailCode from '@/Utils/generateEmailCode';
import {
  ConfirmationBodyDto,
  ConfirmationOutputDto,
} from '@/DTO/auth/confirmation';
import { LoginBodyDto, LoginOutputDto } from '@/DTO/auth/login';
import validatePassword from '@/Utils/password/validatePassword';
import {
  ConfirmationEntityDto,
  RestorationEntityDto,
} from '@/DTO/redisEntities/redisEntities';
import {
  RestorationBodyDto,
  RestorationOutputDto,
} from '@/DTO/auth/restoration';
import {
  RequestValidationBodyDto,
  RequestValidationOutputDto,
} from '@/DTO/auth/validateRequest';
import {
  SetNewPasswordBodyDto,
  SetNewPasswordOutputDto,
} from '@/DTO/auth/setNewPassword';
import { RmqMailService } from '@/Modules/rabbitmq/rmq-mail.service';

@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
    public readonly postgresService: PostgresService,
    private readonly rmqMailService: RmqMailService,
  ) {}

  async registration(
    body: RegistrationBodyDto,
  ): Promise<RegistrationOutputDto> {
    const { email, name, password, language } = body;

    //ШАГ 1: Проверка на уже наличие пользователя в постгресе ИЛИ блока на регистрацию в редисе, если есть - внутри функций выбросится ошибка
    await Promise.all([
      this.postgresService.userService.checkUserByEmail(email, false),
      this.redisService.regBlock.checkIfNotBlockExists(email),
    ]);

    //Шаг 2: если есть разрешение - хэшшируем пароль
    const hashedPassword = await hashPasswordWithSalt(password);
    //Шаг 3: генерируем код доступа для пользователя для дальнейшей регистрации и код для отправки на имейл
    const [token, emailCode] = [generateToken(10), generateEmailCode(6)];
    //Шаг 4: записываем временные данные в редис на сутки
    await this.redisService.regRequestData.setRequestData<ConfirmationEntityDto>(
      token,
      {
        requestType: 'confirmation',
        email,
        name,
        password: hashedPassword,
        language,
        emailCode,
        token,
      },
    );

    //Шаг 5: Устанавливаем блок на 15 минут посредством ячейки в редисе с ttl
    await this.redisService.regBlock.setBlock(email);
    //Шаг 6: Отправляем имейл пользователю,не ждем, ошибки устраняем
    this.rmqMailService
      .sendConfirmationEmail({
        email,
        name,
        language,
        emailCode,
        token,
      })
      .catch(() => undefined);
    //Возвращаем объект успешного прохождения начала регистрации
    return {
      code: 201,
      message: 'REQ_SUCCESS',
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
    //Шаг 1: проверяем, есть ли такой токен, правильный ли у нас тип запроса, и правильно ли прислали нам код
    const redisData =
      await this.redisService.regRequestData.checkRequestData<ConfirmationEntityDto>(
        confirmationToken,
        emailCode,
        'confirmation',
      );
    //Шаг 2: Всё прошло без ошибок, нужно внести данные в базу данных users, ошибки обработаются если будут проблемы
    const registeredUser = await this.postgresService.userService.setNewUser(
      redisData,
    );
    //Шаг 3: удаляем блок и реквест из редиса, не ждем завершения для оптимизации
    this.redisService.regRequestData.deleteRequest([
      confirmationToken,
      registeredUser.email,
    ]);
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

  async login(body: LoginBodyDto): Promise<LoginOutputDto> {
    const { email, password } = body;
    //Шаг 1: пытаемся получить пользователя по имейлу
    const user = await this.postgresService.userService.getUserHash(email);

    //Шаг 2: Проверяем пароль с хешем и выкидываем ошибку, либо true
    await validatePassword(password, user.hash);

    //Возвращаем объект успешной проверки
    return {
      code: 200,
      message: 'LOGIN_SUCCESS',
      isSucceed: true,
      payload: {
        username: user.username,
        userid: user.userid,
      },
    };
  }

  async sendRestorationRequest(
    body: RestorationBodyDto,
  ): Promise<RestorationOutputDto> {
    const { email } = body;
    //Шаг 1: пытаемся получить пользователя по имейлу, нет - ошибку выбрасываем
    const user = await this.postgresService.userService.checkUserByEmail(
      email,
      true,
    );
    //Шаг 2: генерируем код доступа для пользователя для подтверждения хозяина почты и код для отправки на имейл
    const [token, emailCode] = [generateToken(10), generateEmailCode(6)];
    //Шаг 3: записываем новый реквест в редис на сутки
    await this.redisService.regRequestData.setRequestData<RestorationEntityDto>(
      token,
      {
        requestType: 'restoration',
        userid: user.userid.toString(),
        emailCode,
        token,
        email,
        language: user.language,
      },
    );
    //Шаг 4: Отправляем запрос на отправку письма пользователю
    this.rmqMailService
      .sendRestorationEmail({
        email,
        emailCode,
        token,
        language: user.language,
      })
      .catch(() => undefined);
    return {
      code: 201,
      message: 'REQ_SUCCESS',
      isSucceed: true,
      payload: {
        confirmationToken: token,
      },
    };
  }

  async validateRequestCode(
    body: RequestValidationBodyDto,
  ): Promise<RequestValidationOutputDto> {
    const { confirmationToken, emailCode } = body;
    //Шаг 1: Проверяем, верный ли реквест отослал пользователь
    const redisData = await this.redisService.regRequestData.checkRequestData(
      confirmationToken,
      emailCode,
    );
    //Шаг 2: Если нет ошибок и реквест правильный - возвращаем успех с данными из реквеста
    return {
      code: 200,
      message: 'VALIDATION_SUCCESS',
      isSucceed: true,
      payload: {
        confirmationToken,
        emailCode,
      },
    };
  }

  async validateUserid(userid: number): Promise<boolean> {
    return await this.postgresService.userService.checkUserById(userid);
  }

  async setNewPassword(
    body: SetNewPasswordBodyDto,
  ): Promise<SetNewPasswordOutputDto> {
    const { confirmationToken, emailCode, password } = body;
    //Шаг 1: проверяем, есть ли такой токен, правильный ли у нас тип запроса, и правильно ли прислали нам код
    const redisData =
      await this.redisService.regRequestData.checkRequestData<RestorationEntityDto>(
        confirmationToken,
        emailCode,
        'restoration',
      );
    //Шаг 2: пароли совпадают - хэшшируем пароль
    const hashedPassword = await hashPasswordWithSalt(password);
    //Шаг 3: обновляем пароль пользоваетеля
    await this.postgresService.userService.updateUserPassword(
      redisData.userid,
      hashedPassword,
    );
    //Подчищаем реквест
    this.redisService.regRequestData.deleteRequest([confirmationToken]);
    return {
      code: 201,
      message: 'SETNEWPASSWORD_SUCCESS',
      isSucceed: true,
    };
  }
}
