import {ArgumentsHost, Catch, ExceptionFilter} from '@nestjs/common';
import {ExtendedError} from '@/Errors/errors';

@Catch(ExtendedError) // Ловим только ошибки этого типа
export class ExtendedErrorFilter implements ExceptionFilter {
    catch(error: ExtendedError, host: ArgumentsHost) {
        console.error(error.originMessage);
        return {
            isSucceed: false,
            name: error.name,
            code: error?.code ?? 500,
            message: error.message || 'SERVER_ERROR',
        }; // Возвращаем объект ошибки
    }
}
