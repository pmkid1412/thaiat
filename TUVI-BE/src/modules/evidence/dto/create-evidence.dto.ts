import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsDateOnly } from 'src/common/decorators/is-date-only.decorator';

export class CreateEvidenceRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  source: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  link: string;

  @ApiProperty({ required: false, example: '2025-01-01' })
  @IsDateOnly()
  @IsOptional()
  publishedDate: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  confidenceScore: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  quote: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  predictionId: number;
}
