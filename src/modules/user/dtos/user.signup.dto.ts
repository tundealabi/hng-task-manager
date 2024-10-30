import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { REGEX_PASSWORD } from '@/common/constants';

export class UserSignupDto {
  @IsEmail()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly username: string;
  @IsString()
  @Matches(REGEX_PASSWORD, {
    message:
      'Password must contain at least one number, one special character, one uppercase and lowercase letter, and at least 8 or more characters',
  })
  readonly password: string;
}
