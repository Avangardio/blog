import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, take, throwError, timeout } from 'rxjs';
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import { GetPostsBodyDto, GetPostsOutputDto } from '@/DTO/posts/getPosts';
import { RmqPostsService } from '@/Modules/rabbitmq/rmq-posts.service';

@Injectable()
export class PostsService {
  constructor(public readonly rmqPostsService: RmqPostsService) {}
}
