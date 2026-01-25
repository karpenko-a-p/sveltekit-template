import type { PageServerLoad } from '$svelte-kit/profile/$types';
import { UserActions } from '$src/actions/UserActions';
import { redirect } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = UserActions.parseJwtToken(cookies);

  if (!token) redirect(303, '/');

  const user = await UserRepository.getUserById(Number(token.id));

  if (!user) redirect(303, '/');

  return user;
};
