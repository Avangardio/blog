import Output from "@/DTO/media/media";

export class CreateCommentBody {
    userId: number;
    postId: number;
    text: string;
}

export class CreateCommentOutput extends Output {
    payload: {
        commentId: number;
    }
}
