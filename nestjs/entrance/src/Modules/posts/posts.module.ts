import {Module} from '@nestjs/common';
import {PostsController} from './posts.controller';
import {PostsService} from './posts.service';
import {MailModule} from '@/Modules/mail/mail.module';
import {GuardsModule} from '@/Guards/guards.module';
import {RmqModule} from '@/Modules/rabbitmq/rmq.module';

@Module({
    imports: [MailModule, GuardsModule, RmqModule],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {
}
