import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyReply, FastifyRequest } from 'fastify';

export default function createSwaggerMiddleware(configService: ConfigService) {
  return (
    request: FastifyRequest['raw'],
    reply: FastifyReply['raw'],
    next: () => void,
  ) => {
    const swaggerKey = configService.get('swaggerKey');
    const cookieValue = getCookieValue(request.headers.cookie, 'swaggerKey');
    if (cookieValue !== swaggerKey) {
      reply.writeHead(404, { 'Content-Type': 'text/plain' });
      reply.end('Not Found');
    } else {
      next();
    }
  };
}

function getCookieValue(cookies: string, cookieName: string): string | null {
  const cookieArray = cookies.split(';');
  for (const cookie of cookieArray) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}
