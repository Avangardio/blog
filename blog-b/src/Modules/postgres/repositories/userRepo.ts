import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/Modules/postgres/Entities/user.entity';
import {
  DatabaseError,
  UserExistsError,
} from '@/Errors/postgresErrors/postgresErrors';

export default class UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository
      .findOne({
        where: { email: email },
      })
      .catch(() => {
        throw new DatabaseError('POSTGRES_ERROR');
      });
  }

  async userNotExistsByEmail(email: string) {
    const user = await this.findUserByEmail(email);
    if (user) throw new UserExistsError('USER_EXISTS');
    return true;
  }
}
