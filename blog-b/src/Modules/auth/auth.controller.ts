import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res, UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { JoiValidationPipe } from '@/Pipes/JoiValidationPipe';
import { RegistrationSchema } from '@/Pipes/Jois/Registration/RegistrationSchema';
import { MailService } from '@/Modules/mail/mail.service';
import ErrorHandler from '@/Errors/errors';
import { SwaggerDecorator } from '@/Swagger/swagger.decorator';
import RegistrationMetadata from '@/Modules/auth/metadata/auth.metadata';
import { ConfigService } from '@nestjs/config';
import {CookieAuthGuard} from "@/Guards/cookie.guard";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  @Get('z')
  @UseGuards(CookieAuthGuard)
  z1(){
    return 'zzzz!'
  }
  @Post('registration')
  @UsePipes(new JoiValidationPipe(RegistrationSchema))
  @SwaggerDecorator(RegistrationMetadata)
  async registration(
    @Body() body: IRegistrationBody,
    @Req() request: FastifyRequest,
  ) {
    console.log(request.cookies); // or "request.cookies['cookieKey']"
    return this.authService
      .registrationStart(body)
      .catch((error) => ErrorHandler(error));
    /*return await this.mailService
      .sendTest('avangardiotestblog@gmail.com')
      .then((_) => 'OKAYY MAN Z');
      
     */
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
