import type { PageServerLoad } from '$svelte-kit/[city]/profile/$types';
import { redirect } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';
import { TEMPORARY_REDIRECT } from '$src/utils/statuses';

export const ssr = false;

export const load: PageServerLoad = async ({ parent }) => {
  const layoutData = await parent();

  if (!layoutData.jwtToken) {
    redirect(TEMPORARY_REDIRECT, `/${layoutData.city.code}/auth`);
  }

  const user = await UserRepository.getUserById(Number(layoutData.jwtToken.id));

  if (!user) {
    redirect(TEMPORARY_REDIRECT, `/${layoutData.city.code}/auth`);
  }

  return user;
};
