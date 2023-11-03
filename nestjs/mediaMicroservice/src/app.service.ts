import { Injectable } from '@nestjs/common';
import PostgresService from '@/Modules/postgres/postgres.service';
import {CheckUserPostLikesBody, CheckUserPostLikesOutput} from "@/DTO/media/checkUserPostLikesBody";
import {CreateLikeBody, CreateLikeOutput} from "@/DTO/media/createLikeBody";
import {DeleteLikeBody, DeleteLikeOutput} from "@/DTO/media/deleteLikeBody";
import {GetPostCommentsBody, GetPostCommentsOutput} from "@/DTO/media/getPostComments";
import {CreateCommentBody, CreateCommentOutput} from "@/DTO/media/createComment";
import {DeleteCommentBody, DeleteCommentOutput} from "@/DTO/media/deleteComment";
@Injectable()
export class AppService {
  constructor(public readonly postgresService: PostgresService) {}
  async checkLike(
    body: CheckUserPostLikesBody,
  ): Promise<CheckUserPostLikesOutput> {
    const { postId, userId } = body;
    //Шаг 1: ищем пост, если он есть - добавляем +1 к просмотрам
    const liked = await this.postgresService.likesService.checkIfUserLikesPosts(userId, postId);
    return {
      code: 200,
      isSucceed: true,
      message: 'LIKED_FOUND_SUCCEED',
      payload: {
        liked
      },
    };
  }
  async createLike(
      body: CreateLikeBody
  ): Promise<CreateLikeOutput>
  {
    const {userId, postId} = body;
    //Пытаемся создать лайк
    const result = await this.postgresService.likesService.createNewLike(userId, postId);
    return {
      code: 201,
      isSucceed: true,
      message: 'LIKE_CREATED',
    };
  }
  async deleteLike(
      body: DeleteLikeBody
  ): Promise<DeleteLikeOutput> {
    const {userId, postId} = body;
    //Пытаемся создать лайк
    const result = await this.postgresService.likesService.deleteLike(userId, postId);
    return {
      code: 201,
      isSucceed: true,
      message: 'LIKE_DELETED',
    };
  }

  async getPostComments(
      body: GetPostCommentsBody,
  ): Promise<GetPostCommentsOutput> {
    const { postId } = body;
    //Шаг 1: ищем пост, если он есть - добавляем +1 к просмотрам
    const comments = await this.postgresService.commentsService.getPostComments(postId);
    return {
      code: 200,
      isSucceed: true,
      message: 'COMMENTS_FOUND_SUCCEED',
      payload: {
        comments
      },
    };
  }
  async createComment(
      body: CreateCommentBody
  ): Promise<CreateCommentOutput>
  {
    const {userId, postId, text} = body;
    //Пытаемся создать лайк
    const resultId = await this.postgresService.commentsService.createNewComment(userId, postId, text);
    return {
      code: 201,
      isSucceed: true,
      message: 'LIKE_CREATED',
      payload: {
        commentId: resultId
      }
    };
  }
  async deleteComment(
      body: DeleteCommentBody
  ): Promise<DeleteCommentOutput> {
    //Пытаемся создать лайк
    const result = await this.postgresService.commentsService.deleteComment(body);
    return {
      code: 201,
      isSucceed: true,
      message: 'COMMENT_DELETED',
    };
  }

}
