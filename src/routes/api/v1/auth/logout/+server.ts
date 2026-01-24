import { json, type RequestHandler } from '@sveltejs/kit';
import { CookieService } from '$src/services/CookieService';

export const POST: RequestHandler = ({ cookies }) => {
  CookieService.deleteJwtToken(cookies);
  return json(null, { status: 200 });
};
