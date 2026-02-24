import { ApiProperty } from '@nestjs/swagger';

export class StatsUserByTypeItemDto {
  @ApiProperty()
  userType: string;

  @ApiProperty()
  userCount: number;
}
