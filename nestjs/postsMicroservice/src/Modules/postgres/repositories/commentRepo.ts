import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post_like } from '@/Modules/postgres/Entities/post_like.entity';
import { Repository } from 'typeorm';
import { Post_comment } from '@/Modules/postgres/Entities/post_comment.entity';

@Injectable()
export default class CommentRepo {
  constructor(
    @InjectRepository(Post_comment)
    private readonly commentRepository: Repository<Post_comment>,
  ) {}
}
