import Output from '@/DTO/output';

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
    posts: object[];
    hasMore: boolean;
  };
}
