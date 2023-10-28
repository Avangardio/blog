import Output from '@/DTO/posts/posts';
import { Post } from '@/Modules/postgres/Entities/post.entity';

export class GetExactPostQueryDto {
  postId: number;
}

export class GetExactPostOutputDto extends Output {
  payload: Post;
}
