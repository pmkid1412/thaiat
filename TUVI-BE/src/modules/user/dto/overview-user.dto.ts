import { ApiProperty } from '@nestjs/swagger';

export class OverviewUserResponseDto {
  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  freeUsers: number;

  @ApiProperty()
  proUsers: number;

  @ApiProperty()
  birthChartUsers: number;
}
