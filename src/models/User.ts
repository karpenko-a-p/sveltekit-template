export interface User {
  id: number;
  email: string;
}

export abstract class UserService {
  static new(id = 0, email = ''): User {
    return { id, email };
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
      'email' in user &&
      typeof user.email === 'string'
    );
  }
}
