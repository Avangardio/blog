import { Injectable } from '@nestjs/common';
import PostService from '@/Modules/postgres/post.service';

@Injectable()
export default class PostgresService {
  constructor(
    public readonly postService: PostService,
  ) {}
}
