export class Result {
  static ok(value?: unknown): Result {
    return new Result(true, value);
  }

  static fail(value?: unknown): Result {
    return new Result(false, value);
  }

  static from(result: unknown): Nilable<Result> {
    if (result && typeof result === 'object' && 'success' in result && typeof result.success === 'boolean') {
      return new Result(result.success, 'value' in result ? result.value : undefined);
    }
  }

  private constructor(
    private readonly success: boolean,
    private readonly value: unknown
  ) {}

  get isOk(): boolean {
    return this.success;
  }

  get isFail(): boolean {
    return !this.success;
  }

  unwrap<TValue = unknown>(): TValue {
    return this.value as TValue;
  }
}
