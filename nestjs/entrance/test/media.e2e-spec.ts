import { INestApplication } from '@nestjs/common';
import Redis from 'ioredis';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import generateWrongField from './generateWrongData';
import { Pool } from 'pg';
import * as request from 'supertest';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { GetPostCommentsBody } from "@/DTO/media/getPostComments";
import { CreateCommentBody } from "@/DTO/media/createComment";

describe('[Entrance] Posts - (e2e)', () => {
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
      email: '12lol34lol56lol@gmail.com',
      password: 'MyNewPass42',
    };
    const loginNewResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginPayload)
      .expect(200);
    cookies = loginNewResponse.headers['set-cookie'];
  });
  it('[NEST] - Поиск комментариев', async () => {
    const getCommentsBody: GetPostCommentsBody = {
      postId: 1,
    };
    const response = (await appController
      .getComments(getCommentsBody)
    expect(response.code).toBe(200);
    commentsLength = response.payload.comments.length;
  });
  let NewCommentId1: number;
  it('[NEST] - Создание комментария', async () => {
    const createCommentBody: CreateCommentBody = {
      text: '12311012301010312',
      userId: 1,
      postId: 1,
    };
    const response = (await appController
      .createComment(createCommentBody)
    expect(response.code).toBe(201);
    NewCommentId1 = response.payload.commentId;
  });
  it('[NEST] - Создание комментария - пользователя нет', async () => {
    const createCommentBody: CreateCommentBody = {
      text: '111Comment',
      userId: 67582134,
      postId: 1,
    };
    const response = await appController
      .createComment(createCommentBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(404);
  });
  it('[NEST] - Создание комментария - поста нет', async () => {
    const createCommentBody: CreateCommentBody = {
      text: '111Comment',
      userId: 1,
      postId: 21312321,
    };
    const response = await appController
      .createComment(createCommentBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(404);
  });
  it('[NEST] - Поиск комментариев - проверка на +1', async () => {
    const getCommentsBody: GetPostCommentsBody = {
      postId: 1,
    };
    const response = (await appController
      .getComments(getCommentsBody)
    expect(response.code).toBe(200);
    expect(response.payload.comments.length - commentsLength == 1).toBe(true);
  });
  it('[NEST] - Удаление комментария - комментарий есть', async () => {
    const deleteCommentBody: DeleteCommentBody = {
      userId: 1,
      commentId: NewCommentId1,
      postId: 1,
    };
    const response = (await appController
      .deleteComment(deleteCommentBody)
    expect(response.code).toBe(201);
  });
  it('[NEST] - Удаление комментария - комментария нет', async () => {
    const deleteCommentBody: DeleteCommentBody = {
      userId: 1,
      commentId: 555555555,
      postId: 1,
    };
    const response = (await appController
      .deleteComment(deleteCommentBody)
    expect(response.code).toBe(201);
  });
});
