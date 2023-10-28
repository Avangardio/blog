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
import {
  GetPostsBodyDto,
  GetPostsOutputDto,
} from '@/DTO/posts/getPosts';

@Injectable()
export class PostsService {
  constructor(@Inject('POSTS_SERVICE') private rmqService: ClientProxy) {}

  sendCmd<T, R>(
    pattern: any,
    body: T,
    timeoutSec: number = 15 * 1000,
  ): Promise<R> {
    return lastValueFrom(
      this.rmqService.send<R>(pattern, body).pipe(take(1), timeout(timeoutSec)),
    ).catch((e) => {
      //Все ошибки обрабатываются внутри микросервиса, здесь глобальные ловим и выбрасываем для неста исключение
      throw new InternalServerErrorException();
    });
  }
  findPosts(body: GetPostsBodyDto): Promise<GetPostsOutputDto> {
    return this.sendCmd<GetPostsBodyDto, GetPostsOutputDto>('findPosts', body);
  }
}
