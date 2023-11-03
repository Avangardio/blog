import {Injectable} from '@nestjs/common';
import {MailerService} from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly Mailer: MailerService) {
    }

    async sendTest(email: string) {
        await this.Mailer.sendMail({
            to: email,
            subject: 'Тестовое сообщение',
            template: 'sendRegistrationCode_RU.hbs',
            context: {
                emailCode: 'Иван',
            },
        });
    }
}
