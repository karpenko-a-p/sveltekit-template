import { json, type RequestHandler } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';
import { TokenService } from '$src/services/TokenService';
import { CookieService } from '$src/services/CookieService';
import { Validator, type ValidatorFn } from '$src/utils/Validator';
import { BAD_REQUEST, NOT_FOUND, OK } from '$src/utils/statuses';

interface LoginContract {
  email: string;
  password: string;
}

const validatePayload: ValidatorFn<LoginContract> = (validator, payload): payload is LoginContract => {
  if (!validator.object<LoginContract>(payload, 'Некорректный формат данных')) {
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
 * Авторизация пользователя по электронной почте и паролю
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
  const payload = await request.json();
  const validator = new Validator();

  if (!validatePayload(validator, payload)) {
    return json(validator.errors, { status: BAD_REQUEST });
  }

  const user = await UserRepository.getUserByEmail(payload.email);

  if (!user) {
    return json(['Неверный адрес электронной почты или пароль'], { status: NOT_FOUND });
  }

  const userHashedPassword = await UserRepository.getUserPasswordById(user.id);

  if (!userHashedPassword || !(await Bun.password.verify(payload.password, userHashedPassword, 'bcrypt'))) {
    return json(['Неверный адрес электронной почты или пароль'], { status: NOT_FOUND });
  }

  const jwtToken = TokenService.sign(user.id.toString(), user.email);

  CookieService.setJwtToken(cookies, jwtToken);

  return json(user, { status: OK });
};
