import { Injectable } from '@nestjs/common';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import PostRepo from '@/Modules/postgres/repositories/postRepo';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';
import { NoUserError } from "@/Errors/postgresErrors/postgresErrors";

@Injectable()
export default class PostService {
  constructor(
    private readonly postRepo: PostRepo,
    private readonly userRepo: UserRepo,
  ) {}

  async createNewPost(
    userId: CreatePostBodyDto['userId'],
    postData: CreatePostBodyDto['newPostData'],
  ) {
    //Получаем айди пользователя по предоставленному, чтоб проверить. Если нет - ошибка.
    const user = await this.userRepo.findUserByUserId(userId, ['userId']);
    //Создаем новый пост, в котором возвращается айди его.
    if(!user) throw new NoUserError('NO_USER')
    return await this.postRepo.createPost(user, postData);
  }
  async getExactPost(postId: number) {

  }
}
