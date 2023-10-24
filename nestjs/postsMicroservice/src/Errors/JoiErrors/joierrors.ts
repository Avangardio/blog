import { ExtendedError } from "@/Errors/errors";

export class NotAcceptableJoiError extends ExtendedError {
  constructor(message: string) {
    super("NotAcceptableJoiError", message, 406);
  }
}
