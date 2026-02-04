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
  if (!validator.object<RegisterContract>(payload, 'Некорректный формат данных')) {
    return false;
  }

  if (validator.string(payload.email, 'Необходимо заполнить электронную почту')) {
    validator.max(payload.email.length, 128, 'Электронная почта должна быть короче 128 символов') &&
      validator.min(payload.email.length, 6, 'Электронная почта должна быть длиннее 6 символов') &&
      validator.matches(payload.email, /\S+@\S+\.\S+/, 'Некорректный формат электронной почты');
  }

  if (validator.string(payload.password, 'Необходимо заполнить пароль')) {
    validator.max(payload.password.length, 128, 'Пароль должен быть короче 128 символов') &&
      validator.min(payload.password.length, 6, 'Пароль должен быть длиннее 6 символов');
  }

  return validator.noErrors;
};

/**
 * Регистрация пользователя по электронной почте и паролю
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
  const payload = await request.json();
  const validator = new Validator();

  if (!validatePayload(validator, payload)) {
    return json(validator.errors, { status: 400 });
  }

  if (await UserRepository.existsByEmail(payload.email)) {
    return json(['Пользователь с данной электронной почтой уже существует'], { status: 400 });
  }

  const hashedPassword = await Bun.password.hash(payload.password, { algorithm: 'bcrypt', cost: 10 });

  const createdUser = await UserRepository.createUser(payload.email, hashedPassword);

  const jwtToken = TokenService.sign(createdUser.id.toString(), createdUser.email);

  CookieService.setJwtToken(cookies, jwtToken);

  return json(createdUser, { status: 201 });
};
