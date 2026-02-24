import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AreaPrediction } from './area-prediction.entity';
import { AreaData } from './area-data.entity';

@Entity('areas')
export class Area {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => AreaPrediction, (areaPrediction) => areaPrediction.area)
  areaPredictions: AreaPrediction[];

  @OneToMany(() => AreaData, (areaData) => areaData.area)
  areaData: AreaData[];
}
