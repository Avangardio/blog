import { Injectable } from '@nestjs/common';
import PostgresService from '@/Modules/postgres/postgres.service';
import { CreatePostBodyDto, CreatePostOutputDto } from '@/DTO/posts/createPost';
import {
  GetExactPostOutputDto,
  GetExactPostQueryDto,
} from '@/DTO/posts/getExactPost';
import {
  DeleteExactPostBodyDto,
  DeleteExactPostOutputDto,
} from '@/DTO/posts/deletePost';
import { GetPostsBodyDto, GetPostsOutputDto } from '@/DTO/posts/getPosts';

@Injectable()
export class AppService {
  constructor(public readonly postgresService: PostgresService) {}

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

  async getExactPost(
    body: GetExactPostQueryDto,
  ): Promise<GetExactPostOutputDto> {
    const { postId } = body;
    //Шаг 1: ищем пост, если он есть - добавляем +1 к просмотрам
    const post = await this.postgresService.postService.getExactPost(postId);
    return {
      code: 200,
      isSucceed: true,
      message: 'POST_FOUND_SUCCEED',
      payload: post,
    };
  }

  async deletePost(
    body: DeleteExactPostBodyDto,
  ): Promise<DeleteExactPostOutputDto> {
    const { postId, userId } = body;
    await this.postgresService.postService.deletePost(postId, userId);
    return {
      code: 200,
      isSucceed: true,
      message: 'POST_DELETE_SUCCEED',
    };
  }

  async findPosts(body: GetPostsBodyDto): Promise<GetPostsOutputDto> {
    const { page, criteria } = body;
    //Шаг 1: Ищем посты и есть ли еще
    const postsOutput = await this.postgresService.postService.findPosts(
      page,
      criteria,
    );
    return {
      code: 200,
      isSucceed: true,
      message: 'FIND_SUCCEED',
      payload: postsOutput,
    };
  }

  async findPopularPosts() {
    const posts = await this.postgresService.postService.findPopularPosts();
    return {
      code: 200,
      isSucceed: true,
      message: 'FIND_SUCCEED',
      payload: posts,
    };
  }
}
