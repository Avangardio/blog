import Output from '@/DTO/media/media';

export class GetPostCommentsBody {
  postId: number;
}

export class GetPostCommentsOutput extends Output {
  payload: {
    comments: object[];
  };
}
