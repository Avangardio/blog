import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/Modules/postgres/Entities/user.entity';
import {getRepository, Repository} from 'typeorm';
import { Post } from '@/Modules/postgres/Entities/post.entity';

@Injectable()
export default class PostRepo {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

    async function createPost(user: User, title: string, description: string, texts: string, tags: string[], userId: number) {

        const post = new Post();
        post.title = title;
        post.description = description;
        post.texts = texts;
        post.tags = tags; // Присвоим массив тегов
        post.author = user; // Устанавливаем связь с пользователем

        // Сохраните пост в базе данных
        const savedPost = await this.postRepository.save(post).catch(() => {throw new })
    }

}
