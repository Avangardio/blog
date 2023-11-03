import Output from '@/DTO/posts/posts';

export class CreateLikeBodyDto {
    userId: number;
    postId: number;
}

export class CreateLikeOutputDto extends Output {
    payload?: never;
}
