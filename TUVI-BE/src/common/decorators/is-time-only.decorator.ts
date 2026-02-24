import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsTimeOnlyConstraint } from '../validators/is-time-only.validator';

export function IsTimeOnly(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTimeOnlyConstraint,
    });
  };
}
