import { Inject, Injectable } from '@nestjs/common';
import { RmqBaseService } from '@/Modules/rabbitmq/base.service';
import { ClientProxy } from '@nestjs/microservices';
import { GetPostsBodyDto, GetPostsOutputDto } from '@/DTO/posts/getPosts';
import { CreatePostBodyDto, CreatePostOutputDto } from '@/DTO/posts/createPost';
import {
  DeleteExactPostBodyDto,
  DeleteExactPostOutputDto,
} from '@/DTO/posts/deletePost';
import {
  GetExactPostOutputDto,
  GetExactPostQueryDto,
} from '@/DTO/posts/getExactPost';
import { FindPopularPosts } from '@/DTO/posts/findPopularPosts';

@Injectable()
export class RmqPostsService extends RmqBaseService {
  constructor(@Inject('POSTS_SERVICE') rmqService: ClientProxy) {
    super(rmqService);
  }
  findPosts(body: GetPostsBodyDto): Promise<GetPostsOutputDto> {
    return this.sendCmd<GetPostsBodyDto, GetPostsOutputDto>('findPosts', body);
  }
  findExactPost(body: GetExactPostQueryDto): Promise<GetExactPostOutputDto> {
    return this.sendCmd<GetExactPostQueryDto, GetExactPostOutputDto>(
      'findExactPost',
      body,
    );
  }
  findPopularPosts() {
    return this.sendCmd<unknown, FindPopularPosts>(
      'findPopularPosts',
      {}
    );
  }
  createPost(body: CreatePostBodyDto): Promise<CreatePostOutputDto> {
    return this.sendCmd<CreatePostBodyDto, CreatePostOutputDto>(
      'createPost',
      body,
    );
  }
  deletePost(body: DeleteExactPostBodyDto): Promise<DeleteExactPostOutputDto> {
    return this.sendCmd<DeleteExactPostBodyDto, DeleteExactPostOutputDto>(
      'deletePost',
      body,
    );
  }
}
