import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { Gender } from 'src/common/constants/user.constant';
import { IsDateOnly } from 'src/common/decorators/is-date-only.decorator';
import { IsTimeOnly } from 'src/common/decorators/is-time-only.decorator';

export const TIMEZONE_OFFSETS = [
  '-12',
  '-11',
  '-10',
  '-9.5',
  '-9',
  '-8',
  '-7',
  '-6',
  '-5',
  '-4',
  '-3.5',
  '-3',
  '-2',
  '-1',
  '0',
  '1',
  '2',
  '3',
  '3.5',
  '4',
  '4.5',
  '5',
  '5.5',
  '5.75',
  '6',
  '6.5',
  '7',
  '8',
  '8.75',
  '9',
  '9.5',
  '10',
  '10.5',
  '11',
  '11.5',
  '12',
  '12.75',
  '13',
  '14',
] as const;

export type TimezoneOffset = (typeof TIMEZONE_OFFSETS)[number];

export class CreateHoroscopeRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @MaxLength(200, { message: ErrorResponseMessage.DATA_TOO_LONG })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  name: string;

  @ApiProperty({ required: false })
  @IsDateOnly()
  @IsOptional()
  solarDateOfBirth: string;

  @ApiProperty({ required: false })
  @IsDateOnly()
  @IsOptional()
  lunarDateOfBirth: string;

  @ApiProperty({ required: false })
  @IsBoolean({ message: ErrorResponseMessage.INVALID_TYPE })
  @IsOptional()
  isLunarLeapMonth: boolean;

  @ApiProperty()
  @IsTimeOnly()
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  timeOfBirth: string;

  @ApiProperty({ enum: TIMEZONE_OFFSETS })
  @IsEnum(TIMEZONE_OFFSETS, { message: ErrorResponseMessage.INVALID_VALUE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  timezone: string;

  @ApiProperty({ enum: [Gender.MALE, Gender.FEMALE] })
  @IsEnum([Gender.MALE, Gender.FEMALE], {
    message: ErrorResponseMessage.INVALID_VALUE,
  })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  gender: string;
}
