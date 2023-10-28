import Output from '@/DTO/posts/posts';
import { Post } from '@/Modules/postgres/Entities/post.entity';

export class DeleteExactPostBodyDto {
  postId: number;
}

export class DeleteExactPostOutputDto extends Output {
  payload?: never;
}
