import { ApiProperty } from '@nestjs/swagger';

export class ListImpactLevelDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
