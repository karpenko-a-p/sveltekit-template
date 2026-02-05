import type { LayoutServerLoad } from '$svelte-kit/[city]/$types';
import { CookieService } from '$src/services/CookieService';
import { CityRepository } from '$src/repositories/CityRepository';
import { redirect } from '@sveltejs/kit';
import { Route } from '$src/utils/Route';
import { UserActions } from '$src/actions/UserActions';
import { TEMPORARY_REDIRECT } from '$src/utils/statuses';

/**
 * 1. Чтение города из пути запроса /[city] и синхронизация с куками
 * 2. Получение основных данных для каждого запроса
 */
export const load: LayoutServerLoad = ({ params, cookies }) => {
  const citiesDict =  CityRepository.getCitiesDict();

  // Редирект если город в пути запроса не валиден
  if (!citiesDict.has(params.city)) {
    const city = CookieService.getCity(cookies);

    // Город полученный из куки существует и валидный
    if (city && citiesDict.has(city)) {
      redirect(TEMPORARY_REDIRECT, Route.city(city));
    }

    redirect(TEMPORARY_REDIRECT, Route.city(CityRepository.DEFAULT_CITY.code));
  }

  const cookieCity = CookieService.getCity(cookies);

  // Установка города в куки если не указан или не соответствует городу из пути
  if (!cookieCity || cookieCity !== params.city) {
    CookieService.setCity(cookies, params.city);
  }

  // Получение основных данных для каждого запроса
  const city = citiesDict.get(params.city)!;
  const jwtToken = UserActions.parseJwtToken(cookies);

  return { city, jwtToken };
};
