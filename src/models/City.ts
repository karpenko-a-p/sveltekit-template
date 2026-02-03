/**
 * Город
 */
export interface City {
  code: string;
  name: string;
}

/**
 * Сервис для городов
 */
export abstract class CityService {
  /**
   * Создание нового города
   */
  static new(code: string, name: string): City {
    return { code, name };
  }
}