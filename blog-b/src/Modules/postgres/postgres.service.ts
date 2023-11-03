import PostgresAuthService from '@postgresModules/auth/postgres.auth.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export default class PostgresService {
    constructor(public readonly auth: PostgresAuthService) {
    }
}
