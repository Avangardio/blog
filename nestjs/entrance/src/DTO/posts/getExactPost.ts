import Output from '@/DTO/posts/posts';

export class GetExactPostQueryDto {
  postId: number;
}

export class GetExactPostOutputDto extends Output {
  payload: object;
}
