import {Body, Controller, Get, Post, Query, Req, Res, UseGuards, UsePipes,} from '@nestjs/common';
import {AuthService} from './auth.service';
import {FastifyReply, FastifyRequest} from 'fastify';
import {JoiValidationPipe} from '@/Pipes/JoiValidationPipe';
import {RegistrationSchema} from '@/Pipes/Jois/Registration/RegistrationSchema';
import {MailService} from '@/Modules/mail/mail.service';
import ErrorHandler from '@/Errors/errors';
import {SwaggerDecorator} from '@/Swagger/swagger.decorator';
import RegistrationMetadata from '@/Modules/auth/metadata/auth.metadata';
import {ConfigService} from '@nestjs/config';
import {CookieAuthGuard} from '@/Guards/cookie.guard';
import {RegistrationBodyDto} from '@/DTO/auth/registration';
import {ConfirmationSchema} from '@/Pipes/Jois/Registration/ConfirmationSchema';
import {ConfirmationBodyDto} from '@/DTO/auth/confirmation';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailService: MailService,
        private readonly configService: ConfigService,
    ) {
    }

    @Get('z')
    @UseGuards(CookieAuthGuard)
    async z1() {
        console.log(
            await this.authService.postgresService.auth.userRepo.userNotExistsByEmail(
                'z',
            ),
        );
        return 'zx';
    }

    @Post('registration')
    @UsePipes(new JoiValidationPipe(RegistrationSchema))
    @SwaggerDecorator(RegistrationMetadata)
    async registration(
        @Body() body: RegistrationBodyDto,
        @Req() request: FastifyRequest,
        @Res({passthrough: true}) response: FastifyReply,
    ) {
        //Выполняем метод регистрации
        const result = await this.authService
            .registration(body)
            .catch((error) => ErrorHandler(error));
        //Отдаем код результата
        response.status(result.code);
        //Возвращаем результат
        return result;
    }

    @Post('confirmation')
    @UsePipes(new JoiValidationPipe(ConfirmationSchema))
    async confirmation(
        @Body() body: ConfirmationBodyDto,
        @Req() request: FastifyRequest,
        @Res({passthrough: true}) response: FastifyReply,
    ) {
        //Выполняем метод подтверждения
        const result = await this.authService
            .confirmation(body)
            .catch((error) => ErrorHandler(error));
        //Отдаем код результата
        response.status(result.code);
        //Возвращаем результат
        return result;
    }

    @Get('swagger')
    getSwaggerKey(
        @Res({passthrough: false}) response: FastifyReply,
        @Query() query: { key: string },
    ) {
        const swaggerKeyRef = this.configService.get('swaggerKey');
        const swaggerURL = this.configService.get('swaggerURL');

        if (query.key !== swaggerKeyRef)
            return response.status(403).send('Invalid code!');

        //const signedKey = response.signCookie(query.key);
        response.setCookie('swaggerKey', query.key, {
            httpOnly: true,
            path: '/',
            maxAge: 360000,
        });
        response.status(302).redirect('/' + swaggerURL);
    }
}
