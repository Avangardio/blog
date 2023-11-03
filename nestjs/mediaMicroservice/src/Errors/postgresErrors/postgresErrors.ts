import { ExtendedError } from '@/Errors/errors';

export class DatabasePGError extends ExtendedError {
  constructor(message: string, originMessage?: any) {
    super('DatabasePGError', message, 500, originMessage);
  }
}

export class NoPostError extends ExtendedError {
  constructor(message: string, originMessage?: any) {
    super('NoPostError', message, 404, originMessage);
  }
}
export class NoLikeError extends ExtendedError {
  constructor(message: string, originMessage?: any) {
    super('NoLikeError', message, 404, originMessage);
  }
}
export class EntityExists extends ExtendedError {
  constructor(message: string, originMessage?: any) {
    super('EntityExists', message, 400, originMessage);
  }
}
export class NoUserError extends ExtendedError {
  constructor(message: string, originMessage?: any) {
    super('NoUserError', message, 400, originMessage);
  }
}
