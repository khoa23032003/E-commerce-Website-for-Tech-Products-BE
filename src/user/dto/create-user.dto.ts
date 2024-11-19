import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  email: string;

  password: string;

  name: string;
  refresh_token: string;
}
