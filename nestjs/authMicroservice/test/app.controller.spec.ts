import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from '../src/app.module';
import Redis from 'ioredis';
import { Pool } from 'pg';
import 'dotenv/config';
import { AppController } from '@/app.controller';
describe('AppController', () => {
  let appController: AppController;
  const env = process.env;
  let redis: Redis;
  let pool;

  beforeAll(async () => {
    //подключаемся к редису
    redis = new Redis({
      host: env.REDIS_HOST,
      port: +env.REDIS_PORT,
    });
    //подключаемся к постгресу
    pool = new Pool({
      host: env.POSTGRES_HOST,
      port: 5432,
      database: env.POSTGRES_DB,
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
    });
    //удаляем данные тестовые
    await redis.del('test1@test.com');
    //Создаем клиента
    const client = await pool.connect();
    //Удаляем пользователя
    await client.query('DELETE FROM users WHERE users.email = $1::text', [
      'test1@test.com',
    ]);
    //Инициаилизируем нестжс
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('Должен инициализироваться', function () {
    expect(appController).toBeDefined();
  });
  it('[NEST] - Регистрация пользователя', async () => {
    //Этап 1: Начальная регистрация
    const registrationPayload = {
      email: 'test1@test.com',
      password: 'TestPassword1',
      name: 'Test User',
      language: 'RU',
    };

    const response = await appController.registration(registrationPayload);
    expect(response.code).toBe(201);
    expect(response.isSucceed).toBe(true);
    expect(response.message).toBe('REQ_SUCCESS');
    const confirmationToken = response.payload.confirmationToken;
    const confirmationRequest = await redis.hgetall(confirmationToken);
    //Этап 2: Подтверждение регистрации
    const confirmationPayload = {
      confirmationToken,
      emailCode: confirmationRequest.emailCode,
    };
    const response1 = await appController.confirmation(confirmationPayload);
    expect(response1.code).toBe(201);
    expect(response1.isSucceed).toBe(true);
    expect(response1.message).toBe('CONFIRMATION_SUCCESS');
  });
  it('[PG]   - Зарегистрированный пользователь', async () => {
    //Создаем клиента
    const client = await pool.connect();
    //Получаем пользователя
    const user = await client.query(
      'SELECT * FROM users WHERE users.email = $1::text',
      ['test1@test.com'],
    );
    //пользователь должен сущестовать
    expect(user.rows[0].email === 'test@test.com');
    await client.release();
  });
  it('[NEST] - Логин пользователя', async () => {
    const loginPayloadCorrect = {
      email: 'test1@test.com',
      password: 'TestPassword1',
    };
    const loginPayloadWrong = {
      email: 'test1@test.com',
      password: 'TestPassword2',
    };
    //Кейс 1: данные пользователя некорректные
    const loginCorrectResponse = await appController.login(loginPayloadCorrect);
    expect(loginCorrectResponse.code).toBe(200);
    expect(loginCorrectResponse.isSucceed).toBe(true);
    expect(loginCorrectResponse.message).toBe('LOGIN_SUCCESS');
    //Кейс 2: данные пользователя корректные
    await expect(appController.login(loginPayloadWrong)).rejects.toThrow();
  });
  it('[NEST] - Восстановление пароля', async () => {
    const restorationPayload = {
      email: 'test1@test.com',
    };
    //отправляем запрос на получение кода
    const restorationResponse = await appController.restorationRequest(
      restorationPayload,
    );
    expect(restorationResponse.code).toBe(201);
    expect(restorationResponse.isSucceed).toBe(true);
    expect(restorationResponse.message).toBe('REQ_SUCCESS');

    const restorationRequest = await redis.hgetall(
      restorationResponse.payload.confirmationToken,
    );
    //отправляем запрос с новым паролем и остальными данными
    const setNewPasswordPayload = {
      confirmationToken: restorationResponse.payload.confirmationToken,
      emailCode: restorationRequest.emailCode,
      password: 'MyNewPass42',
      re_password: 'MyNewPass42',
    };
    //отправляем запрос на получение кода
    const setNewPasswordResponse = await appController.setNewPassword(
      setNewPasswordPayload,
    );
    expect(setNewPasswordResponse.code).toBe(201);
    expect(setNewPasswordResponse.isSucceed).toBe(true);
    expect(setNewPasswordResponse.message).toBe('SETNEWPASSWORD_SUCCESS');
  });
  it('[NEST] - Логин с новым паролем', async () => {
    const loginPayloadNewPass = {
      email: 'test1@test.com',
      password: 'MyNewPass42',
    };
    const loginNew = await appController.login(loginPayloadNewPass);
    expect(loginNew.code).toBe(200);
    expect(loginNew.isSucceed).toBe(true);
    expect(loginNew.message).toBe('LOGIN_SUCCESS');
  });
});
