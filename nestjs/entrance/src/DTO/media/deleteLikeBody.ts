import Output from '@/DTO/media/media';

export class DeleteLikeBody {
  userId: number;
  postId: number;
}

export class DeleteLikeOutput extends Output {
  payload?: never;
}
