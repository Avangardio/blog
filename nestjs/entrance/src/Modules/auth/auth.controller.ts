import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { RegistrationSchema } from '@/Pipes/Jois/Registration/RegistrationSchema';
import { SwaggerDecorator } from '@/Swagger/swagger.decorator';
import RegistrationMetadata from '@/Modules/auth/metadata/auth.metadata';
import { ConfigService } from '@nestjs/config';
import { CookieAuthGuard } from '@/Guards/cookie.guard';
import { RegistrationBodyDto } from '@/DTO/auth/registration';
import { ConfirmationSchema } from '@/Pipes/Jois/Registration/ConfirmationSchema';
import { ConfirmationBodyDto } from '@/DTO/auth/confirmation';
import { LoginINTSchema } from '@/Pipes/Jois/Login/LoginINTSchema';
import { LoginBodyDto } from '@/DTO/auth/login';
import { JwtServiceRoot } from '@/Modules/jwt/jwt.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly jwtServiceRoot: JwtServiceRoot,
  ) {}

  @Get('z')
  @UseGuards(CookieAuthGuard)
  async z1() {
    return 'zx';
  }
  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  @SwaggerDecorator(RegistrationMetadata)
  async registration(
    @Body() body: RegistrationBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    //Выполняем метод регистрации
    const result = await this.authService.registration(body).catch(() => {
      //Все ошибки обрабатываются внутри микросервиса, здесь глобальные ловим и выбрасываем для неста исключение
      throw new InternalServerErrorException();
    });
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
  }
  @Post('confirmation')
  @UsePipes(new JoiValidationPipe(ConfirmationSchema))
  async confirmation(
    @Body() body: ConfirmationBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    //Выполняем метод подтверждения
    const result = await this.authService.confirmation(body).catch(() => {
      //Все ошибки обрабатываются внутри микросервиса, здесь глобальные ловим и выбрасываем для неста исключение
      throw new InternalServerErrorException();
    });
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
  }
  @Post('login')
  @UsePipes(new JoiValidationPipe(LoginINTSchema))
  async loginInternal(
    @Body() body: LoginBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    //Выполняем метод логина
    const result = await this.authService.login(body).catch(() => {
      //Все ошибки обрабатываются внутри микросервиса, здесь глобальные ловим и выбрасываем для неста исключение
      throw new InternalServerErrorException();
    });
    //Проверяем, успешно ли прошел проверку пользователь
    if (result.code === 200) {
      const { code, message, isSucceed, payload } = result;
      //подписываем куки
      const userCookie = await this.jwtServiceRoot.signUser(payload);
      //отправляем куки
      response.setCookie('userdata', userCookie, {
        httpOnly: true,
        path: '/',
        maxAge: 360000,
      });
      //возвращаем часть ответа
      return {
        code,
        message,
        isSucceed,
      };
    }
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
  }
  @Get('logout')
  logoutUser(@Res({ passthrough: true }) response: FastifyReply) {
    //удаляем куки
    response.clearCookie('userdata');
    //возвращаем ответ
    response.status(200);
    return 'OK';
  }
  @Get('swagger')
  getSwaggerKey(
    @Res({ passthrough: false }) response: FastifyReply,
    @Query() query: { key: string },
  ) {
    const swaggerKeyRef = this.configService.get('swaggerKey');
    const swaggerURL = this.configService.get('swaggerURL');

    if (query.key !== swaggerKeyRef)
      return response.status(403).send('Invalid code!');

    //const signedKey = response.signCookie(query.key);
    response.setCookie('swaggerKey', query.key, {
      httpOnly: true,
      path: '/',
      maxAge: 360000,
    });
    response.status(302).redirect('/' + swaggerURL);
  }
}
