import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { CookieService } from '$src/services/CookieService';
import { CityRepository } from '$src/repositories/CityRepository';
import { AppRoutes } from '$src/services/AppRoutes';
import { TEMPORARY_REDIRECT } from '$src/utils/statuses';

/**
 * Сюда попадаем если пользователь зашел в корень приложения "/"
 * Редиректим на город
 */
export const load: PageServerLoad = ({ cookies }) => {
  const city = CookieService.getCity(cookies);

  // Город полученный из куки существует и валидный
  if (city && CityRepository.getCitiesDict().has(city)) {
    redirect(TEMPORARY_REDIRECT, AppRoutes.city(city));
  }

  // Город неизвестен (возможно пользователь впервые на портале), редиректим на дефолтный город
  CookieService.setCity(cookies, CityRepository.DEFAULT_CITY.code);
  redirect(TEMPORARY_REDIRECT, AppRoutes.city(CityRepository.DEFAULT_CITY.code));
};
