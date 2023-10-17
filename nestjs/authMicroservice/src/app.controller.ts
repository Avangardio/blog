import { Controller, UsePipes } from '@nestjs/common';
import { RegistrationBodyDto } from '@/DTO/auth/registration';
import ErrorHandler from '@/Errors/errors';
import { ConfirmationBodyDto } from '@/DTO/auth/confirmation';
import { AppService } from '@/app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { RegistrationSchema } from '@/Pipes/Jois/Registration/RegistrationSchema';
import { ConfirmationSchema } from '@/Pipes/Jois/Registration/ConfirmationSchema';
import { LoginINTSchema } from '@/Pipes/Jois/Login/LoginINTSchema';
import { LoginBodyDto } from '@/DTO/auth/login';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  async registration(@Payload() payload: RegistrationBodyDto) {
    //Выполняем метод регистрации
    const result = await this.appService
      .registration(payload)
      .catch((error) => ErrorHandler(error));
    //Возвращаем результат
    return result;
  }
  @MessagePattern('confirmation')
  @UsePipes(new JoiValidationPipe(ConfirmationSchema))
  async confirmation(@Payload() payload: ConfirmationBodyDto) {
    //Выполняем метод подтверждения
    const result = await this.appService
      .confirmation(payload)
      .catch((error) => ErrorHandler(error));
    // Возвращаем результат
    return result;
  }
  @MessagePattern('login')
  @UsePipes(new JoiValidationPipe(LoginINTSchema))
  async login(@Payload() payload: LoginBodyDto) {
    //Выполняем метод подтверждения
    const result = await this.appService
      .login(payload)
      .catch((error) => ErrorHandler(error));
    // Возвращаем результат
    return result;
  }
}
