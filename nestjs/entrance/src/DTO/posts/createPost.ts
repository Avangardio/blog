import Output from '@/DTO/posts/posts';

export class CreatePostBodyDto {
    userId: number;
    newPostData: {
        title: string;
        description: string;
        texts: string;
        tags: string[];
        picture: string;
    };
}

export class CreatePostOutputDto extends Output {
    payload: {
        postId: number;
    };
}
