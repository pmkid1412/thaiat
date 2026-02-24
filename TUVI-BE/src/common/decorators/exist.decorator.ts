import { registerDecorator, ValidationOptions } from 'class-validator';
import { ExistConstraint } from '../validators/exist.validator';

export function ExistsInDatabase(
  entity: Function,
  column?: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [entity, column],
      validator: ExistConstraint,
    });
  };
}
