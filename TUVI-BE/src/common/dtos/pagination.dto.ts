import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  pageSize?: number;
}

export class PaginationResponseDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  totalPages: number;
}
