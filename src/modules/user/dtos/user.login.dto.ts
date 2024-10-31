import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

import { UserSignupDto } from './user.signup.dto';

export class UserLoginDto extends PickType(UserSignupDto, ['email']) {
  @ApiProperty({
    example: 'abcd1234D!',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
