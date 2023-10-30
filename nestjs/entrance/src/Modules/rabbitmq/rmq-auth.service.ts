import { Inject, Injectable } from '@nestjs/common';
import { RmqBaseService } from '@/Modules/rabbitmq/base.service';
import { ClientProxy } from '@nestjs/microservices';
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import {
  ConfirmationBodyDto,
  ConfirmationOutputDto,
} from '@/DTO/auth/confirmation';
import { LoginBodyDto, LoginOutputDto } from '@/DTO/auth/login';
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
export class RmqAuthService extends RmqBaseService {
  constructor(@Inject('AUTH_SERVICE') rmqService: ClientProxy) {
    super(rmqService);
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
  //метод для проверки userid с постгреса для гварда
  validateUserid(userid: number) {
    return this.sendCmd<number, boolean>('validateUserid', userid).catch(
      () => true,
    );
  }
}
