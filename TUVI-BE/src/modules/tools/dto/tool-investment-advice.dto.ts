import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import {
  InvestmentActionTime,
  InvestmentAsset,
  InvestmentIntendedAction,
  InvestmentRiskExpectation,
} from 'src/common/constants/tool.constant';
import { IsDateOnly } from 'src/common/decorators/is-date-only.decorator';

export class ToolInvestmentAdviceRequestDto {
  @ApiProperty({
    enum: InvestmentAsset,
    description: 'Nhóm ngành Chứng khoán / Tài sản',
  })
  @IsEnum(InvestmentAsset, {
    message: ErrorResponseMessage.INVALID_VALUE,
  })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  asset: string;

  @ApiProperty({
    enum: InvestmentIntendedAction,
    description: 'Hành động dự định',
  })
  @IsEnum(InvestmentIntendedAction, {
    message: ErrorResponseMessage.INVALID_VALUE,
  })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  action: string;

  @ApiProperty({ description: 'Số vốn đầu tư' })
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsPositive({ message: ErrorResponseMessage.INVALID_POSITIVE_NUMBER })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  capital: number;

  @ApiProperty({
    enum: InvestmentRiskExpectation,
    description: 'Kỳ vọng rủi ro',
  })
  @IsEnum(InvestmentRiskExpectation, {
    message: ErrorResponseMessage.INVALID_VALUE,
  })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  riskExpectation: string;

  @ApiProperty({ description: 'Đòn bẩy (Vay, Margin)' })
  @IsBoolean({ message: ErrorResponseMessage.INVALID_VALUE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  leverage: boolean;

  @ApiPropertyOptional({
    type: 'string',
    format: 'date',
    description: 'Ngày bắt đầu (optional, default: today)',
  })
  @IsOptional()
  @IsDateOnly()
  startDate?: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'date',
    description: 'Ngày kết thúc (optional, default: startDate + 7 days)',
  })
  @IsOptional()
  @IsDateOnly()
  endDate?: string;

  @ApiPropertyOptional({
    enum: InvestmentActionTime,
    description: 'Giờ dự định (optional, default: current time)',
  })
  @IsOptional()
  @IsEnum(InvestmentActionTime, { message: ErrorResponseMessage.INVALID_VALUE })
  actionTime?: string;
}

export class ToolInvestmentAIAdviceRequestDto {
  @ApiProperty()
  @IsObject()
  metaData: any;
}

export class ToolInvestmentMetadataDto {
  @ApiProperty()
  @IsString()
  metaKey: string;

  @ApiProperty()
  @IsString()
  metaValue: string;
}
