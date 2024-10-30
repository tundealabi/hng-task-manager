import { PickType } from '@nestjs/swagger';

import { UserSignupDto } from './user.signup.dto';

export class UserCreateDto extends PickType(UserSignupDto, [
  'email',
  'password',
  'username',
]) {}
