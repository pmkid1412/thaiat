import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class UpgradeHistoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  upgradeType: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  upgradeReason: string;

  @ApiProperty()
  createdAt: string;
}

export class UserDetailResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  timeOfBirth: string;

  @ApiProperty()
  placeOfBirth: string;

  @ApiProperty()
  userType: number;

  @ApiProperty()
  timezone: string;

  @ApiProperty({ isArray: true })
  upgradeHistories: UpgradeHistoryDto[];
}

export class LanguageDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class ToolUsageDto {
  @ApiProperty()
  toolCode: string;

  @ApiProperty()
  usedCount: number;

  @ApiProperty()
  maxUsage: number;
}

@ApiExtraModels(() => [LanguageDto])
export class MeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false })
  avatar: string;

  @ApiProperty({ required: false })
  dateOfBirth: Date;

  @ApiProperty({ required: false })
  timeOfBirth: string;

  @ApiProperty({ nullable: true })
  timezone: string;

  @ApiProperty({ required: false })
  placeOfBirth: string;

  @ApiProperty()
  userType: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({
    nullable: true,
    oneOf: [{ $ref: getSchemaPath(LanguageDto) }, { type: 'null' }],
  })
  language: LanguageDto | null;

  @ApiProperty({ nullable: true })
  proPlanType: string | null;

  @ApiProperty({ nullable: true })
  proPlanStartDate: string | null;

  @ApiProperty({ nullable: true })
  proPlanEndDate: string | null;

  @ApiProperty({ type: () => [ToolUsageDto] })
  toolUsages: ToolUsageDto[];
}
