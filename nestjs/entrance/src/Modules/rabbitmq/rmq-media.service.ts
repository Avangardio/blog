import { Inject, Injectable } from '@nestjs/common';
import { RmqBaseService } from '@/Modules/rabbitmq/base.service';
import { ClientProxy } from '@nestjs/microservices';
import { GetPostsBodyDto, GetPostsOutputDto } from '@/DTO/posts/getPosts';
import {
  CheckUserPostLikesBody,
  CheckUserPostLikesOutput,
} from '@/DTO/media/checkUserPostLikesBody';
import { CreateLikeBody, CreateLikeOutput } from '@/DTO/media/createLikeBody';
import { DeleteLikeBody, DeleteLikeOutput } from '@/DTO/media/deleteLikeBody';
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

@Injectable()
export class RmqMediaService extends RmqBaseService {
  constructor(@Inject('MEDIA_SERVICE') rmqService: ClientProxy) {
    super(rmqService);
  }

  checkLike(body: CheckUserPostLikesBody): Promise<CheckUserPostLikesOutput> {
    return this.sendCmd<CheckUserPostLikesBody, CheckUserPostLikesOutput>(
      'checkLike',
      body,
    );
  }
  createLike(body: CreateLikeBody): Promise<CreateLikeOutput> {
    return this.sendCmd<CreateLikeBody, CreateLikeOutput>('createLike', body);
  }
  deleteLike(body: DeleteLikeBody): Promise<DeleteLikeOutput> {
    return this.sendCmd<DeleteLikeBody, DeleteLikeOutput>('deleteLike', body);
  }

  getComments(body: GetPostCommentsBody): Promise<GetPostCommentsOutput> {
    return this.sendCmd<GetPostCommentsBody, GetPostCommentsOutput>(
      'getComments',
      body,
    );
  }
  createComment(body: CreateCommentBody): Promise<CreateCommentOutput> {
    return this.sendCmd<CreateCommentBody, CreateCommentOutput>(
      'createComment',
      body,
    );
  }
  deleteComment(body: DeleteCommentBody): Promise<DeleteCommentOutput> {
    return this.sendCmd<DeleteCommentBody, DeleteCommentOutput>(
      'deleteComment',
      body,
    );
  }
}
