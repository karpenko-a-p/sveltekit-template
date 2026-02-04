import { Result } from '$src/utils/Result';

/**
 * API для авторизации
 */
export abstract class AuthApi {
  /**
   * Регистрация
   */
  static async register(email: string, password: string): Promise<Result<null, string[]>> {
    const body = JSON.stringify({ email, password });
    const response = await fetch('/api/v1/auth/register', { method: 'POST', body });

    if (response.ok) {
      return Result.ok(null);
    }

    if (response.status === 400) {
      const errors: string[] = await response.json();
      return Result.fail(errors);
    }

    return Result.fail([]);
  }

  /**
   * Авторизация
   */
  static async login(email: string, password: string): Promise<Result<null, string[]>> {
    const body = JSON.stringify({ email, password });
    const response = await fetch('/api/v1/auth/login', { method: 'POST', body });

    if (response.ok) {
      return Result.ok(null);
    }

    if (response.status === 400) {
      const errors: string[] = await response.json();
      return Result.fail(errors);
    }

    return Result.fail([]);
  }
}
