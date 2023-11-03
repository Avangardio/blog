import Output from "@/DTO/media/media";

export class DeleteCommentBody {
    commentId: number;
    userId: number;
    postId: number;
}

export class DeleteCommentOutput extends Output {
    payload?: never;
}
