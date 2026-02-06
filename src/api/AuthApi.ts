import { Res } from '$src/utils/Result';
import { BAD_REQUEST } from '$src/utils/statuses';

/**
 * API для авторизации
 */
export abstract class AuthApi {
  /**
   * Регистрация
   */
  static async register(email: string, password: string): Promise<Res<null, string[]>> {
    const body = JSON.stringify({ email, password });
    const response = await fetch('/api/v1/auth/register', { method: 'POST', body });

    if (response.ok) {
      return Res.ok(null);
    }

    if (response.status === BAD_REQUEST) {
      const errors: string[] = await response.json();
      return Res.err(errors);
    }

    return Res.err([]);
  }

  /**
   * Авторизация
   */
  static async login(email: string, password: string): Promise<Res<null, string[]>> {
    const body = JSON.stringify({ email, password });
    const response = await fetch('/api/v1/auth/login', { method: 'POST', body });

    if (response.ok) {
      return Res.ok(null);
    }

    if (response.status === BAD_REQUEST) {
      const errors: string[] = await response.json();
      return Res.err(errors);
    }

    return Res.err([]);
  }

  /**
   * Выход из профиля
   */
  static async logout(): Promise<Res<null, null>> {
    const response = await fetch('/api/v1/auth/logout', { method: 'POST' });
    return response.ok ? Res.ok(null) : Res.err(null);
  }
}
