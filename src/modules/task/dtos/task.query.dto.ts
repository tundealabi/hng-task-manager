import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { API_PAGE_LIMIT } from '@/common/constants';
import { TaskPriority, TaskStatus } from '../enums';

export class GetTasksQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform((p) => {
    if (!p.value) {
      return API_PAGE_LIMIT;
    }
    // console.log('p.value', p.value);
    const limitToNumber = Number(p.value);

    // if (Number.isInteger(limitToNumber) && limitToNumber < API_PAGE_LIMIT) {
    //   return limitToNumber;
    // }

    return limitToNumber < API_PAGE_LIMIT ? limitToNumber : API_PAGE_LIMIT;
  })
  limit: number;

  @IsOptional()
  @IsString()
  cursor?: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  readonly priority?: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  readonly status?: TaskStatus;
}
