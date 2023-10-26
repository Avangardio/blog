import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/Modules/postgres/Entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { DatabasePGError } from '@/Errors/postgresErrors/postgresErrors';
import { CreatePostBodyDto } from '@/DTO/posts/createPost';

@Injectable()
export default class PostRepo {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(user: User, postData: CreatePostBodyDto['newPostData']) {
    const { title, tags, texts, description } = postData;
    const post = new Post();
    post.title = title;
    post.description = description;
    post.texts = texts;
    post.tags = tags; // Присвоим массив тегов
    post.author = user; // Устанавливаем связь с пользователем

    // Сохраните пост в базе данных
    const savedPost = (await this.postRepository.save(post).catch((error) => {
      throw new DatabasePGError('POST_ERROR');
    })) as Post;
    return savedPost.postId;
  }
  async findExactPost(postid: number) {
    const z = this.postRepository.findOne()
  }
}
