import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { AppService } from '@/app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExtendedErrorFilter } from '@/Errors/errors.filter';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { CreatePostSchema } from '@/Pipes/Jois/CreatePostSchema';
import { GetExactPostQueryDto } from '@/DTO/posts/getExactPost';
import { CreateLikeBodyDto } from '@/DTO/posts/createLike';
import { GetPostsBodyDto } from '@/DTO/posts/getPosts';

@Controller('posts')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('createPost')
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
  @UseFilters(ExtendedErrorFilter)
  async createNewPost(@Payload() payload: CreatePostBodyDto) {
    //Выполняем метод создания поста
    //Возвращаем результат
    return this.appService.createNewPost(payload);
  }
  @MessagePattern('findExactPost')
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
  @UseFilters(ExtendedErrorFilter)
  async findExactPost(@Payload() payload: GetExactPostQueryDto) {
    //Выполняем метод поиска поста
    //Возвращаем результат
    return this.appService.getExactPost(payload);
  }
  @MessagePattern('deletePost')
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
  @UseFilters(ExtendedErrorFilter)
  async deletePost(@Payload() payload: GetExactPostQueryDto) {
    //Выполняем метод удаления поста + комментов + лайков
    //Возвращаем результат
    return this.appService.deletePost(payload);
  }
  @MessagePattern('createLike')
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
  @UseFilters(ExtendedErrorFilter)
  async createLike(@Payload() payload: CreateLikeBodyDto) {
    //Выполняем метод удаления поста + комментов + лайков
    //Возвращаем результат
    return this.appService.createLike(payload);
  }
  @MessagePattern('findPosts')
  //@UsePipes(new JoiValidationPipe(CreatePostSchema))
  @UseFilters(ExtendedErrorFilter)
  async findPosts(@Payload() payload: GetPostsBodyDto) {
    console.log(payload)
    //Выполняем метод удаления постов, с критерием или без
    //Возвращаем результат
    return this.appService.findPosts(payload);
  }
}
