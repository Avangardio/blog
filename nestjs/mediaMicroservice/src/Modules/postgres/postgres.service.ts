import {Injectable} from '@nestjs/common';
import LikesService from '@/Modules/postgres/likes.service';
import CommentsService from "@/Modules/postgres/comments.service";

@Injectable()
export default class PostgresService {
    constructor(
        public readonly likesService: LikesService,
        public readonly commentsService: CommentsService
    ) {
    }
}
