import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, take, throwError, timeout } from 'rxjs';
import {
  ConfirmationBodyDto,
  ConfirmationOutputDto,
} from '@/DTO/auth/confirmation';
import { LoginBodyDto, LoginOutputDto } from '@/DTO/auth/login';
import { JwtService } from '@nestjs/jwt';
import {
  RestorationBodyDto,
  RestorationOutputDto,
} from '@/DTO/auth/restoration';
import {
  RequestValidationBodyDto,
  RequestValidationOutputDto,
} from '@/DTO/auth/validateRequest';
import {
  SetNewPasswordBodyDto,
  SetNewPasswordOutputDto,
} from '@/DTO/auth/setNewPassword';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private rmqService: ClientProxy) {}

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

  registration(body: RegistrationBodyDto): Promise<RegistrationOutputDto> {
    return this.sendCmd<RegistrationBodyDto, RegistrationOutputDto>(
      'registration',
      body,
    );
  }
  confirmation(body: ConfirmationBodyDto): Promise<ConfirmationOutputDto> {
    return this.sendCmd<ConfirmationBodyDto, ConfirmationOutputDto>(
      'confirmation',
      body,
    );
  }
  login(body: LoginBodyDto): Promise<LoginOutputDto> {
    return this.sendCmd<LoginBodyDto, LoginOutputDto>('login', body);
  }
  restoration(body: RestorationBodyDto): Promise<RestorationOutputDto> {
    return this.sendCmd<RestorationBodyDto, RestorationOutputDto>(
      'restoration',
      body,
    );
  }
  validateRequest(
    body: RequestValidationBodyDto,
  ): Promise<RequestValidationOutputDto> {
    return this.sendCmd<RequestValidationBodyDto, RequestValidationOutputDto>(
      'validateRequest',
      body,
    );
  }
  setNewPassword(
    body: SetNewPasswordBodyDto,
  ): Promise<SetNewPasswordOutputDto> {
    return this.sendCmd<SetNewPasswordBodyDto, SetNewPasswordOutputDto>(
      'setNewPassword',
      body,
    );
  }
}
