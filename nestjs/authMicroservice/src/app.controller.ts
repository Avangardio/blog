import { Controller, UseFilters, UsePipes } from '@nestjs/common';
import { RegistrationBodyDto } from '@/DTO/auth/registration';
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
import { SetNewPasswordSchema } from '@/Pipes/Jois/auth/SetNewPasswordSchema';
import { SetNewPasswordBodyDto } from '@/DTO/auth/setNewPassword';
import { ExtendedErrorFilter } from '@/Errors/errors.filter';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  @UseFilters(ExtendedErrorFilter)
  async registration(@Payload() payload: RegistrationBodyDto) {
    //Выполняем метод регистрации
    //Возвращаем результат
    return this.appService.registration(payload);
  }

  @MessagePattern('confirmation')
  @UsePipes(new JoiValidationPipe(RequestValidationSchema))
  @UseFilters(ExtendedErrorFilter)
  async confirmation(@Payload() payload: ConfirmationBodyDto) {
    //Выполняем метод подтверждения
    // Возвращаем результат
    return await this.appService.confirmation(payload);
  }

  @MessagePattern('login')
  @UsePipes(new JoiValidationPipe(LoginINTSchema))
  @UseFilters(ExtendedErrorFilter)
  async login(@Payload() payload: LoginBodyDto) {
    //Выполняем метод подтверждения
    // Возвращаем результат
    return await this.appService.login(payload);
  }

  @MessagePattern('restoration')
  @UsePipes(new JoiValidationPipe(RestorationSchema))
  @UseFilters(ExtendedErrorFilter)
  async restorationRequest(@Payload() payload: RestorationBodyDto) {
    //Выполняем метод подтверждения
    // Возвращаем результат
    return await this.appService.sendRestorationRequest(payload);
  }

  @MessagePattern('validateRequest')
  @UsePipes(new JoiValidationPipe(RequestValidationSchema))
  @UseFilters(ExtendedErrorFilter)
  async validateRequest(@Payload() payload: RequestValidationBodyDto) {
    //Выполняем метод валидации реквеста
    // Возвращаем результат
    return await this.appService.validateRequestCode(payload);
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
  @UseFilters(ExtendedErrorFilter)
  async setNewPassword(@Payload() payload: SetNewPasswordBodyDto) {
    //Выполняем метод обновления пароля
    // Возвращаем результат
    return await this.appService.setNewPassword(payload);
  }
}
