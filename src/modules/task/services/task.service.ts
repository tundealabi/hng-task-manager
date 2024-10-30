import { Injectable } from '@nestjs/common';

import { TaskCreateDto } from '../dtos';
import { TaskModel } from '../repository/schemas';
import { TaskRepository } from '../repository/task.repository';
import { convertToMongoId } from '@/database/helpers';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async create(dto: TaskCreateDto & { createdBy: string }) {
    const createTask: Partial<TaskModel> = {
      ...dto,
      createdBy: convertToMongoId(dto.createdBy),
    };

    return this.taskRepository.create(createTask);
  }

  async findOneById(taskId: string) {
    return this.taskRepository.findOne({ _id: taskId });
  }
}
