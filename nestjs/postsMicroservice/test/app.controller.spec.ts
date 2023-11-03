import {Test, TestingModule} from '@nestjs/testing';
import {AppController} from '@/app.controller';
import {AppModule} from '@/app.module';
import {CreatePostBodyDto} from '@/DTO/posts/createPost';
import {GetExactPostQueryDto} from '@/DTO/posts/getExactPost';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        appController = app.get<AppController>(AppController);
    });
    let newPostId: number;
    describe('Микросервис постов', () => {
        it('[NEST] - Создание поста - пользователь есть ✅', async () => {
            const createPostBody: CreatePostBodyDto = {
                userId: 1,
                newPostData: {
                    picture:
                        'https://hsto.org/r/w780/getpro/habr/upload_files/07f/b0c/f64/07fb0cf64efb401c980f33f3a652cc61.jpg',
                    title: 'Ну типа тайтл',
                    description: 'ЭЙЙЙ, НЕ ЗАСЛОНЯЙ МНЕ СОЛНЦЕ',
                    texts: 'Ну здесь тестовой даты ооочень много, но мало....',
                    tags: ['HUMOR'],
                },
            };
            const response = await appController.createNewPost(createPostBody);
            newPostId = response.payload.postId;
            expect(response.code).toBe(201);
            expect(response.payload?.postId > 0).toBeTruthy();
        });
        it('[NEST] - Создание поста - пользователя нет 🐒', async () => {
            const createPostBody: CreatePostBodyDto = {
                userId: 612723930,
                newPostData: {
                    picture:
                        'https://hsto.org/r/w780/getpro/habr/upload_files/07f/b0c/f64/07fb0cf64efb401c980f33f3a652cc61.jpg',
                    title: 'Ну типа тайтл',
                    description: 'ЭЙЙЙ, НЕ ЗАСЛОНЯЙ МНЕ СОЛНЦЕ',
                    texts: 'Ну здесь тестовой даты ооочень много, но мало....',
                    tags: ['ANIME'],
                },
            };
            await expect(
                appController.createNewPost(createPostBody),
            ).rejects.toThrowError('NO_USER');
        });
        it('[NEST] - Поиск поста - пост есть', async () => {
            const findExactPostQuery: GetExactPostQueryDto = {postId: 1};
            const postResponse = await appController.findExactPost(
                findExactPostQuery,
            );
            expect(postResponse.code).toBe(200);
        });
        it('[NEST] - Поиск поста - поста нет', async () => {
            const findExactPostQuery: GetExactPostQueryDto = {
                postId: 15321,
            };
            await expect(
                appController.findExactPost(findExactPostQuery),
            ).rejects.toThrowError('NO_POST');
        });
        it('[NEST] - Удаление поста - пост есть', async () => {
            await appController.deletePost({postId: newPostId, userId: 1});
        });
        it('[NEST] - Поиск постов - критериев нет', async () => {
            const findBody = {page: 1};
            const findpostsresponse = await appController.findPosts(findBody);
            expect(findpostsresponse.code).toBe(200);
            expect(findpostsresponse.payload.hasMore).toBe(
                findpostsresponse.payload.posts.length > 5,
            );
        });
    });
});
