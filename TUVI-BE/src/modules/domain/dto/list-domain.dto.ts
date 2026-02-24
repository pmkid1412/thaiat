import { ApiProperty } from '@nestjs/swagger';

export class ListDomainDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
