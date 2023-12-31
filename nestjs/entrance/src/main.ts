import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import createSwaggerMiddleware from '@/Swagger/swagger.guard';
import * as fastifyCookie from '@fastify/cookie';
import { ClusterManager } from '@/clusterManager';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get(ConfigService);
  const secret = configService.get('JWT');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await app.register(fastifyCookie, {
    secret: secret, // for cookies signature
  });

  const { port, host } = configService.get('server');

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await app.register(fastifyCors, {
    origin: ['http://localhost:3000', 'localhost', host, '127.0.0.1'],
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Credentials',
      'Origin',
      'X-Requested-With',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
    methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE', 'PATCH'],
  });

  const swagger_url = configService.get('swaggerURL');

  const config = new DocumentBuilder()
    .setTitle('Blog entrance')
    .setDescription('Документация для бекенда блога')
    .setVersion('1.0')
    .addTag('auth', 'Роуты авторизации/аутентификации')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Применяем Guard к Swagger эндпоинту
  SwaggerModule.setup(swagger_url, app, document);

  const swaggerMiddlewareInstance = createSwaggerMiddleware(configService);
  app
    .getHttpAdapter()
    .getInstance()
    .use('/' + swagger_url, swaggerMiddlewareInstance);
  await app.listen(port, '0.0.0.0');
  console.log('Server started on: ' + host);
}

ClusterManager.clusterize(bootstrap);
