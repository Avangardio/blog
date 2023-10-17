import { Module } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule], // импорт ConfigModule
        useFactory: (configService: ConfigService) => {
          const { rmqHost, rmqPort, rmqAuth } = configService.get('RMQ');
          console.log(`amqp://${rmqAuth}${rmqHost}:${rmqPort}`)
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
    ]),
  ],
  providers: [ClientsModule],
  exports: [ClientsModule],
})
export class RmqModule {}
