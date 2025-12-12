export interface User {
  id: number;
  name: string;
}

export abstract class UserService {
  static new(id = 0, name = ''): User {
    return { id, name };
  }

  static from(user: User): User {
    return { ...user };
  }

  static isUser(user: unknown): user is User {
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
