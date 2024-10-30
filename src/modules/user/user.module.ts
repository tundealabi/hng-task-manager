import { Module } from '@nestjs/common';

import { UserRepositoryModule } from './repository/user.repository.module';
import { UserService } from './services';

@Module({
  exports: [UserService],
  imports: [UserRepositoryModule],
  providers: [UserService],
})
export class UserModule {}
