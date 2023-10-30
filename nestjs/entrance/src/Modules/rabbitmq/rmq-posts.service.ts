import { Inject, Injectable } from '@nestjs/common';
import { RmqBaseService } from '@/Modules/rabbitmq/base.service';
import { ClientProxy } from '@nestjs/microservices';
import { GetPostsBodyDto, GetPostsOutputDto } from '@/DTO/posts/getPosts';

@Injectable()
export class RmqPostsService extends RmqBaseService {
  constructor(@Inject('AUTH_SERVICE') rmqService: ClientProxy) {
    super(rmqService);
  }
  findPosts(body: GetPostsBodyDto): Promise<GetPostsOutputDto> {
    return this.sendCmd<GetPostsBodyDto, GetPostsOutputDto>('findPosts', body);
  }
}
