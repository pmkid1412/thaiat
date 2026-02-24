import { DBFunction } from 'src/common/constants/index.constant';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Prediction } from './prediction.entity';
import { SoftDelete } from './base.entity';
import { Area } from './area.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('area_prediction')
export class AreaPrediction extends SoftDelete {
  @ApiProperty()
  @PrimaryColumn({ name: 'area_id' })
  areaId: number;

  @ApiProperty()
  @PrimaryColumn({ name: 'prediction_id' })
  predictionId: number;

  @ApiProperty()
  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => DBFunction.CURRENT_TIMESTAMP,
  })
  createdAt: Date;

  @ApiProperty()
  @Column()
  updated_at: Date;

  @ManyToOne(() => Prediction, (prediction) => prediction.areaPredictions)
  @JoinColumn({ name: 'prediction_id' })
  prediction: Prediction;

  @ManyToOne(() => Area, (area) => area.areaPredictions)
  @JoinColumn({ name: 'area_id' })
  area: Area;
}
