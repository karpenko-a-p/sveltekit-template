import { json, type RequestHandler } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';
import { TokenService } from '$src/services/TokenService';
import { CookieService } from '$src/services/CookieService';
import { Validator, type ValidatorFn } from '$src/utils/Validator';

interface LoginContract {
  email: string;
  password: string;
}

const validatePayload: ValidatorFn<LoginContract> = (validator, payload): payload is LoginContract => {
  if (!validator.object<LoginContract>(payload, 'Invalid payload')) {
    return false;
  }

  if (validator.string(payload.email, 'Email must be string')) {
    validator.max(payload.email.length, 128, 'Email must be shorter then 128') &&
      validator.min(payload.email.length, 6, 'Email must be longer then 6');
  }

  if (validator.string(payload.password, 'Password must be string')) {
    validator.max(payload.password.length, 128, 'Password must be shorter then 128') &&
      validator.min(payload.password.length, 6, 'Password must be longer then 6');
  }

  return validator.noErrors;
};

export const POST: RequestHandler = async ({ request, cookies }) => {
  const payload = await request.json();
  const validator = new Validator();

  if (!validatePayload(validator, payload)) {
    return json({ message: 'Validation error', errors: validator.errors }, { status: 400 });
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
