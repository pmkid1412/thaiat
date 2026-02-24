import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import {
  PredictionCategory,
  PredictionType,
} from 'src/common/constants/prediction.constant';
import { PaginationDto } from 'src/common/dtos/index.dto';
import { PaginationResponseDto } from 'src/common/dtos/pagination.dto';

export class ListPredictionRequestDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  languageId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({
    required: false,
    enum: PredictionType,
    description: 'Prediction type 0: DAILY, 1: MONTHLY',
  })
  @IsOptional()
  @IsInt()
  predictionType?: number;

  @ApiProperty({
    required: false,
    example: '1,2,3',
    description: 'Filter for pro user only',
  })
  @IsOptional()
  @IsString()
  areas?: string;

  @ApiProperty({
    required: false,
    example: '1,2,3',
    description: 'Filter for pro user only',
  })
  @IsOptional()
  @IsString()
  domains?: string;

  @ApiProperty({
    required: false,
    example: '1,2,3',
    description: 'Filter for pro user only',
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({ required: false, description: 'Filter for pro user only' })
  @IsOptional()
  @IsInt()
  confidenceScore?: number;

  @ApiProperty({
    required: false,
    example: '2025-01-01',
    description: 'Filter for pro user only',
  })
  @IsOptional()
  @IsString()
  predictionFromDate?: string;

  @ApiProperty({
    required: false,
    example: '2025-01-01',
    description: 'Filter for pro user only',
  })
  @IsOptional()
  @IsString()
  predictionToDate?: string;
}

export class ManageListPredictionRequestDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  languageId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  statusId?: number;

  @ApiProperty({ required: false, enum: PredictionCategory })
  @IsOptional()
  @IsEnum(PredictionCategory, { message: ErrorResponseMessage.INVALID_VALUE })
  type: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  search?: string;
}

export class ListPredictionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  confidenceScore: number;

  @ApiProperty()
  domainName: string;

  @ApiProperty()
  predictionStatus: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  evidenceCount?: number;

  @ApiProperty()
  createdAt?: string;

  @ApiProperty({ isArray: true })
  areas?: string[];

  @ApiProperty()
  predictionDate?: string;

  @ApiProperty()
  status: string;
}

export class ListPredictionResponseDto extends PaginationResponseDto {
  @ApiProperty({
    type: 'object',
    additionalProperties: { $ref: getSchemaPath(ListPredictionDto) },
  })
  data: Record<string, ListPredictionDto>;
}

export class ManageListPredictionResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [ListPredictionDto] })
  data: ListPredictionDto[];
}

export class RecentPrediction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  confidenceScore: number;

  @ApiProperty()
  domainName: string;

  @ApiProperty()
  predictionStatus: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ isArray: true })
  areas: string[];

  @ApiProperty()
  createdAt: string;
}

export class ListBookmarkedPredictionRequestDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  languageId?: number;
}

export class BookmarkedPredictionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  confidenceScore: number;

  @ApiProperty()
  domainName: string;

  @ApiProperty()
  predictionStatus: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ isArray: true })
  areas?: string[];

  @ApiProperty()
  predictionDate?: string;
}

export class ListBookmarkedPredictionResponseDto extends PaginationResponseDto {
  @ApiProperty({ type: [BookmarkedPredictionDto] })
  data: BookmarkedPredictionDto[];
}
