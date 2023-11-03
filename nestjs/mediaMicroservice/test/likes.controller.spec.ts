import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { AppModule } from '@/app.module';
import {CheckUserPostLikesBody} from "@/DTO/media/checkUserPostLikesBody";
import ErrorHandler from "@/Errors/errors";
import {CreateLikeBody} from "@/DTO/media/createLikeBody";
import {DeleteLikeBody} from "@/DTO/media/deleteLikeBody";

describe('[MICROSERVICE] - Медия - лайки', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appController = app.get<AppController>(AppController);
  });
    it('[SERVICE] - Удаляем лайк 1-1 ', async () => {
      const deleteLikeBody: DeleteLikeBody = {
        userId: 1,
        postId: 1
      };
      const response = await appController.deleteLike(deleteLikeBody).catch((error) => ErrorHandler(error))
      expect(response.isSucceed).toBe(true)
    });
    it('[NEST] - Создание лайка', async () => {
      const createPostBody: CreateLikeBody = {
        userId: 1,
        postId: 1
      };
      const response = await appController.createLike(createPostBody).catch((error) => ErrorHandler(error))
      expect(response.code).toBe(201);
    });
    it('[NEST] - Создание лайка - дупликат', async () => {
      const createPostBody: CreateLikeBody = {
        userId: 1,
        postId: 1
      };
      const response = await appController.createLike(createPostBody).catch((error) => ErrorHandler(error))
      expect(response.code).toBe(400);
    });
    it('[NEST] - Создание лайка - пользователя нет', async () => {
      const createPostBody: CreateLikeBody = {
        userId: 881283183,
        postId: 1
      };
      const response = await appController.createLike(createPostBody).catch((error) => ErrorHandler(error))
      expect(response.code).toBe(404);
    });
    it('[NEST] - Создание лайка - поста нет', async () => {
      const createPostBody: CreateLikeBody = {
        userId: 1,
        postId: 8686868
      };
      const response = await appController.createLike(createPostBody).catch((error) => ErrorHandler(error))
      expect(response.code).toBe(404);
    });
    let likeId: number;
    it('[NEST] - Поиск лайка - лайк есть', async () => {
      const createPostBody: CheckUserPostLikesBody = {
        userId: 1,
        postId: 1
      };
      const response = await appController.checkLike(createPostBody).catch((error) => ErrorHandler(error))
      expect(response.code).toBe(200);
    });
    it('[NEST] - Удаляем новый лайк ', async () => {
      const deleteLikeBody: DeleteLikeBody = {
        userId: 1,
        postId: 1
      };
      const response = await appController.deleteLike(deleteLikeBody).catch((error) => ErrorHandler(error))
      expect(response.isSucceed).toBe(true)
      expect(response.code).toBe(201);
    });
    it('[NEST] - Поиск лайка - лайка нет', async () => {
      const createPostBody: CheckUserPostLikesBody = {
        userId: 1,
        postId: 1
      };
      const response = await appController.checkLike(createPostBody).catch((error) => ErrorHandler(error))
      expect(response.code).toBe(404);
    });
});

