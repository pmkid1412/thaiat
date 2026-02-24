import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { ErrorResponseMessage } from 'src/common/constants/message.constant';

export class ListEvidenceRequestDto {
  @ApiProperty()
  @IsNumber(undefined, { message: ErrorResponseMessage.INVALID_TYPE })
  @IsNotEmpty({message: ErrorResponseMessage.FIELD_IS_REQUIRED})
  predictionId: number;
}

export class EvidenceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  publishedDate: Date;

  @ApiProperty()
  confidenceScore: number;

  @ApiProperty()
  quote: string;
}
