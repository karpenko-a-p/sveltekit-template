/**
 * Валидатор
 */
export class Validator {
  /**
   * Список ошибок
   */
  readonly errors: string[] = [];

  /**
   * Есть ли ошибки
   */
  get hasErrors(): boolean {
    return this.errors.length > 0;
  }

  /**
   * Нет ли ошибок
   */
  get noErrors(): boolean {
    return this.errors.length === 0;
  }

  /**
   * Очистка массива ошибок
   */
  clear(): void {
    this.errors.length = 0;
  }

  // ==========
  // Валидаторы с фиксацией ошибок
  // ==========

  check(condition: boolean, message: string): boolean {
    if (condition) return true;
    this.errors.push(message);
    return false;
  }

  object<TObj extends object>(value: unknown, message: string): value is TObj {
    return this.check(Validator.object(value), message);
  }

  array<TElement>(value: unknown, message: string): value is TElement[] {
    return this.check(Validator.array(value), message);
  }

  string(value: unknown, message: string): value is string {
    return this.check(Validator.string(value), message);
  }

  matches(value: string, pattern: RegExp, message: string): boolean {
    return this.check(Validator.matches(value, pattern), message);
  }

  number(value: unknown, message: string): value is number {
    return this.check(Validator.number(value), message);
  }

  integer(value: unknown, message: string): value is number {
    return this.check(Validator.integer(value), message);
  }

  min(value: number, min: number, message: string): boolean {
    return this.check(Validator.min(value, min), message);
  }

  max(value: number, max: number, message: string): boolean {
    return this.check(Validator.max(value, max), message);
  }

  // ==========
  // Статичные валидаторы с без фиксации ошибок
  // ==========

  static object<TObj extends object>(value: unknown): value is TObj {
    return Boolean(value && typeof value === 'object' && !Array.isArray(value));
  }

  static array<TElement>(value: unknown): value is TElement[] {
    return Boolean(value && typeof value === 'object' && Array.isArray(value));
  }

  static string(value: unknown): value is string {
    return typeof value === 'string';
  }

  static matches(value: string, pattern: RegExp): boolean {
    return pattern.test(value);
  }

  static number(value: unknown): value is number {
    return typeof value === 'number';
  }

  static integer(value: unknown): value is number {
    return Number.isInteger(value);
  }

  static min(value: number, min: number): boolean {
    return value >= min;
  }

  static max(value: number, max: number): boolean {
    return value <= max;
  }
}

/**
 * Функция валидатор (принимает валидатор и валидируемый объект)
 */
export type ValidatorFn<TPayload> = (validator: Validator, payload: unknown) => payload is TPayload;
