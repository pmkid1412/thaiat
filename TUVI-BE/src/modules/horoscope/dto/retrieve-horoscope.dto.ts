import { ApiProperty } from '@nestjs/swagger';

export class RetrieveHoroscopeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  solarDateOfBirth: string;

  @ApiProperty()
  lunarDateOfBirth: string;

  @ApiProperty()
  isLunarLeapMonth: boolean;

  @ApiProperty()
  timeOfBirth: string;

  @ApiProperty()
  timezone: string;

  @ApiProperty()
  gender: string;
}
