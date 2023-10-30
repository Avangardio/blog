import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CookieAuthGuard } from '@/Guards/cookie.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import RedisCSRFService from '@/Guards/guards.service';
import { AuthService } from '@/Modules/auth/auth.service';
import GuardsService from '@/Guards/guards.service';
import { ClientsModule } from '@nestjs/microservices';
import { JwtGuard } from '@/Guards/jwt.guard';
import { JwtServiceRoot } from '@/Guards/jwt.service';
import { RmqModule } from '@/Modules/rabbitmq/rmq.module';

@Module({
  imports: [
    RmqModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT'),
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService): RedisModuleOptions => {
        const redisConfig = configService.get('redis');
        return {
          closeClient: true,
          config: redisConfig,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [CookieAuthGuard, JwtGuard, GuardsService, JwtServiceRoot],
  exports: [CookieAuthGuard, JwtGuard, JwtServiceRoot],
})
export class GuardsModule {}
