import { sql, redis } from 'bun';
import type { UserEntity } from '$src/repositories/entities';
import { CacheFor } from '$src/repositories/CacheFor';
import { type User, UserService } from '$src/models/User';

export abstract class UserRepository {
  /**
   * Общий ключ для записей пользователей
   */
  private static readonly USERS_KEY = 'users';

  /**
   * Получение пользователя по идентификатору
   */
  static async getUserById(id: UserEntity['id']): Promise<Maybe<User>> {
    const cacheKey = `getUserById(${id})`;
    const cached = redis.exists(cacheKey);
    const cachedUser = redis.get(cacheKey)

    if (await cached) {
      const user = await cachedUser;
      return user && JSON.parse(user);
    }

    const [userEntity = null] = await sql<UserEntity[]>`select id::int, name from users where id = ${id}`;
    const user = userEntity && UserService.new(userEntity.id, userEntity.name)

    redis.setex(cacheKey, CacheFor.ONE_HOUR, JSON.stringify(user));
    redis.sadd(UserRepository.USERS_KEY, cacheKey);

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
