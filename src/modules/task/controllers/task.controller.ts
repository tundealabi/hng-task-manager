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
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';

import { GetTasksQueryDto, TaskCreateDto, TaskUpdateDto } from '../dtos';
import { CreatedTask, Task } from '../entities';
import { TaskService } from '../services';
import { ApiPaginatedResponse, ApiResponse } from '@/common/decorators';
import { controllerResponse } from '@/common/helpers';
import { GetDataFromRequestUser } from '@/modules/auth/decorators';
import { UserAuthJwtAuthGuard } from '@/modules/auth/guards';
import { UserService } from '@/modules/user/services';

@Controller()
@UseGuards(UserAuthJwtAuthGuard)
@ApiTags('Task')
@ApiExtraModels(CreatedTask, Task)
export class TaskController {
  constructor(
    private readonly userService: UserService,
    private readonly taskService: TaskService,
  ) {}

  // -------------------------------------------------------
  // TASK CREATE
  // -------------------------------------------------------

  @Post()
  @ApiOperation({
    description: 'Usage - Create a task',
  })
  @ApiResponse(CreatedTask, HttpStatus.CREATED, {
    description: 'Returns the task id',
  })
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

    return controllerResponse<CreatedTask>({
      data: { _id: newTask._id.toHexString() },
      message: 'Task created successfully',
    });
  }

  // -------------------------------------------------------
  // GET TASK
  // -------------------------------------------------------
  @Get(':id')
  @ApiOperation({
    description: 'Usage - Get a task by the task id',
  })
  @ApiResponse(Task, HttpStatus.OK, {
    description: 'Returns the task',
  })
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
  @ApiOperation({
    description: 'Usage - Get all tasks',
  })
  @ApiPaginatedResponse(Task, {
    description: 'Returns the tasks',
  })
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
  @ApiOperation({
    description: 'Usage - Update a task by the task id',
  })
  @ApiResponse(Task, HttpStatus.OK, {
    description: 'Returns the updated task',
  })
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
      throw new ForbiddenException('You cannot update this task');
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
  @ApiOperation({
    description: 'Usage - Delete a task by the task id',
  })
  @ApiResponse(null, HttpStatus.NO_CONTENT, {
    description: 'Returns no content',
  })
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
