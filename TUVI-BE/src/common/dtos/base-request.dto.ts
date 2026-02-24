import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class LanguageIdRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  languageId?: number;
}
