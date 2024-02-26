export interface IUseCaseException {
  statusCode: number;
  message: string[];
  error: string;
}

export class UseCaseError extends Error {
  constructor(
    public readonly message = "UseCase Error",
    private readonly status = 406,
  ) {
    super(message);
    Object.setPrototypeOf(this, UseCaseError.prototype);
  }
}
