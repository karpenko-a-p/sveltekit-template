/**
 * Роуты приложения
 */
export abstract class AppRoutes {
  /**
   * Корень приложения
   */
  static root(): string {
    return '/';
  }

  /**
   * Выбранный город
   */
  static city(cityCode: string): string {
    return `/${cityCode}`;
  }
}
