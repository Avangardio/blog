import {Injectable} from '@nestjs/common';
import UserRepo from '@/Modules/postgres/repositories/userRepo';

@Injectable()
export default class PostgresService {
    constructor(public readonly userRepo: UserRepo) {
    }
}
