import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';

import { ControllerPaginatedResponse, ControllerResponse } from '../entities';

export const ApiResponse = <TModel extends Type<any>>(
  model: TModel,
  httpStatus: HttpStatus.CREATED | HttpStatus.OK | HttpStatus.NO_CONTENT,
  options: ApiResponseOptions,
) => {
  switch (httpStatus) {
    case HttpStatus.CREATED:
      return applyDecorators(
        ApiCreatedResponse({
          ...options,
          schema: {
            allOf: [
              { $ref: getSchemaPath(ControllerResponse) },
              {
                properties: {
                  data: model ? { $ref: getSchemaPath(model) } : {},
                },
              },
            ],
          },
        }),
      );
    case HttpStatus.NO_CONTENT:
      return applyDecorators(
        ApiNoContentResponse({
          ...options,
        }),
      );

    default:
      return applyDecorators(
        ApiOkResponse({
          ...options,
          schema: {
            allOf: [
              { $ref: getSchemaPath(ControllerResponse) },
              {
                properties: {
                  data: model ? { $ref: getSchemaPath(model) } : {},
                },
              },
            ],
          },
        }),
      );
  }
};

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  options: ApiResponseOptions,
) => {
  return applyDecorators(
    ApiOkResponse({
      ...options,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ControllerPaginatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: model ? { $ref: getSchemaPath(model) } : {},
              },
            },
          },
        ],
      },
    }),
  );
};
