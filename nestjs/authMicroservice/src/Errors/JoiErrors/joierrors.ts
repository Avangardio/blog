import { ExtendedError } from "@/Errors/errors";

export class NotAcceptableJoiError extends ExtendedError {
  constructor(message: string, originMessage?: any) {
    super("NotAcceptableJoiError", message, 406, originMessage);
  }
}
