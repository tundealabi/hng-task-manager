import {
  Document,
  FilterQuery,
  Model,
  MongooseBaseQueryOptionKeys,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    queryOptions?: QueryOptions,
  ): Promise<T | null> {
    return this.entityModel
      .findOne(
        entityFilterQuery,
        {
          __v: 0,
          ...projection,
        },
        {
          ...queryOptions,
        },
      )
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    queryOptions?: QueryOptions,
  ): Promise<T[] | null> {
    return this.entityModel.find(
      entityFilterQuery,
      { __v: 0, ...projection },
      {
        ...queryOptions,
      },
    );
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    return entity.save();
  }

  async findOneAndDelete(
    entityFilterQuery: FilterQuery<T>,
    queryOptions?: QueryOptions,
  ): Promise<T | null> {
    return this.entityModel.findOneAndDelete(entityFilterQuery, {
      ...queryOptions,
    });
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<T>,
    queryOptions?: QueryOptions,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      updateEntityData,
      {
        new: true,
        ...queryOptions,
      },
    );
  }

  async deleteMany(
    entityFilterQuery: FilterQuery<T>,
    queryOptions: Pick<QueryOptions<T>, MongooseBaseQueryOptionKeys>,
  ): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery, {
      ...queryOptions,
    });
    return deleteResult.deletedCount >= 1;
  }
}
