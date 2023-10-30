import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './Modules/auth/auth.module';
import { GuardsModule } from '@/Guards/guards.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from '@/Modules/posts/posts.module';
import { RmqModule } from '@/Modules/rabbitmq/rmq.module';

@Module({
  imports: [
    PostsModule,
    GuardsModule,
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
