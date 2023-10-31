import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as path from 'path';
import {ConfirmationBodyDto} from "@/DTO/confirmationBody";
import {RestorationBodyDto} from "@/DTO/restorationBody";

@Injectable()
export class Auth_mailService {
  constructor(private readonly Mailer: MailerService) {}

  async sendConfirmation(body: ConfirmationBodyDto) {
    const {email, emailCode, name, token, language} = body;
    await this.Mailer.sendMail({
      to: email,
      //subject: 'Тестовое сообщение',
      template: `./confirmation/sendConfirmationCode_${language || 'EN'}.hbs`,
      context: {
        emailCode: emailCode,
        name: name,
        token: token,
      },
    });
  }
  async sendRestoration(body: RestorationBodyDto) {
    const {email, emailCode, token, language} = body;
    await this.Mailer.sendMail({
      to: email,
      //subject: 'Тестовое сообщение',
      template: `./restoration/sendRestorationCode_${language || 'EN'}.hbs`,
      context: {
        emailCode: emailCode,
        token: token,
      },
    });
  }
}
