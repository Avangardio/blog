import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { PostgresModule } from '@/Modules/postgres/postgres.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

@Module({
  imports: [
    PostgresModule,
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
