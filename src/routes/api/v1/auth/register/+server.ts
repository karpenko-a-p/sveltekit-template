import { json, type RequestHandler } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';
import { TokenService } from '$src/services/TokenService';
import { CookieService } from '$src/services/CookieService';
import { Validator, type ValidatorFn } from '$src/utils/Validator';

interface RegisterContract {
  email: string;
  password: string;
}

const validatePayload: ValidatorFn<RegisterContract> = (validator, payload): payload is RegisterContract => {
  if (!validator.object<RegisterContract>(payload, 'Invalid payload')) {
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

  if (await UserRepository.existsByEmail(payload.email)) {
    return json('User already exists', { status: 400 });
  }

  const hashedPassword = await Bun.password.hash(payload.password, { algorithm: 'bcrypt', cost: 10 });

  const createdUser = await UserRepository.createUser(payload.email, hashedPassword);

  const jwtToken = TokenService.sign(createdUser.id.toString(), createdUser.email);

  CookieService.setJwtToken(cookies, jwtToken);

  return json(createdUser, { status: 201 });
};
