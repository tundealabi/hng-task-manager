import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskModel, TaskSchema } from './schemas';
import { TaskRepository } from './task.repository';

@Module({
  controllers: [],
  exports: [TaskRepository],
  imports: [
    MongooseModule.forFeature([{ name: TaskModel.name, schema: TaskSchema }]),
  ],
  providers: [TaskRepository],
})
export class TaskRepositoryModule {}
