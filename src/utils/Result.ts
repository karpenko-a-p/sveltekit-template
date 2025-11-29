export class Result<TValue = unknown> {
  static ok<TValue = unknown>(value: TValue = null as TValue): Result<TValue> {
    return new Result(true, value);
  }

  static fail<TValue = unknown>(value: TValue = null as TValue): Result<TValue> {
    return new Result(false, value);
  }

  static from<TValue>(result: unknown): Maybe<Result<TValue>> {
    // prettier-ignore
    if (result && typeof result === 'object' && 'success' in result && typeof result.success === 'boolean' && 'value' in result) {
      return new Result(result.success, result.value as TValue);
    }
  }

  private constructor(
    private readonly success: boolean,
    readonly value: TValue
  ) {}

  isOk<TVal extends TValue>(): this is Result<TVal> {
    return this.success;
  }

  isFail<TVal extends TValue>(): this is Result<TVal> {
    return !this.success;
  }
}
