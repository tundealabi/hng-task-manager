import { ControllerResponseMetadata } from '../entities';

export const controllerResponse = <T = null>(arg: {
  data: T;
  message?: string;
  metadata?: ControllerResponseMetadata;
}) => {
  return {
    data: arg.data,
    message: arg.message || 'success',
    metadata: arg.metadata || null,
    state: 'success',
  };
};
