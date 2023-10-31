import { Inject, Injectable } from '@nestjs/common';
import {Auth_mailService} from "@/Modules/auth_mail/auth_mail.service";
@Injectable()
export class AppService {
    constructor(public readonly auth_mail: Auth_mailService) {}

}
