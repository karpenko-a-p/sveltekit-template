import type { PageServerLoad } from '$svelte-kit/[city]/profile/$types';
import { redirect } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';
import { TEMPORARY_REDIRECT } from '$src/utils/statuses';
import { CookieService } from '$src/services/CookieService';
import { Route } from '$src/utils/Route';

export const ssr = false;

/**
 * 1. Проверка, что пользователь авторизован, иначе редирект
 * 2. Если аккаунт не существует, очистка токена
 */
export const load: PageServerLoad = async ({ parent, cookies }) => {
  const { jwtToken, city } = await parent();

  // Проверка авторизации
  if (!jwtToken) {
    redirect(TEMPORARY_REDIRECT, Route.auth(city.code));
  }

  const user = await UserRepository.getUserById(Number(jwtToken.id));

  // Проверка, что пользователь существует
  if (!user) {
    CookieService.deleteJwtToken(cookies);
    redirect(TEMPORARY_REDIRECT, Route.auth(city.code));
  }

  return user;
};
