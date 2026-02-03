import type { LayoutServerLoad } from '$svelte-kit/[city]/$types';
import { CookieService } from '$src/services/CookieService';
import { CityRepository } from '$src/repositories/CityRepository';
import { redirect } from '@sveltejs/kit';
import { AppRoutes } from '$src/services/AppRoutes';

/**
 * Чтение города из пути запроса /[city]
 * и синхронизация с куками
 */
export const load: LayoutServerLoad = ({ params, cookies }) => {
  // Редирект если город в пути запроса не валиден
  if (!CityRepository.getCitiesDict().has(params.city)) {
    const city = CookieService.getCity(cookies);

    // Город полученный из куки существует и валидный
    if (city && CityRepository.getCitiesDict().has(city)) {
      redirect(303, AppRoutes.city(city));
    }

    redirect(303, AppRoutes.city(CityRepository.DEFAULT_CITY.code));
  }

  const cookieCity = CookieService.getCity(cookies);

  // Установка города в куки если не указан или не соответствует городу из пути
  if (!cookieCity || cookieCity !== params.city) {
    CookieService.setCity(cookies, params.city);
  }
};
