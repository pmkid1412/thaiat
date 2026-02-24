import { ApiProperty } from '@nestjs/swagger';

export class ListAreaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
