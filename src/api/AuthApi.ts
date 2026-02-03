/**
 * API для авторизации
 */
export abstract class AuthApi {
  /**
   * Регистрация
   */
  static async register(email: string, password: string): Promise<void> {
    console.log('register', email, password);
  }

  /**
   * Авторизация
   */
  static async login(email: string, password: string): Promise<void> {
    console.log('login', email, password);
  }
}