import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import * as request from 'supertest';

describe('[Entrance] Media - (e2e)', () => {
  let app: INestApplication;
  const env = process.env;
  let cookies;

  beforeAll(async () => {
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
  });

  afterAll(async () => {
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
  it('[NEST] - Удаление лайка', async () => {
    const likePayload = {
      postId: 1,
    };
    const likeResponse = await request(app.getHttpServer())
      .patch('/media/like')
      .send(likePayload)
      .set('Cookie', cookies)
      .expect(201);
  });
  it('[NEST] - Создание лайка - пост есть', async () => {
    const likePayload = {
      postId: 1,
    };
    const likeResponse = await request(app.getHttpServer())
      .patch('/media/like')
      .send(likePayload)
      .set('Cookie', cookies)
      .expect(201);
  });
  it('[NEST] - Создание лайка - поста нет', async () => {
    const likePayload = {
      postId: 123213213,
    };
    const likeResponse = await request(app.getHttpServer())
      .patch('/media/like')
      .send(likePayload)
      .set('Cookie', cookies)
      .expect(404);
  });
  it('[NEST] - Поиск лайка на посте - пост, пользователь и лайк есть', async () => {
    const likeResponse = await request(app.getHttpServer())
      .get('/media/checkLike/1')
      .set('Cookie', cookies)
      .expect(200);
  });
  it('[NEST] - Поиск лайка на посте - пользователя нет', async () => {
    const likeResponse = await request(app.getHttpServer())
      .get('/media/checkLike/1')
      .expect(401);
  });
  it('[NEST] - Поиск лайка на посте - пост, нет поста', async () => {
    const likeResponse = await request(app.getHttpServer())
      .get('/media/checkLike/1123132')
      .set('Cookie', cookies)
      .expect(404);
  });
  it('[NEST] - Удаление лайка - поста нет', async () => {
    const likePayload = {
      postId: 123213213,
    };
    const likeResponse = await request(app.getHttpServer())
      .patch('/media/like')
      .send(likePayload)
      .set('Cookie', cookies)
      .expect(404);
  });
  it('[NEST] - Удаление лайка', async () => {
    const likePayload = {
      postId: 1,
    };
    const likeResponse = await request(app.getHttpServer())
      .patch('/media/like')
      .send(likePayload)
      .set('Cookie', cookies)
      .expect(201);
  });

  //--комментарии--//
  let commentId: number;
  it('[NEST] - Создание коммента - пост есть', async () => {
    const commentPayload = {
      text: 'TestText111111',
      postId: 1,
    };
    const commentResponse = await request(app.getHttpServer())
      .post('/media/createComment')
      .send(commentPayload)
      .set('Cookie', cookies)
      .expect(201);
    commentId = commentResponse.body.payload.commentId;
  });
  it('[NEST] - Создание коммента - поста нет', async () => {
    const commentPayload = {
      text: 'TestText111111',
      postId: 123213213,
    };
    const commentResponse = await request(app.getHttpServer())
      .post('/media/createComment')
      .send(commentPayload)
      .set('Cookie', cookies)
      .expect(404);
  });
  console.log(commentId);
  it('[NEST] - Удаление коммента', async () => {
    const commentPayload = {
      commentId,
      postId: 1,
    };
    const commentResponse = await request(app.getHttpServer())
      .delete('/media/deleteComment')
      .send(commentPayload)
      .set('Cookie', cookies)
      .expect(201);
  });
  it('[NEST] - Поиск коммента на посте - пост, пользователь и коммента есть', async () => {
    const commentResponse = await request(app.getHttpServer())
      .get('/media/getComments/1')
      .set('Cookie', cookies)
      .expect(200);
  });
  it('[NEST] - Поиск коммента на посте - пользователя нет', async () => {
    const commentResponse = await request(app.getHttpServer())
      .get('/media/getComments/1')
      .expect(200);
  });
  it('[NEST] - Поиск коммент на посте - пост, нет поста', async () => {
    const commentResponse = await request(app.getHttpServer())
      .get('/media/getComments/1123132')
      .set('Cookie', cookies)
      .expect(404);
  });
  it('[NEST] - Удаление коммента - поста нет', async () => {
    const commentPayload = {
      commentId,
      postId: 123213213,
    };
    const commentResponse = await request(app.getHttpServer())
      .delete('/media/deleteComment')
      .send(commentPayload)
      .set('Cookie', cookies)
      .expect(404);
  });
  it('[NEST] - Удаление коммент', async () => {
    const commentPayload = {
      commentId,
      postId: 1,
    };
    const commentResponse = await request(app.getHttpServer())
      .delete('/media/deleteComment')
      .send(commentPayload)
      .set('Cookie', cookies)
      .expect(201);
  });
});
