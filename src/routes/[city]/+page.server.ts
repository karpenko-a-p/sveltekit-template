import type { PageServerLoad } from '$svelte-kit/[city]/$types';
import { CityRepository } from '$src/repositories/CityRepository';
import { UserActions } from '$src/actions/UserActions';

export const load: PageServerLoad = ({ params, cookies }) => {
  const city = CityRepository.getCitiesDict().get(params.city)!;
  const token = UserActions.parseJwtToken(cookies);

  return { city, token };
};
