// swagger.guard.ts

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwaggerGuard implements CanActivate {
  private swaggerKeyRef: string;
  constructor(swaggerKey: string) {
    this.swaggerKeyRef = swaggerKey;
  }
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const swaggerKey = request?.cookies?.swaggerKey;

    if (swaggerKey && swaggerKey === this.swaggerKeyRef) {
      return true;
    }

    throw new NotFoundException('Not Found');
  }
}
