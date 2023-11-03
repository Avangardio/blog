import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MailModule } from '@/Modules/mail/mail.module';
import { GuardsModule } from '@/Guards/guards.module';
import { RmqModule } from '@/Modules/rabbitmq/rmq.module';

@Module({
  imports: [MailModule, GuardsModule, RmqModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
