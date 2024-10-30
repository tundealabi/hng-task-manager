import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services';
import { UserAuthJwtStrategy } from './strategies';

@Module({
  exports: [AuthService],
  imports: [JwtModule],
  providers: [AuthService, UserAuthJwtStrategy],
})
export class AuthModule {}
