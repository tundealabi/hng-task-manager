import { AuthModule } from '@/modules/auth/auth.module';
import { UserAuthController } from '@/modules/user/controllers';
import { UserModule } from '@/modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserAuthController],
  exports: [],
  imports: [AuthModule, UserModule],
  providers: [],
})
export class RoutesAuthModule {}
