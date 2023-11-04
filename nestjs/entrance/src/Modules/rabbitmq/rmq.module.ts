import { Module } from '@nestjs/common';
import { RmqAuthService } from '@/Modules/rabbitmq/rmq-auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ClientSession } from "typeorm";

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
              urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}`],
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
              urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}`],
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
              urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}`],
              queue: 'media_Queue',
              queueOptions: {
                durable: false,
              },
              maxConnectionAttempts: -1,
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [RmqAuthService],
  exports: [RmqAuthService, ClientsModule],
})
export class RmqModule {}
