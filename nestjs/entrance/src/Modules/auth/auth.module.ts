import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from '@/Modules/mail/mail.module';
import { GuardsModule } from '@/Guards/guards.module';
import { ClientsModule } from '@nestjs/microservices';
import { RmqModule } from '@/rmq.module';
import { JwtRootModule } from '@/Modules/jwt/jwt.module';

@Module({
  imports: [MailModule, GuardsModule, RmqModule, JwtRootModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
