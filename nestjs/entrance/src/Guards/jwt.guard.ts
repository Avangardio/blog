import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { JwtServiceRoot } from '@/Guards/jwt.service';
@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtServiceRoot) {}

  async canActivate(context: ExecutionContext) {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    //ищем куки с жвт пользователя
    const userdata = request.cookies.userdata;

    //если нет - исключение
    if (!userdata) {
      throw new UnauthorizedException('Token not found');
    }
    //пытаемся валидировать токен и получить новый, в случае успеха
    const newToken = await this.jwtService.validateUserdata(userdata);

    //если новый токен false -  значит, прислали плохой
    if (!newToken) {
      response.clearCookie('userdata');
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Присоединить новый токен к ответу
    response.setCookie('userdata', newToken.newToken, {
      httpOnly: true,
      path: '/',
      //1 Месяц
      maxAge: 2.592e6,
    });
    //добавляем в тело запроса пользователя
    if (!request.body) request.body = {};

    request.body['userId'] = newToken.userid;
    request['username'] = newToken.username;
    request['userId'] = newToken.userid;
    return true;
  }
}
