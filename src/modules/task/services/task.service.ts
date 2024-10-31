import { Injectable } from '@nestjs/common';

import { GetTasksQueryDto, TaskCreateDto } from '../dtos';
import { Task } from '../entities';
import { TaskModel } from '../repository/schemas';
import { TaskRepository } from '../repository/task.repository';
import { convertToMongoId } from '@/database/helpers';

type CreateDto = TaskCreateDto & { createdBy: string };

const populate = {
  path: 'createdBy',
  select: ['email', 'username', '-_id'],
};

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
    const result = await this.taskRepository.findOne(
      { _id: taskId },
      {},
      {
        populate,
      },
    );
    return result.toObject<Task>();
  }

  // -------------------------------------------------------
  // GET TASKS
  // -------------------------------------------------------

  async getTasks({ cursor, limit, ...dto }: GetTasksQueryDto) {
    const filters: { _id?: { $gt: string } } & typeof dto = { ...dto };
    if (cursor) filters._id = { $gt: cursor };
    const result = await this.taskRepository.find(
      filters,
      {},
      {
        limit,
        populate,
      },
    );
    return result.map((item) => item.toObject<Task>());
  }

  // -------------------------------------------------------
  // UPDATE TASK
  // -------------------------------------------------------

  async updateUserTask(
    userId: string,
    taskId: string,
    dto: Partial<CreateDto>,
  ) {
    const result = await this.taskRepository.findOneAndUpdate(
      {
        _id: taskId,
        createdBy: userId,
      },
      { ...dto },
      {},
      {
        populate,
      },
    );
    return result.toObject<Task>();
  }
}
