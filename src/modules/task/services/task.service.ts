import { Injectable } from '@nestjs/common';

import { TaskCreateDto } from '../dtos';
import { TaskModel } from '../repository/schemas';
import { TaskRepository } from '../repository/task.repository';
import { convertToMongoId } from '@/database/helpers';

type CreateDto = TaskCreateDto & { createdBy: string };

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  // -------------------------------------------------------
  // CREATE TASK
  // -------------------------------------------------------

  async create(dto: CreateDto) {
    const createTask: Partial<TaskModel> = {
      ...dto,
      createdBy: convertToMongoId(dto.createdBy),
    };

    return this.taskRepository.create(createTask);
  }

  // -------------------------------------------------------
  // DELETE TASK
  // -------------------------------------------------------

  async deleteUserTask(userId: string, taskId: string) {
    return this.taskRepository.findOneAndDelete({
      _id: taskId,
      createdBy: userId,
    });
  }

  // -------------------------------------------------------
  // GET TASK BY ID
  // -------------------------------------------------------

  async getTask(taskId: string) {
    return this.taskRepository.findOne({ _id: taskId });
  }

  // -------------------------------------------------------
  // UPDATE TASK
  // -------------------------------------------------------

  async updateUserTask(
    userId: string,
    taskId: string,
    dto: Partial<CreateDto>,
  ) {
    return this.taskRepository.findOneAndUpdate(
      {
        _id: taskId,
        createdBy: userId,
      },
      { ...dto },
    );
  }
}
