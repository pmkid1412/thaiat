import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ErrorResponseMessage } from '../constants/message.constant';

@ValidatorConstraint({ async: false })
@Injectable()
export class IsTimeOnlyConstraint implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    if (!value) return false;

    let timeStr: string;

    if (value instanceof Date) {
      timeStr = value.toISOString().split('T')[1].split('.')[0];
    } else if (typeof value === 'string') {
      timeStr = value;
    } else {
      return false;
    }

    return /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/.test(timeStr);
  }

  defaultMessage(_args: ValidationArguments) {
    return ErrorResponseMessage.INVALID_TIME_FORMAT;
  }
}
