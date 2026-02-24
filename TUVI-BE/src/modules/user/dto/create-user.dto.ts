import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { ProPlanType, UserType } from 'src/common/constants/user.constant';
import { IsDateOnly } from 'src/common/decorators/is-date-only.decorator';
import { IsTimeOnly } from 'src/common/decorators/is-time-only.decorator';
import { IsUniqueField } from 'src/common/decorators/is-unique-field.decorator';
import { User } from 'src/database/entities/index.entity';

export class CreateUserRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  name: string;

  @ApiProperty({ example: 'email@test.com' })
  @IsEmail(undefined, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @IsUniqueField(User, 'email')
  email: string;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  avatar: string;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date',
    description: 'YYYY-MM-DD',
  })
  @IsDateOnly()
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'time',
    pattern: '^([01]\d|2[0-3]):([0-5]\d)$',
    example: '14:30',
    description: 'HH:MM or HH:MM:SS',
  })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsTimeOnly()
  @IsOptional()
  timeOfBirth: string;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  placeOfBirth?: string;

  @ApiProperty({ type: 'number', enum: UserType })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @IsEnum(UserType, { message: ErrorResponseMessage.INVALID_VALUE })
  userType: number;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  timezone: string;

  @ApiProperty({
    required: false,
    enum: ProPlanType,
    description: 'Required if userType is Pro',
  })
  @IsEnum(ProPlanType, { message: ErrorResponseMessage.INVALID_VALUE })
  @IsOptional()
  proPlanType: string;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date',
    description: 'Required if proPlanType is custom. Format: YYYY-MM-DD',
  })
  @IsDateOnly()
  @IsOptional()
  proPlanStartDate: string;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date',
    description: 'Required if proPlanType is custom. Format: YYYY-MM-DD',
  })
  @IsDateOnly()
  @IsOptional()
  proPlanEndDate: string;

  @ApiProperty({ required: false, description: 'Option for pro only' })
  @IsBoolean({ message: ErrorResponseMessage.INVALID_TYPE })
  @IsOptional()
  autoRenew: boolean;

  @ApiProperty({ required: false, description: 'Option for pro only' })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  upgradePlanReason: string;
}
