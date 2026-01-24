import { type TokenPayload, TokenService } from '$src/services/TokenService';
import type { Cookies } from '@sveltejs/kit';
import { CookieService } from '$src/services/CookieService';

/**
 * Действия пользователя
 */
export abstract class UserActions {
  /**
   * Время до ревалидации токена
   */
  private static readonly JWT_REVALIDATION_2DAYS = 1000 * 60 * 60 * 24 * 2;

  /**
   * Получение данных токена
   */
  static parseJwtToken(cookies: Cookies): Maybe<TokenPayload> {
    const jwtToken = CookieService.getJwtToken(cookies);

    if (!jwtToken) return null;

    const tokenPayload = TokenService.parse(jwtToken);

    if (!tokenPayload) return null;

    // Обновление токена если ему осталось жить меньше 2-х дней
    if (tokenPayload.exp! <= Date.now() + UserActions.JWT_REVALIDATION_2DAYS) {
      const newJwtToken = TokenService.sign(tokenPayload.id, tokenPayload.email);
      CookieService.setJwtToken(cookies, newJwtToken);
    }

    return tokenPayload;
  }
}
