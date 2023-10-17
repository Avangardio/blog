import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CookieAuthGuard } from '@/Guards/cookie.guard';

@Module({
  imports: [
  ],
  providers: [CookieAuthGuard],
  exports: [CookieAuthGuard],
})
export class GuardsModule {}
