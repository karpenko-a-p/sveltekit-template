import type { PageServerLoad } from '$svelte-kit/[city]/profile/$types';
import { redirect } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';

export const load : PageServerLoad = async ({ parent }) => {
  const layoutData = await parent();

  if (!layoutData.jwtToken) {
    redirect(303, `/${layoutData.city.code}/auth`);
  }

  const user = await UserRepository.getUserById(Number(layoutData.jwtToken.id));

  if (!user) {
    redirect(303, `/${layoutData.city.code}/auth`);
  }

  return user;
}