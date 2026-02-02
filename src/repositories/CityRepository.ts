import type { CityEntity } from '$src/repositories/entities';
import { sql } from 'bun';
import { type City, CityService } from '$src/models/City.ts';

// Получение списка всех городов при старте приложения
const cityEntities = await sql<CityEntity[]>`select id, name from cities`;
const cities = cityEntities.map((entity) => CityService.new(entity.id, entity.name));
const citiesDict = new Map<string, City>(cities.map((city) => [city.id, city]));

/**
 * Репозиторий для работы с городами
 */
export abstract class CityRepository {
  /**
   * In-memory кэш потому что города фиг когда обновятся
   */
  private static readonly citiesCached: readonly Readonly<CityEntity>[] = cities;

  /**
   * In-memory аналогично
   */
  private static readonly citiesDictCached: ReadonlyMap<string, Readonly<City>> = citiesDict;

  /**
   * Дефолтный город
   */
  static readonly DEFAULT_CITY = citiesDict.get('msk')!;

  /**
   * Получение списка городов
   */
  static getCities(): typeof CityRepository.citiesCached {
    return CityRepository.citiesCached;
  }

  /**
   * Получение словаря городов
   */
  static getCitiesDict(): typeof CityRepository.citiesDictCached {
    return CityRepository.citiesDictCached;
  }
}
