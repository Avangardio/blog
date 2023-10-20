import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: FastifyRequest = context.switchToHttp().getRequest();
    const cookies = request.cookies;
    // В данном примере мы просто проверяем наличие куки с именем 'myCookie'
    if (cookies) {
      // В реальном сценарии вы бы, возможно, проверяли значение куки или что-то ещё.
      return true;
    }

    return false;
  }
}
