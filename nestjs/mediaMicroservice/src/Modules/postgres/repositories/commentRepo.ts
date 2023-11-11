import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post_comment } from '@/Modules/postgres/Entities/post_comment.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import {
  DatabasePGError,
  EntityExists,
} from '@/Errors/postgresErrors/postgresErrors';

@Injectable()
export default class CommentRepo {
  constructor(
    @InjectRepository(Post_comment)
    private readonly commentRepository: Repository<Post_comment>,
  ) {}

  findPostComments(post: Post) {
    return this.commentRepository
      .find({
        where: {
          post: { postId: post.postId },
        },
        relations: ['user'],
        select: {
          user: {
            username: true,
            userId: true,
          },
        },
      })
      .catch((error) => {
        console.log(error)
        throw new DatabasePGError('COMMENTS_ERROR', error.message);
      });
  }

  async createComment(user: User, post: Post, text: string) {
    const comment = new Post_comment();
    comment.post = post;
    comment.user = user;
    comment.comment_text = text;
    // Сохраняем пост в базе данных
    const savedComment = await this.commentRepository
      .save(comment)
      .catch((error) => {
        // Перехватываем ошибку уникальности
        if (error.code == '23505') {
          throw new EntityExists(
            'DUPLICATE_COMMENT_ERROR',
            'A duplicate comment already exists.',
          );
        } else {
          // Обрабатываем другие ошибки, если они возникают
          throw new DatabasePGError('COMMENT_CREATE_ERROR', error.message);
        }
      });
    return savedComment.commentId;
  }

  deleteComment(user: User, post: Post, commentId: number) {
    const { userId } = user;
    const { postId } = post;
    return this.commentRepository
      .delete({ post: { postId }, user: { userId }, commentId: commentId })
      .catch((error) => {
        throw new DatabasePGError('COMMENT_DELETE_ERROR', error.message);
      });
  }
}
