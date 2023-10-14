import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { RegistrationSchema } from '@/Pipes/Jois/Registration/RegistrationSchema';
import { MailService } from '@/Modules/mail/mail.service';
import * as path from 'path';
import RedisService from '@/Modules/redis/redis.service';
import PostgresService from '@/Modules/postgres/postgres.service';
import ErrorHandler from '@/Errors/errors';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  async registration(
    @Body() body: IRegistrationBody,
    @Req() request: FastifyRequest,
  ) {
    return this.authService
      .registrationStart(body)
      .catch((error) => ErrorHandler(error));
    /*return await this.mailService
      .sendTest('avangardiotestblog@gmail.com')
      .then((_) => 'OKAYY MAN Z');
      
     */
  }
}
