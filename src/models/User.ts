export interface User {
  id: number;
  name: string;
}

export abstract class UserService {
  static new(id = 0, name = ''): User {
    return { id, name };
  }

  static from(user: User): User {
    return { id: user.id, name: user.name };
  }

  static isUser(user: unknown): boolean {
    return Boolean(
      user &&
      typeof user === 'object' &&
      'id' in user &&
      typeof user.id === 'number' &&
      'name' in user &&
      typeof user.name === 'string'
    );
  }
}
