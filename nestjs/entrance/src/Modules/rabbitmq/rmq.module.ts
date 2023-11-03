import { Module } from '@nestjs/common';
import { AuthService } from '@/Modules/auth/auth.service';
import { RmqAuthService } from '@/Modules/rabbitmq/rmq-auth.service';
import { RmqBaseService } from '@/Modules/rabbitmq/base.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqPostsService } from '@/Modules/rabbitmq/rmq-posts.service';
import { RmqMediaService } from "@/Modules/rabbitmq/rmq-media.service";

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule], // импорт ConfigModule
        useFactory: (configService: ConfigService) => {
          const { rmqHost, rmqPort, rmqAuth } = configService.get('RMQ');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}/`],
              queue: 'auth_Queue',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
      {
        name: 'POSTS_SERVICE',
        imports: [ConfigModule], // импорт ConfigModule
        useFactory: (configService: ConfigService) => {
          const { rmqHost, rmqPort, rmqAuth } = configService.get('RMQ');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}/`],
              queue: 'posts_Queue',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
      {
        name: 'MEDIA_SERVICE',
        imports: [ConfigModule], // импорт ConfigModule
        useFactory: (configService: ConfigService) => {
          const { rmqHost, rmqPort, rmqAuth } = configService.get('RMQ');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}/`],
              queue: 'media_Queue',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RmqAuthService, RmqPostsService, RmqMediaService],
  exports: [RmqAuthService, RmqPostsService, RmqMediaService],
})
export class RmqModule {}
