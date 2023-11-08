import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { AppModule } from '@/app.module';
import ErrorHandler from '@/Errors/errors';
import {
  GetPostCommentsBody,
  GetPostCommentsOutput,
} from '@/DTO/media/getPostComments';
import {
  CreateCommentBody,
  CreateCommentOutput,
} from '@/DTO/media/createComment';
import { DeleteCommentBody } from '@/DTO/media/deleteComment';

describe('[MICROSERVICE] - Медия - комментарии', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appController = app.get<AppController>(AppController);
  });
  let commentsLength: number;
  it('[NEST] - Поиск комментариев', async () => {
    const getCommentsBody: GetPostCommentsBody = {
      postId: 1,
    };
    const response = (await appController
      .getComments(getCommentsBody)
      .catch((error) => ErrorHandler(error))) as GetPostCommentsOutput;
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
      .catch((error) => ErrorHandler(error))) as CreateCommentOutput;
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
      .catch((error) => ErrorHandler(error))) as GetPostCommentsOutput;
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
      .catch((error) => ErrorHandler(error))) as GetPostCommentsOutput;
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
      .catch((error) => ErrorHandler(error))) as GetPostCommentsOutput;
    expect(response.code).toBe(201);
  });
});
