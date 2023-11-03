import {Module} from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {CookieAuthGuard} from '@/Guards/cookie.guard';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your-secret-key-here', // замените на свой секретный ключ
            signOptions: {expiresIn: '1h'},
        }),
    ],
    providers: [CookieAuthGuard],
    exports: [CookieAuthGuard, JwtModule],
})
export class GuardsModule {
}
