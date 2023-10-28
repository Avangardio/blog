import { Injectable } from '@nestjs/common';
import PostService from '@/Modules/postgres/post.service';
import MediaService from '@/Modules/postgres/media.service';

@Injectable()
export default class PostgresService {
  constructor(
    public readonly postService: PostService,
    public readonly mediaService: MediaService,
  ) {}
}
