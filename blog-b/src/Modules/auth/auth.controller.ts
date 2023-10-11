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
import RedisDBService from '@/Modules/redis/redisdb.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly appService: AuthService,
    private readonly mailService: MailService,
    private readonly redisdbService: RedisDBService,
  ) {}

  @Get('z')
  async z1() {
    return await this.redisdbService.regBlock.setBlock('ZZ');
  }

  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  async registration(
    @Body() body: IRegistrationBody,
    @Req() request: FastifyRequest,
  ) {
    return await this.mailService
      .sendTest('avangardiotestblog@gmail.com')
      .then((_) => 'OKAYY MAN Z');
  }
}
