import { json, type RequestHandler } from '@sveltejs/kit';
import { UserRepository } from '$src/repositories/UserRepository';
import { TokenService } from '$src/services/TokenService';

interface RegisterContract {
  email: string;
  password: string;
}

function validatePayload(payload: unknown): payload is RegisterContract {
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

  if (await UserRepository.existsByEmail(payload.email)) {
    return json('User already exists', { status: 400 });
  }

  const hashedPassword = await Bun.password.hash(payload.password, { algorithm: 'bcrypt', cost: 10 });

  const createdUser = await UserRepository.createUser(payload.email, hashedPassword);

  const jwtToken = TokenService.sign(createdUser.id.toString(), createdUser.email);

  cookies.set('JWT', jwtToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
  });

  return json(createdUser, { status: 201 });
};
