import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './Modules/auth/auth.module';
import { RedisDBModule } from '@/Modules/redis/redisdb.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { PostgresDBModule } from '@/Modules/postgres/postgresDB.module';

@Module({
  imports: [
    PostgresDBModule,
    RedisDBModule,
    AuthModule,
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
export class AppModule {}
