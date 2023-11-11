import { INestApplication } from '@nestjs/common';
import Redis from 'ioredis';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import { Pool } from 'pg';
import * as request from 'supertest';

describe('[Entrance] Posts - (e2e)', () => {
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

  it('[NEST] - Логин тестового пользователя', async () => {
    const loginPayload = {
      email: 'admin@test.com',
      password: 'MyNewPass42',
    };
    const loginNewResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayload)
      .expect(200);
    cookies = loginNewResponse.headers['set-cookie'];
  });
  let newPostId: number;
  it('[NEST] - Создание поста', async () => {
    const createPostBody = {
      newPostData: {
        picture:
          'https://hsto.org/r/w780/getpro/habr/upload_files/07f/b0c/f64/07fb0cf64efb401c980f33f3a652cc61.jpg',
        title: 'Ну типа тайтл',
        description: 'Тесты тесты тестыыыы',
        texts: 'Здесь тестовой даты ооочень много, но мало....',
        tags: ['Humor'],
      },
    };
    const createPostResponse = await request(app.getHttpServer())
      .post('/posts/createPost')
      .send(createPostBody)
      .set('Cookie', cookies)
      .expect(201);
    newPostId = createPostResponse.body.payload.postId;
  });
  it('[NEST] - Поиск этого самого поста', async () => {
    const findPostResponse = await request(app.getHttpServer())
      .get('/posts/findExactPost' + `?postId=${newPostId}`)
      .set('Cookie', cookies)
      .expect(200);
  });
  it('[NEST] - Поиск постов фида - страница есть', async () => {
    const findPostResponse = await request(app.getHttpServer())
      .get('/posts/findPosts/' + 1)
      .set('Cookie', cookies)
      .expect(200);
  });
  it('[NEST] - Поиск постов фида - страницы нет', async () => {
    const findPostResponse = await request(app.getHttpServer())
      .get('/posts/findPosts/' + 420420)
      .set('Cookie', cookies)
      .expect(404);
  });
  it('[NEST] - Поиск популярных постов', async () => {
    const findPostResponse = await request(app.getHttpServer())
      .get('/posts/findPopularPosts')
      .set('Cookie', cookies)
      .expect(200);
  });
  it('[NEST] - Удаление постов', async () => {
    const deletePayload = {
      postId: newPostId,
    };
    const findPostResponse = await request(app.getHttpServer())
      .delete('/posts/deletePost')
      .send(deletePayload)
      .set('Cookie', cookies)
      .expect(200);
  });
});
