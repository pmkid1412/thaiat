import { registerDecorator, ValidationOptions } from 'class-validator';
import { Type } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { IsUniqueFieldConstraint } from '../validators/index.validator';

export function IsUniqueField(
  entity: Type<any>,
  field: string,
  extraWhere?: FindOptionsWhere<any>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUniqueField',
      target: object.constructor,
      propertyName,
      constraints: [entity, field, extraWhere],
      options: validationOptions,
      validator: IsUniqueFieldConstraint,
    });
  };
}
