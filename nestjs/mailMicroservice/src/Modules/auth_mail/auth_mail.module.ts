import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import {Auth_mailService} from "@/Modules/auth_mail/auth_mail.service";

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.auth_mail.ru',
        port: 465,
        secure: true,
        auth: {
          user: 'avangardiotestblog',
          pass: 'yYErzQzVawuBDfFvjfnH',
        },
      },
      defaults: {
        from: '"avangardiotestblog" <avangardiotestblog@auth_mail.ru>',
      },
      template: {
        dir: path.join(__dirname, '..', '..', 'emails', 'auth'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [Auth_mailService],
  exports: [Auth_mailService],
})
export class Auth_mailModule {}
