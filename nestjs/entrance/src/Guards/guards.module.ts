import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CookieAuthGuard } from '@/Guards/cookie.guard';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CookieAuthGuard],
  exports: [CookieAuthGuard],
})
export class GuardsModule {}
