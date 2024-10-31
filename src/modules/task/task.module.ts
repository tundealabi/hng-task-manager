import { Module } from '@nestjs/common';

import { TaskRepositoryModule } from './repository/task.repository.module';
import { TaskService } from './services';

@Module({
  exports: [TaskService],
  imports: [TaskRepositoryModule],
  providers: [TaskService],
})
export class TaskModule {}
