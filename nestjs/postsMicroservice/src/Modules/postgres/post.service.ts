import {Injectable} from '@nestjs/common';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import PostRepo from '@/Modules/postgres/repositories/postRepo';
import {CreatePostBodyDto} from '@/DTO/posts/createPost';
import {NoPostError, NoUserError,} from '@/Errors/postgresErrors/postgresErrors';
import {GetPostsBodyDto, GetPostsOutputDto} from '@/DTO/posts/getPosts';
import {ExtendedError} from '@/Errors/errors';

@Injectable()
export default class PostService {
    constructor(
        private readonly postRepo: PostRepo,
        private readonly userRepo: UserRepo,
    ) {
    }

    async createNewPost(
        userId: CreatePostBodyDto['userId'],
        postData: CreatePostBodyDto['newPostData'],
    ) {
        //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
        const user = await this.userRepo.findUserByUserId(userId, ['userId']);
        //Создаем новый пост, в котором возвращается айди его.
        if (!user) throw new NoUserError('NO_USER');
        return await this.postRepo.createPost(user, postData);
    }

    async findPosts(
        page = 1,
        criteria: GetPostsBodyDto['criteria'] = {},
        take = 6,
    ): Promise<GetPostsOutputDto['payload']> {
        //Ищем посты
        const posts = await this.postRepo.getPosts(page, criteria, take);
        //Если постов нет, то вернем ошибку с 404
        if (posts.length === 0)
            throw new ExtendedError('NoPostsError', 'NO_POSTS', 404);
        //Если постов больше тейка, значит, есть еще
        const hasMore = posts && posts.length > take - 1;
        //Если постов больше 5 - делаем пять
        const slicedPosts = hasMore ? posts.slice(0, take - 1) : posts;
        return {
            posts: slicedPosts,
            hasMore,
        };
    }

    async getExactPost(postId: number) {
        const exactPost = await this.postRepo.findExactPost(postId);
        if (!exactPost) throw new NoPostError('NO_POST');
        //И увеличиваем просмотры на 1
        await this.postRepo.increasePostViews(postId);
        return exactPost;
    }

    async deletePost(postId: number, userId: number) {
        //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
        const user = await this.userRepo.findUserByUserId(userId, ['userId']);
        //Создаем новый пост, в котором возвращается айди его.
        if (!user) throw new NoUserError('NO_USER');
        return this.postRepo.deletePost(postId);
    }

    async findPopularPosts() {
        //Шаг 1: просто ищем 5 популярных самых постов
        const popularPosts = await this.postRepo.findPopularPosts();
        if (popularPosts.length === 0)
            throw new ExtendedError('NoPostsError', 'NO_POSTS', 404);
        return popularPosts;
    }
}
