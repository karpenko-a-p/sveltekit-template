import { json, type RequestHandler } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';
import { TokenService } from '$src/services/TokenService';
import { CookieService } from '$src/services/CookieService';

interface LoginContract {
  email: string;
  password: string;
}

function validatePayload(payload: unknown): payload is LoginContract {
  return Boolean(
    payload &&
    typeof payload === 'object' &&
    'email' in payload &&
    typeof payload.email === 'string' &&
    'password' in payload &&
    typeof payload.password === 'string'
  );
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  const payload = await request.json();

  if (!validatePayload(payload)) {
    return json('Validation error', { status: 400 });
  }

  const user = await UserRepository.getUserByEmail(payload.email);

  if (!user) {
    return json('Invalid email or password', { status: 404 });
  }

  const userHashedPassword = await UserRepository.getUserPasswordById(user.id);

  if (!userHashedPassword || !(await Bun.password.verify(payload.password, userHashedPassword, 'bcrypt'))) {
    return json('Invalid email or password', { status: 404 });
  }

  const jwtToken = TokenService.sign(user.id.toString(), user.email);

  CookieService.setJwtToken(cookies, jwtToken);

  return json(user, { status: 200 });
};
