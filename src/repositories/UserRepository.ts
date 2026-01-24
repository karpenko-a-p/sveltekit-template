import { sql, redis } from 'bun';
import type { UserEntity } from '$src/repositories/entities';
import { CacheFor } from '$src/repositories/CacheFor';
import { type User, UserService } from '$src/models/User';

/**
 * Репозиторий для пользователя
 */
export abstract class UserRepository {
  /**
   * Общий ключ для записей пользователей
   */
  private static readonly USERS_KEY = 'users';

  /**
   * Проверка существования по email
   */
  static async existsByEmail(email: User['email']): Promise<boolean> {
    const [firstRow] = await sql<Array<{ exists: boolean }>>`select 1::bool as exists from users where email = ${email}`;
    return Boolean(firstRow?.exists);
  }

  /**
   * Создание пользователя
   */
  static async createUser(email: string, password: string): Promise<User> {
    const [userEntity] = await sql<UserEntity[]>`
      insert into users (email, password)
      values (${email}, ${password})
      returning id, email;
    `;

    return UserService.new(userEntity.id, userEntity.email);
  }

  /**
   * Получение пользователя по идентификатору
   */
  static async getUserById(id: User['id']): Promise<Maybe<User>> {
    const cacheKey = `getUserById(${id})`;
    const cached = redis.exists(cacheKey);
    const cachedUser = redis.get(cacheKey);

    if (await cached) {
      const user = await cachedUser;
      return user && JSON.parse(user);
    }

    const [userEntity = null] = await sql<UserEntity[]>`select id::int, email from users where id = ${id}`;
    const user = userEntity && UserService.new(userEntity.id, userEntity.email);

    redis.setex(cacheKey, CacheFor.ONE_HOUR, JSON.stringify(user));
    redis.sadd(UserRepository.USERS_KEY, cacheKey);

    return user;
  }

  /**
   * Получение пользователя по email
   */
  static async getUserByEmail(email: User['email']): Promise<Maybe<User>> {
    const [userEntity = null] = await sql<UserEntity[]>`select id::int, email from users where email = ${email}`;
    return userEntity && UserService.new(userEntity.id, userEntity.email);
  }

  /**
   * Получение хэшированного пароля пользователя
   */
  static async getUserPasswordById(id: User['id']): Promise<Maybe<string>> {
    const [firstRow] = await sql<Array<{ password: string }>>`select password from users where id = ${id}`;
    return firstRow?.password ?? null;
  }

  /**
   * Обновление всех кэшей связанных с пользователями
   */
  static async invalidateUsers(): Promise<void> {
    const cachedTags = await redis.smembers(UserRepository.USERS_KEY);
    await redis.del(...cachedTags);
  }
}
