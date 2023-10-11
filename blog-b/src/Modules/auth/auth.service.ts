import { Injectable } from '@nestjs/common';
import RedisDBService from '@/Modules/redis/redisdb.service';

@Injectable()
export class AuthService {
  constructor(private readonly redisDBService: RedisDBService) {}
  async registrationStart(body: IRegistrationBody) {
    const { email, name, password, language } = body;

    //ШАГ 1: Проверка на уже наличие пользователя в постгресе ИЛИ блока на регистрацию в редисе
    
  }
}
