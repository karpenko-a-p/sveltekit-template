/**
 * Город
 */
export interface City {
  id: string;
  name: string;
}

/**
 * Сервис для городов
 */
export abstract class CityService {
  /**
   * Создание нового города
   */
  static new(id: string, name: string): City {
    return { id, name };
  }
}