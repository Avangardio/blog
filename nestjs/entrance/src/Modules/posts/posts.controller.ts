import {
  Body,
  Controller, Delete,
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
  UsePipes
} from "@nestjs/common";
import { PostsService } from './posts.service';
import { ConfigService } from '@nestjs/config';
import { JwtServiceRoot } from '@/Guards/jwt.service';
import { ApiTags } from '@nestjs/swagger';
import { GetPostsBodyDto, GetPostsOutputDto } from '@/DTO/posts/getPosts';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { GetPostsQuerySchema } from '@/Pipes/Jois/posts/GetPostsQuerySchema';
import { GetPostsParamSchema } from '@/Pipes/Jois/posts/GetPostsParamSchema';
import { FastifyReply, FastifyRequest } from 'fastify';
import { RegistrationBodyDto } from '@/DTO/auth/registration';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { CreatePostSchema } from '@/Pipes/Jois/posts/CreatePostSchema';
import { JwtGuard } from '@/Guards/jwt.guard';
import { FindExactPostsSchema } from '@/Pipes/Jois/posts/findExactPostsSchema';
import { DeletePostSchema } from '@/Pipes/Jois/posts/DeletePostSchema';
import { DeleteExactPostBodyDto } from '@/DTO/posts/deletePost';

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
    const postsResponse = await this.postsService.rmqPostsService.findPosts({
      page: +page,
      criteria: {
        authorId: +authorId || undefined,
        title: title,
        tags: tags?.split(',').length > 0 ? tags?.split(',') : undefined,
      },
    });
    response.status(postsResponse.code);
    return postsResponse;
  }
  @Post('createPost')
  @UseGuards(JwtGuard)
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
  async createPost(
    @Body() body: CreatePostBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    //удаляем с тела запроса юзернейм из жвт гварда
    const createResponse = await this.postsService.rmqPostsService.createPost(
      body,
    );
    response.status(createResponse.code);
    return createResponse;
  }
  @Get('findExactPost')
  @UsePipes(new JoiValidationPipe(FindExactPostsSchema))
  async findExactPost(
    @Query()
    query: { postId: string },
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const { postId } = query;
    const article = await this.postsService.rmqPostsService.findExactPost({
      postId: +postId || undefined,
    });
    response.status(article.code);
    return article;
  }
  @Get('findPopularPosts')
  async findPopularPosts(@Res({ passthrough: true }) response: FastifyReply) {
    const popularPostsResponse =
      await this.postsService.rmqPostsService.findPopularPosts();
    response.status(popularPostsResponse.code);
    return popularPostsResponse;
  }
  @Delete('deletePost')
  @UseGuards(JwtGuard)
  @UsePipes(new JoiValidationPipe(DeletePostSchema))
  async deletePost(
    @Body() body: DeleteExactPostBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const deleteResponse = await this.postsService.rmqPostsService.deletePost(
      body,
    );
    response.status(deleteResponse.code);
    return deleteResponse;
  }
}
