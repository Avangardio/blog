import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostgresService from '@/Modules/postgres/postgres.service';
import { View } from '@/Modules/postgres/Entities/view.entity';
import { User } from '@/Modules/postgres/Entities/user.entity';
import { Post } from '@/Modules/postgres/Entities/post.entity';
import UserRepo from '@/Modules/postgres/repositories/userRepo';
import UserService from '@/Modules/postgres/user.service';

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
          entities: [User, Post, View],
          synchronize: false,
          cache: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [PostgresService, UserService, UserRepo],
  exports: [PostgresService],
})
export class PostgresModule {}
