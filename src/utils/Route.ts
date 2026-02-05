/**
 * Роуты приложения
 */
export abstract class Route {
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
   * Авторизация
   */
  static auth(cityCode: string): string {
    return `/${cityCode}/auth`;
  }

  /**
   * Профиль пользователя
   */
  static profile(cityCode: string): string {
    return `/${cityCode}/profile`;
  }
}
