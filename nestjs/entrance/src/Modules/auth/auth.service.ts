import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, take, throwError, timeout } from 'rxjs';
import { ConfirmationBodyDto, ConfirmationOutputDto } from "@/DTO/auth/confirmation";
import { LoginBodyDto, LoginOutputDto } from "@/DTO/auth/login";

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private rmqService: ClientProxy) {}

  registration(body: RegistrationBodyDto): Promise<RegistrationOutputDto> {
    return lastValueFrom(
      this.rmqService
        .send<RegistrationOutputDto>('registration', body)
        .pipe(take(1), timeout(15 * 1000)),
    );
  }
  confirmation(body: ConfirmationBodyDto): Promise<ConfirmationOutputDto> {
    return lastValueFrom(
      this.rmqService
        .send<ConfirmationOutputDto>('confirmation', body)
        .pipe(take(1), timeout(15 * 1000)),
    );
  }
  login(body: LoginBodyDto): Promise<LoginOutputDto> {
    return lastValueFrom(
      this.rmqService
        .send<LoginOutputDto>('login', body)
        .pipe(take(1), timeout(15 * 1000)),
    );
  }
}
