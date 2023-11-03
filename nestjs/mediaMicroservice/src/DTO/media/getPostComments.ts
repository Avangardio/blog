import Output from "@/DTO/media/media";
import {Post_comment} from "@/Modules/postgres/Entities/post_comment.entity";

export class GetPostCommentsBody {
    postId: number;
}

export class GetPostCommentsOutput extends Output {
    payload: {
        comments: Post_comment[]
    };
}
