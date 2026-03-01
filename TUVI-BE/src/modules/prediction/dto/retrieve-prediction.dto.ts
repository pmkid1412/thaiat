import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class PredictionDataDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  languageId: number;

  @ApiProperty()
  languageName: string;
}

export class FieldData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  languageId: number;

  @ApiProperty()
  languageName: string;
}

export class AreaDataDto extends FieldData {
  @ApiProperty()
  areaId: number;
}

@ApiExtraModels(AreaDataDto)
export class RetrievePredictionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  predictionDate: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  confidenceScore: number;

  @ApiProperty()
  tags: string[];

  @ApiProperty({ type: () => PredictionDataDto, isArray: true })
  predictionData: PredictionDataDto[];

  @ApiProperty({ type: FieldData, isArray: true })
  domainData: FieldData[];

  @ApiProperty({ type: FieldData, isArray: true })
  impactLevelData: FieldData[];

  @ApiProperty({ type: FieldData, isArray: true })
  predictionStatusData: FieldData[];

  @ApiProperty({
    type: 'array',
    items: {
      type: 'array',
      items: { $ref: getSchemaPath(AreaDataDto) },
    },
  })
  areas: AreaDataDto[][];

  @ApiProperty()
  predictionStatusId: number;

  @ApiProperty()
  domainId: number;

  @ApiProperty()
  impactLevelId: number;

  @ApiProperty({ required: false })
  thumbnailUrl: string;
}
