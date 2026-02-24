import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ErrorResponseMessage } from '../constants/message.constant';

@ValidatorConstraint({ async: false })
@Injectable()
export class IsDateOnlyConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (value instanceof Date) {
      const isoDate = value.toISOString().split('T')[0];
      return /^\d{4}-\d{2}-\d{2}$/.test(isoDate);
    }
    if (typeof value !== 'string') return false;

    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }

  defaultMessage(_args: ValidationArguments) {
    return ErrorResponseMessage.INVALID_DATE_FORMAT;
  }
}
