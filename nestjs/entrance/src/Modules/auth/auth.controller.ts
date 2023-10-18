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
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import { ConfirmationSchema } from '@/Pipes/Jois/Registration/ConfirmationSchema';
import {
  ConfirmationBodyDto,
  ConfirmationOutputDto,
} from '@/DTO/auth/confirmation';
import { LoginINTSchema } from '@/Pipes/Jois/Login/LoginINTSchema';
import { LoginBodyDto, LoginOutputDto } from '@/DTO/auth/login';
import { JwtServiceRoot } from '@/Modules/jwt/jwt.service';
import { RestorationSchema } from '@/Pipes/Jois/Restoration/RestorationSchema';
import { RestorationBodyDto } from '@/DTO/auth/restoration';

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
    const result = await this.authService.sendCmd<
      RegistrationBodyDto,
      RegistrationOutputDto
    >('registration', body);
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
    const result = await this.authService.sendCmd<
      ConfirmationBodyDto,
      ConfirmationOutputDto
    >('confirmation', body);
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
    const result = await this.authService.sendCmd<LoginBodyDto, LoginOutputDto>(
      'login',
      body,
    );
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

  @Post('restoration')
  @UsePipes(new JoiValidationPipe(RestorationSchema))
  async restorationRequest(
    @Body() body: RestorationBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {}

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
