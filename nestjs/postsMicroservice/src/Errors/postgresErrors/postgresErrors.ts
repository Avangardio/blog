import { ExtendedError } from "@/Errors/errors";

export class DatabasePGError extends ExtendedError {
  constructor(message: string) {
    super("DatabasePGError", message, 500);
  }
}

export class UserExistsError extends ExtendedError {
  constructor(message: string) {
    super("UserExistsError", message, 400);
  }
}

export class NoUserError extends ExtendedError {
  constructor(message: string) {
    super("NoUserError", message, 400);
  }
}
