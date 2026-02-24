import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';
import {
  ErrorResponseMessage,
  ProPlanType,
  UserStatus,
  UserType,
} from 'src/common/constants/index.constant';
import {
  ExistsInDatabase,
  IsDateOnly,
  IsTimeOnly,
} from 'src/common/decorators/index.decorator';
import { Language } from 'src/database/entities/language.entity';

export class UpdateUserRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  name: string;

  @ApiProperty({ example: 'email@test.com' })
  @IsEmail(undefined, { message: ErrorResponseMessage.INVALID_EMAIL })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
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
    description: 'HH:mm:ss or hh:mm',
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

  @ApiProperty({ required: false })
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

export class UpdateMeRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  name: string;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  phoneNumber: string;
}

export class ChangePasswordRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  oldPassword: string;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  newPassword: string;
}

export class ChangeLanguageRequestDto {
  @ApiProperty()
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @ExistsInDatabase(Language, 'id')
  languageId: number;
}

export class ChangeUserStatusRequestDto {
  @ApiProperty({ enum: [UserStatus.ACTIVE, UserStatus.INACTIVE] })
  @IsEnum([UserStatus.ACTIVE, UserStatus.INACTIVE], {
    message: ErrorResponseMessage.INVALID_VALUE,
  })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  status: string;
}

export class ChangePlanRequestDto {
  @ApiProperty({ type: 'number', enum: UserType })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @IsEnum(UserType, { message: ErrorResponseMessage.INVALID_VALUE })
  userType: number;

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
    description: 'Required if proPlanType is custom',
  })
  @IsDateOnly()
  @IsOptional()
  proPlanStartDate: string;

  @ApiProperty({
    required: false,
    type: 'string',
    format: 'date',
    description: 'Required if proPlanType is custom',
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
