import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { Repository } from 'typeorm';
import { Post_like } from '@/Modules/postgres/Entities/post_like.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';
import {
  DatabasePGError,
  EntityExists,
} from '@/Errors/postgresErrors/postgresErrors';

@Injectable()
export default class LikeRepo {
  constructor(
    @InjectRepository(Post_like)
    private readonly likeRepository: Repository<Post_like>,
  ) {}

  checkUserPostLike(user: User, post: Post) {
    return this.likeRepository
      .findOne({
        where: {
          post: { postId: post.postId },
          user: { userId: user.userId },
        },
      })
      .catch((error) => {
        throw new DatabasePGError('LIKES_ERROR', error.message);
      });
  }

  async createLike(user: User, post: Post) {
    const like = new Post_like();
    like.post = post;
    like.user = user;
    // Сохраняем пост в базе данных
    const savedLike = await this.likeRepository.save(like).catch((error) => {
      // Перехватываем ошибку уникальности
      if (error.code == '23505') {
        throw new EntityExists(
          'DUPLICATE_LIKE_ERROR',
          'A duplicate like already exists.',
        );
      } else {
        // Обрабатываем другие ошибки, если они возникают
        throw new DatabasePGError('LIKE_CREATE_ERROR', error.message);
      }
    });
    return savedLike.likeId;
  }

  deleteLike(user: User, post: Post) {
    const { userId } = user;
    const { postId } = post;
    return this.likeRepository
      .delete({ post: { postId }, user: { userId } })
      .catch((error) => {
        throw new DatabasePGError('LIKE_DELETE_ERROR', error.message);
      });
  }
}
