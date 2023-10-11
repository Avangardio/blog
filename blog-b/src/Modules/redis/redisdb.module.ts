import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import RedisDBService from '@/Modules/redis/redisdb.service';

@Global()
@Module({
  imports: [
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
  providers: [RedisDBService],
  exports: [RedisDBService],
})
export class RedisDBModule {}
