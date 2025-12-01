import { sql } from 'bun';
import type { IUserEntity } from '$src/repositories/entities';

export abstract class UserRepository {
  static async getUserById(id: IUserEntity['id']): Promise<Maybe<IUserEntity>> {
    const users: IUserEntity[] = await sql`select * from users where id = ${id}`;
    console.log(users);
    return users[0];
  }
}
