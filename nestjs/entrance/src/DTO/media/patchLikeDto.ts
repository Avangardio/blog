import Output from '@/DTO/media/media';

export class LikePatchBody {
  userId: number;
  postId: number;
}

export class LikePatchOutput extends Output {
  payload?: never;
}
