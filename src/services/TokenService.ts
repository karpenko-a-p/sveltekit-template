import { JWT_SECRET } from '$env/static/private';
import { default as jwt, type JwtPayload, type SignOptions } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
  id: string;
  login: string;
}

export abstract class TokenService {
  private static readonly SIGN_OPTIONS: Readonly<SignOptions> = {
    expiresIn: '7Days',
    issuer: 'Me',
    audience: 'http://for.me'
  };

  static parse(token: string): Maybe<TokenPayload> {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  }

  static sign(payload: Pick<TokenPayload, 'id' | 'login'>): string {
    return jwt.sign(payload, JWT_SECRET, TokenService.SIGN_OPTIONS);
  }
}
