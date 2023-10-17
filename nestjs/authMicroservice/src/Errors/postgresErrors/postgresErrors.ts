import {ExtendedError} from '@/Errors/errors';
import {ApiProperty} from '@nestjs/swagger';

export class DatabasePGError extends ExtendedError {
    @ApiProperty({description: 'Error code', default: 500})
    code: number;

    @ApiProperty({description: 'Error name', default: 'DatabasePGError'})
    name: string;

    @ApiProperty({description: 'Error message', default: 'POSTGRES_ERROR'})
    message: string;

    constructor(message: string) {
        super('DatabasePGError', message, 500);
    }
}

export class UserExistsError extends ExtendedError {
    constructor(message: string) {
        super('UserExistsError', message, 400);
    }
}
export class NoUserError extends ExtendedError {
    constructor(message: string) {
        super('NoUserError', message, 400);
    }
}
