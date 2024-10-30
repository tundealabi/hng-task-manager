import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TaskDocument, TaskModel } from './schemas';
import { EntityRepository } from '@/database/entity.repository';

@Injectable()
export class TaskRepository extends EntityRepository<TaskDocument> {
  constructor(
    @InjectModel(TaskModel.name) private taskModel: Model<TaskDocument>,
  ) {
    super(taskModel);
  }
}
