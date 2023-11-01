import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/Modules/postgres/Entities/user.entity';
import { ArrayContains, Like, Repository } from 'typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { DatabasePGError } from '@/Errors/postgresErrors/postgresErrors';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { GetPostsBodyDto } from '@/DTO/posts/getPosts';

@Injectable()
export default class PostRepo {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(user: User, postData: CreatePostBodyDto['newPostData']) {
    const { title, tags, texts, description, picture } = postData;
    const post = new Post();
    post.picture = picture;
    post.title = title;
    post.description = description;
    post.texts = texts;
    post.tags = tags; // Присвоим массив тегов
    post.author = user; // Устанавливаем связь с пользователем

    // Сохраните пост в базе данных
    const savedPost = await this.postRepository.save(post).catch((error) => {
      console.log(error.message);
      throw new DatabasePGError('POST_CREATE_ERROR', error.message);
    });
    return savedPost.postId;
  }

  async getPosts(
    page = 1,
    criteria: GetPostsBodyDto['criteria'] = {},
    take = 6,
  ): Promise<Post[]> {
    const skip = (page - 1) * (take - 1); // Пропустить предыдущие страницы
    // Базовые условия для поиска
    const whereConditions = {};

    // Если передано название для поиска
    if (criteria.title) {
      whereConditions['title'] = Like(`%${criteria.title}%`);
    }

    // Если переданы теги для поиска
    if (criteria.tags && criteria.tags.length) {
      whereConditions['tags'] = ArrayContains(criteria.tags);
    }

    // Если передан ID автора
    if (criteria.authorId) {
      whereConditions['authorId'] = criteria.authorId;
    }

    return await this.postRepository
      .find({
        where: whereConditions,
        take: take,
        skip: skip,
        order: { postId: 'DESC' },
      })
      .catch((error) => {
        throw new DatabasePGError('POST_SEARCH_ERROR', error.message);
      });
  }

  findPostByPostId(postId: number, selectFields?: (keyof Post)[]) {
    //Пытаемся получить данные по имейлу
    return this.postRepository
      .findOne({
        where: { postId: postId },
        ...(selectFields &&
          selectFields.length > 0 && { select: selectFields }),
      })
      .catch((error) => {
        throw new DatabasePGError('NO_POST', error.message);
      });
  }

  increasePostViews(postId: number) {
    // Увеличить значение поля "views" на 1
    return this.postRepository
      .increment({ postId }, 'views', 1)
      .catch((error) => {
        throw new DatabasePGError('NO_POST', error.message);
      });
  }

  findExactPost(postId: number) {
    return this.postRepository
      .findOne({
        where: { postId: postId },
        cache: {
          id: `exact_post_${postId}`,
          milliseconds: 120_000,
        },
      })
      .catch((error) => {
        throw new DatabasePGError('POST_SEARCH_ERROR', error.message);
      });
  }
  deletePost(postId: number) {
    //!!!В БАЗЕ ДАННЫХ НАСТРОЕН КАСКАД НА УДАЛЕНИЕ КОММЕНТОВ И ЛАЙКОВ
    return this.postRepository.delete({
      postId: postId,
    });
  }
  findPopularPosts() {
    return this.postRepository
      .find({
        take: 5, // Ограничение на количество результатов
        order: { views: 'DESC' }, // Сортировка по убыванию по полю "views"
      })
      .catch((error) => {
        throw new DatabasePGError('POST_SEARCH_ERROR', error.message);
      });
  }
}
