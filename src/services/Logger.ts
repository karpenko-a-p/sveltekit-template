export abstract class Logger {
  private static get timestamp() {
    return new Date().toISOString();
  }

  static log(...args: unknown[]): void {
    console.log(`LOG [${this.timestamp}]:`, ...args);
  }

  static info(...args: unknown[]): void {
    console.log(`INFO [${this.timestamp}]:`, ...args);
  }

  static warn(...args: unknown[]): void {
    console.log(`WARN [${this.timestamp}]:`, ...args);
  }

  static error(...args: unknown[]): void {
    console.log(`ERROR [${this.timestamp}]:`, ...args);
  }

  static critical(...args: unknown[]): void {
    console.log(`CRITICAL [${this.timestamp}]:`, ...args);
  }
}