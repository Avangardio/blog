import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from '@/Modules/mail/mail.module';
import { GuardsModule } from '@/Guards/guards.module';

@Module({
  imports: [MailModule, GuardsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
