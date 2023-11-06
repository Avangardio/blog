import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JwtGuard } from '@/Guards/jwt.guard';
import { DeleteExactPostBodyDto } from '@/DTO/posts/deletePost';
import { CreateLikeBody } from '@/DTO/media/createLikeBody';
import { DeleteLikeBody } from '@/DTO/media/deleteLikeBody';
import { CreateCommentBody } from '@/DTO/media/createComment';
import { DeleteCommentBody } from '@/DTO/media/deleteComment';
import { LikeBodySchema } from '@/Pipes/Jois/media/LikeBodySchema';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { CreateCommentSchema } from '@/Pipes/Jois/media/CreateCommentSchema';
import { DeleteCommentSchema } from '@/Pipes/Jois/media/DeleteCommentSchema';
import { LikePatchBody } from '@/DTO/media/patchLikeDto';

@ApiTags('Entrance/Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('checkLike/:postId')
  @UseGuards(JwtGuard)
  async checkLike(
    @Param(
      'postId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    postId: number,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const userId = request['userId'] as number;
    const likeResponse = await this.mediaService.checkLike({ postId, userId });
    response.status(likeResponse.code);
    return likeResponse;
  }

  @Patch('like')
  @UseGuards(JwtGuard)
  @UsePipes(new JoiValidationPipe(LikeBodySchema))
  async createLike(
    @Body() body: LikePatchBody,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const createResponse = await this.mediaService.patchLike(body);
    response.status(createResponse.code);
    return createResponse;
  }

  @Get('getComments/:postId')
  async getComments(
    @Param(
      'postId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    postId: number,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const commentsResponse = await this.mediaService.getComments({ postId });
    response.status(commentsResponse.code);
    return commentsResponse;
  }

  @Post('createComment')
  @UseGuards(JwtGuard)
  @UsePipes(new JoiValidationPipe(CreateCommentSchema))
  async createComment(
    @Body() body: CreateCommentBody,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const createResponse = await this.mediaService.createComment(body);
    response.status(createResponse.code);
    return createResponse;
  }

  @Delete('deleteComment')
  @UseGuards(JwtGuard)
  @UsePipes(new JoiValidationPipe(DeleteCommentSchema))
  async deleteComment(
    @Body() body: DeleteCommentBody,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const deleteResponse = await this.mediaService.deleteComment(body);
    response.status(deleteResponse.code);
    return deleteResponse;
  }
}
