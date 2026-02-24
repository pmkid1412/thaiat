import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';
import { IsDateOnly } from 'src/common/decorators/is-date-only.decorator';

export class UpdateEvidenceRequestDto {
  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  title: string;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  source: string;

  @ApiProperty()
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  link: string;

  @ApiProperty({ required: false, example: '2025-01-01' })
  @IsDateOnly({ message: ErrorResponseMessage.INVALID_DATE_FORMAT })
  @IsOptional()
  publishedDate: string;

  @ApiProperty()
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_NUMBER_TYPE })
  @IsNotEmpty({ message: ErrorResponseMessage.FIELD_IS_REQUIRED })
  confidenceScore: number;

  @ApiProperty({ required: false })
  @IsString({ message: ErrorResponseMessage.INVALID_STRING_TYPE })
  @IsOptional()
  quote: string;
}
