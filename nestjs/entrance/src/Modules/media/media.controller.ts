import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiTags } from '@nestjs/swagger';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { FastifyReply, FastifyRequest } from 'fastify';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { CreatePostSchema } from '@/Pipes/Jois/posts/CreatePostSchema';
import { JwtGuard } from '@/Guards/jwt.guard';
import { CheckUserPostLikesBody } from '@/DTO/media/checkUserPostLikesBody';
import { LikeBodySchema } from '@/Pipes/Jois/media/LikeBodySchema';

@ApiTags('Entrance/Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('checkLike')
  @UseGuards(JwtGuard)
  async checkLike(
    @Query(
      'postId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    postId: number,
    @Req() request: FastifyRequest,
  ) {
    const userId = request['userId'] as number;
    return this.mediaService.rmqMediaService.checkLike({ postId, userId });
  }
  
}
