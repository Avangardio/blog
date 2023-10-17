class ErrorHandlerOutput {
    isSucceed: false;
    name: string;
    code: number;
    message: string;
}
export default function ErrorHandler(error: Error): ErrorHandlerOutput {
    if (error instanceof ExtendedError) {
        return {
            isSucceed: false,
            name: error.name,
            code: error.code,
            message: error.message,
        };
    }
    console.log(error);
    return {
        isSucceed: false,
        code: 500,
        name: error.name,
        message: 'SERVER_ERROR',
    };
}

export class ExtendedError extends Error {
    public readonly code: number;
    public readonly name: string;

    constructor(name: string, message: string, code: number) {
        super(message);
        this.name = name;
        this.code = code;
        Object.setPrototypeOf(this, ExtendedError.prototype);
    }
}
