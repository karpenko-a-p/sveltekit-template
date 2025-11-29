import { sql } from 'bun';

interface IUserEntity {
  id: string;
  name: string;
}

export abstract class UserRepository {
  static async getUserById(id: string): Promise<Maybe<IUserEntity>> {
    const user: IUserEntity[] = await sql`select * from users where id = ${id}`;
    return user[0];
  }
}
