import { ApiProperty } from '@nestjs/swagger';

export class StatsPredictionByDomainItemDto {
  @ApiProperty()
  domainName: string;

  @ApiProperty()
  predictionCount: number;
}

export class StatsPredictionByStatusItemDto {
  @ApiProperty()
  statusName: string;

  @ApiProperty()
  predictionCount: number;
}

export class StatsPredictionByConfidenceItemDto {
  @ApiProperty()
  confidenceRange: string;

  @ApiProperty()
  predictionCount: number;
}
