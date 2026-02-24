import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Language } from './language.entity';
import { Prediction } from './prediction.entity';

@Entity('prediction_data')
export class PredictionData {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  summary: string;

  @ApiProperty()
  @Column()
  description: string;

  @ManyToOne(() => Prediction, (prediction) => prediction.predictionData)
  @JoinColumn({ name: 'prediction_id' })
  prediction: Prediction;

  @ManyToOne(() => Language, (language) => language.predictionData)
  @JoinColumn({ name: 'language_id' })
  language: Language;
}
