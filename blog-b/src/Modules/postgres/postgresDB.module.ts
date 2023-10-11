import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import RedisDBService from '@/Modules/redis/redisdb.service';
import PostgresDBService from '@/Modules/postgres/postgresDB.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const postgresConfig = configService.get('postgres');
        return {
          type: 'postgres',
          host: postgresConfig.host,
          port: postgresConfig.port,
          username: postgresConfig.username,
          password: postgresConfig.password,
          database: postgresConfig.database,
          entities: [],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PostgresDBService],
  exports: [PostgresDBService],
})
export class PostgresDBModule {}
