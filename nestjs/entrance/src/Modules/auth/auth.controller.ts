import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
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
import { RegistrationSchema } from '@/Pipes/Jois/auth/RegistrationSchema';
import { SwaggerDecorator } from '@/Swagger/swagger.decorator';
import RegistrationMetadata from '@/Modules/auth/metadata/auth.metadata';
import { ConfigService } from '@nestjs/config';
import { CookieAuthGuard } from '@/Guards/cookie.guard';
import {
  RegistrationBodyDto,
  RegistrationOutputDto,
} from '@/DTO/auth/registration';
import { RequestValidationSchema } from '@/Pipes/Jois/auth/RequestValidationSchema';
import {
  ConfirmationBodyDto,
  ConfirmationOutputDto,
} from '@/DTO/auth/confirmation';
import { LoginINTSchema } from '@/Pipes/Jois/auth/LoginINTSchema';
import { LoginBodyDto, LoginOutputDto } from '@/DTO/auth/login';
import { RestorationSchema } from '@/Pipes/Jois/auth/RestorationSchema';
import { RestorationBodyDto } from '@/DTO/auth/restoration';
import { RequestValidationBodyDto } from '@/DTO/auth/validateRequest';
import { JwtGuard } from '@/Guards/jwt.guard';
import { JwtServiceRoot } from '@/Guards/jwt.service';
import { SetNewPasswordBodyDto } from '@/DTO/auth/setNewPassword';
import { SetNewPasswordSchema } from '@/Pipes/Jois/auth/SetNewPasswordSchema';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entrance/Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly jwtServiceRoot: JwtServiceRoot,
  ) {}

  @Get('authenticate')
  @UseGuards(JwtGuard)
  authentication(
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const [username, userid] = [
      request.body['username'] as string,
      request.body['userid'] as number,
    ];
    response.status(200);
    return { userid, username };
  }
  /**
   * @name registration
   * @description Роут для начального этапа регистрации
   * @param {RegistrationBodyDto} body Тело запроса
   * @param request
   * @param response
   * @return {RegistrationOutputDto} Тело ответа
   */
  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  @SwaggerDecorator(RegistrationMetadata)
  async registration(
    @Body() body: RegistrationBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    //Выполняем метод регистрации
    const result = await this.authService.rmqAuthService.registration(body);
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
  }
  /**
   * @name confirmation
   * @description Роут для подтверждения регистрации посредтством отправки кода с имейла
   * @param {ConfirmationBodyDto} body Тело запроса
   * @param request
   * @param response
   * @return {ConfirmationOutputDto} Тело ответа
   */
  @Post('confirmation')
  @UsePipes(new JoiValidationPipe(RequestValidationSchema))
  async confirmation(
    @Body() body: ConfirmationBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    //Выполняем метод подтверждения
    const result = await this.authService.rmqAuthService.confirmation(body);
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
  }
  /**
   * @name login
   * @description Роут для логина посредством пароля и имейла
   * @param {LoginBodyDto} body Тело запроса
   * @param request
   * @param response
   * @return {LoginOutputDto} Тело ответа
   */
  @Post('login')
  @UsePipes(new JoiValidationPipe(LoginINTSchema))
  async loginInternal(
    @Body() body: LoginBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    //Выполняем метод логина
    const result = await this.authService.rmqAuthService.login(body);
    //Проверяем, успешно ли прошел проверку пользователь
    if (result.code === 200) {
      const { code, message, isSucceed, payload } = result;
      //подписываем куки
      const userCookie = await this.jwtServiceRoot.signUser(payload);
      //отправляем куки на месяц
      response.setCookie('userdata', userCookie, {
        httpOnly: true,
        path: '/',
        maxAge: 2.592e6,
      });
      response.status(result.code);
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
  /**
   * @name logoutUser
   * @description Роут для выхода пользователя посредтством обнуления его куки с данными
   * @param response
   * @return {string} Тело ответа - OK
   */
  @Get('logout')
  async logoutUser(@Res({ passthrough: true }) response: FastifyReply) {
    //удаляем куки
    response.clearCookie('userdata');
    //возвращаем ответ
    response.status(200);
    return 'OK';
  }
  /**
   * @name restoration
   * @description Роут для начала восстановления пароля, создает реквест в редисе, который надо будет подтвердить кодом
   * @param {RestorationBodyDto} body Тело запроса
   * @param request
   * @param response
   * @return {RestorationOutputDto} Тело ответа
   */
  @Post('restoration')
  @UsePipes(new JoiValidationPipe(RestorationSchema))
  async restorationRequest(
    @Body() body: RestorationBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const result = await this.authService.rmqAuthService.restoration(body);
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
  }
  /**
   * @name validateRequest
   * @description Роут для проверки запроса с имейл кодом, нужно для фронтенда больше
   * @param {RequestValidationBodyDto} body Тело запроса
   * @param request
   * @param response
   * @return {RestorationOutputDto} Тело ответа
   */
  @Post('validateRequest')
  @UsePipes(new JoiValidationPipe(RequestValidationSchema))
  async validateRequest(
    @Body() body: RequestValidationBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const result = await this.authService.rmqAuthService.validateRequest(body);
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
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
      maxAge: 2.592e6,
    });
    response.status(302).redirect('/' + swaggerURL);
  }
  @Post('setNewPassword')
  @UsePipes(new JoiValidationPipe(SetNewPasswordSchema))
  async setNewPassword(
    @Body() body: SetNewPasswordBodyDto,
    @Req() request: FastifyRequest,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const result = await this.authService.rmqAuthService.setNewPassword(body);
    //Отдаем код результата
    response.status(result.code);
    //Возвращаем результат
    return result;
  }
}
