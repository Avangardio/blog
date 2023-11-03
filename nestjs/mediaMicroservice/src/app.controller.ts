import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { AppService } from '@/app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExtendedErrorFilter } from '@/Errors/errors.filter';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { CheckUserPostLikesBody } from '@/DTO/media/checkUserPostLikesBody';
import { LikeBodySchema } from '@/Pipes/Jois/LikeBodySchema';
import { CreateLikeBody } from '@/DTO/media/createLikeBody';
import { DeleteLikeBody } from '@/DTO/media/deleteLikeBody';
import { GetPostCommentsBody } from '@/DTO/media/getPostComments';
import { CreateCommentBody } from '@/DTO/media/createComment';
import { DeleteCommentBody } from '@/DTO/media/deleteComment';
import { GetCommentsSchema } from '@/Pipes/Jois/GetCommentsSchema';
import { CreateCommentSchema } from '@/Pipes/Jois/CreateCommentSchema';
import { DeleteCommentSchema } from '@/Pipes/Jois/DeleteCommentSchema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('checkLike')
  @UsePipes(new JoiValidationPipe(LikeBodySchema))
  @UseFilters(ExtendedErrorFilter)
  async checkLike(@Payload() payload: CheckUserPostLikesBody) {
    //Выполняем метод проверки лайка
    //Возвращаем результат
    return this.appService.checkLike(payload);
  }
  @MessagePattern('createLike')
  @UsePipes(new JoiValidationPipe(LikeBodySchema))
  @UseFilters(ExtendedErrorFilter)
  async createLike(@Payload() payload: CreateLikeBody) {
    //Выполняем метод создания плайка
    //Возвращаем результат
    return this.appService.createLike(payload);
  }
  @MessagePattern('deleteLike')
  @UsePipes(new JoiValidationPipe(LikeBodySchema))
  @UseFilters(ExtendedErrorFilter)
  async deleteLike(@Payload() payload: DeleteLikeBody) {
    //Выполняем метод удаения лайка
    //Возвращаем результат
    return this.appService.deleteLike(payload);
  }

  @MessagePattern('getComments')
  @UsePipes(new JoiValidationPipe(GetCommentsSchema))
  @UseFilters(ExtendedErrorFilter)
  async getComments(@Payload() payload: GetPostCommentsBody) {
    //Выполняем метод проверки лайка
    //Возвращаем результат
    return this.appService.getPostComments(payload);
  }
  @MessagePattern('createComment')
  @UsePipes(new JoiValidationPipe(CreateCommentSchema))
  @UseFilters(ExtendedErrorFilter)
  async createComment(@Payload() payload: CreateCommentBody) {
    //Выполняем метод создания плайка
    //Возвращаем результат
    return this.appService.createComment(payload);
  }
  @MessagePattern('deleteComment')
  @UsePipes(new JoiValidationPipe(DeleteCommentSchema))
  @UseFilters(ExtendedErrorFilter)
  async deleteComment(@Payload() payload: DeleteCommentBody) {
    //Выполняем метод удаения лайка
    //Возвращаем результат
    return this.appService.deleteComment(payload);
  }
}
