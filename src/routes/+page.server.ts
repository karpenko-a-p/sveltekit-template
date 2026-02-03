import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { CookieService } from '$src/services/CookieService';
import { CityRepository } from '$src/repositories/CityRepository';
import { AppRoutes } from '$src/services/AppRoutes';

export const load: PageServerLoad = ({ cookies }) => {
  const city = CookieService.getCity(cookies);

  // Город существует и валидный
  if (city && CityRepository.getCitiesDict().has(city)) {
    redirect(303, AppRoutes.city(city));
  }

  CookieService.setCity(cookies, CityRepository.DEFAULT_CITY.code);
  redirect(303, AppRoutes.city(CityRepository.DEFAULT_CITY.code));
};
