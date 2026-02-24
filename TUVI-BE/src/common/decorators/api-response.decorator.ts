// common/decorators/api-base-response.decorator.ts
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiExtraModels,
  getSchemaPath,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BaseResponseDto } from '../dtos/index.dto';

interface ApiBaseResponseOptions {
  model?: any | any[];
  created?: boolean;
  badRequest?: boolean;
  notFoundError?: boolean;
  unauthorizedError?: boolean;
  internalError?: boolean;
  description?: string;
}

export function ApiBaseResponse({
  model,
  created = false,
  badRequest = false,
  notFoundError = false,
  unauthorizedError = true,
  internalError = true,
  description = 'Successful response',
}: ApiBaseResponseOptions) {
  const decorators: (MethodDecorator & ClassDecorator)[] = [];

  const buildSchema = (customProperties?: object) => {
    const isArray = Array.isArray(model);

    const modelRef = isArray
      ? {
          type: 'array',
          items: { $ref: getSchemaPath(model[0]) },
        }
      : model
        ? { $ref: getSchemaPath(model) }
        : { example: null };

    return {
      allOf: [
        { $ref: getSchemaPath(BaseResponseDto) },
        {
          properties: {
            data: modelRef,
            success: { example: true },
            message: { example: 'Success' },
            errors: { example: null },
            ...customProperties,
          },
        },
      ],
    };
  };

  const successDecorator = created
    ? ApiCreatedResponse({ schema: buildSchema(), description })
    : ApiOkResponse({ schema: buildSchema(), description });

  decorators.push(successDecorator);

  decorators.push(ApiExtraModels(BaseResponseDto));
  if (model) {
    const models = Array.isArray(model) ? model : [model];
    decorators.push(ApiExtraModels(...models));
  }

  const errorResponses = [
    badRequest && {
      decorator: ApiBadRequestResponse,
      message: 'Bad Request',
      errors: { field: 'Invalid input' },
      code: 400,
    },
    notFoundError && {
      decorator: ApiNotFoundResponse,
      message: 'Not found',
      errors: [],
      code: 404,
    },
    unauthorizedError && {
      decorator: ApiUnauthorizedResponse,
      message: 'Unauthorized',
      errors: [],
      code: 401,
    },
    internalError && {
      decorator: ApiInternalServerErrorResponse,
      message: 'Internal server error',
      errors: [],
      code: 500,
    },
  ].filter(Boolean) as {
    decorator: Function;
    message: string;
    errors: any;
    code: number;
  }[];

  for (const err of errorResponses) {
    decorators.push(
      err.decorator({
        schema: {
          allOf: [
            { $ref: getSchemaPath(BaseResponseDto) },
            {
              properties: {
                success: { example: false },
                code: { example: err.code },
                message: { example: err.message },
                data: { example: null },
                errors: { example: err.errors },
              },
            },
          ],
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
