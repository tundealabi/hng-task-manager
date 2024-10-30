import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

import { TaskPriority, TaskStatus } from '../enums';

export class TaskCreateDto {
  @IsOptional()
  @IsEmail()
  readonly assignedTo?: string;

  @IsString()
  @MinLength(10)
  readonly description: string;

  @IsDateString()
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
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  readonly tags?: string[];

  @IsString()
  @MinLength(5)
  readonly title: string;
}