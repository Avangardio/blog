import Output from "@/DTO/media/media";

export class CreateLikeBody {
    userId: number;
    postId: number;
}

export class CreateLikeOutput extends Output {
    payload?: never;
}
