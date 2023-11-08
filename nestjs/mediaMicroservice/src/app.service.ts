import { Injectable } from '@nestjs/common';
import PostgresService from '@/Modules/postgres/postgres.service';
import {
  CheckUserPostLikesBody,
  CheckUserPostLikesOutput,
} from '@/DTO/media/checkUserPostLikesBody';
import {
  GetPostCommentsBody,
  GetPostCommentsOutput,
} from '@/DTO/media/getPostComments';
import {
  CreateCommentBody,
  CreateCommentOutput,
} from '@/DTO/media/createComment';
import {
  DeleteCommentBody,
  DeleteCommentOutput,
} from '@/DTO/media/deleteComment';
import { LikePatchBody, LikePatchOutput } from '@/DTO/media/patchLikeDto';

@Injectable()
export class AppService {
  constructor(public readonly postgresService: PostgresService) {}

  async checkLike(
    body: CheckUserPostLikesBody,
  ): Promise<CheckUserPostLikesOutput> {
    const { postId, userId } = body;
    //Шаг 1: ищем лайк
    const liked = await this.postgresService.likesService.checkIfUserLikesPosts(
      userId,
      postId,
    );
    return {
      code: 200,
      isSucceed: true,
      message: 'LIKED_FOUND_SUCCEED',
      payload: {
        liked,
      },
    };
  }

  async patchLike(body: LikePatchBody): Promise<LikePatchOutput> {
    const { userId, postId } = body;
    //Проверяем лайк
    const liked = await this.postgresService.likesService.checkIfUserLikesPosts(
      userId,
      postId,
    );
    //Пытаемся создать или удалить лайк
    !liked
      ? await this.postgresService.likesService.createNewLike(userId, postId)
      : await this.postgresService.likesService.deleteLike(userId, postId);
    return {
      code: 201,
      isSucceed: true,
      message: 'LIKE_SUCCESS',
    };
  }

  async getPostComments(
    body: GetPostCommentsBody,
  ): Promise<GetPostCommentsOutput> {
    const { postId } = body;
    //Шаг 1: ищем пост, если он есть - добавляем +1 к просмотрам
    const comments = await this.postgresService.commentsService.getPostComments(
      postId,
    );
    return {
      code: 200,
      isSucceed: true,
      message: 'COMMENTS_FOUND_SUCCEED',
      payload: {
        comments,
      },
    };
  }

  async createComment(body: CreateCommentBody): Promise<CreateCommentOutput> {
    const { userId, postId, text } = body;
    //Пытаемся создать лайк
    const resultId =
      await this.postgresService.commentsService.createNewComment(
        userId,
        postId,
        text,
      );
    return {
      code: 201,
      isSucceed: true,
      message: 'COMMENT_CREATED',
      payload: {
        commentId: resultId,
      },
    };
  }

  async deleteComment(body: DeleteCommentBody): Promise<DeleteCommentOutput> {
    //Пытаемся создать лайк
    const result = await this.postgresService.commentsService.deleteComment(
      body,
    );
    return {
      code: 201,
      isSucceed: true,
      message: 'COMMENT_DELETED',
    };
  }
}
