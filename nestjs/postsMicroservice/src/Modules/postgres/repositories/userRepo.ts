import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/Modules/postgres/Entities/user.entity';
import { DatabasePGError } from '@/Errors/postgresErrors/postgresErrors';
import { Injectable } from '@nestjs/common';
import { ConfirmationEntityDto } from '@/DTO/redisEntities/redisEntities';

@Injectable()
export default class UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserByUserId(userId: number, selectFields?: (keyof User)[]) {
    //Пытаемся получить данные по имейлу
    return this.userRepository
      .findOne({
        where: { userId: userId },
        cache: {
          id: `user_${userId}`,
          milliseconds: 120_000,
        },
        ...(selectFields &&
          selectFields.length > 0 && { select: selectFields }),
      })
      .catch((error) => {
        throw new DatabasePGError('NO_USER');
      });
  }
}
