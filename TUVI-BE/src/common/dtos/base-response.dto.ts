import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BaseResponseDto<T> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 200 })
  code: number;

  @ApiProperty({ example: 'Request processed successfully' })
  message: string;

  @ApiProperty({ example: null, nullable: true })
  errors: object | string | null;

  @ApiProperty({ nullable: true })
  @Type(() => Object)
  data: T | null;
}
