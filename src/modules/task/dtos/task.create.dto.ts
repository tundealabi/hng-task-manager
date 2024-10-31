import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { IsValidDueDate } from '../decorators';
import { TaskPriority, TaskStatus } from '../enums';

export class TaskCreateDto {
  @IsOptional()
  @IsEmail()
  readonly assignedTo?: string;

  @IsString()
  @MinLength(10)
  readonly description: string;

  @ApiProperty({
    example: '2025-12-22',
  })
  @IsValidDueDate()
  readonly dueDate: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  readonly priority?: TaskPriority;

  @IsEnum(TaskStatus)
  readonly status: TaskStatus;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true, message: 'tags must be an array of strings' })
  @IsNotEmpty({ each: true })
  readonly tags?: string[];

  @IsString()
  @MinLength(5)
  readonly title: string;
}
