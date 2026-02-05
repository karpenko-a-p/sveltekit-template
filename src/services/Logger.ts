import { dev } from '$app/environment';

/**
 * Логирование
 */
export abstract class Logger {
  /**
   * Создание сообщения (лога)
   */
  private static message(type: string, args: unknown[]): void {
    if (dev) {
      console.log(`${new Date().toISOString()} ${process.pid} ${type}`, ...args);
    }
  }

  /**
   * Простой лог
   */
  static log(...args: unknown[]): void {
    Logger.message('LOG', args);
  }

  /**
   * Информационный лог
   */
  static info(...args: unknown[]): void {
    Logger.message('INFO', args);
  }

  /**
   * Предупреждающий лог
   */
  static warn(...args: unknown[]): void {
    Logger.message('WARN', args);
  }

  /**
   * Лог ошибки
   */
  static error(...args: unknown[]): void {
    Logger.message('ERROR', args);
  }

  /**
   * Критический лог
   */
  static critical(...args: unknown[]): void {
    Logger.message('CRITICAL', args);
  }
}
