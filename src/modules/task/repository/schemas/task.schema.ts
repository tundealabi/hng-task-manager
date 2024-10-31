import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

import { TaskPriority, TaskStatus } from '../../enums';
import { UserModel } from '@/modules/user/repository/schemas';

export type TaskDocument = HydratedDocument<TaskModel>;

@Schema({
  collection: 'tasks',
  timestamps: true,
})
export class TaskModel {
  @Prop({ auto: true, type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  assignedTo?: string;

  @Prop({ ref: UserModel.name, type: SchemaTypes.ObjectId })
  createdBy?: Types.ObjectId;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dueDate: string;

  @Prop({ enum: Object.values(TaskPriority), index: true })
  priority?: TaskPriority;

  @Prop({ enum: Object.values(TaskStatus), index: true, required: true })
  status: TaskStatus;

  @Prop({ lowercase: true, type: [String] })
  tags?: string[];

  @Prop({ required: true })
  title: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);

// Add compound indexes to optimize multi-field filtering queries. Watch your performance and update indexes as required
TaskSchema.index({ status: 1, priority: 1 });
TaskSchema.index({ status: 1, priority: 1, tags: 1 });
