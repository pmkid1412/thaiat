import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsDateOnlyConstraint } from '../validators/index.validator';

export function IsDateOnly(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateOnlyConstraint,
    });
  };
}
