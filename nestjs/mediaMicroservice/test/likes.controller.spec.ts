import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { AppModule } from '@/app.module';
import { CheckUserPostLikesBody } from '@/DTO/media/checkUserPostLikesBody';
import ErrorHandler from '@/Errors/errors';
import { LikePatchBody } from '@/DTO/media/patchLikeDto';

describe('[MICROSERVICE] - Медия - лайки', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appController = app.get<AppController>(AppController);
  });
  it('[SERVICE] - Удаляем лайк 1-1 ', async () => {
    const deleteLikeBody: LikePatchBody = {
      userId: 1,
      postId: 1,
    };
    const response = await appController
      .createOrDeleteLike(deleteLikeBody)
      .catch((error) => ErrorHandler(error));
    expect(response.isSucceed).toBe(true);
  });
  it('[NEST] - Создание лайка', async () => {
    const createPostBody: LikePatchBody = {
      userId: 1,
      postId: 1,
    };
    const response = await appController
      .createOrDeleteLike(createPostBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(201);
  });
  it('[NEST] - Создание лайка - дупликат', async () => {
    const createPostBody: LikePatchBody = {
      userId: 1,
      postId: 1,
    };
    const response = await appController
      .createOrDeleteLike(createPostBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(201);
  });
  it('[NEST] - Создание лайка - пользователя нет', async () => {
    const createPostBody: LikePatchBody = {
      userId: 881283183,
      postId: 1,
    };
    const response = await appController
      .createOrDeleteLike(createPostBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(404);
  });
  it('[NEST] - Создание лайка - поста нет', async () => {
    const createPostBody: LikePatchBody = {
      userId: 1,
      postId: 8686868,
    };
    const response = await appController
      .createOrDeleteLike(createPostBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(404);
  });
  let likeId: number;
  it('[NEST] - Поиск лайка - лайк есть', async () => {
    const createPostBody: CheckUserPostLikesBody = {
      userId: 1,
      postId: 1,
    };
    const response = await appController
      .checkLike(createPostBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(200);
  });
  it('[NEST] - Удаляем новый лайк ', async () => {
    const deleteLikeBody: LikePatchBody = {
      userId: 1,
      postId: 1,
    };
    const response = await appController
      .createOrDeleteLike(deleteLikeBody)
      .catch((error) => ErrorHandler(error));
    expect(response.isSucceed).toBe(true);
    expect(response.code).toBe(201);
  });
  it('[NEST] - Поиск лайка - лайка нет', async () => {
    const createPostBody: CheckUserPostLikesBody = {
      userId: 1,
      postId: 1,
    };
    const response = await appController
      .checkLike(createPostBody)
      .catch((error) => ErrorHandler(error));
    expect(response.code).toBe(200);
  });
});
