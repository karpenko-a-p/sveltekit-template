import type { PageServerLoad } from '$svelte-kit/[city]/$types';
import { CityRepository } from '$src/repositories/CityRepository';

export const load: PageServerLoad = ({ params, url }) => {
  return { city: CityRepository.getCitiesDict().get(params.city)!, url };
};
