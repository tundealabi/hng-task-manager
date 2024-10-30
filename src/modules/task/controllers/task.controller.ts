import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';

import { TaskCreateDto } from '../dtos';
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

    return controllerResponse<any>({
      data: newTask,
    });
  }
}
