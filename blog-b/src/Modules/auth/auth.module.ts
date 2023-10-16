import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MailModule } from '@/Modules/mail/mail.module';
import { GuardsModule } from '@/Guards/guards.module';
import { RedisDBModule } from '@/Modules/redis/redis.module';
import { PostgresModule } from '@/Modules/postgres/postgres.module';

@Module({
  imports: [MailModule, GuardsModule, RedisDBModule, PostgresModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
