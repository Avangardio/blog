import {
  Controller,
  Get,
  HttpStatus,
  NotAcceptableException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ConfigService } from '@nestjs/config';
import { JwtServiceRoot } from '@/Guards/jwt.service';
import { ApiTags } from '@nestjs/swagger';
import { GetPostsBodyDto, GetPostsOutputDto } from '@/DTO/posts/getPosts';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { GetPostsQuerySchema } from '@/Pipes/Jois/posts/GetPostsQuerySchema';
import { GetPostsParamSchema } from '@/Pipes/Jois/posts/GetPostsParamSchema';
import { FastifyReply } from 'fastify';

@ApiTags('Entrance/Auth')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly configService: ConfigService,
    private readonly jwtServiceRoot: JwtServiceRoot,
  ) {}

  @Get('findPosts/:page')
  async findPosts(
    @Query(new JoiValidationPipe(GetPostsQuerySchema))
    query: { title: string; tags: string; authorId: string },
    @Param('page', new JoiValidationPipe(GetPostsParamSchema))
    page: string,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { title, tags, authorId } = query;
    const z = await this.postsService.rmqPostsService.findPosts({
      page: +page,
      criteria: {
        authorId: +authorId || undefined,
        title: title,
        tags: tags?.split(',').length > 0 ? tags?.split(',') : undefined,
      },
    });
    response.status(z.code);
    return z;
  }
}
