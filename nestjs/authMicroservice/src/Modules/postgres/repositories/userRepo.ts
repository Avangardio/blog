import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/Modules/postgres/Entities/user.entity';
import {
  DatabasePGError,
  NoUserError,
  UserExistsError,
} from '@/Errors/postgresErrors/postgresErrors';
import { Injectable } from '@nestjs/common';
import { ConfirmationEntityDto } from '@/DTO/redisEntities/redisEntities';

@Injectable()
export default class UserRepo {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserByEmail(email: string): Promise<User | null> {
    //Пытаемся получить данные по имейлу
    return this.userRepository
      .findOne({
        where: { email: email },
      })
      .catch(() => {
        throw new DatabasePGError('POSTGRES_ERROR');
      });
  }

  async checkUserByEmail(email: string, should: boolean) {
    const user = await this.findUserByEmail(email);
    //Если есть пользователь - выбрасываем ошибку
    if (!!user !== should)
      throw new UserExistsError(should ? 'USER_NOT_EXISTS' : 'USER_EXISTS');
    return true;
  }

  async setNewUser(data: ConfirmationEntityDto) {
    //Создаем данные для вставки в базу
    const newUser = this.userRepository.create({
      email: data.email,
      username: data.name,
      hash: data.password,
      language: data.language,
    });
    //Пытаемся создать пользователя
    return await this.userRepository.save(newUser).catch(() => {
      throw new DatabasePGError('POSTGRES_ERROR');
    });
  }

  async getUserHash(email: string) {
    const user = await this.userRepository
      .findOne({
        where: { email },
        select: ['hash', 'userid', 'username'],
      })
      .catch(() => {
        throw new DatabasePGError('POSTGRES_ERROR');
      });
    //не будем говорить пользователям, что пользователя не существует точно
    if (!user) throw new NoUserError('WRONG_PASSWORD');
    return user;
  }
}
