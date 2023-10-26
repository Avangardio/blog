import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '@/app.controller';
import { AppModule } from '@/app.module';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { NoUserError } from "@/Errors/postgresErrors/postgresErrors";

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    appController = app.get<AppController>(AppController);
  });

  describe('Микросервис постов', () => {
    it('[NEST] - Создание поста - пользователь есть ✅', async () => {
      const createPostBody: CreatePostBodyDto = {
        userId: 1,
        newPostData: {
          title: 'Ну типа тайтл',
          description: 'ЭЙЙЙ, НЕ ЗАСЛОНЯЙ МНЕ СОЛНЦЕ',
          texts: 'Ну здесь тестовой даты ооочень много, но мало....',
          tags: ['ANIME'],
        },
      };
      const response = await appController.createNewPost(createPostBody);
      expect(response.code).toBe(201);
      expect(response.payload?.postId > 0).toBeTruthy();
    });
    it('[NEST] - Создание поста - пользователя нет 🐒', async () => {
      const createPostBody: CreatePostBodyDto = {
        userId: 612723930,
        newPostData: {
          title: 'Ну типа тайтл',
          description: 'ЭЙЙЙ, НЕ ЗАСЛОНЯЙ МНЕ СОЛНЦЕ',
          texts: 'Ну здесь тестовой даты ооочень много, но мало....',
          tags: ['ANIME'],
        },
      };
      await expect( appController.createNewPost(createPostBody)).rejects.toThrowError('NO_USER');
    });
  });
});
