import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RmqAuthService } from '@/Modules/rabbitmq/rmq-auth.service';

@Injectable()
export class AuthService {
  constructor(public readonly rmqAuthService: RmqAuthService) {}
}
