import { ExtendedError } from '@/Errors/errors';
import { ApiProperty } from '@nestjs/swagger';

export class BcryptFuncError extends ExtendedError {
  @ApiProperty({ description: 'Error code', default: 500 })
  code: number;

  @ApiProperty({ description: 'Error name', default: 'BcryptFuncError' })
  name: string;

  @ApiProperty({ description: 'Error message', default: 'BCRYPT_ERROR' })
  message: string;

  constructor(message: string) {
    super('BcryptFuncError', message, 500);
  }
}
