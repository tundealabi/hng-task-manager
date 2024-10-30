import { Types } from 'mongoose';

/**
 *@description convert string id into a mongo id
 * @returns the mongo id
 */
export const convertToMongoId = (id: string) => new Types.ObjectId(id);
