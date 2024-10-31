import { Module } from '@nestjs/common';

import { TaskController } from '@/modules/task/controllers';
import { TaskModule } from '@/modules/task/task.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  controllers: [TaskController],
  exports: [],
  imports: [TaskModule, UserModule],
  providers: [],
})
export class RoutesTaskModule {}
