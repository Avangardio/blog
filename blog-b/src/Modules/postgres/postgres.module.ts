import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostgresService from '@/Modules/postgres/postgres.service';
import { View } from '@/Modules/postgres/Entities/view.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import { PostgresAuthModule } from '@postgresModules/auth/postgres.auth.module';

@Module({
  imports: [
    PostgresAuthModule,
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
          entities: [User, Post, View],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
