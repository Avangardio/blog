import { Controller, Get, UsePipes } from '@nestjs/common';
import { RegistrationBodyDto } from '@/DTO/auth/registration';
import ErrorHandler from '@/Errors/errors';
import { ConfirmationBodyDto } from '@/DTO/auth/confirmation';
import { AppService } from '@/app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { RegistrationSchema } from '@/Pipes/Jois/auth/RegistrationSchema';
import { RequestValidationSchema } from '@/Pipes/Jois/auth/RequestValidationSchema';
import { LoginINTSchema } from '@/Pipes/Jois/auth/LoginINTSchema';
import { LoginBodyDto } from '@/DTO/auth/login';
import { RestorationBodyDto } from '@/DTO/auth/restoration';
import { RestorationSchema } from '@/Pipes/Jois/auth/RestorationSchema';
import { RequestValidationBodyDto } from '@/DTO/auth/validateRequest';
import { ConfigService } from '@nestjs/config';
import { SetNewPasswordSchema } from '@/Pipes/Jois/auth/SetNewPasswordSchema';
import { SetNewPasswordBodyDto } from '@/DTO/auth/setNewPassword';

@Controller('auth')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @MessagePattern('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  async registration(@Payload() payload: RegistrationBodyDto) {
    //Выполняем метод регистрации
    //Возвращаем результат
    return await this.appService
      .registration(payload)
      .catch((error) => ErrorHandler(error));
  }
  @MessagePattern('confirmation')
  @UsePipes(new JoiValidationPipe(RequestValidationSchema))
  async confirmation(@Payload() payload: ConfirmationBodyDto) {
    //Выполняем метод подтверждения
    // Возвращаем результат
    return await this.appService
      .confirmation(payload)
      .catch((error) => ErrorHandler(error));
  }
  @MessagePattern('login')
  @UsePipes(new JoiValidationPipe(LoginINTSchema))
  async login(@Payload() payload: LoginBodyDto) {
    //Выполняем метод подтверждения
    // Возвращаем результат
    return await this.appService
      .login(payload)
      .catch((error) => ErrorHandler(error));
  }
  @MessagePattern('restoration')
  @UsePipes(new JoiValidationPipe(RestorationSchema))
  async restorationRequest(@Payload() payload: RestorationBodyDto) {
    //Выполняем метод подтверждения
    // Возвращаем результат
    return await this.appService
      .sendRestorationRequest(payload)
      .catch((error) => ErrorHandler(error));
  }

  @MessagePattern('validateRequest')
  @UsePipes(new JoiValidationPipe(RequestValidationSchema))
  async validateRequest(@Payload() payload: RequestValidationBodyDto) {
    //Выполняем метод валидации реквеста
    // Возвращаем результат
    return await this.appService
      .validateRequestCode(payload)
      .catch((error) => ErrorHandler(error));
  }
  //для гварда на энтрансе
  @MessagePattern('validateUserid')
  async validateUserid(@Payload() payload: number) {
    //Выполняем метод валидации реквеста
    // Возвращаем результат, в любом случае будет true/false
    return await this.appService.validateUserid(payload);
  }

  @MessagePattern('setNewPassword')
  @UsePipes(new JoiValidationPipe(SetNewPasswordSchema))
  async setNewPassword(@Payload() payload: SetNewPasswordBodyDto) {
    //Выполняем метод обновления пароля
    // Возвращаем результат
    return await this.appService
      .setNewPassword(payload)
      .catch((error) => ErrorHandler(error));
  }
}
