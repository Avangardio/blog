import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import RedisService from '@/Modules/redis/redis.service';
import RegBlock from '@/Modules/redis/classes/regBlock';

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
  providers: [RedisService, RegBlock],
  exports: [RedisService],
})
export class RedisDBModule {}
