import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from './language.entity';
import { PredictionStatus } from './prediction-status.entity';

@Entity('prediction_status_data')
export class PredictionStatusData {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ManyToOne(
    () => PredictionStatus,
    (predictionStatus) => predictionStatus.predictionStatusData,
  )
  @JoinColumn({ name: 'prediction_status_id' })
  predictionStatus: PredictionStatus;

  @ApiProperty()
  @ManyToOne(() => Language, (language) => language.predictionStatusData)
  @JoinColumn({ name: 'language_id' })
  language: Language;
}
