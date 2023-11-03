import {Controller, UseFilters, UsePipes} from '@nestjs/common';
import {AppService} from '@/app.service';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {ExtendedErrorFilter} from '@/Errors/errors.filter';
import {CreatePostBodyDto} from '@/DTO/posts/createPost';
import {JoiValidationPipe} from '@/Pipes/JoiValidationPipe';
import {CreatePostSchema} from '@/Pipes/Jois/CreatePostSchema';
import {GetExactPostQueryDto} from '@/DTO/posts/getExactPost';
import {GetPostsBodyDto} from '@/DTO/posts/getPosts';
import {DeletePostSchema} from '@/Pipes/Jois/DeletePostSchema';
import {DeleteExactPostBodyDto} from '@/DTO/posts/deletePost';
import {GetPostsSchema} from '@/Pipes/Jois/GetPostsSchema';
import {FindExactPostsSchema} from '@/Pipes/Jois/findExactPostsSchema';

@Controller('posts')
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @MessagePattern('createPost')
    @UsePipes(new JoiValidationPipe(CreatePostSchema))
    @UseFilters(ExtendedErrorFilter)
    async createNewPost(@Payload() payload: CreatePostBodyDto) {
        //Выполняем метод создания поста
        //Возвращаем результат
        return this.appService.createNewPost(payload);
    }

    @MessagePattern('findExactPost')
    @UsePipes(new JoiValidationPipe(FindExactPostsSchema))
    @UseFilters(ExtendedErrorFilter)
    async findExactPost(@Payload() payload: GetExactPostQueryDto) {
        //Выполняем метод поиска поста
        //Возвращаем результат
        return this.appService.getExactPost(payload);
    }

    @MessagePattern('deletePost')
    @UsePipes(new JoiValidationPipe(DeletePostSchema))
    @UseFilters(ExtendedErrorFilter)
    async deletePost(@Payload() payload: DeleteExactPostBodyDto) {
        //Выполняем метод удаления поста + комментов + лайков
        //Возвращаем результат
        return this.appService.deletePost(payload);
    }

    @MessagePattern('findPosts')
    @UsePipes(new JoiValidationPipe(GetPostsSchema))
    @UseFilters(ExtendedErrorFilter)
    async findPosts(@Payload() payload: GetPostsBodyDto) {
        //Выполняем метод удаления постов, с критерием или без
        //Возвращаем результат
        return this.appService.findPosts(payload);
    }

    @MessagePattern('findPopularPosts')
    @UseFilters(ExtendedErrorFilter)
    async findPopularPosts() {
        return this.appService.findPopularPosts();
    }
}
