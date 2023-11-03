import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Post} from '@/Modules/postgres/Entities/post.entity';
import {DatabasePGError} from '@/Errors/postgresErrors/postgresErrors';

@Injectable()
export default class PostRepo {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {
    }

    findPostByPostId(postId: number, selectFields?: (keyof Post)[]) {
        //Пытаемся получить данные по имейлу
        return this.postRepository
            .findOne({
                where: {postId: postId},
                ...(selectFields &&
                    selectFields.length > 0 && {select: selectFields}),
                relations: ['author'],
                select: {
                    author: {
                        username: true,
                        userId: true,
                    },
                },
                cache: {
                    id: `post_by_id_${postId}`,
                    milliseconds: 120_000,
                },
            })
            .catch((error) => {
                throw new DatabasePGError('NO_POST', error.message);
            });
    }
}
