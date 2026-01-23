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
   * Установка токена в куки
   */
  static setJwtToken(cookies: Cookies, token: string): void {
    cookies.set(CookieService.JWT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      path: CookieService.JWT_COOKIE_PATH,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
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
}
