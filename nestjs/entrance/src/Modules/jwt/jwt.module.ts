import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtServiceRoot } from '@/Modules/jwt/jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key-here', // замените на свой секретный ключ
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtServiceRoot, JwtModule],
  exports: [JwtServiceRoot],
})
export class JwtRootModule {}
