import { Injectable } from '@nestjs/common';
import PostRepo from '@/Modules/postgres/repositories/postRepo';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import { Post_like } from '@/Modules/postgres/Entities/post_like.entity';
import { Post_comment } from '@/Modules/postgres/Entities/post_comment.entity';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { NoPostError, NoUserError } from "@/Errors/postgresErrors/postgresErrors";
import LikeRepo from '@/Modules/postgres/repositories/likeRepo';
import CommentRepo from '@/Modules/postgres/repositories/commentRepo';

@Injectable()
export default class MediaService {
  constructor(
    private readonly postRepo: PostRepo,
    private readonly userRepo: UserRepo,
    private readonly likeRepo: LikeRepo,
    private readonly commentRepo: CommentRepo,
  ) {}
  async createNewLike(userId: number, postId: number) {
    //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
    //Получаем айди поста. Нет - ошибка.
    const [user, post] = await Promise.all([
      this.userRepo.findUserByUserId(userId, ['userId']),
      this.postRepo.findPostByPostId(postId, ['postId']),
    ]);
    //Проверяем, чтоб все данные были
    if (!user && !post) throw new NoPostError('NO_POST');
    //Создаем пост
    await this.likeRepo.createLike(user, post);
    return true;
  }
}
