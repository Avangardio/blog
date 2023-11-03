import {Module} from '@nestjs/common';
import PostgresAuthService from '@postgresModules/auth/postgres.auth.service';
import UserRepo from '@postgresModules/auth/repositories/userRepo';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '@/Modules/postgres/Entities/user.entity';
import {Post} from '@/Modules/postgres/Entities/post.entity';
import {View} from '@/Modules/postgres/Entities/view.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Post, View])],
    providers: [PostgresAuthService, UserRepo],
    exports: [PostgresAuthService],
})
export class PostgresAuthModule {
}
