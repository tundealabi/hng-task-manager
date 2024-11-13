import { Type } from 'class-transformer';

class Obj {}

export class ControllerResponseMetadata {
  count: number;
  cursor: string;
}

export class ControllerResponse<T> {
  @Type(() => Obj)
  readonly data: T;
  readonly message: string;
  readonly state: string;
}

export class ControllerPaginatedResponse<T> extends ControllerResponse<T[]> {
  readonly metadata: ControllerResponseMetadata;
}
