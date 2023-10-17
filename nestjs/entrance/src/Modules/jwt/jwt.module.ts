import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JwtServiceRoot } from '@/Modules/jwt/jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [JwtServiceRoot,],
  exports: [JwtServiceRoot],
})
export class JwtRootModule {}
