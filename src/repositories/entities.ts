export interface UserEntity {
  id: number;
  email: string;
  password: string;
}

export interface MediaEntity {
  id: number;
  filename: string;
}

export interface CityEntity {
  code: string;
  name: string;
}