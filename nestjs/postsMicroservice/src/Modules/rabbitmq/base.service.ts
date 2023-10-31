import { Inject, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, take, timeout } from 'rxjs';

export abstract class RmqBaseService {
  protected constructor(private readonly rmqService: ClientProxy) {}

  sendCmd<T, R>(
    pattern: any,
    body: T,
    timeoutSec: number = 15 * 1000,
  ): Promise<R> {
    return lastValueFrom(
      this.rmqService.send<R>(pattern, body).pipe(take(1), timeout(timeoutSec)),
    ).catch(() => {
      //Все ошибки обрабатываются внутри микросервиса, здесь глобальные ловим и выбрасываем для неста исключение
      throw new InternalServerErrorException();
    });
  }
}
