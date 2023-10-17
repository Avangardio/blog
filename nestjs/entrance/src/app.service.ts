import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, take, timeout } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private rmqService: ClientProxy) {}

  registration(body: RegistrationBodyDto): Promise<RegistrationOutputDto> {
    return lastValueFrom(
      this.rmqService
        .send<RegistrationOutputDto>('registration', body)
        .pipe(take(1), timeout(15 * 1000)),
    );
  }
}
