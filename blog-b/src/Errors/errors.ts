export default function ErrorHandler(error: Error) {
  if (error instanceof ExtendedError) {
    return {
      name: error.name,
      code: error.code,
      message: error.message,
    };
  }
  return {
    name: error.name,
    message: error.message,
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
