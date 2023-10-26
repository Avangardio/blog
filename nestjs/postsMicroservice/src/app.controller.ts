import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { AppService } from '@/app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExtendedErrorFilter } from '@/Errors/errors.filter';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { CreatePostSchema } from '@/Pipes/Jois/CreatePostSchema';

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
}
