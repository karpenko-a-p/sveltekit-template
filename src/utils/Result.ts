/**
 * Result
 * Имплементация резалт паттерна
 */
export class Res<TOk, TErr> {
  /**
   * Success
   */
  static ok<TOk, TErr>(value: TOk): Res<TOk, TErr> {
    return new Res<TOk, TErr>(true, value);
  }

  /**
   * Failure
   */
  static err<TOk, TErr>(value: TErr): Res<TOk, TErr> {
    return new Res<TOk, TErr>(false, value);
  }

  private constructor(
    private readonly success: boolean,
    readonly value: TOk | TErr
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
  isErr(): this is { value: TErr } {
    return !this.success;
  }

  /**
   * Получение значения положительного результата или дефолтное значение
   */
  unwrapOr(defaultValue: TOk): TOk {
    return this.isOk() ? this.value : defaultValue;
  }
}
