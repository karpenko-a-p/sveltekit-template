import type { Cookies } from '@sveltejs/kit';

/**
 * Сервис для работы с куками
 */
export abstract class CookieService {
  /**
   * Наименование JWT куки
   */
  private static readonly JWT_COOKIE_NAME = 'JWT';

  /**
   * Путь куки
   */
  private static readonly JWT_COOKIE_PATH = '/';

  /**
   * Дни жизни токена
   */
  private static readonly JWT_LIFETIME_7DAYS = 1000 * 60 * 60 * 24 * 7;

  /**
   * Наименование куки с городом
   */
  private static readonly CITY_COOKIE_NAME = 'city';

  /**
   * Дни жизни куки города
   */
  private static readonly CITY_LIFETIME_365DAYS = 1000 * 60 * 60 * 24 * 365;

  /**
   * Установка токена в куки
   */
  static setJwtToken(cookies: Cookies, token: string): void {
    cookies.set(CookieService.JWT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      path: CookieService.JWT_COOKIE_PATH,
      expires: new Date(Date.now() + CookieService.JWT_LIFETIME_7DAYS)
    });
  }

  /**
   * Получение токена из куки
   */
  static getJwtToken(cookies: Cookies): Maybe<string> {
    return cookies.get(CookieService.JWT_COOKIE_NAME);
  }

  /**
   * Удаление токена из куки
   */
  static deleteJwtToken(cookies: Cookies): void {
    cookies.delete(CookieService.JWT_COOKIE_NAME, { path: CookieService.JWT_COOKIE_PATH });
  }

  /**
   * Получение города из куки
   */
  static getCity(cookies: Cookies): Maybe<string> {
    return cookies.get(CookieService.CITY_COOKIE_NAME);
  }

  /**
   * Установка города в куки
   */
  static setCity(cookies: Cookies, city: string): void {
    cookies.set(CookieService.CITY_COOKIE_NAME, city, {
      httpOnly: true,
      secure: true,
      path: '/',
      expires: new Date(Date.now() + CookieService.CITY_LIFETIME_365DAYS)
    });
  }
}
