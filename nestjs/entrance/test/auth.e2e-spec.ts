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
import fastifyCookie from '@fastify/cookie';
import generateWrongField from './generateWrongData';

describe('[Entrance] Auth - (e2e)', () => {
  let app: INestApplication;
  let redis: Redis;
  let pool;
  const env = process.env;
  let cookies;

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
    await redis.del('admin@test.com');
    //Создаем клиента
    const client = await pool.connect();
    //Удаляем пользователя
    await client.query('DELETE FROM users WHERE users.email = $1::text', [
      'test1@test.com',
    ]);
    //Инициаилизируем нестжс
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    const secret = env.JWT;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await app.register(fastifyCookie, {
      secret: secret, // for cookies signature
    });
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
    client.release();
    //const authcontroller = app.get<MediaController>(MediaController);
  });
  afterAll(async () => {
    //Выключаем редис подключение и нестжс
    await redis.quit();
    await pool.end();
    await app.close();
  }, 10000);
  const wrongData = {
    emails: [generateWrongField('email', 5)],
    passwords: [generateWrongField('password', 5)],
    name: [generateWrongField('name', 5)],
    language: [generateWrongField('language', 5)],
    confirmationToken: [generateWrongField('confirmationToken', 5)],
    emailCode: [generateWrongField('emailCode', 5)],
  };

  it('[NEST] - Регистрация пользователя', async () => {
    //Этап 1: Начальная регистрация
    const registrationPayload = {
      email: 'test1@test.com',
      password: 'TestPassword1',
      name: 'Test User',
      language: 'RU',
    };

    const registrationResponse = await request(app.getHttpServer())
      .post('/auth/registration')
      .send(registrationPayload)
      .expect(201);
    const confirmationToken =
      registrationResponse.body.payload.confirmationToken;
    const confirmationRequest = await redis.hgetall(confirmationToken);
    //Этап 2: Подтверждение регистрации
    const confirmationPayload = {
      confirmationToken,
      emailCode: confirmationRequest.emailCode,
    };
    const confirmationResponse = await request(app.getHttpServer())
      .post('/auth/confirmation')
      .send(confirmationPayload)
      .expect(201);
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
    const loginWrongResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayloadWrong)
      .expect(400);

    //Кейс 2: данные пользователя корректные
    const loginCorrectResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayloadCorrect)
      .expect(200);
  });
  it('[NEST] - Выход из аккаунта', async () => {
    const logoutResponse = await request(app.getHttpServer())
      .get('/auth/logout')
      .expect(200);
  });
  it('[NEST] - Восстановление пароля', async () => {
    const restorationPayload = {
      email: 'test1@test.com',
    };
    //отправляем запрос на получение кода
    const restorationResponse = await request(app.getHttpServer())
      .post('/auth/restoration')
      .send(restorationPayload)
      .expect(201);
    const restorationRequest = await redis.hgetall(
      restorationResponse.body.payload.confirmationToken,
    );
    //отправляем запрос с новым паролем и остальными данными
    const setNewPasswordPayload = {
      confirmationToken: restorationResponse.body.payload.confirmationToken,
      emailCode: restorationRequest.emailCode,
      password: 'MyNewPass42',
      re_password: 'MyNewPass42',
    };
    //отправляем запрос на получение кода
    const setNewPasswordResponse = await request(app.getHttpServer())
      .post('/auth/setNewPassword')
      .send(setNewPasswordPayload)
      .expect(201);
  });
  it('[NEST] - Логин с новым паролем', async () => {
    const loginPayloadNewPass = {
      email: 'test1@test.com',
      password: 'MyNewPass42',
    };
    const loginNewResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayloadNewPass)
      .expect(200);
    cookies = loginNewResponse.headers['set-cookie'];
  });
  it('[NEST] - Аутентификация', async () => {
    const authenticateResponse = await request(app.getHttpServer())
      .get('/auth/authenticate')
      .set('Cookie', cookies)
      .expect(200);
    expect(authenticateResponse.body.username).toBe('Test User');
  });
  it('[NEST] - Штурм эндпоинтов неправильными значениями - Регистрация', async () => {
    for (let i = 0; i < 5; i++) {
      const [email, password, name, language, confirmationToken, emailCode] = [
        wrongData.emails[i],
        wrongData.passwords[i],
        wrongData.name[i],
        wrongData.language[i],
        wrongData.confirmationToken[i],
        wrongData.emailCode[i],
      ];
      const registrationPayload = {
        email,
        password,
        name,
        language,
      };
      const registrationResponse = await request(app.getHttpServer())
        .post('/auth/registration')
        .send(registrationPayload)
        .expect(406);
      const confirmationPayload = {
        confirmationToken,
        emailCode,
      };
      const confirmationResponse = await request(app.getHttpServer())
        .post('/auth/confirmation')
        .send(confirmationPayload)
        .expect(406);
    }
  });
  it('[NEST] - Штурм эндпоинтов неправильными значениями - Логин', async () => {
    for (let i = 0; i < 5; i++) {
      const [email, password, name, language, confirmationToken, emailCode] = [
        wrongData.emails[i],
        wrongData.passwords[i],
        wrongData.name[i],
        wrongData.language[i],
        wrongData.confirmationToken[i],
        wrongData.emailCode[i],
      ];
      const loginPayload = {
        email,
        password,
      };
      const loginWrongResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(loginPayload)
        .expect(406);
    }
  });
  it('[NEST] - Штурм эндпоинтов неправильными значениями - Восстановление пароля + новый пароль', async () => {
    for (let i = 0; i < 5; i++) {
      const [email, password, name, language, confirmationToken, emailCode] = [
        wrongData.emails[i],
        wrongData.passwords[i],
        wrongData.name[i],
        wrongData.language[i],
        wrongData.confirmationToken[i],
        wrongData.emailCode[i],
      ];
      const restorationPayload = {
        email,
      };
      //отправляем запрос на получение кода
      const restorationResponse = await request(app.getHttpServer())
        .post('/auth/restoration')
        .send(restorationPayload)
        .expect(406);
      //отправляем запрос с новым паролем и остальными данными
      const setNewPasswordPayload = {
        confirmationToken,
        emailCode,
        password,
        re_password: password + '123',
      };
      //отправляем запрос на получение кода
      const setNewPasswordResponse = await request(app.getHttpServer())
        .post('/auth/setNewPassword')
        .send(setNewPasswordPayload)
        .expect(406);
    }
  });
});
