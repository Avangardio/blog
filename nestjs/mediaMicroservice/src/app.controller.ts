import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { AppService } from '@/app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExtendedErrorFilter } from '@/Errors/errors.filter';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { CheckUserPostLikesBody } from '@/DTO/media/checkUserPostLikesBody';
import { LikeBodySchema } from '@/Pipes/Jois/LikeBodySchema';
import { GetPostCommentsBody } from '@/DTO/media/getPostComments';
import { CreateCommentBody } from '@/DTO/media/createComment';
import { DeleteCommentBody, } from "@/DTO/media/deleteComment";
import { GetCommentsSchema } from '@/Pipes/Jois/GetCommentsSchema';
import { CreateCommentSchema } from '@/Pipes/Jois/CreateCommentSchema';
import { DeleteCommentSchema } from '@/Pipes/Jois/DeleteCommentSchema';
import { LikePatchBody } from "@/DTO/media/patchLikeDto";

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

  @MessagePattern('like')
  @UsePipes(new JoiValidationPipe(LikeBodySchema))
  @UseFilters(ExtendedErrorFilter)
  async createOrDeleteLike(@Payload() payload: LikePatchBody) {
    //Выполняем метод создания плайка
    //Возвращаем результат
    return this.appService.patchLike(payload);
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
