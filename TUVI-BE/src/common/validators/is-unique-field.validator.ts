import { Injectable, Type } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { ErrorResponseMessage } from '../constants/message.constant';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueFieldConstraint implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, field, extraWhere] = args.constraints as [
      Type<any>,
      string,
      FindOptionsWhere<any>?,
    ];

    if (!value) return true;

    const repository = this.dataSource.getRepository(EntityClass);

    const where: any = { ...extraWhere, [field]: value };
    const existing = await repository.findOne({ where });

    return !existing;
  }

  defaultMessage(args: ValidationArguments): string {
    const [_Entity, field] = args.constraints;
    return ErrorResponseMessage.VALUE_ALREADY_EXISTS;
  }
}
