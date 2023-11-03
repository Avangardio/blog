import {RmqBaseService} from '@/Modules/rabbitmq/base.service';
import {Inject, Injectable} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ConfirmationEntityDto, RestorationEntityDto,} from '@/DTO/redisEntities/redisEntities';

@Injectable()
export class RmqMailService extends RmqBaseService {
    constructor(@Inject('MAIL_SERVICE') rmqService: ClientProxy) {
        super(rmqService);
    }

    sendConfirmationEmail(
        data: Pick<
            ConfirmationEntityDto,
            'email' | 'emailCode' | 'name' | 'language' | 'token'
        >,
    ) {
        const {email, emailCode, name, language, token} = data;
        const payload = {
            email,
            emailCode,
            name,
            language,
            token,
        };
        return this.sendCmd('sendConfirmationEmail', payload, 5 * 1000);
    }

    sendRestorationEmail(
        data: Pick<
            RestorationEntityDto,
            'email' | 'token' | 'emailCode' | 'language'
        >,
    ) {
        const {emailCode, token, email, language} = data;
        const payload = {
            email,
            emailCode,
            language,
            token,
        };
        return this.sendCmd('sendRestorationEmail', payload, 5 * 1000);
    }
}
