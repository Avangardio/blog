import Output from '@/DTO/posts/posts';
import {Post} from '@/Modules/postgres/Entities/post.entity';

export class GetPostsBodyDto {
    page: number;
    criteria?: {
        title?: string;
        tags?: string[];
        authorId?: number;
    };
}

export class GetPostsOutputDto extends Output {
    payload: {
        posts: Post[];
        hasMore: boolean;
    };
}
