import { ApiProperty } from '@nestjs/swagger';

export class ListSystemConfigDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  valueType: string;

  @ApiProperty()
  value: string;

  @ApiProperty({ nullable: true })
  description: string | null;
}
