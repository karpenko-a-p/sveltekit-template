/**
 * Имплементация резалт паттерна
 */
export class Result<TOk, TFail> {
  /**
   * Success
   */
  static ok<TOk, TFail>(value: TOk): Result<TOk, TFail> {
    return new Result<TOk, TFail>(true, value);
  }

  /**
   * Failure
   */
  static fail<TOk, TFail>(value: TFail): Result<TOk, TFail> {
    return new Result<TOk, TFail>(false, value);
  }

  /**
   * Получение объекта результата из неизвестного объекта
   */
  static from<TOk, TFail>(result: unknown): Maybe<Result<TOk, TFail>> {
    // prettier-ignore
    if (result && typeof result === 'object' && 'success' in result && typeof result.success === 'boolean' && 'value' in result) {
      return new Result<TOk, TFail>(result.success, result.value as TOk);
    }
  }

  private constructor(
    private readonly success: boolean,
    readonly value: TOk | TFail
  ) {}

  /**
   * Проверка что результат успешный
   */
  isOk(): this is { value: TOk } {
    return this.success;
  }

  /**
   * Проверка что результат неудачный
   */
  isFail(): this is { value: TFail } {
    return !this.success;
  }

  /**
   * Получение значения положительного результата или дефолтное значение
   */
  unwrapOr(defaultValue: TOk): TOk {
    return this.isOk() ? this.value : defaultValue;
  }
}
