import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const [rmqHost, rmqPort, rmqAuth] = [
    process.env.RMQ_HOST || 'localhost',
    process.env.RMQ_PORT || 5672,
    process.env.RMQ_PASSWORD && process.env.RMQ_USERNAME
      ? `${process.env.RMQ_USERNAME}:${process.env.RMQ_PASSWORD}@`
      : '',
  ];
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${rmqAuth}${rmqHost}:${rmqPort}`],
        queue: 'auth_Queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  console.log('Server started on: authQueue');
}

bootstrap();
