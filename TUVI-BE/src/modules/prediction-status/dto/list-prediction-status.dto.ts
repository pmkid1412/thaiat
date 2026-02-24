import { ApiProperty } from '@nestjs/swagger';

export class ListPredictionStatusDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
