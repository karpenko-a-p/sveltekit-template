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

  /**
   * Профиль пользователя
   */
  static profile(cityCode: string): string {
    return `/${cityCode}/profile`;
  }
}
