import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { ErrorResponseMessage } from '../constants/message.constant';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [entityClass, columnName = 'id'] = args.constraints;
    const repository: Repository<any> =
      this.dataSource.getRepository(entityClass);

    const record = await repository.findOne({ where: { [columnName]: value } });

    return !!record;
  }

  defaultMessage(args: ValidationArguments) {
    // const [entityClass, columnName = 'id'] = args.constraints;
    return ErrorResponseMessage.DATA_NOT_FOUND;
  }
}
