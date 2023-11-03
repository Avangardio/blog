import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';
import {ConfigService} from '@nestjs/config';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import createSwaggerMiddleware from '@/Swagger/swagger.guard';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await app.register(fastifyCookie, {
        secret: 'my-secret', // for cookies signature
    });

    const configService = app.get(ConfigService);

    const {port, host} = configService.get('server');
    const swagger_url = configService.get('swaggerURL');

    const config = new DocumentBuilder()
        .setTitle('Cats example')
        .setDescription('The cats API description')
        .setVersion('1.0')
        .addTag('cats')
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

bootstrap();
