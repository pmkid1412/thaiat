import { ValidationError } from 'class-validator';

export class ValidatorUtil {
  static addCustomError(
    property: string,
    constraints: {
      [type: string]: string;
    },
  ): ValidationError {
    const validationError = new ValidationError();
    validationError.property = property;
    validationError.constraints = constraints;

    return validationError;
  }
}
