import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { GetTasksQueryDto, TaskCreateDto, TaskUpdateDto } from '../dtos';
import { Task } from '../entities';
import { TaskService } from '../services';
import { controllerResponse } from '@/common/helpers';
import { GetDataFromRequestUser } from '@/modules/auth/decorators';
import { UserAuthJwtAuthGuard } from '@/modules/auth/guards';
import { UserService } from '@/modules/user/services';

@Controller()
@UseGuards(UserAuthJwtAuthGuard)
export class TaskController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  // -------------------------------------------------------
  // TASK CREATE
  // -------------------------------------------------------

  @Post()
  async create(
    @GetDataFromRequestUser('sub') userId: string,
    @Body()
    dto: TaskCreateDto,
  ) {
    if (dto.assignedTo) {
      const emailExists = await this.userService.isExistingEmail(
        dto.assignedTo,
      );
      if (!emailExists) {
        throw new NotFoundException('Email to assign does not exist');
      }
    }

    const newTask = await this.taskService.create({
      ...dto,
      createdBy: userId,
    });

    return controllerResponse<Pick<Task, '_id'>>({
      data: { _id: newTask._id.toHexString() },
      message: 'Task created successfully',
    });
  }

  // -------------------------------------------------------
  // GET TASK
  // -------------------------------------------------------

  @Get(':id')
  async getTask(@Param('id') taskId: string) {
    const task = await this.taskService.getTask(taskId);
    if (!task) {
      throw new NotFoundException('Task does not exist');
    }
    return controllerResponse<Task>({
      data: task,
    });
  }

  // -------------------------------------------------------
  // GET TASKS
  // -------------------------------------------------------

  @Get()
  async getTasks(@Query() dto: GetTasksQueryDto) {
    const tasks = await this.taskService.getTasks(dto);
    return controllerResponse<Task[]>({
      data: tasks,
      metadata: {
        count: tasks.length,
        cursor: tasks.length < dto.limit ? null : tasks.at(-1)._id,
      },
    });
  }

  // -------------------------------------------------------
  // TASK UPDATE
  // -------------------------------------------------------

  @Put(':id')
  async update(
    @GetDataFromRequestUser('sub') userId: string,
    @Param('id') taskId: string,
    @Body()
    dto: TaskUpdateDto,
  ) {
    if (dto.assignedTo) {
      const emailExists = await this.userService.isExistingEmail(
        dto.assignedTo,
      );
      if (!emailExists) {
        throw new NotFoundException('Email to assign does not exist');
      }
    }

    const updatedTask = await this.taskService.updateUserTask(
      userId,
      taskId,
      dto,
    );

    if (!updatedTask) {
      throw new ForbiddenException('You cannot delete this task');
    }

    return controllerResponse<Task>({
      data: updatedTask,
      message: 'Task updated successfully',
    });
  }

  // -------------------------------------------------------
  // DELETE USER TASK
  // -------------------------------------------------------

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @GetDataFromRequestUser('sub') userId: string,
    @Param('id') taskId: string,
  ) {
    const deletedTask = await this.taskService.deleteUserTask(userId, taskId);
    if (!deletedTask) {
      throw new NotFoundException('Task does not exist');
    }
  }
}
