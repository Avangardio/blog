import UserRepo from '@postgresModules/auth/repositories/userRepo';
import { Injectable } from '@nestjs/common';
@Injectable()
export default class PostgresAuthService {
  constructor(public readonly userRepo: UserRepo) {}
}
