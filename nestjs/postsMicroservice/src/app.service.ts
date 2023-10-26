import { Injectable } from '@nestjs/common';
import RedisService from '@/Modules/redis/redis.service';
import PostgresService from '@/Modules/postgres/postgres.service';
import { CreatePostBodyDto, CreatePostOutputDto } from '@/DTO/posts/createPost';
@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
    public readonly postgresService: PostgresService,
  ) {}

  async createNewPost(body: CreatePostBodyDto): Promise<CreatePostOutputDto> {
    const { userId, newPostData } = body;
    //Шаг 1: вызываем метод, который проверит айди пользователя и попытается создать новый пост
    const newPostId = await this.postgresService.postService.createNewPost(
      userId,
      newPostData,
    );
    //Шаг 2: пост создался, возвращаем успех и айди нового поста
    return {
      code: 201,
      isSucceed: true,
      message: 'POST_CREATE_SUCCEED',
      payload: {
        postId: newPostId,
      },
    };
  }
}
