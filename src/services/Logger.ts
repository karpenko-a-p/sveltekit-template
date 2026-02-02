/**
 * Логирование
 */
export abstract class Logger {
  /**
   * Время лога
   */
  private static get timestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Простой лог
   */
  static log(...args: unknown[]): void {
    console.log(`LOG [${this.timestamp}]:`, ...args);
  }

  /**
   * Информационный лог
   */
  static info(...args: unknown[]): void {
    console.log(`INFO [${this.timestamp}]:`, ...args);
  }

  /**
   * Предупреждающий лог
   */
  static warn(...args: unknown[]): void {
    console.log(`WARN [${this.timestamp}]:`, ...args);
  }

  /**
   * Лог ошибки
   */
  static error(...args: unknown[]): void {
    console.log(`ERROR [${this.timestamp}]:`, ...args);
  }

  /**
   * Критический лог
   */
  static critical(...args: unknown[]): void {
    console.log(`CRITICAL [${this.timestamp}]:`, ...args);
  }
}
