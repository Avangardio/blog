import Redis from 'ioredis';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { AuthService } from '@/Modules/auth/auth.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take, timeout } from 'rxjs';

@Injectable()
export default class GuardsService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject('AUTH_SERVICE') private rmqService: ClientProxy,
  ) {}

  private generateCSRF(length: number): string {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    const now = new Date();
    const seconds = now.getSeconds();
    return result + seconds.toString();
  }
  async setCSRF(userid: string) {
    const csrf = this.generateCSRF(8);
    await this.redis.setex(csrf, 84000, userid).catch((e) => e.message);
  }
  async getUserIdFromCSRF(csrf: string): Promise<string> {
    return await this.redis.get(csrf).catch((e) => e.message);
  }
  async deleteCSRF(csrf: string) {
    await this.redis.del(csrf).catch((e) => e.message);
  }

  //метод для проверки userid с постгреса для гварда
  validateUserid(userid: number) {
    return lastValueFrom(
      this.rmqService
        .send<boolean>('validateUserid', userid)
        .pipe(take(1), timeout(5 * 1000)),
    ).catch(() => {
      //если поймали ошибку, у сервера все плохо и нужно применять деградацию
      //Может сломаться сервис аутентификации, но другие - работать
      return true;
    });
  }
}
