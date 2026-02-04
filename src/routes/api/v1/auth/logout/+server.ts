import { json, type RequestHandler } from '@sveltejs/kit';
import { CookieService } from '$src/services/CookieService';
import { OK } from '$src/utils/statuses';

export const POST: RequestHandler = ({ cookies }) => {
  CookieService.deleteJwtToken(cookies);
  return json(null, { status: OK });
};
