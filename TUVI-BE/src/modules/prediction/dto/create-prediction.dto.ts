import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import {
  PredictionCategory,
  PredictionStatusEnum,
} from 'src/common/constants/prediction.constant';
import { ExistsInDatabase } from 'src/common/decorators/index.decorator';
import { IsDateOnly } from 'src/common/decorators/is-date-only.decorator';
import {
  Area,
  Domain,
  ImpactLevel,
  Language,
  PredictionStatus,
} from 'src/database/entities/index.entity';

export class PredictionDataRequestDto {
  @ApiProperty({ example: 1 })
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @ExistsInDatabase(Language, 'id')
  languageId: number;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @MaxLength(500, { message: ErrorResponseMessage.DATA_TOO_LONG })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  title: string;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @Transform(({ value }) => value?.trim())
  summary: string;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @Transform(({ value }) => value?.trim())
  description: string;
}

export class CreatePredictionRequestDto {
  @ApiProperty()
  @IsDateOnly({ message: ErrorResponseMessage.INVALID_DATE_FORMAT })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  predictionDate: Date;

  @ApiProperty({ required: false })
  @IsDateOnly({ message: ErrorResponseMessage.INVALID_DATE_FORMAT })
  @IsOptional()
  startDate: Date;

  @ApiProperty({ required: false })
  @IsDateOnly({ message: ErrorResponseMessage.INVALID_DATE_FORMAT })
  @IsOptional()
  endDate: Date;

  @ApiProperty({ example: 1 })
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @ExistsInDatabase(Domain, 'id')
  domainId: number;

  @ApiProperty({ example: 1 })
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @ExistsInDatabase(ImpactLevel, 'id')
  impactLevelId: number;

  @ApiProperty({ example: 1 })
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @ExistsInDatabase(PredictionStatus, 'id')
  predictionStatusId: number;

  @ApiProperty()
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  @Min(0, { message: ErrorResponseMessage.DATA_TOO_SHORT })
  @Max(100, { message: ErrorResponseMessage.DATA_TOO_LONG })
  confidenceScore: number;

  @ApiProperty({ enum: PredictionCategory })
  @IsEnum(PredictionCategory, { message: ErrorResponseMessage.INVALID_VALUE })
  @IsOptional()
  type: string = PredictionCategory.FREE;

  @ApiProperty({ enum: PredictionStatusEnum })
  @IsEnum(PredictionStatusEnum, { message: ErrorResponseMessage.INVALID_VALUE })
  @IsOptional()
  status: string = PredictionStatusEnum.PUBLISHED;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray({ message: ErrorResponseMessage.INVALID_ARRAY_TYPE })
  @IsNumber(
    {},
    { each: true, message: ErrorResponseMessage.INVALID_NUMBER_TYPE },
  )
  @ExistsInDatabase(Area, 'id', { each: true })
  areas: number[];

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @Transform(({ value }) => value?.trim())
  tags: string;

  @ApiProperty({
    example: [
      {
        languageId: 1,
        title: 'title1',
        summary: 'summary1',
        description: 'description1',
      },
      {
        languageId: 2,
        title: 'title2',
        summary: 'summary2',
        description: 'description2',
      },
    ],
  })
  @IsArray({ message: ErrorResponseMessage.INVALID_ARRAY_TYPE })
  @ArrayMinSize(1, { message: ErrorResponseMessage.DATA_TOO_SHORT })
  @ValidateNested({ each: true, message: ErrorResponseMessage.INVALID_VALUE })
  @Type(() => PredictionDataRequestDto)
  predictionData: PredictionDataRequestDto[];
}
