import { ApiProperty } from '@nestjs/swagger';

export class OverviewPredictionResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  active: number;

  @ApiProperty()
  occurred: number;

  @ApiProperty()
  accuracy: number;

  @ApiProperty()
  averageConfidence: number;
}
