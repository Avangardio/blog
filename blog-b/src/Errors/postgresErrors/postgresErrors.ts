import { ExtendedError } from '@/Errors/errors';

export class DatabaseError extends ExtendedError {
  constructor(message: string) {
    super('DatabaseError', message, 500);
  }
}
export class UserExistsError extends ExtendedError {
  constructor(message: string) {
    super('UserExistsError', message, 400);
  }
}
