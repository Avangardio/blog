import Output from "@/DTO/media/media";

export class CheckUserPostLikesBody {
    userId: number;
    postId: number;
}

export class CheckUserPostLikesOutput extends Output {
    payload: {
        liked: boolean;
    };
}
