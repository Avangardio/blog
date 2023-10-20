import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './Modules/auth/auth.module';
import { GuardsModule } from '@/Guards/guards.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RmqModule } from '@/rmq.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RmqModule,
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
