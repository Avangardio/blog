import { ExtendedError } from '@/Errors/errors';

export class DatabaseError extends ExtendedError {
  constructor(message: string) {
    super('DatabaseError', message, 500);
  }
}
export class ActiveBlockError extends ExtendedError {
  constructor(message: string) {
    super('BlockActiveError', message, 400);
  }
}
