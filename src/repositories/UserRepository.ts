import { sql, redis } from 'bun';
import type { IUserEntity } from '$src/repositories/entities';

export abstract class UserRepository {
  private static readonly USERS_TAG = 't-users';

  static async getUserById(id: IUserEntity['id']): Promise<Maybe<IUserEntity>> {
    const cacheKey = `user:${id}`;
    const cached = await redis.exists(cacheKey);

    if (cached) {
      const cachedUser = await redis.get(cacheKey);
      return cachedUser && JSON.parse(cachedUser);
    }

    const [user]: IUserEntity[] = await sql`select * from users where id = ${id}`;

    redis.setex(cacheKey, 360, JSON.stringify(user));
    redis.sadd(cacheKey, UserRepository.USERS_TAG);

    return user;
  }
}
