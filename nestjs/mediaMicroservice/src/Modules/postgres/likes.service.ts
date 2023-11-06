import { Injectable } from '@nestjs/common';
import PostRepo from '@/Modules/postgres/repositories/postRepo';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import {
  NoLikeError,
  NoPostError,
} from '@/Errors/postgresErrors/postgresErrors';
import LikeRepo from '@/Modules/postgres/repositories/likeRepo';
import CommentRepo from '@/Modules/postgres/repositories/commentRepo';
import { DeleteResult } from 'typeorm';

@Injectable()
export default class LikesService {
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
    if (!user || !post) throw new NoPostError('NO_POST');
    //Создаем пост
    await this.likeRepo.createLike(user, post);
    return true;
  }

  async deleteLike(userId: number, postId: number) {
    //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
    //Получаем айди поста. Нет - ошибка.
    const [user, post] = await Promise.all([
      this.userRepo.findUserByUserId(userId, ['userId']),
      this.postRepo.findPostByPostId(postId, ['postId']),
    ]);
    //Проверяем, чтоб все данные были
    if (!user || !post) throw new NoPostError('NO_POST');
    //Создаем пост
    const result: DeleteResult = await this.likeRepo.deleteLike(user, post);
    return result.affected == 0;
  }

  async checkIfUserLikesPosts(userId: number, postId: number) {
    //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
    //Получаем айди поста. Нет - ошибка.
    const [user, post] = await Promise.all([
      this.userRepo.findUserByUserId(userId, ['userId']),
      this.postRepo.findPostByPostId(postId, ['postId']),
    ]);
    //Проверяем, чтоб все данные были
    if (!user || !post) throw new NoPostError('NO_POST');
    const like = await this.likeRepo.checkUserPostLike(user, post);
    //Возвращаем существовует или нет
    return !!like;
  }
}
