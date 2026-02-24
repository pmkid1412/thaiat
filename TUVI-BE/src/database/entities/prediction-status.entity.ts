import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Prediction } from './prediction.entity';
import { PredictionStatusData } from './prediction-status-data.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('prediction_status')
export class PredictionStatus {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: [PredictionStatusData] })
  @OneToMany(
    () => PredictionStatusData,
    (predictionStatusData) => predictionStatusData.predictionStatus,
  )
  predictionStatusData: PredictionStatusData[];

  @OneToMany(() => Prediction, (prediction) => prediction.predictionStatus)
  predictions: Prediction[];
}
