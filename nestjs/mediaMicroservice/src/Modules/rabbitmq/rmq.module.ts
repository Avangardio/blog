import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
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
    ]),
  ],
  providers: [],
  exports: [],
})
export class RmqModule {}
