export abstract class CacheFor {
  static readonly ONE_MINUTE = CacheFor.minutes(1);
  static readonly FIFTEEN_MINUTES = CacheFor.minutes(15);
  static readonly THIRTY_MINUTES = CacheFor.minutes(30);
  static readonly ONE_HOUR = CacheFor.hours(1);
  static readonly THREE_HOURS = CacheFor.hours(1);
  static readonly SIX_HOURS = CacheFor.hours(1);
  static readonly ONE_DAY = CacheFor.days(1);

  /**
   * Кэширование на минуты
   */
  static minutes(minutes: number): number {
    return 60 * minutes;
  }

  /**
   * Кэширование на часы
   */
  static hours(hours: number): number {
    return this.minutes(60) * hours;
  }

  /**
   * Кэширование на дни
   */
  static days(days: number): number {
    return this.hours(24) * days;
  }
}
