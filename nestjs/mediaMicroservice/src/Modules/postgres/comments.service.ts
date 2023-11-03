import {Injectable} from "@nestjs/common";
import PostRepo from "@/Modules/postgres/repositories/postRepo";
import UserRepo from "@/Modules/postgres/repositories/userRepo";
import LikeRepo from "@/Modules/postgres/repositories/likeRepo";
import CommentRepo from "@/Modules/postgres/repositories/commentRepo";
import {NoPostError} from "@/Errors/postgresErrors/postgresErrors";
import {DeleteResult} from "typeorm";
import {DeleteCommentBody} from "@/DTO/media/deleteComment";

@Injectable()
export default class CommentsService {
    constructor(
        private readonly postRepo: PostRepo,
        private readonly userRepo: UserRepo,
        private readonly likeRepo: LikeRepo,
        private readonly commentRepo: CommentRepo,
    ) {
    }

    async createNewComment(userId: number, postId: number, text: string) {
        //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
        //Получаем айди поста. Нет - ошибка.
        const [user, post] = await Promise.all([
            this.userRepo.findUserByUserId(userId, ['userId']),
            this.postRepo.findPostByPostId(postId, ['postId']),
        ]);
        //Проверяем, чтоб все данные были
        if (!user || !post) throw new NoPostError('NO_POST');
        //Создаем пост
        return await this.commentRepo.createComment(user, post, text);
    }

    async deleteComment(body: DeleteCommentBody) {
        const {postId, commentId, userId} = body;
        //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
        //Получаем айди поста. Нет - ошибка.
        const [user, post] = await Promise.all([
            this.userRepo.findUserByUserId(userId, ['userId']),
            this.postRepo.findPostByPostId(postId, ['postId']),
        ]);
        //Проверяем, чтоб все данные были
        if (!user || !post) throw new NoPostError('NO_POST');
        //Создаем пост
        const result: DeleteResult = await this.commentRepo.deleteComment(user, post, commentId);
        return result.affected == 0;
    }

    async getPostComments(postId: number) {
        //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
        //Получаем айди поста. Нет - ошибка.
        console.time()
        const post = await this.postRepo.findPostByPostId(postId, ['postId']);
        //Проверяем, чтоб все данные были
        if (!post) throw new NoPostError('NO_POST');
        //Возвращаем массив комментариев
        return await this.commentRepo.findPostComments(post);
    }
}