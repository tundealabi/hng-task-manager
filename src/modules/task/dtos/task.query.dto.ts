import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsMongoId, IsNumber, IsOptional } from 'class-validator';

import { API_PAGE_LIMIT } from '@/common/constants';
import { TaskPriority, TaskStatus } from '../enums';

export class GetTasksQueryDto {
  @ApiProperty({
    example: 5,
    required: false,
    type: 'integer',
  })
  @IsOptional()
  @IsNumber()
  @Transform((p) => {
    if (!p.value) {
      return API_PAGE_LIMIT;
    }
    const limitToNumber = Number(p.value);
    return limitToNumber < API_PAGE_LIMIT ? limitToNumber : API_PAGE_LIMIT;
  })
  limit = API_PAGE_LIMIT;

  @IsOptional()
  @IsMongoId()
  cursor?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  readonly priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;
}
