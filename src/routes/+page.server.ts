import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
  return { url };
};
