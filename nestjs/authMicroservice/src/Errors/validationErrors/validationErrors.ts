import {ExtendedError} from "@/Errors/errors";

export class WrongPasswordError extends ExtendedError {
    constructor(message: string) {
        super("WrongPasswordError", message, 400);
    }
}
