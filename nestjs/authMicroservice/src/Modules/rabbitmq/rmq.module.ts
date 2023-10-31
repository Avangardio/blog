import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqMailService } from '@/Modules/rabbitmq/rmq-mail.service';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'MAIL_SERVICE',
        imports: [ConfigModule], // импорт ConfigModule
        useFactory: (configService: ConfigService) => {
          const { rmqHost, rmqPort, rmqAuth } = configService.get('RMQ');
          return {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}/`],
              queue: 'mail_Queue',
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
  providers: [RmqMailService],
  exports: [RmqMailService],
})
export class RmqModule {}
