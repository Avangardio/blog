import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from '@nestjs/config';
import configuration from './config/configuration';

import {Auth_mailModule} from "@/Modules/auth_mail/auth_mail.module";

@Module({
    imports: [
        Auth_mailModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: '.env',
            expandVariables: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
