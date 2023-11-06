import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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
import { RmqBaseService } from '@/Modules/rabbitmq/base.service';
import { LikePatchBody, LikePatchOutput } from '@/DTO/media/patchLikeDto';

@Injectable()
export class MediaService extends RmqBaseService {
  constructor(@Inject('MEDIA_SERVICE') rmqService: ClientProxy) {
    super(rmqService);
  }

  checkLike(body: CheckUserPostLikesBody): Promise<CheckUserPostLikesOutput> {
    return this.sendCmd<CheckUserPostLikesBody, CheckUserPostLikesOutput>(
      'checkLike',
      body,
    );
  }

  patchLike(body: LikePatchBody): Promise<LikePatchOutput> {
    return this.sendCmd<LikePatchBody, LikePatchOutput>('like', body);
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
