import { TaskPriority, TaskStatus } from '../enums';

export class Task {
  _id: string;
  assignedTo?: string;
  createdBy: { email: string; username: string };
  description: string;
  dueDate: string;
  priority?: TaskPriority;
  status: TaskStatus;
  tags?: string[];
  title: string;
}

export class CreatedTask {
  _id: string;
}
