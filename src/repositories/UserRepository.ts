import { sql, redis } from 'bun';
import type { UserEntity } from '$src/repositories/entities';

export abstract class UserRepository {
  /**
   * Общий ключ для записей пользователей
   */
  private static readonly USERS_KEY = 'users';

  /**
   * Получение пользователя по идентификатору
   */
  static async getUserById(id: UserEntity['id']): Promise<Maybe<UserEntity>> {
    const cacheKey = `getUserById(${id})`;
    const cached = await redis.exists(cacheKey);

    if (cached) {
      const cachedUser = await redis.get(cacheKey);
      return cachedUser && JSON.parse(cachedUser);
    }

    const [user = null]: Maybe<UserEntity>[] = await sql`select * from users where id = ${id}`;

    redis.setex(cacheKey, 360, JSON.stringify(user));
    redis.sadd(cacheKey, UserRepository.USERS_KEY);

    return user;
  }

  /**
   * Обновление всех кэшей связанных с пользователями
   */
  static async invalidateUsers(): Promise<void> {
    const cachedTags = await redis.smembers(UserRepository.USERS_KEY);
    await redis.del(...cachedTags);
  }
}
