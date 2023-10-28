import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { Repository } from 'typeorm';
import { Post_like } from '@/Modules/postgres/Entities/post_like.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';
import { DatabasePGError } from '@/Errors/postgresErrors/postgresErrors';

@Injectable()
export default class LikeRepo {
  constructor(
    @InjectRepository(Post_like)
    private readonly likeRepository: Repository<Post_like>,
  ) {}
  async createLike(user: User, post: Post) {
    const like = new Post_like();
    like.post = post;
    like.user = user;
    // Сохраните пост в базе данных
    const savedLike = await this.likeRepository.save(like).catch((error) => {
      throw new DatabasePGError('LIKE_CREATE_ERROR', error.message);
    });
    return savedLike.likeId;
  }
  deleteLike(likeId: number) {
    return this.likeRepository.delete({ likeId: likeId }).catch((error) => {
      throw new DatabasePGError('LIKE_DELETE_ERROR', error.message);
    });
  }
}
