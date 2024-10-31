import { OmitType } from '@nestjs/swagger';

import { TaskModel } from '../repository/schemas';
import { UserModel } from '@/modules/user/repository/schemas';

export class Task extends OmitType(TaskModel, ['createdBy']) {
  createdBy?: Pick<UserModel, 'email' | 'username'>;
}
