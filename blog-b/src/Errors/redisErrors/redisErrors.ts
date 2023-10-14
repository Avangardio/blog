import { ExtendedError } from '@/Errors/errors';
import { ApiProperty } from '@nestjs/swagger';

export class DatabaseRedisError extends ExtendedError {
  @ApiProperty({ description: 'Error code', default: 500 })
  code: number;

  @ApiProperty({ description: 'Error name', default: 'DatabaseRedisError' })
  name: string;

  @ApiProperty({ description: 'Error message', default: 'REDIS  _ERROR' })
  message: string;
  constructor(message: string) {
    super('DatabaseError', message, 500);
  }
}
export class ActiveBlockError extends ExtendedError {
  constructor(message: string) {
    super('BlockActiveError', message, 400);
  }
}
